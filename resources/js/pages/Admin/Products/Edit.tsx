import { Head } from '@inertiajs/react';
import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import Form from './Form';
import { type BreadcrumbItem } from '@/types';

interface ProductSolution {
    id: number;
    category: string;
    title: string;
    slug: string;
    description: string;
    q_max: string;
    h_max: string;
    rated_q: string;
    rated_h: string;
    motor: string;
    price_zmw_no_vat: string;
    vat_rate: string;
    price_zmw_including_vat: string;
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
            href: '/dashboard',
        },
        {
            title: 'Products',
            href: route('admin.products.index'),
        },
        {
            title: `Edit: ${productSolution.title}`,
            href: route('admin.products.edit', { product: productSolution.id }),
        },
    ];

    return (
        <AppSidebarLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit Product: ${productSolution.title}`} />
            <div className="container mx-auto py-10">
                <h1 className="text-3xl font-bold mb-6">Edit Product</h1>
                <Form product={productSolution} isEdit />
            </div>
        </AppSidebarLayout>
    );
}