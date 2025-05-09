import { AppContent } from '@/components/app-content';
import { AppShell } from '@/components/app-shell';
import { AppSidebar } from '@/components/app-sidebar';
import { AppSidebarHeader } from '@/components/app-sidebar-header';
import { type BreadcrumbItem } from '@/types';
import { type PropsWithChildren } from 'react';

interface AppSidebarLayoutProps extends PropsWithChildren {
    breadcrumbs?: BreadcrumbItem[];
    showSidebar?: boolean;
}

export default function AppSidebarLayout({ 
    children, 
    breadcrumbs = [],
    showSidebar = true 
}: AppSidebarLayoutProps) {
    return (
        <AppShell variant="sidebar">
            {showSidebar && <AppSidebar />}
            <AppContent variant="sidebar">
                {showSidebar && <AppSidebarHeader breadcrumbs={breadcrumbs} />}
                {children}
            </AppContent>
        </AppShell>
    );
}
