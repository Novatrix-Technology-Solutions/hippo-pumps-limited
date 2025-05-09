import { Head, useForm } from '@inertiajs/react';
import AuthLayout from '@/layouts/auth-layout';
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
        <AuthLayout 
            title="News Management" 
            description="Manage your news articles and blog posts"
        >
            <Head title="News Management" />
            <div className="container mx-auto py-10">
                <Card>
                    <CardHeader>
                        <div className="flex justify-between items-center">
                            <CardTitle>News Management</CardTitle>
                            <Button asChild>
                                <Link href={route('news.create')}>
                                    <Plus className="w-4 h-4 mr-2" />
                                    Create News
                                </Link>
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="mb-4">
                            <Input
                                type="text"
                                placeholder="Search news..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="max-w-sm"
                            />
                        </div>

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
                                                        <div className="text-sm text-muted-foreground prose prose-sm max-w-none">
                                                            {renderHTML(article.excerpt)}
                                                        </div>
                                                    )}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant={article.status === 'published' ? 'default' : 'secondary'}
                                                >
                                                    {article.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                        {article.published_at
                                                            ? format(new Date(article.published_at), 'MMM d, yyyy')
                                                            : 'Not published'}
                                                    </TableCell>
                                                    <TableCell>
                                                        {format(new Date(article.created_at), 'MMM d, yyyy')}
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        <DropdownMenu>
                                                            <DropdownMenuTrigger asChild>
                                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                                    <span className="sr-only">Open menu</span>
                                                                    <svg
                                                                        className="h-4 w-4"
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        viewBox="0 0 24 24"
                                                                        fill="none"
                                                                        stroke="currentColor"
                                                                        strokeWidth="2"
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                    >
                                                                        <circle cx="12" cy="12" r="1" />
                                                                        <circle cx="12" cy="5" r="1" />
                                                                        <circle cx="12" cy="19" r="1" />
                                                                    </svg>
                                                                </Button>
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent align="end">
                                                                <DropdownMenuItem asChild>
                                                                    <Link
                                                                        href={route('news.edit', article.id)}
                                                                        className="flex items-center"
                                                                    >
                                                                        <Pencil className="w-4 h-4 mr-2" />
                                                                        Edit
                                                                    </Link>
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem asChild>
                                                                    <Link
                                                                        href={route('public.news.show', article.slug)}
                                                                        className="flex items-center"
                                                                        target="_blank"
                                                                    >
                                                                        <Eye className="w-4 h-4 mr-2" />
                                                                        View
                                                                    </Link>
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem
                                                                    className="text-red-600 focus:text-red-600"
                                                                    onClick={() => setDeleteId(article.id)}
                                                                >
                                                                    <Trash2 className="w-4 h-4 mr-2" />
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
        </AuthLayout>
    );
}