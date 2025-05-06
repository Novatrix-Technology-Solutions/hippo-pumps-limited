import { Head } from '@inertiajs/react';
import ProductCard from '@/components/ProductCard';
import { useForm } from '@inertiajs/react';
import { useEffect, useCallback, useMemo } from 'react';
import { debounce } from 'lodash';

interface PumpSolution {
    id: number;
    title: string;
    description: string;
    category: string;
    q_max: number;
    h_max: number;
    rated_q: number;
    rated_h: number;
    motor: number;
    price_zmw: number;
    vat_rate: number;
    net_price_zmw: number;
    is_featured: boolean;
    order: number;
}

interface Props {
    pumpSolutions: {
        data: PumpSolution[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    filters: {
        category?: string;
        min_price?: number;
        max_price?: number;
        min_motor?: number;
        max_motor?: number;
        min_flow?: number;
        max_flow?: number;
        min_head?: number;
        max_head?: number;
    };
    categories: string[];
}

export default function Index({ pumpSolutions, filters, categories }: Props) {
    const { data, setData, get } = useForm({
        category: filters.category || '',
        min_price: filters.min_price || '',
        max_price: filters.max_price || '',
        min_motor: filters.min_motor || '',
        max_motor: filters.max_motor || '',
        min_flow: filters.min_flow || '',
        max_flow: filters.max_flow || '',
        min_head: filters.min_head || '',
        max_head: filters.max_head || '',
        page: 1,
    });

    // Memoize the filter handler to prevent unnecessary re-renders
    const handleFilter = useCallback(() => {
        get(route('pump-solutions.index'), {
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => {
                setData('page', 1);
            },
        });
    }, [get, setData]);

    // Debounce the filter handler to prevent too many requests
    const debouncedFilter = useMemo(
        () => debounce(handleFilter, 300),
        [handleFilter]
    );

    const handlePageChange = useCallback((page: number) => {
        get(route('pump-solutions.index'), {
            ...data,
            page: page,
        }, {
            preserveState: true,
            preserveScroll: true,
        });
    }, [get, data]);

    const resetFilters = useCallback(() => {
        setData({
            category: '',
            min_price: '',
            max_price: '',
            min_motor: '',
            max_motor: '',
            min_flow: '',
            max_flow: '',
            min_head: '',
            max_head: '',
            page: 1,
        });
        get(route('pump-solutions.index'));
    }, [get, setData]);

    // Reset to page 1 when filters change
    useEffect(() => {
        setData('page', 1);
    }, [data.category, data.min_price, data.max_price, data.min_motor, data.max_motor, data.min_flow, data.max_flow, data.min_head, data.max_head, setData]);

    // Cleanup debounce on unmount
    useEffect(() => {
        return () => {
            debouncedFilter.cancel();
        };
    }, [debouncedFilter]);

    return (
        <>
            <Head title="Pump Solutions" />
            <div className="container mx-auto py-12">
                <h1 className="text-4xl font-bold text-center mb-12">Our Pump Solutions</h1>

                {/* Filters */}
                <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Category</label>
                            <select
                                value={data.category}
                                onChange={(e) => {
                                    setData('category', e.target.value);
                                    debouncedFilter();
                                }}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            >
                                <option value="">All Categories</option>
                                {categories.map((category) => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Price Range (ZMW)</label>
                            <div className="flex gap-2">
                                <input
                                    type="number"
                                    value={data.min_price}
                                    onChange={(e) => {
                                        setData('min_price', e.target.value);
                                        debouncedFilter();
                                    }}
                                    placeholder="Min"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                />
                                <input
                                    type="number"
                                    value={data.max_price}
                                    onChange={(e) => {
                                        setData('max_price', e.target.value);
                                        debouncedFilter();
                                    }}
                                    placeholder="Max"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Motor Power (HP)</label>
                            <div className="flex gap-2">
                                <input
                                    type="number"
                                    value={data.min_motor}
                                    onChange={(e) => {
                                        setData('min_motor', e.target.value);
                                        debouncedFilter();
                                    }}
                                    placeholder="Min"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                />
                                <input
                                    type="number"
                                    value={data.max_motor}
                                    onChange={(e) => {
                                        setData('max_motor', e.target.value);
                                        debouncedFilter();
                                    }}
                                    placeholder="Max"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Flow Rate (m³/hr)</label>
                            <div className="flex gap-2">
                                <input
                                    type="number"
                                    value={data.min_flow}
                                    onChange={(e) => {
                                        setData('min_flow', e.target.value);
                                        debouncedFilter();
                                    }}
                                    placeholder="Min"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                />
                                <input
                                    type="number"
                                    value={data.max_flow}
                                    onChange={(e) => {
                                        setData('max_flow', e.target.value);
                                        debouncedFilter();
                                    }}
                                    placeholder="Max"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Head (m)</label>
                            <div className="flex gap-2">
                                <input
                                    type="number"
                                    value={data.min_head}
                                    onChange={(e) => {
                                        setData('min_head', e.target.value);
                                        debouncedFilter();
                                    }}
                                    placeholder="Min"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                />
                                <input
                                    type="number"
                                    value={data.max_head}
                                    onChange={(e) => {
                                        setData('max_head', e.target.value);
                                        debouncedFilter();
                                    }}
                                    placeholder="Max"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mt-4 flex justify-end gap-4">
                        <button
                            onClick={resetFilters}
                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                        >
                            Reset Filters
                        </button>
                    </div>
                </div>

                {/* Solutions Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {pumpSolutions.data.map((solution) => (
                        <ProductCard
                            key={solution.id}
                            title={solution.title}
                            description={solution.description}
                            category={solution.category}
                            specifications={{
                                qMax: solution.q_max,
                                hMax: solution.h_max,
                                ratedQ: solution.rated_q,
                                ratedH: solution.rated_h,
                                motor: solution.motor,
                                price: solution.net_price_zmw,
                            }}
                        />
                    ))}
                </div>

                {/* Pagination */}
                {pumpSolutions.last_page > 1 && (
                    <div className="mt-8 flex justify-center">
                        <nav className="flex items-center gap-2">
                            {Array.from({ length: pumpSolutions.last_page }, (_, i) => i + 1).map((page) => (
                                <button
                                    key={page}
                                    onClick={() => handlePageChange(page)}
                                    className={`px-4 py-2 rounded-md ${
                                        pumpSolutions.current_page === page
                                            ? 'bg-indigo-600 text-white'
                                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                    }`}
                                >
                                    {page}
                                </button>
                            ))}
                        </nav>
                    </div>
                )}
            </div>
        </>
    );
}