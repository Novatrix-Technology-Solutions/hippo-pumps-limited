import { Head, useForm } from '@inertiajs/react';
import AdminLayout from '@/layouts/AdminLayout';
import AnimatedPage from '@/components/Animated/AnimatedPage';
import RichTextEditor from '@/components/RichTextEditor';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { staggerContainer, staggerItem } from '@/Utils/animations';

interface News {
    id: number;
    title: string;
    content: string;
    featured_image: string | null;
    meta_description: string | null;
    is_published: boolean;
}

interface Props {
    news: News;
}

export default function Edit({ news }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        title: news.title,
        content: news.content,
        featured_image: null as File | null,
        meta_description: news.meta_description,
        is_published: news.is_published,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('news.update', news.id), {
            forceFormData: true,
        });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('featured_image', file);
        }
    };

    return (
        <AdminLayout>
            <Head title="Edit News Article" />
            <AnimatedPage>
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    className="container mx-auto py-6"
                >
                    <Card>
                        <CardHeader>
                            <CardTitle>Edit News Article</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <motion.div variants={staggerItem} className="space-y-2">
                                    <Label htmlFor="title">Title</Label>
                                    <Input
                                        id="title"
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        className={errors.title ? 'border-red-500' : ''}
                                    />
                                    {errors.title && (
                                        <p className="text-sm text-red-500">{errors.title}</p>
                                    )}
                                </motion.div>

                                <motion.div variants={staggerItem}>
                                    <RichTextEditor
                                        label="Content"
                                        value={data.content}
                                        onChange={(value) => setData('content', value)}
                                        error={errors.content ?? null}
                                    />
                                </motion.div>

                                <motion.div variants={staggerItem} className="space-y-2">
                                    <Label htmlFor="featured_image">Featured Image</Label>
                                    {news.featured_image && (
                                        <img
                                            src={`/storage/${news.featured_image}`}
                                            alt="Current featured image"
                                            className="mb-2 max-w-xs rounded"
                                        />
                                    )}
                                    <Input
                                        id="featured_image"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className={errors.featured_image ? 'border-red-500' : ''}
                                    />
                                    {errors.featured_image && (
                                        <p className="text-sm text-red-500">{errors.featured_image}</p>
                                    )}
                                </motion.div>

                                <motion.div variants={staggerItem} className="space-y-2">
                                    <RichTextEditor
                                        label="Meta Description"
                                        value={data.meta_description || ''}
                                        onChange={(value) => setData('meta_description', value)}
                                        error={errors.meta_description ?? null}
                                    />
                                </motion.div>

                                <motion.div variants={staggerItem} className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        id="is_published"
                                        checked={data.is_published}
                                        onChange={(e) => setData('is_published', e.target.checked)}
                                        className="rounded"
                                    />
                                    <Label htmlFor="is_published">Publish immediately</Label>
                                </motion.div>

                                <motion.div variants={staggerItem}>
                                    <Button type="submit" disabled={processing}>
                                        {processing ? 'Updating...' : 'Update News Article'}
                                    </Button>
                                </motion.div>
                            </form>
                        </CardContent>
                    </Card>
                </motion.div>
            </AnimatedPage>
        </AdminLayout>
    );
}