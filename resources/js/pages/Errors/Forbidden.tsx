import { Head } from '@inertiajs/react';

export default function Forbidden() {
  return (
    <>
      <Head title="Forbidden" />
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="p-8 bg-white shadow-lg rounded-lg max-w-md w-full">
          <h1 className="text-3xl font-bold text-amber-600">403 - Forbidden</h1>
          <p className="mt-4 text-gray-600">
            You don't have permission to access this resource.
          </p>
          <div className="mt-6">
            <a 
              href="/"
              className="inline-block bg-amber-600 text-white px-4 py-2 rounded hover:bg-amber-700"
            >
              Return to Homepage
            </a>
          </div>
        </div>
      </div>
    </>
  );
} 