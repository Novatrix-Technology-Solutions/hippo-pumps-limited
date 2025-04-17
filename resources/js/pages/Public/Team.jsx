import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';

export default function Team({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Meet Our Team</h2>}
        >
            <Head title="Meet Our Team" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h1 className="text-3xl font-bold mb-8">Our Dedicated Team</h1>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {/* Team Member 1 */}
                                <div className="bg-white rounded-lg shadow-md p-6">
                                    <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gray-200"></div>
                                    <h3 className="text-xl font-semibold text-center mb-2">John Doe</h3>
                                    <p className="text-gray-600 text-center mb-2">CEO & Founder</p>
                                    <p className="text-gray-700 text-center">With over 20 years of experience in the industry, John leads our team with vision and expertise.</p>
                                </div>

                                {/* Team Member 2 */}
                                <div className="bg-white rounded-lg shadow-md p-6">
                                    <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gray-200"></div>
                                    <h3 className="text-xl font-semibold text-center mb-2">Jane Smith</h3>
                                    <p className="text-gray-600 text-center mb-2">Technical Director</p>
                                    <p className="text-gray-700 text-center">Jane brings technical excellence and innovation to our engineering solutions.</p>
                                </div>

                                {/* Team Member 3 */}
                                <div className="bg-white rounded-lg shadow-md p-6">
                                    <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gray-200"></div>
                                    <h3 className="text-xl font-semibold text-center mb-2">Mike Johnson</h3>
                                    <p className="text-gray-600 text-center mb-2">Operations Manager</p>
                                    <p className="text-gray-700 text-center">Mike ensures our operations run smoothly and efficiently.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
} 