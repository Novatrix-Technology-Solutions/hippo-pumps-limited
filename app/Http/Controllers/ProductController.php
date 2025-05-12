<?php

namespace App\Http\Controllers;

use App\Models\Product; // Changed from PumpSolution
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ProductController extends Controller // Changed class name
{
    // Public index - Renders the frontend product listing page
    public function index()
    {
        $products = Product::orderBy('order')->get(); // Changed variable and model
        $categories = $products->pluck('category')->unique()->values(); // Changed variable

        // Consider if this public view path needs changing too, e.g., 'Products/Index'
        return Inertia::render('Public/Products/Index', [ // KEEPING OLD VIEW PATH FOR NOW - Needs frontend refactor later
            'products' => $products, // Changed variable name
            'categories' => $categories,
        ]);
    }

    // Public show - Renders the frontend single product page
    public function show(Product $product) // Changed type hint and variable name
    {
         // Consider if this public view path needs changing too, e.g., 'Products/Show'
        return Inertia::render('Public/Products/Show', [ // KEEPING OLD VIEW PATH FOR NOW - Needs frontend refactor later
            'product' => $product, // Changed variable name
        ]);
    }

    // Admin index - Renders the admin product listing page
    public function adminIndex() // New method for admin listing
    {
        return Inertia::render('Admin/Products/Index', [ // Changed view path
            'products' => Product::orderBy('order')->get(), // Changed model
        ]);
    }

    // Admin create - Shows the form to create a new product
    public function create()
    {
        return Inertia::render('Admin/Products/Create'); // Changed view path
    }

    // Admin store - Saves a new product
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'required|string|in:' . implode(',', \App\Models\Product::CATEGORIES),
            'q_max' => 'nullable|string|max:255',
            'h_max' => 'nullable|string|max:255',
            'rated_q' => 'nullable|string|max:255',
            'rated_h' => 'nullable|string|max:255',
            'motor' => 'nullable|string|max:255',
            'price_zmw_no_vat' => 'nullable|string|max:255',
            'vat_rate' => 'nullable|string|max:255',
            'price_zmw_including_vat' => 'nullable|string|max:255',
            'is_featured' => 'boolean',
            'order' => 'integer',
        ]);

        $product = new Product($validated);
        $product->slug = Str::slug($validated['title']);
        $product->save();

        return redirect()->route('admin.products.index')->with('success', 'Product created successfully.');
    }

    // Admin edit - Shows the form to edit an existing product
    public function edit(Product $product) // Changed type hint and variable name
    {
        return Inertia::render('Admin/Products/Edit', [ // Changed view path
            'product' => $product, // Changed variable name
        ]);
    }

    // Admin update - Updates an existing product
    public function update(Request $request, Product $product) // Changed type hint and variable name
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'required|string|in:' . implode(',', \App\Models\Product::CATEGORIES),
            'q_max' => 'nullable|string|max:255',
            'h_max' => 'nullable|string|max:255',
            'rated_q' => 'nullable|string|max:255',
            'rated_h' => 'nullable|string|max:255',
            'motor' => 'nullable|string|max:255',
            'price_zmw_no_vat' => 'nullable|string|max:255',
            'vat_rate' => 'nullable|string|max:255',
            'price_zmw_including_vat' => 'nullable|string|max:255',
            'is_featured' => 'boolean',
            'order' => 'integer',
        ]);

        $product->fill($validated);
        $product->slug = Str::slug($validated['title']);
        $product->save();

        return redirect()->route('admin.products.index')->with('success', 'Product updated successfully.');
    }

    // Admin destroy - Deletes a product
    public function destroy(Product $product) // Changed type hint and variable name
    {
        $product->delete(); // Changed variable
         // Changed redirect route name (assuming admin resource route)
        return redirect()->route('admin.products.index');
    }
}