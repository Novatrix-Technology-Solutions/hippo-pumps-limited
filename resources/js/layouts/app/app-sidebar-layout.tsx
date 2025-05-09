import { AppContent } from '@/components/app-content';
import { AppShell } from '@/components/app-shell';
import { AppSidebar } from '@/components/app-sidebar';
import { AppSidebarHeader } from '@/components/app-sidebar-header';
import { type BreadcrumbItem } from '@/types';
import { type PropsWithChildren, useState } from 'react';
import { Menu } from 'lucide-react';

interface AppSidebarLayoutProps extends PropsWithChildren {
    breadcrumbs?: BreadcrumbItem[];
    showSidebar?: boolean;
}

export default function AppSidebarLayout({ 
    children, 
    breadcrumbs = [],
    showSidebar = true 
}: AppSidebarLayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <AppShell variant="sidebar">
            {/* Hamburger for mobile */}
            <button
                className="md:hidden fixed top-4 left-4 z-30 p-2 rounded bg-white border shadow"
                onClick={() => setSidebarOpen(true)}
                aria-label="Open sidebar"
            >
                <Menu className="h-6 w-6" />
            </button>
            {/* Sidebar with overlay on mobile */}
            {showSidebar && (
                <>
                    <AppSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
                    {/* Backdrop */}
                    {sidebarOpen && (
                        <div
                            className="fixed inset-0 bg-black/40 z-20 md:hidden"
                            onClick={() => setSidebarOpen(false)}
                        />
                    )}
                </>
            )}
            <AppContent variant="sidebar">
                {showSidebar && <AppSidebarHeader breadcrumbs={breadcrumbs} />}
                {children}
            </AppContent>
        </AppShell>
    );
}
