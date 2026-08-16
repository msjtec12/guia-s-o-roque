'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Compass, Menu, X, Sparkles, MapPin, Calendar, Building2, ChevronDown, Trees, Wine } from 'lucide-react';
import { CitySelector } from '@/components/layout/CitySelector';
import { CITIES } from '@/lib/mock-data/cities';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDestinationsMobileOpen, setIsDestinationsMobileOpen] = useState(false);
  const pathname = usePathname();

  // Detect current active city from path
  const currentCity = CITIES.find((c) => pathname.startsWith(`/${c.slug}`)) || null;
  const cityPrefix = currentCity ? `/${currentCity.slug}` : '';

  const navLinks = [
    { 
      name: 'Explorar', 
      href: currentCity ? `${cityPrefix}/explorar` : '/explorar', 
      icon: Compass 
    },
    { 
      name: 'Experiências', 
      href: currentCity ? `${cityPrefix}/experiencias` : '/experiencias', 
      icon: Sparkles 
    },
    { 
      name: 'Roteiros', 
      href: currentCity ? `${cityPrefix}/roteiros` : '/roteiros', 
      icon: MapPin 
    },
    { 
      name: 'Eventos', 
      href: currentCity ? `${cityPrefix}/eventos` : '/eventos', 
      icon: Calendar 
    },
    { 
      name: 'Para Empresas', 
      href: '/para-empresas', 
      icon: Building2 
    },
  ];

  const isActive = (path: string) => {
    if (path.includes('/explorar') && pathname.includes('/explorar')) return true;
    if (path.includes('/experiencias') && pathname.includes('/experiencias')) return true;
    if (path.includes('/roteiros') && pathname.includes('/roteiros')) return true;
    if (path.includes('/eventos') && pathname.includes('/eventos')) return true;
    return pathname === path;
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#183A32]/95 backdrop-blur-md border-b border-[#245247] text-[#FCFAF5] transition-all shadow-lg shadow-[#183A32]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* LOGO PLATAFORMA DESCUBRA */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-3 group" aria-label="Página Inicial - Descubra">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D49A3A] to-[#183A32] flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform border border-[#D49A3A]/40">
              <Compass className="w-5 h-5 text-white" aria-hidden="true" />
            </div>
            <div>
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#FCFAF5] group-hover:text-[#D49A3A] transition-colors">
                Descubra {currentCity ? <span className="text-[#D49A3A] font-normal">{currentCity.name}</span> : <span className="text-[#D49A3A]">.</span>}
              </span>
              <span className="hidden sm:block text-[10px] uppercase tracking-widest text-[#82967A] font-semibold">
                {currentCity ? `Guia Turístico • ${currentCity.state}` : 'Plataforma de Turismo Digital'}
              </span>
            </div>
          </Link>
        </div>

        {/* DESKTOP NAV LINKS */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.href);
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                  active
                    ? 'bg-[#245247] text-[#D49A3A] font-semibold shadow-xs'
                    : 'text-[#FCFAF5] hover:text-[#D49A3A] hover:bg-[#245247]/50'
                }`}
              >
                <Icon className={`w-4 h-4 ${active ? 'text-[#D49A3A]' : 'text-[#82967A]'}`} aria-hidden="true" />
                <span>{link.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* CITY SELECTOR & ACTION BUTTON */}
        <div className="hidden md:flex items-center gap-3">
          <CitySelector variant="navbar" />

          {currentCity ? (
            <Link
              href={`${cityPrefix}/explorar`}
              aria-label={`Explorar ${currentCity.name}`}
              className="inline-flex items-center gap-2 bg-[#722F3E] hover:bg-[#5e2633] text-[#FCFAF5] font-semibold text-xs px-4 py-2.5 rounded-xl shadow-md transition-all transform active:scale-95 border border-[#89283f]/40"
            >
              <Compass className="w-3.5 h-3.5 text-[#D49A3A]" aria-hidden="true" />
              <span>Explorar {currentCity.name}</span>
            </Link>
          ) : (
            <Link
              href="#destinos"
              aria-label="Escolher destino"
              className="inline-flex items-center gap-2 bg-[#D49A3A] hover:bg-[#c28c32] text-[#26332F] font-bold text-xs px-4 py-2.5 rounded-xl shadow-md transition-all transform active:scale-95"
            >
              <MapPin className="w-3.5 h-3.5 text-[#26332F]" aria-hidden="true" />
              <span>Escolher Destino</span>
            </Link>
          )}
        </div>

        {/* MOBILE HAMBURGER BUTTON */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-lg text-[#FCFAF5] hover:text-[#D49A3A] hover:bg-[#245247] focus:outline-none cursor-pointer"
          aria-label="Abrir menu de navegação"
        >
          {isOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
        </button>
      </div>

      {/* MOBILE DRAWER MENU */}
      {isOpen && (
        <div className="md:hidden bg-[#183A32] border-b border-[#245247] px-4 pt-2 pb-6 space-y-3 animate-in slide-in-from-top duration-200">
          
          {/* MOBILE DESTINATIONS ACCORDION */}
          <div className="bg-[#245247]/60 rounded-2xl p-3 space-y-2 border border-[#82967A]/30">
            <button
              onClick={() => setIsDestinationsMobileOpen(!isDestinationsMobileOpen)}
              className="w-full flex items-center justify-between text-xs font-bold text-[#FCFAF5]"
            >
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#D49A3A]" aria-hidden="true" />
                <span>Destino: {currentCity ? currentCity.name : 'Escolha sua cidade'}</span>
              </span>
              <ChevronDown className={`w-4 h-4 transition-transform ${isDestinationsMobileOpen ? 'rotate-180' : ''}`} />
            </button>

            {isDestinationsMobileOpen && (
              <div className="pt-2 border-t border-[#82967A]/30 space-y-1">
                {CITIES.map((c) => {
                  const isSR = c.slug === 'sao-roque';
                  const Icon = isSR ? Wine : Trees;
                  return (
                    <Link
                      key={c.id}
                      href={`/${c.slug}`}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center gap-2.5 p-2 rounded-xl text-xs font-semibold ${
                        currentCity?.slug === c.slug
                          ? 'bg-[#183A32] text-[#D49A3A]'
                          : 'text-[#F4EBDD] hover:bg-[#245247]'
                      }`}
                    >
                      <Icon className="w-4 h-4 text-[#D49A3A]" />
                      <span>{c.name} - {c.state}</span>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {/* REGULAR NAV LINKS */}
          <div className="space-y-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    active
                      ? 'bg-[#245247] text-[#D49A3A] font-semibold'
                      : 'text-[#FCFAF5] hover:bg-[#245247]/60 hover:text-[#D49A3A]'
                  }`}
                >
                  <Icon className="w-4 h-4 text-[#82967A]" aria-hidden="true" />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </div>

          {/* MOBILE CTAs */}
          <div className="pt-3 border-t border-[#245247] flex flex-col gap-2">
            <Link
              href={currentCity ? `${cityPrefix}/explorar` : '/sao-roque'}
              onClick={() => setIsOpen(false)}
              aria-label="Explorar atrações"
              className="w-full text-center bg-[#722F3E] hover:bg-[#5e2633] text-[#FCFAF5] font-semibold py-3 rounded-xl shadow-md text-xs"
            >
              {currentCity ? `Explorar ${currentCity.name}` : 'Explorar Destinos'}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
