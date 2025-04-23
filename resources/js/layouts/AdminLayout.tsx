import { PropsWithChildren } from 'react';
import { Link, Head, usePage } from '@inertiajs/react';
import { 
    LayoutDashboard, 
    Newspaper, 
    Droplet, 
    Settings, 
    LogOut, 
    User,
    AppWindow,
    Menu
} from 'lucide-react';
import PageTransition from '@/components/Animated/PageTransition';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Props {
    title?: string;
    user?: {
        name: string;
        email: string;
    };
}

const AdminLayout = ({ children, title, user }: PropsWithChildren<Props>) => {
    const { url } = usePage();

    const isActive = (routeName: string) => {
        return url.startsWith(route(routeName));
    };

    const NavLink = ({ href, icon: Icon, children, routeName }: { 
        href: string; 
        icon: React.ComponentType<{ className?: string }>; 
        children: React.ReactNode;
        routeName: string;
    }) => (
        <Link
            href={href}
            className={cn(
                "flex items-center px-4 py-2 text-gray-700 rounded-lg transition-colors",
                isActive(routeName) 
                    ? "bg-gray-100 text-gray-900 font-medium" 
                    : "hover:bg-gray-50"
            )}
        >
            <Icon className="w-5 h-5 mr-3" />
            {children}
        </Link>
    );

    return (
        <div className="min-h-screen bg-gray-100">
            <Head title={title} />

            <div className="min-h-screen">
                <PageTransition>
                    <div className="min-h-screen">
                        {/* Mobile Header */}
                        <div className="md:hidden fixed top-0 left-0 right-0 z-[100] bg-white shadow-md">
                            <div className="flex items-center justify-between px-4 h-16">
                                <Sheet>
                                    <SheetTrigger asChild>
                                        <Button variant="ghost" size="icon" className="h-9 w-9">
                                            <Menu className="h-5 w-5" />
                                        </Button>
                                    </SheetTrigger>
                                    <SheetContent side="left" className="w-64 p-0 z-[101]">
                                        <SheetHeader className="p-4 border-b">
                                            <SheetTitle className="text-xl font-bold text-gray-800">
                                                <img 
                                                    src="/images/hippo-logo.svg"
                                                    alt='Hippo Pumps Limited'
                                                    width={120}
                                                    height={60}
                                                />
                                            </SheetTitle>
                                        </SheetHeader>
                                        <nav className="flex-1 px-4 py-4 space-y-1">
                                            <NavLink href={route('dashboard')} icon={LayoutDashboard} routeName="dashboard">
                                                Dashboard
                                            </NavLink>
                                            <NavLink href={route('news.index')} icon={Newspaper} routeName="news.index">
                                                News
                                            </NavLink>
                                            <NavLink href={route('pump-solutions.index')} icon={Droplet} routeName="pump-solutions.index">
                                                Pump Solutions
                                            </NavLink>
                                            <NavLink href={route('admin.team-members.index')} icon={AppWindow} routeName="admin.team-members.index">
                                                Team Members
                                            </NavLink>
                                            <NavLink href={route('users.index')} icon={User} routeName="users.index">
                                                Users
                                            </NavLink>
                                            <NavLink href={route('profile.edit')} icon={Settings} routeName="profile.edit">
                                                Settings
                                            </NavLink>
                                        </nav>
                                        <div className="p-4 border-t border-gray-200 bg-gray-50">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                                                    <p className="text-xs text-gray-500">{user?.email}</p>
                                                </div>
                                                <Link
                                                    href={route('logout')}
                                                    method="post"
                                                    as="button"
                                                    className="text-gray-500 hover:text-gray-700 transition-colors"
                                                >
                                                    <LogOut className="w-5 h-5" />
                                                </Link>
                                            </div>
                                        </div>
                                    </SheetContent>
                                </Sheet>
                                <Link href="/" className="text-xl font-bold text-gray-800">
                                    <img 
                                        src="/images/hippo-logo.svg"
                                        alt='Hippo Pumps Limited'
                                        width={120}
                                        height={60}
                                    />
                                </Link>
                                <div className="w-9" /> {/* Spacer for balance */}
                            </div>
                        </div>

                        {/* Desktop Sidebar */}
                        <div className="hidden md:flex fixed inset-y-0 left-0 w-64 bg-white shadow-lg">
                            <div className="flex flex-col h-full">
                                {/* Logo */}
                                <div className="flex items-center justify-center h-16 border-b border-gray-200">
                                    <Link href="/" className="text-xl font-bold text-gray-800">
                                        <img 
                                            src="/images/hippo-logo.svg"
                                            alt='Hippo Pumps Limited'
                                            width={150}
                                            height={100}
                                        />
                                    </Link>
                                </div>

                                {/* Navigation */}
                                <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
                                    <NavLink href={route('dashboard')} icon={LayoutDashboard} routeName="dashboard">
                                        Dashboard
                                    </NavLink>
                                    <NavLink href={route('news.index')} icon={Newspaper} routeName="news.index">
                                        News
                                    </NavLink>
                                    <NavLink href={route('pump-solutions.index')} icon={Droplet} routeName="pump-solutions.index">
                                        Pump Solutions
                                    </NavLink>
                                    <NavLink href={route('admin.team-members.index')} icon={AppWindow} routeName="admin.team-members.index">
                                        Team Members
                                    </NavLink>
                                    <NavLink href={route('users.index')} icon={User} routeName="users.index">
                                        Users
                                    </NavLink>
                                    <NavLink href={route('profile.edit')} icon={Settings} routeName="profile.edit">
                                        Settings
                                    </NavLink>
                                </nav>

                                {/* User Section */}
                                <div className="p-4 border-t border-gray-200 bg-gray-50">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                                            <p className="text-xs text-gray-500">{user?.email}</p>
                                        </div>
                                        <Link
                                            href={route('logout')}
                                            method="post"
                                            as="button"
                                            className="text-gray-500 hover:text-gray-700 transition-colors"
                                        >
                                            <LogOut className="w-5 h-5" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="md:pl-64 pt-16 md:pt-0">
                            <main className="p-6">
                                {children}
                            </main>
                        </div>
                    </div>
                </PageTransition>
            </div>
        </div>
    );
};

export default AdminLayout;