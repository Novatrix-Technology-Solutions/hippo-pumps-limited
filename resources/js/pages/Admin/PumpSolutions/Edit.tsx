import { Head } from '@inertiajs/react';
import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import Form from './Form';
import { type BreadcrumbItem } from '@/types';

interface PumpSolution {
        id: number;
        title: string;
    slug: string;
        description: string;
    features: string[];
    specifications: string[];
    applications: string[];
        is_featured: boolean;
        order: number;
    media: { id: number; original_url: string }[];
}

interface Props {
    pumpSolution: PumpSolution;
}

export default function Edit({ pumpSolution }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: '/admin/dashboard',
        },
        {
            title: 'Products',
            href: '/admin/pump-solutions',
        },
        {
            title: `Edit: ${pumpSolution.title}`,
            href: `/admin/pump-solutions/${pumpSolution.id}/edit`,
        },
    ];

    return (
        <AppSidebarLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit Product: ${pumpSolution.title}`} />
            <div className="container mx-auto py-10">
                <h1 className="text-3xl font-bold mb-6">Edit Product</h1>
                <Form pumpSolution={pumpSolution} isEdit={true} />
            </div>
        </AppSidebarLayout>
    );
}