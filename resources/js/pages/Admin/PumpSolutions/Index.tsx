import { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plus, Pencil, ExternalLink, Trash2 } from 'lucide-react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { type BreadcrumbItem } from '@/types';

interface PumpSolution {
    id: number;
    title: string;
    slug: string;
    description: string;
    is_featured: boolean;
    order: number;
    created_at: string;
    media: { id: number; original_url: string }[];
}

interface Props {
    pumpSolutions: {
        data: PumpSolution[];
        links: { url: string | null; label: string; active: boolean }[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/admin/dashboard',
    },
    {
        title: 'Products',
        href: '/admin/pump-solutions',
    },
];

export default function Index({ pumpSolutions }: Props) {
    const [searchTerm, setSearchTerm] = useState('');
    const [deleteId, setDeleteId] = useState<number | null>(null);

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

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        window.location.href = `${route('admin.pump-solutions.index')}?search=${searchTerm}`;
    };

    const confirmDelete = (id: number) => {
        setDeleteId(id);
    };

    const handleDelete = () => {
        if (deleteId) {
            const form = document.createElement('form');
            form.method = 'POST';
            form.action = route('admin.pump-solutions.destroy', deleteId);
            
            const methodInput = document.createElement('input');
            methodInput.name = '_method';
            methodInput.value = 'DELETE';
            form.appendChild(methodInput);
            
            const csrfInput = document.createElement('input');
            csrfInput.name = '_token';
            csrfInput.value = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';
            form.appendChild(csrfInput);
            
            document.body.appendChild(form);
            form.submit();
        }
    };

    // Pagination links if paginated
    const paginationLinks = pumpSolutions && Array.isArray((pumpSolutions as any).links)
        ? (pumpSolutions as any).links
        : null;

    return (
        <AppSidebarLayout breadcrumbs={breadcrumbs}>
            <Head title="Products" />
            <div className="container mx-auto py-6">
                <h1 className="text-3xl font-bold mb-6">Products</h1>
                <div className="flex justify-between items-center mb-6">
                    <Button asChild>
                        <Link href={route('admin.pump-solutions.create')}>
                            <Plus className="w-4 h-4 mr-2" />
                            Add Product
                        </Link>
                    </Button>
                </div>

                <div className="mb-6">
                    <form onSubmit={handleSearch} className="flex max-w-md gap-2">
                        <Input
                            type="text"
                            placeholder="Search products..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="flex-1"
                        />
                        <Button type="submit" variant="default">
                            <Search className="h-4 w-4 mr-2" />
                            Search
                        </Button>
                    </form>
                </div>

                <div className="bg-white rounded-md shadow mt-8">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[80px]">Image</TableHead>
                                <TableHead>Title</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead>Featured</TableHead>
                                <TableHead>Order</TableHead>
                                <TableHead>Created</TableHead>
                                <TableHead className="w-[150px] text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {pumpSolutions.data.map((solution) => (
                                <TableRow key={solution.id}>
                                    <TableCell>
                                        {solution.media?.length > 0 ? (
                                            <img
                                                src={solution.media[0].original_url}
                                                alt={solution.title}
                                                className="w-10 h-10 object-cover rounded"
                                            />
                                        ) : (
                                            <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center">
                                                <span className="text-xs text-gray-400">No img</span>
                                            </div>
                                        )}
                                    </TableCell>
                                    <TableCell className="font-medium">{solution.title}</TableCell>
                                    <TableCell>
                                        <div className="prose prose-sm max-w-none">
                                            {renderHTML(stripHtml(solution.description).substring(0, 100) + '...')}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        {solution.is_featured ? (
                                            <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
                                                Yes
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center rounded-full bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600">
                                                No
                                            </span>
                                        )}
                                    </TableCell>
                                    <TableCell>{solution.order}</TableCell>
                                    <TableCell>{new Date(solution.created_at).toLocaleDateString()}</TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                asChild
                                                className="h-8 w-8"
                                            >
                                                <Link
                                                    href={route('admin.pump-solutions.edit', solution.slug)}
                                                    className="text-gray-500 hover:text-gray-700"
                                                >
                                                    <Pencil className="h-4 w-4" />
                                                </Link>
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                asChild
                                                className="h-8 w-8"
                                            >
                                                <Link
                                                    href={route('pump-solutions.show', solution.slug)}
                                                    className="text-gray-500 hover:text-gray-700"
                                                    target="_blank"
                                                >
                                                    <ExternalLink className="h-4 w-4" />
                                                </Link>
                                            </Button>
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        className="h-8 w-8 text-red-500 hover:text-red-700"
                                                        onClick={() => confirmDelete(solution.id)}
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            This action cannot be undone. This will permanently delete the product.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                        <AlertDialogAction onClick={handleDelete} className="bg-red-500 hover:bg-red-600">
                                                            Delete
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
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
        </AppSidebarLayout>
    );
} 