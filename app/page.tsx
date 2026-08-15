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
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[600px] sm:min-h-[660px] flex items-center justify-center overflow-hidden bg-[#183A32] text-[#FCFAF5]">
        <Image
          src="/hero.jfif"
          alt="Vinhedos e paisagens de São Roque SP"
          fill
          priority
          className="object-cover opacity-45 scale-105 transition-transform duration-1000"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FCFAF5] via-[#183A32]/65 to-[#183A32]/85" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-8 py-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#183A32]/90 text-[#D49A3A] text-xs font-semibold backdrop-blur-md border border-[#82967A]/50 shadow-lg">
            <Wine className="w-3.5 h-3.5 text-[#D49A3A]" aria-hidden="true" />
            <span>Estância Turística de São Roque - SP</span>
          </div>

          <div className="space-y-4">
            <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-[#FCFAF5] leading-tight">
              Descubra <span className="text-[#D49A3A]">São Roque</span>
            </h1>
            <p className="text-base sm:text-xl text-[#F4EBDD] font-serif italic max-w-2xl mx-auto leading-relaxed drop-shadow-sm">
              "Descubra lugares, experiências e sabores de São Roque."
            </p>
          </div>

          {/* Central Search Bar */}
          <div className="max-w-2xl mx-auto space-y-4">
            <SearchBar placeholder="O que você quer descobrir? Ex.: vinícolas, restaurantes, passeios..." />

            {/* Quick Search Chips com Ícones Lucide SVG */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-xs">
              <span className="text-[#F4EBDD] font-medium">Buscas populares:</span>
              <Link href="/explorar?category=vinicolas-adegas" className="inline-flex items-center gap-1.5 bg-white/15 hover:bg-white/25 text-[#FCFAF5] backdrop-blur-md px-3 py-1 rounded-full border border-white/20 transition-all">
                <Wine className="w-3.5 h-3.5 text-[#D49A3A]" aria-hidden="true" />
                <span>Vinícolas</span>
              </Link>
              <Link href="/explorar?category=restaurantes" className="inline-flex items-center gap-1.5 bg-white/15 hover:bg-white/25 text-[#FCFAF5] backdrop-blur-md px-3 py-1 rounded-full border border-white/20 transition-all">
                <Utensils className="w-3.5 h-3.5 text-[#D49A3A]" aria-hidden="true" />
                <span>Restaurantes</span>
              </Link>
              <Link href="/explorar?category=hospedagem" className="inline-flex items-center gap-1.5 bg-white/15 hover:bg-white/25 text-[#FCFAF5] backdrop-blur-md px-3 py-1 rounded-full border border-white/20 transition-all">
                <Hotel className="w-3.5 h-3.5 text-[#D49A3A]" aria-hidden="true" />
                <span>Onde ficar</span>
              </Link>
              <Link href="/explorar?category=natureza-trilhas" className="inline-flex items-center gap-1.5 bg-white/15 hover:bg-white/25 text-[#FCFAF5] backdrop-blur-md px-3 py-1 rounded-full border border-white/20 transition-all">
                <Trees className="w-3.5 h-3.5 text-[#D49A3A]" aria-hidden="true" />
                <span>Natureza</span>
              </Link>
              <Link href="/explorar?category=passeios-agencias" className="inline-flex items-center gap-1.5 bg-white/15 hover:bg-white/25 text-[#FCFAF5] backdrop-blur-md px-3 py-1 rounded-full border border-white/20 transition-all">
                <Bus className="w-3.5 h-3.5 text-[#D49A3A]" aria-hidden="true" />
                <span>Passeios</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. NOVO BANNER: MONTE SEU ROTEIRO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-[#183A32] text-[#FCFAF5] p-8 sm:p-10 shadow-xl overflow-hidden border border-[#245247] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3 text-center md:text-left z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D49A3A]/20 text-[#D49A3A] text-xs font-bold border border-[#D49A3A]/30">
              <Sparkles className="w-3.5 h-3.5 text-[#D49A3A]" aria-hidden="true" />
              <span>Personalizado Para Você</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold leading-tight flex items-center justify-center md:justify-start gap-2">
              <Sparkles className="w-7 h-7 text-[#D49A3A]" aria-hidden="true" />
              <span>Monte seu roteiro em São Roque</span>
            </h2>
            <p className="text-sm sm:text-base text-[#F4EBDD]/90 leading-relaxed">
              Conte o que você gosta e descubra uma sugestão de roteiro para aproveitar São Roque.
            </p>
          </div>

          <Link
            href="/roteiros/montar"
            aria-label="Montar meu roteiro personalizado"
            className="inline-flex items-center justify-center gap-2 bg-[#D49A3A] hover:bg-[#c28c32] text-[#26332F] font-bold text-sm px-8 py-4 rounded-2xl shadow-xl transition-all shrink-0 active:scale-95 z-10"
          >
            <Sparkles className="w-4 h-4 text-[#26332F]" aria-hidden="true" />
            <span>Montar meu roteiro</span>
          </Link>
        </div>
      </section>

      {/* 3. SEÇÃO "ESCOLHA SUA EXPERIÊNCIA" */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-xs font-bold text-[#183A32] uppercase tracking-wider">
            Experiências sob medida
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#26332F]">
            O que você quer fazer em São Roque?
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {quickExperienceTypes.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Link
                key={idx}
                href={item.href}
                aria-label={`Explorar experiências de ${item.label}`}
                className={`p-4 rounded-2xl border ${item.bg} shadow-sm hover:shadow-md transition-all duration-200 flex flex-col items-center justify-center text-center gap-2.5 group`}
              >
                <div className="w-12 h-12 rounded-[14px] bg-white/90 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform border border-[#e6dfd4]">
                  <Icon className="w-6 h-6 stroke-[1.8]" aria-hidden="true" />
                </div>
                <span className="font-serif font-bold text-sm leading-tight">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 4. CATEGORIAS PRINCIPAIS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-end justify-between border-b border-[#e6dfd4] pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#183A32]">
              Guia Completo
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#26332F]">
              O que você procura?
            </h2>
          </div>
          <Link
            href="/explorar"
            aria-label="Ver todas as categorias"
            className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold text-[#183A32] hover:text-[#722F3E]"
          >
            <span>Ver todas</span>
            <ChevronRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      {/* 5. SEÇÃO EM DESTAQUE (EXPERIÊNCIAS EDITORIAIS - DARK SECTION) */}
      <section className="bg-[#183A32] text-[#FCFAF5] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#245247] pb-4 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#D49A3A]">
                Momentos Inesquecíveis
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#FCFAF5]">
                Experiências que você não pode perder
              </h2>
            </div>
            <Link
              href="/experiencias"
              aria-label="Ver todas as experiências"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#D49A3A] hover:text-[#f3b552]"
            >
              <span>Ver todas as experiências</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {experiences.slice(0, 3).map((experience) => (
              <ExperienceCard key={experience.id} experience={experience} />
            ))}
          </div>
        </div>
      </section>

      {/* 6. SEÇÃO GASTRONOMIA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-end justify-between border-b border-[#e6dfd4] pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#B86F52]">
              Culinária & Tradição
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#26332F]">
              Sabores de São Roque
            </h2>
          </div>
          <Link
            href="/explorar?category=restaurantes"
            aria-label="Ver gastronomia completa"
            className="inline-flex items-center gap-1 text-xs font-semibold text-[#183A32] hover:text-[#722F3E]"
          >
            <span>Ver gastronomia completa</span>
            <ChevronRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {gastronomyBusinesses.map((biz) => (
            <BusinessCard key={biz.id} business={biz} />
          ))}
        </div>
      </section>

      {/* 7. SEÇÃO PASSEIOS & ATRATIVOS (DARK SECTION VINHO) */}
      <section className="bg-[#722F3E] text-[#FCFAF5] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#8d3d4e] pb-4 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#F4EBDD]">
                Passeios & Natureza
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#FCFAF5]">
                O que fazer em São Roque
              </h2>
            </div>
            <Link
              href="/explorar?category=natureza-trilhas"
              aria-label="Explorar atrações"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#D49A3A] hover:text-[#f3b552]"
            >
              <span>Explorar atrações</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {attractionBusinesses.map((biz) => (
              <BusinessCard key={biz.id} business={biz} />
            ))}
          </div>
        </div>
      </section>

      {/* 8. ROTEIROS PRONTOS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-end justify-between border-b border-[#e6dfd4] pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#183A32]">
              Planeje seu dia
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#26332F]">
              Roteiros recomendados
            </h2>
          </div>
          <Link
            href="/roteiros"
            aria-label="Ver todos os roteiros"
            className="inline-flex items-center gap-1 text-xs font-semibold text-[#183A32] hover:text-[#722F3E]"
          >
            <span>Ver todos os roteiros</span>
            <ChevronRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {routes.slice(0, 2).map((route) => (
            <RouteCard key={route.id} route={route} />
          ))}
        </div>
      </section>

      {/* 9. SEÇÃO ONDE FICAR */}
      {accommodationBusinesses.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex items-end justify-between border-b border-[#e6dfd4] pb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#183A32]">
                Hospedagens Selecionadas
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#26332F]">
                Planeje sua estadia
              </h2>
            </div>
            <Link
              href="/explorar?category=hospedagem"
              aria-label="Ver hotéis e pousadas"
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#183A32] hover:text-[#722F3E]"
            >
              <span>Ver hotéis & pousadas</span>
              <ChevronRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {accommodationBusinesses.map((biz) => (
              <BusinessCard key={biz.id} business={biz} horizontal />
            ))}
          </div>
        </section>
      )}

      {/* 10. EVENTOS */}
      {events.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex items-end justify-between border-b border-[#e6dfd4] pb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#183A32]">
                Agenda Cultural
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#26332F]">
                Acontece em São Roque
              </h2>
            </div>
            <Link
              href="/eventos"
              aria-label="Ver todos os eventos"
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#183A32] hover:text-[#722F3E]"
            >
              <span>Ver todos os eventos</span>
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

      {/* 11. CTA PARA EMPRESAS NO FINAL DA HOME */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#e6dfd4] shadow-md text-center space-y-6">
          <div className="w-12 h-12 rounded-[14px] bg-[#F4EBDD] text-[#183A32] flex items-center justify-center mx-auto border border-[#e6dfd4]">
            <Building2 className="w-6 h-6 stroke-[1.8]" aria-hidden="true" />
          </div>
          <div className="space-y-2 max-w-xl mx-auto">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#26332F]">
              Sua empresa faz parte de São Roque?
            </h2>
            <p className="text-sm text-[#52615B] leading-relaxed">
              Coloque seu negócio na frente de quem está descobrindo a cidade. Divulgue suas experiências e receba contatos diretos no seu WhatsApp.
            </p>
          </div>
          <div>
            <Link
              href="/para-empresas"
              aria-label="Quero ser parceiro do Descubra São Roque"
              className="inline-flex items-center gap-2 bg-[#183A32] hover:bg-[#245247] text-[#FCFAF5] font-bold text-sm px-8 py-3.5 rounded-xl shadow-lg transition-all"
            >
              <span>Quero ser parceiro</span>
              <ArrowRight className="w-4 h-4 text-[#D49A3A]" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* 12. PARTNER CTA BANNER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <PartnerCTA />
      </div>

    </div>
  );
}
