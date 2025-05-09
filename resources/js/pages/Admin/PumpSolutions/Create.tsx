import { Head } from '@inertiajs/react';
import AdminLayout from '@/layouts/AdminLayout';
import Form from './Form';

export default function Create() {
    return (
        <AdminLayout title="Add Product">
            <Head title="Add Product" />
            <div className="container mx-auto py-10">
                <h1 className="text-3xl font-bold mb-6">Add New Product</h1>
                <Form />
            </div>
        </AdminLayout>
    );
}