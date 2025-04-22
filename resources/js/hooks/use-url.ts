import { route } from '@/ziggy';
import { AxiosRequestConfig } from 'axios';

interface RequestOptions extends AxiosRequestConfig {
    onFinish?: () => void;
    preserveScroll?: boolean;
    preserveState?: boolean;
}

export function useUrl() {
    const getAbsoluteUrl = (routeName: string, params: Record<string, any> = {}) => {
        try {
            const baseUrl = import.meta.env.VITE_APP_URL || 'http://localhost';
            const routePath = route(routeName, params);
            const normalizedBaseUrl = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
            const normalizedRoutePath = routePath.startsWith('/') ? routePath.slice(1) : routePath;
            return `${normalizedBaseUrl}${normalizedRoutePath}`;
        } catch (error) {
            console.error(`Failed to generate URL for route "${routeName}":`, error);
            return '/'; // Return home route as fallback
        }
    };

    return {
        getAbsoluteUrl,
        // Helper for Inertia form submissions
        post: <T = any>(routeName: string, data: T, options: RequestOptions = {}) => {
            const url = getAbsoluteUrl(routeName);
            return window.axios.post<T>(url, data, options);
        },
        // Helper for Inertia get requests
        get: <T = any>(routeName: string, params: Record<string, any> = {}, options: RequestOptions = {}) => {
            const url = getAbsoluteUrl(routeName, params);
            return window.axios.get<T>(url, options);
        },
    };
} 