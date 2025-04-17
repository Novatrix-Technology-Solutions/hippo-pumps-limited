import { Head, Link } from '@inertiajs/react';
import { PageProps } from '@/types';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { ArrowLeft, Pencil } from 'lucide-react';

interface PumpSolution {
    id: number;
    title: string;
    slug: string;
    description: string;
    image: string | null;
    category: string;
    specifications: Record<string, string>;
    is_featured: boolean;
    order: number;
    created_at: string;
    updated_at: string;
}

interface Props extends PageProps {
    pumpSolution: PumpSolution;
}

export default function Show({ auth, pumpSolution }: Props) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">View Pump Solution</h2>}
        >
            <Head title={`${pumpSolution.title} - Pump Solution`} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="mb-6 flex justify-between items-center">
                        <Link href={route('pump-solutions.index')}>
                            <Button variant="outline">
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back to List
                            </Button>
                        </Link>
                        <Link href={route('pump-solutions.edit', pumpSolution.id)}>
                            <Button>
                                <Pencil className="w-4 h-4 mr-2" />
                                Edit Solution
                            </Button>
                        </Link>
                    </div>

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Main Information */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Solution Details</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-500">Title</h3>
                                            <p className="mt-1 text-lg text-gray-900">{pumpSolution.title}</p>
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-500">Category</h3>
                                            <p className="mt-1 text-lg text-gray-900">{pumpSolution.category}</p>
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-500">Status</h3>
                                            <div className="mt-1">
                                                {pumpSolution.is_featured ? (
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                        Featured
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                                        Standard
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-500">Display Order</h3>
                                            <p className="mt-1 text-lg text-gray-900">{pumpSolution.order}</p>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Image Preview */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Solution Image</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        {pumpSolution.image ? (
                                            <img
                                                src={`/storage/${pumpSolution.image}`}
                                                alt={pumpSolution.title}
                                                className="w-full h-64 object-cover rounded-lg"
                                            />
                                        ) : (
                                            <div className="w-full h-64 bg-gray-100 flex items-center justify-center rounded-lg">
                                                <p className="text-gray-500">No image available</p>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Description */}
                            <Card className="mt-6">
                                <CardHeader>
                                    <CardTitle>Description</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-gray-700 whitespace-pre-wrap">{pumpSolution.description}</p>
                                </CardContent>
                            </Card>

                            {/* Specifications */}
                            {Object.keys(pumpSolution.specifications).length > 0 && (
                                <Card className="mt-6">
                                    <CardHeader>
                                        <CardTitle>Specifications</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {Object.entries(pumpSolution.specifications).map(([key, value]) => (
                                                <div key={key} className="border-b border-gray-200 pb-4">
                                                    <dt className="text-sm font-medium text-gray-500">{key}</dt>
                                                    <dd className="mt-1 text-lg text-gray-900">{value}</dd>
                                                </div>
                                            ))}
                                        </dl>
                                    </CardContent>
                                </Card>
                            )}

                            {/* Metadata */}
                            <Card className="mt-6">
                                <CardHeader>
                                    <CardTitle>Metadata</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">Created At</dt>
                                            <dd className="mt-1 text-gray-900">
                                                {new Date(pumpSolution.created_at).toLocaleString()}
                                            </dd>
                                        </div>
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">Last Updated</dt>
                                            <dd className="mt-1 text-gray-900">
                                                {new Date(pumpSolution.updated_at).toLocaleString()}
                                            </dd>
                                        </div>
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">URL Slug</dt>
                                            <dd className="mt-1 text-gray-900">{pumpSolution.slug}</dd>
                                        </div>
                                    </dl>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}