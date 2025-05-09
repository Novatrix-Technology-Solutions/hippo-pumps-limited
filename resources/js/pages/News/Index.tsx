import { Head, Link } from '@inertiajs/react';
import { PageProps } from '@/types';
import { format } from 'date-fns';

interface NewsItem {
    id: number;
    title: string;
    slug: string;
    content: string;
    featured_image: string | null;
    meta_description: string | null;
    published_at: string;
}

interface Props extends PageProps {
    news: {
        data: NewsItem[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
}

export default function NewsIndex({ news }: Props) {
    // Function to safely render HTML content
    const renderHTML = (html: string) => {
        return <div dangerouslySetInnerHTML={{ __html: html }} />;
    };

    // Function to strip HTML tags for excerpt
    const stripHtml = (html: string) => {
        const tmp = document.createElement('div');
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || '';
    };

    return (
        <>
            <Head title="News & Updates" />
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-[#1e4785] mb-8">News & Updates</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {news.data.map((item) => (
                        <Link key={item.id} href={route('public.news.show', item.slug)}>
                            <article className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                                {item.featured_image && (
                                    <img
                                        src={`/storage/${item.featured_image}`}
                                        alt={item.title}
                                        className="w-full h-48 object-cover"
                                    />
                                )}
                                <div className="p-6">
                                    <h2 className="text-xl font-bold text-[#1e4785] mb-2">{item.title}</h2>
                                    <time className="text-sm text-gray-500 mb-4 block">
                                        {format(new Date(item.published_at), 'MMMM d, yyyy')}
                                    </time>
                                    <div className="text-gray-600 prose prose-sm max-w-none">
                                        {item.meta_description || stripHtml(item.content).substring(0, 150) + '...'}
                                    </div>
                                </div>
                            </article>
                        </Link>
                    ))}
                </div>

                {news.last_page > 1 && (
                    <div className="mt-8 flex justify-center gap-2">
                        {Array.from({ length: news.last_page }, (_, i) => i + 1).map((page) => (
                            <Link
                                key={page}
                                href={route('public.news.index', { page })}
                                className={`px-4 py-2 rounded ${
                                    page === news.current_page
                                        ? 'bg-[#1e4785] text-white'
                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                            >
                                {page}
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
} 