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
    <div className="space-y-8 bg-[#F6F0D4]">
      
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E7E5DF] pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-[#107492] text-xs font-bold border border-[#E7E5DF] shadow-xs mb-1">
            <Globe2 className="w-3.5 h-3.5 text-[#F19F14]" />
            <span>Filtro Ativo: {currentCityName}</span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-[#26332F]">
            Painel Geral Descubra Cidades
          </h1>
          <p className="text-xs text-[#26332F]/80">
            Visão geral e métricas da plataforma de turismo digital multicidade
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/admin/cidades"
            className="inline-flex items-center gap-1.5 bg-white hover:bg-[#E7E5DF] text-[#1B4931] font-semibold text-xs px-4 py-2.5 rounded-xl border border-[#E7E5DF] transition-all"
          >
            <Globe2 className="w-4 h-4 text-[#107492]" aria-hidden="true" />
            <span>Gerenciar Cidades ({cities.length})</span>
          </Link>
          <Link
            href="/admin/empresas"
            aria-label="Cadastrar nova empresa"
            className="inline-flex items-center gap-1.5 bg-[#F19F14] hover:bg-[#D86E04] text-[#071510] hover:text-[#FFFFFF] font-bold text-xs px-4 py-2.5 rounded-xl shadow-sm transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" aria-hidden="true" />
            <span>Cadastrar Empresa</span>
          </Link>
        </div>
      </div>

      {/* METRICS CARDS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <div className="bg-white p-6 rounded-3xl border border-[#E7E5DF] shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#26332F]/60">
              Total Empresas
            </span>
            <div className="w-9 h-9 rounded-xl bg-[#F6F0D4] text-[#1B4931] flex items-center justify-center">
              <Building2 className="w-5 h-5" aria-hidden="true" />
            </div>
          </div>
          <div className="text-3xl font-bold text-[#26332F]">
            {loading ? '...' : businesses.length}
          </div>
          <div className="flex justify-between text-xs text-[#26332F]/70 pt-1 border-t border-[#E7E5DF]">
            <span className="text-[#1B4931] font-semibold">{publishedCount} publicadas</span>
            <span className="text-[#26332F]/60">{draftCount} rascunhos</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-[#E7E5DF] shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#26332F]/60">
              Parceiros Pagos
            </span>
            <div className="w-9 h-9 rounded-xl bg-[#F6F0D4] text-[#F19F14] flex items-center justify-center border border-[#E7E5DF]">
              <Crown className="w-5 h-5 fill-[#F19F14]" aria-hidden="true" />
            </div>
          </div>
          <div className="text-3xl font-bold text-[#26332F]">
            {loading ? '...' : premiumCount + highlightCount}
          </div>
          <div className="flex justify-between text-xs text-[#26332F]/70 pt-1 border-t border-[#E7E5DF]">
            <span className="text-[#F19F14] font-extrabold">{premiumCount} Premium</span>
            <span className="text-[#1B4931] font-semibold">{highlightCount} Destaque</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-[#E7E5DF] shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#26332F]/60">
              Leads Comerciais
            </span>
            <div className="w-9 h-9 rounded-xl bg-[#F6F0D4] text-[#107492] flex items-center justify-center">
              <Users className="w-5 h-5" aria-hidden="true" />
            </div>
          </div>
          <div className="text-3xl font-bold text-[#26332F]">
            {loading ? '...' : leads.length}
          </div>
          <div className="flex justify-between text-xs text-[#26332F]/70 pt-1 border-t border-[#E7E5DF]">
            <span className="text-[#107492] font-semibold">
              {pendingLeadsCount} propostas novas
            </span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-[#E7E5DF] shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#26332F]/60">
              Engajamento & Cliques
            </span>
            <div className="w-9 h-9 rounded-xl bg-[#F6F0D4] text-[#1B4931] flex items-center justify-center">
              <TrendingUp className="w-5 h-5" aria-hidden="true" />
            </div>
          </div>
          <div className="text-3xl font-bold text-[#26332F]">1.480+</div>
          <div className="flex justify-between text-xs text-[#26332F]/70 pt-1 border-t border-[#E7E5DF]">
            <span className="flex items-center gap-1"><MessageCircle className="w-3 h-3 text-[#1B4931]" aria-hidden="true" /> WhatsApp</span>
            <span className="flex items-center gap-1"><Navigation className="w-3 h-3 text-[#107492]" aria-hidden="true" /> Mapa</span>
          </div>
        </div>

      </div>

      {/* DESTINOS ATIVOS OVERVIEW */}
      <div className="bg-white rounded-3xl border border-[#E7E5DF] shadow-sm p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-[#E7E5DF] pb-3">
          <h2 className="font-serif text-lg font-bold text-[#26332F] flex items-center gap-2">
            <Globe2 className="w-5 h-5 text-[#107492]" />
            <span>Destinos Turísticos Cadastrados</span>
          </h2>
          <Link
            href="/admin/cidades"
            className="text-xs font-semibold text-[#107492] hover:underline flex items-center gap-1"
          >
            <span>Gerenciar destinos</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#F19F14]" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {cities.map((c) => (
            <div key={c.id} className="p-4 rounded-2xl bg-[#F6F0D4] border border-[#E7E5DF] flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#F19F14]" />
                  <span className="font-bold text-sm text-[#26332F]">{c.name}</span>
                  <span className="text-[10px] bg-white px-1.5 py-0.5 rounded text-[#1B4931] font-semibold border border-[#E7E5DF]">{c.state}</span>
                </div>
                <span className="text-[11px] text-[#26332F]/70 block font-mono">/{c.slug}</span>
              </div>
              <Link
                href={`/${c.slug}`}
                target="_blank"
                className="text-xs font-bold text-[#107492] hover:underline"
              >
                Acessar
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* RECENT PARTNER LEADS SECTION */}
      <div className="bg-white rounded-3xl border border-[#E7E5DF] shadow-sm p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-[#E7E5DF] pb-3">
          <h2 className="font-serif text-lg font-bold text-[#26332F]">
            Últimas Propostas de Anunciantes
          </h2>
          <Link
            href="/admin/leads"
            aria-label="Ver todas as propostas"
            className="text-xs font-semibold text-[#107492] hover:underline flex items-center gap-1"
          >
            <span>Ver todos ({leads.length})</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#F19F14]" aria-hidden="true" />
          </Link>
        </div>

        {leads.length > 0 ? (
          <div className="divide-y divide-[#E7E5DF]">
            {leads.slice(0, 5).map((lead) => (
              <div key={lead.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#26332F] block">{lead.company_name}</span>
                    <span className="text-[10px] bg-[#F6F0D4] px-2 py-0.5 rounded-full text-[#1B4931] font-bold border border-[#E7E5DF]">
                      {lead.city_id === 'city-atibaia' || lead.city_id === 'atibaia' ? 'Atibaia' : lead.city_id === 'city-socorro' || lead.city_id === 'socorro' ? 'Socorro' : 'São Roque'}
                    </span>
                  </div>
                  <span className="text-[#26332F]/70">{lead.responsible_name} • WhatsApp: {lead.whatsapp}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full bg-[#F6F0D4] text-[#107492] font-bold uppercase text-[10px] border border-[#E7E5DF]">
                    Plano {lead.desired_plan}
                  </span>
                  <span className="text-[#26332F]/60">{lead.category}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-[#26332F]/60 text-xs py-4">Nenhuma proposta recebida até o momento.</p>
        )}
      </div>

    </div>
  );
}
