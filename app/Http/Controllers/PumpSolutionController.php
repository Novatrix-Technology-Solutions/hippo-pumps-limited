<?php

namespace App\Http\Controllers;

use App\Models\PumpSolution;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class PumpSolutionController extends Controller
{
    public function index()
    {
        $pumpSolutions = PumpSolution::all();

        return Inertia::render('PumpSolutions/Index', [
            'pumpSolutions' => $pumpSolutions,
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
        return Inertia::render('Admin/PumpSolutions/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'category' => 'required|string|in:Building Services,Irrigation,Mining,Industrial',
            'specifications' => 'nullable|array',
            'is_featured' => 'boolean',
            'order' => 'integer',
        ]);

        $solution = new PumpSolution($validated);
        $solution->slug = Str::slug($validated['title']);


        $solution->save();

        return redirect()->route('pump-solutions.index');
    }

    public function edit(PumpSolution $pumpSolution)
    {
        return Inertia::render('Admin/PumpSolutions/Edit', [
            'solution' => $pumpSolution,
        ]);
    }

    public function update(Request $request, PumpSolution $pumpSolution)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'category' => 'required|string|in:Building Services,Irrigation,Mining,Industrial',
            'specifications' => 'nullable|array',
            'is_featured' => 'boolean',
            'order' => 'integer',
        ]);

        $pumpSolution->fill($validated);
        $pumpSolution->slug = Str::slug($validated['title']);


        $pumpSolution->save();

        return redirect()->route('pump-solutions.index');
    }

    public function destroy(PumpSolution $pumpSolution)
    {
        $pumpSolution->delete();
        return redirect()->route('pump-solutions.index');
    }
} 