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
        $pumpSolutions = PumpSolution::orderBy('order')->get();
        $categories = PumpSolution::select('category')->distinct()->pluck('category');
        
        return Inertia::render('PumpSolutions/Index', [
            'pumpSolutions' => $pumpSolutions,
            'categories' => $categories,
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
            'image' => 'nullable|image|max:2048',
            'category' => 'required|string|in:Building Services,Irrigation,Mining,Industrial',
            'specifications' => 'nullable|array',
            'is_featured' => 'boolean',
            'order' => 'integer',
        ]);

        $solution = new PumpSolution($validated);
        $solution->slug = Str::slug($validated['title']);

        if ($request->hasFile('image')) {
            $solution->image = $request->file('image')->store('pump-solutions', 'public');
        }

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
            'image' => 'nullable|image|max:2048',
            'category' => 'required|string|in:Building Services,Irrigation,Mining,Industrial',
            'specifications' => 'nullable|array',
            'is_featured' => 'boolean',
            'order' => 'integer',
        ]);

        $pumpSolution->fill($validated);
        $pumpSolution->slug = Str::slug($validated['title']);

        if ($request->hasFile('image')) {
            $pumpSolution->image = $request->file('image')->store('pump-solutions', 'public');
        }

        $pumpSolution->save();

        return redirect()->route('pump-solutions.index');
    }

    public function destroy(PumpSolution $pumpSolution)
    {
        $pumpSolution->delete();
        return redirect()->route('pump-solutions.index');
    }
} 