import { Head } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface PumpSolution {
    id: number;
    title: string;
    slug: string;
    description: string;
    features: string[];
    specifications: string[];
    applications: string[];
    is_featured: boolean;
    order: number;
    media: { id: number; original_url: string }[];
}

interface Props {
    pumpSolution: PumpSolution;
}

export default function Show({ pumpSolution }: Props) {
    // Function to safely render HTML content
    const renderHTML = (html: string) => {
        return <div dangerouslySetInnerHTML={{ __html: html }} />;
    };

    return (
        <>
            <Head title={pumpSolution.title} />
            <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <Link 
                        href={route('products.index')} 
                        className="inline-flex items-center text-[#004080] hover:text-[#006000]"
                    >
                        <ChevronLeft className="w-4 h-4 mr-1" />
                        Back to Products
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div>
                        <div className="bg-white rounded-lg shadow-md overflow-hidden">
                            {pumpSolution.media?.length > 0 ? (
                                <img
                                    src={pumpSolution.media[0].original_url}
                                    alt={pumpSolution.title}
                                    className="w-full h-auto object-cover"
                                />
                            ) : (
                                <div className="aspect-[4/3] flex items-center justify-center bg-gray-100">
                                    <span className="text-gray-400">No image available</span>
                                </div>
                            )}
                        </div>
                    </div>

                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-[#004080] mb-4">
                            {pumpSolution.title}
                        </h1>
                        <div className="prose max-w-none mb-8">
                            {renderHTML(pumpSolution.description)}
                        </div>

                        <div className="mb-8">
                            <Button variant="default" className="w-full sm:w-auto">
                                Get a Quote
                            </Button>
                        </div>

                        <Tabs defaultValue="features" className="w-full">
                            <TabsList className="grid w-full grid-cols-3">
                                <TabsTrigger value="features">Features</TabsTrigger>
                                <TabsTrigger value="specifications">Specifications</TabsTrigger>
                                <TabsTrigger value="applications">Applications</TabsTrigger>
                            </TabsList>
                            <TabsContent value="features" className="p-4 border rounded-md mt-2">
                                {pumpSolution.features && pumpSolution.features.length > 0 ? (
                                    <ul className="list-disc pl-5 space-y-2">
                                        {pumpSolution.features.map((feature, index) => (
                                            <li key={index}>{renderHTML(feature)}</li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-gray-500">No features specified.</p>
                                )}
                            </TabsContent>
                            <TabsContent value="specifications" className="p-4 border rounded-md mt-2">
                                {pumpSolution.specifications && pumpSolution.specifications.length > 0 ? (
                                    <ul className="list-disc pl-5 space-y-2">
                                        {pumpSolution.specifications.map((spec, index) => (
                                            <li key={index}>{renderHTML(spec)}</li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-gray-500">No specifications available.</p>
                                )}
                            </TabsContent>
                            <TabsContent value="applications" className="p-4 border rounded-md mt-2">
                                {pumpSolution.applications && pumpSolution.applications.length > 0 ? (
                                    <ul className="list-disc pl-5 space-y-2">
                                        {pumpSolution.applications.map((application, index) => (
                                            <li key={index}>{renderHTML(application)}</li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-gray-500">No applications specified.</p>
                                )}
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </div>
        </>
    );
} 