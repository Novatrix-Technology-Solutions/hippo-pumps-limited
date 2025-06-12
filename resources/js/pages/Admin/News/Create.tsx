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

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'News',
        href: '/admin/news',
    },
    {
        title: 'Create News',
        href: '/admin/news/create',
    },
];

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        content: '',
        featured_image: null as File | null,
        meta_description: '',
        is_published: false,
    });
    const [editorContent, setEditorContent] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setData('content', editorContent);
        post(route('admin.news.store'));
    };

    return (
        <AppSidebarLayout breadcrumbs={breadcrumbs}>
            <Head title="Create News" />
            <AnimatedPage>
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    className="container mx-auto py-6"
                >
                    <Card>
                        <CardHeader>
                            <CardTitle>Create News Article</CardTitle>
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
                                </motion.div>

                                <motion.div variants={staggerItem}>
                                    <Label htmlFor="meta_description">Content Preview</Label>
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
                                    <Label htmlFor="is_published" className="flex items-center gap-2">
                                        <input
                                            id="is_published"
                                            type="checkbox"
                                            checked={data.is_published}
                                            onChange={e => setData('is_published', Boolean(e.target.checked))}
                                            className="form-checkbox h-4 w-4 text-blue-600"
                                        />
                                        Publish immediately
                                    </Label>
                                    {errors.is_published && (
                                        <p className="text-red-500 text-sm mt-1">{errors.is_published}</p>
                                    )}
                                </motion.div>

                                <motion.div variants={staggerItem}>
                                    <Button type="submit" disabled={processing}>
                                        {processing ? 'Creating...' : 'Create News'}
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