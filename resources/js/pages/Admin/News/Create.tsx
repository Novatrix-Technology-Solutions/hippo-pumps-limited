import { Head, useForm } from '@inertiajs/react';
import AuthLayout from '@/layouts/auth-layout';
import AnimatedPage from '@/components/Animated/AnimatedPage';
import RichTextEditor from '@/components/RichTextEditor';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { staggerContainer, staggerItem } from '@/Utils/animations';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        content: '',
        featured_image: null as File | null,
        meta_description: '',
        is_published: false,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('news.store'));
    };

    return (
        <AuthLayout 
            title="Create News" 
            description="Create a new news article or blog post"
        >
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
                                        value={data.content}
                                        onChange={(content) => setData('content', content)}
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
                                        {processing ? 'Creating...' : 'Create News'}
                                    </Button>
                                </motion.div>
                            </form>
                        </CardContent>
                    </Card>
                </motion.div>
            </AnimatedPage>
        </AuthLayout>
    );
}