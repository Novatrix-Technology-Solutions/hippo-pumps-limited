import { Link } from '@inertiajs/react';

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
                    href={route('public.pump-solutions.index')}
                    className="text-[#004080] hover:text-[#008000] text-base"
                >
                    Pumps Solutions
                </Link>
                <span className="mx-5 text-[#004080]">|</span>
                <Link
                    href={route('public.team')}
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
                <button className="text-[#004080]">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <line x1="3" y1="12" x2="21" y2="12"></line>
                        <line x1="3" y1="6" x2="21" y2="6"></line>
                        <line x1="3" y1="18" x2="21" y2="18"></line>
                    </svg>
                </button>
            </div>
        </header>
    );
} 