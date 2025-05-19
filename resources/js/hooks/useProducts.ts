import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface ProductsFilters {
    search?: string;
    is_featured?: boolean;
    per_page?: number;
    page?: number;
}

interface Product {
    id: number;
    title: string;
    slug: string;
    description: string;
    features: string[] | null;
    specifications: string[] | null;
    applications: string[] | null;
    is_featured: boolean;
    order: number;
    created_at: string;
    updated_at: string;
    media?: {
        id: number;
        original_url: string;
    }[];
}

interface ProductsResponse {
    data: Product[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

/**
 * Fetches products with optional filtering
 */
const fetchProducts = async (filters: ProductsFilters): Promise<ProductsResponse> => {
    const { data } = await axios.get('/products', { params: filters });
    return data.products;
};

/**
 * Hook for querying products with filters
 */
export const useProducts = (filters: ProductsFilters) => {
    return useQuery({
        queryKey: ['products', filters],
        queryFn: () => fetchProducts(filters),
        placeholderData: (previousData) => previousData,
    });
};

/**
 * Fetches a single product by slug
 */
const fetchProduct = async (slug: string): Promise<Product> => {
    const { data } = await axios.get(`/products/${slug}`);
    return data.product;
};

/**
 * Hook for querying a single product
 */
export const useProduct = (slug: string) => {
    return useQuery({
        queryKey: ['product', slug],
        queryFn: () => fetchProduct(slug),
        enabled: !!slug,
    });
}; 