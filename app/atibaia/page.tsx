import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Compass, 
  Sparkles, 
  Trees, 
  Utensils, 
  Hotel, 
  Heart,
  Users,
  Mountain,
  Beer,
  Apple,
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
  citySlug: 'atibaia',
});

export const revalidate = 60;

export default async function AtibaiaHomePage() {
  const [categories, businesses, experiences, routes, events] = await Promise.all([
    getCategories('atibaia'),
    getBusinesses({ citySlug: 'atibaia' }),
    getExperiences(true, 'atibaia'),
    getRoutes('atibaia'),
    getEvents('atibaia'),
  ]);

  const quickExperienceTypes = [
    { label: 'Natureza & Mirantes', icon: Mountain, href: '/atibaia/explorar?tag=natureza', bg: 'bg-[#107492]/10 text-[#107492] border-[#107492]/20' },
    { label: 'Aventura & Voo Livre', icon: Compass, href: '/atibaia/explorar?tag=aventura', bg: 'bg-[#107492]/10 text-[#107492] border-[#107492]/20' },
    { label: 'Restaurantes & Gastronomia', icon: Utensils, href: '/atibaia/explorar?category=gastronomia', bg: 'bg-[#F19F14]/15 text-[#D86E04] border-[#F19F14]/30' },
    { label: 'Passeio em Família', icon: Users, href: '/atibaia/explorar?tag=familia', bg: 'bg-white text-[#26332F] border-[#E7E5DF]' },
    { label: 'Romântico & Casal', icon: Heart, href: '/atibaia/explorar?tag=romantico', bg: 'bg-[#1B4931]/10 text-[#1B4931] border-[#1B4931]/20' },
    { label: 'Morangos & Produtores', icon: Apple, href: '/atibaia/explorar?category=produtores-locais', bg: 'bg-[#F19F14]/15 text-[#D86E04] border-[#F19F14]/30' },
    { label: 'Cervejarias Artesanais', icon: Beer, href: '/atibaia/explorar?category=cervejarias-artesanais', bg: 'bg-[#F19F14]/15 text-[#D86E04] border-[#F19F14]/30' },
    { label: 'Hospedagem & Resorts', icon: Hotel, href: '/atibaia/explorar?category=hospedagem-resorts', bg: 'bg-white text-[#26332F] border-[#E7E5DF]' },
  ];

  return (
    <div className="space-y-16 pb-20 bg-[#F6F0D4]">
      
      {/* 1. HERO SECTION ATIBAIA */}
      <section className="relative min-h-[620px] sm:min-h-[670px] lg:min-h-[70vh] flex items-center justify-center overflow-hidden bg-[#071510] text-[#FFFFFF]">
        
        <Image
          src="/images/atibaia/hero.webp"
          alt="Vista panorâmica da Pedra Grande e montanhas de Atibaia, São Paulo"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-90 transition-all duration-1000"
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
            <Mountain className="w-4 h-4 text-[#F19F14]" aria-hidden="true" />
            <span>Estância Turística de Atibaia - SP</span>
          </div>

          {/* TÍTULO HERO */}
          <div className="space-y-3 sm:space-y-4">
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#FFFFFF] drop-shadow-md leading-tight">
              Descubra <span className="text-[#F19F14]">Atibaia</span>
            </h1>
            <p className="text-base sm:text-xl lg:text-2xl text-[#F6F0D4] font-serif italic max-w-2xl mx-auto leading-relaxed drop-shadow-sm opacity-95">
              &ldquo;Natureza, aventura, gastronomia e experiências para viver o melhor de Atibaia.&rdquo;
            </p>
          </div>

          {/* BARRA DE PESQUISA CENTRAL */}
          <div className="w-full max-w-2xl mx-auto space-y-4 px-2 sm:px-0">
            <SearchBar 
              placeholder="O que você quer descobrir em Atibaia? Ex.: Pedra Grande, restaurantes, pousadas..." 
              basePath="/atibaia/explorar"
            />

            {/* ATALHOS POPULARES */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-1 text-xs">
              <span className="text-[#FFFFFF] font-medium drop-shadow-xs shrink-0">Buscas populares:</span>
              
              <Link href="/atibaia/explorar?q=Pedra+Grande" className="inline-flex items-center gap-1.5 bg-black/35 hover:bg-black/55 text-[#FFFFFF] backdrop-blur-md px-3 py-1 rounded-full border border-white/25 transition-all">
                <Mountain className="w-3.5 h-3.5 text-[#F19F14]" aria-hidden="true" />
                <span>Pedra Grande</span>
              </Link>
              
              <Link href="/atibaia/explorar?category=gastronomia" className="inline-flex items-center gap-1.5 bg-black/35 hover:bg-black/55 text-[#FFFFFF] backdrop-blur-md px-3 py-1 rounded-full border border-white/25 transition-all">
                <Utensils className="w-3.5 h-3.5 text-[#F19F14]" aria-hidden="true" />
                <span>Restaurantes</span>
              </Link>

              <Link href="/atibaia/explorar?category=hospedagem-resorts" className="inline-flex items-center gap-1.5 bg-black/35 hover:bg-black/55 text-[#FFFFFF] backdrop-blur-md px-3 py-1 rounded-full border border-white/25 transition-all">
                <Hotel className="w-3.5 h-3.5 text-[#F19F14]" aria-hidden="true" />
                <span>Pousadas</span>
              </Link>

              <Link href="/atibaia/explorar?category=aventura-ecoturismo" className="inline-flex items-center gap-1.5 bg-black/35 hover:bg-black/55 text-[#FFFFFF] backdrop-blur-md px-3 py-1 rounded-full border border-white/25 transition-all">
                <Trees className="w-3.5 h-3.5 text-[#F19F14]" aria-hidden="true" />
                <span>Aventura</span>
              </Link>

              <Link href="/atibaia/explorar?category=produtores-locais" className="inline-flex items-center gap-1.5 bg-black/35 hover:bg-black/55 text-[#FFFFFF] backdrop-blur-md px-3 py-1 rounded-full border border-white/25 transition-all">
                <Apple className="w-3.5 h-3.5 text-[#F19F14]" aria-hidden="true" />
                <span>Morangos</span>
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* 2. ATALHOS RÁPIDOS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-4">
          <div className="text-center sm:text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-[#107492] block">
              Atividades & Turismo
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#26332F]">
              O que você quer viver hoje em Atibaia?
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
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. CATEGORIAS DE ATIBAIA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E7E5DF] pb-4">
          <div>
            <h2 className="font-serif text-3xl font-bold text-[#26332F]">
              Explore por Categorias
            </h2>
            <p className="text-xs text-[#26332F]/70">
              Mirantes, aventura, morangos, cervejarias e gastronomia de serra
            </p>
          </div>
          <Link
            href="/atibaia/explorar"
            className="inline-flex items-center gap-1 text-xs font-bold text-[#107492] hover:text-[#D86E04] transition-colors"
          >
            <span>Ver todas as categorias</span>
            <ChevronRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <CategoryCard key={cat.id} category={cat} citySlug="atibaia" />
          ))}
        </div>
      </section>

      {/* 4. EXPERIÊNCIAS TURÍSTICAS */}
      {experiences.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E7E5DF] pb-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#107492] bg-white px-3 py-1 rounded-full mb-2 border border-[#E7E5DF]">
                <Sparkles className="w-3.5 h-3.5 text-[#F19F14]" />
                <span>Vivências Inesquecíveis</span>
              </div>
              <h2 className="font-serif text-3xl font-bold text-[#26332F]">
                Experiências em Atibaia
              </h2>
            </div>
            <Link
              href="/atibaia/experiencias"
              className="inline-flex items-center gap-1 text-xs font-bold text-[#107492] hover:text-[#D86E04] transition-colors"
            >
              <span>Ver todas as experiências</span>
              <ChevronRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {experiences.slice(0, 3).map((exp) => (
              <ExperienceCard key={exp.id} experience={exp} citySlug="atibaia" />
            ))}
          </div>
        </section>
      )}

      {/* 5. ESTABELECIMENTOS EM DESTAQUE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E7E5DF] pb-4">
          <div>
            <h2 className="font-serif text-3xl font-bold text-[#26332F]">
              Locais em Destaque em Atibaia
            </h2>
            <p className="text-xs text-[#26332F]/70">
              Os melhores atrativos, pousadas e restaurantes selecionados
            </p>
          </div>
          <Link
            href="/atibaia/explorar"
            className="inline-flex items-center gap-1 text-xs font-bold text-[#107492] hover:text-[#D86E04] transition-colors"
          >
            <span>Ver guia completo</span>
            <ChevronRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {businesses.slice(0, 6).map((biz) => (
            <BusinessCard key={biz.id} business={biz} citySlug="atibaia" />
          ))}
        </div>
      </section>

      {/* 6. BANNER WIZARD ROTEIROS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#071510] text-[#FFFFFF] rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-2xl border border-[#1B4931]/50 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-xl text-center md:text-left">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1B4931] text-[#F19F14] text-xs font-bold border border-[#1B4931]">
              <Compass className="w-3.5 h-3.5 text-[#F19F14]" /> Assistente Inteligente
            </span>
            <h3 className="font-serif text-2xl sm:text-4xl font-bold leading-tight">
              Monte seu Roteiro Personalizado em Atibaia
            </h3>
            <p className="text-xs sm:text-sm text-[#E7E5DF] leading-relaxed">
              Responda a 3 perguntas rápidas e nosso algoritmo criará um itinerário perfeito de mirantes, colheita de morangos, restaurantes e voos livres.
            </p>
          </div>
          <Link
            href="/atibaia/roteiros/montar"
            className="inline-flex items-center justify-center gap-2 bg-[#F19F14] hover:bg-[#D86E04] text-[#071510] hover:text-[#FFFFFF] font-bold text-sm px-8 py-4 rounded-2xl shadow-lg transition-all active:scale-95 shrink-0"
          >
            <Sparkles className="w-4 h-4 text-[#071510] group-hover:text-[#FFFFFF]" />
            <span>Montar Meu Roteiro Agora</span>
          </Link>
        </div>
      </section>

      {/* 7. ROTEIROS PRONTOS */}
      {routes.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E7E5DF] pb-4">
            <div>
              <h2 className="font-serif text-3xl font-bold text-[#26332F]">
                Roteiros Prontos em Atibaia
              </h2>
              <p className="text-xs text-[#26332F]/70">
                Itinerários completos planejados por quem conhece a cidade
              </p>
            </div>
            <Link
              href="/atibaia/roteiros"
              className="inline-flex items-center gap-1 text-xs font-bold text-[#107492] hover:text-[#D86E04] transition-colors"
            >
              <span>Ver todos os roteiros</span>
              <ChevronRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {routes.slice(0, 3).map((route) => (
              <RouteCard key={route.id} route={route} citySlug="atibaia" />
            ))}
          </div>
        </section>
      )}

      {/* 8. EVENTOS DE ATIBAIA */}
      {events.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E7E5DF] pb-4">
            <div>
              <h2 className="font-serif text-3xl font-bold text-[#26332F]">
                Festivais & Eventos em Atibaia
              </h2>
              <p className="text-xs text-[#26332F]/70">
                Festa de Flores e Morangos, festivais gastronômicos e etapas esportivas
              </p>
            </div>
            <Link
              href="/atibaia/eventos"
              className="inline-flex items-center gap-1 text-xs font-bold text-[#107492] hover:text-[#D86E04] transition-colors"
            >
              <span>Ver calendário completo</span>
              <ChevronRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.slice(0, 3).map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </section>
      )}

      {/* 9. CTA PARA PARCEIROS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PartnerCTA cityName="Atibaia" />
      </section>

    </div>
  );
}
