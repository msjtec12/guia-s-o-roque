'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Building2, 
  Users, 
  ArrowRight, 
  TrendingUp, 
  Plus, 
  Crown, 
  Navigation, 
  MessageCircle,
  MapPin,
  Globe2
} from 'lucide-react';
import { getAllBusinessesAdmin, getPartnerLeads, getAllCitiesAdmin } from '@/lib/services/data';
import { Business, PartnerLead, City } from '@/types';
import { useAdminCity } from '@/components/admin/AdminCityContext';

export default function AdminDashboardPage() {
  const { selectedCityId } = useAdminCity();
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [leads, setLeads] = useState<PartnerLead[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const [bizList, leadList, cityList] = await Promise.all([
        getAllBusinessesAdmin(selectedCityId),
        getPartnerLeads(selectedCityId !== 'all' ? selectedCityId : undefined),
        getAllCitiesAdmin(),
      ]);
      setBusinesses(bizList);
      setLeads(leadList);
      setCities(cityList);
      setLoading(false);
    }
    loadData();
  }, [selectedCityId]);

  const publishedCount = businesses.filter((b) => b.status === 'published').length;
  const draftCount = businesses.filter((b) => b.status === 'draft').length;
  const premiumCount = businesses.filter((b) => b.is_premium || b.plan === 'premium').length;
  const highlightCount = businesses.filter((b) => (b.is_featured || b.plan === 'highlight') && !b.is_premium).length;
  const pendingLeadsCount = leads.filter((l) => l.status === 'pending').length;

  const currentCityName = selectedCityId === 'all' 
    ? 'Todas as Cidades' 
    : cities.find(c => c.id === selectedCityId)?.name || 'Destino Selecionado';

  return (
    <div className="space-y-8 bg-[#FCFAF5]">
      
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#e6dfd4] pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F4EBDD] text-[#183A32] text-xs font-bold border border-[#e6dfd4] mb-1">
            <Globe2 className="w-3.5 h-3.5 text-[#D49A3A]" />
            <span>Filtro Ativo: {currentCityName}</span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-[#26332F]">
            Painel Geral Descubra
          </h1>
          <p className="text-xs text-[#52615B]">
            Visão geral e métricas da plataforma de turismo digital multicidade
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/admin/cidades"
            className="inline-flex items-center gap-1.5 bg-[#F4EBDD] hover:bg-[#e8dbca] text-[#183A32] font-semibold text-xs px-4 py-2.5 rounded-xl border border-[#e6dfd4] transition-all"
          >
            <Globe2 className="w-4 h-4 text-[#183A32]" aria-hidden="true" />
            <span>Gerenciar Cidades ({cities.length})</span>
          </Link>
          <Link
            href="/admin/empresas"
            aria-label="Cadastrar nova empresa"
            className="inline-flex items-center gap-1.5 bg-[#183A32] hover:bg-[#245247] text-[#FCFAF5] font-semibold text-xs px-4 py-2.5 rounded-xl shadow-sm transition-all"
          >
            <Plus className="w-4 h-4 text-[#D49A3A]" aria-hidden="true" />
            <span>Cadastrar Empresa</span>
          </Link>
        </div>
      </div>

      {/* METRICS CARDS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <div className="bg-white p-6 rounded-2xl border border-[#e6dfd4] shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#82967A]">
              Total Empresas
            </span>
            <div className="w-9 h-9 rounded-xl bg-[#183A32]/10 text-[#183A32] flex items-center justify-center">
              <Building2 className="w-5 h-5" aria-hidden="true" />
            </div>
          </div>
          <div className="text-3xl font-bold text-[#26332F]">
            {loading ? '...' : businesses.length}
          </div>
          <div className="flex justify-between text-xs text-[#52615B] pt-1 border-t border-[#F4EBDD]">
            <span className="text-[#183A32] font-semibold">{publishedCount} publicadas</span>
            <span className="text-[#82967A]">{draftCount} rascunhos</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-[#e6dfd4] shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#82967A]">
              Parceiros Pagos
            </span>
            <div className="w-9 h-9 rounded-xl bg-[#F4EBDD] text-[#D49A3A] flex items-center justify-center border border-[#e6dfd4]">
              <Crown className="w-5 h-5 fill-[#D49A3A]" aria-hidden="true" />
            </div>
          </div>
          <div className="text-3xl font-bold text-[#26332F]">
            {loading ? '...' : premiumCount + highlightCount}
          </div>
          <div className="flex justify-between text-xs text-[#52615B] pt-1 border-t border-[#F4EBDD]">
            <span className="text-[#D49A3A] font-extrabold">{premiumCount} Premium</span>
            <span className="text-[#183A32] font-semibold">{highlightCount} Destaque</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-[#e6dfd4] shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#82967A]">
              Leads Comerciais
            </span>
            <div className="w-9 h-9 rounded-xl bg-[#722F3E]/10 text-[#722F3E] flex items-center justify-center">
              <Users className="w-5 h-5" aria-hidden="true" />
            </div>
          </div>
          <div className="text-3xl font-bold text-[#26332F]">
            {loading ? '...' : leads.length}
          </div>
          <span className="text-xs text-[#722F3E] font-semibold">
            {pendingLeadsCount} propostas novas
          </span>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-[#e6dfd4] shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#82967A]">
              Engajamento & Cliques
            </span>
            <div className="w-9 h-9 rounded-xl bg-[#183A32]/10 text-[#183A32] flex items-center justify-center">
              <TrendingUp className="w-5 h-5" aria-hidden="true" />
            </div>
          </div>
          <div className="text-3xl font-bold text-[#26332F]">1.480+</div>
          <div className="flex justify-between text-xs text-[#52615B] pt-1 border-t border-[#F4EBDD]">
            <span className="flex items-center gap-1"><MessageCircle className="w-3 h-3 text-[#183A32]" aria-hidden="true" /> WhatsApp</span>
            <span className="flex items-center gap-1"><Navigation className="w-3 h-3 text-[#183A32]" aria-hidden="true" /> Mapa</span>
          </div>
        </div>

      </div>

      {/* DESTINOS ATIVOS OVERVIEW */}
      <div className="bg-white rounded-2xl border border-[#e6dfd4] shadow-sm p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-[#F4EBDD] pb-3">
          <h2 className="font-serif text-lg font-bold text-[#26332F] flex items-center gap-2">
            <Globe2 className="w-5 h-5 text-[#183A32]" />
            <span>Destinos Turísticos Cadastrados</span>
          </h2>
          <Link
            href="/admin/cidades"
            className="text-xs font-semibold text-[#183A32] hover:underline flex items-center gap-1"
          >
            <span>Gerenciar destinos</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#D49A3A]" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {cities.map((c) => (
            <div key={c.id} className="p-4 rounded-xl bg-[#FCFAF5] border border-[#e6dfd4] flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#D49A3A]" />
                  <span className="font-bold text-sm text-[#26332F]">{c.name}</span>
                  <span className="text-[10px] bg-[#F4EBDD] px-1.5 py-0.5 rounded text-[#183A32] font-semibold">{c.state}</span>
                </div>
                <span className="text-[11px] text-[#52615B] block font-mono">/{c.slug}</span>
              </div>
              <Link
                href={`/${c.slug}`}
                target="_blank"
                className="text-xs font-bold text-[#183A32] hover:underline"
              >
                Acessar
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* RECENT PARTNER LEADS SECTION */}
      <div className="bg-white rounded-2xl border border-[#e6dfd4] shadow-sm p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-[#F4EBDD] pb-3">
          <h2 className="font-serif text-lg font-bold text-[#26332F]">
            Últimas Propostas de Anunciantes
          </h2>
          <Link
            href="/admin/leads"
            aria-label="Ver todas as propostas"
            className="text-xs font-semibold text-[#183A32] hover:underline flex items-center gap-1"
          >
            <span>Ver todos ({leads.length})</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#D49A3A]" aria-hidden="true" />
          </Link>
        </div>

        {leads.length > 0 ? (
          <div className="divide-y divide-[#F4EBDD]">
            {leads.slice(0, 5).map((lead) => (
              <div key={lead.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#26332F] block">{lead.company_name}</span>
                    <span className="text-[10px] bg-[#F4EBDD] px-2 py-0.5 rounded-full text-[#183A32] font-bold">
                      {lead.city_id === 'city-atibaia' || lead.city_id === 'atibaia' ? 'Atibaia' : 'São Roque'}
                    </span>
                  </div>
                  <span className="text-[#52615B]">{lead.responsible_name} • WhatsApp: {lead.whatsapp}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full bg-[#F4EBDD] text-[#722F3E] font-bold uppercase text-[10px] border border-[#e6dfd4]">
                    Plano {lead.desired_plan}
                  </span>
                  <span className="text-[#82967A]">{lead.category}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-[#82967A] text-xs py-4">Nenhuma proposta recebida até o momento.</p>
        )}
      </div>

    </div>
  );
}
