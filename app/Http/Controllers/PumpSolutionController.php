<?php

namespace App\Http\Controllers;

use App\Models\PumpSolution;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class PumpSolutionController extends Controller
{
    public function index(Request $request)
    {
        $query = PumpSolution::query();

        // Apply filters if provided
        if ($request->has('category')) {
            $query->byCategory($request->category);
        }

        if ($request->has(['min_price', 'max_price'])) {
            $query->byPriceRange($request->min_price, $request->max_price);
        }

        if ($request->has(['min_motor', 'max_motor'])) {
            $query->byMotorPower($request->min_motor, $request->max_motor);
        }

        if ($request->has(['min_flow', 'max_flow'])) {
            $query->byFlowRate($request->min_flow, $request->max_flow);
        }

        if ($request->has(['min_head', 'max_head'])) {
            $query->byHead($request->min_head, $request->max_head);
        }

        $pumpSolutions = $query->orderBy('order')->paginate(12);

        return Inertia::render('PumpSolutions/Index', [
            'pumpSolutions' => $pumpSolutions,
            'filters' => $request->only([
                'category',
                'min_price',
                'max_price',
                'min_motor',
                'max_motor',
                'min_flow',
                'max_flow',
                'min_head',
                'max_head'
            ]),
            'categories' => [
                'SOLAR PUMPS',
                'SOLAR PUMPS MAX',
                'SEWAGE PUMPS',
                'SUBMERSIBLE PUMPS',
                'BOOSTER PUMPS',
                'SPRINKLER PUMPS',
                'SOLAR PANEL',
                'SOLAR LIGHT',
                'WIRE ROPE'
            ]
        ]);
    }

    public function adminIndex()
    {
        $pumpSolutions = PumpSolution::orderBy('order')->paginate(9);
        return Inertia::render('Admin/PumpSolutions/Index', [
            'pumpSolutions' => $pumpSolutions,
        ]);
    }

    public function show(PumpSolution $pumpSolution)
    {
        return Inertia::render('PumpSolutions/Show', [
            'solution' => $pumpSolution,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/PumpSolutions/Create', [
            'categories' => [
                'SOLAR PUMPS',
                'SOLAR PUMPS MAX',
                'SEWAGE PUMPS',
                'SUBMERSIBLE PUMPS',
                'BOOSTER PUMPS',
                'SPRINKLER PUMPS',
                'SOLAR PANEL',
                'SOLAR LIGHT',
                'WIRE ROPE'
            ]
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'category' => 'required|string|in:SOLAR PUMPS,SOLAR PUMPS MAX,SEWAGE PUMPS,SUBMERSIBLE PUMPS,BOOSTER PUMPS,SPRINKLER PUMPS,SOLAR PANEL,SOLAR LIGHT,WIRE ROPE',
            'q_max' => 'nullable|numeric',
            'h_max' => 'nullable|numeric',
            'rated_q' => 'nullable|numeric',
            'rated_h' => 'nullable|numeric',
            'motor' => 'nullable|numeric',
            'price_zmw' => 'nullable|numeric',
            'vat_rate' => 'nullable|numeric',
            'net_price_zmw' => 'nullable|numeric',
            'is_featured' => 'boolean',
            'order' => 'integer',
        ]);

        PumpSolution::create($validated);

        return redirect()->route('admin.pump-solutions.index')
            ->with('success', 'Pump solution created successfully.');
    }

    public function edit(PumpSolution $pumpSolution)
    {
        return Inertia::render('Admin/PumpSolutions/Edit', [
            'solution' => $pumpSolution,
            'categories' => [
                'SOLAR PUMPS',
                'SOLAR PUMPS MAX',
                'SEWAGE PUMPS',
                'SUBMERSIBLE PUMPS',
                'BOOSTER PUMPS',
                'SPRINKLER PUMPS',
                'SOLAR PANEL',
                'SOLAR LIGHT',
                'WIRE ROPE'
            ]
        ]);
    }

    public function update(Request $request, PumpSolution $pumpSolution)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'category' => 'required|string|in:SOLAR PUMPS,SOLAR PUMPS MAX,SEWAGE PUMPS,SUBMERSIBLE PUMPS,BOOSTER PUMPS,SPRINKLER PUMPS,SOLAR PANEL,SOLAR LIGHT,WIRE ROPE',
            'q_max' => 'nullable|numeric',
            'h_max' => 'nullable|numeric',
            'rated_q' => 'nullable|numeric',
            'rated_h' => 'nullable|numeric',
            'motor' => 'nullable|numeric',
            'price_zmw' => 'nullable|numeric',
            'vat_rate' => 'nullable|numeric',
            'net_price_zmw' => 'nullable|numeric',
            'is_featured' => 'boolean',
            'order' => 'integer',
        ]);

        $pumpSolution->update($validated);

        return redirect()->route('admin.pump-solutions.index')
            ->with('success', 'Pump solution updated successfully.');
    }

    public function destroy(PumpSolution $pumpSolution)
    {
        $pumpSolution->delete();

        return redirect()->route('admin.pump-solutions.index')
            ->with('success', 'Pump solution deleted successfully.');
    }

    public function apiIndex()
    {
        $pumpSolutions = PumpSolution::all();

        return response()->json($pumpSolutions);
    }
}