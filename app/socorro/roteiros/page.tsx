import React from 'react';
import Link from 'next/link';
import { MapPin, Sparkles } from 'lucide-react';
import { getRoutes } from '@/lib/services/data';
import { RouteCard } from '@/components/tourism/RouteCard';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { constructMetadata } from '@/lib/seo/metadata';

export const metadata = constructMetadata({
  title: 'Roteiros em Socorro | Aventura, Mirantes e Ecoturismo',
  description: 'Confira roteiros turísticos prontos e personalizados em Socorro: Rafting no Rio do Peixe, Pedra Bela Vista, Ecoturismo e Compras de Malhas.',
  citySlug: 'socorro',
});

export const revalidate = 60;

export default async function SocorroRoteirosPage() {
  const routes = await getRoutes('socorro');

  const breadcrumbs = [
    { label: 'Socorro', href: '/socorro' },
    { label: 'Roteiros' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-20 space-y-10 bg-[#FCFAF5]">
      
      <Breadcrumbs items={breadcrumbs} />

      {/* PAGE HEADER */}
      <div className="space-y-3 text-center md:text-left border-b border-[#e6dfd4] pb-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F4EBDD] text-[#183A32] text-xs font-semibold border border-[#e6dfd4]">
          <MapPin className="w-3.5 h-3.5 text-[#183A32]" />
          <span>Itinerários Recomendados</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#26332F]">
          Roteiros em Socorro
        </h1>
        <p className="text-sm sm:text-base text-[#52615B] max-w-3xl">
          Selecione um roteiro pronto ou crie um itinerário personalizado de acordo com o seu perfil e tempo disponível em Socorro.
        </p>
      </div>

      {/* BANNER ASSISTENTE INTERATIVO */}
      <div className="rounded-3xl bg-[#183A32] text-[#FCFAF5] p-8 border border-[#245247] shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <span className="text-xs font-bold text-[#D49A3A] uppercase tracking-wider block">
            Assistente Sob Medida
          </span>
          <h2 className="font-serif text-2xl font-bold text-[#FCFAF5]">
            ✨ Monte seu próprio roteiro personalizado em Socorro
          </h2>
          <p className="text-xs sm:text-sm text-[#F4EBDD]/90">
            Responda a 3 perguntas rápidas e nosso sistema gera um cronograma sob medida com rafting, mirantes, gastronomia e passeios.
          </p>
        </div>
        <Link
          href="/socorro/roteiros/montar"
          className="inline-flex items-center justify-center gap-2 bg-[#D49A3A] hover:bg-[#c28c32] text-[#26332F] font-bold text-xs px-6 py-3.5 rounded-xl shadow-md transition-all shrink-0"
        >
          <Sparkles className="w-4 h-4" />
          <span>Montar Meu Roteiro</span>
        </Link>
      </div>

      {/* ROTEIROS LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {routes.map((route) => (
          <RouteCard key={route.id} route={route} citySlug="socorro" />
        ))}
      </div>

    </div>
  );
}
