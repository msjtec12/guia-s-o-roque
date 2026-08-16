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
  const targetCitySlug =
    citySlug ||
    (route.city_id === 'city-atibaia' ? 'atibaia' : route.city_id === 'city-socorro' ? 'socorro' : 'sao-roque');
  const routeHref = `/${targetCitySlug}/roteiro/${route.slug}`;

  return (
    <div className="group bg-white rounded-3xl border border-[#E7E5DF] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full card-hover">
      <div className="relative h-52 w-full bg-[#071510] overflow-hidden">
        <Image
          src={route.image_url || 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80'}
          alt={route.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#071510]/80 via-[#071510]/20 to-transparent" />

        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between z-10 text-[#FFFFFF] text-xs">
          <span className="inline-flex items-center gap-1.5 bg-[#071510]/85 backdrop-blur-md px-2.5 py-1 rounded-full font-medium border border-[#1B4931]/50">
            <Clock className="w-3.5 h-3.5 text-[#F19F14]" />
            {route.duration}
          </span>
          <span className="inline-flex items-center gap-1.5 bg-[#1B4931]/90 backdrop-blur-md px-2.5 py-1 rounded-full font-medium border border-white/20">
            <Users className="w-3.5 h-3.5 text-[#F19F14]" />
            {route.profile}
          </span>
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <Link href={routeHref}>
            <h3 className="font-serif text-lg font-bold text-[#26332F] group-hover:text-[#107492] transition-colors line-clamp-1">
              {route.name}
            </h3>
          </Link>
          <p className="text-xs text-[#26332F]/80 line-clamp-2 leading-relaxed">
            {route.description}
          </p>
        </div>

        {route.items && route.items.length > 0 && (
          <div className="text-xs text-[#107492] font-semibold bg-[#F6F0D4] px-3 py-1.5 rounded-xl border border-[#E7E5DF] flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-[#107492]" />
            <span>{route.items.length} paradas inclusas no roteiro</span>
          </div>
        )}

        <div className="pt-3 border-t border-[#E7E5DF] flex items-center justify-end">
          <Link
            href={routeHref}
            className="inline-flex items-center gap-2 text-xs font-bold text-[#FFFFFF] bg-[#1B4931] hover:bg-[#071510] px-4 py-2.5 rounded-xl shadow-xs transition-all"
          >
            <span>Ver Roteiro</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#F19F14]" />
          </Link>
        </div>
      </div>
    </div>
  );
}
