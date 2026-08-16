'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { 
  Filter, 
  X, 
  Check, 
  RefreshCw, 
  SlidersHorizontal,
  Wine,
  Utensils,
  Heart,
  Users,
  Trees,
  Compass,
  Hotel
} from 'lucide-react';
import { Category } from '@/types';

interface FilterSidebarProps {
  categories: Category[];
  totalResults: number;
  basePath?: string;
}

export function FilterSidebar({ categories, totalResults, basePath = '/explorar' }: FilterSidebarProps) {
  const [isOpenMobile, setIsOpenMobile] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedCategory = searchParams.get('category') || '';
  const selectedPrice = searchParams.get('price') || '';
  const selectedTag = searchParams.get('tag') || '';

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    const targetBase = basePath.endsWith('/explorar') ? basePath : `${basePath}/explorar`;
    router.push(`${targetBase}?${params.toString()}`);
  };

  const clearAllFilters = () => {
    const targetBase = basePath.endsWith('/explorar') ? basePath : `${basePath}/explorar`;
    router.push(targetBase);
  };

  const hasActiveFilters = Boolean(selectedCategory || selectedPrice || selectedTag || searchParams.get('q'));

  const quickFilterChips = [
    { label: 'Vinho', tag: 'vinho', icon: Wine },
    { label: 'Gastronomia', tag: 'gastronomia', icon: Utensils },
    { label: 'Casais', tag: 'romantico', icon: Heart },
    { label: 'Família', tag: 'familia', icon: Users },
    { label: 'Natureza', tag: 'natureza', icon: Trees },
    { label: 'Aventura', tag: 'aventura', icon: Compass },
    { label: 'Hospedagem', tag: 'hospedagem', icon: Hotel },
  ];

  const sidebarContent = (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between pb-4 border-b border-[#E7E5DF]">
        <div className="flex items-center gap-2 text-[#26332F] font-serif font-bold text-lg">
          <Filter className="w-4 h-4 text-[#107492]" aria-hidden="true" />
          <span>Filtros</span>
        </div>
        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            aria-label="Limpar todos os filtros"
            className="inline-flex items-center gap-1 text-xs font-semibold text-[#D86E04] hover:underline cursor-pointer"
          >
            <RefreshCw className="w-3 h-3" aria-hidden="true" />
            <span>Limpar</span>
          </button>
        )}
      </div>

      {/* RESULT COUNT */}
      <div className="text-xs text-[#26332F] font-medium bg-[#F6F0D4] p-3 rounded-2xl border border-[#E7E5DF] flex items-center justify-between">
        <span>Lugares encontrados:</span>
        <span className="font-bold text-[#1B4931] text-sm">{totalResults}</span>
      </div>

      {/* CHIPS DE FILTRO RÁPIDO */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold text-[#26332F] uppercase tracking-wider">
          Perfil & Experiência
        </h4>
        <div className="flex flex-wrap gap-1.5">
          {quickFilterChips.map((chip) => {
            const isSelected = selectedTag === chip.tag;
            const Icon = chip.icon;
            return (
              <button
                key={chip.tag}
                onClick={() => updateFilter('tag', isSelected ? '' : chip.tag)}
                aria-label={`Filtrar por ${chip.label}`}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#071510] text-[#FFFFFF] shadow-sm'
                    : 'bg-[#F6F0D4] hover:bg-[#E7E5DF] text-[#26332F] border border-[#E7E5DF]'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-[#F19F14]' : 'text-[#107492]'}`} aria-hidden="true" />
                <span>{chip.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* CATEGORIES FILTER */}
      <div className="space-y-3 pt-4 border-t border-[#E7E5DF]">
        <h4 className="text-xs font-bold text-[#26332F] uppercase tracking-wider">
          Categorias
        </h4>
        <div className="space-y-1 max-h-56 overflow-y-auto pr-1">
          <button
            onClick={() => updateFilter('category', '')}
            aria-label="Selecionar todas as categorias"
            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
              !selectedCategory ? 'bg-[#071510] text-[#FFFFFF] font-semibold shadow-sm' : 'text-[#26332F] hover:bg-[#F6F0D4]'
            }`}
          >
            <span>Todas as Categorias</span>
            {!selectedCategory && <Check className="w-3.5 h-3.5 text-[#F19F14]" aria-hidden="true" />}
          </button>

          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.slug;
            return (
              <button
                key={cat.id}
                onClick={() => updateFilter('category', isSelected ? '' : cat.slug)}
                aria-label={`Filtrar por categoria ${cat.name}`}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                  isSelected ? 'bg-[#071510] text-[#FFFFFF] font-semibold shadow-sm' : 'text-[#26332F] hover:bg-[#F6F0D4]'
                }`}
              >
                <span className="truncate">{cat.name}</span>
                {isSelected && <Check className="w-3.5 h-3.5 shrink-0 text-[#F19F14]" aria-hidden="true" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* PRICE RANGE FILTER */}
      <div className="space-y-3 pt-4 border-t border-[#E7E5DF]">
        <h4 className="text-xs font-bold text-[#26332F] uppercase tracking-wider">
          Faixa de Preço
        </h4>
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: '$ Econômico', value: '1' },
            { label: '$$ Moderado', value: '2' },
            { label: '$$$ Premium', value: '3' },
          ].map((item) => {
            const isSelected = selectedPrice === item.value;
            return (
              <button
                key={item.value}
                onClick={() => updateFilter('price', isSelected ? '' : item.value)}
                aria-label={`Filtrar por preço ${item.label}`}
                className={`px-2 py-2.5 rounded-xl text-[11px] font-semibold text-center transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#F19F14] text-[#071510] font-extrabold shadow-sm border border-[#F19F14]'
                    : 'bg-[#F6F0D4] hover:bg-[#E7E5DF] text-[#26332F] border border-[#E7E5DF]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* MOBILE TRIGGER BUTTON */}
      <div className="w-full lg:hidden flex justify-between items-center bg-white p-4 rounded-2xl border border-[#E7E5DF] shadow-sm">
        <span className="text-xs font-bold text-[#26332F]">
          Resultados: <span className="text-[#1B4931]">{totalResults} lugares</span>
        </span>
        <button
          onClick={() => setIsOpenMobile(true)}
          aria-label="Abrir gaveta de filtros"
          className="inline-flex items-center gap-2 bg-[#F19F14] hover:bg-[#D86E04] text-[#071510] font-bold text-xs px-4 py-2.5 rounded-xl shadow-md cursor-pointer"
        >
          <SlidersHorizontal className="w-4 h-4 text-[#071510]" aria-hidden="true" />
          <span>Filtrar resultados</span>
        </button>
      </div>

      {/* MOBILE DRAWER */}
      {isOpenMobile && (
        <div className="fixed inset-0 z-50 bg-[#071510]/70 backdrop-blur-sm flex justify-end lg:hidden">
          <div className="w-full max-w-xs bg-white h-full p-6 overflow-y-auto space-y-6 animate-in slide-in-from-right duration-200">
            <div className="flex justify-end">
              <button onClick={() => setIsOpenMobile(false)} aria-label="Fechar filtros" className="p-2 text-[#26332F]/60 hover:text-[#071510] cursor-pointer">
                <X className="w-6 h-6" aria-hidden="true" />
              </button>
            </div>
            {sidebarContent}
            <button
              onClick={() => setIsOpenMobile(false)}
              className="w-full bg-[#1B4931] hover:bg-[#071510] text-[#FFFFFF] font-bold py-3.5 rounded-xl shadow-md text-xs mt-6 cursor-pointer"
            >
              Aplicar Filtros
            </button>
          </div>
        </div>
      )}

      {/* DESKTOP STICKY SIDEBAR */}
      <aside className="hidden lg:block w-72 bg-white rounded-3xl border border-[#E7E5DF] p-6 shadow-sm h-fit sticky top-24">
        {sidebarContent}
      </aside>
    </>
  );
}
