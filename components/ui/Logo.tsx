import React from 'react';
import Link from 'next/link';
import { Compass } from 'lucide-react';

interface LogoProps {
  variant?: 'light' | 'dark' | 'icon';
  cityName?: string;
  className?: string;
  href?: string;
}

export function Logo({
  variant = 'light',
  cityName,
  className = '',
  href = '/',
}: LogoProps) {
  const isLight = variant === 'light';
  const isIcon = variant === 'icon';

  const iconElement = (
    <div
      className={`relative flex items-center justify-center rounded-xl p-2 transition-transform duration-300 group-hover:scale-105 ${
        isLight
          ? 'bg-gradient-to-br from-[#F19F14] to-[#D86E04] text-[#071510] shadow-md shadow-[#F19F14]/20'
          : 'bg-[#071510] text-[#F19F14] shadow-sm'
      }`}
    >
      <Compass className="w-5 h-5 transition-transform duration-500 group-hover:rotate-45" aria-hidden="true" />
      <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#107492] ring-2 ring-[#071510]" />
    </div>
  );

  if (isIcon) {
    return href ? (
      <Link href={href} className={`inline-block group ${className}`} aria-label="Descubra Cidades">
        {iconElement}
      </Link>
    ) : (
      <div className={`inline-block group ${className}`}>{iconElement}</div>
    );
  }

  const content = (
    <div className={`flex items-center gap-2.5 group cursor-pointer ${className}`}>
      {iconElement}

      <div className="flex flex-col text-left leading-none">
        <div className="flex items-baseline gap-1">
          <span
            className={`font-serif text-lg sm:text-xl font-extrabold tracking-tight transition-colors ${
              isLight ? 'text-[#FFFFFF] group-hover:text-[#F19F14]' : 'text-[#071510] group-hover:text-[#107492]'
            }`}
          >
            Descubra
          </span>
          <span
            className={`font-sans text-xs sm:text-sm font-bold tracking-wider uppercase ${
              cityName ? 'text-[#F19F14]' : isLight ? 'text-[#F19F14]' : 'text-[#107492]'
            }`}
          >
            {cityName || 'Cidades'}
          </span>
        </div>

        <span
          className={`text-[9px] font-semibold tracking-widest uppercase transition-opacity ${
            isLight ? 'text-[#E7E5DF]/80 group-hover:opacity-100' : 'text-[#26332F]/70'
          }`}
        >
          {cityName ? 'Guia Oficial • Turismo' : 'Lugares & Experiências'}
        </span>
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="inline-block" aria-label="Ir para a página inicial">
        {content}
      </Link>
    );
  }

  return content;
}
