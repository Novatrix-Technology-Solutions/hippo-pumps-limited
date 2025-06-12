import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { BookOpen, Folder, LayoutGrid, Newspaper, Users, Group, Settings, Package } from 'lucide-react';
import AppLogo from './app-logo';
import React from 'react';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'News',
        href: '/admin/news',
        icon: Newspaper,
    },
    {
        title: 'Products',
        href: '/admin/products',
        icon: Package,
    },
    {
        title: 'Team Members',
        href: '/admin/team-members',
        icon: Group,
    },
    {
        title: 'Users',
        href: '/admin/users',
        icon: Users,
    },
    {
        title: 'Profile',
        href: '/admin/profile',
        icon: Settings,
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
                <BookOpen className="h-6 w-6" />
            </button>
            <SidebarHeader className="border-b">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/" prefetch>
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
                <NavUser />
            </SidebarFooter>
        </aside>
    );
}
