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
        return $this->renderWithErrorHandling('PumpSolutions/Index', function () use ($request) {
            $request->validate([
                'category' => 'nullable|string',
                'search' => 'nullable|string',
                'sort_by' => 'nullable|in:title,category,order,created_at',
                'sort_direction' => 'nullable|in:asc,desc',
                'page' => 'nullable|integer|min:1',
                'min_price' => 'nullable|numeric|min:0',
                'max_price' => 'nullable|numeric|min:0',
                'min_motor' => 'nullable|numeric|min:0',
                'max_motor' => 'nullable|numeric|min:0',
                'min_flow' => 'nullable|numeric|min:0',
                'max_flow' => 'nullable|numeric|min:0',
                'min_head' => 'nullable|numeric|min:0',
                'max_head' => 'nullable|numeric|min:0',
            ]);

            $filters = [
                'category' => $request->input('category'),
                'search' => $request->input('search'),
                'min_price' => $request->input('min_price'),
                'max_price' => $request->input('max_price'),
                'min_motor' => $request->input('min_motor'),
                'max_motor' => $request->input('max_motor'),
                'min_flow' => $request->input('min_flow'),
                'max_flow' => $request->input('max_flow'),
                'min_head' => $request->input('min_head'),
                'max_head' => $request->input('max_head'),
            ];

            $sorting = [
                'sort_by' => $request->input('sort_by', 'title'),
                'sort_direction' => $request->input('sort_direction', 'asc'),
            ];

            $pumpSolutions = $this->pumpSolutionService->getFilteredPumpSolutions($filters, $sorting);

            return [
                'pumpSolutions' => [
                    'data' => $pumpSolutions->items(),
                    'current_page' => $pumpSolutions->currentPage(),
                    'last_page' => $pumpSolutions->lastPage(),
                    'per_page' => $pumpSolutions->perPage(),
                    'total' => $pumpSolutions->total(),
                ],
                'filters' => $filters,
                'categories' => Cache::remember('pump_categories', 3600, function () {
                    return PumpSolution::getCategories();
                })
            ];
        });
    }

    public function adminIndex()
    {
        return $this->renderWithErrorHandling('Admin/PumpSolutions/Index', function () {
            $pumpSolutions = Cache::remember('admin_pump_solutions', 300, function () {
                return PumpSolution::orderBy('order')->paginate(9);
            });

            return [
                'pumpSolutions' => $pumpSolutions,
            ];
        });
    }

    public function show(PumpSolution $pumpSolution)
    {
        return $this->executeWithErrorHandling(function () use ($pumpSolution) {
            return new PumpSolutionResource($pumpSolution);
        });
    }

    public function create()
    {
        return $this->renderWithErrorHandling('Admin/PumpSolutions/Create', function () {
            return [
                'categories' => Cache::remember('pump_categories', 3600, function () {
                    return PumpSolution::getCategories();
                })
            ];
        });
    }

    public function store(PumpSolutionRequest $request)
    {
        return $this->executeWithErrorHandling(function () use ($request) {
            $pumpSolution = $this->pumpSolutionService->createPumpSolution($request->validated());
            return new PumpSolutionResource($pumpSolution);
        });
    }

    public function edit(PumpSolution $pumpSolution)
    {
        return $this->renderWithErrorHandling('Admin/PumpSolutions/Edit', function () use ($pumpSolution) {
            return [
                'pumpSolution' => $pumpSolution,
                'categories' => Cache::remember('pump_categories', 3600, function () {
                    return PumpSolution::getCategories();
                })
            ];
        });
    }

    public function update(PumpSolutionRequest $request, PumpSolution $pumpSolution)
    {
        return $this->executeWithErrorHandling(function () use ($request, $pumpSolution) {
            $pumpSolution = $this->pumpSolutionService->updatePumpSolution($pumpSolution, $request->validated());
            return new PumpSolutionResource($pumpSolution);
        });
    }

    public function destroy(PumpSolution $pumpSolution)
    {
        return $this->executeWithErrorHandling(function () use ($pumpSolution) {
            $this->pumpSolutionService->deletePumpSolution($pumpSolution);
            return response()->noContent();
        });
    }

    public function apiIndex()
    {
        return $this->executeWithErrorHandling(function () {
            return Cache::remember('api_pump_solutions', 300, function () {
                return PumpSolutionResource::collection(PumpSolution::all());
            });
        });
    }
}