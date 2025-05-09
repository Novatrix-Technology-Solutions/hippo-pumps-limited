import { SidebarProvider } from '@/components/ui/sidebar';
import { SharedData } from '@/types';
import { usePage } from '@inertiajs/react';

interface AppShellProps {
    children: React.ReactNode;
    variant?: 'header' | 'sidebar';
}

export function AppShell({ children, variant = 'header' }: AppShellProps) {
    const isOpen = usePage<SharedData>().props.sidebarOpen;

    if (variant === 'header') {
        return <div className="flex min-h-screen w-full flex-col">{children}</div>;
    }

    // Use grid: sidebar (fixed width) + content (auto)
    return (
        <SidebarProvider defaultOpen={isOpen}>
            <div className="min-h-screen w-full grid grid-cols-1 md:grid-cols-[16rem_1fr]">
                {children}
            </div>
        </SidebarProvider>
    );
}
