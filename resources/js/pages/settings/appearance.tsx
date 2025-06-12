import { Head } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { type BreadcrumbItem } from '@/types';
import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import SettingsLayout from '@/layouts/settings/layout';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: route('dashboard'),
    },
    {
        title: 'Settings',
        href: '/settings',
    },
    {
        title: 'Appearance',
        href: '/settings/appearance',
    },
];

export default function Appearance() {
    return (
        <AppSidebarLayout breadcrumbs={breadcrumbs}>
            <Head title="Appearance Settings" />
            <div className="container mx-auto py-6">
                <SettingsLayout>
                    <Card>
                        <CardHeader>
                            <CardTitle>Appearance Settings</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {/* Add appearance settings content here */}
                        </CardContent>
                    </Card>
                </SettingsLayout>
            </div>
        </AppSidebarLayout>
    );
}
