<?php

namespace App\Http\Controllers;

use App\Models\PumpSolution;
use App\Http\Requests\PumpSolutionRequest;
use App\Events\PumpSolutionUpdated;
use App\Services\PumpSolutionService;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;
use App\Http\Resources\PumpSolutionResource;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class PumpSolutionController extends Controller
{
    protected $pumpSolutionService;

    public function __construct(PumpSolutionService $pumpSolutionService)
    {
        $this->pumpSolutionService = $pumpSolutionService;
    }

    public function index(Request $request)
    {
        $request->validate([
            'category' => 'nullable|string',
            'search' => 'nullable|string',
            'sort_by' => 'nullable|in:title,category,order,created_at',
            'sort_direction' => 'nullable|in:asc,desc',
        ]);

        $filters = [
            'category' => $request->input('category'),
            'search' => $request->input('search'),
        ];

        $sorting = [
            'sort_by' => $request->input('sort_by', 'title'),
            'sort_direction' => $request->input('sort_direction', 'asc'),
        ];

        $pumpSolutions = $this->pumpSolutionService->getFilteredPumpSolutions($filters, $sorting);

        return PumpSolutionResource::collection($pumpSolutions);
    }

    public function adminIndex()
    {
        try {
            $pumpSolutions = Cache::remember('admin_pump_solutions', 300, function () {
                return PumpSolution::orderBy('order')->paginate(9);
            });

            return Inertia::render('Admin/PumpSolutions/Index', [
                'pumpSolutions' => $pumpSolutions,
            ]);
        } catch (\Exception $e) {
            Log::error('Error in PumpSolutionController@adminIndex: ' . $e->getMessage());
            return back()->with('error', 'An error occurred while loading pump solutions.');
        }
    }

    public function show(PumpSolution $pumpSolution)
    {
        return new PumpSolutionResource($pumpSolution);
    }

    public function create()
    {
        try {
            return Inertia::render('Admin/PumpSolutions/Create', [
                'categories' => Cache::remember('pump_categories', 3600, function () {
                    return PumpSolution::getCategories();
                })
            ]);
        } catch (\Exception $e) {
            Log::error('Error in PumpSolutionController@create: ' . $e->getMessage());
            return back()->with('error', 'An error occurred while loading the create form.');
        }
    }

    public function store(PumpSolutionRequest $request)
    {
        $pumpSolution = $this->pumpSolutionService->createPumpSolution($request->validated());

        return new PumpSolutionResource($pumpSolution);
    }

    public function edit(PumpSolution $pumpSolution)
    {
        try {
            return Inertia::render('Admin/PumpSolutions/Edit', [
                'pumpSolution' => $pumpSolution,
                'categories' => Cache::remember('pump_categories', 3600, function () {
                    return PumpSolution::getCategories();
                })
            ]);
        } catch (\Exception $e) {
            Log::error('Error in PumpSolutionController@edit: ' . $e->getMessage());
            return back()->with('error', 'An error occurred while loading the edit form.');
        }
    }

    public function update(PumpSolutionRequest $request, PumpSolution $pumpSolution)
    {
        $pumpSolution = $this->pumpSolutionService->updatePumpSolution($pumpSolution, $request->validated());

        return new PumpSolutionResource($pumpSolution);
    }

    public function destroy(PumpSolution $pumpSolution)
    {
        $this->pumpSolutionService->deletePumpSolution($pumpSolution);

        return response()->noContent();
    }

    public function apiIndex()
    {
        try {
            return Cache::remember('api_pump_solutions', 300, function () {
                return PumpSolutionResource::collection(PumpSolution::all());
            });
        } catch (\Exception $e) {
            Log::error('Error in PumpSolutionController@apiIndex: ' . $e->getMessage());
            return response()->json(['error' => 'An error occurred while fetching pump solutions.'], 500);
        }
    }
}