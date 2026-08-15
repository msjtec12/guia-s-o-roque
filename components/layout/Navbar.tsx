'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Wine, Menu, X, Compass, MapPin, Sparkles, Calendar, Building2 } from 'lucide-react';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: 'Explorar', href: '/explorar', icon: Compass },
    { name: 'Experiências', href: '/experiencias', icon: Sparkles },
    { name: 'Roteiros', href: '/roteiros', icon: MapPin },
    { name: 'Eventos', href: '/eventos', icon: Calendar },
    { name: 'Para Empresas', href: '/para-empresas', icon: Building2 },
  ];

  const isActive = (path: string) => {
    if (path === '/explorar' && pathname.startsWith('/explorar')) return true;
    return pathname === path;
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#183A32]/95 backdrop-blur-md border-b border-[#245247] text-[#FCFAF5] transition-all shadow-lg shadow-[#183A32]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-3 group" aria-label="Página Inicial - Descubra São Roque">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D49A3A] to-[#183A32] flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform border border-[#D49A3A]/40">
            <Wine className="w-5 h-5 text-white" aria-hidden="true" />
          </div>
          <div>
            <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#FCFAF5] group-hover:text-[#D49A3A] transition-colors">
              Descubra <span className="text-[#D49A3A] font-normal">São Roque</span>
            </span>
            <span className="hidden sm:block text-[10px] uppercase tracking-widest text-[#82967A] font-semibold">
              Guia Turístico & Gastronômico
            </span>
          </div>
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                  active
                    ? 'bg-[#245247] text-[#D49A3A] font-semibold shadow-sm'
                    : 'text-[#FCFAF5] hover:text-[#D49A3A] hover:bg-[#245247]/50'
                }`}
              >
                <Icon className={`w-4 h-4 ${active ? 'text-[#D49A3A]' : 'text-[#82967A]'}`} aria-hidden="true" />
                <span>{link.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* ACTIONS (ONLY PUBLIC EXPLORER ACTION - ADMIN LINK HIDDEN) */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/explorar"
            aria-label="Explorar atrações de São Roque"
            className="inline-flex items-center gap-2 bg-[#722F3E] hover:bg-[#5e2633] text-[#FCFAF5] font-semibold text-sm px-4 py-2.5 rounded-xl shadow-md transition-all transform active:scale-95 border border-[#89283f]/40"
          >
            <Compass className="w-4 h-4 text-[#D49A3A]" aria-hidden="true" />
            <span>Explorar São Roque</span>
          </Link>
        </div>

        {/* MOBILE HAMBURGER BUTTON */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-lg text-[#FCFAF5] hover:text-[#D49A3A] hover:bg-[#245247] focus:outline-none"
          aria-label="Abrir menu de navegação"
        >
          {isOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
        </button>
      </div>

      {/* MOBILE DRAWER MENU */}
      {isOpen && (
        <div className="md:hidden bg-[#183A32] border-b border-[#245247] px-4 pt-2 pb-6 space-y-2 animate-in slide-in-from-top duration-200">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                  active
                    ? 'bg-[#245247] text-[#D49A3A] font-semibold'
                    : 'text-[#FCFAF5] hover:bg-[#245247]/60 hover:text-[#D49A3A]'
                }`}
              >
                <Icon className="w-5 h-5 text-[#82967A]" aria-hidden="true" />
                <span>{link.name}</span>
              </Link>
            );
          })}
          
          <div className="pt-4 border-t border-[#245247] flex flex-col gap-3">
            <Link
              href="/explorar"
              onClick={() => setIsOpen(false)}
              aria-label="Explorar São Roque"
              className="w-full text-center bg-[#722F3E] hover:bg-[#5e2633] text-[#FCFAF5] font-semibold py-3 rounded-xl shadow-md text-sm"
            >
              Explorar São Roque
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
