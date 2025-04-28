import { Head } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import ProductCard from '@/components/ProductCard';

interface PumpSolution {
    id: number;
    model_name: string;
    flow_rate: string;
    max_head: string;
}

export default function Index() {
    const [pumpSolutions, setPumpSolutions] = useState<PumpSolution[]>([]);

    useEffect(() => {
        fetch('/api/pumps')
            .then(response => response.json())
            .then(data => setPumpSolutions(data));
    }, []);

    return (
        <>
            <Head title="Pump Solutions" />
            <div className="container mx-auto py-12">
                <h1 className="text-4xl font-bold text-center mb-12">Our Pump Solutions</h1>

                {/* Solutions Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {pumpSolutions.map((solution) => (
                        <ProductCard
                            key={solution.id}
                            modelName={solution.model_name}
                            flowRate={solution.flow_rate}
                            maxHead={solution.max_head}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}