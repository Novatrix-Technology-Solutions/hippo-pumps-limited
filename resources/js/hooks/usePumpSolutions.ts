import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface PumpSolutionsFilters {
    search?: string;
    is_featured?: boolean;
    per_page?: number;
    page?: number;
}

interface PumpSolution {
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

interface PumpSolutionsResponse {
    data: PumpSolution[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

/**
 * Fetches pump solutions with optional filtering
 */
const fetchPumpSolutions = async (filters: PumpSolutionsFilters): Promise<PumpSolutionsResponse> => {
    const { data } = await axios.get('/products', { params: filters });
    return data.pumpSolutions;
};

/**
 * Hook for querying pump solutions with filters
 */
export const usePumpSolutions = (filters: PumpSolutionsFilters) => {
    return useQuery({
        queryKey: ['pumpSolutions', filters],
        queryFn: () => fetchPumpSolutions(filters),
        placeholderData: (previousData) => previousData,
    });
};

/**
 * Fetches a single pump solution by slug
 */
const fetchPumpSolution = async (slug: string): Promise<PumpSolution> => {
    const { data } = await axios.get(`/products/${slug}`);
    return data.pumpSolution;
};

/**
 * Hook for querying a single pump solution
 */
export const usePumpSolution = (slug: string) => {
    return useQuery({
        queryKey: ['pumpSolution', slug],
        queryFn: () => fetchPumpSolution(slug),
        enabled: !!slug,
    });
}; 