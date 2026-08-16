'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { 
  Plus, 
  Trash2, 
  Edit3, 
  Eye, 
  EyeOff, 
  Crown, 
  X,
  Search,
  MapPin
} from 'lucide-react';
import { getAllBusinessesAdmin, saveBusinessAdmin, deleteBusinessAdmin, getCategories, getAllCitiesAdmin } from '@/lib/services/data';
import { Business, Category, BusinessPlan, BusinessStatus, City } from '@/types';
import { ImageUploadInput } from '@/components/ui/ImageUploadInput';
import { useAdminCity } from '@/components/admin/AdminCityContext';

export default function AdminEmpresasPage() {
  const { selectedCityId } = useAdminCity();
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [search, setSearch] = useState('');
  const [filterPlan, setFilterPlan] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBiz, setEditingBiz] = useState<Partial<Business> | null>(null);

  const loadData = useCallback(async () => {
    const [bizList, catList, cityList] = await Promise.all([
      getAllBusinessesAdmin(selectedCityId),
      getCategories(selectedCityId !== 'all' ? (selectedCityId === 'city-atibaia' ? 'atibaia' : selectedCityId === 'city-socorro' ? 'socorro' : 'sao-roque') : undefined),
      getAllCitiesAdmin(),
    ]);
    setBusinesses(bizList);
    setCategories(catList);
    setCities(cityList);
  }, [selectedCityId]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleOpenModal = (biz?: Business) => {
    if (biz) {
      setEditingBiz({ ...biz });
    } else {
      setEditingBiz({
        name: '',
        slug: '',
        description: '',
        category_id: categories[0]?.id || '',
        city_id: selectedCityId !== 'all' ? selectedCityId : 'city-sao-roque',
        address: 'São Roque - SP',
        phone: '(11) 9999-9999',
        whatsapp: '5511999999999',
        instagram: '',
        website: '',
        price_min: 50,
        price_max: 150,
        opening_hours: 'Segunda a Domingo, 09h às 18h',
        main_image_url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
        status: 'published',
        plan: 'free',
        is_featured: false,
        is_premium: false,
      });
    }
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBiz || !editingBiz.name) return;

    await saveBusinessAdmin(editingBiz);
    setIsModalOpen(false);
    setEditingBiz(null);
    loadData();
  };

  const handleDelete = async (id: string) => {
    if (confirm('Tem certeza que deseja excluir esta empresa?')) {
      await deleteBusinessAdmin(id);
      loadData();
    }
  };

  const handleToggleStatus = async (biz: Business) => {
    const newStatus: BusinessStatus = biz.status === 'published' ? 'draft' : 'published';
    await saveBusinessAdmin({ ...biz, status: newStatus });
    loadData();
  };

  const filteredBusinesses = businesses.filter((b) => {
    const matchesSearch =
      b.name.toLowerCase().includes(search.toLowerCase()) ||
      b.address.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = filterStatus === 'all' || b.status === filterStatus;
    
    let matchesPlan = true;
    if (filterPlan === 'premium') matchesPlan = b.is_premium || b.plan === 'premium';
    else if (filterPlan === 'highlight') matchesPlan = (b.is_featured || b.plan === 'highlight') && !b.is_premium;
    else if (filterPlan === 'free') matchesPlan = b.plan === 'free' && !b.is_featured && !b.is_premium;

    return matchesSearch && matchesStatus && matchesPlan;
  });

  return (
    <div className="space-y-6 bg-[#F6F0D4]">
      
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E7E5DF] pb-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-[#26332F]">
            Gerenciar Empresas & Anunciantes
          </h1>
          <p className="text-xs text-[#26332F]/80">
            Cadastre, edite, altere planos, publique ou remova estabelecimentos comerciais
          </p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          aria-label="Cadastrar nova empresa"
          className="inline-flex items-center justify-center gap-2 bg-[#F19F14] hover:bg-[#D86E04] text-[#071510] hover:text-[#FFFFFF] font-bold text-xs px-5 py-3 rounded-xl shadow-md transition-all shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4" aria-hidden="true" />
          <span>Cadastrar Nova Empresa</span>
        </button>
      </div>

      {/* SEARCH AND FILTERS TOOLBAR */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-3xl border border-[#E7E5DF] shadow-sm">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-[#107492] absolute left-3 top-3" aria-hidden="true" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por nome ou endereço..."
            className="w-full pl-9 pr-4 py-2 bg-[#F6F0D4] border border-[#E7E5DF] rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#F19F14] text-[#26332F]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          {/* STATUS FILTER */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 bg-[#F6F0D4] border border-[#E7E5DF] rounded-xl text-xs font-semibold text-[#26332F] focus:outline-none focus:ring-2 focus:ring-[#F19F14]"
          >
            <option value="all">Todos os Status</option>
            <option value="published">Publicados</option>
            <option value="draft">Rascunhos</option>
          </select>

          {/* PLAN FILTER */}
          <select
            value={filterPlan}
            onChange={(e) => setFilterPlan(e.target.value)}
            className="px-3 py-2 bg-[#F6F0D4] border border-[#E7E5DF] rounded-xl text-xs font-semibold text-[#26332F] focus:outline-none focus:ring-2 focus:ring-[#F19F14]"
          >
            <option value="all">Todos os Planos</option>
            <option value="premium">Premium</option>
            <option value="highlight">Destaque</option>
            <option value="free">Gratuito</option>
          </select>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-3xl border border-[#E7E5DF] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F6F0D4] border-b border-[#E7E5DF] text-[#26332F] font-bold uppercase tracking-wider">
              <tr>
                <th className="p-4">Empresa</th>
                <th className="p-4">Destino / Cidade</th>
                <th className="p-4">Categoria</th>
                <th className="p-4">Plano</th>
                <th className="p-4">Status</th>
                <th className="p-4">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E7E5DF] font-medium">
              {filteredBusinesses.map((biz) => {
                const cityName = biz.city?.name || (biz.city_id === 'city-atibaia' ? 'Atibaia' : biz.city_id === 'city-socorro' ? 'Socorro' : 'São Roque');
                return (
                  <tr key={biz.id} className="hover:bg-[#F6F0D4]/40 transition-colors">
                    <td className="p-4 flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-[#F6F0D4] shrink-0 border border-[#E7E5DF]">
                        <Image
                          src={biz.main_image_url || 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=100&q=80'}
                          alt={biz.name}
                          fill
                          className="object-cover"
                          unoptimized={biz.main_image_url?.startsWith('data:')}
                        />
                      </div>
                      <div>
                        <span className="font-bold text-[#26332F] block">{biz.name}</span>
                        <span className="text-[#26332F]/70 text-[11px]">{biz.address}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="inline-flex items-center gap-1 bg-[#F6F0D4] text-[#1B4931] px-2.5 py-1 rounded-lg text-[11px] font-bold border border-[#E7E5DF]">
                        <MapPin className="w-3 h-3 text-[#F19F14]" />
                        {cityName}
                      </span>
                    </td>
                    <td className="p-4 text-[#26332F]">
                      {biz.category?.name || 'Sem Categoria'}
                    </td>
                    <td className="p-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          biz.is_premium || biz.plan === 'premium'
                            ? 'bg-[#F6F0D4] text-[#071510] border border-[#F19F14]'
                            : biz.is_featured || biz.plan === 'highlight'
                            ? 'bg-[#1B4931]/10 text-[#1B4931]'
                            : 'bg-white text-[#26332F]/70 border border-[#E7E5DF]'
                        }`}
                      >
                        {(biz.is_premium || biz.plan === 'premium') && <Crown className="w-3 h-3 fill-[#F19F14]" aria-hidden="true" />}
                        {biz.plan.toUpperCase()}
                      </span>
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => handleToggleStatus(biz)}
                        aria-label={`Alterar status de ${biz.name}`}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold cursor-pointer ${
                          biz.status === 'published'
                            ? 'bg-[#1B4931] text-[#FFFFFF]'
                            : 'bg-[#F6F0D4] text-[#26332F]'
                        }`}
                      >
                        {biz.status === 'published' ? <Eye className="w-3 h-3 text-[#F19F14]" aria-hidden="true" /> : <EyeOff className="w-3 h-3" aria-hidden="true" />}
                        <span>{biz.status === 'published' ? 'Publicado' : 'Rascunho'}</span>
                      </button>
                    </td>
                    <td className="p-4 space-x-2 whitespace-nowrap">
                      <button
                        onClick={() => handleOpenModal(biz)}
                        aria-label={`Editar ${biz.name}`}
                        className="p-1.5 text-[#26332F] hover:text-[#107492] bg-[#F6F0D4] hover:bg-[#E7E5DF] rounded-lg transition-colors cursor-pointer"
                        title="Editar"
                      >
                        <Edit3 className="w-3.5 h-3.5" aria-hidden="true" />
                      </button>
                      <button
                        onClick={() => handleDelete(biz.id)}
                        aria-label={`Excluir ${biz.name}`}
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
      {isModalOpen && editingBiz && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full border border-[#E7E5DF] shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#E7E5DF] pb-3">
              <h3 className="font-serif text-xl font-bold text-[#26332F]">
                {editingBiz.id ? 'Editar Empresa' : 'Cadastrar Nova Empresa'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} aria-label="Fechar modal" className="text-[#26332F]/60 hover:text-[#26332F] cursor-pointer">
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                <div>
                  <label className="font-bold text-[#26332F] block mb-1">Cidade / Destino *</label>
                  <select
                    value={editingBiz.city_id || 'city-sao-roque'}
                    onChange={(e) => setEditingBiz({ ...editingBiz, city_id: e.target.value })}
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
                  <label className="font-bold text-[#26332F] block mb-1">Nome da Empresa *</label>
                  <input
                    type="text"
                    value={editingBiz.name || ''}
                    onChange={(e) => setEditingBiz({ ...editingBiz, name: e.target.value })}
                    required
                    className="w-full px-3 py-2 border border-[#E7E5DF] rounded-xl text-[#26332F] focus:outline-none focus:ring-2 focus:ring-[#F19F14]"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#26332F] block mb-1">Categoria *</label>
                  <select
                    value={editingBiz.category_id || ''}
                    onChange={(e) => setEditingBiz({ ...editingBiz, category_id: e.target.value })}
                    className="w-full px-3 py-2 border border-[#E7E5DF] rounded-xl bg-white text-[#26332F]"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-bold text-[#26332F] block mb-1">WhatsApp Comercial *</label>
                  <input
                    type="text"
                    value={editingBiz.whatsapp || ''}
                    onChange={(e) => setEditingBiz({ ...editingBiz, whatsapp: e.target.value })}
                    required
                    className="w-full px-3 py-2 border border-[#E7E5DF] rounded-xl text-[#26332F] focus:outline-none focus:ring-2 focus:ring-[#F19F14]"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#26332F] block mb-1">Telefone</label>
                  <input
                    type="text"
                    value={editingBiz.phone || ''}
                    onChange={(e) => setEditingBiz({ ...editingBiz, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-[#E7E5DF] rounded-xl text-[#26332F] focus:outline-none focus:ring-2 focus:ring-[#F19F14]"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#26332F] block mb-1">Plano da Empresa</label>
                  <select
                    value={editingBiz.plan || 'free'}
                    onChange={(e) => {
                      const val = e.target.value as BusinessPlan;
                      setEditingBiz({ 
                        ...editingBiz, 
                        plan: val,
                        is_premium: val === 'premium',
                        is_featured: val === 'highlight' || val === 'premium'
                      });
                    }}
                    className="w-full px-3 py-2 border border-[#E7E5DF] rounded-xl bg-white text-[#26332F]"
                  >
                    <option value="free">Gratuito</option>
                    <option value="highlight">Destaque</option>
                    <option value="premium">Premium</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-[#26332F] block mb-1">Status</label>
                  <select
                    value={editingBiz.status || 'published'}
                    onChange={(e) => setEditingBiz({ ...editingBiz, status: e.target.value as BusinessStatus })}
                    className="w-full px-3 py-2 border border-[#E7E5DF] rounded-xl bg-white text-[#26332F]"
                  >
                    <option value="published">Publicado</option>
                    <option value="draft">Rascunho</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="font-bold text-[#26332F] block mb-1">Endereço Completo</label>
                  <input
                    type="text"
                    value={editingBiz.address || ''}
                    onChange={(e) => setEditingBiz({ ...editingBiz, address: e.target.value })}
                    className="w-full px-3 py-2 border border-[#E7E5DF] rounded-xl text-[#26332F] focus:outline-none focus:ring-2 focus:ring-[#F19F14]"
                  />
                </div>

                <ImageUploadInput
                  value={editingBiz.main_image_url || ''}
                  onChange={(url) => setEditingBiz({ ...editingBiz, main_image_url: url })}
                  label="Imagem Principal da Empresa"
                />

                <div className="sm:col-span-2">
                  <label className="font-bold text-[#26332F] block mb-1">Descrição</label>
                  <textarea
                    rows={3}
                    value={editingBiz.description || ''}
                    onChange={(e) => setEditingBiz({ ...editingBiz, description: e.target.value })}
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
                  Salvar Empresa
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
