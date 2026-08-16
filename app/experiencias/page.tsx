import React from 'react';
import { Sparkles } from 'lucide-react';
import { getExperiences } from '@/lib/services/data';
import { ExperienceCard } from '@/components/tourism/ExperienceCard';
import { constructMetadata } from '@/lib/seo/metadata';

export const metadata = constructMetadata({
  title: 'Experiências Turísticas | Descubra Cidades',
  description: 'Descubra vivências exclusivas, degustações, passeios de aventura, trilhas e momentos imperdíveis.',
});

export const revalidate = 60;

export default async function ExperienciasPage() {
  const experiences = await getExperiences();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-20 space-y-8 bg-[#F6F0D4]">
      
      {/* PAGE HEADER */}
      <div className="space-y-4 text-center md:text-left border-b border-[#E7E5DF] pb-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white text-[#107492] text-xs font-semibold border border-[#E7E5DF] shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-[#F19F14]" />
          <span>Momentos & Vivências Inesquecíveis</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#26332F]">
          Experiências Turísticas
        </h1>
        <p className="text-sm sm:text-base text-[#26332F]/80 max-w-3xl">
          Reserve vivências memoráveis em nossas cidades parceiras: degustações de vinhos finos, voos de parapente, rafting em corredeiras, visitas a parreirais e almoços na brasa.
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
