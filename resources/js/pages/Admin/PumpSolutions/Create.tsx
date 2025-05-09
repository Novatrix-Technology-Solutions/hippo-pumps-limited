import { Head } from '@inertiajs/react';
import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import Form from './Form';
import { type BreadcrumbItem } from '@/types';

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
        title: 'Add Product',
        href: '/admin/pump-solutions/create',
    },
];

export default function Create() {
    return (
        <AppSidebarLayout breadcrumbs={breadcrumbs}>
            <Head title="Add Product" />
            <div className="container mx-auto py-10">
                <h1 className="text-3xl font-bold mb-6">Add New Product</h1>
                <Form />
            </div>
        </AppSidebarLayout>
    );
}