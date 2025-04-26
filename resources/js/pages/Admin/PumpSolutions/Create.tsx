import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import AdminLayout from '@/layouts/AdminLayout';
import PumpSolutionForm from './Form';

export default function Create({ auth }: PageProps) {
    return (
        <AdminLayout
            user={auth.user}
        >
            <Head title="Create Pump Solution" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <PumpSolutionForm />
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}