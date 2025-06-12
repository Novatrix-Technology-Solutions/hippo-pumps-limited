<?php

namespace App\Listeners;

use App\Events\PumpSolutionUpdated;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class HandlePumpSolutionUpdate
{
    public function handle(PumpSolutionUpdated $event)
    {
        // Clear relevant caches
        Cache::forget('pump_solutions_*');
        Cache::forget('pump_solution_' . $event->pumpSolution->id);
        Cache::forget('pump_categories');

        // Log the update
        Log::info('Pump solution updated', [
            'id' => $event->pumpSolution->id,
            'name' => $event->pumpSolution->name,
            'category' => $event->pumpSolution->category,
            'updated_at' => $event->pumpSolution->updated_at,
        ]);
    }
} 