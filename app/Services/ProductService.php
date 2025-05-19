<?php

namespace App\Services;

use App\Models\Product;
use Illuminate\Support\Facades\Log;
use Illuminate\Pagination\LengthAwarePaginator;

class ProductService
{
    public function getFilteredProducts(array $filters, array $sorting): LengthAwarePaginator
    {
        try {
            $query = Product::query()->with('media');

            // Apply filters
            if (!empty($filters['search'])) {
                $query->where(function ($q) use ($filters) {
                    $q->where('title', 'like', '%' . $filters['search'] . '%')
                        ->orWhere('description', 'like', '%' . $filters['search'] . '%')
                        ->orWhere('category', 'like', '%' . $filters['search'] . '%');
                });
            }

            if (isset($filters['is_featured'])) {
                $query->where('is_featured', $filters['is_featured']);
            }

            // Apply sorting
            $sortField = $sorting['field'] ?? 'order';
            $sortDirection = $sorting['direction'] ?? 'asc';
            $query->orderBy($sortField, $sortDirection);

            return $query->paginate($filters['per_page'] ?? 9);
        } catch (\Exception $e) {
            Log::error('Error in ProductService@getFilteredProducts: ' . $e->getMessage(), [
                'filters' => $filters,
                'sorting' => $sorting,
                'trace' => $e->getTraceAsString()
            ]);
            throw $e;
        }
    }

    public function createProduct(array $data): Product
    {
        try {
            $product = Product::create($data);

            if (isset($data['image'])) {
                $product->addMedia($data['image'])
                    ->toMediaCollection('products');
            }

            return $product;
        } catch (\Exception $e) {
            Log::error('Error in ProductService@createProduct: ' . $e->getMessage(), [
                'data' => $data,
                'trace' => $e->getTraceAsString()
            ]);
            throw $e;
        }
    }

    public function updateProduct(Product $product, array $data): Product
    {
        try {
            $product->update($data);

            if (isset($data['image'])) {
                $product->clearMediaCollection('products');
                $product->addMedia($data['image'])
                    ->toMediaCollection('products');
            }

            return $product;
        } catch (\Exception $e) {
            Log::error('Error in ProductService@updateProduct: ' . $e->getMessage(), [
                'product_id' => $product->id,
                'data' => $data,
                'trace' => $e->getTraceAsString()
            ]);
            throw $e;
        }
    }

    public function deleteProduct(Product $product): bool
    {
        try {
            return $product->delete();
        } catch (\Exception $e) {
            Log::error('Error in ProductService@deleteProduct: ' . $e->getMessage(), [
                'product_id' => $product->id,
                'trace' => $e->getTraceAsString()
            ]);
            throw $e;
        }
    }
}
