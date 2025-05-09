import { Head } from '@inertiajs/react';
import AuthLayout from '@/layouts/auth-layout';
import Form from './Form';

export default function Create() {
    return (
        <AuthLayout 
            title="Add Product" 
            description="Create a new pump solution or product"
        >
            <Head title="Add Product" />
            <div className="container mx-auto py-10">
                <h1 className="text-3xl font-bold mb-6">Add New Product</h1>
                <Form />
            </div>
        </AuthLayout>
    );
}