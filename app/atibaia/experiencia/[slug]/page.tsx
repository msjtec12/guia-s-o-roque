import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, Sparkles, MapPin } from 'lucide-react';
import { getExperienceBySlug } from '@/lib/services/data';
import { WhatsAppButton } from '@/components/business/WhatsAppButton';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { formatCurrency } from '@/lib/utils';
import { constructMetadata } from '@/lib/seo/metadata';

interface ExperienceDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: ExperienceDetailPageProps) {
  const { slug } = await params;
  const experience = await getExperienceBySlug(slug, 'atibaia');
  if (!experience) return constructMetadata({ citySlug: 'atibaia' });

  return constructMetadata({
    title: `${experience.name} em Atibaia`,
    description: experience.description,
    image: experience.main_image_url,
    citySlug: 'atibaia',
  });
}

export default async function AtibaiaExperienceDetailPage({ params }: ExperienceDetailPageProps) {
  const { slug } = await params;
  const experience = await getExperienceBySlug(slug, 'atibaia');

  if (!experience) {
    notFound();
  }

  const breadcrumbs = [
    { label: 'Atibaia', href: '/atibaia' },
    { label: 'Experiências', href: '/atibaia/experiencias' },
    { label: experience.name },
  ];

  return (
    <div className="pb-20 space-y-8 bg-[#FCFAF5]">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Breadcrumbs items={breadcrumbs} />
      </div>

      {/* HERO SECTION */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-[#183A32] shadow-xl border border-[#e6dfd4] min-h-[380px] sm:min-h-[440px] flex items-end">
          <Image
            src={experience.main_image_url || 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1600&q=80'}
            alt={experience.name}
            fill
            priority
            className="object-cover opacity-60"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#26332F] via-[#26332F]/40 to-transparent" />

          <div className="relative z-10 p-6 sm:p-10 w-full text-[#FCFAF5] space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 bg-[#D49A3A] text-[#26332F] text-xs font-bold px-3 py-1 rounded-full shadow-md">
                <Sparkles className="w-3.5 h-3.5 fill-[#26332F]" />
                Experiência em Destaque
              </span>
              <span className="bg-[#722F3E] text-[#FCFAF5] text-xs font-bold px-3 py-1 rounded-full border border-[#8d3d4e]/40">
                {experience.price > 0 ? formatCurrency(experience.price) : 'Gratuito'}
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl font-bold leading-tight">
              {experience.name}
            </h1>

            {experience.business && (
              <div className="flex items-center gap-2 text-xs sm:text-sm text-[#F4EBDD]">
                <MapPin className="w-4 h-4 text-[#D49A3A]" />
                <span>Oferecido por: </span>
                <Link
                  href={`/atibaia/empresa/${experience.business.slug}`}
                  className="font-bold text-[#D49A3A] hover:underline"
                >
                  {experience.business.name}
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6 bg-white p-8 rounded-3xl border border-[#e6dfd4] shadow-sm">
          <h2 className="font-serif text-2xl font-bold text-[#26332F] border-b border-[#F4EBDD] pb-3">
            Detalhes da Experiência
          </h2>
          <p className="text-[#26332F] text-sm sm:text-base leading-relaxed whitespace-pre-line">
            {experience.description}
          </p>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-[#e6dfd4] shadow-md space-y-4 sticky top-24">
            <div className="flex items-center gap-2 text-[#26332F] font-bold text-sm border-b border-[#F4EBDD] pb-3">
              <Clock className="w-4 h-4 text-[#183A32]" />
              <span>Duração: {experience.duration}</span>
            </div>

            <div className="text-xs text-[#52615B] leading-relaxed">
              Para tirar dúvidas ou agendar seu voo/visita, fale diretamente com o estabelecimento parceiro.
            </div>

            {experience.business && (
              <WhatsAppButton
                phoneOrWhatsapp={experience.business.whatsapp || experience.business.phone}
                businessName={experience.business.name}
                cityName="Atibaia"
                businessId={experience.business.id}
                fullWidth
                className="py-3 text-sm shadow-md"
              />
            )}
          </div>
        </div>
      </div>

    </div>
  );
}
