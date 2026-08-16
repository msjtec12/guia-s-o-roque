import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Wine, 
  Sparkles, 
  Utensils, 
  ShoppingBag, 
  Landmark, 
  Compass, 
  Heart,
  Users,
  Trees,
  Bus,
  ChevronRight
} from 'lucide-react';
import { 
  getCategories, 
  getBusinesses, 
  getExperiences, 
  getRoutes, 
  getEvents 
} from '@/lib/services/data';
import { CategoryCard } from '@/components/tourism/CategoryCard';
import { BusinessCard } from '@/components/tourism/BusinessCard';
import { ExperienceCard } from '@/components/tourism/ExperienceCard';
import { RouteCard } from '@/components/tourism/RouteCard';
import { EventCard } from '@/components/tourism/EventCard';
import { SearchBar } from '@/components/filters/SearchBar';
import { PartnerCTA } from '@/components/tourism/PartnerCTA';
import { constructMetadata } from '@/lib/seo/metadata';

export const metadata = constructMetadata({
  citySlug: 'sao-roque',
});

export const revalidate = 60;

export default async function SaoRoqueHomePage() {
  const [categories, businesses, experiences, routes, events] = await Promise.all([
    getCategories('sao-roque'),
    getBusinesses({ citySlug: 'sao-roque' }),
    getExperiences(true, 'sao-roque'),
    getRoutes('sao-roque'),
    getEvents('sao-roque'),
  ]);

  const gastronomyBusinesses = businesses.filter(
    (b) => b.category?.slug === 'restaurantes' || b.category?.slug === 'vinicolas-adegas'
  ).slice(0, 3);

  const quickExperienceTypes = [
    { label: 'Roteiro do Vinho & Degustações', icon: Wine, href: '/sao-roque/explorar?category=vinicolas-adegas', bg: 'bg-[#F19F14]/15 text-[#D86E04] border-[#F19F14]/30' },
    { label: 'Passeio a Dois / Casais', icon: Heart, href: '/sao-roque/explorar?tag=romantico', bg: 'bg-[#1B4931]/10 text-[#1B4931] border-[#1B4931]/20' },
    { label: 'Passeio em Família', icon: Users, href: '/sao-roque/explorar?tag=familia', bg: 'bg-white text-[#26332F] border-[#E7E5DF]' },
    { label: 'Natureza & Ar Livre', icon: Trees, href: '/sao-roque/explorar?category=natureza-trilhas', bg: 'bg-[#107492]/10 text-[#107492] border-[#107492]/20' },
    { label: 'Passeios & Agências', icon: Bus, href: '/sao-roque/explorar?category=passeios-agencias', bg: 'bg-white text-[#26332F] border-[#E7E5DF]' },
    { label: 'Restaurantes & Cafés', icon: Utensils, href: '/sao-roque/explorar?category=restaurantes', bg: 'bg-[#F19F14]/15 text-[#D86E04] border-[#F19F14]/30' },
    { label: 'Compras & Doces', icon: ShoppingBag, href: '/sao-roque/explorar?category=compras-doces', bg: 'bg-white text-[#26332F] border-[#E7E5DF]' },
    { label: 'Cultura & História', icon: Landmark, href: '/sao-roque/explorar?category=cultura-historia', bg: 'bg-white text-[#26332F] border-[#E7E5DF]' },
  ];

  return (
    <div className="space-y-16 pb-20 bg-[#F6F0D4]">
      
      {/* 1. HERO SECTION SÃO ROQUE */}
      <section className="relative min-h-[620px] sm:min-h-[670px] lg:min-h-[70vh] flex items-center justify-center overflow-hidden bg-[#071510] text-[#FFFFFF]">
        
        <Image
          src="/images/hero-sao-roque.webp"
          alt="Paisagem de vinhedos e natureza de São Roque, São Paulo"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[60%_center] sm:object-center opacity-90 transition-all duration-1000"
        />

        {/* ELEGANT VERDE PROFUNDO OVERLAY GRADIENT */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(180deg, rgba(7,21,16,0.30) 0%, rgba(7,21,16,0.55) 50%, rgba(7,21,16,0.92) 100%)'
          }}
        />

        <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-6 sm:space-y-8 py-12 sm:py-16">
          
          {/* BADGE SUPERIOR */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1B4931]/85 text-[#F19F14] text-xs sm:text-sm font-semibold backdrop-blur-md border border-[#1B4931] shadow-lg">
            <Wine className="w-4 h-4 text-[#F19F14]" aria-hidden="true" />
            <span>Estância Turística de São Roque - SP</span>
          </div>

          {/* TÍTULO HERO */}
          <div className="space-y-3 sm:space-y-4">
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#FFFFFF] drop-shadow-md leading-tight">
              Descubra <span className="text-[#F19F14]">São Roque</span>
            </h1>
            <p className="text-base sm:text-xl lg:text-2xl text-[#F6F0D4] font-serif italic max-w-2xl mx-auto leading-relaxed drop-shadow-sm opacity-95">
              &ldquo;Vinhos, gastronomia, parreirais históricos e experiências a poucos quilômetros da capital.&rdquo;
            </p>
          </div>

          {/* BARRA DE PESQUISA CENTRAL */}
          <div className="w-full max-w-2xl mx-auto space-y-4 px-2 sm:px-0">
            <SearchBar 
              placeholder="O que você quer descobrir em São Roque? Ex.: vinícolas, restaurantes, passeios..." 
              basePath="/sao-roque/explorar"
            />

            {/* ATALHOS POPULARES */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-1 text-xs">
              <span className="text-[#FFFFFF] font-medium drop-shadow-xs shrink-0">Buscas populares:</span>
              
              <Link href="/sao-roque/explorar?category=vinicolas-adegas" className="inline-flex items-center gap-1.5 bg-black/35 hover:bg-black/55 text-[#FFFFFF] backdrop-blur-md px-3 py-1 rounded-full border border-white/25 transition-all">
                <Wine className="w-3.5 h-3.5 text-[#F19F14]" aria-hidden="true" />
                <span>Vinícolas</span>
              </Link>

              <Link href="/sao-roque/explorar?category=restaurantes" className="inline-flex items-center gap-1.5 bg-black/35 hover:bg-black/55 text-[#FFFFFF] backdrop-blur-md px-3 py-1 rounded-full border border-white/25 transition-all">
                <Utensils className="w-3.5 h-3.5 text-[#F19F14]" aria-hidden="true" />
                <span>Restaurantes</span>
              </Link>

              <Link href="/sao-roque/explorar?category=passeios-agencias" className="inline-flex items-center gap-1.5 bg-black/35 hover:bg-black/55 text-[#FFFFFF] backdrop-blur-md px-3 py-1 rounded-full border border-white/25 transition-all">
                <Compass className="w-3.5 h-3.5 text-[#F19F14]" aria-hidden="true" />
                <span>Roteiro do Vinho</span>
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* 2. ATALHOS RÁPIDOS DE CATEGORIAS / EXPERIÊNCIAS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-4">
          <div className="text-center sm:text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-[#107492] block">
              Planeje por Tipo de Passeio
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#26332F]">
              O que você quer viver hoje em São Roque?
            </h2>
          </div>

          <div className="flex items-center gap-3 overflow-x-auto pb-4 pt-2 no-scrollbar scroll-smooth">
            {quickExperienceTypes.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold whitespace-nowrap border shadow-2xs hover:shadow-md transition-all shrink-0 hover:scale-105 active:scale-95 ${item.bg}`}
                >
                  <Icon className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span className="text-xs font-bold leading-tight">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. CATEGORIAS DE DESTAQUE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E7E5DF] pb-4">
          <div>
            <h2 className="font-serif text-3xl font-bold text-[#26332F]">
              Explore por Categoria
            </h2>
            <p className="text-xs text-[#26332F]/70">
              Encontre vinícolas, gastronomia, hospedagem e atrações em São Roque
            </p>
          </div>
          <Link
            href="/sao-roque/explorar"
            className="inline-flex items-center gap-1 text-xs font-bold text-[#107492] hover:text-[#D86E04] transition-colors"
          >
            <span>Ver todas</span>
            <ChevronRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.slice(0, 4).map((cat) => (
            <CategoryCard key={cat.id} category={cat} citySlug="sao-roque" />
          ))}
        </div>
      </section>

      {/* 4. EXPERIÊNCIAS TURÍSTICAS EM DESTAQUE */}
      {experiences.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E7E5DF] pb-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#107492] bg-white px-3 py-1 rounded-full mb-2 border border-[#E7E5DF]">
                <Wine className="w-3.5 h-3.5 text-[#F19F14]" aria-hidden="true" />
                <span>Imperdível em São Roque</span>
              </div>
              <h2 className="font-serif text-3xl font-bold text-[#26332F]">
                Experiências Marcantes
              </h2>
            </div>
            <Link
              href="/sao-roque/experiencias"
              className="inline-flex items-center gap-1 text-xs font-bold text-[#107492] hover:text-[#D86E04] transition-colors"
            >
              <span>Ver todas as experiências</span>
              <ChevronRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {experiences.slice(0, 3).map((exp) => (
              <ExperienceCard key={exp.id} experience={exp} citySlug="sao-roque" />
            ))}
          </div>
        </section>
      )}

      {/* 5. MONTE SEU ROTEIRO CTA WIZARD */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#071510] text-[#FFFFFF] rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-2xl border border-[#1B4931]/50">
          <Image
            src="/images/banner-roteiro.jpg"
            alt="Casal desfrutando de vinho e gastronomia nos vinhedos de São Roque"
            fill
            className="object-cover object-center opacity-30 transition-transform duration-1000"
            sizes="(max-width: 1200px) 100vw, 1200px"
          />

          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(90deg, rgba(7,21,16,0.95) 0%, rgba(7,21,16,0.85) 50%, rgba(7,21,16,0.55) 100%)'
            }}
          />

          <div className="relative z-10 max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-2 bg-[#F19F14] text-[#071510] font-extrabold text-xs px-3.5 py-1.5 rounded-full shadow-md">
              <Compass className="w-4 h-4 text-[#071510]" aria-hidden="true" />
              <span>Roteiro Inteligente em 3 Passos</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold leading-tight drop-shadow-md">
              Não sabe por onde começar? Monte seu roteiro em São Roque!
            </h2>
            <p className="text-sm sm:text-base text-[#E7E5DF] leading-relaxed drop-shadow-sm">
              Responda a 3 perguntas simples e nossa inteligência vai sugerir a sequência perfeita de vinícolas, almoço e passeios para o seu dia.
            </p>
            <div className="pt-2">
              <Link
                href="/sao-roque/roteiros/montar"
                className="inline-flex items-center gap-2 bg-[#F19F14] hover:bg-[#D86E04] text-[#071510] hover:text-[#FFFFFF] font-bold text-sm px-7 py-3.5 rounded-2xl shadow-lg transition-all active:scale-95"
              >
                <Sparkles className="w-4 h-4" aria-hidden="true" />
                <span>Montar Meu Roteiro Agora</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. GASTRONOMIA E RESTAURANTES */}
      {gastronomyBusinesses.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E7E5DF] pb-4">
            <div>
              <h2 className="font-serif text-3xl font-bold text-[#26332F]">
                Gastronomia de Excelência
              </h2>
              <p className="text-xs text-[#26332F]/70">
                Restaurantes portugueses, italianos e culinária caipira harmonizados com ótimos vinhos
              </p>
            </div>
            <Link
              href="/sao-roque/explorar?category=restaurantes"
              className="inline-flex items-center gap-1 text-xs font-bold text-[#107492] hover:text-[#D86E04] transition-colors"
            >
              <span>Ver todos os restaurantes</span>
              <ChevronRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {gastronomyBusinesses.map((biz) => (
              <BusinessCard key={biz.id} business={biz} citySlug="sao-roque" />
            ))}
          </div>
        </section>
      )}

      {/* 7. ROTEIROS TEMÁTICOS PRONTOS */}
      {routes.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E7E5DF] pb-4">
            <div>
              <h2 className="font-serif text-3xl font-bold text-[#26332F]">
                Roteiros Prontos para Inspirar
              </h2>
              <p className="text-xs text-[#26332F]/70">
                Itinerários pensados para casais, famílias e grupos de amigos
              </p>
            </div>
            <Link
              href="/sao-roque/roteiros"
              className="inline-flex items-center gap-1 text-xs font-bold text-[#107492] hover:text-[#D86E04] transition-colors"
            >
              <span>Ver todos os roteiros</span>
              <ChevronRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {routes.map((routeItem) => (
              <RouteCard key={routeItem.id} route={routeItem} citySlug="sao-roque" />
            ))}
          </div>
        </section>
      )}

      {/* 8. AGENDA DE EVENTOS DE SÃO ROQUE */}
      {events.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E7E5DF] pb-4">
            <div>
              <h2 className="font-serif text-3xl font-bold text-[#26332F]">
                Agenda de Eventos
              </h2>
              <p className="text-xs text-[#26332F]/70">
                Festivais, pisa da uva, shows e feiras em São Roque
              </p>
            </div>
            <Link
              href="/sao-roque/eventos"
              className="inline-flex items-center gap-1 text-xs font-bold text-[#107492] hover:text-[#D86E04] transition-colors"
            >
              <span>Ver agenda completa</span>
              <ChevronRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {events.slice(0, 3).map((evt) => (
              <EventCard key={evt.id} event={evt} />
            ))}
          </div>
        </section>
      )}

      {/* 9. BANNER PARCEIRO ANUNCIANTE CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PartnerCTA cityName="São Roque" />
      </section>

    </div>
  );
}
