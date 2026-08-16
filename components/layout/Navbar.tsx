'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Compass, Menu, X, Sparkles, MapPin, Calendar, Building2, ChevronDown, Trees, Wine } from 'lucide-react';
import { CitySelector } from '@/components/layout/CitySelector';
import { Logo } from '@/components/ui/Logo';
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
    <header className="sticky top-0 z-50 w-full bg-[#071510]/95 backdrop-blur-md border-b border-[#1B4931]/40 text-[#FFFFFF] transition-all shadow-lg shadow-[#071510]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* LOGO PLATAFORMA DESCUBRA CIDADES */}
        <Logo variant="light" cityName={currentCity?.name} />

        {/* DESKTOP NAV LINKS */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.href);
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium transition-all ${
                  active
                    ? 'bg-[#1B4931] text-[#F19F14] font-semibold shadow-xs'
                    : 'text-[#FFFFFF] hover:text-[#F19F14] hover:bg-[#1B4931]/40'
                }`}
              >
                <Icon className={`w-4 h-4 ${active ? 'text-[#F19F14]' : 'text-[#E7E5DF]/70'}`} aria-hidden="true" />
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
              className="inline-flex items-center gap-2 bg-[#F19F14] hover:bg-[#D86E04] text-[#071510] font-bold text-xs px-4 py-2.5 rounded-xl shadow-md transition-all transform active:scale-95 hover:text-[#FFFFFF]"
            >
              <Compass className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Explorar {currentCity.name}</span>
            </Link>
          ) : (
            <Link
              href="/#destinos"
              aria-label="Escolher destino"
              className="inline-flex items-center gap-2 bg-[#F19F14] hover:bg-[#D86E04] text-[#071510] font-bold text-xs px-4 py-2.5 rounded-xl shadow-md transition-all transform active:scale-95 hover:text-[#FFFFFF]"
            >
              <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Escolher Destino</span>
            </Link>
          )}
        </div>

        {/* MOBILE HAMBURGER BUTTON */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-xl text-[#FFFFFF] hover:text-[#F19F14] hover:bg-[#1B4931] focus:outline-none cursor-pointer"
          aria-label="Abrir menu de navegação"
        >
          {isOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
        </button>
      </div>

      {/* MOBILE DRAWER MENU */}
      {isOpen && (
        <div className="md:hidden bg-[#071510] border-b border-[#1B4931] px-4 pt-2 pb-6 space-y-3 animate-in slide-in-from-top duration-200">
          
          {/* MOBILE DESTINATIONS ACCORDION */}
          <div className="bg-[#1B4931]/60 rounded-2xl p-3 space-y-2 border border-[#1B4931]">
            <button
              onClick={() => setIsDestinationsMobileOpen(!isDestinationsMobileOpen)}
              className="w-full flex items-center justify-between text-xs font-bold text-[#FFFFFF]"
            >
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#F19F14]" aria-hidden="true" />
                <span>Destino: {currentCity ? currentCity.name : 'Escolha sua cidade'}</span>
              </span>
              <ChevronDown className={`w-4 h-4 transition-transform ${isDestinationsMobileOpen ? 'rotate-180 text-[#F19F14]' : ''}`} />
            </button>

            {isDestinationsMobileOpen && (
              <div className="pt-2 border-t border-[#1B4931] space-y-1">
                {CITIES.map((c) => {
                  const isSR = c.slug === 'sao-roque';
                  const isSoc = c.slug === 'socorro';
                  const Icon = isSR ? Wine : isSoc ? Compass : Trees;
                  return (
                    <Link
                      key={c.id}
                      href={`/${c.slug}`}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center gap-2.5 p-2 rounded-xl text-xs font-semibold ${
                        currentCity?.slug === c.slug
                          ? 'bg-[#071510] text-[#F19F14]'
                          : 'text-[#F6F0D4] hover:bg-[#1B4931]'
                      }`}
                    >
                      <Icon className="w-4 h-4 text-[#F19F14]" />
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
                      ? 'bg-[#1B4931] text-[#F19F14] font-semibold'
                      : 'text-[#FFFFFF] hover:bg-[#1B4931]/60 hover:text-[#F19F14]'
                  }`}
                >
                  <Icon className="w-4 h-4 text-[#E7E5DF]/70" aria-hidden="true" />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </div>

          {/* MOBILE CTAs */}
          <div className="pt-3 border-t border-[#1B4931] flex flex-col gap-2">
            <Link
              href={currentCity ? `${cityPrefix}/explorar` : '/#destinos'}
              onClick={() => setIsOpen(false)}
              aria-label="Explorar atrações"
              className="w-full text-center bg-[#F19F14] hover:bg-[#D86E04] text-[#071510] font-bold py-3 rounded-xl shadow-md text-xs transition-colors"
            >
              {currentCity ? `Explorar ${currentCity.name}` : 'Explorar Destinos'}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
