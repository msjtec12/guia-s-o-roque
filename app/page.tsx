import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Compass, 
  Sparkles, 
  MapPin, 
  Heart,
  Users,
  Utensils, 
  Hotel, 
  Trees, 
  Bus, 
  Landmark, 
  ShoppingBag, 
  ArrowRight,
  ChevronRight,
  Wine,
  Building2,
  Mountain
} from 'lucide-react';
import { getCities } from '@/lib/services/data';
import { CityCard } from '@/components/tourism/CityCard';
import { constructMetadata } from '@/lib/seo/metadata';

export const metadata = constructMetadata({
  title: 'Descubra | Destinos, lugares e experiências',
  description: 'Encontre destinos, lugares, experiências, gastronomia, hospedagem e passeios.',
});

export const revalidate = 60;

export default async function InstitutionalHomePage() {
  const cities = await getCities();

  const generalCategories = [
    { label: 'Gastronomia', icon: Utensils, desc: 'Restaurantes, vinícolas, cafés e sabores regionais', bg: 'bg-[#B86F52]/10 text-[#B86F52] border-[#B86F52]/20' },
    { label: 'Hospedagem', icon: Hotel, desc: 'Hotéis fazenda, resorts, chalés e pousadas de charme', bg: 'bg-[#183A32]/10 text-[#183A32] border-[#183A32]/20' },
    { label: 'Natureza', icon: Trees, desc: 'Parques ecológicos, mirantes, cachoeiras e ar puro', bg: 'bg-[#82967A]/15 text-[#183A32] border-[#82967A]/30' },
    { label: 'Passeios', icon: Bus, desc: 'Trens turísticos, teleféricos, agências e transporte local', bg: 'bg-[#D49A3A]/15 text-[#26332F] border-[#D49A3A]/30' },
    { label: 'Cultura', icon: Landmark, desc: 'Patrimônio histórico, casarões coloniais e manifestações', bg: 'bg-[#F4EBDD] text-[#26332F] border-[#e6dfd4]' },
    { label: 'Compras', icon: ShoppingBag, desc: 'Empórios artesanais, doces típicos, queijos e flores', bg: 'bg-[#722F3E]/10 text-[#722F3E] border-[#722F3E]/20' },
    { label: 'Romântico', icon: Heart, desc: 'Experiências a dois, jantares à luz de velas e lareira', bg: 'bg-[#722F3E]/10 text-[#722F3E] border-[#722F3E]/20' },
    { label: 'Família', icon: Users, desc: 'Atrações infantis, fazendinhas, lagos e parquinhos', bg: 'bg-[#183A32]/10 text-[#183A32] border-[#183A32]/20' },
  ];

  return (
    <div className="space-y-20 pb-20 bg-[#FCFAF5]">
      
      {/* 1. HERO INSTITUCIONAL DESCUBRA */}
      <section className="relative min-h-[640px] sm:min-h-[720px] lg:min-h-[78vh] flex items-center justify-center overflow-hidden bg-[#183A32] text-[#FCFAF5]">
        
        {/* HERO PHOTOGRAPHIC COMPOSITION */}
        <Image
          src="/images/hero-sao-roque.webp"
          alt="Destinos turísticos brasileiros, montanhas e paisagens"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-90 transition-all duration-1000 scale-100"
        />

        {/* ELEGANT DARK GRADIENT OVERLAY */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(180deg, rgba(24,58,50,0.40) 0%, rgba(24,58,50,0.65) 45%, rgba(24,58,50,0.92) 100%)'
          }}
        />

        <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-8 py-16">
          
          {/* BADGE SUPERIOR */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#183A32]/85 text-[#FCFAF5] text-xs sm:text-sm font-medium backdrop-blur-md border border-white/20 shadow-lg">
            <Compass className="w-4 h-4 text-[#D49A3A]" aria-hidden="true" />
            <span>Rede de Guias Turísticos Digitais</span>
          </div>

          {/* TÍTULO HERO COM DESTAQUE EM "DESCUBRA" */}
          <div className="space-y-4 max-w-4xl mx-auto">
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#FCFAF5] drop-shadow-md leading-tight">
              <span className="text-[#D49A3A]">Descubra</span> novos destinos.
            </h1>
            <p className="text-base sm:text-xl lg:text-2xl text-[#F4EBDD] font-serif italic max-w-3xl mx-auto leading-relaxed drop-shadow-sm opacity-95">
              &ldquo;Lugares, experiências, sabores e histórias para você viver cada destino.&rdquo;
            </p>
          </div>

          {/* CTAs PRINCIPAL E SECUNDÁRIO */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#destinos"
              className="inline-flex items-center gap-2 bg-[#D49A3A] hover:bg-[#c28c32] text-[#26332F] font-bold text-sm sm:text-base px-8 py-4 rounded-2xl shadow-xl transition-all transform active:scale-95"
            >
              <MapPin className="w-4 h-4 text-[#26332F]" aria-hidden="true" />
              <span>Escolher um destino</span>
            </a>

            <a
              href="#como-funciona"
              className="inline-flex items-center gap-2 bg-[#183A32]/80 hover:bg-[#245247] text-[#FCFAF5] font-semibold text-sm sm:text-base px-6 py-4 rounded-2xl backdrop-blur-md border border-white/20 shadow-lg transition-all"
            >
              <span>Conheça a plataforma</span>
              <ChevronRight className="w-4 h-4 text-[#D49A3A]" aria-hidden="true" />
            </a>
          </div>

          {/* DESTINATIONS QUICK CHIPS */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-3 text-xs">
            <span className="text-[#F4EBDD] font-medium opacity-90">Destinos ativos:</span>
            <Link
              href="/sao-roque"
              className="inline-flex items-center gap-1.5 bg-black/40 hover:bg-black/60 text-[#FCFAF5] px-3.5 py-1.5 rounded-full border border-white/20 backdrop-blur-md transition-all"
            >
              <Wine className="w-3.5 h-3.5 text-[#D49A3A]" aria-hidden="true" />
              <span>São Roque - SP</span>
            </Link>
            <Link
              href="/atibaia"
              className="inline-flex items-center gap-1.5 bg-black/40 hover:bg-black/60 text-[#FCFAF5] px-3.5 py-1.5 rounded-full border border-white/20 backdrop-blur-md transition-all"
            >
              <Trees className="w-3.5 h-3.5 text-[#D49A3A]" aria-hidden="true" />
              <span>Atibaia - SP</span>
            </Link>
            <Link
              href="/socorro"
              className="inline-flex items-center gap-1.5 bg-black/40 hover:bg-black/60 text-[#FCFAF5] px-3.5 py-1.5 rounded-full border border-white/20 backdrop-blur-md transition-all"
            >
              <Compass className="w-3.5 h-3.5 text-[#D49A3A]" aria-hidden="true" />
              <span>Socorro - SP</span>
            </Link>
          </div>

        </div>

        {/* BOTTOM GRADIENT BLEND */}
        <div className="absolute bottom-0 inset-x-0 h-12 bg-gradient-to-t from-[#FCFAF5] to-transparent pointer-events-none" />
      </section>

      {/* 2. SEÇÃO: "ESCOLHA SEU DESTINO" (PARA ONDE VOCÊ QUER IR?) */}
      <section id="destinos" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 scroll-mt-24">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#183A32] bg-[#F4EBDD] px-3 py-1 rounded-full border border-[#e6dfd4]">
            <Compass className="w-3.5 h-3.5 text-[#183A32]" aria-hidden="true" />
            <span>Destinos Selecionados</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#26332F]">
            Para onde você quer ir?
          </h2>
          <p className="text-sm sm:text-base text-[#52615B] leading-relaxed">
            Explore destinos, encontre lugares especiais e monte seu próximo roteiro.
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
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#e6dfd4] shadow-sm space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold text-[#82967A] uppercase tracking-wider block">
              Simples & Completo
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#26332F]">
              Como funciona o Descubra
            </h2>
            <p className="text-xs sm:text-sm text-[#52615B] leading-relaxed">
              Do planejamento ao passeio, o Descubra ajuda você a encontrar lugares, experiências e serviços locais.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="bg-[#FCFAF5] p-6 sm:p-8 rounded-2xl border border-[#e6dfd4] space-y-4 text-center md:text-left relative">
              <span className="font-serif text-4xl font-extrabold text-[#D49A3A]/40 block">01</span>
              <div className="w-12 h-12 rounded-xl bg-[#183A32] text-[#D49A3A] flex items-center justify-center mx-auto md:mx-0 shadow-sm">
                <MapPin className="w-6 h-6" aria-hidden="true" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#26332F]">
                Escolha seu destino
              </h3>
              <p className="text-xs text-[#52615B] leading-relaxed">
                Selecione a cidade que você deseja visitar e acesse um guia digital completo e atualizado do destino.
              </p>
            </div>

            <div className="bg-[#FCFAF5] p-6 sm:p-8 rounded-2xl border border-[#e6dfd4] space-y-4 text-center md:text-left relative">
              <span className="font-serif text-4xl font-extrabold text-[#D49A3A]/40 block">02</span>
              <div className="w-12 h-12 rounded-xl bg-[#722F3E] text-[#FCFAF5] flex items-center justify-center mx-auto md:mx-0 shadow-sm">
                <Sparkles className="w-6 h-6 text-[#D49A3A]" aria-hidden="true" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#26332F]">
                Encontre o que fazer
              </h3>
              <p className="text-xs text-[#52615B] leading-relaxed">
                Navegue por restaurantes, vinícolas, passeios, hospedagens, experiências exclusivas e eventos locais.
              </p>
            </div>

            <div className="bg-[#FCFAF5] p-6 sm:p-8 rounded-2xl border border-[#e6dfd4] space-y-4 text-center md:text-left relative">
              <span className="font-serif text-4xl font-extrabold text-[#D49A3A]/40 block">03</span>
              <div className="w-12 h-12 rounded-xl bg-[#D49A3A] text-[#26332F] flex items-center justify-center mx-auto md:mx-0 shadow-sm">
                <Heart className="w-6 h-6 fill-[#26332F]" aria-hidden="true" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#26332F]">
                Viva a experiência
              </h3>
              <p className="text-xs text-[#52615B] leading-relaxed">
                Conecte-se diretamente com os estabelecimentos pelo WhatsApp oficial e aproveite cada momento.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 4. SEÇÃO: "ENCONTRE O QUE VOCÊ PROCURA" (CATEGORIAS GERAIS INDUSTRIAIS EDITORIAL) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#e6dfd4] pb-4">
          <div>
            <h2 className="font-serif text-3xl font-bold text-[#26332F]">
              Encontre o que você procura
            </h2>
            <p className="text-xs text-[#52615B]">
              Categorias organizadas para facilitar o planejamento da sua viagem
            </p>
          </div>
          <a
            href="#destinos"
            className="inline-flex items-center gap-1 text-xs font-bold text-[#183A32] hover:text-[#722F3E] transition-colors"
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
                className="bg-white rounded-2xl p-5 border border-[#e6dfd4] shadow-2xs hover:shadow-md transition-all space-y-3 group"
              >
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${item.bg}`}>
                  <Icon className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-serif text-base font-bold text-[#26332F] group-hover:text-[#183A32] transition-colors">
                    {item.label}
                  </h3>
                  <p className="text-[11px] text-[#52615B] leading-relaxed mt-1 line-clamp-2">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. SEÇÃO: "DOIS DESTINOS PARA COMEÇAR" (DESTAQUES EDITORIAIS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-[#82967A] uppercase tracking-wider block">
            Destaques Regionais
          </span>
          <h2 className="font-serif text-3xl font-bold text-[#26332F]">
            Dois destinos para começar
          </h2>
          <p className="text-xs sm:text-sm text-[#52615B]">
            Experiências autênticas perto de você para curtir no final de semana ou nas férias.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* DESTAQUE SÃO ROQUE */}
          <div className="bg-[#183A32] text-[#FCFAF5] rounded-3xl p-8 sm:p-10 border border-[#245247] shadow-xl flex flex-col justify-between space-y-6 relative overflow-hidden">
            <div className="space-y-4 relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#722F3E] text-[#FCFAF5] text-xs font-bold">
                <Wine className="w-3.5 h-3.5 text-[#D49A3A]" aria-hidden="true" />
                <span>Roteiro do Vinho & Gastronomia</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#FCFAF5]">
                São Roque
              </h3>
              <p className="text-xs sm:text-sm text-[#F4EBDD] leading-relaxed">
                Vinhos, gastronomia e experiências. Conheça vinícolas históricas, culinária portuguesa e italiana, pisa da uva e belos parreirais a apenas 60 km da capital.
              </p>
            </div>

            <div className="pt-4 border-t border-[#245247] relative z-10">
              <Link
                href="/sao-roque"
                className="inline-flex items-center gap-2 bg-[#D49A3A] hover:bg-[#c28c32] text-[#26332F] font-bold text-xs px-6 py-3 rounded-xl shadow-md transition-all"
              >
                <span>Descobrir São Roque</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </div>

          {/* DESTAQUE ATIBAIA */}
          <div className="bg-[#183A32] text-[#FCFAF5] rounded-3xl p-8 sm:p-10 border border-[#245247] shadow-xl flex flex-col justify-between space-y-6 relative overflow-hidden">
            <div className="space-y-4 relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#245247] text-[#D49A3A] text-xs font-bold border border-[#82967A]/40">
                <Mountain className="w-3.5 h-3.5 text-[#D49A3A]" aria-hidden="true" />
                <span>Pedra Grande & Aventura</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#FCFAF5]">
                Atibaia
              </h3>
              <p className="text-xs sm:text-sm text-[#F4EBDD] leading-relaxed">
                Natureza, aventura e gastronomia. Voo livre de parapente da Pedra Grande, colheita de morangos, teleférico, cervejas artesanais e clima serrano.
              </p>
            </div>

            <div className="pt-4 border-t border-[#245247] relative z-10">
              <Link
                href="/atibaia"
                className="inline-flex items-center gap-2 bg-[#D49A3A] hover:bg-[#c28c32] text-[#26332F] font-bold text-xs px-6 py-3 rounded-xl shadow-md transition-all"
              >
                <span>Descobrir Atibaia</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* 6. SEÇÃO: "PARA EMPRESAS" (PORTAL COMERCIAL MULTICIDADE) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#722F3E] text-[#FCFAF5] rounded-3xl p-8 sm:p-12 border border-[#8d3d4e] shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 text-center md:text-left max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#8d3d4e] text-[#D49A3A] text-xs font-bold border border-white/20">
              <Building2 className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Portal para Anunciantes</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold leading-snug">
              Seu negócio também pode fazer parte do Descubra.
            </h2>
            <p className="text-xs sm:text-base text-[#F4EBDD] leading-relaxed">
              Conecte sua empresa a pessoas que estão planejando o que fazer, onde comer, onde ficar e quais experiências viver em São Roque e Atibaia.
            </p>
          </div>

          <div className="shrink-0 flex flex-col gap-3 w-full sm:w-auto">
            <Link
              href="/para-empresas"
              className="inline-flex items-center justify-center gap-2 bg-[#D49A3A] hover:bg-[#c28c32] text-[#26332F] font-bold text-sm px-8 py-4 rounded-2xl shadow-xl transition-all transform active:scale-95 text-center"
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
