import { Head, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Textarea } from '@/Components/ui/textarea';
import { Label } from '@/Components/ui/label';
import { useState } from 'react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        content: '',
        featured_image: null as File | null,
        meta_description: '',
        is_published: false,
    });

    const [preview, setPreview] = useState<string | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('featured_image', file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('news.store'));
    };

    return (
        <AdminLayout>
            <Head title="Create News Article" />
            <div className="container mx-auto py-6">
                <h1 className="text-2xl font-bold mb-6">Create News Article</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
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
                    </div>

                    <div>
                        <Label htmlFor="content">Content</Label>
                        <Textarea
                            id="content"
                            value={data.content}
                            onChange={(e) => setData('content', e.target.value)}
                            className="mt-1"
                            rows={10}
                        />
                        {errors.content && (
                            <p className="text-red-500 text-sm mt-1">{errors.content}</p>
                        )}
                    </div>

                    <div>
                        <Label htmlFor="featured_image">Featured Image</Label>
                        <Input
                            id="featured_image"
                            type="file"
                            onChange={handleImageChange}
                            className="mt-1"
                            accept="image/*"
                        />
                        {preview && (
                            <img
                                src={preview}
                                alt="Preview"
                                className="mt-2 max-w-xs rounded"
                            />
                        )}
                        {errors.featured_image && (
                            <p className="text-red-500 text-sm mt-1">{errors.featured_image}</p>
                        )}
                    </div>

                    <div>
                        <Label htmlFor="meta_description">Meta Description</Label>
                        <Textarea
                            id="meta_description"
                            value={data.meta_description}
                            onChange={(e) => setData('meta_description', e.target.value)}
                            className="mt-1"
                            rows={3}
                        />
                        {errors.meta_description && (
                            <p className="text-red-500 text-sm mt-1">{errors.meta_description}</p>
                        )}
                    </div>

                    <div className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            id="is_published"
                            checked={data.is_published}
                            onChange={(e) => setData('is_published', e.target.checked)}
                            className="rounded"
                        />
                        <Label htmlFor="is_published">Publish immediately</Label>
                    </div>

                    <Button type="submit" disabled={processing}>
                        {processing ? 'Creating...' : 'Create News Article'}
                    </Button>
                </form>
            </div>
        </AdminLayout>
    );
} 