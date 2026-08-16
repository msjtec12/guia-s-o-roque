import React from 'react';
import { Calendar } from 'lucide-react';
import { getEvents } from '@/lib/services/data';
import { EventCard } from '@/components/tourism/EventCard';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { constructMetadata } from '@/lib/seo/metadata';

export const metadata = constructMetadata({
  title: 'Próximos Eventos em Atibaia - SP',
  description: 'Festa de Flores e Morangos, Festivais de Cerveja, Etapas de Voo Livre e Shows em Atibaia.',
  citySlug: 'atibaia',
});

export const revalidate = 60;

export default async function AtibaiaEventosPage() {
  const events = await getEvents('atibaia');

  const breadcrumbs = [
    { label: 'Atibaia', href: '/atibaia' },
    { label: 'Eventos' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-20 bg-[#F6F0D4]">
      
      <Breadcrumbs items={breadcrumbs} />

      {/* PAGE HEADER */}
      <div className="space-y-3 text-center md:text-left border-b border-[#E7E5DF] pb-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white text-[#107492] text-xs font-semibold border border-[#E7E5DF] shadow-xs">
          <Calendar className="w-3.5 h-3.5 text-[#F19F14]" />
          <span>Agenda Turística & Cultural • Atibaia</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#26332F]">
          Próximos eventos em Atibaia
        </h1>
        <p className="text-sm sm:text-base text-[#26332F]/80 max-w-3xl">
          Acompanhe a Festa de Flores e Morangos, competições esportivas na Pedra Grande, festivais de cerveja artesanal e feiras no Parque Edmundo Zanoni.
        </p>
      </div>

      {/* EVENTS GRID */}
      {events.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center border border-[#E7E5DF] shadow-sm space-y-3 max-w-lg mx-auto">
          <h3 className="font-serif text-xl font-bold text-[#26332F]">
            Em breve novos eventos em Atibaia
          </h3>
          <p className="text-xs text-[#26332F]/70">
            Em breve você encontrará aqui os próximos eventos da cidade.
          </p>
        </div>
      )}

    </div>
  );
}
