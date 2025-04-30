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
        $validator = Validator::make($request->all(), [
            'category' => ['nullable', 'string', Rule::in(PumpSolution::getCategories())],
            'sub_category' => ['nullable', 'string'],
            'min_flow_rate' => ['nullable', 'numeric', 'min:0'],
            'max_flow_rate' => ['nullable', 'numeric', 'min:0'],
            'min_head' => ['nullable', 'numeric', 'min:0'],
            'max_head' => ['nullable', 'numeric', 'min:0'],
            'min_power' => ['nullable', 'numeric', 'min:0'],
            'max_power' => ['nullable', 'numeric', 'min:0'],
            'material' => ['nullable', 'string'],
            'sort_by' => ['nullable', 'string', Rule::in(['name', 'price', 'flow_rate', 'head', 'power'])],
            'sort_order' => ['nullable', 'string', Rule::in(['asc', 'desc'])],
            'page' => ['nullable', 'integer', 'min:1'],
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Invalid input data',
                'errors' => $validator->errors()
            ], 422);
        }

        $filters = $request->only([
            'category',
            'sub_category',
            'min_flow_rate',
            'max_flow_rate',
            'min_head',
            'max_head',
            'min_power',
            'max_power',
            'material'
        ]);

        $sortBy = $request->input('sort_by', 'name');
        $sortOrder = $request->input('sort_order', 'asc');

        return $this->pumpSolutionService->getFilteredPumpSolutions($filters, $sortBy, $sortOrder);
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
        return $this->pumpSolutionService->getPumpSolution($pumpSolution->id);
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

        if ($request->hasFile('image')) {
            $pumpSolution->addMediaFromRequest('image')
                ->toMediaCollection('pump-solutions');
        }

        event(new PumpSolutionUpdated($pumpSolution));

        return response()->json($pumpSolution, 201);
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

        if ($request->hasFile('image')) {
            $pumpSolution->clearMediaCollection('pump-solutions');
            $pumpSolution->addMediaFromRequest('image')
                ->toMediaCollection('pump-solutions');
        }

        event(new PumpSolutionUpdated($pumpSolution));

        return response()->json($pumpSolution);
    }

    public function destroy(PumpSolution $pumpSolution)
    {
        $this->pumpSolutionService->deletePumpSolution($pumpSolution);

        event(new PumpSolutionUpdated($pumpSolution));

        return response()->json(null, 204);
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