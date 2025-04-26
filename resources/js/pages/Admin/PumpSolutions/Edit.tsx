import { Head } from '@inertiajs/react';
import { PageProps, PumpSolution } from '@/types';
import AdminLayout from '@/layouts/AdminLayout';
import PumpSolutionForm from './Form';

interface Props extends PageProps {
    pumpSolution: PumpSolution;
}

export default function Edit({ auth, pumpSolution }: Props) {
    return (
        <AdminLayout
            user={auth.user}
        >
            <Head title="Edit Pump Solution" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <PumpSolutionForm pumpSolution={pumpSolution} isEditing={true} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}