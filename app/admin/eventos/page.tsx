'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { 
  Calendar, 
  Plus, 
  Trash2, 
  Edit3, 
  Eye, 
  EyeOff, 
  X, 
  Search,
  MapPin
} from 'lucide-react';
import { getAllEventsAdmin, saveEventAdmin, deleteEventAdmin, getAllBusinessesAdmin } from '@/lib/services/data';
import { EventItem, Business } from '@/types';
import { formatDate } from '@/lib/utils';
import { ImageUploadInput } from '@/components/ui/ImageUploadInput';

export default function AdminEventosPage() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvt, setEditingEvt] = useState<Partial<EventItem>>({ status: 'published' });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const [evtList, bizList] = await Promise.all([
      getAllEventsAdmin(),
      getAllBusinessesAdmin(),
    ]);
    setEvents(evtList);
    setBusinesses(bizList);
  };

  const handleOpenModal = (evtItem?: EventItem) => {
    if (evtItem) {
      setEditingEvt({ 
        ...evtItem,
        title: evtItem.title || evtItem.name,
      });
    } else {
      setEditingEvt({
        name: '',
        title: '',
        slug: '',
        description: '',
        business_id: businesses[0]?.id || '',
        start_date: new Date().toISOString().split('T')[0],
        end_date: new Date().toISOString().split('T')[0],
        event_date: new Date().toISOString().split('T')[0],
        location: 'São Roque - SP',
        image_url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80',
        status: 'published',
        is_featured: true,
      });
    }
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const eventName = editingEvt.title || editingEvt.name;
    if (!editingEvt || !eventName) return;

    await saveEventAdmin({
      ...editingEvt,
      name: eventName,
      title: eventName,
      slug: editingEvt.slug || eventName.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-'),
    });

    setIsModalOpen(false);
    setEditingEvt({ status: 'published' });
    loadData();
  };

  const handleDelete = async (id: string) => {
    if (confirm('Tem certeza que deseja excluir este evento?')) {
      await deleteEventAdmin(id);
      loadData();
    }
  };

  const handleToggleStatus = async (evtItem: EventItem) => {
    const newStatus = evtItem.status === 'published' ? 'draft' : 'published';
    await saveEventAdmin({ ...evtItem, status: newStatus });
    loadData();
  };

  const filteredEvents = events.filter((e) => {
    const eventName = e.title || e.name || '';
    return eventName.toLowerCase().includes(search.toLowerCase()) ||
      e.location.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className="space-y-6 bg-[#FCFAF5]">
      
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#e6dfd4] pb-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-[#26332F]">
            Gerenciar Agenda de Eventos
          </h1>
          <p className="text-xs text-[#52615B]">
            Cadastre festivais gastronômicos, pisa da uva, feiras de vinhos e shows em São Roque
          </p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          aria-label="Cadastrar novo evento"
          className="inline-flex items-center justify-center gap-2 bg-[#183A32] hover:bg-[#245247] text-[#FCFAF5] font-bold text-xs px-5 py-3 rounded-xl shadow-md transition-all shrink-0"
        >
          <Plus className="w-4 h-4 text-[#D49A3A]" aria-hidden="true" />
          <span>Cadastrar Novo Evento</span>
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
            placeholder="Buscar evento por título ou local..."
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
                <th className="p-4">Evento</th>
                <th className="p-4">Data</th>
                <th className="p-4">Local</th>
                <th className="p-4">Status</th>
                <th className="p-4">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F4EBDD] font-medium">
              {filteredEvents.map((evt) => {
                const displayTitle = evt.title || evt.name;
                const displayDate = evt.start_date || evt.event_date || new Date().toISOString();
                return (
                  <tr key={evt.id} className="hover:bg-[#FCFAF5] transition-colors">
                    <td className="p-4 flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-[#FCFAF5] shrink-0 border border-[#e6dfd4]">
                        <Image
                          src={evt.image_url || 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=100&q=80'}
                          alt={displayTitle}
                          fill
                          className="object-cover"
                          unoptimized={evt.image_url?.startsWith('data:')}
                        />
                      </div>
                      <div>
                        <span className="font-bold text-[#26332F] block">{displayTitle}</span>
                        <span className="text-[#52615B] text-[11px] line-clamp-1">{evt.description}</span>
                      </div>
                    </td>
                    <td className="p-4 text-[#26332F] whitespace-nowrap">
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-[#183A32]" aria-hidden="true" />
                        {formatDate(displayDate)}
                      </span>
                    </td>
                    <td className="p-4 text-[#52615B]">
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#183A32]" aria-hidden="true" />
                        {evt.location}
                      </span>
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => handleToggleStatus(evt)}
                        aria-label={`Alterar status do evento ${displayTitle}`}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          evt.status === 'published'
                            ? 'bg-[#183A32] text-[#FCFAF5]'
                            : 'bg-[#F4EBDD] text-[#26332F]'
                        }`}
                      >
                        {evt.status === 'published' ? <Eye className="w-3 h-3 text-[#D49A3A]" aria-hidden="true" /> : <EyeOff className="w-3 h-3" aria-hidden="true" />}
                        <span>{evt.status === 'published' ? 'Publicado' : 'Rascunho'}</span>
                      </button>
                    </td>
                    <td className="p-4 space-x-2 whitespace-nowrap">
                      <button
                        onClick={() => handleOpenModal(evt)}
                        aria-label={`Editar evento ${displayTitle}`}
                        className="p-1.5 text-[#26332F] hover:text-[#183A32] bg-[#F4EBDD] hover:bg-[#e8dbca] rounded-lg transition-colors"
                        title="Editar"
                      >
                        <Edit3 className="w-3.5 h-3.5" aria-hidden="true" />
                      </button>
                      <button
                        onClick={() => handleDelete(evt.id)}
                        aria-label={`Excluir evento ${displayTitle}`}
                        className="p-1.5 text-[#722F3E] hover:text-rose-800 bg-[#722F3E]/10 rounded-lg transition-colors"
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
      {isModalOpen && editingEvt && (
        <div className="fixed inset-0 z-50 bg-[#26332F]/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full border border-[#e6dfd4] shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#F4EBDD] pb-3">
              <h3 className="font-serif text-xl font-bold text-[#26332F]">
                {editingEvt.id ? 'Editar Evento' : 'Cadastrar Novo Evento'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} aria-label="Fechar modal" className="text-[#82967A] hover:text-[#26332F]">
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                <div>
                  <label className="font-bold text-[#26332F] block mb-1">Título do Evento *</label>
                  <input
                    type="text"
                    value={editingEvt.title || editingEvt.name || ''}
                    onChange={(e) => setEditingEvt({ ...editingEvt, title: e.target.value, name: e.target.value })}
                    required
                    className="w-full px-3 py-2 border border-[#e6dfd4] rounded-xl text-[#26332F]"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#26332F] block mb-1">Empresa Anfitriã / Organizadora</label>
                  <select
                    value={editingEvt.business_id || ''}
                    onChange={(e) => setEditingEvt({ ...editingEvt, business_id: e.target.value })}
                    className="w-full px-3 py-2 border border-[#e6dfd4] rounded-xl bg-white text-[#26332F]"
                  >
                    <option value="">Selecione uma empresa</option>
                    {businesses.map((b) => (
                      <option key={b.id} value={b.id}>{b.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-bold text-[#26332F] block mb-1">Data de Início *</label>
                  <input
                    type="date"
                    value={editingEvt.start_date?.split('T')[0] || editingEvt.event_date?.split('T')[0] || ''}
                    onChange={(e) => setEditingEvt({ ...editingEvt, start_date: e.target.value, event_date: e.target.value })}
                    required
                    className="w-full px-3 py-2 border border-[#e6dfd4] rounded-xl text-[#26332F]"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#26332F] block mb-1">Data de Término *</label>
                  <input
                    type="date"
                    value={editingEvt.end_date?.split('T')[0] || editingEvt.event_date?.split('T')[0] || ''}
                    onChange={(e) => setEditingEvt({ ...editingEvt, end_date: e.target.value })}
                    required
                    className="w-full px-3 py-2 border border-[#e6dfd4] rounded-xl text-[#26332F]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="font-bold text-[#26332F] block mb-1">Local do Evento *</label>
                  <input
                    type="text"
                    value={editingEvt.location || ''}
                    onChange={(e) => setEditingEvt({ ...editingEvt, location: e.target.value })}
                    placeholder="Ex.: Roteiro do Vinho, Estrada do Vinho km 10"
                    required
                    className="w-full px-3 py-2 border border-[#e6dfd4] rounded-xl text-[#26332F]"
                  />
                </div>

                {/* DUAL IMAGE INPUT (LOCAL FILE OR URL) */}
                <ImageUploadInput
                  value={editingEvt.image_url || ''}
                  onChange={(url) => setEditingEvt({ ...editingEvt, image_url: url })}
                  label="Imagem de Divulgação do Evento"
                />

                <div className="sm:col-span-2">
                  <label className="font-bold text-[#26332F] block mb-1">Descrição do Evento</label>
                  <textarea
                    rows={3}
                    value={editingEvt.description || ''}
                    onChange={(e) => setEditingEvt({ ...editingEvt, description: e.target.value })}
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
                  Salvar Evento
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
