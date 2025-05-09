import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/layouts/AdminLayout';
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
import { format } from 'date-fns';
import { Plus, Search, Mail, Shield, Clock, Pencil, Trash2, UserPlus } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

interface User {
    id: number;
    name: string;
    email: string;
    role: 'admin' | 'user' | 'editor';
    status: 'active' | 'inactive' | 'suspended';
    created_at: string;
    last_login_at?: string;
    email_verified_at?: string;
}

interface Props {
    users: User[];
    flash?: {
        message?: string;
        type?: 'success' | 'error';
    };
}

export default function UsersIndex({ users, flash }: Props) {
    const [searchQuery, setSearchQuery] = useState('');
    const [roleFilter, setRoleFilter] = useState<string>('all');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [userToDelete, setUserToDelete] = useState<User | null>(null);
    const { delete: destroy, processing } = useForm();

    // Get unique roles and statuses
    const roles = ['all', ...new Set(users.map(user => user.role || 'user'))];
    const statuses = ['all', ...new Set(users.map(user => user.status || 'active'))];

    const filteredUsers = users.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase());
        
        const matchesRole = roleFilter === 'all' || user.role === roleFilter;
        const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
        
        return matchesSearch && matchesRole && matchesStatus;
    });

    const handleDelete = () => {
        if (!userToDelete) return;

        destroy(route('users.destroy', userToDelete.id), {
            onSuccess: () => {
                toast.success('User deleted successfully');
                setUserToDelete(null);
            },
            onError: () => {
                toast.error('Failed to delete user');
            },
        });
    };

    const getStatusColor = (status: User['status'] = 'active') => {
        switch (status) {
            case 'active':
                return 'bg-green-500';
            case 'inactive':
                return 'bg-gray-500';
            case 'suspended':
                return 'bg-red-500';
            default:
                return 'bg-gray-500';
        }
    };

    const getRoleColor = (role: User['role'] = 'user') => {
        switch (role) {
            case 'admin':
                return 'bg-purple-500';
            case 'editor':
                return 'bg-blue-500';
            case 'user':
                return 'bg-gray-500';
            default:
                return 'bg-gray-500';
        }
    };

    const formatRole = (role: string = 'user') => {
        return role.charAt(0).toUpperCase() + role.slice(1);
    };

    const formatStatus = (status: string = 'active') => {
        return status.charAt(0).toUpperCase() + status.slice(1);
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
            <Head title="Users" />
            <div className="container mx-auto py-6 space-y-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Users</h1>
                        <p className="text-muted-foreground">
                            Manage your users and their permissions
                        </p>
                    </div>
                    <Button asChild>
                        <Link href={route('users.create')} className="gap-2">
                            <UserPlus className="h-4 w-4" />
                            Create New User
                        </Link>
                    </Button>
                </div>

                <Card>
                    <CardHeader>
                        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                            <CardTitle>All Users</CardTitle>
                            <div className="flex flex-col gap-4 md:flex-row md:items-center">
                                <Select
                                    value={roleFilter}
                                    onValueChange={setRoleFilter}
                                >
                                    <SelectTrigger className="w-[140px]">
                                        <SelectValue placeholder="Select Role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {roles.map((role) => (
                                            <SelectItem key={role} value={role}>
                                                {role === 'all' ? 'All Roles' : formatRole(role)}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <Select
                                    value={statusFilter}
                                    onValueChange={setStatusFilter}
                                >
                                    <SelectTrigger className="w-[140px]">
                                        <SelectValue placeholder="Select Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {statuses.map((status) => (
                                            <SelectItem key={status} value={status}>
                                                {status === 'all' ? 'All Statuses' : formatStatus(status)}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <div className="relative w-full md:w-72">
                                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        placeholder="Search users..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="pl-8"
                                    />
                                </div>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>User</TableHead>
                                        <TableHead>Role</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Last Login</TableHead>
                                        <TableHead>Created</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredUsers.map((user) => (
                                        <TableRow key={user.id}>
                                            <TableCell>
                                                <div className="flex flex-col gap-1">
                                                    <span className="font-medium">{user.name}</span>
                                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                        <Mail className="h-4 w-4" />
                                                        {user.email}
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="secondary" className={getRoleColor(user.role)}>
                                                    <Shield className="mr-1 h-3 w-3" />
                                                    {user.role}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="secondary" className={getStatusColor(user.status)}>
                                                    {user.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                {user.last_login_at ? (
                                                    <div className="flex items-center gap-2 text-sm">
                                                        <Clock className="h-4 w-4 text-muted-foreground" />
                                                        {format(new Date(user.last_login_at), 'PPP')}
                                                    </div>
                                                ) : (
                                                    <span className="text-sm text-muted-foreground">Never</span>
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                {format(new Date(user.created_at), 'PPP')}
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
                                                            <Link href={route('users.edit', user.id)}>
                                                                <Pencil className="mr-2 h-4 w-4" />
                                                                Edit
                                                            </Link>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            className="text-red-600"
                                                            onClick={() => setUserToDelete(user)}
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

            <AlertDialog open={!!userToDelete} onOpenChange={() => setUserToDelete(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the user
                            "{userToDelete?.name}".
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