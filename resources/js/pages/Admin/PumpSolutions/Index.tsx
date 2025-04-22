import { Head, Link } from '@inertiajs/react';
import { PageProps } from '@/types';
import AdminLayout from '@/layouts/AdminLayout';
import { useUrl } from '@/hooks/use-url';

interface PumpSolution {
    id: number;
    title: string;
    slug: string;
    description: string;
    category: string;
    image: string | null;
    is_featured: boolean;
    order: number;
    created_at: string;
    updated_at: string;
}

interface Props extends PageProps {
    pumpSolutions: {
        data: PumpSolution[];
        links: Array<{
            url: string | null;
            label: string;
            active: boolean;
        }>;
    };
}

export default function Index({ auth, pumpSolutions }: Props) {
    const { getAbsoluteUrl } = useUrl();
    
    return (
        <AdminLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Pump Solutions</h2>}
        >
            <Head title="Pump Solutions" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-medium">All Pump Solutions</h3>
                                <Link
                                    href={getAbsoluteUrl('pump-solutions.create')}
                                    className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 focus:bg-indigo-700 active:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                >
                                    Create New Solution
                                </Link>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Title
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Category
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Featured
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Order
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Created At
                                            </th>
                                            <th scope="col" className="relative px-6 py-3">
                                                <span className="sr-only">Actions</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {pumpSolutions.data.map((solution) => (
                                            <tr key={solution.id}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-gray-900">{solution.title}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-500">{solution.category}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${solution.is_featured ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                                        {solution.is_featured ? 'Yes' : 'No'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {solution.order}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {new Date(solution.created_at).toLocaleDateString()}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <Link
                                                        href={getAbsoluteUrl('pump-solutions.edit', solution.id)}
                                                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                                                    >
                                                        Edit
                                                    </Link>
                                                    <Link
                                                        href={getAbsoluteUrl('public.pump-solutions.show', solution.slug)}
                                                        className="text-blue-600 hover:text-blue-900"
                                                        target="_blank"
                                                    >
                                                        View
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {pumpSolutions.links.length > 3 && (
                                <div className="mt-4">
                                    <nav className="flex justify-center">
                                        {pumpSolutions.links.map((link, index) => (
                                            <Link
                                                key={index}
                                                href={link.url ? getAbsoluteUrl(link.url) : '#'}
                                                className={`px-3 py-1 mx-1 rounded ${
                                                    link.active
                                                        ? 'bg-indigo-600 text-white'
                                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                                }`}
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        ))}
                                    </nav>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
} 