export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    avatar?: string | null;
    roles?: string[];
    permissions?: string[];
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
        warning?: string;
    };
    ziggy: {
        location: string;
        url: string;
        port: number | null;
        defaults: Record<string, any>;
        routes: Record<string, any>;
    };
}

// Shared model interfaces
export interface BaseModel {
    id: number;
    created_at: string;
    updated_at: string;
}

export interface PumpSolution extends BaseModel {
    title: string;
    slug: string;
    description: string;
    image: string | null;
    category: string;
    specifications: Record<string, string>;
    is_featured: boolean;
    order: number;
}

export interface News extends BaseModel {
    title: string;
    slug: string;
    content: string;
    featured_image: string | null;
    meta_description: string | null;
    is_published: boolean;
    published_at: string;
}

// Navigation types
export interface BreadcrumbItem {
    title: string;
    href: string;
    current?: boolean;
}

export interface MenuItem {
    title: string;
    href: string;
    icon?: string;
    children?: MenuItem[];
    permissions?: string[];
}

// Form types
export interface SelectOption<T = string | number> {
    label: string;
    value: T;
    disabled?: boolean;
    description?: string;
}

export interface FormError {
    field: string;
    message: string;
}

// API Response types
export interface ApiResponse<T> {
    data: T;
    message?: string;
    errors?: FormError[];
}

export interface PaginatedResponse<T> {
    data: T[];
    meta: {
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        from: number;
        to: number;
    };
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
}

// File upload types
export interface UploadedFile {
    id: number;
    name: string;
    path: string;
    size: number;
    mime_type: string;
    url: string;
}

// Error types
export interface ValidationErrors {
    [key: string]: string[];
}

export interface ApiError {
    message: string;
    errors?: ValidationErrors;
    status?: number;
}

// Notification types
export interface Notification {
    id: string;
    type: 'success' | 'error' | 'warning' | 'info';
    message: string;
    duration?: number;
    action?: {
        label: string;
        onClick: () => void;
    };
}