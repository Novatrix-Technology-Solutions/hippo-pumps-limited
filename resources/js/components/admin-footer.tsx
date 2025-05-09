export default function AdminFooter() {
  return (
    <footer className="border-t bg-white py-4">
      <div className="container mx-auto px-4">
        <div className="text-center text-sm text-gray-600">
          © {new Date().getFullYear()} Hippo Pumps Limited. All rights reserved.
        </div>
      </div>
    </footer>
  );
} 