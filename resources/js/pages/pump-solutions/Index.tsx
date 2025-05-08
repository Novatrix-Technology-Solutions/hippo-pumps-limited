import { Head } from '@inertiajs/react';

interface Props {
  pumpSolutions: {
    data: any[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
  filters: Record<string, any>;
  categories: string[];
}

export default function Index({ pumpSolutions, filters, categories }: Props) {
  return (
    <>
      <Head title="Pump Solutions" />
      <div className="container mx-auto py-12">
        <h1 className="text-4xl font-bold text-center mb-12">Our Pump Solutions</h1>
        
        <div className="p-8 bg-white shadow-md rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Available Solutions</h2>
          <p className="mb-4">Found {pumpSolutions.total} pump solutions</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {pumpSolutions.data.map((solution: any) => (
              <div key={solution.id} className="bg-gray-50 p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-2">{solution.title}</h3>
                <p className="text-gray-600 mb-3">{solution.description?.substring(0, 100)}...</p>
                <div className="text-sm text-gray-500">Category: {solution.category}</div>
              </div>
            ))}
          </div>
          
          {/* Simple pagination controls */}
          {pumpSolutions.last_page > 1 && (
            <div className="flex justify-center mt-8 gap-2">
              {Array.from({ length: pumpSolutions.last_page }, (_, i) => i + 1).map((page) => (
                <button 
                  key={page}
                  className={`px-3 py-1 rounded ${
                    page === pumpSolutions.current_page
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
} 