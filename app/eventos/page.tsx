import React from 'react';
import { Calendar } from 'lucide-react';
import { getEvents } from '@/lib/services/data';
import { EventCard } from '@/components/tourism/EventCard';
import { constructMetadata } from '@/lib/seo/metadata';

export const metadata = constructMetadata({
  title: 'Agenda de Eventos & Festivais | Descubra Cidades',
  description: 'Festas da Vindima, Noites Gastronômicas, Festas de Flores e Morangos e Festivais de Inverno.',
});

export default async function EventosPage() {
  const events = await getEvents();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 pb-20 bg-[#F6F0D4]">
      
      {/* PAGE HEADER */}
      <div className="space-y-4 text-center md:text-left border-b border-[#E7E5DF] pb-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white text-[#107492] text-xs font-semibold border border-[#E7E5DF] shadow-xs">
          <Calendar className="w-3.5 h-3.5 text-[#F19F14]" />
          <span>Agenda Turística & Cultural</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#26332F]">
          Eventos & Festivais
        </h1>
        <p className="text-sm sm:text-base text-[#26332F]/80 max-w-3xl">
          Fique por dentro das festas típicas, festivais gastronômicos, noites em vinícolas, competições esportivas e celebrações locais.
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
