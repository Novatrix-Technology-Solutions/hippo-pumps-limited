import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';
import type { User } from './index';

// Auth types
export interface Auth {
    user: User;
}

// Navigation types
export interface NavGroup {
    title: string;
    items: NavItem[];
    permissions?: string[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
    permissions?: string[];
    children?: NavItem[];
}

// Shared data types
export interface SharedData {
    name: string;
    quote: { 
        message: string; 
        author: string;
    };
    auth: Auth;
    ziggy: Config & { 
        location: string;
        url: string;
        port: number | null;
        defaults: Record<string, any>;
        routes: Record<string, any>;
    };
    sidebarOpen: boolean;
    notifications: Array<{
        id: string;
        type: 'success' | 'error' | 'warning' | 'info';
        message: string;
        read: boolean;
        created_at: string;
    }>;
    [key: string]: unknown;
}

// Component props
export interface BaseComponentProps {
    className?: string;
    children?: React.ReactNode;
}

export interface ButtonProps extends BaseComponentProps {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link' | 'destructive';
    size?: 'sm' | 'md' | 'lg';
    loading?: boolean;
    disabled?: boolean;
    onClick?: () => void;
}

export interface InputProps extends BaseComponentProps {
    type?: string;
    name?: string;
    value?: string | number;
    placeholder?: string;
    error?: string;
    disabled?: boolean;
    required?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
