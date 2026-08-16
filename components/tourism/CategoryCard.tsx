import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Wine, 
  Utensils, 
  Hotel, 
  Bus, 
  Compass, 
  Trees, 
  Mountain,
  Landmark, 
  ShoppingBag, 
  Coffee, 
  PartyPopper,
  Tag
} from 'lucide-react';
import { Category } from '@/types';

const iconMap: Record<string, React.ComponentType<{ className?: string; 'aria-hidden'?: boolean | 'true' | 'false' }>> = {
  Wine,
  Utensils,
  Hotel,
  Bus,
  Compass,
  Trees,
  Mountain,
  Landmark,
  ShoppingBag,
  Coffee,
  PartyPopper,
};

interface CategoryCardProps {
  category: Category;
  citySlug?: string;
}

export function CategoryCard({ category, citySlug }: CategoryCardProps) {
  const IconComponent = iconMap[category.icon] || Tag;
  const targetCitySlug = citySlug || (category.city_id === 'city-atibaia' ? 'atibaia' : 'sao-roque');
  const categoryHref = `/${targetCitySlug}/explorar?category=${category.slug}`;

  return (
    <Link
      href={categoryHref}
      aria-label={`Ver categoria ${category.name}`}
      className="group relative overflow-hidden rounded-2xl bg-[#183A32] border border-[#245247] shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col justify-end h-44 sm:h-48"
    >
      {/* Background Image */}
      <div className="absolute inset-0 bg-[#183A32]">
        {category.image_url && (
          <Image
            src={category.image_url}
            alt={category.name}
            fill
            className="object-cover opacity-55 group-hover:opacity-70 group-hover:scale-105 transition-all duration-500"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#26332F] via-[#26332F]/40 to-transparent" />
      </div>

      {/* Content Overlay */}
      <div className="relative p-4 sm:p-5 flex flex-col gap-2 z-10">
        {/* ICON AREA: 48px x 48px, rounded 14px */}
        <div className="w-12 h-12 rounded-[14px] bg-[#FCFAF5] text-[#183A32] flex items-center justify-center shadow-md group-hover:bg-[#F4EBDD] group-hover:scale-105 transition-all border border-[#e6dfd4]">
          <IconComponent className="w-6 h-6 stroke-[1.8]" aria-hidden="true" />
        </div>
        <div>
          <h3 className="font-serif text-base sm:text-lg font-bold text-[#FCFAF5] group-hover:text-[#D49A3A] transition-colors leading-snug">
            {category.name}
          </h3>
          <p className="text-xs text-[#F4EBDD]/90 line-clamp-1 mt-0.5">
            {category.description}
          </p>
        </div>
      </div>
    </Link>
  );
}
