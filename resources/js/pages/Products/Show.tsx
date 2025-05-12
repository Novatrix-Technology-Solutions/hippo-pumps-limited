import React from 'react';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import { Product } from '@/types/product';
import { Link } from '@inertiajs/react';

interface Props extends PageProps {
    product: Product;
}

export default function Show({ product }: Props) {
    const formatPrice = (price: string) => {
        return new Intl.NumberFormat('en-ZM', {
            style: 'currency',
            currency: 'ZMW',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(parseFloat(price));
    };

    return (
        <>
            <Head title={product.title} />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="mb-6">
                                <Link
                                    href={route('products.index')}
                                    className="text-primary-600 hover:text-primary-700"
                                >
                                    ← Back to Products
                                </Link>
                            </div>

                            <h1 className="text-3xl font-bold mb-6">{product.title}</h1>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-6">
                                    <div>
                                        <h2 className="text-xl font-semibold mb-4">Product Details</h2>
                                        <div className="space-y-4">
                                            <div className="flex justify-between border-b py-2">
                                                <span className="font-medium text-gray-700">Category</span>
                                                <span className="text-gray-900">{product.category}</span>
                                            </div>
                                            {product.q_max && (
                                                <div className="flex justify-between border-b py-2">
                                                    <span className="font-medium text-gray-700">Q Max</span>
                                                    <span className="text-gray-900">{product.q_max}</span>
                                                </div>
                                            )}
                                            {product.h_max && (
                                                <div className="flex justify-between border-b py-2">
                                                    <span className="font-medium text-gray-700">H Max</span>
                                                    <span className="text-gray-900">{product.h_max}</span>
                                                </div>
                                            )}
                                            {product.rated_q && (
                                                <div className="flex justify-between border-b py-2">
                                                    <span className="font-medium text-gray-700">Rated Q</span>
                                                    <span className="text-gray-900">{product.rated_q}</span>
                                                </div>
                                            )}
                                            {product.rated_h && (
                                                <div className="flex justify-between border-b py-2">
                                                    <span className="font-medium text-gray-700">Rated H</span>
                                                    <span className="text-gray-900">{product.rated_h}</span>
                                                </div>
                                            )}
                                            {product.motor && (
                                                <div className="flex justify-between border-b py-2">
                                                    <span className="font-medium text-gray-700">Motor</span>
                                                    <span className="text-gray-900">{product.motor}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {product.price_zmw_including_vat && (
                                        <div>
                                            <h2 className="text-xl font-semibold mb-4">Pricing</h2>
                                            <div className="space-y-4">
                                                <div className="flex justify-between border-b py-2">
                                                    <span className="font-medium text-gray-700">Price (Including VAT)</span>
                                                    <span className="text-gray-900 font-bold">
                                                        {formatPrice(product.price_zmw_including_vat)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-6">
                                    <div className="bg-gray-50 p-6 rounded-lg">
                                        <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
                                        <p className="text-gray-600 mb-4">
                                            Interested in this product? Contact us for more information or to place an order.
                                        </p>
                                        <Link
                                            href={route('find-us')}
                                            className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
                                        >
                                            Get in Touch
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
} 