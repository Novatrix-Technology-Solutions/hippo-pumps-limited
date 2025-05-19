import { useState } from 'react';
import { Head } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductSolution {
    id: number;
    title: string;
    slug: string;
    description: string;
    features: string[];
    specifications: string[];
    applications: string[];
    is_featured: boolean;
    order: number;
    media: { id: number; original_url: string }[];
}

interface Props {
    products: {
        data: ProductSolution[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    filters: {
        search?: string;
        is_featured?: boolean;
    };
}

export default function Index({ products, filters }: Props) {
    const [searchTerm, setSearchTerm] = useState(filters.search || '');

    // Function to safely render HTML content
    const renderHTML = (html: string) => {
        return <div dangerouslySetInnerHTML={{ __html: html }} />;
    };

    // Function to strip HTML tags for excerpt
    const stripHtml = (html: string) => {
        const tmp = document.createElement('div');
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || '';
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        window.location.href = `${route('products.index')}?search=${searchTerm}`;
    };

    return (
        <>
            <Head title="Products" />
            <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-[#004080] mb-4">
                        Our Products
                    </h1>
                    <p className="text-gray-600 max-w-3xl">
                        Explore our range of high-quality, reliable pump solutions designed for various applications.
                        From industrial to residential, we have pumps for every need.
                    </p>
                </div>

                <div className="mb-8">
                    <form onSubmit={handleSearch} className="flex max-w-md gap-2">
                        <Input
                            type="text"
                            placeholder="Search products..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="flex-1"
                        />
                        <Button type="submit" variant="default">
                            <Search className="h-4 w-4 mr-2" />
                            Search
                        </Button>
                    </form>
                </div>

                {filters.search && (
                    <div className="mb-8">
                        <p className="text-sm text-gray-500">
                            Found {products.total} products matching "{filters.search}".
                        </p>
                    </div>
                )}

                {products.data.length === 0 ? (
                    <div className="text-center py-12">
                        <h3 className="text-lg font-medium text-gray-900">No products available</h3>
                        <p className="mt-2 text-sm text-gray-500">
                            There are no products available at this time. Please check back later.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {products.data.map((solution) => (
                            <div key={solution.id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
                                <div className="aspect-[4/3] overflow-hidden bg-gray-100">
                                    {solution.media?.length > 0 ? (
                                        <img
                                            src={solution.media[0].original_url}
                                            alt={solution.title}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="h-full flex items-center justify-center bg-gray-100">
                                            <span className="text-gray-400">No image</span>
                                        </div>
                                    )}
                                </div>
                                <div className="p-6 flex-grow">
                                    <h3 className="text-xl font-semibold text-[#004080] mb-2">{solution.title}</h3>
                                    <div className="text-gray-600 line-clamp-3 mb-4 prose prose-sm max-w-none">
                                        {renderHTML(stripHtml(solution.description).substring(0, 150) + '...')}
                                    </div>
                                    <Link
                                        href={route('products.show', solution.slug)}
                                        className="text-[#008000] hover:text-[#006000] font-medium inline-flex items-center"
                                    >
                                        View details
                                        <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {products.data.length > 0 && products.last_page > 1 && (
                    <div className="mt-8 flex justify-center gap-2">
                        {Array.from({ length: products.last_page }, (_, i) => i + 1).map((page) => (
                            <Link
                                key={page}
                                href={route('products.index', { page })}
                                className={`px-4 py-2 rounded ${
                                    page === products.current_page
                                        ? 'bg-[#004080] text-white'
                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                            >
                                {page}
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
} 