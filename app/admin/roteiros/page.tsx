'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { 
  MapPin, 
  Plus, 
  Trash2, 
  Edit3, 
  Eye, 
  EyeOff, 
  X, 
  Search,
  Clock,
  Users
} from 'lucide-react';
import { getAllRoutesAdmin, saveRouteAdmin, deleteRouteAdmin } from '@/lib/services/data';
import { Route } from '@/types';
import { ImageUploadInput } from '@/components/ui/ImageUploadInput';

export default function AdminRoteirosPage() {
  const [routes, setRoutes] = useState<Route[]>([]);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRoute, setEditingRoute] = useState<Partial<Route> | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const list = await getAllRoutesAdmin();
    setRoutes(list);
  };

  const handleOpenModal = (routeItem?: Route) => {
    if (routeItem) {
      setEditingRoute({ ...routeItem });
    } else {
      setEditingRoute({
        name: '',
        slug: '',
        description: '',
        duration: '1 Dia Completo',
        profile: 'Casal & Família',
        image_url: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80',
        status: 'published',
        is_featured: true,
        items: [],
      });
    }
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingRoute || !editingRoute.name) return;

    await saveRouteAdmin({
      ...editingRoute,
      slug: editingRoute.slug || editingRoute.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-'),
    });

    setIsModalOpen(false);
    setEditingRoute(null);
    loadData();
  };

  const handleDelete = async (id: string) => {
    if (confirm('Tem certeza que deseja excluir este roteiro?')) {
      await deleteRouteAdmin(id);
      loadData();
    }
  };

  const handleToggleStatus = async (routeItem: Route) => {
    const newStatus = routeItem.status === 'published' ? 'draft' : 'published';
    await saveRouteAdmin({ ...routeItem, status: newStatus });
    loadData();
  };

  const filteredRoutes = routes.filter((r) =>
    r.name.toLowerCase().includes(search.toLowerCase()) ||
    r.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 bg-[#FCFAF5]">
      
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#e6dfd4] pb-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-[#26332F]">
            Gerenciar Roteiros Prontos
          </h1>
          <p className="text-xs text-[#52615B]">
            Cadastre itinerários temáticos de 1 dia, fim de semana ou gastronômicos em São Roque
          </p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          aria-label="Cadastrar novo roteiro"
          className="inline-flex items-center justify-center gap-2 bg-[#183A32] hover:bg-[#245247] text-[#FCFAF5] font-bold text-xs px-5 py-3 rounded-xl shadow-md transition-all shrink-0"
        >
          <Plus className="w-4 h-4 text-[#D49A3A]" aria-hidden="true" />
          <span>Cadastrar Novo Roteiro</span>
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
            placeholder="Buscar roteiro por nome..."
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
                <th className="p-4">Roteiro</th>
                <th className="p-4">Perfil</th>
                <th className="p-4">Duração</th>
                <th className="p-4">Status</th>
                <th className="p-4">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F4EBDD] font-medium">
              {filteredRoutes.map((r) => (
                <tr key={r.id} className="hover:bg-[#FCFAF5] transition-colors">
                  <td className="p-4 flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-[#FCFAF5] shrink-0 border border-[#e6dfd4]">
                      <Image
                        src={r.image_url || 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=100&q=80'}
                        alt={r.name}
                        fill
                        className="object-cover"
                        unoptimized={r.image_url?.startsWith('data:')}
                      />
                    </div>
                    <div>
                      <span className="font-bold text-[#26332F] block">{r.name}</span>
                      <span className="text-[#52615B] text-[11px] line-clamp-1">{r.description}</span>
                    </div>
                  </td>
                  <td className="p-4 text-[#26332F]">
                    <span className="inline-flex items-center gap-1 bg-[#F4EBDD] px-2.5 py-0.5 rounded-full text-[10px] font-bold text-[#183A32]">
                      <Users className="w-3 h-3 text-[#183A32]" aria-hidden="true" />
                      {r.profile}
                    </span>
                  </td>
                  <td className="p-4 text-[#52615B] whitespace-nowrap">
                    <span className="inline-flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#183A32]" aria-hidden="true" />
                      {r.duration}
                    </span>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => handleToggleStatus(r)}
                      aria-label={`Alterar status do roteiro ${r.name}`}
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        r.status === 'published'
                          ? 'bg-[#183A32] text-[#FCFAF5]'
                          : 'bg-[#F4EBDD] text-[#26332F]'
                      }`}
                    >
                      {r.status === 'published' ? <Eye className="w-3 h-3 text-[#D49A3A]" aria-hidden="true" /> : <EyeOff className="w-3 h-3" aria-hidden="true" />}
                      <span>{r.status === 'published' ? 'Publicado' : 'Rascunho'}</span>
                    </button>
                  </td>
                  <td className="p-4 space-x-2 whitespace-nowrap">
                    <button
                      onClick={() => handleOpenModal(r)}
                      aria-label={`Editar roteiro ${r.name}`}
                      className="p-1.5 text-[#26332F] hover:text-[#183A32] bg-[#F4EBDD] hover:bg-[#e8dbca] rounded-lg transition-colors"
                      title="Editar"
                    >
                      <Edit3 className="w-3.5 h-3.5" aria-hidden="true" />
                    </button>
                    <button
                      onClick={() => handleDelete(r.id)}
                      aria-label={`Excluir roteiro ${r.name}`}
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
      {isModalOpen && editingRoute && (
        <div className="fixed inset-0 z-50 bg-[#26332F]/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full border border-[#e6dfd4] shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#F4EBDD] pb-3">
              <h3 className="font-serif text-xl font-bold text-[#26332F]">
                {editingRoute.id ? 'Editar Roteiro' : 'Cadastrar Novo Roteiro'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} aria-label="Fechar modal" className="text-[#82967A] hover:text-[#26332F]">
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                <div>
                  <label className="font-bold text-[#26332F] block mb-1">Nome do Roteiro *</label>
                  <input
                    type="text"
                    value={editingRoute.name || ''}
                    onChange={(e) => setEditingRoute({ ...editingRoute, name: e.target.value })}
                    required
                    className="w-full px-3 py-2 border border-[#e6dfd4] rounded-xl text-[#26332F]"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#26332F] block mb-1">Perfil Indicado *</label>
                  <input
                    type="text"
                    value={editingRoute.profile || ''}
                    onChange={(e) => setEditingRoute({ ...editingRoute, profile: e.target.value })}
                    placeholder="Ex.: Casal, Família, Amigos..."
                    required
                    className="w-full px-3 py-2 border border-[#e6dfd4] rounded-xl text-[#26332F]"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#26332F] block mb-1">Duração *</label>
                  <input
                    type="text"
                    value={editingRoute.duration || ''}
                    onChange={(e) => setEditingRoute({ ...editingRoute, duration: e.target.value })}
                    placeholder="Ex.: 1 Dia Completo"
                    required
                    className="w-full px-3 py-2 border border-[#e6dfd4] rounded-xl text-[#26332F]"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#26332F] block mb-1">Status</label>
                  <select
                    value={editingRoute.status || 'published'}
                    onChange={(e) => setEditingRoute({ ...editingRoute, status: e.target.value as any })}
                    className="w-full px-3 py-2 border border-[#e6dfd4] rounded-xl bg-white text-[#26332F]"
                  >
                    <option value="published">Publicado</option>
                    <option value="draft">Rascunho</option>
                  </select>
                </div>

                {/* DUAL IMAGE INPUT (LOCAL FILE OR URL) */}
                <ImageUploadInput
                  value={editingRoute.image_url || ''}
                  onChange={(url) => setEditingRoute({ ...editingRoute, image_url: url })}
                  label="Imagem de Capa do Roteiro"
                />

                <div className="sm:col-span-2">
                  <label className="font-bold text-[#26332F] block mb-1">Descrição do Roteiro</label>
                  <textarea
                    rows={3}
                    value={editingRoute.description || ''}
                    onChange={(e) => setEditingRoute({ ...editingRoute, description: e.target.value })}
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
                  Salvar Roteiro
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
