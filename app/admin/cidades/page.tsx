'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { 
  Globe2, 
  Plus, 
  Edit3, 
  Trash2, 
  MapPin, 
  X, 
  ExternalLink,
  Power
} from 'lucide-react';
import { City } from '@/types';
import { getAllCitiesAdmin, saveCityAdmin, deleteCityAdmin } from '@/lib/services/data';

export default function AdminCidadesPage() {
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCity, setEditingCity] = useState<City | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    state: 'SP',
    subtitle: '',
    description: '',
    hero_image: '',
    tags: 'Turismo, Gastronomia, Natureza',
    active: true,
  });

  const loadCities = useCallback(async () => {
    setLoading(true);
    const data = await getAllCitiesAdmin();
    setCities(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadCities();
  }, [loadCities]);

  const openNewModal = () => {
    setEditingCity(null);
    setFormData({
      name: '',
      slug: '',
      state: 'SP',
      subtitle: '',
      description: '',
      hero_image: '',
      tags: 'Turismo, Gastronomia, Natureza',
      active: true,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (city: City) => {
    setEditingCity(city);
    setFormData({
      name: city.name,
      slug: city.slug,
      state: city.state,
      subtitle: city.subtitle || '',
      description: city.description || '',
      hero_image: city.hero_image || city.image_url || '',
      tags: city.tags ? city.tags.join(', ') : '',
      active: city.active ?? true,
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const tagsArray = formData.tags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    await saveCityAdmin({
      id: editingCity ? editingCity.id : undefined,
      name: formData.name,
      slug: formData.slug || formData.name.toLowerCase().replace(/\s+/g, '-'),
      state: formData.state,
      subtitle: formData.subtitle,
      description: formData.description,
      hero_image: formData.hero_image,
      image_url: formData.hero_image,
      tags: tagsArray,
      active: formData.active,
    });

    setIsModalOpen(false);
    await loadCities();
  };

  const handleToggleActive = async (city: City) => {
    await saveCityAdmin({
      ...city,
      active: !city.active,
    });
    await loadCities();
  };

  const handleDelete = async (cityId: string) => {
    if (confirm('Tem certeza que deseja excluir esta cidade? Esta ação é irreversível.')) {
      await deleteCityAdmin(cityId);
      await loadCities();
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#e6dfd4] pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#183A32]/10 text-[#183A32] text-xs font-semibold">
            <Globe2 className="w-3.5 h-3.5 text-[#D49A3A]" />
            <span>Gestão de Destinos Turísticos</span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-[#26332F] mt-1">
            Cidades & Destinos Ativos
          </h1>
          <p className="text-xs sm:text-sm text-[#52615B]">
            Gerencie os destinos disponíveis na plataforma DESCUBRA.
          </p>
        </div>

        <button
          onClick={openNewModal}
          className="inline-flex items-center gap-2 bg-[#183A32] hover:bg-[#245247] text-[#FCFAF5] font-bold text-xs px-5 py-3 rounded-xl shadow-md transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4 text-[#D49A3A]" />
          <span>Adicionar Novo Destino</span>
        </button>
      </div>

      {/* CITIES LIST */}
      {loading ? (
        <div className="text-center py-12 text-sm text-[#82967A]">Carregando destinos...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cities.map((city) => (
            <div
              key={city.id}
              className="bg-white rounded-3xl border border-[#e6dfd4] overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              {/* IMAGE HEADER */}
              <div className="relative h-44 w-full bg-[#183A32] overflow-hidden">
                <Image
                  src={city.hero_image || city.image_url || '/images/hero-sao-roque.webp'}
                  alt={city.name}
                  fill
                  className="object-cover opacity-85"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#26332F] via-transparent to-transparent" />

                {/* BADGE STATUS */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span
                    className={`inline-flex items-center gap-1 text-[11px] font-bold px-3 py-1 rounded-full shadow-sm ${
                      city.active !== false
                        ? 'bg-emerald-600 text-white'
                        : 'bg-stone-600 text-white'
                    }`}
                  >
                    <Power className="w-3 h-3" />
                    {city.active !== false ? 'Cidade Ativa' : 'Inativa'}
                  </span>
                </div>

                <div className="absolute bottom-3 left-4 right-4 text-[#FCFAF5]">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#D49A3A]" />
                    <h3 className="font-serif text-2xl font-bold">{city.name}</h3>
                    <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">{city.state}</span>
                  </div>
                </div>
              </div>

              {/* BODY CONTENT */}
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <span className="text-xs font-mono text-[#82967A]">
                    Slug URL: /{city.slug}
                  </span>
                  <p className="text-xs text-[#52615B] line-clamp-3 leading-relaxed">
                    {city.description}
                  </p>

                  {city.tags && city.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {city.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-0.5 rounded-md bg-[#F4EBDD] text-[#183A32] text-[10px] font-semibold"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* ACTIONS */}
                <div className="pt-4 border-t border-[#F4EBDD] flex items-center justify-between gap-2">
                  <a
                    href={`/${city.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-[#183A32] hover:text-[#722F3E] font-semibold"
                  >
                    <span>Ver página pública</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleToggleActive(city)}
                      title={city.active !== false ? 'Desativar cidade' : 'Ativar cidade'}
                      className="p-2 rounded-xl bg-[#F4EBDD] hover:bg-[#e8dbca] text-[#183A32] text-xs font-semibold cursor-pointer"
                    >
                      <Power className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => openEditModal(city)}
                      title="Editar cidade"
                      className="p-2 rounded-xl bg-[#F4EBDD] hover:bg-[#e8dbca] text-[#183A32] text-xs font-semibold cursor-pointer"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => handleDelete(city.id)}
                      title="Excluir cidade"
                      className="p-2 rounded-xl bg-rose-100 hover:bg-rose-200 text-rose-700 text-xs font-semibold cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CREATE / EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl p-8 max-w-xl w-full border border-[#e6dfd4] shadow-2xl space-y-6 animate-in zoom-in-95 duration-200 my-8">
            <div className="flex items-center justify-between border-b border-[#e6dfd4] pb-4">
              <h3 className="font-serif text-xl font-bold text-[#26332F]">
                {editingCity ? 'Editar Destino Turístico' : 'Adicionar Novo Destino'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-[#82967A] hover:text-[#26332F] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#26332F] uppercase tracking-wider">
                    Nome da Cidade *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ex.: Campos do Jordão"
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#e6dfd4] text-xs font-semibold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#26332F] uppercase tracking-wider">
                    Slug da URL *
                  </label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="Ex.: campos-do-jordao"
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#e6dfd4] text-xs font-semibold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#26332F] uppercase tracking-wider">
                    Estado (UF) *
                  </label>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    placeholder="SP"
                    maxLength={2}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#e6dfd4] text-xs font-semibold uppercase"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#26332F] uppercase tracking-wider">
                    Subtítulo / Slogan
                  </label>
                  <input
                    type="text"
                    value={formData.subtitle}
                    onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                    placeholder="Ex.: Montanhas e Experiências"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#e6dfd4] text-xs font-medium"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#26332F] uppercase tracking-wider">
                  Descrição Editorial *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  placeholder="Conte o que torna este destino único..."
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#e6dfd4] text-xs font-medium"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#26332F] uppercase tracking-wider">
                  URL da Imagem Hero / Capa
                </label>
                <input
                  type="text"
                  value={formData.hero_image}
                  onChange={(e) => setFormData({ ...formData, hero_image: e.target.value })}
                  placeholder="/images/hero-cidade.webp ou URL da imagem"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#e6dfd4] text-xs font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#26332F] uppercase tracking-wider">
                  Tags (separadas por vírgula)
                </label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="Vinhos, Gastronomia, Natureza, Aventura"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#e6dfd4] text-xs font-medium"
                />
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.active}
                    onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                    className="w-4 h-4 rounded text-[#183A32] accent-[#183A32]"
                  />
                  <span className="text-xs font-semibold text-[#26332F]">
                    Destino Ativo na Plataforma
                  </span>
                </label>
              </div>

              <div className="pt-4 border-t border-[#e6dfd4] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold text-[#52615B] hover:bg-[#F4EBDD] cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl text-xs font-bold bg-[#183A32] hover:bg-[#245247] text-[#FCFAF5] shadow-md cursor-pointer"
                >
                  Salvar Destino
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
