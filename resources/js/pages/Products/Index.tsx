import React from 'react';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import { Product } from '@/types/product';
import ProductCard from '@/components/ProductCard';

interface Props extends PageProps {
    products: Product[];
}

export default function Index({ products }: Props) {
    return (
        <>
            <Head title="Products" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h1 className="text-3xl font-bold mb-8">Our Products</h1>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {products.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
} 