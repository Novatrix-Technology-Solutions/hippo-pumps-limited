import { Head } from '@inertiajs/react';
import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import AnimatedPage from '@/components/Animated/AnimatedPage';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { Newspaper, Settings, WashingMachine, Users, Group } from 'lucide-react';
import { motion } from 'framer-motion';
import { staggerContainer, staggerItem } from '@/Utils/animations';
import { type BreadcrumbItem } from '@/types';

interface Props {
    newsCount: number;
    pumpSolutionsCount: number;
    teamMembersCount: number;
    usersCount: number;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/admin/dashboard',
    },
];

export default function Dashboard({ newsCount, pumpSolutionsCount, teamMembersCount, usersCount }: Props) {
    return (
        <AppSidebarLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <AnimatedPage>
                <motion.div 
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    className="container mx-auto py-6"
                >
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        <motion.div variants={staggerItem}>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">
                                        News Articles
                                    </CardTitle>
                                    <Newspaper className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{newsCount}</div>
                                    <p className="text-xs text-muted-foreground">
                                        Total news articles
                                    </p>
                                    <Button asChild className="mt-4">
                                        <Link href={route('news.index')}>
                                            Manage News
                                        </Link>
                                    </Button>
                                </CardContent>
                            </Card>
                        </motion.div>

                        <motion.div variants={staggerItem}>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">
                                        Products
                                    </CardTitle>
                                    <WashingMachine className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{pumpSolutionsCount}</div>
                                    <p className="text-xs text-muted-foreground">
                                        Total products
                                    </p>
                                    <Button asChild className="mt-4">
                                        <Link href={route('admin.pump-solutions.index')}>
                                            Manage Products
                                        </Link>
                                    </Button>
                                </CardContent>
                            </Card>
                        </motion.div>

                        <motion.div variants={staggerItem}>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">
                                        Team Members
                                    </CardTitle>
                                    <Group className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{teamMembersCount}</div>
                                    <p className="text-xs text-muted-foreground">
                                        Total team members
                                    </p>
                                    <Button asChild className="mt-4">
                                        <Link href={route('team-members.index')}>
                                            Manage Team
                                        </Link>
                                    </Button>
                                </CardContent>
                            </Card>
                        </motion.div>

                        <motion.div variants={staggerItem}>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">
                                        Users
                                    </CardTitle>
                                    <Users className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{usersCount}</div>
                                    <p className="text-xs text-muted-foreground">
                                        Total users
                                    </p>
                                    <Button asChild className="mt-4">
                                        <Link href={route('users.index')}>
                                            Manage Users
                                        </Link>
                                    </Button>
                                </CardContent>
                            </Card>
                        </motion.div>

                        <motion.div variants={staggerItem}>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">
                                        Settings
                                    </CardTitle>
                                    <Settings className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">Profile</div>
                                    <p className="text-xs text-muted-foreground">
                                        Manage your profile
                                    </p>
                                    <Button asChild className="mt-4">
                                        <Link href={route('profile.edit')}>
                                            Edit Profile
                                        </Link>
                                    </Button>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>
                </motion.div>
            </AnimatedPage>
        </AppSidebarLayout>
    );
} 