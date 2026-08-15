'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Sparkles, X } from 'lucide-react';

interface SearchBarProps {
  initialQuery?: string;
  placeholder?: string;
  className?: string;
}

export function SearchBar({
  initialQuery = '',
  placeholder = 'O que você quer descobrir? Ex.: vinícolas, restaurantes, passeios...',
  className = '',
}: SearchBarProps) {
  const [query, setQuery] = useState(initialQuery);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/explorar?q=${encodeURIComponent(query.trim())}`);
    } else {
      router.push('/explorar');
    }
  };

  return (
    <form onSubmit={handleSearch} className={`relative w-full ${className}`}>
      <div className="relative flex items-center shadow-xl rounded-2xl overflow-hidden p-1.5 bg-[#FCFAF5] border border-[#e6dfd4] focus-within:ring-3 focus-within:ring-[#D49A3A]/40 focus-within:border-[#D49A3A] transition-all">
        <div className="pl-4 pr-2">
          <Search className="w-5 h-5 text-[#183A32]" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full py-3.5 pr-10 text-[#26332F] placeholder-[#82967A] bg-transparent text-sm sm:text-base focus:outline-none font-medium"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery('')}
            className="p-1.5 text-[#82967A] hover:text-[#26332F] mr-2"
          >
            <X className="w-4 h-4" />
          </button>
        )}
        <button
          type="submit"
          className="inline-flex items-center gap-2 bg-[#183A32] hover:bg-[#245247] text-[#FCFAF5] font-semibold text-sm px-6 py-3.5 rounded-xl shadow-md transition-all shrink-0 active:scale-95"
        >
          <Sparkles className="w-4 h-4 text-[#D49A3A]" />
          <span className="hidden sm:inline">Buscar</span>
        </button>
      </div>
    </form>
  );
}
