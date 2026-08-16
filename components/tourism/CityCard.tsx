import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, MapPin, Wine, Trees } from 'lucide-react';
import { City } from '@/types';

interface CityCardProps {
  city: City;
  priority?: boolean;
}

export function CityCard({ city, priority = false }: CityCardProps) {
  const isSaoRoque = city.slug === 'sao-roque';
  const Icon = isSaoRoque ? Wine : Trees;
  const destinationHref = `/${city.slug}`;

  return (
    <div className="group relative bg-white rounded-3xl overflow-hidden border border-[#e6dfd4] shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between">
      {/* IMAGE HERO CONTAINER */}
      <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-[#183A32]">
        <Image
          src={city.hero_image || city.image_url || '/images/hero-sao-roque.webp'}
          alt={`Destino turístico de ${city.name} - ${city.state}`}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
        />

        {/* ELEGANT GRADIENT OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#26332F] via-[#26332F]/40 to-transparent pointer-events-none" />

        {/* BADGE LOCATION OVERLAY */}
        <div className="absolute top-4 left-4 z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#183A32]/85 text-[#FCFAF5] backdrop-blur-md text-xs font-semibold border border-white/20 shadow-sm">
            <MapPin className="w-3.5 h-3.5 text-[#D49A3A]" aria-hidden="true" />
            <span>{city.state} • Brasil</span>
          </span>
        </div>

        {/* CITY TITLE ON IMAGE */}
        <div className="absolute bottom-4 left-4 right-4 z-10 text-[#FCFAF5] space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#D49A3A] text-[#26332F] flex items-center justify-center shadow-xs">
              <Icon className="w-4 h-4" aria-hidden="true" />
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#FCFAF5]">
              {city.name}
            </h3>
          </div>
        </div>
      </div>

      {/* BODY CONTENT */}
      <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
        <div className="space-y-4">
          <p className="text-sm text-[#52615B] leading-relaxed line-clamp-3">
            {city.description}
          </p>

          {/* TAGS */}
          {city.tags && city.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-1">
              {city.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full bg-[#F4EBDD] text-[#183A32] text-xs font-semibold border border-[#e6dfd4]"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* CTA BUTTON */}
        <div className="pt-4 border-t border-[#F4EBDD]">
          <Link
            href={destinationHref}
            aria-label={`Descobrir ${city.name}`}
            className="w-full inline-flex items-center justify-center gap-2 bg-[#183A32] group-hover:bg-[#245247] text-[#FCFAF5] font-bold text-sm py-3.5 px-6 rounded-2xl shadow-md transition-all active:scale-95"
          >
            <span>Descobrir {city.name}</span>
            <ArrowRight className="w-4 h-4 text-[#D49A3A] group-hover:translate-x-1 transition-transform" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}
