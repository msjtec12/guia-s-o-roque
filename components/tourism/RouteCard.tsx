import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, Users, MapPin, ArrowRight } from 'lucide-react';
import { Route } from '@/types';

interface RouteCardProps {
  route: Route;
  citySlug?: string;
}

export function RouteCard({ route, citySlug }: RouteCardProps) {
  const targetCitySlug = citySlug || (route.city_id === 'city-atibaia' ? 'atibaia' : 'sao-roque');
  const routeHref = `/${targetCitySlug}/roteiro/${route.slug}`;

  return (
    <div className="group bg-white rounded-2xl border border-[#e6dfd4] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full">
      <div className="relative h-52 w-full bg-[#183A32] overflow-hidden">
        <Image
          src={route.image_url || 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80'}
          alt={route.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#26332F]/80 via-[#26332F]/20 to-transparent" />

        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between z-10 text-[#FCFAF5] text-xs">
          <span className="inline-flex items-center gap-1.5 bg-[#183A32]/85 backdrop-blur-md px-2.5 py-1 rounded-full font-medium border border-white/20">
            <Clock className="w-3.5 h-3.5 text-[#D49A3A]" />
            {route.duration}
          </span>
          <span className="inline-flex items-center gap-1.5 bg-[#245247]/90 backdrop-blur-md px-2.5 py-1 rounded-full font-medium border border-[#82967A]/40">
            <Users className="w-3.5 h-3.5 text-[#D49A3A]" />
            {route.profile}
          </span>
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <Link href={routeHref}>
            <h3 className="font-serif text-lg font-bold text-[#26332F] group-hover:text-[#183A32] transition-colors line-clamp-1">
              {route.name}
            </h3>
          </Link>
          <p className="text-xs text-[#52615B] line-clamp-2 leading-relaxed">
            {route.description}
          </p>
        </div>

        {route.items && route.items.length > 0 && (
          <div className="text-xs text-[#183A32] font-semibold bg-[#F4EBDD] px-3 py-1.5 rounded-lg border border-[#e6dfd4] flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-[#183A32]" />
            <span>{route.items.length} paradas inclusas no roteiro</span>
          </div>
        )}

        <div className="pt-3 border-t border-[#F4EBDD] flex items-center justify-end">
          <Link
            href={routeHref}
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#FCFAF5] bg-[#183A32] hover:bg-[#245247] px-4 py-2.5 rounded-xl shadow-xs transition-all"
          >
            <span>Ver Roteiro</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#D49A3A]" />
          </Link>
        </div>
      </div>
    </div>
  );
}
