import { Head } from '@inertiajs/react';
import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import Form from './Form';
import { type BreadcrumbItem } from '@/types';

interface ProductSolution {
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
    productSolution: ProductSolution;
}

export default function Edit({ productSolution }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: '/admin/dashboard',
        },
        {
            title: 'Products',
            href: '/admin/product-solutions',
        },
        {
            title: `Edit: ${productSolution.title}`,
            href: `/admin/product-solutions/${productSolution.id}/edit`,
        },
    ];

    return (
        <AppSidebarLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit Product: ${productSolution.title}`} />
            <div className="container mx-auto py-10">
                <h1 className="text-3xl font-bold mb-6">Edit Product</h1>
                <Form productSolution={productSolution} isEdit={true} />
            </div>
        </AppSidebarLayout>
    );
}