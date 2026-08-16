import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { 
  MapPin, 
  Phone, 
  Globe, 
  Clock, 
  Sparkles, 
  Crown, 
  CheckCircle2, 
  ExternalLink,
  Navigation
} from 'lucide-react';
import { InstagramIcon } from '@/components/ui/Icons';
import { getBusinessBySlug, getBusinesses } from '@/lib/services/data';
import { RatingBadge } from '@/components/tourism/RatingBadge';
import { WhatsAppButton } from '@/components/business/WhatsAppButton';
import { ExperienceCard } from '@/components/tourism/ExperienceCard';
import { BusinessCard } from '@/components/tourism/BusinessCard';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { formatPriceRange, buildGoogleMapsUrl } from '@/lib/utils';
import { constructMetadata } from '@/lib/seo/metadata';

interface BusinessPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: BusinessPageProps) {
  const { slug } = await params;
  const business = await getBusinessBySlug(slug, 'atibaia');
  if (!business) return constructMetadata({ citySlug: 'atibaia' });

  return constructMetadata({
    title: `${business.name} em Atibaia`,
    description: `${business.description.slice(0, 150)} em Atibaia - SP.`,
    image: business.main_image_url,
    citySlug: 'atibaia',
  });
}

export default async function AtibaiaBusinessDetailPage({ params }: BusinessPageProps) {
  const { slug } = await params;
  const business = await getBusinessBySlug(slug, 'atibaia');

  if (!business) {
    notFound();
  }

  const allBusinesses = await getBusinesses({ citySlug: 'atibaia' });
  const relatedBusinesses = allBusinesses
    .filter((b) => b.id !== business.id && b.category_id === business.category_id)
    .slice(0, 3);

  const mapsUrl = buildGoogleMapsUrl(business.address, business.latitude, business.longitude, 'Atibaia');

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: business.name,
    description: business.description,
    image: business.main_image_url,
    address: {
      '@type': 'PostalAddress',
      streetAddress: business.address,
      addressLocality: 'Atibaia',
      addressRegion: 'SP',
      addressCountry: 'BR',
    },
    telephone: business.phone || business.whatsapp,
    url: business.website || `https://descubra.tur.br/atibaia/empresa/${business.slug}`,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: business.rating || 4.8,
      reviewCount: business.review_count || 85,
    },
  };

  const breadcrumbs = [
    { label: 'Atibaia', href: '/atibaia' },
    { label: 'Explorar', href: '/atibaia/explorar' },
    ...(business.category ? [{ label: business.category.name, href: `/atibaia/explorar?category=${business.category.slug}` }] : []),
    { label: business.name },
  ];

  return (
    <div className="pb-20 space-y-8 bg-[#F6F0D4]">
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Breadcrumbs items={breadcrumbs} />
      </div>

      {/* HERO SECTION */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-[#071510] shadow-xl border border-[#E7E5DF] min-h-[380px] sm:min-h-[460px] flex items-end">
          <Image
            src={business.main_image_url || 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1600&q=80'}
            alt={business.name}
            fill
            priority
            className="object-cover opacity-60"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#071510] via-[#071510]/50 to-transparent" />

          <div className="relative z-10 p-6 sm:p-10 w-full text-[#FFFFFF] space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              {business.is_premium && (
                <span className="inline-flex items-center gap-1 bg-[#F19F14] text-[#071510] text-xs font-extrabold px-3 py-1 rounded-full shadow-md uppercase tracking-wider">
                  <Crown className="w-3.5 h-3.5 fill-[#071510]" />
                  Parceiro Premium
                </span>
              )}
              {business.is_featured && !business.is_premium && (
                <span className="inline-flex items-center gap-1 bg-[#1B4931] text-[#FFFFFF] text-xs font-semibold px-3 py-1 rounded-full shadow-md border border-[#1B4931]/60">
                  <Sparkles className="w-3.5 h-3.5 text-[#F19F14]" />
                  Parceiro em Destaque
                </span>
              )}
              {business.category && (
                <span className="bg-white/95 text-[#107492] font-semibold text-xs px-3 py-1 rounded-full shadow-sm">
                  {business.category.name}
                </span>
              )}
              <RatingBadge rating={business.rating} reviewCount={business.review_count} />
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl font-bold leading-tight">
              {business.name}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-[#E7E5DF]">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#F19F14] shrink-0" />
                <span>{business.address}</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1.5 font-semibold text-[#F19F14]">
                <span>{formatPriceRange(business.price_min, business.price_max)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT GRID */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* LEFT / MAIN COLUMN */}
        <div className="lg:col-span-2 space-y-10">
          
          <section className="bg-white rounded-3xl p-8 border border-[#E7E5DF] shadow-sm space-y-4">
            <h2 className="font-serif text-2xl font-bold text-[#26332F] border-b border-[#E7E5DF] pb-3">
              Sobre o Estabelecimento
            </h2>
            <p className="text-[#26332F] text-sm sm:text-base leading-relaxed whitespace-pre-line">
              {business.description}
            </p>

            {business.amenities && business.amenities.length > 0 && (
              <div className="pt-4 border-t border-[#E7E5DF] space-y-3">
                <h3 className="text-xs font-bold text-[#26332F] uppercase tracking-wider">
                  Comodidades & Diferenciais
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {business.amenities.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs font-medium text-[#26332F] bg-[#F6F0D4] p-2.5 rounded-2xl border border-[#E7E5DF]">
                      <CheckCircle2 className="w-4 h-4 text-[#1B4931] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>

          {business.gallery && business.gallery.length > 0 && (
            <section className="bg-white rounded-3xl p-8 border border-[#E7E5DF] shadow-sm space-y-4">
              <h2 className="font-serif text-2xl font-bold text-[#26332F] border-b border-[#E7E5DF] pb-3">
                Galeria de Fotos
              </h2>
              <div className="flex sm:grid sm:grid-cols-3 gap-4 overflow-x-auto pb-2 sm:pb-0 scrollbar-thin">
                {business.gallery.map((img) => (
                  <div key={img.id} className="relative h-48 w-64 sm:w-auto shrink-0 sm:shrink rounded-2xl overflow-hidden bg-[#F6F0D4]">
                    <Image
                      src={img.image_url}
                      alt={business.name}
                      fill
                      loading="lazy"
                      className="object-cover hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 640px) 80vw, 33vw"
                    />
                  </div>
                ))}
              </div>
            </section>
          )}

          {business.experiences && business.experiences.length > 0 && (
            <section className="space-y-4">
              <h2 className="font-serif text-2xl font-bold text-[#26332F]">
                Experiências neste Local
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {business.experiences.map((exp) => (
                  <ExperienceCard key={exp.id} experience={exp} citySlug="atibaia" />
                ))}
              </div>
            </section>
          )}

          {relatedBusinesses.length > 0 && (
            <section className="space-y-4 pt-6 border-t border-[#E7E5DF]">
              <h2 className="font-serif text-2xl font-bold text-[#26332F]">
                Outros lugares recomendados em Atibaia
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {relatedBusinesses.map((b) => (
                  <BusinessCard key={b.id} business={b} citySlug="atibaia" />
                ))}
              </div>
            </section>
          )}

        </div>

        {/* RIGHT COLUMN */}
        <aside className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-[#E7E5DF] shadow-md space-y-6 sticky top-24">
            <h3 className="font-serif text-xl font-bold text-[#26332F] border-b border-[#E7E5DF] pb-3">
              Informações & Contato
            </h3>

            <WhatsAppButton
              phoneOrWhatsapp={business.whatsapp || business.phone}
              businessName={business.name}
              cityName="Atibaia"
              businessId={business.id}
              fullWidth
              className="py-4 text-base shadow-xl"
            />

            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full bg-[#F6F0D4] hover:bg-[#E7E5DF] text-[#1B4931] font-semibold text-sm py-3 px-4 rounded-xl border border-[#E7E5DF] transition-all text-center"
            >
              <Navigation className="w-4 h-4 text-[#107492]" />
              <span>Ver no Google Maps (Como Chegar)</span>
            </a>

            <div className="space-y-4 text-xs sm:text-sm text-[#26332F] pt-2 border-t border-[#E7E5DF]">
              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#107492] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[#26332F] block">Horário de Funcionamento:</span>
                  <span className="text-[#26332F]/70">{business.opening_hours}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#107492] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[#26332F] block">Endereço:</span>
                  <span className="text-[#26332F]/70">{business.address}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#107492] shrink-0" />
                <div>
                  <span className="font-bold text-[#26332F] block">Telefone:</span>
                  <span className="text-[#26332F]/70">{business.phone}</span>
                </div>
              </div>

              {business.instagram && (
                <div className="flex items-center gap-3">
                  <InstagramIcon className="w-4 h-4 text-[#107492] shrink-0" />
                  <div>
                    <span className="font-bold text-[#26332F] block">Instagram:</span>
                    <a
                      href={`https://instagram.com/${business.instagram}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#107492] font-semibold hover:underline"
                    >
                      @{business.instagram}
                    </a>
                  </div>
                </div>
              )}

              {business.website && (
                <div className="flex items-center gap-3">
                  <Globe className="w-4 h-4 text-[#107492] shrink-0" />
                  <div>
                    <span className="font-bold text-[#26332F] block">Website Oficial:</span>
                    <a
                      href={business.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#107492] font-semibold hover:underline inline-flex items-center gap-1 truncate max-w-[200px]"
                    >
                      <span>Acessar site</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </aside>

      </div>

    </div>
  );
}
