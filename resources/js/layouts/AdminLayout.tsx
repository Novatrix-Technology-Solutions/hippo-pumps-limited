import { PropsWithChildren } from 'react';
import { Link, Head } from '@inertiajs/react';
import { 
    LayoutDashboard, 
    Newspaper, 
    Droplet, 
    Settings, 
    LogOut, 
    User
} from 'lucide-react';
import PageTransition from '@/components/Animated/PageTransition';

interface Props {
    title?: string;
    user?: {
        name: string;
        email: string;
    };
}

const AdminLayout = ({ children, title, user }: PropsWithChildren<Props>) => {
    return (
        <div className="min-h-screen bg-gray-100">
            <Head title={title} />

            <div className="min-h-screen">
                <PageTransition>
                    <div className="min-h-screen">
                        {/* Sidebar */}
                        <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg">
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
                                <nav className="flex-1 px-4 py-4 space-y-1">
                                    <Link
                                        href={route('dashboard')}
                                        className="flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100"
                                    >
                                        <LayoutDashboard className="w-5 h-5 mr-3" />
                                        Dashboard
                                    </Link>

                                    <Link
                                        href={route('news.index')}
                                        className="flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100"
                                    >
                                        <Newspaper className="w-5 h-5 mr-3" />
                                        News
                                    </Link>

                                    <Link
                                        href={route('pump-solutions.index')}
                                        className="flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100"
                                    >
                                        <Droplet className="w-5 h-5 mr-3" />
                                        Pump Solutions
                                    </Link>

                                    <Link
                                        href={route('users.index')}
                                        className="flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100"
                                    >
                                        <User className="w-5 h-5 mr-3" />
                                        Users
                                    </Link>

                                    <Link
                                        href={route('profile.edit')}
                                        className="flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100"
                                    >
                                        <Settings className="w-5 h-5 mr-3" />
                                        Settings
                                    </Link>
                                </nav>

                                {/* User Section */}
                                <div className="p-4 border-t border-gray-200">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-medium text-gray-700">{user?.name}</p>
                                            <p className="text-xs text-gray-500">{user?.email}</p>
                                        </div>
                                        <Link
                                            href={route('logout')}
                                            method="post"
                                            as="button"
                                            className="text-gray-500 hover:text-gray-700"
                                        >
                                            <LogOut className="w-5 h-5" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="pl-64">
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