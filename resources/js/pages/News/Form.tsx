import React from 'react';
import { useForm } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Textarea } from '@/Components/ui/textarea';
import { Switch } from '@/Components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';

interface NewsItem {
    id?: number;
    title: string;
    content: string;
    featured_image: string | null;
    meta_description: string | null;
    is_published: boolean;
}

interface Props {
    news?: NewsItem;
}

const NewsForm: React.FC<Props> = ({ news }) => {
    const { data, setData, post, put, processing, errors } = useForm({
        title: news?.title || '',
        content: news?.content || '',
        featured_image: null as File | null,
        meta_description: news?.meta_description || '',
        is_published: news?.is_published || false,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (news?.id) {
            put(route('news.update', news.id));
        } else {
            post(route('news.store'));
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <Card className="max-w-4xl mx-auto">
                <CardHeader>
                    <CardTitle className="text-2xl text-[#1e4785]">
                        {news?.id ? 'Edit News' : 'Create News'}
                    </CardTitle>
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
                                rows={10}
                            />
                            {errors.content && (
                                <p className="text-sm text-red-500">{errors.content}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="featured_image">Featured Image</Label>
                            <Input
                                id="featured_image"
                                type="file"
                                onChange={(e) => setData('featured_image', e.target.files?.[0] || null)}
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
                                value={data.meta_description}
                                onChange={(e) => setData('meta_description', e.target.value)}
                                className={errors.meta_description ? 'border-red-500' : ''}
                                rows={3}
                            />
                            {errors.meta_description && (
                                <p className="text-sm text-red-500">{errors.meta_description}</p>
                            )}
                        </div>

                        <div className="flex items-center space-x-2">
                            <Switch
                                id="is_published"
                                checked={data.is_published}
                                onCheckedChange={(checked) => setData('is_published', checked)}
                            />
                            <Label htmlFor="is_published">Publish immediately</Label>
                        </div>

                        <div className="flex justify-end space-x-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => window.history.back()}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                className="bg-[#1e4785] hover:bg-[#1e4785]/90"
                                disabled={processing}
                            >
                                {news?.id ? 'Update' : 'Create'} News
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default NewsForm; 