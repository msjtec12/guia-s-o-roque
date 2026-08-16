'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  Navigation, 
  CheckCircle2, 
  ChevronRight, 
  Heart, 
  Users, 
  User, 
  Clock, 
  Calendar, 
  Hotel, 
  Mountain, 
  Utensils, 
  Trees, 
  Compass, 
  Beer, 
  Apple 
} from 'lucide-react';
import { generateCustomItinerary } from '@/lib/services/data';
import { CustomRouteQuery, GeneratedItinerary } from '@/types';
import { WhatsAppButton } from '@/components/business/WhatsAppButton';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { buildGoogleMapsUrl } from '@/lib/utils';
import { logBusinessEvent } from '@/lib/services/analytics';

export default function AtibaiaMonteSeuRoteiroPage() {
  const [step, setStep] = useState(1);
  const [travelers, setTravelers] = useState<'casal' | 'familia' | 'amigos' | 'sozinho'>('casal');
  const [duration, setDuration] = useState<'horas' | '1dia' | 'fimdesemana'>('1dia');
  const [interests, setInterests] = useState<string[]>(['natureza', 'aventura']);
  const [isGenerating, setIsGenerating] = useState(false);
  const [itinerary, setItinerary] = useState<GeneratedItinerary | null>(null);

  const toggleInterest = (value: string) => {
    if (interests.includes(value)) {
      if (interests.length > 1) {
        setInterests(interests.filter((i) => i !== value));
      }
    } else {
      setInterests([...interests, value]);
    }
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    logBusinessEvent({ event_type: 'route_view', page: '/atibaia/roteiros/montar', city_id: 'city-atibaia' });

    const query: CustomRouteQuery = {
      travelers,
      duration,
      interests,
    };

    const result = await generateCustomItinerary(query, 'atibaia');
    setItinerary(result);
    setIsGenerating(false);
    setStep(4);
  };

  const resetWizard = () => {
    setStep(1);
    setItinerary(null);
  };

  const breadcrumbs = [
    { label: 'Atibaia', href: '/atibaia' },
    { label: 'Roteiros', href: '/atibaia/roteiros' },
    { label: 'Montar Roteiro' },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-20 space-y-8 bg-[#FCFAF5]">
      
      <Breadcrumbs items={breadcrumbs} />

      {/* HEADER */}
      <div className="space-y-3 text-center border-b border-[#e6dfd4] pb-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F4EBDD] text-[#183A32] text-xs font-semibold border border-[#e6dfd4]">
          <Sparkles className="w-4 h-4 text-[#D49A3A]" aria-hidden="true" />
          <span>Assistente Interativo de Viagem • Atibaia</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#26332F] flex items-center justify-center gap-2">
          <Sparkles className="w-8 h-8 text-[#D49A3A]" aria-hidden="true" />
          <span>Monte seu roteiro em Atibaia</span>
        </h1>
        <p className="text-sm sm:text-base text-[#52615B] max-w-2xl mx-auto">
          Conte o que você mais gosta e descubra uma sugestão personalizada de mirantes, aventuras, gastronomia e passeios em Atibaia.
        </p>
      </div>

      {/* WIZARD PROGRESS */}
      {step < 4 && (
        <div className="max-w-md mx-auto flex items-center justify-between text-xs font-bold text-[#82967A]">
          <div className={`flex items-center gap-2 ${step >= 1 ? 'text-[#183A32]' : ''}`}>
            <span className={`w-7 h-7 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-[#183A32] text-[#D49A3A]' : 'bg-[#e6dfd4]'}`}>1</span>
            <span>Viajantes</span>
          </div>
          <div className="h-0.5 w-12 bg-[#e6dfd4]" />
          <div className={`flex items-center gap-2 ${step >= 2 ? 'text-[#183A32]' : ''}`}>
            <span className={`w-7 h-7 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-[#183A32] text-[#D49A3A]' : 'bg-[#e6dfd4]'}`}>2</span>
            <span>Duração</span>
          </div>
          <div className="h-0.5 w-12 bg-[#e6dfd4]" />
          <div className={`flex items-center gap-2 ${step >= 3 ? 'text-[#183A32]' : ''}`}>
            <span className={`w-7 h-7 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-[#183A32] text-[#D49A3A]' : 'bg-[#e6dfd4]'}`}>3</span>
            <span>Preferências</span>
          </div>
        </div>
      )}

      {/* STEP 1 */}
      {step === 1 && (
        <div className="bg-white rounded-3xl p-8 border border-[#e6dfd4] shadow-md space-y-8 max-w-2xl mx-auto animate-in fade-in duration-200">
          <div className="space-y-2 text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-[#183A32]">Passo 1 de 3</span>
            <h2 className="font-serif text-2xl font-bold text-[#26332F]">Quem está viajando com você?</h2>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { id: 'casal', label: 'Casal / Romance', icon: Heart, desc: 'A dois na serra de Atibaia' },
              { id: 'familia', label: 'Família', icon: Users, desc: 'Com crianças e parques' },
              { id: 'amigos', label: 'Grupo de Amigos', icon: Users, desc: 'Aventura & cervejarias' },
              { id: 'sozinho', label: 'Sozinho', icon: User, desc: 'Ecoturismo solo' },
            ].map((option) => {
              const Icon = option.icon;
              return (
                <button
                  key={option.id}
                  onClick={() => setTravelers(option.id as typeof travelers)}
                  className={`p-6 rounded-2xl border text-left transition-all space-y-2 cursor-pointer ${
                    travelers === option.id
                      ? 'border-[#183A32] bg-[#F4EBDD]/60 ring-2 ring-[#183A32] shadow-sm'
                      : 'border-[#e6dfd4] hover:bg-[#FCFAF5]'
                  }`}
                >
                  <div className="flex items-center gap-2 font-serif font-bold text-[#26332F] text-base">
                    <Icon className="w-5 h-5 text-[#183A32]" aria-hidden="true" />
                    <span>{option.label}</span>
                  </div>
                  <div className="text-xs text-[#52615B]">{option.desc}</div>
                </button>
              );
            })}
          </div>

          <div className="flex justify-end pt-4 border-t border-[#F4EBDD]">
            <button
              onClick={() => setStep(2)}
              className="inline-flex items-center gap-2 bg-[#183A32] hover:bg-[#245247] text-[#FCFAF5] font-bold text-sm px-7 py-3.5 rounded-xl shadow-md transition-all cursor-pointer"
            >
              <span>Próximo Passo</span>
              <ArrowRight className="w-4 h-4 text-[#D49A3A]" aria-hidden="true" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <div className="bg-white rounded-3xl p-8 border border-[#e6dfd4] shadow-md space-y-8 max-w-2xl mx-auto animate-in fade-in duration-200">
          <div className="space-y-2 text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-[#183A32]">Passo 2 de 3</span>
            <h2 className="font-serif text-2xl font-bold text-[#26332F]">Quanto tempo você pretende ficar em Atibaia?</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { id: 'horas', label: 'Algumas horas', icon: Clock, desc: 'Pedra Grande ou almoço' },
              { id: '1dia', label: '1 Dia Completo', icon: Calendar, desc: 'Das 09h às 18h' },
              { id: 'fimdesemana', label: 'Fim de Semana', icon: Hotel, desc: 'Pousada ou Resort' },
            ].map((option) => {
              const Icon = option.icon;
              return (
                <button
                  key={option.id}
                  onClick={() => setDuration(option.id as typeof duration)}
                  className={`p-6 rounded-2xl border text-center transition-all space-y-2 flex flex-col items-center justify-center cursor-pointer ${
                    duration === option.id
                      ? 'border-[#183A32] bg-[#F4EBDD]/60 ring-2 ring-[#183A32] shadow-sm'
                      : 'border-[#e6dfd4] hover:bg-[#FCFAF5]'
                  }`}
                >
                  <Icon className="w-6 h-6 text-[#183A32]" aria-hidden="true" />
                  <div className="font-serif font-bold text-[#26332F] text-base">{option.label}</div>
                  <div className="text-xs text-[#52615B]">{option.desc}</div>
                </button>
              );
            })}
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-[#F4EBDD]">
            <button
              onClick={() => setStep(1)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#52615B] hover:text-[#26332F] cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              <span>Voltar</span>
            </button>
            <button
              onClick={() => setStep(3)}
              className="inline-flex items-center gap-2 bg-[#183A32] hover:bg-[#245247] text-[#FCFAF5] font-bold text-sm px-7 py-3.5 rounded-xl shadow-md transition-all cursor-pointer"
            >
              <span>Próximo Passo</span>
              <ArrowRight className="w-4 h-4 text-[#D49A3A]" aria-hidden="true" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3 */}
      {step === 3 && (
        <div className="bg-white rounded-3xl p-8 border border-[#e6dfd4] shadow-md space-y-8 max-w-2xl mx-auto animate-in fade-in duration-200">
          <div className="space-y-2 text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-[#183A32]">Passo 3 de 3</span>
            <h2 className="font-serif text-2xl font-bold text-[#26332F]">O que mais combina com você em Atibaia?</h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              { id: 'natureza', label: 'Pedra Grande', icon: Mountain },
              { id: 'aventura', label: 'Voo Livre & Trilhas', icon: Compass },
              { id: 'gastronomia', label: 'Gastronomia', icon: Utensils },
              { id: 'cervejas', label: 'Cervejarias', icon: Beer },
              { id: 'morangos', label: 'Colheita de Morangos', icon: Apple },
              { id: 'passeios', label: 'Teleférico & Parques', icon: Trees },
            ].map((option) => {
              const isSelected = interests.includes(option.id);
              const Icon = option.icon;
              return (
                <button
                  key={option.id}
                  onClick={() => toggleInterest(option.id)}
                  className={`p-4 rounded-2xl border text-center font-serif font-bold text-sm transition-all flex items-center justify-between cursor-pointer ${
                    isSelected
                      ? 'border-[#183A32] bg-[#183A32] text-[#D49A3A] shadow-sm'
                      : 'border-[#e6dfd4] text-[#26332F] hover:bg-[#FCFAF5]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Icon className={`w-4 h-4 ${isSelected ? 'text-[#D49A3A]' : 'text-[#183A32]'}`} aria-hidden="true" />
                    <span>{option.label}</span>
                  </div>
                  {isSelected && <CheckCircle2 className="w-4 h-4 text-[#D49A3A] shrink-0" aria-hidden="true" />}
                </button>
              );
            })}
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-[#F4EBDD]">
            <button
              onClick={() => setStep(2)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#52615B] hover:text-[#26332F] cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              <span>Voltar</span>
            </button>
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="inline-flex items-center gap-2 bg-[#D49A3A] hover:bg-[#c28c32] text-[#26332F] font-bold text-sm px-8 py-3.5 rounded-xl shadow-lg transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4" aria-hidden="true" />
              <span>{isGenerating ? 'Gerando Roteiro...' : 'Gerar Roteiro em Atibaia'}</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 4 RESULT */}
      {step === 4 && itinerary && (
        <div className="space-y-8 animate-in zoom-in-95 duration-300">
          <div className="bg-[#183A32] text-[#FCFAF5] rounded-3xl p-8 shadow-xl border border-[#245247] flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <span className="text-xs font-bold text-[#D49A3A] uppercase tracking-wider block">
                Roteiro Gerado com Sucesso em Atibaia
              </span>
              <h2 className="font-serif text-3xl font-bold">{itinerary.title}</h2>
              <div className="flex flex-wrap gap-2 text-xs pt-1 justify-center md:justify-start">
                <span className="bg-[#245247] px-3 py-1 rounded-full border border-[#82967A]/50 text-[#F4EBDD] font-semibold">
                  {itinerary.profileLabel}
                </span>
                <span className="bg-[#245247] px-3 py-1 rounded-full border border-[#82967A]/50 text-[#F4EBDD] font-semibold">
                  {itinerary.durationLabel}
                </span>
              </div>
            </div>
            <button
              onClick={resetWizard}
              className="bg-white/10 hover:bg-white/20 text-[#FCFAF5] text-xs font-semibold px-4 py-2.5 rounded-xl border border-white/30 transition-all shrink-0 cursor-pointer"
            >
              Refazer Perguntas
            </button>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            <h3 className="font-serif text-2xl font-bold text-[#26332F] border-b border-[#e6dfd4] pb-3">
              Cronograma de Paradas Recomendado em Atibaia
            </h3>

            <div className="relative border-l-2 border-[#183A32]/40 pl-6 sm:pl-8 space-y-10">
              {itinerary.stops.map((stop, idx) => {
                const mapsUrl = stop.business
                  ? buildGoogleMapsUrl(stop.business.address, stop.business.latitude, stop.business.longitude, 'Atibaia')
                  : '';

                return (
                  <div key={idx} className="relative space-y-4 bg-white p-6 rounded-3xl border border-[#e6dfd4] shadow-sm">
                    <div className="absolute -left-[41px] top-6 w-9 h-9 rounded-full bg-[#183A32] text-[#D49A3A] font-bold text-xs flex items-center justify-center border-4 border-[#FCFAF5] shadow-md">
                      {stop.time}
                    </div>

                    <div className="space-y-1">
                      <h4 className="font-serif text-xl font-bold text-[#26332F]">
                        {stop.title}
                      </h4>
                      <p className="text-sm text-[#52615B] leading-relaxed">
                        {stop.description}
                      </p>
                    </div>

                    {stop.business && (
                      <div className="pt-2 border-t border-[#F4EBDD] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="space-y-0.5">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-[#183A32] block">
                            Parceiro Recomendado
                          </span>
                          <span className="font-serif font-bold text-[#26332F] text-base block">
                            {stop.business.name}
                          </span>
                          <span className="text-xs text-[#52615B] block">{stop.business.address}</span>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                          <Link
                            href={`/atibaia/empresa/${stop.business.slug}`}
                            className="inline-flex items-center gap-1 text-xs font-semibold text-[#183A32] bg-[#F4EBDD] hover:bg-[#e8dbca] px-3 py-2 rounded-xl transition-all"
                          >
                            <span>Ver empresa</span>
                            <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
                          </Link>

                          {mapsUrl && (
                            <a
                              href={mapsUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-xs font-semibold text-[#26332F] bg-[#F4EBDD] hover:bg-[#e8dbca] px-3 py-2 rounded-xl transition-all"
                            >
                              <Navigation className="w-3.5 h-3.5 text-[#183A32]" aria-hidden="true" />
                              <span>Como chegar</span>
                            </a>
                          )}

                          <WhatsAppButton
                            phoneOrWhatsapp={stop.business.whatsapp || stop.business.phone}
                            businessName={stop.business.name}
                            cityName="Atibaia"
                            businessId={stop.business.id}
                            variant="secondary"
                            className="text-xs py-2"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
