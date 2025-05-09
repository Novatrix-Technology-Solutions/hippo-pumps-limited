import { AppContent } from '@/components/app-content';
import { AppShell } from '@/components/app-shell';
import { type BreadcrumbItem } from '@/types';
import type { PropsWithChildren } from 'react';
import { AppHeader } from '@/components/app-header';

export default function AppHeaderLayout({ children, breadcrumbs }: PropsWithChildren<{ breadcrumbs?: BreadcrumbItem[] }>) {
    return (
        <div className="flex flex-col min-h-screen">
            <AppHeader />
            <AppShell>
                <AppContent>{children}</AppContent>
            </AppShell>
        </div>
    );
}
