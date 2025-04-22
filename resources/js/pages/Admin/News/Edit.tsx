import { Head, useForm } from '@inertiajs/react';
import AdminLayout from '@/layouts/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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
            <div className="container mx-auto py-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Edit News Article</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
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
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="content">Content</Label>
                                <Textarea
                                    id="content"
                                    value={data.content}
                                    onChange={(e) => setData('content', e.target.value)}
                                    className={errors.content ? 'border-red-500' : ''}
                                />
                                {errors.content && (
                                    <p className="text-sm text-red-500">{errors.content}</p>
                                )}
                            </div>

                            <div className="space-y-2">
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
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="meta_description">Meta Description</Label>
                                <Textarea
                                    id="meta_description"
                                    value={data.meta_description || ''}
                                    onChange={(e) => setData('meta_description', e.target.value)}
                                    className={errors.meta_description ? 'border-red-500' : ''}
                                />
                                {errors.meta_description && (
                                    <p className="text-sm text-red-500">{errors.meta_description}</p>
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
                                {processing ? 'Updating...' : 'Update News Article'}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
}