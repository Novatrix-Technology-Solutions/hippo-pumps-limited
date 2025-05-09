import { Head, useForm } from '@inertiajs/react';
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
            destroy(route('news.destroy', deleteId), {
                onSuccess: () => {
                    toast.success('News article deleted successfully');
                    setDeleteId(null);
                },
                onError: () => {
                    toast.error('Failed to delete news article');
                    setDeleteId(null);
                },
            });
        }
    };

    const filteredNews = news.filter((article) =>
        article.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <AppSidebarLayout breadcrumbs={breadcrumbs}>
            <Head title="News" />
            <div className="container mx-auto py-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold">News</h1>
                    <Button asChild>
                        <Link href={route('news.create')}>
                            Create News
                        </Link>
                    </Button>
                </div>

                <div className="grid gap-8 mt-8 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                    {news.map((item) => (
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
                                <p className="text-gray-600 mt-2">
                                    {new Date(item.created_at).toLocaleDateString()}
                                </p>
                                <div className="mt-4">
                                    <Link
                                        href={route('news.edit', item.id)}
                                        className="text-indigo-600 hover:text-indigo-900"
                                    >
                                        Edit
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
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