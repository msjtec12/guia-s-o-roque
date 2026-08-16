import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Sparkles, Crown, ArrowRight } from 'lucide-react';
import { Business } from '@/types';
import { RatingBadge } from './RatingBadge';
import { WhatsAppButton } from '@/components/business/WhatsAppButton';
import { getPriceSymbol } from '@/lib/utils';

interface BusinessCardProps {
  business: Business;
  horizontal?: boolean;
  citySlug?: string;
}

export function BusinessCard({ business, horizontal = false, citySlug }: BusinessCardProps) {
  const priceSymbol = getPriceSymbol(business.price_min);
  const isPremium = business.is_premium || business.plan === 'premium';
  const isHighlight = (business.is_featured || business.plan === 'highlight') && !isPremium;

  const targetCitySlug =
    citySlug ||
    business.city?.slug ||
    (business.city_id === 'city-atibaia' ? 'atibaia' : business.city_id === 'city-socorro' ? 'socorro' : 'sao-roque');
  const businessHref = `/${targetCitySlug}/empresa/${business.slug}`;
  const cityName =
    business.city?.name ||
    (targetCitySlug === 'atibaia' ? 'Atibaia' : targetCitySlug === 'socorro' ? 'Socorro' : 'São Roque');

  return (
    <div
      className={`group bg-white rounded-3xl border border-[#E7E5DF] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 card-hover flex ${
        horizontal ? 'flex-col sm:flex-row' : 'flex-col'
      }`}
    >
      {/* IMAGE CONTAINER */}
      <div className={`relative overflow-hidden bg-[#F6F0D4] ${horizontal ? 'sm:w-2/5 h-52 sm:h-auto' : 'h-52 w-full'}`}>
        <Image
          src={business.main_image_url || 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80'}
          alt={business.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#071510]/60 via-transparent to-transparent" />

        {/* COMMERCIAL BADGES */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          {isPremium && (
            <span className="inline-flex items-center gap-1 bg-[#F19F14] text-[#071510] text-[11px] font-extrabold px-2.5 py-1 rounded-full shadow-md tracking-wider uppercase border border-[#F19F14]/40">
              <Crown className="w-3 h-3 fill-[#071510]" />
              Parceiro Premium
            </span>
          )}
          {isHighlight && (
            <span className="inline-flex items-center gap-1 bg-[#1B4931] text-[#FFFFFF] text-[11px] font-semibold px-2.5 py-1 rounded-full shadow-md border border-[#1B4931]/50">
              <Sparkles className="w-3 h-3 text-[#F19F14]" />
              Parceiro em Destaque
            </span>
          )}
          {business.category && (
            <span className="bg-white/95 backdrop-blur-md text-[#107492] text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm border border-[#E7E5DF]">
              {business.category.name}
            </span>
          )}
        </div>

        {/* RATING BADGE OVERLAY */}
        <div className="absolute bottom-3 right-3 z-10">
          <RatingBadge rating={business.rating} reviewCount={business.review_count} />
        </div>
      </div>

      {/* BODY CONTENT */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-2">
            <Link href={businessHref} className="group-hover:text-[#107492] transition-colors">
              <h3 className="font-serif text-lg font-bold text-[#26332F] leading-snug line-clamp-1">
                {business.name}
              </h3>
            </Link>
            <span className="text-xs font-semibold text-[#1B4931] bg-[#F6F0D4] px-2 py-0.5 rounded-lg border border-[#E7E5DF] shrink-0">
              {priceSymbol}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-[#26332F]/70">
            <MapPin className="w-3.5 h-3.5 text-[#107492] shrink-0" />
            <span className="line-clamp-1">{business.address}</span>
          </div>

          <p className="text-xs text-[#26332F]/80 line-clamp-2 leading-relaxed pt-1">
            {business.description}
          </p>
        </div>

        {/* ACTIONS */}
        <div className="pt-3 border-t border-[#E7E5DF] flex items-center justify-between gap-2">
          <WhatsAppButton
            phoneOrWhatsapp={business.whatsapp || business.phone}
            businessName={business.name}
            cityName={cityName}
            businessId={business.id}
            variant="secondary"
            className="flex-1 text-xs py-2"
          />

          <Link
            href={businessHref}
            className="inline-flex items-center gap-1 text-xs font-semibold text-[#1B4931] hover:text-[#071510] bg-[#F6F0D4] hover:bg-[#E7E5DF] px-3.5 py-2.5 rounded-xl transition-all"
          >
            <span>Ver detalhes</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#F19F14]" />
          </Link>
        </div>
      </div>
    </div>
  );
}
