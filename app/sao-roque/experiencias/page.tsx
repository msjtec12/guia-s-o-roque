import React from 'react';
import { Sparkles } from 'lucide-react';
import { getExperiences } from '@/lib/services/data';
import { ExperienceCard } from '@/components/tourism/ExperienceCard';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { constructMetadata } from '@/lib/seo/metadata';

export const metadata = constructMetadata({
  title: 'Experiências em São Roque | Degustações e Passeios',
  description: 'Descubra degustações de vinho, pisas da uva, almoços harmonizados e passeios imperdíveis em São Roque - SP.',
  citySlug: 'sao-roque',
});

export const revalidate = 60;

export default async function SaoRoqueExperienciasPage() {
  const experiences = await getExperiences(false, 'sao-roque');

  const breadcrumbs = [
    { label: 'São Roque', href: '/sao-roque' },
    { label: 'Experiências' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-20 space-y-8 bg-[#F6F0D4]">
      
      <Breadcrumbs items={breadcrumbs} />

      <div className="space-y-3 text-center md:text-left border-b border-[#E7E5DF] pb-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white text-[#107492] text-xs font-semibold border border-[#E7E5DF] shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-[#F19F14]" />
          <span>Momentos Inesquecíveis em São Roque</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#26332F]">
          Experiências em São Roque
        </h1>
        <p className="text-sm sm:text-base text-[#26332F]/80 max-w-3xl">
          Reserve vivências exclusivas no Roteiro do Vinho, como degustações harmonizadas, passeios por parreirais e almoços em meio à natureza.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {experiences.map((experience) => (
          <ExperienceCard key={experience.id} experience={experience} citySlug="sao-roque" />
        ))}
      </div>

    </div>
  );
}
