'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { 
  Plus, 
  Trash2, 
  Edit3, 
  Eye, 
  EyeOff, 
  X, 
  Search,
  Clock,
  MapPin
} from 'lucide-react';
import { 
  getAllExperiencesAdmin, 
  saveExperienceAdmin, 
  deleteExperienceAdmin, 
  getAllBusinessesAdmin, 
  getCategories,
  getAllCitiesAdmin
} from '@/lib/services/data';
import { Experience, Business, Category, City } from '@/types';
import { formatCurrency } from '@/lib/utils';
import { ImageUploadInput } from '@/components/ui/ImageUploadInput';
import { useAdminCity } from '@/components/admin/AdminCityContext';

export default function AdminExperienciasPage() {
  const { selectedCityId } = useAdminCity();
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExp, setEditingExp] = useState<Partial<Experience> | null>(null);

  const loadData = useCallback(async () => {
    const [expList, bizList, catList, cityList] = await Promise.all([
      getAllExperiencesAdmin(selectedCityId),
      getAllBusinessesAdmin(selectedCityId),
      getCategories(selectedCityId !== 'all' ? (selectedCityId === 'city-atibaia' ? 'atibaia' : selectedCityId === 'city-socorro' ? 'socorro' : 'sao-roque') : undefined),
      getAllCitiesAdmin(),
    ]);
    setExperiences(expList);
    setBusinesses(bizList);
    setCategories(catList);
    setCities(cityList);
  }, [selectedCityId]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleOpenModal = (exp?: Experience) => {
    if (exp) {
      setEditingExp({ ...exp });
    } else {
      setEditingExp({
        name: '',
        slug: '',
        description: '',
        business_id: businesses[0]?.id || '',
        category_id: categories[0]?.id || '',
        city_id: selectedCityId !== 'all' ? selectedCityId : 'city-sao-roque',
        duration: '2 horas',
        price: 80,
        main_image_url: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80',
        status: 'published',
        is_featured: true,
        included: ['Degustação guiada', 'Acesso aos vinhedos'],
      });
    }
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingExp || !editingExp.name) return;

    await saveExperienceAdmin({
      ...editingExp,
      slug: editingExp.slug || editingExp.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-'),
    });

    setIsModalOpen(false);
    setEditingExp(null);
    loadData();
  };

  const handleDelete = async (id: string) => {
    if (confirm('Tem certeza que deseja excluir esta experiência?')) {
      await deleteExperienceAdmin(id);
      loadData();
    }
  };

  const handleToggleStatus = async (exp: Experience) => {
    const newStatus = exp.status === 'published' ? 'draft' : 'published';
    await saveExperienceAdmin({ ...exp, status: newStatus });
    loadData();
  };

  const filteredExperiences = experiences.filter((e) =>
    e.name.toLowerCase().includes(search.toLowerCase()) ||
    e.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 bg-[#F6F0D4]">
      
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E7E5DF] pb-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-[#26332F]">
            Gerenciar Experiências Turísticas
          </h1>
          <p className="text-xs text-[#26332F]/80">
            Cadastre degustações, voos de parapente, visitas guiadas, rafting, piqueniques e atrações marcantes
          </p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          aria-label="Cadastrar nova experiência"
          className="inline-flex items-center justify-center gap-2 bg-[#F19F14] hover:bg-[#D86E04] text-[#071510] hover:text-[#FFFFFF] font-bold text-xs px-5 py-3 rounded-xl shadow-md transition-all shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4" aria-hidden="true" />
          <span>Cadastrar Nova Experiência</span>
        </button>
      </div>

      {/* SEARCH TOOLBAR */}
      <div className="bg-white p-4 rounded-3xl border border-[#E7E5DF] shadow-sm flex items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-[#107492] absolute left-3 top-3" aria-hidden="true" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar experiência por nome..."
            className="w-full pl-9 pr-4 py-2 bg-[#F6F0D4] border border-[#E7E5DF] rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#F19F14] text-[#26332F]"
          />
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-3xl border border-[#E7E5DF] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F6F0D4] border-b border-[#E7E5DF] text-[#26332F] font-bold uppercase tracking-wider">
              <tr>
                <th className="p-4">Experiência</th>
                <th className="p-4">Destino</th>
                <th className="p-4">Empresa / Local</th>
                <th className="p-4">Duração</th>
                <th className="p-4">Preço</th>
                <th className="p-4">Status</th>
                <th className="p-4">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E7E5DF] font-medium">
              {filteredExperiences.map((exp) => {
                const cityName = exp.city_id === 'city-atibaia' ? 'Atibaia' : exp.city_id === 'city-socorro' ? 'Socorro' : 'São Roque';
                return (
                  <tr key={exp.id} className="hover:bg-[#F6F0D4]/40 transition-colors">
                    <td className="p-4 flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-[#F6F0D4] shrink-0 border border-[#E7E5DF]">
                        <Image
                          src={exp.main_image_url || 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=100&q=80'}
                          alt={exp.name}
                          fill
                          className="object-cover"
                          unoptimized={exp.main_image_url?.startsWith('data:')}
                        />
                      </div>
                      <div>
                        <span className="font-bold text-[#26332F] block">{exp.name}</span>
                        <span className="text-[#26332F]/70 text-[11px] line-clamp-1">{exp.description}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="inline-flex items-center gap-1 bg-[#F6F0D4] text-[#1B4931] px-2.5 py-1 rounded-lg text-[11px] font-bold border border-[#E7E5DF]">
                        <MapPin className="w-3 h-3 text-[#F19F14]" />
                        {cityName}
                      </span>
                    </td>
                    <td className="p-4 text-[#26332F]">
                      {exp.business?.name || 'Local Não Informado'}
                    </td>
                    <td className="p-4 text-[#26332F]/70 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#107492]" aria-hidden="true" />
                        {exp.duration}
                      </span>
                    </td>
                    <td className="p-4 font-bold text-[#107492]">
                      {exp.price > 0 ? formatCurrency(exp.price) : 'Gratuito'}
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => handleToggleStatus(exp)}
                        aria-label={`Alterar status da experiência ${exp.name}`}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold cursor-pointer ${
                          exp.status === 'published'
                            ? 'bg-[#1B4931] text-[#FFFFFF]'
                            : 'bg-[#F6F0D4] text-[#26332F]'
                        }`}
                      >
                        {exp.status === 'published' ? <Eye className="w-3 h-3 text-[#F19F14]" aria-hidden="true" /> : <EyeOff className="w-3 h-3" aria-hidden="true" />}
                        <span>{exp.status === 'published' ? 'Publicado' : 'Rascunho'}</span>
                      </button>
                    </td>
                    <td className="p-4 space-x-2 whitespace-nowrap">
                      <button
                        onClick={() => handleOpenModal(exp)}
                        aria-label={`Editar experiência ${exp.name}`}
                        className="p-1.5 text-[#26332F] hover:text-[#107492] bg-[#F6F0D4] hover:bg-[#E7E5DF] rounded-lg transition-colors cursor-pointer"
                        title="Editar"
                      >
                        <Edit3 className="w-3.5 h-3.5" aria-hidden="true" />
                      </button>
                      <button
                        onClick={() => handleDelete(exp.id)}
                        aria-label={`Excluir experiência ${exp.name}`}
                        className="p-1.5 text-rose-700 hover:text-rose-900 bg-rose-50 rounded-lg transition-colors cursor-pointer"
                        title="Excluir"
                      >
                        <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* EDIT / CREATE MODAL */}
      {isModalOpen && editingExp && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full border border-[#E7E5DF] shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#E7E5DF] pb-3">
              <h3 className="font-serif text-xl font-bold text-[#26332F]">
                {editingExp.id ? 'Editar Experiência' : 'Cadastrar Nova Experiência'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} aria-label="Fechar modal" className="text-[#26332F]/60 hover:text-[#26332F] cursor-pointer">
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                <div>
                  <label className="font-bold text-[#26332F] block mb-1">Destino / Cidade *</label>
                  <select
                    value={editingExp.city_id || 'city-sao-roque'}
                    onChange={(e) => setEditingExp({ ...editingExp, city_id: e.target.value })}
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
                  <label className="font-bold text-[#26332F] block mb-1">Título da Experiência *</label>
                  <input
                    type="text"
                    value={editingExp.name || ''}
                    onChange={(e) => setEditingExp({ ...editingExp, name: e.target.value })}
                    required
                    className="w-full px-3 py-2 border border-[#E7E5DF] rounded-xl text-[#26332F] focus:outline-none focus:ring-2 focus:ring-[#F19F14]"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#26332F] block mb-1">Empresa Anfitriã *</label>
                  <select
                    value={editingExp.business_id || ''}
                    onChange={(e) => setEditingExp({ ...editingExp, business_id: e.target.value })}
                    className="w-full px-3 py-2 border border-[#E7E5DF] rounded-xl bg-white text-[#26332F]"
                  >
                    {businesses.map((b) => (
                      <option key={b.id} value={b.id}>{b.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-bold text-[#26332F] block mb-1">Preço (R$) *</label>
                  <input
                    type="number"
                    value={editingExp.price || 0}
                    onChange={(e) => setEditingExp({ ...editingExp, price: Number(e.target.value) })}
                    required
                    className="w-full px-3 py-2 border border-[#E7E5DF] rounded-xl text-[#26332F] focus:outline-none focus:ring-2 focus:ring-[#F19F14]"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#26332F] block mb-1">Duração Estimada *</label>
                  <input
                    type="text"
                    value={editingExp.duration || ''}
                    onChange={(e) => setEditingExp({ ...editingExp, duration: e.target.value })}
                    placeholder="Ex.: 2 horas"
                    required
                    className="w-full px-3 py-2 border border-[#E7E5DF] rounded-xl text-[#26332F] focus:outline-none focus:ring-2 focus:ring-[#F19F14]"
                  />
                </div>

                <ImageUploadInput
                  value={editingExp.main_image_url || ''}
                  onChange={(url) => setEditingExp({ ...editingExp, main_image_url: url })}
                  label="Imagem Principal da Experiência"
                />

                <div className="sm:col-span-2">
                  <label className="font-bold text-[#26332F] block mb-1">Descrição Completa</label>
                  <textarea
                    rows={3}
                    value={editingExp.description || ''}
                    onChange={(e) => setEditingExp({ ...editingExp, description: e.target.value })}
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
                  Salvar Experiência
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
