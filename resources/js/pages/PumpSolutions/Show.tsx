import { Head } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Specification {
    key: string;
    value: string;
}

interface PumpSolution {
    id: number;
    title: string;
    description: string;
    category: string;
    image: string | null;
    specifications: Specification[];
}

interface Props {
    solution: PumpSolution;
}

export default function Show({ solution }: Props) {
    return (
        <>
            <Head title={solution.title} />
            <div className="container mx-auto py-12">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="mb-8">
                        <Badge variant="secondary" className="mb-4">
                            {solution.category}
                        </Badge>
                        <h1 className="text-4xl font-bold mb-4">{solution.title}</h1>
                    </div>

                    {/* Image */}
                    {solution.image && (
                        <div className="mb-8 rounded-lg overflow-hidden">
                            <img
                                src={solution.image}
                                alt={solution.title}
                                className="w-full h-auto"
                            />
                        </div>
                    )}

                    {/* Description */}
                    <Card className="mb-8">
                        <CardHeader>
                            <CardTitle>Description</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-700 whitespace-pre-line">
                                {solution.description}
                            </p>
                        </CardContent>
                    </Card>

                    {/* Specifications */}
                    {solution.specifications && solution.specifications.length > 0 && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Specifications</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {solution.specifications.map((spec, index) => (
                                        <div key={index} className="flex justify-between py-2 border-b">
                                            <span className="font-medium text-gray-700">
                                                {spec.key}
                                            </span>
                                            <span className="text-gray-600">
                                                {spec.value}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </>
    );
} 