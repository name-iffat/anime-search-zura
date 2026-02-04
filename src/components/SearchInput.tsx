import type { ChangeEvent } from 'react';

interface SearchInputProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

export default function SearchInput({
    value,
    onChange,
    placeholder = 'Search anime...',
}: SearchInputProps) {
    return (
        <div className="relative max-w-2xl mx-auto mb-8">
            <input
                type="text"
                value={value}
                onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full px-5 py-4 pl-12 text-lg bg-white/90 border-2 border-gray-200 rounded-full shadow-sm hover:shadow-md focus:outline-none focus:border-electric-blue focus:ring-4 focus:ring-electric-blue/20 focus:shadow-glow-blue transition-smooth placeholder:text-gray-400 text-gray-800"
                aria-label="Search anime titles"
            />
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 peer-focus:text-electric-blue transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </div>
            {value && (
                <button
                    onClick={() => onChange('')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-anime-red hover:bg-gray-100 rounded-full transition-colors"
                    aria-label="Clear search"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            )}
        </div>
    );
}