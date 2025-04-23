import { Head, useForm } from '@inertiajs/react';
import { ChangeEvent, useState } from 'react';
import { motion } from 'framer-motion';
import AdminLayout from '@/layouts/AdminLayout';
import AnimatedPage from '@/components/Animated/AnimatedPage';
import AnimatedCard from '@/components/Animated/AnimatedCard';
import AnimatedButton from '@/components/Animated/AnimatedButton';
import AnimatedErrorMessage from '@/components/Animated/AnimatedErrorMessage';
import { staggerContainer, staggerItem, imagePreview } from '@/Utils/animations';

interface TeamMember {
    id?: number;
    name: string;
    position: string;
    bio: string;
    image?: string | null;
    image_url?: string | null;
    order: number;
}

interface Props {
    teamMember?: TeamMember;
    isEdit?: boolean;
}

const Form = ({ teamMember = {
    name: '',
    position: '',
    bio: '',
    image: null,
    image_url: null,
    order: 0
}, isEdit = false }: Props) => {
    const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(teamMember.image_url);

    const { data, setData, post, put, processing, errors } = useForm({
        name: teamMember.name,
        position: teamMember.position,
        bio: teamMember.bio,
        image: null as File | null,
        order: teamMember.order,
    });

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('image', file);
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreviewUrl(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isEdit && teamMember.id) {
            put(route('admin.team-members.update', teamMember.id));
        } else {
            post(route('admin.team-members.store'));
        }
    };

    return (
        <AdminLayout>
            <Head title={isEdit ? 'Edit Team Member' : 'Create Team Member'} />

            <AnimatedPage>
                <motion.div 
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    className="py-12"
                >
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <AnimatedCard>
                            <div className="p-6 text-gray-900 dark:text-gray-100">
                                <form onSubmit={submit} className="space-y-6">
                                    <motion.div variants={staggerItem}>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            value={data.name}
                                            onChange={e => setData('name', e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                            required
                                        />
                                        <AnimatedErrorMessage message={errors.name} />
                                    </motion.div>

                                    <motion.div variants={staggerItem}>
                                        <label htmlFor="position" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Position
                                        </label>
                                        <input
                                            type="text"
                                            id="position"
                                            value={data.position}
                                            onChange={e => setData('position', e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                            required
                                        />
                                        <AnimatedErrorMessage message={errors.position} />
                                    </motion.div>

                                    <motion.div variants={staggerItem}>
                                        <label htmlFor="bio" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Bio
                                        </label>
                                        <textarea
                                            id="bio"
                                            value={data.bio}
                                            onChange={e => setData('bio', e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                            required
                                            rows={4}
                                        />
                                        <AnimatedErrorMessage message={errors.bio} />
                                    </motion.div>

                                    <motion.div variants={staggerItem}>
                                        <label htmlFor="order" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Order
                                        </label>
                                        <input
                                            type="number"
                                            id="order"
                                            value={data.order}
                                            onChange={e => setData('order', parseInt(e.target.value))}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                            required
                                        />
                                        <AnimatedErrorMessage message={errors.order} />
                                    </motion.div>

                                    <motion.div variants={staggerItem}>
                                        <label htmlFor="image" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Image (Optional)
                                        </label>
                                        <input
                                            type="file"
                                            id="image"
                                            onChange={handleImageChange}
                                            accept="image/*"
                                            className="mt-1 block w-full text-sm text-gray-500 dark:text-gray-400
                                                file:mr-4 file:py-2 file:px-4
                                                file:rounded-md file:border-0
                                                file:text-sm file:font-semibold
                                                file:bg-indigo-50 file:text-indigo-700
                                                hover:file:bg-indigo-100
                                                dark:file:bg-indigo-900 dark:file:text-indigo-300"
                                        />
                                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                            Upload a team member photo or leave empty to create without an image
                                        </p>
                                        <AnimatedErrorMessage message={errors.image} />
                                        {imagePreviewUrl && (
                                            <motion.div
                                                className="mt-2"
                                                {...imagePreview}
                                            >
                                                <img
                                                    src={imagePreviewUrl}
                                                    alt="Preview"
                                                    className="h-32 w-32 object-cover rounded-lg"
                                                />
                                            </motion.div>
                                        )}
                                    </motion.div>

                                    <motion.div 
                                        variants={staggerItem}
                                        className="flex items-center justify-end"
                                    >
                                        <AnimatedButton
                                            type="submit"
                                            disabled={processing}
                                        >
                                            {isEdit ? 'Update' : 'Create'}
                                        </AnimatedButton>
                                    </motion.div>
                                </form>
                            </div>
                        </AnimatedCard>
                    </div>
                </motion.div>
            </AnimatedPage>
        </AdminLayout>
    );
};

export default Form; 