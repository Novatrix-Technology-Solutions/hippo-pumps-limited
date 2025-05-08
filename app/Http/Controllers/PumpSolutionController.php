<?php

namespace App\Http\Controllers;

use App\Models\PumpSolution;
use App\Services\PumpSolutionService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;

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
            $filters = [
                'search' => $request->input('search'),
                'is_featured' => $request->boolean('is_featured'),
                'per_page' => $request->input('per_page', 10),
            ];

            $sorting = [
                'field' => $request->input('sort_field', 'created_at'),
                'direction' => $request->input('sort_direction', 'desc'),
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
                'sorting' => $sorting,
            ];
        });
    }

    public function show(PumpSolution $pumpSolution)
    {
        return $this->renderWithErrorHandling('PumpSolutions/Show', function () use ($pumpSolution) {
            return [
                'pumpSolution' => $pumpSolution->load('media'),
            ];
        });
    }

    public function adminIndex()
    {
        return $this->renderWithErrorHandling('Admin/PumpSolutions/Index', function () {
            $pumpSolutions = Cache::remember('admin_pump_solutions', 300, function () {
                return PumpSolution::with('media')
                    ->orderBy('created_at', 'desc')
                    ->paginate(10);
            });

            return [
                'pumpSolutions' => $pumpSolutions,
            ];
        });
    }

    public function create()
    {
        return $this->renderWithErrorHandling('Admin/PumpSolutions/Create', function () {
            return [];
        });
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'features' => 'nullable|array',
            'specifications' => 'nullable|array',
            'applications' => 'nullable|array',
            'is_featured' => 'boolean',
            'order' => 'integer',
            'image' => 'nullable|image|max:10240', // 10MB max
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        try {
            $pumpSolution = $this->pumpSolutionService->createPumpSolution($validator->validated());
            return redirect()->route('admin.pump-solutions.index')
                ->with('success', 'Pump solution created successfully.');
        } catch (\Exception $e) {
            return back()->with('error', 'Failed to create pump solution: ' . $e->getMessage());
        }
    }

    public function edit(PumpSolution $pumpSolution)
    {
        return $this->renderWithErrorHandling('Admin/PumpSolutions/Edit', function () use ($pumpSolution) {
            return [
                'pumpSolution' => $pumpSolution->load('media'),
            ];
        });
    }

    public function update(Request $request, PumpSolution $pumpSolution)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'features' => 'nullable|array',
            'specifications' => 'nullable|array',
            'applications' => 'nullable|array',
            'is_featured' => 'boolean',
            'order' => 'integer',
            'image' => 'nullable|image|max:10240', // 10MB max
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        try {
            $this->pumpSolutionService->updatePumpSolution($pumpSolution, $validator->validated());
            return redirect()->route('admin.pump-solutions.index')
                ->with('success', 'Pump solution updated successfully.');
        } catch (\Exception $e) {
            return back()->with('error', 'Failed to update pump solution: ' . $e->getMessage());
        }
    }

    public function destroy(PumpSolution $pumpSolution)
    {
        try {
            $this->pumpSolutionService->deletePumpSolution($pumpSolution);
            return redirect()->route('admin.pump-solutions.index')
                ->with('success', 'Pump solution deleted successfully.');
        } catch (\Exception $e) {
            return back()->with('error', 'Failed to delete pump solution: ' . $e->getMessage());
        }
    }

    protected function renderWithErrorHandling(string $page, callable $dataCallback)
    {
        try {
            return Inertia::render($page, $dataCallback());
        } catch (\Exception $e) {
            return back()->with('error', 'An error occurred: ' . $e->getMessage());
        }
    }
}
