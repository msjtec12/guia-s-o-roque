'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface LogoProps {
  variant?: 'light' | 'dark' | 'icon';
  cityName?: string;
  className?: string;
  href?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export function Logo({
  variant = 'light',
  cityName,
  className = '',
  href = '/',
  size = 'md',
  showText = true,
}: LogoProps) {
  const isLight = variant === 'light';
  const isIcon = variant === 'icon';

  // Use logo-light.png on dark backgrounds for bright white text & vibrant gold mark
  // Use logo.png on light backgrounds for dark text & vibrant gold mark
  const logoSrc = isLight ? '/logo-light.png' : '/logo.png';

  const imageSizes = {
    sm: 'h-8 sm:h-9 w-auto',
    md: 'h-11 sm:h-12 w-auto',
    lg: 'h-14 sm:h-16 w-auto',
  };

  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-11 h-11',
    lg: 'w-16 h-16',
  };

  if (isIcon) {
    const iconContent = (
      <div className={`relative flex items-center justify-center overflow-hidden rounded-xl transition-transform duration-300 group-hover:scale-105 ${iconSizes[size]} ${className}`}>
        <Image
          src="/icon.png"
          alt="Descubra Cidades"
          width={96}
          height={96}
          className="object-contain w-full h-full drop-shadow-md"
          priority
        />
      </div>
    );

    return href ? (
      <Link href={href} className="inline-block group" aria-label="Descubra Cidades">
        {iconContent}
      </Link>
    ) : (
      <div className="inline-block group">{iconContent}</div>
    );
  }

  const logoContent = (
    <div className={`inline-flex items-center gap-3 group cursor-pointer ${className}`}>
      <div className="relative flex items-center shrink-0">
        <Image
          src={logoSrc}
          alt="Descubra Cidades"
          width={220}
          height={140}
          className={`${imageSizes[size]} object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]`}
          priority
        />
      </div>

      {showText && (
        <div className="flex flex-col text-left leading-none select-none">
          <div className="flex items-baseline gap-1.5">
            <span
              className={`font-serif text-xl sm:text-2xl font-extrabold tracking-tight transition-colors ${
                isLight ? 'text-[#FFFFFF] group-hover:text-[#F19F14]' : 'text-[#071510] group-hover:text-[#107492]'
              }`}
            >
              Descubra
            </span>
            <span
              className={`font-sans text-sm sm:text-base font-bold tracking-wider uppercase ${
                cityName ? 'text-[#F19F14]' : isLight ? 'text-[#F19F14]' : 'text-[#107492]'
              }`}
            >
              {cityName || 'Cidades'}
            </span>
          </div>

          <span
            className={`text-[10px] font-semibold tracking-wider uppercase mt-0.5 transition-opacity ${
              isLight ? 'text-[#E7E5DF]/90' : 'text-[#26332F]/70'
            }`}
          >
            {cityName ? 'Guia Oficial de Turismo' : 'Lugares & Experiências'}
          </span>
        </div>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="inline-block" aria-label={cityName ? `Descubra ${cityName}` : 'Descubra Cidades'}>
        {logoContent}
      </Link>
    );
  }

  return logoContent;
}
