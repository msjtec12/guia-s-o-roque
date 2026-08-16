'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { 
  Plus, 
  Trash2, 
  Edit3, 
  CheckCircle2, 
  XCircle, 
  X, 
  Compass
} from 'lucide-react';
import { getCategories, saveCategoryAdmin, deleteCategoryAdmin, getAllCitiesAdmin } from '@/lib/services/data';
import { Category, City } from '@/types';
import { ImageUploadInput } from '@/components/ui/ImageUploadInput';
import { useAdminCity } from '@/components/admin/AdminCityContext';

export default function AdminCategoriasPage() {
  const { selectedCityId } = useAdminCity();
  const [categories, setCategories] = useState<Category[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCat, setEditingCat] = useState<Partial<Category> | null>(null);

  const loadCategories = useCallback(async () => {
    const [list, cityList] = await Promise.all([
      getCategories(selectedCityId !== 'all' ? (selectedCityId === 'city-atibaia' ? 'atibaia' : selectedCityId === 'city-socorro' ? 'socorro' : 'sao-roque') : undefined),
      getAllCitiesAdmin(),
    ]);
    setCategories(list);
    setCities(cityList);
  }, [selectedCityId]);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  const handleOpenModal = (cat?: Category) => {
    if (cat) {
      setEditingCat({ ...cat });
    } else {
      setEditingCat({
        name: '',
        slug: '',
        description: '',
        city_id: selectedCityId !== 'all' ? selectedCityId : 'city-sao-roque',
        icon: 'Compass',
        image_url: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80',
        is_active: true,
      });
    }
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCat || !editingCat.name) return;

    await saveCategoryAdmin({
      ...editingCat,
      slug: editingCat.slug || editingCat.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-'),
    });

    setIsModalOpen(false);
    setEditingCat(null);
    loadCategories();
  };

  const handleDelete = async (id: string) => {
    if (confirm('Tem certeza que deseja excluir esta categoria?')) {
      await deleteCategoryAdmin(id);
      loadCategories();
    }
  };

  const handleToggleActive = async (cat: Category) => {
    await saveCategoryAdmin({ ...cat, is_active: !cat.is_active });
    loadCategories();
  };

  return (
    <div className="space-y-6 bg-[#F6F0D4]">
      
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E7E5DF] pb-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-[#26332F]">
            Gerenciar Categorias
          </h1>
          <p className="text-xs text-[#26332F]/80">
            Cadastre, edite e ative categorias para filtrar vinícolas, restaurantes, hotéis, cervejarias e atrações
          </p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          aria-label="Cadastrar nova categoria"
          className="inline-flex items-center justify-center gap-2 bg-[#F19F14] hover:bg-[#D86E04] text-[#071510] hover:text-[#FFFFFF] font-bold text-xs px-5 py-3 rounded-xl shadow-md transition-all shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4" aria-hidden="true" />
          <span>Cadastrar Nova Categoria</span>
        </button>
      </div>

      {/* CATEGORIES CARDS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {categories.map((cat) => {
          const cityName = cat.city_id === 'city-atibaia' ? 'Atibaia' : cat.city_id === 'city-socorro' ? 'Socorro' : 'São Roque';

          return (
            <div key={cat.id} className="bg-white rounded-3xl border border-[#E7E5DF] shadow-sm overflow-hidden flex flex-col justify-between">
              <div className="relative h-32 w-full bg-[#071510]">
                {cat.image_url && (
                  <Image
                    src={cat.image_url}
                    alt={cat.name}
                    fill
                    className="object-cover opacity-80"
                    unoptimized={cat.image_url.startsWith('data:')}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#071510]/80 via-[#071510]/30 to-transparent" />
                
                <div className="absolute bottom-3 left-3 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-white text-[#107492] flex items-center justify-center font-bold shadow-xs">
                    <Compass className="w-4 h-4" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-serif text-base font-bold text-[#FFFFFF]">
                      {cat.name}
                    </h3>
                    <span className="text-[10px] text-[#F19F14] font-semibold block">{cityName}</span>
                  </div>
                </div>

                <div className="absolute top-3 right-3">
                  <button
                    onClick={() => handleToggleActive(cat)}
                    aria-label={`Alternar status da categoria ${cat.name}`}
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold shadow-xs cursor-pointer ${
                      cat.is_active !== false
                        ? 'bg-[#1B4931] text-[#FFFFFF]'
                        : 'bg-[#F6F0D4] text-[#26332F]/60'
                    }`}
                  >
                    {cat.is_active !== false ? (
                      <>
                        <CheckCircle2 className="w-3 h-3 text-[#F19F14]" aria-hidden="true" />
                        <span>Ativa</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-3 h-3 text-red-600" aria-hidden="true" />
                        <span>Inativa</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                <p className="text-xs text-[#26332F]/80 leading-relaxed line-clamp-2">
                  {cat.description}
                </p>

                <div className="pt-3 border-t border-[#E7E5DF] flex items-center justify-between text-xs">
                  <span className="text-[11px] font-semibold text-[#107492]">Slug: {cat.slug}</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleOpenModal(cat)}
                      aria-label={`Editar categoria ${cat.name}`}
                      className="p-1.5 text-[#26332F] hover:text-[#107492] bg-[#F6F0D4] hover:bg-[#E7E5DF] rounded-lg transition-colors cursor-pointer"
                      title="Editar"
                    >
                      <Edit3 className="w-3.5 h-3.5" aria-hidden="true" />
                    </button>
                    <button
                      onClick={() => handleDelete(cat.id)}
                      aria-label={`Excluir categoria ${cat.name}`}
                      className="p-1.5 text-rose-700 hover:text-rose-900 bg-rose-50 rounded-lg transition-colors cursor-pointer"
                      title="Excluir"
                    >
                      <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* EDIT / CREATE MODAL */}
      {isModalOpen && editingCat && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-[#E7E5DF] shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-[#E7E5DF] pb-3">
              <h3 className="font-serif text-xl font-bold text-[#26332F]">
                {editingCat.id ? 'Editar Categoria' : 'Cadastrar Nova Categoria'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} aria-label="Fechar modal" className="text-[#26332F]/60 hover:text-[#26332F] cursor-pointer">
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="space-y-3">
                <div>
                  <label className="font-bold text-[#26332F] block mb-1">Destino / Cidade *</label>
                  <select
                    value={editingCat.city_id || 'city-sao-roque'}
                    onChange={(e) => setEditingCat({ ...editingCat, city_id: e.target.value })}
                    className="w-full px-3 py-2 border border-[#E7E5DF] rounded-xl bg-white text-[#26332F] font-semibold"
                  >
                    {cities.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name} - {c.state}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-bold text-[#26332F] block mb-1">Nome da Categoria *</label>
                  <input
                    type="text"
                    value={editingCat.name || ''}
                    onChange={(e) => setEditingCat({ ...editingCat, name: e.target.value })}
                    required
                    className="w-full px-3 py-2 border border-[#E7E5DF] rounded-xl text-[#26332F] focus:outline-none focus:ring-2 focus:ring-[#F19F14]"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#26332F] block mb-1">Slug (URL amigável)</label>
                  <input
                    type="text"
                    value={editingCat.slug || ''}
                    onChange={(e) => setEditingCat({ ...editingCat, slug: e.target.value })}
                    placeholder="gerado-automaticamente"
                    className="w-full px-3 py-2 border border-[#E7E5DF] rounded-xl text-[#26332F] focus:outline-none focus:ring-2 focus:ring-[#F19F14]"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#26332F] block mb-1">Ícone (Nome Lucide)</label>
                  <input
                    type="text"
                    value={editingCat.icon || 'Compass'}
                    onChange={(e) => setEditingCat({ ...editingCat, icon: e.target.value })}
                    placeholder="Wine, Mountain, Utensils, Hotel, Bus, Waves..."
                    className="w-full px-3 py-2 border border-[#E7E5DF] rounded-xl text-[#26332F] focus:outline-none focus:ring-2 focus:ring-[#F19F14]"
                  />
                </div>

                <ImageUploadInput
                  value={editingCat.image_url || ''}
                  onChange={(url) => setEditingCat({ ...editingCat, image_url: url })}
                  label="Imagem de Capa da Categoria"
                />

                <div>
                  <label className="font-bold text-[#26332F] block mb-1">Descrição Curta</label>
                  <textarea
                    rows={3}
                    value={editingCat.description || ''}
                    onChange={(e) => setEditingCat({ ...editingCat, description: e.target.value })}
                    className="w-full px-3 py-2 border border-[#E7E5DF] rounded-xl text-[#26332F] focus:outline-none focus:ring-2 focus:ring-[#F19F14]"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-[#E7E5DF] flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-[#F6F0D4] text-[#26332F] font-semibold cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-[#F19F14] hover:bg-[#D86E04] text-[#071510] hover:text-[#FFFFFF] font-bold cursor-pointer"
                >
                  Salvar Categoria
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
