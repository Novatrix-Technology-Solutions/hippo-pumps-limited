import { Head } from '@inertiajs/react';

export default function TestPage() {
  return (
    <>
      <Head title="Test Page" />
      <div style={{ padding: '20px', backgroundColor: 'lightblue', border: '2px solid blue', margin: '20px' }}>
        <h1>Test Page</h1>
        <p>This is a simple test page to verify routing and rendering.</p>
      </div>
    </>
  );
} 