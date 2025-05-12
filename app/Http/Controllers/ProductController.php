<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::orderBy('order')->get();
        return Inertia::render('Products/Index', [
            'products' => $products
        ]);
    }

    public function show(Product $product)
    {
        return Inertia::render('Products/Show', [
            'product' => $product
        ]);
    }

    public function adminIndex()
    {
        $products = Product::orderBy('order')->get();
        return Inertia::render('Admin/Products/Index', [
            'products' => [
                'data' => $products,
            ]
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/PumpSolutions/Form');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'required|string|max:255',
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

        try {
            $validated['slug'] = Str::slug($validated['title']);
            
            $product = Product::create($validated);

            if (!$product) {
                throw new \Exception('Failed to create product');
            }

            return redirect()->route('admin.products.index')
                ->with('success', 'Product created successfully.');
        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Failed to create product: ' . $e->getMessage()]);
        }
    }

    public function edit(Product $product)
    {
        return Inertia::render('Admin/PumpSolutions/Form', [
            'product' => $product
        ]);
    }

    public function update(Request $request, Product $product)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'required|string|max:255',
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

        try {
            $validated['slug'] = Str::slug($validated['title']);
            
            $updated = $product->update($validated);

            if (!$updated) {
                throw new \Exception('Failed to update product');
            }

            return redirect()->route('admin.products.index')
                ->with('success', 'Product updated successfully.');
        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Failed to update product: ' . $e->getMessage()]);
        }
    }

    public function destroy(Product $product)
    {
        try {
            $product->delete();
            return redirect()->route('admin.products.index')
                ->with('success', 'Product deleted successfully.');
        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Failed to delete product: ' . $e->getMessage()]);
        }
    }
}