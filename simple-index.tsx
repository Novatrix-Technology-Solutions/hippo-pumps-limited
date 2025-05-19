import { Head } from '@inertiajs/react';
import { useState } from 'react';

interface Props {
  products: {
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

export default function Index({ products, filters, categories }: Props) {
  return (
    <>
      <Head title="Products" />
      <div className="container mx-auto py-12">
        <h1 className="text-4xl font-bold text-center mb-12">Our Products</h1>
        <div style={{ padding: '20px', backgroundColor: 'lightyellow', border: '2px solid red', margin: '20px' }}>
          <h2>Simplified Products Page</h2>
          <p>This is a simplified version of the page.</p>
          <p>Found {products.total} product solutions.</p>
          <p>Categories: {categories.join(', ')}</p>
        </div>
      </div>
    </>
  );
} 