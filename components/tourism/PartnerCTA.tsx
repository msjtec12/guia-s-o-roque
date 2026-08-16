import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Building2, ArrowRight, CheckCircle2 } from 'lucide-react';

interface PartnerCTAProps {
  cityName?: string;
}

export function PartnerCTA({ cityName }: PartnerCTAProps) {
  const cityDisplayName = cityName || 'São Roque';

  return (
    <section className="relative overflow-hidden rounded-3xl bg-[#183A32] text-[#FCFAF5] p-8 sm:p-12 shadow-2xl border border-[#245247]">
      {/* REALISTIC PHOTO BACKGROUND WITH VERDE MATA OVERLAY */}
      <Image
        src="/images/banner-parceiros.jpg"
        alt={`Comércio e turismo em ${cityDisplayName}`}
        fill
        className="object-cover object-center opacity-30 transition-transform duration-1000"
        sizes="(max-width: 1200px) 100vw, 1200px"
      />
      
      {/* GRADIENT OVERLAY FOR MAXIMUM LEGIBILITY */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, rgba(24,58,50,0.92) 0%, rgba(24,58,50,0.85) 50%, rgba(24,58,50,0.65) 100%)'
        }}
      />

      {/* DECORATIVE BLUR ORBS */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#D49A3A]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-[#722F3E]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-4 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#245247]/90 text-[#D49A3A] text-xs font-semibold border border-[#82967A]/40 backdrop-blur-md shadow-md">
            <Building2 className="w-3.5 h-3.5 text-[#D49A3A]" />
            <span>Para Estabelecimentos de {cityDisplayName}</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold leading-snug drop-shadow-md">
            Tem um negócio em {cityDisplayName}?
          </h2>
          <p className="text-sm sm:text-base text-[#F4EBDD] max-w-xl leading-relaxed">
            Coloque sua empresa no principal guia digital de experiências da cidade. Aumente sua visibilidade e receba contatos diretos no seu WhatsApp.
          </p>

          <div className="flex flex-wrap gap-4 justify-center md:justify-start pt-2 text-xs font-medium text-[#F4EBDD]">
            <span className="flex items-center gap-1.5 bg-black/25 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
              <CheckCircle2 className="w-4 h-4 text-[#D49A3A]" />
              Presença Profissional
            </span>
            <span className="flex items-center gap-1.5 bg-black/25 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
              <CheckCircle2 className="w-4 h-4 text-[#D49A3A]" />
              Contatos pelo WhatsApp
            </span>
            <span className="flex items-center gap-1.5 bg-black/25 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
              <CheckCircle2 className="w-4 h-4 text-[#D49A3A]" />
              Planos sem fidelidade
            </span>
          </div>
        </div>

        <div className="shrink-0 flex flex-col sm:flex-row md:flex-col gap-3 w-full md:w-auto">
          <Link
            href="/para-empresas"
            className="inline-flex items-center justify-center gap-2 bg-[#D49A3A] hover:bg-[#c28c32] text-[#26332F] font-bold text-sm px-7 py-4 rounded-2xl shadow-xl transition-all transform active:scale-95 text-center"
          >
            <span>Quero Anunciar</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/cadastro-parceiro"
            className="inline-flex items-center justify-center text-xs text-[#F4EBDD] hover:text-[#D49A3A] underline py-2 text-center"
          >
            Cadastrar proposta direta
          </Link>
        </div>
      </div>
    </section>
  );
}
