<?php

namespace App\Services;

use App\Models\PumpSolution;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\DB;

class PumpSolutionService
{
    public function getFilteredPumpSolutions(array $filters, array $sorting)
    {
        try {
            $query = PumpSolution::query();

            // Apply category filter
            if (!empty($filters['category'])) {
                $query->where('category', $filters['category']);
            }

            // Apply search filter
            if (!empty($filters['search'])) {
                $query->where(function (Builder $q) use ($filters) {
                    $q->where('title', 'like', '%' . $filters['search'] . '%')
                        ->orWhere('description', 'like', '%' . $filters['search'] . '%')
                        ->orWhere('item_code', 'like', '%' . $filters['search'] . '%');
                });
            }

            // Apply price range filter
            if (!empty($filters['min_price'])) {
                $query->where('net_price_zmw', '>=', $filters['min_price']);
            }
            if (!empty($filters['max_price'])) {
                $query->where('net_price_zmw', '<=', $filters['max_price']);
            }

            // Apply motor power filter
            if (!empty($filters['min_motor'])) {
                $query->where('motor', '>=', $filters['min_motor']);
            }
            if (!empty($filters['max_motor'])) {
                $query->where('motor', '<=', $filters['max_motor']);
            }

            // Apply flow rate filter
            if (!empty($filters['min_flow'])) {
                $query->where('q_max', '>=', $filters['min_flow']);
            }
            if (!empty($filters['max_flow'])) {
                $query->where('q_max', '<=', $filters['max_flow']);
            }

            // Apply head filter
            if (!empty($filters['min_head'])) {
                $query->where('h_max', '>=', $filters['min_head']);
            }
            if (!empty($filters['max_head'])) {
                $query->where('h_max', '<=', $filters['max_head']);
            }

            // Apply sorting
            $sortBy = $sorting['sort_by'] ?? 'title';
            $sortDirection = $sorting['sort_direction'] ?? 'asc';

            $query->orderBy($sortBy, $sortDirection);

            return $query->paginate(9);
        } catch (\Exception $e) {
            Log::error('Error in PumpSolutionService@getFilteredPumpSolutions: ' . $e->getMessage());
            throw $e;
        }
    }

    public function getPumpSolution(int $id)
    {
        $cacheKey = 'pump_solution_' . $id;
        
        return Cache::remember($cacheKey, 60, function () use ($id) {
            return PumpSolution::findOrFail($id);
        });
    }

    public function createPumpSolution(array $data)
    {
        $pumpSolution = PumpSolution::create($data);

        if (isset($data['image'])) {
            $pumpSolution->addMediaFromRequest('image')
                ->toMediaCollection('pump-solutions');
        }

        $this->clearCaches($pumpSolution);

        return $pumpSolution;
    }

    public function updatePumpSolution(PumpSolution $pumpSolution, array $data)
    {
        $pumpSolution->update($data);

        if (isset($data['image'])) {
            $pumpSolution->clearMediaCollection('pump-solutions');
            $pumpSolution->addMediaFromRequest('image')
                ->toMediaCollection('pump-solutions');
        }

        $this->clearCaches($pumpSolution);

        return $pumpSolution;
    }

    public function deletePumpSolution(PumpSolution $pumpSolution)
    {
        $pumpSolution->delete();

        $this->clearCaches($pumpSolution);
    }

    protected function clearCaches(PumpSolution $pumpSolution)
    {
        Cache::forget('pump_solutions_*');
        Cache::forget('pump_solution_' . $pumpSolution->id);
        Cache::forget('pump_categories');

        Log::info('Caches cleared for pump solution', [
            'id' => $pumpSolution->id,
            'name' => $pumpSolution->name,
        ]);
    }
} 