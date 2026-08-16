import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Compass, 
  Sparkles, 
  Trees, 
  Utensils, 
  Heart,
  Users,
  Mountain,
  Beer,
  ShoppingBag,
  ChevronRight,
  Waves
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
  citySlug: 'socorro',
});

export const revalidate = 60;

export default async function SocorroHomePage() {
  const [categories, businesses, experiences, routes, events] = await Promise.all([
    getCategories('socorro'),
    getBusinesses({ citySlug: 'socorro' }),
    getExperiences(true, 'socorro'),
    getRoutes('socorro'),
    getEvents('socorro'),
  ]);

  const quickExperienceTypes = [
    { label: 'Rafting no Rio do Peixe', icon: Waves, href: '/socorro/explorar?category=aventura-rafting', bg: 'bg-[#183A32]/10 text-[#183A32] border-[#183A32]/20' },
    { label: 'Pedra Bela Vista & Mirantes', icon: Mountain, href: '/socorro/explorar?category=natureza-mirantes', bg: 'bg-[#82967A]/15 text-[#183A32] border-[#82967A]/30' },
    { label: 'Comida Caipira na Brasa', icon: Utensils, href: '/socorro/explorar?category=gastronomia-caipira', bg: 'bg-[#B86F52]/15 text-[#B86F52] border-[#B86F52]/30' },
    { label: 'Compras de Malhas & Tricô', icon: ShoppingBag, href: '/socorro/explorar?category=compras-malhas', bg: 'bg-[#D49A3A]/15 text-[#26332F] border-[#D49A3A]/30' },
    { label: 'Hotéis Fazenda Acessíveis', icon: Trees, href: '/socorro/explorar?category=hoteis-fazenda', bg: 'bg-[#F4EBDD] text-[#26332F] border-[#e6dfd4]' },
    { label: 'Chalés & Romance na Serra', icon: Heart, href: '/socorro/explorar?category=pousadas-chales', bg: 'bg-[#722F3E]/10 text-[#722F3E] border-[#722F3E]/20' },
    { label: 'Cervejarias & Cachaçarias', icon: Beer, href: '/socorro/explorar?category=cervejarias-cachacas', bg: 'bg-[#D49A3A]/15 text-[#26332F] border-[#D49A3A]/30' },
    { label: 'Passeio em Família', icon: Users, href: '/socorro/explorar?tag=familia', bg: 'bg-[#F4EBDD] text-[#26332F] border-[#e6dfd4]' },
  ];

  return (
    <div className="space-y-16 pb-20 bg-[#FCFAF5]">
      
      {/* 1. HERO SECTION SOCORRO */}
      <section className="relative min-h-[620px] sm:min-h-[670px] lg:min-h-[70vh] flex items-center justify-center overflow-hidden bg-[#183A32] text-[#FCFAF5]">
        
        <Image
          src="/images/socorro/hero.webp"
          alt="Vista panorâmica da Pedra Bela Vista e montanhas de Socorro, São Paulo"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-90 transition-all duration-1000"
        />

        {/* ELEGANT VERDE MATA OVERLAY GRADIENT */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(180deg, rgba(24,58,50,0.30) 0%, rgba(24,58,50,0.50) 50%, rgba(24,58,50,0.85) 100%)'
          }}
        />

        <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-6 sm:space-y-8 py-12 sm:py-16">
          
          {/* BADGE SUPERIOR */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#183A32]/85 text-[#FCFAF5] text-xs sm:text-sm font-medium backdrop-blur-md border border-white/20 shadow-lg">
            <Compass className="w-4 h-4 text-[#D49A3A]" aria-hidden="true" />
            <span>Estância Hidromineral de Socorro - SP</span>
          </div>

          {/* TÍTULO HERO */}
          <div className="space-y-3 sm:space-y-4">
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#FCFAF5] drop-shadow-md leading-tight">
              Descubra <span className="text-[#D49A3A]">Socorro</span>
            </h1>
            <p className="text-base sm:text-xl lg:text-2xl text-[#FCFAF5] font-serif italic max-w-2xl mx-auto leading-relaxed drop-shadow-sm opacity-95">
              &ldquo;Capital da aventura, ecoturismo, comida caipira e compras de malhas na Mantiqueira.&rdquo;
            </p>
          </div>

          {/* BARRA DE PESQUISA CENTRAL */}
          <div className="w-full max-w-2xl mx-auto space-y-4 px-2 sm:px-0">
            <SearchBar 
              placeholder="O que você quer descobrir em Socorro? Ex.: rafting, Pedra Bela Vista, pousadas..." 
              basePath="/socorro/explorar"
            />
            
            {/* TAGS POPULARES */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-xs text-[#F4EBDD]">
              <span className="font-medium text-[#F4EBDD]/90">Buscas populares:</span>
              <Link href="/socorro/explorar?category=aventura-rafting" className="px-2.5 py-1 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-xs transition-colors flex items-center gap-1 font-semibold">
                <Waves className="w-3 h-3 text-[#D49A3A]" /> Rafting Rio do Peixe
              </Link>
              <Link href="/socorro/explorar?category=natureza-mirantes" className="px-2.5 py-1 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-xs transition-colors flex items-center gap-1 font-semibold">
                <Mountain className="w-3 h-3 text-[#D49A3A]" /> Pedra Bela Vista
              </Link>
              <Link href="/socorro/explorar?category=gastronomia-caipira" className="px-2.5 py-1 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-xs transition-colors flex items-center gap-1 font-semibold">
                <Utensils className="w-3 h-3 text-[#D49A3A]" /> Comida Caipira
              </Link>
              <Link href="/socorro/explorar?category=compras-malhas" className="px-2.5 py-1 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-xs transition-colors flex items-center gap-1 font-semibold">
                <ShoppingBag className="w-3 h-3 text-[#D49A3A]" /> Feira de Malhas
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* 2. ATALHOS RÁPIDOS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
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
      </section>

      {/* 3. CATEGORIAS DE SOCORRO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-[#F4EBDD] pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#D49A3A] block">
              O que fazer em Socorro
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#26332F]">
              Explore por Categorias
            </h2>
          </div>
          <Link
            href="/socorro/explorar"
            className="text-xs sm:text-sm font-bold text-[#183A32] hover:text-[#722F3E] flex items-center gap-1 transition-colors group"
          >
            <span>Ver todas as categorias</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((cat) => (
            <CategoryCard key={cat.id} category={cat} citySlug="socorro" />
          ))}
        </div>
      </section>

      {/* 4. EXPERIÊNCIAS TURÍSTICAS */}
      {experiences.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-[#F4EBDD] pb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#D49A3A] block flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> Vivências Inesquecíveis
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#26332F]">
                Experiências em Socorro
              </h2>
            </div>
            <Link
              href="/socorro/experiencias"
              className="text-xs sm:text-sm font-bold text-[#183A32] hover:text-[#722F3E] flex items-center gap-1 transition-colors group"
            >
              <span>Ver todas as experiências</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {experiences.slice(0, 3).map((exp) => (
              <ExperienceCard key={exp.id} experience={exp} citySlug="socorro" />
            ))}
          </div>
        </section>
      )}

      {/* 5. ESTABELECIMENTOS EM DESTAQUE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-[#F4EBDD] pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#D49A3A] block">
              Onde Ir & Hospedagens
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#26332F]">
              Locais em Destaque em Socorro
            </h2>
          </div>
          <Link
            href="/socorro/explorar"
            className="text-xs sm:text-sm font-bold text-[#183A32] hover:text-[#722F3E] flex items-center gap-1 transition-colors group"
          >
            <span>Ver guia completo</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {businesses.slice(0, 6).map((biz) => (
            <BusinessCard key={biz.id} business={biz} citySlug="socorro" />
          ))}
        </div>
      </section>

      {/* 6. BANNER WIZARD ROTEIROS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="relative rounded-3xl overflow-hidden bg-[#183A32] text-[#FCFAF5] p-8 sm:p-12 shadow-xl border border-[#245247] flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-xl text-center md:text-left">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D49A3A]/20 text-[#D49A3A] text-xs font-bold border border-[#D49A3A]/30">
              <Compass className="w-3.5 h-3.5" /> Assistente Inteligente
            </span>
            <h3 className="font-serif text-2xl sm:text-4xl font-bold leading-tight">
              Monte seu Roteiro Personalizado em Socorro
            </h3>
            <p className="text-xs sm:text-sm text-[#F4EBDD] leading-relaxed">
              Responda a 3 perguntas rápidas e nosso algoritmo criará um itinerário perfeito de rafting, mirantes, comida da roça e passeios para seu perfil.
            </p>
          </div>
          <Link
            href="/socorro/roteiros/montar"
            className="inline-flex items-center justify-center gap-2 bg-[#D49A3A] hover:bg-[#c08728] text-[#26332F] font-bold text-sm px-8 py-4 rounded-2xl shadow-lg transition-all active:scale-95 shrink-0"
          >
            <Sparkles className="w-4 h-4 text-[#26332F]" />
            <span>Montar Meu Roteiro Agora</span>
          </Link>
        </div>
      </section>

      {/* 7. ROTEIROS PRONTOS */}
      {routes.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-[#F4EBDD] pb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#D49A3A] block">
                Itinerários Sugeridos
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#26332F]">
                Roteiros Prontos em Socorro
              </h2>
            </div>
            <Link
              href="/socorro/roteiros"
              className="text-xs sm:text-sm font-bold text-[#183A32] hover:text-[#722F3E] flex items-center gap-1 transition-colors group"
            >
              <span>Ver todos os roteiros</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {routes.slice(0, 3).map((route) => (
              <RouteCard key={route.id} route={route} citySlug="socorro" />
            ))}
          </div>
        </section>
      )}

      {/* 8. EVENTOS DE SOCORRO */}
      {events.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-[#F4EBDD] pb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#D49A3A] block">
                Agenda Oficial
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#26332F]">
                Festivais & Eventos em Socorro
              </h2>
            </div>
            <Link
              href="/socorro/eventos"
              className="text-xs sm:text-sm font-bold text-[#183A32] hover:text-[#722F3E] flex items-center gap-1 transition-colors group"
            >
              <span>Ver calendário completo</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
      <PartnerCTA cityName="Socorro" />

    </div>
  );
}
