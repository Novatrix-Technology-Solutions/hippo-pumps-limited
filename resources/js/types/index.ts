export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
}

export interface PageProps {
    auth: {
        user: User;
    };
    errors: Record<string, string>;
    flash?: {
        message?: string;
        success?: string;
        error?: string;
    };
}

// Shared model interfaces
export interface PumpSolution {
    id: number;
    title: string;
    slug: string;
    description: string;
    image: string | null;
    category: string;
    specifications: Record<string, string>;
    is_featured: boolean;
    order: number;
    created_at: string;
    updated_at: string;
}

export interface News {
    id: number;
    title: string;
    slug: string;
    content: string;
    featured_image: string | null;
    meta_description: string | null;
    is_published: boolean;
    published_at: string;
    created_at: string;
    updated_at: string;
}

// Navigation types
export interface BreadcrumbItem {
    title: string;
    href: string;
    current?: boolean;
}

// Form types
export interface SelectOption {
    label: string;
    value: string | number;
}

// API Response types
export interface PaginatedResponse<T> {
    data: T[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
}