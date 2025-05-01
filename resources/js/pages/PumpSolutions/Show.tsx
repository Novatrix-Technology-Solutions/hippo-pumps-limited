import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Download, Mail, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedPage from '@/components/Animated/AnimatedPage';
import { staggerContainer, staggerItem, fadeIn } from '@/Utils/animations';

interface PumpSolution {
    id: number;
    title: string;
    description: string;
    category: string;
    image: string | null;
    specifications: { [key: string]: string | null };
}

interface Props {
    solution: PumpSolution;
}

export default function Show({ solution }: Props) {
    return (
        <AnimatedPage>
            <Head title={solution.title} />
            <motion.div 
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="container mx-auto py-12 px-4 md:px-0"
            >
                <motion.div variants={fadeIn} className="mb-8">
                    <Link href={route('public.pump-solutions.index')}>
                        <Button variant="ghost" className="mb-6">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Solutions
                        </Button>
                    </Link>
                </motion.div>

                <div className="max-w-7xl mx-auto">
    
                    {/* Right Column - Product Info */}
                    <motion.div variants={staggerItem} className="space-y-6">
                        <Badge variant="secondary" className="text-lg px-4 py-1">
                            {solution.category}
                            </Badge>
                            <h1 className="text-4xl font-bold text-[#1e4785]">{solution.title}</h1>
                            
                            <div className="prose prose-lg">
                                <p className="text-gray-700 whitespace-pre-line">
                                    {solution.description}
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-4 pt-6">
                                <Button className="flex-1">
                                    <Mail className="w-4 h-4 mr-2" />
                                    Request Quote
                                </Button>
                                <Button variant="outline" className="flex-1">
                                    <Download className="w-4 h-4 mr-2" />
                                    Download Specs
                                </Button>
                            </div>

                            <div className="pt-6 border-t">
                                <p className="text-gray-600 mb-4">Need help? Contact our experts:</p>
                                <Button variant="outline" className="w-full mb-2">
                                    <Phone className="w-4 h-4 mr-2" />
                                    +260 211 123456
                                </Button>
                                <Button variant="outline" className="w-full">
                                    <Mail className="w-4 h-4 mr-2" />
                                    sales@hippopumps.com
                                </Button>
                            </div>
                        </motion.div>
                    </div>

                    {/* Specifications */}
                    {solution.specifications && (
                        <motion.div
                            variants={staggerItem}
                            className="mt-16"
                        >
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-2xl">Technical Specifications</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {Object.entries(solution.specifications).map(([key, value], index) => (
                                            <motion.div
                                                key={index}
                                                variants={fadeIn}
                                                className="bg-gray-50 p-4 rounded-lg"
                                            >
                                                <div className="font-medium text-gray-900 mb-2 capitalize">
                                                    {key.replace(/_/g, ' ')}
                                                </div>
                                                <div className="text-gray-600">
                                                    {value}
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    )}
            </motion.div>
        </AnimatedPage>
    );
} 