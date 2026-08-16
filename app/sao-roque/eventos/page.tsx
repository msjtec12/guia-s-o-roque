import React from 'react';
import { Calendar } from 'lucide-react';
import { getEvents } from '@/lib/services/data';
import { EventCard } from '@/components/tourism/EventCard';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { constructMetadata } from '@/lib/seo/metadata';

export const metadata = constructMetadata({
  title: 'Próximos Eventos em São Roque - SP',
  description: 'Festas da Vindima, Noites de Fado, Festivais Gastronômicos e Shows no Roteiro do Vinho.',
  citySlug: 'sao-roque',
});

export const revalidate = 60;

export default async function SaoRoqueEventosPage() {
  const events = await getEvents('sao-roque');

  const breadcrumbs = [
    { label: 'São Roque', href: '/sao-roque' },
    { label: 'Eventos' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-20 bg-[#FCFAF5]">
      
      <Breadcrumbs items={breadcrumbs} />

      {/* PAGE HEADER */}
      <div className="space-y-3 text-center md:text-left border-b border-[#e6dfd4] pb-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F4EBDD] text-[#183A32] text-xs font-semibold">
          <Calendar className="w-3.5 h-3.5 text-[#183A32]" />
          <span>Agenda Turística & Cultural</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#26332F]">
          Próximos eventos em São Roque
        </h1>
        <p className="text-sm sm:text-base text-[#52615B] max-w-3xl">
          Fique por dentro das festas folclóricas, festivais gastronômicos, noites temáticas em vinícolas e atrações imperdíveis.
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
        <div className="bg-white rounded-3xl p-12 text-center border border-[#e6dfd4] shadow-sm space-y-3 max-w-lg mx-auto">
          <h3 className="font-serif text-xl font-bold text-[#26332F]">
            Em breve novos eventos
          </h3>
          <p className="text-xs text-[#52615B]">
            Em breve você encontrará aqui os próximos eventos de São Roque.
          </p>
        </div>
      )}

    </div>
  );
}
