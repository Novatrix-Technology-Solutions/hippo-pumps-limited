import { Head } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Badge } from '@/Components/ui/badge';

interface PumpSolution {
    id: number;
    title: string;
    slug: string;
    description: string;
    category: string;
    image: string | null;
    is_featured: boolean;
}

interface Props {
    pumpSolutions: PumpSolution[];
    categories: string[];
}

export default function Index({ pumpSolutions, categories }: Props) {
    return (
        <>
            <Head title="Pump Solutions" />
            <div className="container mx-auto py-12">
                <h1 className="text-4xl font-bold text-center mb-12">Our Pump Solutions</h1>
                
                {/* Categories */}
                <div className="flex flex-wrap gap-2 justify-center mb-8">
                    {categories.map((category) => (
                        <Badge key={category} variant="outline" className="text-sm">
                            {category}
                        </Badge>
                    ))}
                </div>

                {/* Solutions Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {pumpSolutions.map((solution) => (
                        <Link
                            key={solution.id}
                            href={route('public.pump-solutions.show', solution.slug)}
                            className="block"
                        >
                            <Card className="h-full hover:shadow-lg transition-shadow">
                                {solution.image && (
                                    <div className="aspect-video overflow-hidden">
                                        <img
                                            src={solution.image}
                                            alt={solution.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                )}
                                <CardHeader>
                                    <CardTitle>{solution.title}</CardTitle>
                                    <Badge variant="secondary">{solution.category}</Badge>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-gray-600 line-clamp-3">
                                        {solution.description}
                                    </p>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
} 