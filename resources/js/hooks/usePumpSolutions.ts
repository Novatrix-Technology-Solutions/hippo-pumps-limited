import { useQuery, useQueryClient } from '@tanstack/react-query';
import { router } from '@inertiajs/react';
import { PumpSolution } from '@/types';

interface PumpSolutionsFilters {
    category?: string;
    min_price?: number;
    max_price?: number;
    min_motor?: number;
    max_motor?: number;
    min_flow?: number;
    max_flow?: number;
    min_head?: number;
    max_head?: number;
    page?: number;
}

interface PumpSolutionsResponse {
    data: PumpSolution[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

import axios from 'axios';

const fetchPumpSolutions = async (filters: PumpSolutionsFilters): Promise<PumpSolutionsResponse> => {
    const response = await axios.get('/api/products', { params: filters });
    return response.data;
};


export const usePumpSolutions = (filters: PumpSolutionsFilters) => {
    return useQuery({
        queryKey: ['pumpSolutions', filters],
        queryFn: () => fetchPumpSolutions(filters),
        staleTime: 1000 * 60 * 5,
    });
};