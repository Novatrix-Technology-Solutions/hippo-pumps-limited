import type React from "react";
import Header from "@/components/header"; // Adjusted path alias to Components
import Footer from "@/components/footer"; // Adjusted path alias to Components
import { Head } from '@inertiajs/react'; // Import Head for title/meta if needed per page

// Removed Metadata export and next/font/google import

// Renamed function to SiteLayout
export default function SiteLayout({
  children,
  title // Optional: Pass title from page component
}: {
  children: React.ReactNode;
  title?: string; // Make title optional
}) {
  return (
    // Removed <html> and <body> tags
    // Removed inter.className
    <div className="flex flex-col min-h-screen">
      {/* Add Head component here if you want a default title for all pages using this layout */}
      {/* Or manage Head within individual page components */}
      {title && <Head title={title} />} 
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
    // Removed closing </body> and </html> tags
    // Removed duplicate globals.css import
  );
}