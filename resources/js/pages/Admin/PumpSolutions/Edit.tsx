import { Head } from '@inertiajs/react';
import AdminLayout from '@/layouts/AdminLayout';
import Form from './Form';

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
    return (
        <AdminLayout title={`Edit Product: ${pumpSolution.title}`}>
            <Head title={`Edit Product: ${pumpSolution.title}`} />
            <div className="container mx-auto py-10">
                <h1 className="text-3xl font-bold mb-6">Edit Product</h1>
                <Form pumpSolution={pumpSolution} isEdit={true} />
            </div>
        </AdminLayout>
    );
}