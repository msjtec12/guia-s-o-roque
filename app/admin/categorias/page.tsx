'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { 
  Tags, 
  Plus, 
  Trash2, 
  Edit3, 
  CheckCircle2, 
  XCircle, 
  X, 
  Wine
} from 'lucide-react';
import { getCategories, saveCategoryAdmin, deleteCategoryAdmin } from '@/lib/services/data';
import { Category } from '@/types';
import { ImageUploadInput } from '@/components/ui/ImageUploadInput';

export default function AdminCategoriasPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCat, setEditingCat] = useState<Partial<Category> | null>(null);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    const list = await getCategories();
    setCategories(list);
  };

  const handleOpenModal = (cat?: Category) => {
    if (cat) {
      setEditingCat({ ...cat });
    } else {
      setEditingCat({
        name: '',
        slug: '',
        description: '',
        icon: 'Wine',
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
    <div className="space-y-6 bg-[#FCFAF5]">
      
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#e6dfd4] pb-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-[#26332F]">
            Gerenciar Categorias
          </h1>
          <p className="text-xs text-[#52615B]">
            Cadastre, edite e ative categorias para filtrar vinícolas, restaurantes, hotéis e atrações
          </p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          aria-label="Cadastrar nova categoria"
          className="inline-flex items-center justify-center gap-2 bg-[#183A32] hover:bg-[#245247] text-[#FCFAF5] font-bold text-xs px-5 py-3 rounded-xl shadow-md transition-all shrink-0"
        >
          <Plus className="w-4 h-4 text-[#D49A3A]" aria-hidden="true" />
          <span>Cadastrar Nova Categoria</span>
        </button>
      </div>

      {/* CATEGORIES CARDS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <div key={cat.id} className="bg-white rounded-2xl border border-[#e6dfd4] shadow-sm overflow-hidden flex flex-col justify-between">
            <div className="relative h-32 w-full bg-[#FCFAF5]">
              {cat.image_url && (
                <Image
                  src={cat.image_url}
                  alt={cat.name}
                  fill
                  className="object-cover"
                  unoptimized={cat.image_url.startsWith('data:')}
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#26332F]/70 via-[#26332F]/20 to-transparent" />
              
              <div className="absolute bottom-3 left-3 flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#FCFAF5] text-[#183A32] flex items-center justify-center font-bold shadow-xs">
                  <Wine className="w-4 h-4" aria-hidden="true" />
                </div>
                <h3 className="font-serif text-base font-bold text-[#FCFAF5]">
                  {cat.name}
                </h3>
              </div>

              <div className="absolute top-3 right-3">
                <button
                  onClick={() => handleToggleActive(cat)}
                  aria-label={`Alternar status da categoria ${cat.name}`}
                  className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold shadow-xs ${
                    cat.is_active !== false
                      ? 'bg-[#183A32] text-[#FCFAF5]'
                      : 'bg-[#F4EBDD] text-[#722F3E]'
                  }`}
                >
                  {cat.is_active !== false ? (
                    <>
                      <CheckCircle2 className="w-3 h-3 text-[#D49A3A]" aria-hidden="true" />
                      <span>Ativa</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-3 h-3 text-[#722F3E]" aria-hidden="true" />
                      <span>Inativa</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
              <p className="text-xs text-[#52615B] leading-relaxed line-clamp-2">
                {cat.description}
              </p>

              <div className="pt-3 border-t border-[#F4EBDD] flex items-center justify-between text-xs">
                <span className="text-[11px] font-semibold text-[#82967A]">Slug: {cat.slug}</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenModal(cat)}
                    aria-label={`Editar categoria ${cat.name}`}
                    className="p-1.5 text-[#26332F] hover:text-[#183A32] bg-[#F4EBDD] hover:bg-[#e8dbca] rounded-lg transition-colors"
                    title="Editar"
                  >
                    <Edit3 className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                  <button
                    onClick={() => handleDelete(cat.id)}
                    aria-label={`Excluir categoria ${cat.name}`}
                    className="p-1.5 text-[#722F3E] hover:text-rose-800 bg-[#722F3E]/10 rounded-lg transition-colors"
                    title="Excluir"
                  >
                    <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* EDIT / CREATE MODAL */}
      {isModalOpen && editingCat && (
        <div className="fixed inset-0 z-50 bg-[#26332F]/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-[#e6dfd4] shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-[#F4EBDD] pb-3">
              <h3 className="font-serif text-xl font-bold text-[#26332F]">
                {editingCat.id ? 'Editar Categoria' : 'Cadastrar Nova Categoria'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} aria-label="Fechar modal" className="text-[#82967A] hover:text-[#26332F]">
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="space-y-3">
                <div>
                  <label className="font-bold text-[#26332F] block mb-1">Nome da Categoria *</label>
                  <input
                    type="text"
                    value={editingCat.name || ''}
                    onChange={(e) => setEditingCat({ ...editingCat, name: e.target.value })}
                    required
                    className="w-full px-3 py-2 border border-[#e6dfd4] rounded-xl text-[#26332F]"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#26332F] block mb-1">Slug (URL amigável)</label>
                  <input
                    type="text"
                    value={editingCat.slug || ''}
                    onChange={(e) => setEditingCat({ ...editingCat, slug: e.target.value })}
                    placeholder="gerado-automaticamente"
                    className="w-full px-3 py-2 border border-[#e6dfd4] rounded-xl text-[#26332F]"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#26332F] block mb-1">Ícone (Nome Lucide)</label>
                  <input
                    type="text"
                    value={editingCat.icon || 'Wine'}
                    onChange={(e) => setEditingCat({ ...editingCat, icon: e.target.value })}
                    placeholder="Wine, Utensils, Hotel, Bus..."
                    className="w-full px-3 py-2 border border-[#e6dfd4] rounded-xl text-[#26332F]"
                  />
                </div>

                {/* DUAL IMAGE INPUT (LOCAL FILE OR URL) */}
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
