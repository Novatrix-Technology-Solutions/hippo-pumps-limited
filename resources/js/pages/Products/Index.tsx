import React, { useState, useMemo } from 'react';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import { Product } from '@/types/product';
import ProductCard from '@/components/ProductCard';

interface Props extends PageProps {
    products: Product[];
}

export default function Index({ products }: Props) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('');

    // Get unique categories
    const categories = useMemo(() => {
        return Array.from(new Set(products.map(product => product.category)));
    }, [products]);

    // Filter products based on search term and category
    const filteredProducts = useMemo(() => {
        return products.filter(product => {
            const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                product.category.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = !selectedCategory || product.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    }, [products, searchTerm, selectedCategory]);

    return (
        <>
            <Head title="Products" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h1 className="text-3xl font-bold mb-8">Our Products</h1>

                            {/* Filters */}
                            <div className="mb-8 space-y-4">
                                <div className="flex flex-col sm:flex-row gap-4">
                                    {/* Search Input */}
                                    <div className="flex-1">
                                        <input
                                            type="text"
                                            placeholder="Search products..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                                        />
                                    </div>

                                    {/* Category Filter */}
                                    <div className="w-full sm:w-64">
                                        <select
                                            value={selectedCategory}
                                            onChange={(e) => setSelectedCategory(e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                                        >
                                            <option value="">All Categories</option>
                                            {categories.map((category) => (
                                                <option key={category} value={category}>
                                                    {category}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                {/* Results count */}
                                <p className="text-sm text-gray-500">
                                    Showing {filteredProducts.length} of {products.length} products
                                </p>
                            </div>

                            {/* Products Grid */}
                            {filteredProducts.length === 0 ? (
                                <div className="text-center py-12">
                                    <h3 className="text-lg font-medium text-gray-900">No products found</h3>
                                    <p className="mt-2 text-sm text-gray-500">
                                        Try adjusting your search or filter criteria
                                    </p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {filteredProducts.map((product) => (
                                        <ProductCard key={product.id} product={product} />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
} 