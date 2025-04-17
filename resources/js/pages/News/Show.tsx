import { Head, Link } from '@inertiajs/react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface User {
    name: string;
}

interface News {
    title: string;
    content: string;
    featured_image: string | null;
    published_at: string;
    user: User;
}

interface Props {
    news: News;
}

export default function Show({ news }: Props) {
    return (
        <>
            <Head title={news.title} />
            <div className="container mx-auto py-12 px-4 md:px-0">
                <div className="max-w-4xl mx-auto">
                    <Link href={route('public.news.index')}>
                        <Button variant="ghost" className="mb-6">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to News
                        </Button>
                    </Link>

                    {/* Featured Image */}
                    {news.featured_image && (
                        <div className="mb-8 rounded-lg overflow-hidden shadow-lg">
                            <img
                                src={news.featured_image}
                                alt={news.title}
                                className="w-full h-[400px] object-cover"
                            />
                        </div>
                    )}

                    {/* Article Header */}
                    <div className="mb-8">
                        <h1 className="text-4xl font-bold mb-4">{news.title}</h1>
                        <div className="flex items-center text-gray-600 text-sm">
                            <span>By {news.user.name}</span>
                            <span className="mx-2">•</span>
                            <time>{format(new Date(news.published_at), 'MMMM d, yyyy')}</time>
                        </div>
                    </div>

                    {/* Article Content */}
                    <div className="prose prose-lg max-w-none">
                        <div className="whitespace-pre-line">{news.content}</div>
                    </div>
                </div>
            </div>
        </>
    );
} 