import React from 'react';

interface Specifications {
    qMax: number;
    hMax: number;
    ratedQ: number;
    ratedH: number;
    motor: number;
    price: number;
}

interface Props {
    title: string;
    description: string;
    category: string;
    specifications: Specifications;
}

export default function ProductCard({ title, description, category, specifications }: Props) {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{title}</h3>
                <p className="text-gray-600 mb-4">{description}</p>
                <div className="mb-4">
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                        {category}
                    </span>
                </div>
                <div className="space-y-2">
                    <div className="flex justify-between">
                        <span className="text-gray-600">Q.Max (m³/hr):</span>
                        <span className="font-medium">{specifications.qMax}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">H.Max (m):</span>
                        <span className="font-medium">{specifications.hMax}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Rated Q (m³/hr):</span>
                        <span className="font-medium">{specifications.ratedQ}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Rated H (m):</span>
                        <span className="font-medium">{specifications.ratedH}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Motor (HP):</span>
                        <span className="font-medium">{specifications.motor}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Price (ZMW):</span>
                        <span className="font-medium">
                            {specifications.price ? specifications.price.toLocaleString() : 'N/A'}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}