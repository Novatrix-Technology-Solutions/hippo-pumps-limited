import { Head, useForm } from '@inertiajs/react';
import { ChangeEvent, useState } from 'react';
import { motion } from 'framer-motion';
import AuthLayout from '@/layouts/auth-layout';
import AnimatedPage from '@/components/Animated/AnimatedPage';
import AnimatedCard from '@/components/Animated/AnimatedCard';
import AnimatedButton from '@/components/Animated/AnimatedButton';
import AnimatedErrorMessage from '@/components/Animated/AnimatedErrorMessage';
import RichTextEditor from '@/components/RichTextEditor';
import { staggerContainer, staggerItem, imagePreview } from '@/Utils/animations';

interface TeamMember {
    id?: number;
    name: string;
    position: string;
    bio: string;
    image: string | null;
    image_url: string | null;
    order: number;
}

interface Props {
    teamMember?: TeamMember;
    isEdit?: boolean;
}

export default function Form({ teamMember, isEdit = false }: Props) {
    const { data, setData, post, put, processing, errors } = useForm({
        name: teamMember?.name || '',
        position: teamMember?.position || '',
        bio: teamMember?.bio || '',
        image: null as File | null,
        order: teamMember?.order || 0,
    });

    const [preview, setPreview] = useState<string | null>(teamMember?.image_url || null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isEdit && teamMember?.id) {
            put(route('admin.team-members.update', teamMember.id));
        } else {
            post(route('admin.team-members.store'));
        }
    };

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('image', file);
            setPreview(URL.createObjectURL(file));
        }
    };

    return (
        <AuthLayout 
            title={isEdit ? 'Edit Team Member' : 'Add Team Member'}
            description={isEdit ? 'Update team member information' : 'Add a new team member'}
        >
            <Head title={isEdit ? 'Edit Team Member' : 'Add Team Member'} />
            <AnimatedPage>
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    className="container mx-auto py-6"
                >
                    <AnimatedCard>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <motion.div variants={staggerItem}>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                                <AnimatedErrorMessage error={errors.name} />
                            </motion.div>

                            <motion.div variants={staggerItem}>
                                <label htmlFor="position" className="block text-sm font-medium text-gray-700">
                                    Position
                                </label>
                                <input
                                    type="text"
                                    id="position"
                                    value={data.position}
                                    onChange={(e) => setData('position', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                                <AnimatedErrorMessage error={errors.position} />
                            </motion.div>

                            <motion.div variants={staggerItem}>
                                <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                                    Bio
                                </label>
                                <RichTextEditor
                                    value={data.bio}
                                    onChange={(value) => setData('bio', value)}
                                />
                                <AnimatedErrorMessage error={errors.bio} />
                            </motion.div>

                            <motion.div variants={staggerItem}>
                                <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                                    Profile Image
                                </label>
                                {preview && (
                                    <motion.img
                                        src={preview}
                                        alt="Preview"
                                        className="mt-2 h-32 w-32 rounded-full object-cover"
                                        variants={imagePreview}
                                    />
                                )}
                                <input
                                    type="file"
                                    id="image"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="mt-1 block w-full text-sm text-gray-500
                                        file:mr-4 file:py-2 file:px-4
                                        file:rounded-full file:border-0
                                        file:text-sm file:font-semibold
                                        file:bg-indigo-50 file:text-indigo-700
                                        hover:file:bg-indigo-100"
                                />
                                <AnimatedErrorMessage error={errors.image} />
                            </motion.div>

                            <motion.div variants={staggerItem}>
                                <label htmlFor="order" className="block text-sm font-medium text-gray-700">
                                    Display Order
                                </label>
                                <input
                                    type="number"
                                    id="order"
                                    value={data.order}
                                    onChange={(e) => setData('order', parseInt(e.target.value))}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                                <AnimatedErrorMessage error={errors.order} />
                            </motion.div>

                            <motion.div variants={staggerItem}>
                                <AnimatedButton type="submit" disabled={processing}>
                                    {processing ? 'Saving...' : isEdit ? 'Update Team Member' : 'Add Team Member'}
                                </AnimatedButton>
                            </motion.div>
                        </form>
                    </AnimatedCard>
                </motion.div>
            </AnimatedPage>
        </AuthLayout>
    );
} 