import React from 'react';
import { Sparkles } from 'lucide-react';
import { getExperiences } from '@/lib/services/data';
import { ExperienceCard } from '@/components/tourism/ExperienceCard';
import { constructMetadata } from '@/lib/seo/metadata';

export const metadata = constructMetadata({
  title: 'Experiências em São Roque | Passeios e Turismo',
  description: 'Descubra degustações de vinho, pisas da uva, almoços harmonizados e passeios imperdíveis em São Roque - SP.',
});

export const revalidate = 60;

export default async function ExperienciasPage() {
  const experiences = await getExperiences();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-20 space-y-8">
      
      {/* PAGE HEADER */}
      <div className="space-y-4 text-center md:text-left border-b border-stone-200/80 pb-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>Momentos Inesquecíveis em São Roque</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
          Experiências em São Roque
        </h1>
        <p className="text-sm sm:text-base text-stone-600 max-w-3xl">
          Reserve vivências exclusivas no Roteiro do Vinho, como degustações harmonizadas, passeios por parreirais e almoços em meio à natureza.
        </p>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {experiences.map((experience) => (
          <ExperienceCard key={experience.id} experience={experience} />
        ))}
      </div>

    </div>
  );
}
