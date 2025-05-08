import { Head } from '@inertiajs/react';
import { useState } from 'react';

interface Props {
  pumpSolutions: {
    data: any[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
  filters: {
    category?: string;
    min_price?: number;
    max_price?: number;
    min_motor?: number;
    max_motor?: number;
    min_flow?: number;
    max_flow?: number;
    min_head?: number;
    max_head?: number;
  };
  categories: string[];
}

export default function Index({ pumpSolutions, filters, categories }: Props) {
  return (
    <>
      <Head title="Pump Solutions" />
      <div className="container mx-auto py-12">
        <h1 className="text-4xl font-bold text-center mb-12">Our Pump Solutions</h1>
        <div style={{ padding: '20px', backgroundColor: 'lightyellow', border: '2px solid red', margin: '20px' }}>
          <h2>Simplified Pump Solutions Page</h2>
          <p>This is a simplified version of the page.</p>
          <p>Found {pumpSolutions.total} pump solutions.</p>
          <p>Categories: {categories.join(', ')}</p>
        </div>
      </div>
    </>
  );
} 