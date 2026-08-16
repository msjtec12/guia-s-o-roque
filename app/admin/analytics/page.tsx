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
    <div className="space-y-8 bg-[#FCFAF5]">
      
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#e6dfd4] pb-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-[#26332F]">
            Painel de Analytics & Métricas
          </h1>
          <p className="text-xs text-[#52615B]">
            Acompanhe a audiência, engajamento dos turistas e geração de contatos comerciais por destino
          </p>
        </div>

        {/* PERIOD FILTER */}
        <div className="flex items-center gap-2 bg-white p-1 rounded-xl border border-[#e6dfd4] shadow-sm">
          <Calendar className="w-4 h-4 text-[#183A32] ml-2" />
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value as PeriodFilter)}
            className="px-3 py-2 bg-transparent font-semibold text-xs text-[#26332F] focus:outline-none"
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
        
        <div className="bg-white p-4 rounded-2xl border border-[#e6dfd4] shadow-sm space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#82967A] block">
            Visitantes
          </span>
          <div className="text-2xl font-bold text-[#26332F]">{metrics.pageViews.toLocaleString()}</div>
          <span className="text-[10px] text-[#183A32] font-semibold flex items-center gap-1">
            <Eye className="w-3 h-3" /> Page views
          </span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-[#e6dfd4] shadow-sm space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#82967A] block">
            Empresas
          </span>
          <div className="text-2xl font-bold text-[#26332F]">{metrics.businessViews.toLocaleString()}</div>
          <span className="text-[10px] text-[#183A32] font-semibold flex items-center gap-1">
            <Building2 className="w-3 h-3" /> Visualizações
          </span>
        </div>

        <div className="bg-[#183A32] text-[#FCFAF5] p-4 rounded-2xl border border-[#245247] shadow-md space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#D49A3A] block">
            WhatsApp
          </span>
          <div className="text-2xl font-bold text-[#D49A3A]">{metrics.whatsappClicks.toLocaleString()}</div>
          <span className="text-[10px] text-[#F4EBDD] font-semibold flex items-center gap-1">
            <MessageCircle className="w-3 h-3 text-[#D49A3A]" /> Contatos diretos
          </span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-[#e6dfd4] shadow-sm space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#82967A] block">
            Como Chegar
          </span>
          <div className="text-2xl font-bold text-[#26332F]">{metrics.mapClicks.toLocaleString()}</div>
          <span className="text-[10px] text-[#183A32] font-semibold flex items-center gap-1">
            <Navigation className="w-3 h-3" /> Google Maps
          </span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-[#e6dfd4] shadow-sm space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#82967A] block">
            Experiências
          </span>
          <div className="text-2xl font-bold text-[#26332F]">{metrics.experienceViews.toLocaleString()}</div>
          <span className="text-[10px] text-[#722F3E] font-semibold flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[#D49A3A]" /> Vivências
          </span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-[#e6dfd4] shadow-sm space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#82967A] block">
            Roteiros
          </span>
          <div className="text-2xl font-bold text-[#26332F]">{metrics.routeViews.toLocaleString()}</div>
          <span className="text-[10px] text-[#B86F52] font-semibold flex items-center gap-1">
            <MapPin className="w-3 h-3" /> Itinerários
          </span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-[#e6dfd4] shadow-sm space-y-2 col-span-2 sm:col-span-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#82967A] block">
            Pesquisas
          </span>
          <div className="text-2xl font-bold text-[#26332F]">{metrics.searches.toLocaleString()}</div>
          <span className="text-[10px] text-[#52615B] font-semibold flex items-center gap-1">
            <Search className="w-3 h-3" /> Buscas no guia
          </span>
        </div>

      </div>

      {/* RANKINGS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* RANKING 1: EMPRESAS MAIS VISUALIZADAS */}
        <div className="bg-white rounded-2xl border border-[#e6dfd4] shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-[#F4EBDD] pb-3">
            <h3 className="font-serif font-bold text-[#26332F] text-base flex items-center gap-2">
              <Eye className="w-4 h-4 text-[#183A32]" />
              <span>Empresas mais visualizadas</span>
            </h3>
            <span className="text-[11px] font-semibold text-[#82967A]">Por page views</span>
          </div>

          <div className="divide-y divide-[#F4EBDD]">
            {topViews.map((item, idx) => (
              <div key={item.business.id} className="py-3 flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-3">
                  <span className="font-bold text-[#82967A] w-4 text-center">{idx + 1}</span>
                  <div className="relative w-9 h-9 rounded-xl overflow-hidden bg-[#FCFAF5] shrink-0 border border-[#e6dfd4]">
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
                    <span className="text-[#82967A] text-[10px]">
                      {item.business.category?.name || 'Geral'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-right">
                  <div>
                    <span className="font-bold text-[#26332F] block">{item.views}</span>
                    <span className="text-[10px] text-[#82967A]">visualizações</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RANKING 2: EMPRESAS QUE MAIS GERAM CONTATOS */}
        <div className="bg-white rounded-2xl border border-[#e6dfd4] shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-[#F4EBDD] pb-3">
            <h3 className="font-serif font-bold text-[#26332F] text-base flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-[#183A32]" />
              <span>Empresas que mais geram contatos</span>
            </h3>
            <span className="text-[11px] font-semibold text-[#183A32]">Ranking comercial</span>
          </div>

          <div className="divide-y divide-[#F4EBDD]">
            {topWhatsApp.map((item, idx) => (
              <div key={item.business.id} className="py-3 flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-3">
                  <span className="font-bold text-[#D49A3A] w-4 text-center">#{idx + 1}</span>
                  <div className="relative w-9 h-9 rounded-xl overflow-hidden bg-[#FCFAF5] shrink-0 border border-[#e6dfd4]">
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
                        <Crown className="w-3 h-3 text-[#D49A3A] fill-[#D49A3A]" />
                      )}
                    </div>
                    <span className="text-[#82967A] text-[10px]">
                      {item.business.category?.name}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-right">
                  <div className="bg-[#F4EBDD] px-3 py-1 rounded-xl border border-[#e6dfd4]">
                    <span className="font-bold text-[#183A32] block">{item.whatsappClicks}</span>
                    <span className="text-[9px] text-[#183A32] font-semibold uppercase">cliques WhatsApp</span>
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
