<?php

namespace App\Services;

use App\Models\PumpSolution;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class PumpSolutionService
{
    public function getFilteredPumpSolutions(array $filters = [], string $sortBy = 'name', string $sortOrder = 'asc', int $perPage = 12)
    {
        $cacheKey = 'pump_solutions_' . md5(json_encode($filters) . $sortBy . $sortOrder . $perPage);
        
        return Cache::remember($cacheKey, 60, function () use ($filters, $sortBy, $sortOrder, $perPage) {
            $query = PumpSolution::query();

            if (isset($filters['category'])) {
                $query->where('category', $filters['category']);
            }

            if (isset($filters['sub_category'])) {
                $query->where('sub_category', $filters['sub_category']);
            }

            if (isset($filters['min_flow_rate'])) {
                $query->where('flow_rate', '>=', $filters['min_flow_rate']);
            }

            if (isset($filters['max_flow_rate'])) {
                $query->where('flow_rate', '<=', $filters['max_flow_rate']);
            }

            if (isset($filters['min_head'])) {
                $query->where('head', '>=', $filters['min_head']);
            }

            if (isset($filters['max_head'])) {
                $query->where('head', '<=', $filters['max_head']);
            }

            if (isset($filters['min_power'])) {
                $query->where('power', '>=', $filters['min_power']);
            }

            if (isset($filters['max_power'])) {
                $query->where('power', '<=', $filters['max_power']);
            }

            if (isset($filters['material'])) {
                $query->where('material', $filters['material']);
            }

            return $query->orderBy($sortBy, $sortOrder)->paginate($perPage);
        });
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