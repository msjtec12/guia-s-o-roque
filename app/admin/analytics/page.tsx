'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { 
  Eye, 
  MessageCircle, 
  Navigation, 
  Sparkles, 
  MapPin, 
  Search, 
  Calendar,
  Building2,
  Crown
} from 'lucide-react';
import { getAnalyticsMetrics, getTopBusinessesAnalytics } from '@/lib/services/analytics';
import { AnalyticsMetrics, TopBusinessMetric, PeriodFilter } from '@/types';
import { useAdminCity } from '@/components/admin/AdminCityContext';

export default function AdminAnalyticsPage() {
  const { selectedCityId } = useAdminCity();
  const [period, setPeriod] = useState<PeriodFilter>('30days');
  const [metrics, setMetrics] = useState<AnalyticsMetrics>({
    pageViews: 1420,
    businessViews: 850,
    whatsappClicks: 310,
    mapClicks: 240,
    experienceViews: 490,
    routeViews: 380,
    searches: 620,
  });
  const [topViews, setTopViews] = useState<TopBusinessMetric[]>([]);
  const [topWhatsApp, setTopWhatsApp] = useState<TopBusinessMetric[]>([]);

  const loadData = useCallback(async () => {
    const [m, topData] = await Promise.all([
      getAnalyticsMetrics(period, selectedCityId !== 'all' ? selectedCityId : undefined),
      getTopBusinessesAnalytics(selectedCityId !== 'all' ? selectedCityId : undefined),
    ]);
    setMetrics(m);
    setTopViews(topData.topByViews);
    setTopWhatsApp(topData.topByWhatsApp);
  }, [period, selectedCityId]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <div className="space-y-8 bg-[#F6F0D4]">
      
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E7E5DF] pb-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-[#26332F]">
            Painel de Analytics & Métricas
          </h1>
          <p className="text-xs text-[#26332F]/80">
            Acompanhe a audiência, engajamento dos turistas e geração de contatos comerciais por destino
          </p>
        </div>

        {/* PERIOD FILTER */}
        <div className="flex items-center gap-2 bg-white p-1 rounded-xl border border-[#E7E5DF] shadow-sm">
          <Calendar className="w-4 h-4 text-[#107492] ml-2" />
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value as PeriodFilter)}
            className="px-3 py-2 bg-transparent font-semibold text-xs text-[#26332F] focus:outline-none cursor-pointer"
          >
            <option value="today">Hoje</option>
            <option value="7days">Últimos 7 dias</option>
            <option value="30days">Últimos 30 dias</option>
            <option value="month">Este mês</option>
          </select>
        </div>
      </div>

      {/* STATS OVERVIEW GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
        
        <div className="bg-white p-4 rounded-2xl border border-[#E7E5DF] shadow-sm space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#26332F]/60 block">
            Visitantes
          </span>
          <div className="text-2xl font-bold text-[#26332F]">{metrics.pageViews.toLocaleString()}</div>
          <span className="text-[10px] text-[#1B4931] font-semibold flex items-center gap-1">
            <Eye className="w-3 h-3 text-[#107492]" /> Page views
          </span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-[#E7E5DF] shadow-sm space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#26332F]/60 block">
            Empresas
          </span>
          <div className="text-2xl font-bold text-[#26332F]">{metrics.businessViews.toLocaleString()}</div>
          <span className="text-[10px] text-[#1B4931] font-semibold flex items-center gap-1">
            <Building2 className="w-3 h-3 text-[#107492]" /> Visualizações
          </span>
        </div>

        <div className="bg-[#071510] text-[#FFFFFF] p-4 rounded-2xl border border-[#1B4931]/60 shadow-md space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#F19F14] block">
            WhatsApp
          </span>
          <div className="text-2xl font-bold text-[#F19F14]">{metrics.whatsappClicks.toLocaleString()}</div>
          <span className="text-[10px] text-[#E7E5DF] font-semibold flex items-center gap-1">
            <MessageCircle className="w-3 h-3 text-[#F19F14]" /> Contatos diretos
          </span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-[#E7E5DF] shadow-sm space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#26332F]/60 block">
            Como Chegar
          </span>
          <div className="text-2xl font-bold text-[#26332F]">{metrics.mapClicks.toLocaleString()}</div>
          <span className="text-[10px] text-[#107492] font-semibold flex items-center gap-1">
            <Navigation className="w-3 h-3 text-[#107492]" /> Google Maps
          </span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-[#E7E5DF] shadow-sm space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#26332F]/60 block">
            Experiências
          </span>
          <div className="text-2xl font-bold text-[#26332F]">{metrics.experienceViews.toLocaleString()}</div>
          <span className="text-[10px] text-[#1B4931] font-semibold flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[#F19F14]" /> Vivências
          </span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-[#E7E5DF] shadow-sm space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#26332F]/60 block">
            Roteiros
          </span>
          <div className="text-2xl font-bold text-[#26332F]">{metrics.routeViews.toLocaleString()}</div>
          <span className="text-[10px] text-[#1B4931] font-semibold flex items-center gap-1">
            <MapPin className="w-3 h-3 text-[#107492]" /> Itinerários
          </span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-[#E7E5DF] shadow-sm space-y-2 col-span-2 sm:col-span-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#26332F]/60 block">
            Pesquisas
          </span>
          <div className="text-2xl font-bold text-[#26332F]">{metrics.searches.toLocaleString()}</div>
          <span className="text-[10px] text-[#26332F]/70 font-semibold flex items-center gap-1">
            <Search className="w-3 h-3 text-[#107492]" /> Buscas no guia
          </span>
        </div>

      </div>

      {/* RANKINGS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* RANKING 1: EMPRESAS MAIS VISUALIZADAS */}
        <div className="bg-white rounded-3xl border border-[#E7E5DF] shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-[#E7E5DF] pb-3">
            <h3 className="font-serif font-bold text-[#26332F] text-base flex items-center gap-2">
              <Eye className="w-4 h-4 text-[#107492]" />
              <span>Empresas mais visualizadas</span>
            </h3>
            <span className="text-[11px] font-semibold text-[#26332F]/60">Por page views</span>
          </div>

          <div className="divide-y divide-[#E7E5DF]">
            {topViews.map((item, idx) => (
              <div key={item.business.id} className="py-3 flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-3">
                  <span className="font-bold text-[#26332F]/60 w-4 text-center">{idx + 1}</span>
                  <div className="relative w-9 h-9 rounded-xl overflow-hidden bg-[#F6F0D4] shrink-0 border border-[#E7E5DF]">
                    <Image
                      src={item.business.main_image_url || 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=100&q=80'}
                      alt={item.business.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <span className="font-bold text-[#26332F] block truncate max-w-[180px] sm:max-w-[220px]">
                      {item.business.name}
                    </span>
                    <span className="text-[#26332F]/60 text-[10px]">
                      {item.business.category?.name || 'Geral'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-right">
                  <div>
                    <span className="font-bold text-[#26332F] block">{item.views}</span>
                    <span className="text-[10px] text-[#26332F]/60">visualizações</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RANKING 2: EMPRESAS QUE MAIS GERAM CONTATOS */}
        <div className="bg-white rounded-3xl border border-[#E7E5DF] shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-[#E7E5DF] pb-3">
            <h3 className="font-serif font-bold text-[#26332F] text-base flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-[#1B4931]" />
              <span>Empresas que mais geram contatos</span>
            </h3>
            <span className="text-[11px] font-semibold text-[#1B4931]">Ranking comercial</span>
          </div>

          <div className="divide-y divide-[#E7E5DF]">
            {topWhatsApp.map((item, idx) => (
              <div key={item.business.id} className="py-3 flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-3">
                  <span className="font-bold text-[#F19F14] w-4 text-center">#{idx + 1}</span>
                  <div className="relative w-9 h-9 rounded-xl overflow-hidden bg-[#F6F0D4] shrink-0 border border-[#E7E5DF]">
                    <Image
                      src={item.business.main_image_url || 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=100&q=80'}
                      alt={item.business.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-[#26332F] truncate max-w-[150px] sm:max-w-[180px]">
                        {item.business.name}
                      </span>
                      {item.business.plan === 'premium' && (
                        <Crown className="w-3 h-3 text-[#F19F14] fill-[#F19F14]" />
                      )}
                    </div>
                    <span className="text-[#26332F]/60 text-[10px]">
                      {item.business.category?.name}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-right">
                  <div className="bg-[#F6F0D4] px-3 py-1 rounded-xl border border-[#E7E5DF]">
                    <span className="font-bold text-[#1B4931] block">{item.whatsappClicks}</span>
                    <span className="text-[9px] text-[#1B4931] font-semibold uppercase">cliques WhatsApp</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
