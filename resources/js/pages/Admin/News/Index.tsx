import { Head, useForm } from '@inertiajs/react';
import AdminLayout from '@/layouts/AdminLayout';
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
import { Pencil, Trash2, Plus, Search, Eye, Calendar } from 'lucide-react';
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

interface News {
    id: number;
    title: string;
    slug: string;
    published_at: string;
    created_at: string;
    status: 'published' | 'draft';
    excerpt?: string;
}

interface Props {
    news: News[];
    flash?: {
        message?: string;
        type?: 'success' | 'error';
    };
}

export default function NewsIndex({ news, flash }: Props) {
    const [searchQuery, setSearchQuery] = useState('');
    const [articleToDelete, setArticleToDelete] = useState<News | null>(null);
    const { delete: destroy, processing } = useForm();

    const filteredNews = news.filter(article =>
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleDelete = () => {
        if (!articleToDelete) return;

        destroy(route('news.destroy', articleToDelete.id), {
            onSuccess: () => {
                toast.success('Article deleted successfully');
                setArticleToDelete(null);
            },
            onError: () => {
                toast.error('Failed to delete article');
            },
        });
    };

    // Show flash message if exists
    if (flash?.message) {
        if (flash.type === 'success') {
            toast.success(flash.message);
        } else if (flash.type === 'error') {
            toast.error(flash.message);
        }
    }

    return (
        <AdminLayout>
            <Head title="News Articles" />
            <div className="container mx-auto py-6 space-y-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">News Articles</h1>
                        <p className="text-muted-foreground">
                            Manage your news articles and blog posts
                        </p>
                    </div>
                    <Button asChild>
                        <Link href={route('news.create')} className="gap-2">
                            <Plus className="h-4 w-4" />
                            Create New Article
                        </Link>
                    </Button>
                </div>

                <Card>
                    <CardHeader>
                        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                            <CardTitle>All Articles</CardTitle>
                            <div className="relative w-full md:w-72">
                                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search articles..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-8"
                                />
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Title</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Published Date</TableHead>
                                        <TableHead>Created At</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredNews.map((article) => (
                                        <TableRow key={article.id}>
                                            <TableCell className="font-medium">
                                                <div className="flex flex-col gap-1">
                                                    <span>{article.title}</span>
                                                    {article.excerpt && (
                                                        <span className="text-sm text-muted-foreground">
                                                            {article.excerpt}
                                                        </span>
                                                    )}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant={article.status === 'published' ? 'default' : 'secondary'}>
                                                    {article.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <Calendar className="h-4 w-4 text-muted-foreground" />
                                                    {format(new Date(article.published_at), 'PPP')}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                {format(new Date(article.created_at), 'PPP')}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="icon">
                                                            <span className="sr-only">Open menu</span>
                                                            <Pencil className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem asChild>
                                                            <Link href={route('news.edit', article.id)}>
                                                                <Pencil className="mr-2 h-4 w-4" />
                                                                Edit
                                                            </Link>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem asChild>
                                                            <Link href={route('news.show', article.slug)}>
                                                                <Eye className="mr-2 h-4 w-4" />
                                                                Preview
                                                            </Link>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            className="text-red-600"
                                                            onClick={() => setArticleToDelete(article)}
                                                        >
                                                            <Trash2 className="mr-2 h-4 w-4" />
                                                            Delete
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <AlertDialog open={!!articleToDelete} onOpenChange={() => setArticleToDelete(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the article
                            "{articleToDelete?.title}".
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDelete}
                            className="bg-red-600 hover:bg-red-700"
                            disabled={processing}
                        >
                            {processing ? 'Deleting...' : 'Delete'}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </AdminLayout>
    );
}