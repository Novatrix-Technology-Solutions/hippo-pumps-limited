<?php

namespace App\Http\Controllers;

use App\Models\PumpSolution;
use App\Services\ProductService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;

class ProductController extends Controller
{
    protected $productService;

    public function __construct(ProductService $productService)
    {
        $this->productService = $productService;
    }

    /**
     * Render with error handling
     */
    protected function renderWithErrorHandling(string $component, $props = [])
    {
        try {
            return Inertia::render($component, $props);
        } catch (\Exception $e) {
            return back()->with('error', 'An error occurred: ' . $e->getMessage());
        }
    }

    public function index(Request $request)
    {
        $filters = [
            'search' => $request->input('search'),
            'is_featured' => $request->boolean('is_featured'),
            'per_page' => $request->input('per_page', 9),
        ];

        $sorting = [
            'field' => $request->input('sort_field', 'order'),
            'direction' => $request->input('sort_direction', 'asc'),
        ];

        try {
            $products = $this->productService->getFilteredProducts($filters, $sorting);

            $props = [
                'products' => [
                    'data' => $products->items(),
                    'current_page' => $products->currentPage(),
                    'last_page' => $products->lastPage(),
                    'per_page' => $products->perPage(),
                    'total' => $products->total(),
                ],
                'filters' => $filters,
                'sorting' => $sorting,
            ];

            return $this->renderWithErrorHandling('Products/Index', $props);
        } catch (\Exception $e) {
            return back()->with('error', 'An error occurred: ' . $e->getMessage());
        }
    }

    public function show(PumpSolution $product)
    {
        try {
            $props = [
                'product' => $product->load('media'),
            ];

            return $this->renderWithErrorHandling('Products/Show', $props);
        } catch (\Exception $e) {
            return back()->with('error', 'An error occurred: ' . $e->getMessage());
        }
    }

    public function adminIndex()
    {
        try {
            $products = Cache::remember('admin_products', 300, function () {
                return PumpSolution::with('media')
                    ->orderBy('order', 'asc')
                    ->paginate(10);
            });

            $props = [
                'products' => $products,
            ];

            return $this->renderWithErrorHandling('Admin/Products/Index', $props);
        } catch (\Exception $e) {
            return back()->with('error', 'An error occurred: ' . $e->getMessage());
        }
    }

    public function create()
    {
        return $this->renderWithErrorHandling('Admin/Products/Create', []);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'category' => 'required|string|max:255',
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'features' => 'nullable|array',
            'specifications' => 'nullable|array',
            'applications' => 'nullable|array',
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
            'image' => 'nullable|image|max:10240', // 10MB max
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        try {
            $product = $this->productService->createProduct($validator->validated());
            return redirect()->route('admin.products.index')
                ->with('success', 'Product created successfully.');
        } catch (\Exception $e) {
            return back()->with('error', 'Failed to create product: ' . $e->getMessage());
        }
    }

    public function edit(PumpSolution $product)
    {
        try {
            $props = [
                'product' => $product->load('media'),
            ];

            return $this->renderWithErrorHandling('Admin/Products/Edit', $props);
        } catch (\Exception $e) {
            return back()->with('error', 'An error occurred: ' . $e->getMessage());
        }
    }

    public function update(Request $request, PumpSolution $product)
    {
        $validator = Validator::make($request->all(), [
            'category' => 'required|string|max:255',
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'features' => 'nullable|array',
            'specifications' => 'nullable|array',
            'applications' => 'nullable|array',
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
            'image' => 'nullable|image|max:10240', // 10MB max
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        try {
            $this->productService->updateProduct($product, $validator->validated());
            return redirect()->route('admin.products.index')
                ->with('success', 'Product updated successfully.');
        } catch (\Exception $e) {
            return back()->with('error', 'Failed to update product: ' . $e->getMessage());
        }
    }

    public function destroy(PumpSolution $product)
    {
        try {
            $this->productService->deleteProduct($product);
            return redirect()->route('admin.products.index')
                ->with('success', 'Product deleted successfully.');
        } catch (\Exception $e) {
            return back()->with('error', 'Failed to delete product: ' . $e->getMessage());
        }
    }

    public function apiIndex(Request $request)
    {
        try {
            $filters = [
                'search' => $request->input('search'),
                'is_featured' => $request->boolean('is_featured'),
                'per_page' => $request->input('per_page', 9),
            ];

            $sorting = [
                'field' => $request->input('sort_field', 'order'),
                'direction' => $request->input('sort_direction', 'asc'),
            ];

            $products = $this->productService->getFilteredProducts($filters, $sorting);

            return response()->json([
                'success' => true,
                'data' => [
                    'items' => $products->items(),
                    'current_page' => $products->currentPage(),
                    'last_page' => $products->lastPage(),
                    'per_page' => $products->perPage(),
                    'total' => $products->total(),
                ],
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'An error occurred: ' . $e->getMessage(),
            ], 500);
        }
    }
}
