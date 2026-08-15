import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, Sparkles, ArrowRight } from 'lucide-react';
import { Experience } from '@/types';
import { formatCurrency } from '@/lib/utils';

interface ExperienceCardProps {
  experience: Experience;
}

export function ExperienceCard({ experience }: ExperienceCardProps) {
  return (
    <div className="group bg-white rounded-2xl border border-[#e6dfd4] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full card-hover">
      <div className="relative h-48 w-full bg-[#FCFAF5] overflow-hidden">
        <Image
          src={experience.main_image_url || 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80'}
          alt={experience.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#26332F]/60 via-transparent to-transparent" />
        
        {/* PRICE TAG (VINHO) */}
        <div className="absolute top-3 right-3 bg-[#722F3E] text-[#FCFAF5] text-xs font-bold px-3 py-1 rounded-full shadow-md border border-[#8d3d4e]/40">
          {experience.price > 0 ? formatCurrency(experience.price) : 'Gratuito'}
        </div>

        {/* DURATION BADGE */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-[#183A32]/90 backdrop-blur-md text-[#FCFAF5] text-[11px] font-medium px-2.5 py-1 rounded-full border border-[#245247]">
          <Clock className="w-3 h-3 text-[#D49A3A]" />
          <span>{experience.duration}</span>
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          {experience.business && (
            <span className="text-[11px] font-bold text-[#722F3E] uppercase tracking-wider block">
              {experience.business.name}
            </span>
          )}
          <Link href={`/experiencia/${experience.slug}`}>
            <h3 className="font-serif text-base font-bold text-[#26332F] group-hover:text-[#183A32] transition-colors line-clamp-2">
              {experience.name}
            </h3>
          </Link>
          <p className="text-xs text-[#52615B] line-clamp-2 leading-relaxed">
            {experience.description}
          </p>
        </div>

        <div className="pt-3 border-t border-[#F4EBDD] flex items-center justify-between">
          <span className="inline-flex items-center gap-1 text-xs text-[#82967A] font-medium">
            <Sparkles className="w-3.5 h-3.5 text-[#D49A3A]" />
            Experiência Recomendada
          </span>
          <Link
            href={`/experiencia/${experience.slug}`}
            className="inline-flex items-center gap-1 text-xs font-semibold text-[#183A32] hover:text-[#722F3E] bg-[#F4EBDD] hover:bg-[#e8dbca] px-3 py-2 rounded-xl transition-all"
          >
            <span>Conhecer</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
