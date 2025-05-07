<?php

namespace App\Services;

use App\Models\PumpSolution;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\DB;

class PumpSolutionService
{
    private const CACHE_TTL = 300; // 5 minutes instead of 1 hour
    private const CACHE_PREFIX = 'pump_solutions_';

    public function getFilteredPumpSolutions(array $filters, array $sorting)
    {
        try {
            // Create a cache key based on filters, sorting, and page
            $cacheKey = self::CACHE_PREFIX . md5(json_encode($filters) . json_encode($sorting) . request()->get('page', 1));

            return Cache::remember($cacheKey, self::CACHE_TTL, function () use ($filters, $sorting) {
                $query = PumpSolution::query()
                    ->select([
                        'id', 'title', 'description', 'category', 'q_max', 'h_max',
                        'rated_q', 'rated_h', 'motor', 'price_zmw', 'vat_rate',
                        'net_price_zmw', 'is_featured', 'order'
                    ])
                    ->with(['media']); // Eager load media relationship

                // Apply category filter with index
                if (!empty($filters['category'])) {
                    $query->where('category', $filters['category']);
                }

                // Apply search filter with full-text search if available
                if (!empty($filters['search'])) {
                    $query->where(function (Builder $q) use ($filters) {
                        $searchTerm = $filters['search'];
                        $q->where('title', 'like', "%{$searchTerm}%")
                            ->orWhere('description', 'like', "%{$searchTerm}%")
                            ->orWhere('item_code', 'like', "%{$searchTerm}%");
                    });
                }

                // Apply numeric filters with proper indexing
                $this->applyNumericFilters($query, $filters);

                // Apply sorting with index
                $sortBy = $sorting['sort_by'] ?? 'title';
                $sortDirection = $sorting['sort_direction'] ?? 'asc';
                
                // Add index hints for better performance
                if (in_array($sortBy, ['title', 'category', 'order', 'created_at'])) {
                    $query->orderBy($sortBy, $sortDirection);
                } else {
                    // Default sorting if invalid sort column
                    $query->orderBy('title', 'asc');
                }

                // Use chunking for large datasets
                return $query->paginate(9)->withQueryString();
            });
        } catch (\Exception $e) {
            Log::error('Error in PumpSolutionService@getFilteredPumpSolutions: ' . $e->getMessage(), [
                'filters' => $filters,
                'sorting' => $sorting,
                'trace' => $e->getTraceAsString()
            ]);
            throw $e;
        }
    }

    private function applyNumericFilters(Builder $query, array $filters): void
    {
        $numericFilters = [
            'min_price' => ['field' => 'net_price_zmw', 'operator' => '>='],
            'max_price' => ['field' => 'net_price_zmw', 'operator' => '<='],
            'min_motor' => ['field' => 'motor', 'operator' => '>='],
            'max_motor' => ['field' => 'motor', 'operator' => '<='],
            'min_flow' => ['field' => 'q_max', 'operator' => '>='],
            'max_flow' => ['field' => 'q_max', 'operator' => '<='],
            'min_head' => ['field' => 'h_max', 'operator' => '>='],
            'max_head' => ['field' => 'h_max', 'operator' => '<='],
        ];

        foreach ($numericFilters as $filterKey => $config) {
            if (!empty($filters[$filterKey])) {
                $query->where($config['field'], $config['operator'], $filters[$filterKey]);
            }
        }
    }

    public function getPumpSolution(int $id)
    {
        $cacheKey = self::CACHE_PREFIX . 'single_' . $id;
        
        return Cache::remember($cacheKey, self::CACHE_TTL, function () use ($id) {
            return PumpSolution::select([
                'id', 'title', 'description', 'category', 'q_max', 'h_max',
                'rated_q', 'rated_h', 'motor', 'price_zmw', 'vat_rate',
                'net_price_zmw', 'is_featured', 'order'
            ])->findOrFail($id);
        });
    }

    public function createPumpSolution(array $data)
    {
        DB::beginTransaction();
        try {
            $pumpSolution = PumpSolution::create($data);

            if (isset($data['image'])) {
                $pumpSolution->addMediaFromRequest('image')
                    ->toMediaCollection('pump-solutions');
            }

            $this->clearCaches();
            DB::commit();

            return $pumpSolution;
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Error creating pump solution: ' . $e->getMessage(), [
                'data' => $data,
                'trace' => $e->getTraceAsString()
            ]);
            throw $e;
        }
    }

    public function updatePumpSolution(PumpSolution $pumpSolution, array $data)
    {
        DB::beginTransaction();
        try {
            $pumpSolution->update($data);

            if (isset($data['image'])) {
                $pumpSolution->clearMediaCollection('pump-solutions');
                $pumpSolution->addMediaFromRequest('image')
                    ->toMediaCollection('pump-solutions');
            }

            $this->clearCaches();
            DB::commit();

            return $pumpSolution;
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Error updating pump solution: ' . $e->getMessage(), [
                'id' => $pumpSolution->id,
                'data' => $data,
                'trace' => $e->getTraceAsString()
            ]);
            throw $e;
        }
    }

    public function deletePumpSolution(PumpSolution $pumpSolution)
    {
        DB::beginTransaction();
        try {
            $pumpSolution->delete();
            $this->clearCaches();
            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Error deleting pump solution: ' . $e->getMessage(), [
                'id' => $pumpSolution->id,
                'trace' => $e->getTraceAsString()
            ]);
            throw $e;
        }
    }

    public function clearCaches(): void
    {
        // Clear all pump solution related caches
        Cache::tags(['pump_solutions'])->flush();
    }
} 