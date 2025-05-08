import { Head } from '@inertiajs/react';

// Temporarily commenting out original imports and props to simplify the component for testing
// import ProductCard from '@/components/ProductCard';
// import { useEffect, useCallback, useMemo, useState } from 'react';
// import { debounce } from 'lodash';
// import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
// import { Loader2 } from 'lucide-react';
// import { usePumpSolutions } from '@/hooks/usePumpSolutions';

// interface PumpSolution { /* ... */ }
// interface Props { /* ... */ }

export default function Index(/* { pumpSolutions: initialData, filters: initialFilters, categories }: Props */) {
  return (
    <>
      <Head title="Pump Solutions - Test" />
      <div style={{ padding: '20px', backgroundColor: 'lightyellow', border: '2px solid red', margin: '20px' }}>
        <h1>Pump Solutions Page Content Test</h1>
        <p>If you see this, the page component itself is rendering through the layout.</p>
        <p>The URL should be /pump-solutions.</p>
      </div>
    </>
  );
}

// ... Original component code commented out below for easy restoration ...
/*
import { Head } from '@inertiajs/react';
import ProductCard from '@/components/ProductCard';
import { useEffect, useCallback, useMemo, useState } from 'react';
import { debounce } from 'lodash';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Loader2 } from 'lucide-react';
import { usePumpSolutions } from '@/hooks/usePumpSolutions';

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

export default function Index({ pumpSolutions: initialData, filters: initialFilters, categories }: Props) {
    const [filters, setFilters] = useState({
        category: initialFilters.category || '',
        min_price: initialFilters.min_price || '',
        max_price: initialFilters.max_price || '',
        min_motor: initialFilters.min_motor || '',
        max_motor: initialFilters.max_motor || '',
        min_flow: initialFilters.min_flow || '',
        max_flow: initialFilters.max_flow || '',
        min_head: initialFilters.min_head || '',
        max_head: initialFilters.max_head || '',
        page: initialData.current_page,
    });

    const { data: pumpSolutions, isLoading, isFetching } = usePumpSolutions(filters);

    // Memoize the filter handler to prevent unnecessary re-renders
    const handleFilter = useCallback((newFilters: typeof filters) => {
        setFilters(newFilters);
    }, []);

    // Debounce the filter handler to prevent too many requests
    const debouncedFilter = useMemo(
        () => debounce(handleFilter, 500),
        [handleFilter]
    );

    const handlePageChange = useCallback((page: number) => {
        setFilters(prev => ({ ...prev, page }));
    }, []);

    const resetFilters = useCallback(() => {
        setFilters({
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
    }, []);

    // Cleanup debounce on unmount
    useEffect(() => {
        return () => {
            debouncedFilter.cancel();
        };
    }, [debouncedFilter]);

    const displayData = pumpSolutions || initialData;

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
                                value={filters.category}
                                onChange={(e) => {
                                    const newFilters = { ...filters, category: e.target.value };
                                    debouncedFilter(newFilters);
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
                                    value={filters.min_price}
                                    onChange={(e) => {
                                        const newFilters = { ...filters, min_price: Number(e.target.value) };
                                        debouncedFilter(newFilters);
                                    }}
                                    placeholder="Min"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                />
                                <input
                                    type="number"
                                    value={filters.max_price}
                                    onChange={(e) => {
                                        const newFilters = { ...filters, max_price: Number(e.target.value) };
                                        debouncedFilter(newFilters);
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
                                    value={filters.min_motor}
                                    onChange={(e) => {
                                        const newFilters = { ...filters, min_motor: Number(e.target.value) };
                                        debouncedFilter(newFilters);
                                    }}
                                    placeholder="Min"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                />
                                <input
                                    type="number"
                                    value={filters.max_motor}
                                    onChange={(e) => {
                                        const newFilters = { ...filters, max_motor: Number(e.target.value) };
                                        debouncedFilter(newFilters);
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
                                    value={filters.min_flow}
                                    onChange={(e) => {
                                        const newFilters = { ...filters, min_flow: Number(e.target.value) };
                                        debouncedFilter(newFilters);
                                    }}
                                    placeholder="Min"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                />
                                <input
                                    type="number"
                                    value={filters.max_flow}
                                    onChange={(e) => {
                                        const newFilters = { ...filters, max_flow: Number(e.target.value) };
                                        debouncedFilter(newFilters);
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
                                    value={filters.min_head}
                                    onChange={(e) => {
                                        const newFilters = { ...filters, min_head: Number(e.target.value) };
                                        debouncedFilter(newFilters);
                                    }}
                                    placeholder="Min"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                />
                                <input
                                    type="number"
                                    value={filters.max_head}
                                    onChange={(e) => {
                                        const newFilters = { ...filters, max_head: Number(e.target.value) };
                                        debouncedFilter(newFilters);
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
                            disabled={isLoading || isFetching}
                        >
                            {isLoading || isFetching ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Reset Filters'}
                        </button>
                    </div>
                </div>

                {/* Loading State */}
                {(isLoading || isFetching) && (
                    <div className="flex justify-center items-center py-8">
                        <Loader2 className="w-8 h-8 animate-spin text-primary" />
                    </div>
                )}

                {/* Solutions Grid */}
                {!isLoading && displayData && (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {displayData.data.map((solution) => (
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
                        {displayData.last_page > 1 && (
                            <div className="mt-8">
                                <Pagination>
                                    <PaginationContent>
                                        <PaginationItem>
                                            <PaginationPrevious
                                                onClick={() => handlePageChange(displayData.current_page - 1)}
                                                disabled={displayData.current_page === 1}
                                            />
                                        </PaginationItem>
                                        
                                        {Array.from({ length: displayData.last_page }, (_, i) => i + 1).map((page) => (
                                            <PaginationItem key={page}>
                                                <PaginationLink
                                                    onClick={() => handlePageChange(page)}
                                                    isActive={page === displayData.current_page}
                                                >
                                                    {page}
                                                </PaginationLink>
                                            </PaginationItem>
                                        ))}

                                        <PaginationItem>
                                            <PaginationNext
                                                onClick={() => handlePageChange(displayData.current_page + 1)}
                                                disabled={displayData.current_page === displayData.last_page}
                                            />
                                        </PaginationItem>
                                    </PaginationContent>
                                </Pagination>
                            </div>
                        )}
                    </>
                )}
            </div>
        </>
    );
}
*/