import { Head, useForm, router } from '@inertiajs/react';
import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { format } from 'date-fns';
import { Pencil, Trash2, Plus, Search, Eye } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import toast from 'react-hot-toast';
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/admin/dashboard',
    },
    {
        title: 'News',
        href: '/admin/news',
    },
];

interface News {
    id: number;
    title: string;
    content: string;
    featured_image: string | null;
    created_at: string;
    status: string;
    published_at: string | null;
    excerpt: string | null;
    slug: string;
    is_published: boolean;
}

interface Props {
    news: News[];
    flash?: {
        message?: string;
    };
}

export default function NewsIndex({ news, flash }: Props) {
    const [searchQuery, setSearchQuery] = useState('');
    const [deleteId, setDeleteId] = useState<number | null>(null);

    // Function to safely render HTML content
    const renderHTML = (html: string) => {
        return <div dangerouslySetInnerHTML={{ __html: html }} />;
    };

    const { delete: destroy } = useForm();

    const handleDelete = () => {
        if (deleteId) {
            destroy(route('admin.news.destroy', deleteId), {
                onSuccess: () => {
                    toast.success('News article deleted successfully');
                    setDeleteId(null);
                },
                onError: () => {
                    toast.error('Failed to delete the news article');
                    setDeleteId(null);
                },
            });
        }
    };

    // Ensure news is always an array
    type NewsItem = typeof news extends Array<infer U> ? U : any;
    const newsList: NewsItem[] = Array.isArray(news)
        ? news
        : (news && Array.isArray((news as any).data)
            ? (news as any).data
            : []);
    const filteredNews = newsList.filter((article: any) =>
        article.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    // Pagination links if paginated
    const paginationLinks = !Array.isArray(news) && news && Array.isArray((news as any).links)
        ? (news as any).links
        : null;

    const handleTogglePublish = (item: News) => {
        router.put(route('admin.news.toggle-publish', item.id), {
            is_published: !item.is_published,
        }, {
            onSuccess: () => toast.success(`News article ${!item.is_published ? 'published' : 'unpublished'} successfully.`),
            onError: () => toast.error('Failed to update publish status'),
            preserveScroll: true,
        });
    };

    return (
        <AppSidebarLayout breadcrumbs={breadcrumbs}>
            <Head title="News" />
            <div className="container mx-auto py-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold">News</h1>
                    <Button asChild>
                        <Link href={route('admin.news.create')}>
                            Create News
                        </Link>
                    </Button>
                </div>

                <div className="grid gap-8 mt-8 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                    {filteredNews.map((item: any) => (
                        <div key={item.id} className="bg-white rounded-lg shadow overflow-hidden">
                            {item.featured_image && (
                                <img
                                    src={item.featured_image}
                                    alt={item.title}
                                    className="w-full h-48 object-cover"
                                />
                            )}
                            <div className="p-4">
                                <h3 className="text-lg font-semibold">{item.title}</h3>
                                <div className="flex items-center gap-2 mt-2">
                                    <input
                                        type="checkbox"
                                        checked={!!item.is_published}
                                        onChange={() => handleTogglePublish(item)}
                                        className="form-checkbox h-4 w-4 text-blue-600"
                                    />
                                    <span className="text-sm">{item.is_published ? 'Published' : 'Unpublished'}</span>
                                </div>
                                <p className="text-gray-600 mt-2">
                                    {new Date(item.created_at).toLocaleDateString()}
                                </p>
                                <div className="mt-4">
                                    <Link
                                        href={route('admin.news.edit', item.id)}
                                        className="text-indigo-600 hover:text-indigo-900"
                                    >
                                        Edit
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {/* Pagination Controls */}
                {paginationLinks && (
                    <div className="flex justify-center mt-8 gap-2 flex-wrap">
                        {paginationLinks.map((link: any, idx: number) => (
                            <Link
                                key={idx}
                                href={link.url || '#'}
                                className={`px-3 py-1 rounded border text-sm ${
                                    link.active
                                        ? 'bg-blue-600 text-white border-blue-600'
                                        : !link.url
                                        ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                                }`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                                preserveScroll
                            />
                        ))}
                    </div>
                )}
            </div>

            <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the news article.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </AppSidebarLayout>
    );
}