import React from 'react';
import { Sparkles } from 'lucide-react';
import { getExperiences } from '@/lib/services/data';
import { ExperienceCard } from '@/components/tourism/ExperienceCard';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { constructMetadata } from '@/lib/seo/metadata';

export const metadata = constructMetadata({
  title: 'Experiências em Socorro | Rafting, Mirantes e Aventura',
  description: 'Descida de rafting no Rio do Peixe, pôr do sol na Pedra Bela Vista, Gruta do Anjo e mega tirolesas em Socorro - SP.',
  citySlug: 'socorro',
});

export const revalidate = 60;

export default async function SocorroExperienciasPage() {
  const experiences = await getExperiences(false, 'socorro');

  const breadcrumbs = [
    { label: 'Socorro', href: '/socorro' },
    { label: 'Experiências' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-20 space-y-8 bg-[#FCFAF5]">
      
      <Breadcrumbs items={breadcrumbs} />

      <div className="space-y-3 text-center md:text-left border-b border-[#e6dfd4] pb-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#183A32]/10 text-[#183A32] text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-[#D49A3A]" />
          <span>Vivências Marcantes em Socorro</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#26332F]">
          Experiências em Socorro
        </h1>
        <p className="text-sm sm:text-base text-[#52615B] max-w-3xl">
          Reserve aventuras aquáticas no Rio do Peixe, pores do sol na Pedra Bela Vista, passeios na Gruta do Anjo e degustações artesanais.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {experiences.map((experience) => (
          <ExperienceCard key={experience.id} experience={experience} citySlug="socorro" />
        ))}
      </div>

    </div>
  );
}
