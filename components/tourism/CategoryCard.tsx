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
  const targetCitySlug =
    citySlug ||
    (category.city_id === 'city-atibaia' ? 'atibaia' : category.city_id === 'city-socorro' ? 'socorro' : 'sao-roque');
  const categoryHref = `/${targetCitySlug}/explorar?category=${category.slug}`;

  return (
    <Link
      href={categoryHref}
      aria-label={`Ver categoria ${category.name}`}
      className="group relative overflow-hidden rounded-3xl bg-[#071510] border border-[#1B4931]/40 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col justify-end h-44 sm:h-48"
    >
      {/* Background Image */}
      <div className="absolute inset-0 bg-[#071510]">
        {category.image_url && (
          <Image
            src={category.image_url}
            alt={category.name}
            fill
            className="object-cover opacity-50 group-hover:opacity-65 group-hover:scale-105 transition-all duration-500"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#071510] via-[#071510]/50 to-transparent" />
      </div>

      {/* Content Overlay */}
      <div className="relative p-4 sm:p-5 flex flex-col gap-2 z-10">
        <div className="w-11 h-11 rounded-2xl bg-white text-[#071510] flex items-center justify-center shadow-md group-hover:bg-[#F19F14] group-hover:text-[#071510] group-hover:scale-105 transition-all border border-[#E7E5DF]">
          <IconComponent className="w-5 h-5 stroke-[2]" aria-hidden="true" />
        </div>
        <div>
          <h3 className="font-serif text-base sm:text-lg font-bold text-[#FFFFFF] group-hover:text-[#F19F14] transition-colors leading-snug">
            {category.name}
          </h3>
          <p className="text-xs text-[#E7E5DF]/80 line-clamp-1 mt-0.5">
            {category.description}
          </p>
        </div>
      </div>
    </Link>
  );
}
