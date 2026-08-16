import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Clock, Users } from 'lucide-react';
import { getRouteBySlug } from '@/lib/services/data';
import { BusinessCard } from '@/components/tourism/BusinessCard';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { constructMetadata } from '@/lib/seo/metadata';

interface RouteDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: RouteDetailPageProps) {
  const { slug } = await params;
  const route = await getRouteBySlug(slug, 'sao-roque');
  if (!route) return constructMetadata({ citySlug: 'sao-roque' });

  return constructMetadata({
    title: `${route.name} em São Roque`,
    description: route.description,
    image: route.image_url,
    citySlug: 'sao-roque',
  });
}

export default async function SaoRoqueRouteDetailPage({ params }: RouteDetailPageProps) {
  const { slug } = await params;
  const route = await getRouteBySlug(slug, 'sao-roque');

  if (!route) {
    notFound();
  }

  const breadcrumbs = [
    { label: 'São Roque', href: '/sao-roque' },
    { label: 'Roteiros', href: '/sao-roque/roteiros' },
    { label: route.name },
  ];

  return (
    <div className="pb-20 space-y-8 bg-[#FCFAF5]">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Breadcrumbs items={breadcrumbs} />
      </div>

      {/* HERO SECTION */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-[#183A32] shadow-xl border border-[#e6dfd4] min-h-[360px] sm:min-h-[420px] flex items-end">
          <Image
            src={route.image_url || 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1600&q=80'}
            alt={route.name}
            fill
            priority
            className="object-cover opacity-60"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#26332F] via-[#26332F]/40 to-transparent" />

          <div className="relative z-10 p-6 sm:p-10 w-full text-[#FCFAF5] space-y-4">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="inline-flex items-center gap-1.5 bg-[#D49A3A] text-[#26332F] font-bold px-3 py-1 rounded-full">
                <Clock className="w-3.5 h-3.5 fill-[#26332F]" />
                {route.duration}
              </span>
              <span className="inline-flex items-center gap-1.5 bg-[#183A32] text-[#FCFAF5] font-semibold px-3 py-1 rounded-full border border-[#245247]">
                <Users className="w-3.5 h-3.5 text-[#D49A3A]" />
                {route.profile}
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl font-bold leading-tight">
              {route.name}
            </h1>
            <p className="text-sm sm:text-base text-[#F4EBDD] max-w-2xl leading-relaxed">
              {route.description}
            </p>
          </div>
        </div>
      </div>

      {/* STOPS / ROUTE TIMELINE */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <h2 className="font-serif text-2xl font-bold text-[#26332F] border-b border-[#e6dfd4] pb-3">
          Etapas do Roteiro em São Roque
        </h2>

        {route.items && route.items.length > 0 ? (
          <div className="relative border-l-2 border-[#183A32]/40 pl-6 sm:pl-8 space-y-10">
            {route.items.map((item, idx) => (
              <div key={item.id} className="relative space-y-4">
                <div className="absolute -left-[35px] sm:-left-[43px] top-0 w-8 h-8 rounded-full bg-[#183A32] text-[#D49A3A] font-bold text-sm flex items-center justify-center border-4 border-[#FCFAF5] shadow-md">
                  {idx + 1}
                </div>

                <div className="space-y-1">
                  <h3 className="font-serif text-xl font-bold text-[#26332F]">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#52615B] leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {item.business && (
                  <div className="pt-2 max-w-lg">
                    <BusinessCard business={item.business} citySlug="sao-roque" />
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-[#82967A] text-sm">Nenhuma etapa cadastrada para este roteiro.</p>
        )}
      </div>

    </div>
  );
}
