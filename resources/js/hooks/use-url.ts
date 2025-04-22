import { route } from '@/ziggy';

export function useUrl() {
    const getAbsoluteUrl = (routeName: string, params: Record<string, any> = {}) => {
        const baseUrl = import.meta.env.VITE_APP_URL || 'http://localhost';
        const routePath = route(routeName, params);
        const normalizedBaseUrl = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
        const normalizedRoutePath = routePath.startsWith('/') ? routePath.slice(1) : routePath;
        return `${normalizedBaseUrl}${normalizedRoutePath}`;
    };

    return {
        getAbsoluteUrl,
        // Helper for Inertia form submissions
        post: (routeName: string, data: any, options: any = {}) => {
            const url = getAbsoluteUrl(routeName);
            return window.axios.post(url, data, options);
        },
        // Helper for Inertia get requests
        get: (routeName: string, params: Record<string, any> = {}, options: any = {}) => {
            const url = getAbsoluteUrl(routeName, params);
            return window.axios.get(url, options);
        },
    };
} 