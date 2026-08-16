import React from 'react';
import Link from 'next/link';
import { Compass, FilterX } from 'lucide-react';
import { getBusinesses, getCategories } from '@/lib/services/data';
import { BusinessCard } from '@/components/tourism/BusinessCard';
import { FilterSidebar } from '@/components/filters/FilterSidebar';
import { SearchBar } from '@/components/filters/SearchBar';
import { constructMetadata } from '@/lib/seo/metadata';

export const metadata = constructMetadata({
  title: 'Explorar Lugares, Gastronomia e Passeios | Descubra Cidades',
  description: 'Encontre os melhores restaurantes, pousadas, vinícolas, mirantes e passeios turísticos.',
});

interface ExplorarPageProps {
  searchParams: Promise<{
    category?: string;
    price?: string;
    q?: string;
    tag?: string;
  }>;
}

export default async function ExplorarPage({ searchParams }: ExplorarPageProps) {
  const { category, price, q, tag } = await searchParams;

  const [categories, businesses] = await Promise.all([
    getCategories(),
    getBusinesses({
      categorySlug: category,
      priceLevel: price,
      searchQuery: q,
      tag: tag,
    }),
  ]);

  const activeCategory = categories.find((c) => c.slug === category);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 bg-[#F6F0D4]">
      
      {/* PAGE HEADER */}
      <div className="space-y-4 text-center md:text-left border-b border-[#E7E5DF] pb-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white text-[#107492] text-xs font-semibold border border-[#E7E5DF] shadow-xs">
          <Compass className="w-3.5 h-3.5 text-[#F19F14]" />
          <span>Guia Turístico Completo</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#26332F]">
          {activeCategory 
            ? activeCategory.name 
            : tag 
            ? `Lugares para Perfil: ${tag.toUpperCase()}`
            : 'Explorar Lugares & Experiências'}
        </h1>
        <p className="text-sm sm:text-base text-[#26332F]/80 max-w-3xl">
          {activeCategory
            ? activeCategory.description
            : 'Encontre os melhores restaurantes, vinícolas, mirantes, hotéis, pousadas e passeios turísticos.'}
        </p>
      </div>

      {/* SEARCH BAR */}
      <div className="max-w-3xl mx-auto md:mx-0">
        <SearchBar initialQuery={q} basePath="/explorar" />
      </div>

      {/* CONTENT LAYOUT (SIDEBAR + GRID) */}
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        
        {/* SIDEBAR FILTERS */}
        <FilterSidebar categories={categories} totalResults={businesses.length} basePath="/explorar" />

        {/* RESULTS GRID */}
        <main className="flex-1 w-full">
          {businesses.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {businesses.map((business) => (
                <BusinessCard key={business.id} business={business} />
              ))}
            </div>
          ) : (
            /* EMPTY STATE */
            <div className="bg-white rounded-3xl p-12 text-center border border-[#E7E5DF] shadow-sm space-y-6 max-w-lg mx-auto">
              <div className="w-16 h-16 rounded-2xl bg-[#F6F0D4] text-[#107492] flex items-center justify-center mx-auto">
                <FilterX className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h3 className="font-serif text-xl font-bold text-[#26332F]">
                  Não encontramos lugares com esses filtros
                </h3>
                <p className="text-xs sm:text-sm text-[#26332F]/80 leading-relaxed">
                  Tente alterar seus filtros de pesquisa ou navegar pelas categorias mais procuradas abaixo.
                </p>
              </div>

              <div className="pt-4 border-t border-[#E7E5DF] flex flex-wrap gap-2 justify-center">
                {categories.slice(0, 4).map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/explorar?category=${cat.slug}`}
                    className="text-xs font-semibold bg-[#F6F0D4] hover:bg-[#E7E5DF] text-[#1B4931] px-3 py-1.5 rounded-full border border-[#E7E5DF] transition-colors"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>

    </div>
  );
}
