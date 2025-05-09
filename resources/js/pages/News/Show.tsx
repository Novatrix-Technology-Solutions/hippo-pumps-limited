import { Head, Link } from '@inertiajs/react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, User as UserIcon, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedPage from '@/components/Animated/AnimatedPage';
import { staggerContainer, staggerItem, fadeIn } from '@/Utils/animations';

interface User {
    name: string;
}

interface News {
    title: string;
    content: string;
    featured_image: string | null;
    published_at: string;
    user: User;
}

interface Props {
    news: News;
}

export default function Show({ news }: Props) {
    // Function to safely render HTML content
    const renderHTML = (html: string) => {
        return <div dangerouslySetInnerHTML={{ __html: html }} />;
    };

    return (
        <AnimatedPage>
            <Head title={news.title} />
            <motion.div 
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="container mx-auto py-12 px-4 md:px-0"
            >
                <div className="max-w-4xl mx-auto">
                    <motion.div variants={fadeIn}>
                        <Link href={route('public.news.index')}>
                            <Button variant="ghost" className="mb-6">
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back to News
                            </Button>
                        </Link>
                    </motion.div>

                    {/* Featured Image */}
                    {news.featured_image && (
                        <motion.div 
                            variants={staggerItem}
                            className="mb-8 rounded-xl overflow-hidden shadow-xl"
                        >
                            <motion.img
                                initial={{ opacity: 0, scale: 1.1 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5 }}
                                src={news.featured_image}
                                alt={news.title}
                                className="w-full h-[500px] object-cover"
                            />
                        </motion.div>
                    )}

                    {/* Article Header */}
                    <motion.div 
                        variants={staggerItem}
                        className="mb-12"
                    >
                        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[#1e4785] leading-tight">
                            {news.title}
                        </h1>
                        <div className="flex flex-wrap items-center gap-6 text-gray-600">
                            <div className="flex items-center">
                                <UserIcon className="w-5 h-5 mr-2" />
                                <span>{news.user.name}</span>
                            </div>
                            <div className="flex items-center">
                                <Calendar className="w-5 h-5 mr-2" />
                                <time>{format(new Date(news.published_at), 'MMMM d, yyyy')}</time>
                            </div>
                            <Button variant="ghost" size="sm" className="ml-auto">
                                <Share2 className="w-4 h-4 mr-2" />
                                Share
                            </Button>
                        </div>
                    </motion.div>

                    {/* Article Content */}
                    <motion.div
                        variants={staggerItem}
                        className="prose prose-lg max-w-none"
                    >
                        {renderHTML(news.content)}
                    </motion.div>

                    {/* Share Section */}
                    <motion.div 
                        variants={staggerItem}
                        className="mt-12 pt-8 border-t border-gray-200"
                    >
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-gray-900">Share this article</h3>
                            <div className="flex gap-4">
                                <Button variant="outline" size="sm">
                                    <Share2 className="w-4 h-4 mr-2" />
                                    Share on LinkedIn
                                </Button>
                                <Button variant="outline" size="sm">
                                    <Share2 className="w-4 h-4 mr-2" />
                                    Share on Twitter
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </AnimatedPage>
    );
} 