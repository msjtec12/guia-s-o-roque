import React from 'react';
import { Calendar } from 'lucide-react';
import { getEvents } from '@/lib/services/data';
import { EventCard } from '@/components/tourism/EventCard';
import { constructMetadata } from '@/lib/seo/metadata';

export const metadata = constructMetadata({
  title: 'Próximos Eventos em São Roque - SP',
  description: 'Festas da Vindima, Noites de Fado, Festivais Gastronômicos e Shows no Roteiro do Vinho.',
});

export default async function EventosPage() {
  const events = await getEvents();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 pb-20">
      
      {/* PAGE HEADER */}
      <div className="space-y-4 text-center md:text-left border-b border-stone-200/80 pb-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold">
          <Calendar className="w-3.5 h-3.5 text-amber-600" />
          <span>Agenda Turística & Cultural</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
          Próximos eventos em São Roque
        </h1>
        <p className="text-sm sm:text-base text-stone-600 max-w-3xl">
          Fique por dentro das festas folclóricas, festivais gastronômicos, noites temáticas em vinícolas e atrações imperdíveis.
        </p>
      </div>

      {/* EVENTS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>

    </div>
  );
}
