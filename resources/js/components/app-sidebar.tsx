import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { BookOpen, Folder, LayoutGrid, X } from 'lucide-react';
import AppLogo from './app-logo';
import React from 'react';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/admin/dashboard',
        icon: LayoutGrid,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: Folder,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits',
        icon: BookOpen,
    },
];

interface AppSidebarProps {
    open?: boolean;
    onClose?: () => void;
}

export function AppSidebar({ open = false, onClose }: AppSidebarProps) {
    return (
        <aside
            className={`md:w-64 w-64 border-r bg-white z-30 h-screen transition-transform duration-200 fixed md:static top-0 left-0
                ${open ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
        >
            {/* Close button for mobile */}
            <button
                className="md:hidden absolute top-4 right-4 z-40 p-2 rounded bg-white border shadow"
                onClick={onClose}
                aria-label="Close sidebar"
            >
                <X className="h-6 w-6" />
            </button>
            <SidebarHeader className="border-b">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/admin/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter className="border-t">
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </aside>
    );
}
