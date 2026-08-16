import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Compass, 
  MapPin, 
  Sparkles, 
  Heart, 
  ArrowRight, 
  ChevronRight, 
  Wine, 
  Trees, 
  Utensils, 
  Hotel, 
  Building2, 
  Mountain,
  Waves
} from 'lucide-react';
import { getCities } from '@/lib/services/data';
import { CityCard } from '@/components/tourism/CityCard';
import { constructMetadata } from '@/lib/seo/metadata';

export const metadata = constructMetadata({
  title: 'Descubra Cidades | Descubra lugares. Viva experiências.',
  description: 'Encontre destinos, lugares, experiências, gastronomia, hospedagem e passeios nas melhores cidades turísticas do Brasil.',
});

export const revalidate = 60;

export default async function HomePage() {
  const cities = await getCities();

  const generalCategories = [
    { label: 'Gastronomia & Vinhos', desc: 'Restaurantes, adegas, cafés coloniais e cervejarias', icon: Utensils, bg: 'bg-[#F19F14]/15 text-[#D86E04] border border-[#F19F14]/30' },
    { label: 'Natureza & Mirantes', desc: 'Serras, trilhas, parques ecológicos e cachoeiras', icon: Trees, bg: 'bg-[#1B4931]/10 text-[#1B4931] border border-[#1B4931]/20' },
    { label: 'Turismo de Aventura', desc: 'Rafting, voo livre, tirolesas e esportes ao ar livre', icon: Waves, bg: 'bg-[#107492]/10 text-[#107492] border border-[#107492]/20' },
    { label: 'Hospedagens & Charme', desc: 'Chalés com vista, pousadas românticas e hotéis fazenda', icon: Hotel, bg: 'bg-[#071510]/10 text-[#071510] border border-[#071510]/20' },
  ];

  return (
    <div className="space-y-20 pb-20 bg-[#F6F0D4]">
      
      {/* 1. HERO INSTITUCIONAL DESCUBRA CIDADES */}
      <section className="relative min-h-[640px] sm:min-h-[720px] lg:min-h-[78vh] flex items-center justify-center overflow-hidden bg-[#071510] text-[#FFFFFF]">
        
        {/* HERO PHOTOGRAPHIC COMPOSITION */}
        <Image
          src="/images/hero-sao-roque.webp"
          alt="Destinos turísticos brasileiros, montanhas e paisagens"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-85 transition-all duration-1000 scale-100"
        />

        {/* ELEGANT VERDE PROFUNDO GRADIENT OVERLAY */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(180deg, rgba(7,21,16,0.40) 0%, rgba(7,21,16,0.65) 45%, rgba(7,21,16,0.95) 100%)'
          }}
        />

        <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-8 py-16">
          
          {/* BADGE SUPERIOR */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1B4931]/85 text-[#F19F14] text-xs sm:text-sm font-semibold backdrop-blur-md border border-[#1B4931] shadow-lg">
            <Compass className="w-4 h-4 text-[#F19F14]" aria-hidden="true" />
            <span>Rede de Guias Turísticos & Experiências</span>
          </div>

          {/* TÍTULO HERO COM DESTAQUE EM "DESCUBRA CIDADES" */}
          <div className="space-y-4 max-w-4xl mx-auto">
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#FFFFFF] drop-shadow-md leading-tight">
              Descubra <span className="text-[#F19F14]">Cidades</span>.
            </h1>
            <p className="text-base sm:text-xl lg:text-2xl text-[#F6F0D4] font-serif italic max-w-3xl mx-auto leading-relaxed drop-shadow-sm opacity-95">
              &ldquo;Descubra lugares. Viva experiências.&rdquo;
            </p>
          </div>

          {/* CTAs PRINCIPAL E SECUNDÁRIO */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#destinos"
              className="inline-flex items-center gap-2 bg-[#F19F14] hover:bg-[#D86E04] text-[#071510] hover:text-[#FFFFFF] font-bold text-sm sm:text-base px-8 py-4 rounded-2xl shadow-xl transition-all transform active:scale-95 cursor-pointer"
            >
              <MapPin className="w-4 h-4" aria-hidden="true" />
              <span>Escolher um destino</span>
            </a>

            <a
              href="#como-funciona"
              className="inline-flex items-center gap-2 bg-[#1B4931] hover:bg-[#071510] text-[#FFFFFF] font-semibold text-sm sm:text-base px-6 py-4 rounded-2xl backdrop-blur-md border border-[#1B4931] shadow-lg transition-all cursor-pointer"
            >
              <span>Conheça a plataforma</span>
              <ChevronRight className="w-4 h-4 text-[#F19F14]" aria-hidden="true" />
            </a>
          </div>

          {/* DESTINATIONS QUICK CHIPS */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-3 text-xs">
            <span className="text-[#E7E5DF] font-medium opacity-90">Destinos ativos:</span>
            <Link
              href="/sao-roque"
              className="inline-flex items-center gap-1.5 bg-[#071510]/80 hover:bg-[#1B4931] text-[#FFFFFF] px-3.5 py-1.5 rounded-full border border-white/20 backdrop-blur-md transition-all"
            >
              <Wine className="w-3.5 h-3.5 text-[#F19F14]" aria-hidden="true" />
              <span>São Roque - SP</span>
            </Link>
            <Link
              href="/atibaia"
              className="inline-flex items-center gap-1.5 bg-[#071510]/80 hover:bg-[#1B4931] text-[#FFFFFF] px-3.5 py-1.5 rounded-full border border-white/20 backdrop-blur-md transition-all"
            >
              <Trees className="w-3.5 h-3.5 text-[#F19F14]" aria-hidden="true" />
              <span>Atibaia - SP</span>
            </Link>
            <Link
              href="/socorro"
              className="inline-flex items-center gap-1.5 bg-[#071510]/80 hover:bg-[#1B4931] text-[#FFFFFF] px-3.5 py-1.5 rounded-full border border-white/20 backdrop-blur-md transition-all"
            >
              <Compass className="w-3.5 h-3.5 text-[#F19F14]" aria-hidden="true" />
              <span>Socorro - SP</span>
            </Link>
          </div>

        </div>

        {/* BOTTOM GRADIENT BLEND */}
        <div className="absolute bottom-0 inset-x-0 h-12 bg-gradient-to-t from-[#F6F0D4] to-transparent pointer-events-none" />
      </section>

      {/* 2. SEÇÃO: "ESCOLHA SEU DESTINO" */}
      <section id="destinos" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 scroll-mt-24">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#107492] bg-white px-3 py-1 rounded-full border border-[#E7E5DF]">
            <Compass className="w-3.5 h-3.5 text-[#107492]" aria-hidden="true" />
            <span>Destinos Selecionados</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#26332F]">
            Para onde você quer ir?
          </h2>
          <p className="text-sm sm:text-base text-[#26332F]/80 leading-relaxed">
            Explore cidades turísticas encantadoras, encontre lugares especiais e planeje seu próximo roteiro.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cities.map((city, idx) => (
            <CityCard key={city.id} city={city} priority={idx === 0} />
          ))}
        </div>
      </section>

      {/* 3. SEÇÃO: "COMO FUNCIONA" (3 PASSOS) */}
      <section id="como-funciona" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#E7E5DF] shadow-sm space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold text-[#107492] uppercase tracking-wider block">
              Simples & Completo
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#26332F]">
              Como funciona o Descubra Cidades
            </h2>
            <p className="text-xs sm:text-sm text-[#26332F]/80 leading-relaxed">
              Do planejamento ao passeio, conectamos você aos melhores lugares, experiências e serviços turísticos locais.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="bg-[#F6F0D4] p-6 sm:p-8 rounded-3xl border border-[#E7E5DF] space-y-4 text-center md:text-left relative">
              <span className="font-serif text-4xl font-extrabold text-[#F19F14]/40 block">01</span>
              <div className="w-12 h-12 rounded-2xl bg-[#1B4931] text-[#F19F14] flex items-center justify-center mx-auto md:mx-0 shadow-sm">
                <MapPin className="w-6 h-6" aria-hidden="true" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#26332F]">
                Escolha seu destino
              </h3>
              <p className="text-xs text-[#26332F]/80 leading-relaxed">
                Selecione a cidade que deseja visitar e acesse um guia digital completo, atualizado e categorizado do destino.
              </p>
            </div>

            <div className="bg-[#F6F0D4] p-6 sm:p-8 rounded-3xl border border-[#E7E5DF] space-y-4 text-center md:text-left relative">
              <span className="font-serif text-4xl font-extrabold text-[#F19F14]/40 block">02</span>
              <div className="w-12 h-12 rounded-2xl bg-[#107492] text-[#FFFFFF] flex items-center justify-center mx-auto md:mx-0 shadow-sm">
                <Sparkles className="w-6 h-6 text-[#F19F14]" aria-hidden="true" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#26332F]">
                Encontre o que fazer
              </h3>
              <p className="text-xs text-[#26332F]/80 leading-relaxed">
                Navegue por restaurantes, pousadas, passeios, trilhas, compras locais, experiências exclusivas e eventos.
              </p>
            </div>

            <div className="bg-[#F6F0D4] p-6 sm:p-8 rounded-3xl border border-[#E7E5DF] space-y-4 text-center md:text-left relative">
              <span className="font-serif text-4xl font-extrabold text-[#F19F14]/40 block">03</span>
              <div className="w-12 h-12 rounded-2xl bg-[#F19F14] text-[#071510] flex items-center justify-center mx-auto md:mx-0 shadow-sm">
                <Heart className="w-6 h-6 fill-[#071510]" aria-hidden="true" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#26332F]">
                Viva a experiência
              </h3>
              <p className="text-xs text-[#26332F]/80 leading-relaxed">
                Conecte-se diretamente com os estabelecimentos pelo WhatsApp oficial, agende seu passeio e aproveite cada momento.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 4. SEÇÃO: "ENCONTRE O QUE VOCÊ PROCURA" */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E7E5DF] pb-4">
          <div>
            <h2 className="font-serif text-3xl font-bold text-[#26332F]">
              Encontre o que você procura
            </h2>
            <p className="text-xs text-[#26332F]/80">
              Categorias organizadas para facilitar o planejamento da sua viagem
            </p>
          </div>
          <a
            href="#destinos"
            className="inline-flex items-center gap-1 text-xs font-bold text-[#107492] hover:text-[#D86E04] transition-colors"
          >
            <span>Ver destinos</span>
            <ChevronRight className="w-4 h-4" aria-hidden="true" />
          </a>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {generalCategories.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="bg-white rounded-3xl p-5 border border-[#E7E5DF] shadow-2xs hover:shadow-md transition-all space-y-3 group"
              >
                <div className={`w-11 h-11 rounded-2xl flex items-center justify-center ${item.bg}`}>
                  <Icon className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-serif text-base font-bold text-[#26332F] group-hover:text-[#107492] transition-colors">
                    {item.label}
                  </h3>
                  <p className="text-[11px] text-[#26332F]/70 leading-relaxed mt-1 line-clamp-2">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. SEÇÃO: "DESTINOS EM DESTAQUE" */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-[#107492] uppercase tracking-wider block">
            Destaques Regionais
          </span>
          <h2 className="font-serif text-3xl font-bold text-[#26332F]">
            Destinos para Começar sua Descoberta
          </h2>
          <p className="text-xs sm:text-sm text-[#26332F]/80">
            Experiências autênticas para curtir no final de semana, feriados ou férias.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* DESTAQUE SÃO ROQUE */}
          <div className="bg-[#071510] text-[#FFFFFF] rounded-3xl p-8 border border-[#1B4931]/50 shadow-xl flex flex-col justify-between space-y-6 relative overflow-hidden">
            <div className="space-y-4 relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1B4931] text-[#F19F14] text-xs font-bold border border-[#1B4931]">
                <Wine className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Roteiro do Vinho & Gastronomia</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#FFFFFF]">
                São Roque
              </h3>
              <p className="text-xs sm:text-sm text-[#E7E5DF] leading-relaxed">
                Vinhos artesanais, alta gastronomia portuguesa e italiana, pisa da uva nos parreirais históricos a apenas 60 km de São Paulo.
              </p>
            </div>

            <div className="pt-4 border-t border-[#1B4931]/40 relative z-10">
              <Link
                href="/sao-roque"
                className="inline-flex items-center gap-2 bg-[#F19F14] hover:bg-[#D86E04] text-[#071510] hover:text-[#FFFFFF] font-bold text-xs px-6 py-3 rounded-xl shadow-md transition-all"
              >
                <span>Descobrir São Roque</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </div>

          {/* DESTAQUE ATIBAIA */}
          <div className="bg-[#071510] text-[#FFFFFF] rounded-3xl p-8 border border-[#1B4931]/50 shadow-xl flex flex-col justify-between space-y-6 relative overflow-hidden">
            <div className="space-y-4 relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#107492] text-[#FFFFFF] text-xs font-bold border border-[#107492]">
                <Mountain className="w-3.5 h-3.5 text-[#F19F14]" aria-hidden="true" />
                <span>Pedra Grande & Morangos</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#FFFFFF]">
                Atibaia
              </h3>
              <p className="text-xs sm:text-sm text-[#E7E5DF] leading-relaxed">
                Voo livre de parapente na Pedra Grande, colheita de morangos em estufas, parques floridos e cervejarias da Mantiqueira.
              </p>
            </div>

            <div className="pt-4 border-t border-[#1B4931]/40 relative z-10">
              <Link
                href="/atibaia"
                className="inline-flex items-center gap-2 bg-[#F19F14] hover:bg-[#D86E04] text-[#071510] hover:text-[#FFFFFF] font-bold text-xs px-6 py-3 rounded-xl shadow-md transition-all"
              >
                <span>Descobrir Atibaia</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </div>

          {/* DESTAQUE SOCORRO */}
          <div className="bg-[#071510] text-[#FFFFFF] rounded-3xl p-8 border border-[#1B4931]/50 shadow-xl flex flex-col justify-between space-y-6 relative overflow-hidden">
            <div className="space-y-4 relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1B4931] text-[#F19F14] text-xs font-bold border border-[#1B4931]">
                <Waves className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Aventura, Rafting & Malhas</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#FFFFFF]">
                Socorro
              </h3>
              <p className="text-xs sm:text-sm text-[#E7E5DF] leading-relaxed">
                Rafting emocionante no Rio do Peixe, pôr do sol na Pedra Bela Vista com Pan de Palo, comida caipira e compras de malhas.
              </p>
            </div>

            <div className="pt-4 border-t border-[#1B4931]/40 relative z-10">
              <Link
                href="/socorro"
                className="inline-flex items-center gap-2 bg-[#F19F14] hover:bg-[#D86E04] text-[#071510] hover:text-[#FFFFFF] font-bold text-xs px-6 py-3 rounded-xl shadow-md transition-all"
              >
                <span>Descobrir Socorro</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* 6. SEÇÃO: "PARA EMPRESAS" */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#071510] text-[#FFFFFF] rounded-3xl p-8 sm:p-12 border border-[#1B4931]/50 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 text-center md:text-left max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1B4931] text-[#F19F14] text-xs font-bold border border-[#1B4931]">
              <Building2 className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Portal de Anunciantes & Parceiros</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold leading-snug">
              Seu negócio turístico no Descubra Cidades.
            </h2>
            <p className="text-xs sm:text-base text-[#E7E5DF] leading-relaxed">
              Conecte seu restaurante, pousada, agência ou atração turística a milhares de visitantes que planejam viagens pelas melhores cidades do Brasil.
            </p>
          </div>

          <div className="shrink-0 flex flex-col gap-3 w-full sm:w-auto">
            <Link
              href="/para-empresas"
              className="inline-flex items-center justify-center gap-2 bg-[#F19F14] hover:bg-[#D86E04] text-[#071510] hover:text-[#FFFFFF] font-bold text-sm px-8 py-4 rounded-2xl shadow-xl transition-all transform active:scale-95 text-center"
            >
              <span>Quero anunciar minha empresa</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
