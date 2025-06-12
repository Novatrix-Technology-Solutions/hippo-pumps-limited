import { Head, useForm } from '@inertiajs/react';
import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import AnimatedPage from '@/components/Animated/AnimatedPage';
import RichTextEditor from '@/components/RichTextEditor';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { staggerContainer, staggerItem } from '@/Utils/animations';
import { type BreadcrumbItem } from '@/types';
import { useState } from 'react';

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
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: route('dashboard')        },
        {
            title: 'News',
            href: '/admin/news',
        },
        {
            title: `Edit: ${news.title}`,
            href: `/admin/news/${news.id}/edit`,
        },
    ];

    const { data, setData, put, processing, errors } = useForm({
        title: news.title,
        content: news.content,
        featured_image: null as File | null,
        meta_description: news.meta_description || '',
        is_published: news.is_published,
    });
    const [editorContent, setEditorContent] = useState(news.content || '');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setData('content', editorContent);
        put(route('news.update', news.id));
    };

    return (
        <AppSidebarLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit News: ${news.title}`} />
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
                                <motion.div variants={staggerItem}>
                                    <Label htmlFor="title">Title</Label>
                                    <Input
                                        id="title"
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        className="mt-1"
                                    />
                                    {errors.title && (
                                        <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                                    )}
                                </motion.div>

                                <motion.div variants={staggerItem}>
                                    <Label htmlFor="content">Content</Label>
                                    <RichTextEditor
                                        value={editorContent}
                                        onChange={setEditorContent}
                                        error={errors.content}
                                    />
                                    {errors.content && (
                                        <p className="text-red-500 text-sm mt-1">{errors.content}</p>
                                    )}
                                </motion.div>

                                <motion.div variants={staggerItem}>
                                    <Label htmlFor="featured_image">Featured Image</Label>
                                    <Input
                                        id="featured_image"
                                        type="file"
                                        onChange={(e) => setData('featured_image', e.target.files?.[0] || null)}
                                        className="mt-1"
                                    />
                                    {errors.featured_image && (
                                        <p className="text-red-500 text-sm mt-1">{errors.featured_image}</p>
                                    )}
                                </motion.div>

                                <motion.div variants={staggerItem}>
                                    <Label htmlFor="meta_description">Meta Description</Label>
                                    <Input
                                        id="meta_description"
                                        value={data.meta_description}
                                        onChange={(e) => setData('meta_description', e.target.value)}
                                        className="mt-1"
                                    />
                                    {errors.meta_description && (
                                        <p className="text-red-500 text-sm mt-1">{errors.meta_description}</p>
                                    )}
                                </motion.div>

                                <motion.div variants={staggerItem}>
                                    <Button type="submit" disabled={processing}>
                                        {processing ? 'Saving...' : 'Save Changes'}
                                    </Button>
                                </motion.div>
                            </form>
                        </CardContent>
                    </Card>
                </motion.div>
            </AnimatedPage>
        </AppSidebarLayout>
    );
}