import { Head } from '@inertiajs/react';

export default function NotFound() {
  return (
    <>
      <Head title="Page Not Found" />
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="p-8 bg-white shadow-lg rounded-lg max-w-md w-full">
          <h1 className="text-3xl font-bold text-blue-600">404 - Page Not Found</h1>
          <p className="mt-4 text-gray-600">
            The page you are looking for doesn't exist or has been moved.
          </p>
          <div className="mt-6">
            <a 
              href="/"
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Return to Homepage
            </a>
          </div>
        </div>
      </div>
    </>
  );
} 