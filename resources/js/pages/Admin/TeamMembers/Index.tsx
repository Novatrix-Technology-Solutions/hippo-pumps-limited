import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/layouts/AdminLayout';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedPage from '@/components/Animated/AnimatedPage';
import AnimatedCard from '@/components/Animated/AnimatedCard';
import AnimatedButton from '@/components/Animated/AnimatedButton';
import { staggerContainer, staggerItem } from '@/Utils/animations';

interface TeamMember {
    id: number;
    name: string;
    position: string;
    bio: string;
    image: string;
    image_url: string;
    order: number;
}

interface Props {
    teamMembers: TeamMember[];
}

const Index = ({ teamMembers }: Props) => {
    const deleteTeamMember = (id: number) => {
        if (confirm('Are you sure you want to delete this team member?')) {
            router.delete(route('admin.team-members.destroy', id));
        }
    };

    return (
        <AdminLayout>
            <Head title="Team Members" />

            <AnimatedPage>
                <motion.div 
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    className="flex justify-between items-center mb-6"
                >
                    <motion.h2 
                        variants={staggerItem}
                        className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight"
                    >
                        Team Members
                    </motion.h2>
                    <Link
                        href={route('admin.team-members.create')}
                    >
                        <AnimatedButton>
                            Add Team Member
                        </AnimatedButton>
                    </Link>
                </motion.div>

                <AnimatedCard>
                    <div className="p-6 text-gray-900 dark:text-gray-100">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead className="bg-gray-50 dark:bg-gray-700">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                            Image
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                            Name
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                            Position
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                            Order
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                    <AnimatePresence>
                                        {teamMembers.map((member, index) => (
                                            <motion.tr
                                                key={member.id}
                                                variants={staggerItem}
                                                className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                                            >
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <motion.img
                                                        src={member.image_url}
                                                        alt={member.name}
                                                        className="h-12 w-12 rounded-full object-cover"
                                                        whileHover={{ scale: 1.1 }}
                                                        transition={{ duration: 0.2 }}
                                                    />
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {member.name}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {member.position}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {member.order}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <Link
                                                        href={route('admin.team-members.edit', member.id)}
                                                        className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 mr-3 transition-colors duration-200"
                                                    >
                                                        Edit
                                                    </Link>
                                                    <AnimatedButton
                                                        variant="danger"
                                                        size="sm"
                                                        onClick={() => deleteTeamMember(member.id)}
                                                    >
                                                        Delete
                                                    </AnimatedButton>
                                                </td>
                                            </motion.tr>
                                        ))}
                                    </AnimatePresence>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </AnimatedCard>
            </AnimatedPage>
        </AdminLayout>
    );
};

export default Index; 