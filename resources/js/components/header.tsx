import { Link } from '@inertiajs/react';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="bg-white h-[70px] flex items-center justify-between px-5 md:px-20 relative">
            <Link href="/" className="text-[#004080]">
                <img
                    src="/images/hippo-logo.svg"
                    alt="Hippo"
                    width={140}
                    height={68}
                    className="ml-[-30px]"
                />
            </Link>
            <nav className="hidden md:flex items-center">
                <Link
                    href={route('the-company')}
                    className="text-[#004080] hover:text-[#008000] text-base"
                >
                    The Company
                </Link>
                <span className="mx-5 text-[#004080]">|</span>
                <Link
                    href={route('public.pump-solutions.index')}
                    className="text-[#004080] hover:text-[#008000] text-base"
                >
                    Pumps Solutions
                </Link>
                <span className="mx-5 text-[#004080]">|</span>
                <Link
                    href={route('meet-the-team')}
                    className="text-[#004080] hover:text-[#008000] text-base"
                >
                    Meet the Team
                </Link>
                <span className="mx-5 text-[#004080]">|</span>
                <Link
                    href={route('find-us')}
                    className="text-[#004080] hover:text-[#008000] text-base"
                >
                    Find Us
                </Link>
                <span className="mx-5 text-[#004080]">|</span>
                <Link
                    href={route('public.news.index')}
                    className="text-[#004080] hover:text-[#008000] text-base"
                >
                    News
                </Link>
            </nav>
            <div className="md:hidden">
                <button 
                    onClick={toggleMenu}
                    className="text-[#004080] p-2"
                    aria-label="Toggle menu"
                >
                    {isMenuOpen ? (
                        <X className="h-6 w-6" />
                    ) : (
                        <Menu className="h-6 w-6" />
                    )}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="fixed top-[70px] left-0 right-0 z-50 bg-white md:hidden shadow-lg">
                    <nav className="flex flex-col items-center space-y-4 py-4">
                        <Link
                            href={route('the-company')}
                            className="text-[#004080] hover:text-[#008000] text-lg font-medium"
                            onClick={toggleMenu}
                        >
                            The Company
                        </Link>
                        <Link
                            href={route('public.pump-solutions.index')}
                            className="text-[#004080] hover:text-[#008000] text-lg font-medium"
                            onClick={toggleMenu}
                        >
                            Pumps Solutions
                        </Link>
                        <Link
                            href={route('meet-the-team')}
                            className="text-[#004080] hover:text-[#008000] text-lg font-medium"
                            onClick={toggleMenu}
                        >
                            Meet the Team
                        </Link>
                        <Link
                            href={route('find-us')}
                            className="text-[#004080] hover:text-[#008000] text-lg font-medium"
                            onClick={toggleMenu}
                        >
                            Find Us
                        </Link>
                        <Link
                            href={route('public.news.index')}
                            className="text-[#004080] hover:text-[#008000] text-lg font-medium"
                            onClick={toggleMenu}
                        >
                            News
                        </Link>
                    </nav>
                </div>
            )}
        </header>
    );
} 