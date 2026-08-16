'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MapPin, ChevronDown, Check, Compass, Wine, Trees } from 'lucide-react';
import { CITIES } from '@/lib/mock-data/cities';

interface CitySelectorProps {
  variant?: 'navbar' | 'hero' | 'minimal';
  className?: string;
}

export function CitySelector({ variant = 'navbar', className = '' }: CitySelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Detect current city from pathname
  const currentCity = CITIES.find((c) => pathname.startsWith(`/${c.slug}`)) || null;

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Compute destination URL preserving internal subroutes if available
  const getDestinationUrl = (citySlug: string) => {
    const matchedCity = CITIES.find((c) => pathname.startsWith(`/${c.slug}/`));
    if (matchedCity) {
      const parts = pathname.split('/');
      parts[1] = citySlug;
      return parts.join('/');
    }
    return `/${citySlug}`;
  };

  return (
    <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
      {/* TRIGGER BUTTON */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
          variant === 'navbar'
            ? 'bg-[#245247] hover:bg-[#2d6255] text-[#FCFAF5] border border-[#82967A]/30 shadow-xs'
            : variant === 'hero'
            ? 'bg-white/90 hover:bg-white text-[#183A32] shadow-md border border-[#e6dfd4]'
            : 'text-[#26332F] hover:text-[#183A32]'
        }`}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="Selecionar destino turístico"
      >
        <MapPin className="w-3.5 h-3.5 text-[#D49A3A] shrink-0" aria-hidden="true" />
        <span className="truncate max-w-[130px] sm:max-w-none">
          {currentCity ? currentCity.name : 'Escolher Destino'}
        </span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-[#82967A] transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-[#D49A3A]' : ''
          }`}
          aria-hidden="true"
        />
      </button>

      {/* DROPDOWN MENU */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 origin-top-right rounded-2xl bg-[#FCFAF5] border border-[#e6dfd4] shadow-2xl z-50 p-2 space-y-1 animate-in fade-in-0 zoom-in-95 duration-150">
          <div className="px-3 py-2 border-b border-[#e6dfd4]">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#82967A] block">
              Destinos Disponíveis
            </span>
            <p className="text-xs text-[#26332F] font-serif font-bold">
              Para onde você quer ir?
            </p>
          </div>

          <div className="py-1 space-y-1">
            {CITIES.map((city) => {
              const isSelected = currentCity?.slug === city.slug;
              const Icon = city.slug === 'sao-roque' ? Wine : city.slug === 'socorro' ? Compass : Trees;

              return (
                <Link
                  key={city.id}
                  href={getDestinationUrl(city.slug)}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center justify-between p-2.5 rounded-xl text-xs font-semibold transition-all group ${
                    isSelected
                      ? 'bg-[#183A32] text-[#FCFAF5] shadow-xs'
                      : 'text-[#26332F] hover:bg-[#F4EBDD] hover:text-[#183A32]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                        isSelected
                          ? 'bg-[#D49A3A] text-[#26332F]'
                          : 'bg-[#F4EBDD] text-[#183A32] group-hover:bg-[#183A32] group-hover:text-[#D49A3A]'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" aria-hidden="true" />
                    </div>
                    <div className="text-left">
                      <span className="block font-bold">{city.name}</span>
                      <span
                        className={`text-[10px] block ${
                          isSelected ? 'text-[#82967A]' : 'text-[#52615B]'
                        }`}
                      >
                        {city.state} • {city.tags?.[0] || 'Turismo'}
                      </span>
                    </div>
                  </div>

                  {isSelected && <Check className="w-4 h-4 text-[#D49A3A] shrink-0" aria-hidden="true" />}
                </Link>
              );
            })}
          </div>

          <div className="pt-2 border-t border-[#e6dfd4] px-1">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-1.5 w-full py-2 text-center text-[11px] font-bold text-[#183A32] hover:text-[#722F3E] transition-colors"
            >
              <Compass className="w-3.5 h-3.5 text-[#D49A3A]" aria-hidden="true" />
              <span>Ver todos os destinos na Home</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
