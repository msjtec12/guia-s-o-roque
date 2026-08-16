'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { getPartnerLeads, updatePartnerLeadStatusAdmin, deletePartnerLeadAdmin } from '@/lib/services/data';
import { PartnerLead, LeadStatus } from '@/types';
import { MessageCircle, Trash2, MapPin } from 'lucide-react';
import { buildWhatsAppUrl } from '@/lib/utils';
import { useAdminCity } from '@/components/admin/AdminCityContext';

export default function AdminLeadsPage() {
  const { selectedCityId } = useAdminCity();
  const [leads, setLeads] = useState<PartnerLead[]>([]);
  const [filterPlan, setFilterPlan] = useState<string>('all');

  const loadLeads = useCallback(async () => {
    const data = await getPartnerLeads(selectedCityId !== 'all' ? selectedCityId : undefined);
    setLeads(data);
  }, [selectedCityId]);

  useEffect(() => {
    loadLeads();
  }, [loadLeads]);

  const handleStatusChange = async (id: string, newStatus: LeadStatus) => {
    await updatePartnerLeadStatusAdmin(id, newStatus);
    loadLeads();
  };

  const handleDeleteLead = async (id: string) => {
    if (confirm('Tem certeza que deseja excluir esta proposta de anunciante?')) {
      await deletePartnerLeadAdmin(id);
      loadLeads();
    }
  };

  const filteredLeads = leads.filter((l) => {
    if (filterPlan === 'all') return true;
    return l.desired_plan === filterPlan;
  });

  return (
    <div className="space-y-6 bg-[#FCFAF5]">
      
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#e6dfd4] pb-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-[#26332F]">
            Propostas de Anunciantes (Leads)
          </h1>
          <p className="text-xs text-[#52615B]">
            Gerencie contatos de estabelecimentos interessados em anunciar na plataforma
          </p>
        </div>
        
        {/* PLAN FILTER */}
        <select
          value={filterPlan}
          onChange={(e) => setFilterPlan(e.target.value)}
          className="px-3 py-2 bg-white border border-[#e6dfd4] rounded-xl text-xs font-semibold text-[#26332F]"
        >
          <option value="all">Todos os Planos</option>
          <option value="free">Plano Gratuito</option>
          <option value="highlight">Plano Destaque</option>
          <option value="premium">Plano Premium</option>
        </select>
      </div>

      {/* LEADS LIST */}
      <div className="bg-white rounded-2xl border border-[#e6dfd4] shadow-sm overflow-hidden p-6 space-y-4">
        {filteredLeads.length > 0 ? (
          <div className="divide-y divide-[#F4EBDD]">
            {filteredLeads.map((lead) => {
              const isAtibaia = lead.city_id === 'city-atibaia' || lead.city_id === 'atibaia';
              const cityName = isAtibaia ? 'Atibaia' : 'São Roque';
              const salesMsg = `Olá, ${lead.responsible_name}. Recebemos seu interesse em anunciar no Descubra ${cityName} e gostaríamos de conversar sobre o cadastro da sua empresa.`;
              const waUrl = buildWhatsAppUrl(lead.whatsapp, lead.company_name, salesMsg, cityName);
              
              return (
                <div key={lead.id} className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1.5 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="font-serif font-bold text-[#26332F] text-base">{lead.company_name}</h4>
                      <span className="inline-flex items-center gap-1 bg-[#F4EBDD] text-[#183A32] px-2 py-0.5 rounded-md text-[10px] font-bold border border-[#e6dfd4]">
                        <MapPin className="w-3 h-3 text-[#D49A3A]" />
                        {cityName}
                      </span>
                      <span
                        className={`px-2.5 py-0.5 rounded-full font-bold uppercase text-[10px] ${
                          lead.desired_plan === 'premium'
                            ? 'bg-[#F4EBDD] text-[#722F3E] border border-[#722F3E]/30'
                            : lead.desired_plan === 'highlight'
                            ? 'bg-[#183A32]/10 text-[#183A32]'
                            : 'bg-[#FCFAF5] text-[#52615B] border border-[#e6dfd4]'
                        }`}
                      >
                        Plano: {lead.desired_plan}
                      </span>
                    </div>

                    <p className="text-xs text-[#52615B]">
                      Responsável: <span className="font-semibold text-[#26332F]">{lead.responsible_name}</span> | E-mail: {lead.email} | WhatsApp: {lead.whatsapp}
                    </p>
                    <p className="text-xs text-[#82967A]">
                      Categoria: <span className="font-medium text-[#26332F]">{lead.category}</span> | Endereço: {lead.address || `${cityName} - SP`}
                    </p>

                    {lead.message && (
                      <p className="text-xs text-[#52615B] italic bg-[#FCFAF5] p-2.5 rounded-xl border border-[#e6dfd4] max-w-2xl">
                        &quot;{lead.message}&quot;
                      </p>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-3 shrink-0">
                    {/* STATUS SELECTOR */}
                    <select
                      value={lead.status || 'pending'}
                      onChange={(e) => handleStatusChange(lead.id, e.target.value as LeadStatus)}
                      className="px-2.5 py-2 rounded-xl text-xs font-semibold border border-[#e6dfd4] bg-[#FCFAF5] text-[#26332F]"
                    >
                      <option value="pending">Novo (Pendente)</option>
                      <option value="contacted">Em contato</option>
                      <option value="approved">Convertido / Aprovado</option>
                      <option value="archived">Arquivado</option>
                    </select>

                    {/* WHATSAPP ACTION BUTTON */}
                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md transition-all shrink-0"
                    >
                      <MessageCircle className="w-4 h-4 fill-current text-white" aria-hidden="true" />
                      <span>Conversar no WhatsApp</span>
                    </a>

                    {/* DELETE BUTTON */}
                    <button
                      onClick={() => handleDeleteLead(lead.id)}
                      aria-label={`Excluir proposta de ${lead.company_name}`}
                      className="p-2 text-[#722F3E] hover:text-rose-800 bg-[#722F3E]/10 rounded-xl transition-colors cursor-pointer"
                      title="Excluir proposta"
                    >
                      <Trash2 className="w-4 h-4" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-[#82967A] text-xs text-center py-8">Nenhuma proposta encontrada com estes filtros.</p>
        )}
      </div>

    </div>
  );
}
