import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Compass, 
  Sparkles, 
  Wine, 
  Utensils, 
  Hotel, 
  Trees, 
  MapPin, 
  Calendar,
  Heart,
  Users,
  Bus,
  Compass as Adventure,
  ShoppingBag,
  Landmark,
  Coffee,
  ArrowRight,
  ChevronRight,
  Building2
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
  title: 'Descubra São Roque | Turismo, Vinícolas, Restaurantes e Passeios',
  description: 'Descubra lugares, experiências e sabores de São Roque - SP. O guia turístico definitivo para vinícolas, gastronomia, hospedagem e passeios.',
});

export const revalidate = 60;

export default async function HomePage() {
  const [categories, businesses, experiences, routes, events] = await Promise.all([
    getCategories(),
    getBusinesses(),
    getExperiences(true),
    getRoutes(),
    getEvents(),
  ]);

  const gastronomyBusinesses = businesses.filter(
    (b) => b.category?.slug === 'restaurantes' || b.category?.slug === 'cafes-docerias'
  ).slice(0, 3);

  const accommodationBusinesses = businesses.filter(
    (b) => b.category?.slug === 'hospedagem'
  ).slice(0, 2);

  const attractionBusinesses = businesses.filter(
    (b) => b.category?.slug === 'natureza-trilhas' || b.category?.slug === 'passeios-agencias'
  ).slice(0, 3);

  const quickExperienceTypes = [
    { label: 'Vinho & Gastronomia', icon: Wine, href: '/explorar?tag=vinho', bg: 'bg-[#722F3E]/10 text-[#722F3E] border-[#722F3E]/20' },
    { label: 'Romântico & Casal', icon: Heart, href: '/explorar?tag=romantico', bg: 'bg-[#722F3E]/10 text-[#722F3E] border-[#722F3E]/20' },
    { label: 'Passeio em Família', icon: Users, href: '/explorar?tag=familia', bg: 'bg-[#F4EBDD] text-[#26332F] border-[#e6dfd4]' },
    { label: 'Natureza & Mirantes', icon: Trees, href: '/explorar?tag=natureza', bg: 'bg-[#82967A]/15 text-[#183A32] border-[#82967A]/30' },
    { label: 'Trilhas & Aventura', icon: Adventure, href: '/explorar?tag=aventura', bg: 'bg-[#82967A]/15 text-[#183A32] border-[#82967A]/30' },
    { label: 'Restaurantes & Cafés', icon: Utensils, href: '/explorar?category=restaurantes', bg: 'bg-[#B86F52]/15 text-[#B86F52] border-[#B86F52]/30' },
    { label: 'Compras & Doces', icon: ShoppingBag, href: '/explorar?category=compras-doces', bg: 'bg-[#F4EBDD] text-[#26332F] border-[#e6dfd4]' },
    { label: 'Cultura & História', icon: Landmark, href: '/explorar?category=cultura-historia', bg: 'bg-[#F4EBDD] text-[#26332F] border-[#e6dfd4]' },
  ];

  return (
    <div className="space-y-16 pb-20 bg-[#FCFAF5]">
      
      {/* 1. HERO SECTION (ENCANTOS DE SÃO ROQUE AO ENTARDECER) */}
      <section className="relative min-h-[620px] sm:min-h-[680px] flex items-center justify-center overflow-hidden bg-[#183A32] text-[#FCFAF5]">
        <Image
          src="/hero.jfif"
          alt="Encantos de São Roque ao Entardecer - Vinhedos e Paisagens"
          fill
          priority
          className="object-cover opacity-90 scale-100 transition-transform duration-1000"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#26332F]/80 via-[#183A32]/40 to-[#183A32]/60" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-8 py-16">
          
          {/* BADGE SUPERIOR */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#183A32]/85 text-[#FCFAF5] text-xs sm:text-sm font-medium backdrop-blur-md border border-white/20 shadow-lg">
            <Wine className="w-4 h-4 text-[#D49A3A]" aria-hidden="true" />
            <span>Estância Turística de São Roque - SP</span>
          </div>

          {/* TÍTULO HERO */}
          <div className="space-y-4">
            <h1 className="font-serif text-5xl sm:text-7xl font-bold tracking-tight text-[#FCFAF5] drop-shadow-md">
              Descubra <span className="text-[#D49A3A]">São Roque</span>
            </h1>
            <p className="text-lg sm:text-2xl text-[#FCFAF5] font-serif italic max-w-2xl mx-auto leading-relaxed drop-shadow-sm">
              &ldquo;Descubra lugares, experiências e sabores de São Roque.&rdquo;
            </p>
          </div>

          {/* BARRA DE PESQUISA CENTRAL */}
          <div className="max-w-2xl mx-auto space-y-4">
            <SearchBar placeholder="O que você quer descobrir? Ex.: vinícolas, restaurantes, passeios..." />

            {/* BUSCAS POPULARES CHIPS */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-xs">
              <span className="text-[#FCFAF5] font-medium drop-shadow-sm">Buscas populares:</span>
              <Link href="/explorar?category=vinicolas-adegas" className="inline-flex items-center gap-1.5 bg-black/30 hover:bg-black/50 text-[#FCFAF5] backdrop-blur-md px-3 py-1 rounded-full border border-white/25 transition-all">
                <Wine className="w-3.5 h-3.5 text-[#D49A3A]" aria-hidden="true" />
                <span>Vinícolas</span>
              </Link>
              <Link href="/explorar?category=restaurantes" className="inline-flex items-center gap-1.5 bg-black/30 hover:bg-black/50 text-[#FCFAF5] backdrop-blur-md px-3 py-1 rounded-full border border-white/25 transition-all">
                <Utensils className="w-3.5 h-3.5 text-[#D49A3A]" aria-hidden="true" />
                <span>Restaurantes</span>
              </Link>
              <Link href="/explorar?tag=romantico" className="inline-flex items-center gap-1.5 bg-black/30 hover:bg-black/50 text-[#FCFAF5] backdrop-blur-md px-3 py-1 rounded-full border border-white/25 transition-all">
                <Heart className="w-3.5 h-3.5 text-[#D49A3A]" aria-hidden="true" />
                <span>Roteiro Romântico</span>
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* 2. CHIPS DE EXPERIÊNCIAS RÁPIDAS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#e6dfd4] shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-serif text-2xl font-bold text-[#26332F]">
                O que você deseja vivenciar hoje?
              </h2>
              <p className="text-xs text-[#52615B]">
                Filtre passeios por perfil de viagem e categoria em São Roque
              </p>
            </div>
            <Link
              href="/explorar"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#183A32] hover:text-[#245247] transition-colors"
            >
              <span>Ver todas as opções</span>
              <ChevronRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {quickExperienceTypes.map((item) => {
              const IconComp = item.icon;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`flex items-center gap-3 p-3.5 rounded-2xl border transition-all hover:scale-[1.02] shadow-2xs ${item.bg}`}
                >
                  <IconComp className="w-5 h-5 shrink-0" aria-hidden="true" />
                  <span className="text-xs font-bold leading-tight">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. CATEGORIAS DE DESTAQUE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#e6dfd4] pb-4">
          <div>
            <h2 className="font-serif text-3xl font-bold text-[#26332F]">
              Explore por Categoria
            </h2>
            <p className="text-xs text-[#52615B]">
              Encontre vinícolas, gastronomia, hospedagem e atrações na cidade
            </p>
          </div>
          <Link
            href="/explorar"
            className="inline-flex items-center gap-1 text-xs font-bold text-[#183A32] hover:underline"
          >
            <span>Ver todas</span>
            <ChevronRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.slice(0, 4).map((cat) => (
            <CategoryCard key={cat.id} category={cat} />
          ))}
        </div>
      </section>

      {/* 4. EXPERIÊNCIAS TURÍSTICAS EM DESTAQUE */}
      {experiences.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#e6dfd4] pb-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#722F3E] bg-[#722F3E]/10 px-3 py-1 rounded-full mb-2">
                <Wine className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Imperdível em São Roque</span>
              </div>
              <h2 className="font-serif text-3xl font-bold text-[#26332F]">
                Experiências Marcantes
              </h2>
            </div>
            <Link
              href="/experiencias"
              className="inline-flex items-center gap-1 text-xs font-bold text-[#183A32] hover:underline"
            >
              <span>Ver todas as experiências</span>
              <ChevronRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {experiences.slice(0, 3).map((exp) => (
              <ExperienceCard key={exp.id} experience={exp} />
            ))}
          </div>
        </section>
      )}

      {/* 5. MONTE SEU ROTEIRO CTA WIZARD */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#183A32] text-[#FCFAF5] rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-xl border border-[#82967A]/30">
          <div className="relative z-10 max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-2 bg-[#D49A3A] text-[#26332F] font-bold text-xs px-3.5 py-1.5 rounded-full">
              <Compass className="w-4 h-4 text-[#26332F]" aria-hidden="true" />
              <span>Roteiro Inteligente em 3 Passos</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold leading-tight">
              Não sabe por onde começar? Monte seu roteiro personalizado!
            </h2>
            <p className="text-sm text-[#F4EBDD] leading-relaxed">
              Responda a 3 perguntas simples e nossa inteligência vai sugerir a sequência perfeita de vinícolas, almoço e passeios para o seu dia.
            </p>
            <div className="pt-2">
              <Link
                href="/roteiros/montar"
                className="inline-flex items-center gap-2 bg-[#D49A3A] hover:bg-[#c28b32] text-[#26332F] font-bold text-sm px-6 py-3.5 rounded-2xl shadow-lg transition-all active:scale-95"
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
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#e6dfd4] pb-4">
            <div>
              <h2 className="font-serif text-3xl font-bold text-[#26332F]">
                Gastronomia de Excelência
              </h2>
              <p className="text-xs text-[#52615B]">
                Restaurantes portugueses, italianos e culinária caipira harmonizados com ótimos vinhos
              </p>
            </div>
            <Link
              href="/explorar?category=restaurantes"
              className="inline-flex items-center gap-1 text-xs font-bold text-[#183A32] hover:underline"
            >
              <span>Ver todos os restaurantes</span>
              <ChevronRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {gastronomyBusinesses.map((biz) => (
              <BusinessCard key={biz.id} business={biz} />
            ))}
          </div>
        </section>
      )}

      {/* 7. ROTEIROS TEMÁTICOS PRONTOS */}
      {routes.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#e6dfd4] pb-4">
            <div>
              <h2 className="font-serif text-3xl font-bold text-[#26332F]">
                Roteiros Prontos para Inspirar
              </h2>
              <p className="text-xs text-[#52615B]">
                Itinerários pensados para casais, famílias e grupos de amigos
              </p>
            </div>
            <Link
              href="/roteiros"
              className="inline-flex items-center gap-1 text-xs font-bold text-[#183A32] hover:underline"
            >
              <span>Ver todos os roteiros</span>
              <ChevronRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {routes.map((routeItem) => (
              <RouteCard key={routeItem.id} route={routeItem} />
            ))}
          </div>
        </section>
      )}

      {/* 8. AGENDA DE EVENTOS DA CIDADE */}
      {events.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#e6dfd4] pb-4">
            <div>
              <h2 className="font-serif text-3xl font-bold text-[#26332F]">
                Agenda de Eventos
              </h2>
              <p className="text-xs text-[#52615B]">
                Festivais, pisa da uva, shows e feiras em São Roque
              </p>
            </div>
            <Link
              href="/eventos"
              className="inline-flex items-center gap-1 text-xs font-bold text-[#183A32] hover:underline"
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

      {/* 9. BANDER PARCEIRO ANUNCIANTE CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PartnerCTA />
      </section>

    </div>
  );
}
