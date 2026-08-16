import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, MapPin, Wine, Trees, Compass } from 'lucide-react';
import { City } from '@/types';

interface CityCardProps {
  city: City;
  priority?: boolean;
}

export function CityCard({ city, priority = false }: CityCardProps) {
  const isSaoRoque = city.slug === 'sao-roque';
  const isSocorro = city.slug === 'socorro';
  const Icon = isSaoRoque ? Wine : isSocorro ? Compass : Trees;
  const destinationHref = `/${city.slug}`;

  return (
    <div className="group relative bg-white rounded-3xl overflow-hidden border border-[#E7E5DF] shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between card-hover">
      {/* IMAGE HERO CONTAINER */}
      <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-[#071510]">
        <Image
          src={city.hero_image || city.image_url || '/images/hero-sao-roque.webp'}
          alt={`Destino turístico de ${city.name} - ${city.state}`}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
        />

        {/* ELEGANT GRADIENT OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#071510] via-[#071510]/40 to-transparent pointer-events-none" />

        {/* BADGE LOCATION OVERLAY */}
        <div className="absolute top-4 left-4 z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#071510]/85 text-[#FFFFFF] backdrop-blur-md text-xs font-semibold border border-[#1B4931]/50 shadow-sm">
            <MapPin className="w-3.5 h-3.5 text-[#F19F14]" aria-hidden="true" />
            <span>{city.state} • Brasil</span>
          </span>
        </div>

        {/* CITY TITLE ON IMAGE */}
        <div className="absolute bottom-4 left-4 right-4 z-10 text-[#FFFFFF] space-y-1">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#F19F14] text-[#071510] flex items-center justify-center shadow-xs">
              <Icon className="w-4 h-4" aria-hidden="true" />
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#FFFFFF]">
              {city.name}
            </h3>
          </div>
        </div>
      </div>

      {/* BODY CONTENT */}
      <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
        <div className="space-y-4">
          <p className="text-sm text-[#26332F]/80 leading-relaxed line-clamp-3">
            {city.description}
          </p>

          {/* TAGS */}
          {city.tags && city.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-1">
              {city.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full bg-[#F6F0D4] text-[#1B4931] text-xs font-semibold border border-[#E7E5DF]"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* CTA BUTTON */}
        <div className="pt-4 border-t border-[#E7E5DF]">
          <Link
            href={destinationHref}
            aria-label={`Descobrir ${city.name}`}
            className="w-full inline-flex items-center justify-center gap-2 bg-[#F19F14] hover:bg-[#D86E04] text-[#071510] hover:text-[#FFFFFF] font-bold text-sm py-3.5 px-6 rounded-2xl shadow-md transition-all active:scale-95"
          >
            <span>Descobrir {city.name}</span>
            <ArrowRight className="w-4 h-4 text-[#071510] group-hover:text-[#FFFFFF] group-hover:translate-x-1 transition-all" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}
