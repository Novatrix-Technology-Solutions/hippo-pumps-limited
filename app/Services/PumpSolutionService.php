<?php

namespace App\Services;

use App\Models\PumpSolution;
use Illuminate\Support\Facades\Log;
use Illuminate\Pagination\LengthAwarePaginator;

class PumpSolutionService
{
    public function getFilteredPumpSolutions(array $filters, array $sorting): LengthAwarePaginator
    {
        try {
            $query = PumpSolution::query()->with('media');

            // Apply filters
            if (!empty($filters['search'])) {
                $query->where(function ($q) use ($filters) {
                    $q->where('title', 'like', '%' . $filters['search'] . '%')
                        ->orWhere('description', 'like', '%' . $filters['search'] . '%')
                        ->orWhere('category', 'like', '%' . $filters['search'] . '%');
                });
            }

            if (isset($filters['is_featured'])) {
                $query->where('is_featured', $filters['is_featured']);
            }

            // Apply sorting
            $sortField = $sorting['field'] ?? 'order';
            $sortDirection = $sorting['direction'] ?? 'asc';
            $query->orderBy($sortField, $sortDirection);

            return $query->paginate($filters['per_page'] ?? 9);
        } catch (\Exception $e) {
            Log::error('Error in PumpSolutionService@getFilteredPumpSolutions: ' . $e->getMessage(), [
                'filters' => $filters,
                'sorting' => $sorting,
                'trace' => $e->getTraceAsString()
            ]);
            throw $e;
        }
    }

    public function createPumpSolution(array $data): PumpSolution
    {
        try {
            $pumpSolution = PumpSolution::create($data);

            if (isset($data['image'])) {
                $pumpSolution->addMedia($data['image'])
                    ->toMediaCollection('pump-solutions');
            }

            return $pumpSolution;
        } catch (\Exception $e) {
            Log::error('Error in PumpSolutionService@createPumpSolution: ' . $e->getMessage(), [
                'data' => $data,
                'trace' => $e->getTraceAsString()
            ]);
            throw $e;
        }
    }

    public function updatePumpSolution(PumpSolution $pumpSolution, array $data): PumpSolution
    {
        try {
            $pumpSolution->update($data);

            if (isset($data['image'])) {
                $pumpSolution->clearMediaCollection('pump-solutions');
                $pumpSolution->addMedia($data['image'])
                    ->toMediaCollection('pump-solutions');
            }

            return $pumpSolution;
        } catch (\Exception $e) {
            Log::error('Error in PumpSolutionService@updatePumpSolution: ' . $e->getMessage(), [
                'pump_solution_id' => $pumpSolution->id,
                'data' => $data,
                'trace' => $e->getTraceAsString()
            ]);
            throw $e;
        }
    }

    public function deletePumpSolution(PumpSolution $pumpSolution): bool
    {
        try {
            return $pumpSolution->delete();
        } catch (\Exception $e) {
            Log::error('Error in PumpSolutionService@deletePumpSolution: ' . $e->getMessage(), [
                'pump_solution_id' => $pumpSolution->id,
                'trace' => $e->getTraceAsString()
            ]);
            throw $e;
        }
    }
}
