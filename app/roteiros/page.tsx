import React from 'react';
import Link from 'next/link';
import { MapPin, Sparkles, ArrowRight } from 'lucide-react';
import { getRoutes } from '@/lib/services/data';
import { RouteCard } from '@/components/tourism/RouteCard';
import { constructMetadata } from '@/lib/seo/metadata';

export const metadata = constructMetadata({
  title: 'Roteiros em São Roque | Monte seu Passeio',
  description: 'Confira roteiros turísticos prontos e personalizados em São Roque: Roteiro do Vinho, Gastronômico, em Família e Ecológico.',
});

export const revalidate = 60;

export default async function RoteirosPage() {
  const routes = await getRoutes();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-20 space-y-10">
      
      {/* PAGE HEADER */}
      <div className="space-y-4 text-center md:text-left border-b border-stone-200/80 pb-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-semibold">
          <MapPin className="w-3.5 h-3.5 text-emerald-700" />
          <span>Itinerários Recomendados</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
          Roteiros em São Roque
        </h1>
        <p className="text-sm sm:text-base text-stone-600 max-w-3xl">
          Selecione um roteiro pronto ou crie um itinerário personalizado de acordo com o seu perfil e tempo disponível.
        </p>
      </div>

      {/* BANNER ASSISTENTE INTERATIVO */}
      <div className="rounded-3xl bg-emerald-950 text-white p-8 border border-emerald-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <span className="text-xs font-bold text-amber-300 uppercase tracking-wider block">
            Assistente Sob Medida
          </span>
          <h2 className="font-serif text-2xl font-bold">✨ Monte seu próprio roteiro personalizado</h2>
          <p className="text-xs sm:text-sm text-emerald-100/80">
            Responda a 3 perguntas rápidas e nosso sistema gera um cronograma sob medida com vinícolas, restaurantes e passeios.
          </p>
        </div>
        <Link
          href="/roteiros/montar"
          className="inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold text-xs px-6 py-3.5 rounded-xl shadow-md transition-all shrink-0"
        >
          <Sparkles className="w-4 h-4" />
          <span>Montar Meu Roteiro</span>
        </Link>
      </div>

      {/* ROTEIROS LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {routes.map((route) => (
          <RouteCard key={route.id} route={route} />
        ))}
      </div>

    </div>
  );
}
