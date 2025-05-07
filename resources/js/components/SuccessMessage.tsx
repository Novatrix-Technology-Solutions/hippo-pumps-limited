import React from 'react';

interface SuccessMessageProps {
    message: string;
    className?: string;
}

export default function SuccessMessage({ message, className = '' }: SuccessMessageProps) {
    return (
        <div className={`bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded relative ${className}`} role="alert">
            <span className="block sm:inline">{message}</span>
        </div>
    );
} 