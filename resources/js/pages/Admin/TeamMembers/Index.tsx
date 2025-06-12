import { Head, Link, useForm } from '@inertiajs/react';
import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useState } from 'react';
import { Plus, Search, Mail, Phone, Pencil, Trash2, ArrowUpDown } from 'lucide-react';
import toast from 'react-hot-toast';
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Team Members',
        href: '/admin/team-members',
    },
];

interface TeamMember {
    id: number;
    name: string;
    position: string;
    department: string;
    bio: string;
    image: string;
    image_url: string;
    order: number;
    email?: string;
    phone?: string;
}

interface Props {
    teamMembers: TeamMember[];
    flash?: {
        message?: string;
        type?: 'success' | 'error';
    };
}

export default function TeamMembersIndex({ teamMembers, flash }: Props) {
    const [searchQuery, setSearchQuery] = useState('');
    const [departmentFilter, setDepartmentFilter] = useState<string>('all');
    const [memberToDelete, setMemberToDelete] = useState<TeamMember | null>(null);
    const { delete: destroy, processing } = useForm();

    // Get unique departments
    const departments = ['all', ...new Set(teamMembers.map(member => member.department))];

    const filteredMembers = teamMembers.filter(member => {
        const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            member.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
            member.department.toLowerCase().includes(searchQuery.toLowerCase());
        
        const matchesDepartment = departmentFilter === 'all' || member.department === departmentFilter;
        
        return matchesSearch && matchesDepartment;
    });

    const handleDelete = () => {
        if (!memberToDelete) return;

        destroy(route('admin.team-members.destroy', memberToDelete.id), {
            onSuccess: () => {
                toast.success('Team member deleted successfully');
                setMemberToDelete(null);
            },
            onError: () => {
                toast.error('Failed to delete team member');
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

    // Pagination links if paginated
    const paginationLinks = Array.isArray(teamMembers) ? null : (teamMembers && Array.isArray((teamMembers as any).links) ? (teamMembers as any).links : null);

    return (
        <AppSidebarLayout breadcrumbs={breadcrumbs}>
            <Head title="Team Members" />
            <div className="container mx-auto py-6 space-y-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Team Members</h1>
                        <p className="text-muted-foreground">
                            Manage your team members and their profiles
                        </p>
                    </div>
                    <Button asChild>
                        <Link href={route('admin.team-members.create')} className="gap-2">
                            <Plus className="h-4 w-4" />
                            Add Team Member
                        </Link>
                    </Button>
                </div>

                <Card>
                    <CardHeader>
                        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                            <CardTitle>All Team Members</CardTitle>
                            <div className="flex flex-col gap-4 md:flex-row md:items-center">
                                <Select
                                    value={departmentFilter}
                                    onValueChange={setDepartmentFilter}
                                >
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Select Department" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {departments.map((dept) => (
                                            <SelectItem key={dept} value={dept}>
                                                {dept === 'all' ? 'All Departments' : dept}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <div className="relative w-full md:w-72">
                                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        placeholder="Search members..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="pl-8"
                                    />
                                </div>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="rounded-md border mt-8">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Member</TableHead>
                                        <TableHead>Department</TableHead>
                                        <TableHead>Position</TableHead>
                                        <TableHead>Contact</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredMembers.map((member) => (
                                        <TableRow key={member.id}>
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <img
                                                        src={member.image_url}
                                                        alt={member.name}
                                                        className="h-10 w-10 rounded-full object-cover"
                                                    />
                                                    <div className="flex flex-col">
                                                        <span className="font-medium">{member.name}</span>
                                                        <span className="text-sm text-muted-foreground">
                                                            Order: {member.order}
                                                        </span>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="secondary">
                                                    {member.department}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>{member.position}</TableCell>
                                            <TableCell>
                                                <div className="flex flex-col gap-1">
                                                    {member.email && (
                                                        <div className="flex items-center gap-2 text-sm">
                                                            <Mail className="h-4 w-4 text-muted-foreground" />
                                                            {member.email}
                                                        </div>
                                                    )}
                                                    {member.phone && (
                                                        <div className="flex items-center gap-2 text-sm">
                                                            <Phone className="h-4 w-4 text-muted-foreground" />
                                                            {member.phone}
                                                        </div>
                                                    )}
                                                </div>
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
                                                            <Link href={route('admin.team-members.edit', member.id)}>
                                                                <Pencil className="mr-2 h-4 w-4" />
                                                                Edit
                                                            </Link>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            className="text-red-600"
                                                            onClick={() => setMemberToDelete(member)}
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

            <AlertDialog open={!!memberToDelete} onOpenChange={() => setMemberToDelete(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the team member
                            "{memberToDelete?.name}".
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
        </AppSidebarLayout>
    );
} 