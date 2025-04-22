import React, { PropsWithChildren } from 'react';
import { Link } from '@inertiajs/react';
import { useUrl } from '@/hooks/use-url';

export default function Layout({ children }: PropsWithChildren) {
  const { getAbsoluteUrl } = useUrl();
  
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Company Name */}
            <div className="text-2xl font-bold text-gray-800">
              <Link href={getAbsoluteUrl('/')} className="hover:text-gray-900">Hippo</Link>
            </div>

            {/* Navigation */}
            <nav className="space-x-4 text-gray-600">
              <Link href={getAbsoluteUrl('company')} className="hover:text-gray-900">The company</Link>
              <span className="text-gray-300">|</span>
              <Link href={getAbsoluteUrl('products')} className="hover:text-gray-900">Products</Link>
              <span className="text-gray-300">|</span>
              <Link href={getAbsoluteUrl('pump-solutions')} className="hover:text-gray-900">Pump solutions</Link>
              <span className="text-gray-300">|</span>
              <Link href={getAbsoluteUrl('news')} className="hover:text-gray-900">News</Link>
              <span className="text-gray-300">|</span>
              <Link href={getAbsoluteUrl('find-us')} className="hover:text-gray-900">Find Us</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Page Content */}
      <main>{children}</main>

      {/* Footer (Optional - can be added later) */}
      {/* <footer className="bg-white mt-8 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-500">
          © {new Date().getFullYear()} Hippo Pumps Limited. All rights reserved.
        </div>
      </footer> */}
    </div>
  );
}