import { Head } from '@inertiajs/react';
import AuthLayout from '@/layouts/auth-layout';
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
        <AuthLayout 
            title={`Edit Product: ${pumpSolution.title}`}
            description="Update product information and details"
        >
            <Head title={`Edit Product: ${pumpSolution.title}`} />
            <div className="container mx-auto py-10">
                <h1 className="text-3xl font-bold mb-6">Edit Product</h1>
                <Form pumpSolution={pumpSolution} isEdit={true} />
            </div>
        </AuthLayout>
    );
}