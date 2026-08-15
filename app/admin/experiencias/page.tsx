'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { 
  Plus, 
  Trash2, 
  Edit3, 
  Eye, 
  EyeOff, 
  X, 
  Search,
  Clock
} from 'lucide-react';
import { 
  getAllExperiencesAdmin, 
  saveExperienceAdmin, 
  deleteExperienceAdmin, 
  getAllBusinessesAdmin, 
  getCategories 
} from '@/lib/services/data';
import { Experience, Business, Category } from '@/types';
import { formatCurrency } from '@/lib/utils';
import { ImageUploadInput } from '@/components/ui/ImageUploadInput';

export default function AdminExperienciasPage() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExp, setEditingExp] = useState<Partial<Experience> | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const [expList, bizList, catList] = await Promise.all([
      getAllExperiencesAdmin(),
      getAllBusinessesAdmin(),
      getCategories(),
    ]);
    setExperiences(expList);
    setBusinesses(bizList);
    setCategories(catList);
  };

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
    <div className="space-y-6 bg-[#FCFAF5]">
      
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#e6dfd4] pb-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-[#26332F]">
            Gerenciar Experiências Turísticas
          </h1>
          <p className="text-xs text-[#52615B]">
            Cadastre degustações, visitas guiadas, piqueniques e atrações marcantes em São Roque
          </p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          aria-label="Cadastrar nova experiência"
          className="inline-flex items-center justify-center gap-2 bg-[#183A32] hover:bg-[#245247] text-[#FCFAF5] font-bold text-xs px-5 py-3 rounded-xl shadow-md transition-all shrink-0"
        >
          <Plus className="w-4 h-4 text-[#D49A3A]" aria-hidden="true" />
          <span>Cadastrar Nova Experiência</span>
        </button>
      </div>

      {/* SEARCH TOOLBAR */}
      <div className="bg-white p-4 rounded-2xl border border-[#e6dfd4] shadow-sm flex items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-[#82967A] absolute left-3 top-3" aria-hidden="true" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar experiência por nome..."
            className="w-full pl-9 pr-4 py-2 bg-[#FCFAF5] border border-[#e6dfd4] rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#183A32] text-[#26332F]"
          />
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl border border-[#e6dfd4] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FCFAF5] border-b border-[#e6dfd4] text-[#26332F] font-bold uppercase tracking-wider">
              <tr>
                <th className="p-4">Experiência</th>
                <th className="p-4">Empresa / Local</th>
                <th className="p-4">Duração</th>
                <th className="p-4">Preço</th>
                <th className="p-4">Status</th>
                <th className="p-4">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F4EBDD] font-medium">
              {filteredExperiences.map((exp) => (
                <tr key={exp.id} className="hover:bg-[#FCFAF5] transition-colors">
                  <td className="p-4 flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-[#FCFAF5] shrink-0 border border-[#e6dfd4]">
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
                      <span className="text-[#52615B] text-[11px] line-clamp-1">{exp.description}</span>
                    </div>
                  </td>
                  <td className="p-4 text-[#26332F]">
                    {exp.business?.name || 'Local Não Informado'}
                  </td>
                  <td className="p-4 text-[#52615B] whitespace-nowrap">
                    <span className="inline-flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#183A32]" aria-hidden="true" />
                      {exp.duration}
                    </span>
                  </td>
                  <td className="p-4 font-bold text-[#722F3E]">
                    {exp.price > 0 ? formatCurrency(exp.price) : 'Gratuito'}
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => handleToggleStatus(exp)}
                      aria-label={`Alterar status da experiência ${exp.name}`}
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        exp.status === 'published'
                          ? 'bg-[#183A32] text-[#FCFAF5]'
                          : 'bg-[#F4EBDD] text-[#26332F]'
                      }`}
                    >
                      {exp.status === 'published' ? <Eye className="w-3 h-3 text-[#D49A3A]" aria-hidden="true" /> : <EyeOff className="w-3 h-3" aria-hidden="true" />}
                      <span>{exp.status === 'published' ? 'Publicado' : 'Rascunho'}</span>
                    </button>
                  </td>
                  <td className="p-4 space-x-2 whitespace-nowrap">
                    <button
                      onClick={() => handleOpenModal(exp)}
                      aria-label={`Editar experiência ${exp.name}`}
                      className="p-1.5 text-[#26332F] hover:text-[#183A32] bg-[#F4EBDD] hover:bg-[#e8dbca] rounded-lg transition-colors"
                      title="Editar"
                    >
                      <Edit3 className="w-3.5 h-3.5" aria-hidden="true" />
                    </button>
                    <button
                      onClick={() => handleDelete(exp.id)}
                      aria-label={`Excluir experiência ${exp.name}`}
                      className="p-1.5 text-[#722F3E] hover:text-rose-800 bg-[#722F3E]/10 rounded-lg transition-colors"
                      title="Excluir"
                    >
                      <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* EDIT / CREATE MODAL */}
      {isModalOpen && editingExp && (
        <div className="fixed inset-0 z-50 bg-[#26332F]/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full border border-[#e6dfd4] shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#F4EBDD] pb-3">
              <h3 className="font-serif text-xl font-bold text-[#26332F]">
                {editingExp.id ? 'Editar Experiência' : 'Cadastrar Nova Experiência'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} aria-label="Fechar modal" className="text-[#82967A] hover:text-[#26332F]">
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                <div>
                  <label className="font-bold text-[#26332F] block mb-1">Título da Experiência *</label>
                  <input
                    type="text"
                    value={editingExp.name || ''}
                    onChange={(e) => setEditingExp({ ...editingExp, name: e.target.value })}
                    required
                    className="w-full px-3 py-2 border border-[#e6dfd4] rounded-xl text-[#26332F]"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#26332F] block mb-1">Empresa Anfitriã *</label>
                  <select
                    value={editingExp.business_id || ''}
                    onChange={(e) => setEditingExp({ ...editingExp, business_id: e.target.value })}
                    className="w-full px-3 py-2 border border-[#e6dfd4] rounded-xl bg-white text-[#26332F]"
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
                    className="w-full px-3 py-2 border border-[#e6dfd4] rounded-xl text-[#26332F]"
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
                    className="w-full px-3 py-2 border border-[#e6dfd4] rounded-xl text-[#26332F]"
                  />
                </div>

                {/* DUAL IMAGE INPUT (LOCAL FILE OR URL) */}
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
                    className="w-full px-3 py-2 border border-[#e6dfd4] rounded-xl text-[#26332F]"
                  />
                </div>

              </div>

              <div className="pt-4 border-t border-[#F4EBDD] flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-[#F4EBDD] text-[#26332F] font-semibold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-[#183A32] hover:bg-[#245247] text-[#FCFAF5] font-bold"
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
