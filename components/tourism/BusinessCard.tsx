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

  const targetCitySlug = citySlug || business.city?.slug || (business.city_id === 'city-atibaia' ? 'atibaia' : 'sao-roque');
  const businessHref = `/${targetCitySlug}/empresa/${business.slug}`;
  const cityName = business.city?.name || (targetCitySlug === 'atibaia' ? 'Atibaia' : 'São Roque');

  return (
    <div
      className={`group bg-white rounded-2xl border border-[#e6dfd4] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 card-hover flex ${
        horizontal ? 'flex-col sm:flex-row' : 'flex-col'
      }`}
    >
      {/* IMAGE CONTAINER */}
      <div className={`relative overflow-hidden bg-[#FCFAF5] ${horizontal ? 'sm:w-2/5 h-52 sm:h-auto' : 'h-52 w-full'}`}>
        <Image
          src={business.main_image_url || 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80'}
          alt={business.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#26332F]/50 via-transparent to-transparent" />

        {/* COMMERCIAL TRANSPARENT BADGES */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          {isPremium && (
            <span className="inline-flex items-center gap-1 bg-[#D49A3A] text-[#26332F] text-[11px] font-extrabold px-2.5 py-1 rounded-full shadow-md tracking-wider uppercase border border-[#D49A3A]/40">
              <Crown className="w-3 h-3 fill-[#26332F]" />
              Parceiro Premium
            </span>
          )}
          {isHighlight && (
            <span className="inline-flex items-center gap-1 bg-[#183A32] text-[#FCFAF5] text-[11px] font-semibold px-2.5 py-1 rounded-full shadow-md border border-[#245247]">
              <Sparkles className="w-3 h-3 text-[#D49A3A]" />
              Parceiro em Destaque
            </span>
          )}
          {business.category && (
            <span className="bg-[#FCFAF5]/95 backdrop-blur-md text-[#722F3E] text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm border border-[#e6dfd4]">
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
            <Link href={businessHref} className="group-hover:text-[#183A32] transition-colors">
              <h3 className="font-serif text-lg font-bold text-[#26332F] leading-snug line-clamp-1">
                {business.name}
              </h3>
            </Link>
            <span className="text-xs font-semibold text-[#183A32] bg-[#F4EBDD] px-2 py-0.5 rounded border border-[#e6dfd4] shrink-0">
              {priceSymbol}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-[#52615B]">
            <MapPin className="w-3.5 h-3.5 text-[#183A32] shrink-0" />
            <span className="line-clamp-1">{business.address}</span>
          </div>

          <p className="text-xs text-[#52615B] line-clamp-2 leading-relaxed pt-1">
            {business.description}
          </p>
        </div>

        {/* ACTIONS */}
        <div className="pt-3 border-t border-[#F4EBDD] flex items-center justify-between gap-2">
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
            className="inline-flex items-center gap-1 text-xs font-semibold text-[#183A32] hover:text-[#722F3E] bg-[#F4EBDD] hover:bg-[#e8dbca] px-3.5 py-2.5 rounded-xl transition-all"
          >
            <span>Ver detalhes</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
