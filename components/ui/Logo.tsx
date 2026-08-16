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
}

export function Logo({
  variant = 'light',
  cityName,
  className = '',
  href = '/',
  size = 'md',
}: LogoProps) {
  const isLight = variant === 'light';
  const isIcon = variant === 'icon';

  const sizeClasses = {
    sm: 'h-7 w-auto',
    md: 'h-9 sm:h-10 w-auto',
    lg: 'h-12 sm:h-14 w-auto',
  };

  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
  };

  if (isIcon) {
    const iconContent = (
      <div className={`relative flex items-center justify-center overflow-hidden rounded-xl bg-transparent transition-transform duration-300 group-hover:scale-105 ${iconSizes[size]} ${className}`}>
        <Image
          src="/logo.png"
          alt="Descubra Cidades"
          width={48}
          height={48}
          className="object-contain w-full h-full"
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
      <div className="relative flex items-center">
        <Image
          src="/logo.png"
          alt="Descubra Cidades"
          width={180}
          height={50}
          className={`${sizeClasses[size]} object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-sm`}
          priority
        />
      </div>

      {cityName && (
        <div className="flex flex-col border-l border-[#E7E5DF]/30 pl-2.5 leading-tight">
          <span className="font-sans text-xs sm:text-sm font-extrabold tracking-wider uppercase text-[#F19F14]">
            {cityName}
          </span>
          <span className={`text-[9px] font-semibold tracking-widest uppercase ${isLight ? 'text-[#E7E5DF]/80' : 'text-[#26332F]/70'}`}>
            Guia Oficial
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
