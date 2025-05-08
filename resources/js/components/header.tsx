import { Link } from '@inertiajs/react';
import { Disclosure } from '@headlessui/react';
import { Menu, X } from 'lucide-react';

export default function Header() {
    return (
        <header className="bg-white h-[70px] flex items-center justify-between px-5 md:px-20">
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
                    href={route('meet-the-team')}
                    className="text-[#004080] hover:text-[#008000] text-base"
                >
                    Meet the Team
                </Link>
                <span className="mx-5 text-[#004080]">|</span>
                <Link
                    href={route('pump-solutions.index')}
                    className="text-[#004080] hover:text-[#008000] text-base"
                >
                    Products
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

            {/* Mobile menu button */}
            <div className="md:hidden">
                <Disclosure>
                    {({ open }) => (
                        <>
                            <Disclosure.Button className="text-[#004080] p-2">
                                {open ? (
                                    <X className="h-6 w-6" />
                                ) : (
                                    <Menu className="h-6 w-6" />
                                )}
                            </Disclosure.Button>
                            <Disclosure.Panel className="absolute top-[70px] left-0 right-0 z-50 bg-white shadow-lg">
                                <nav className="flex flex-col items-center space-y-4 py-4">
                                    <Link
                                        href={route('the-company')}
                                        className="text-[#004080] hover:text-[#008000] text-lg font-medium"
                                    >
                                        The Company
                                    </Link>
                                    <Link
                                        href={route('meet-the-team')}
                                        className="text-[#004080] hover:text-[#008000] text-lg font-medium"
                                    >
                                        Meet the Team
                                    </Link>
                                    <Link
                                        href={route('pump-solutions.index')}
                                        className="text-[#004080] hover:text-[#008000] text-lg font-medium"
                                    >
                                        Products
                                    </Link>
                                    <Link
                                        href={route('find-us')}
                                        className="text-[#004080] hover:text-[#008000] text-lg font-medium"
                                    >
                                        Find Us
                                    </Link>
                                    <Link
                                        href={route('public.news.index')}
                                        className="text-[#004080] hover:text-[#008000] text-lg font-medium"
                                    >
                                        News
                                    </Link>
                                </nav>
                            </Disclosure.Panel>
                        </>
                    )}
                </Disclosure>
            </div>
        </header>
    );
} 

