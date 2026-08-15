import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, Users, MapPin, ArrowRight } from 'lucide-react';
import { Route } from '@/types';

interface RouteCardProps {
  route: Route;
}

export function RouteCard({ route }: RouteCardProps) {
  return (
    <div className="group bg-white rounded-2xl border border-stone-200/80 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full">
      <div className="relative h-52 w-full bg-stone-900 overflow-hidden">
        <Image
          src={route.image_url || 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80'}
          alt={route.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent" />

        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between z-10 text-white text-xs">
          <span className="inline-flex items-center gap-1.5 bg-stone-900/80 backdrop-blur-md px-2.5 py-1 rounded-full font-medium">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            {route.duration}
          </span>
          <span className="inline-flex items-center gap-1.5 bg-emerald-900/80 backdrop-blur-md px-2.5 py-1 rounded-full font-medium">
            <Users className="w-3.5 h-3.5 text-amber-300" />
            {route.profile}
          </span>
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <Link href={`/roteiro/${route.slug}`}>
            <h3 className="font-serif text-lg font-bold text-stone-900 group-hover:text-emerald-800 transition-colors line-clamp-1">
              {route.name}
            </h3>
          </Link>
          <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
            {route.description}
          </p>
        </div>

        {route.items && route.items.length > 0 && (
          <div className="text-xs text-emerald-800 font-semibold bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100/80 flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-emerald-700" />
            <span>{route.items.length} etapas inclusas no roteiro</span>
          </div>
        )}

        <div className="pt-3 border-t border-stone-100 flex items-center justify-end">
          <Link
            href={`/roteiro/${route.slug}`}
            className="inline-flex items-center gap-2 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 px-4 py-2.5 rounded-xl shadow-sm transition-all"
          >
            <span>Ver Roteiro</span>
            <ArrowRight className="w-3.5 h-3.5 text-amber-300" />
          </Link>
        </div>
      </div>
    </div>
  );
}
