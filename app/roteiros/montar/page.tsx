'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  ArrowRight,
  ArrowLeft,
  Navigation,
  ChevronRight,
  Heart,
  Users,
  User,
  Clock,
  Calendar,
  Hotel,
  Wine,
  Utensils,
  Trees,
  Compass,
  ShoppingBag,
  Landmark
} from 'lucide-react';
import { generateCustomItinerary } from '@/lib/services/data';
import { CustomRouteQuery, GeneratedItinerary } from '@/types';
import { WhatsAppButton } from '@/components/business/WhatsAppButton';
import { buildGoogleMapsUrl } from '@/lib/utils';
import { logBusinessEvent } from '@/lib/services/analytics';

export default function MonteSeuRoteiroPage() {
  const [step, setStep] = useState(1);
  const [travelers, setTravelers] = useState<'casal' | 'familia' | 'amigos' | 'sozinho'>('casal');
  const [duration, setDuration] = useState<'horas' | '1dia' | 'fimdesemana'>('1dia');
  const [interests, setInterests] = useState<string[]>(['vinhos', 'gastronomia']);
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
    logBusinessEvent({ event_type: 'route_view', page: '/roteiros/montar' });

    const query: CustomRouteQuery = {
      travelers,
      duration,
      interests,
    };

    const result = await generateCustomItinerary(query);
    setItinerary(result);
    setIsGenerating(false);
    setStep(4);
  };

  const resetWizard = () => {
    setStep(1);
    setItinerary(null);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-20 space-y-10 bg-[#F6F0D4]">
      
      {/* HEADER */}
      <div className="space-y-4 text-center border-b border-[#E7E5DF] pb-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-[#107492] text-xs font-semibold border border-[#E7E5DF] shadow-xs">
          <Sparkles className="w-4 h-4 text-[#F19F14]" aria-hidden="true" />
          <span>Assistente Interativo de Viagem</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#26332F] flex items-center justify-center gap-2">
          <Sparkles className="w-8 h-8 text-[#F19F14]" aria-hidden="true" />
          <span>Monte seu roteiro personalizado</span>
        </h1>
        <p className="text-sm sm:text-base text-[#26332F]/80 max-w-2xl mx-auto">
          Conte o que você gosta e nosso algoritmo inteligente criará uma sequência perfeita para o seu dia.
        </p>
      </div>

      {/* WIZARD PROGRESS */}
      {step < 4 && (
        <div className="max-w-md mx-auto flex items-center justify-between text-xs font-bold text-[#26332F]/60">
          <div className={`flex items-center gap-2 ${step >= 1 ? 'text-[#071510]' : ''}`}>
            <span className={`w-7 h-7 rounded-full flex items-center justify-center font-bold ${step >= 1 ? 'bg-[#071510] text-[#F19F14]' : 'bg-[#E7E5DF] text-[#26332F]'}`}>1</span>
            <span>Viajantes</span>
          </div>
          <div className="h-0.5 w-12 bg-[#E7E5DF]" />
          <div className={`flex items-center gap-2 ${step >= 2 ? 'text-[#071510]' : ''}`}>
            <span className={`w-7 h-7 rounded-full flex items-center justify-center font-bold ${step >= 2 ? 'bg-[#071510] text-[#F19F14]' : 'bg-[#E7E5DF] text-[#26332F]'}`}>2</span>
            <span>Duração</span>
          </div>
          <div className="h-0.5 w-12 bg-[#E7E5DF]" />
          <div className={`flex items-center gap-2 ${step >= 3 ? 'text-[#071510]' : ''}`}>
            <span className={`w-7 h-7 rounded-full flex items-center justify-center font-bold ${step >= 3 ? 'bg-[#071510] text-[#F19F14]' : 'bg-[#E7E5DF] text-[#26332F]'}`}>3</span>
            <span>Interesses</span>
          </div>
        </div>
      )}

      {/* STEP 1: QUEM ESTÁ VIAJANDO? */}
      {step === 1 && (
        <div className="bg-white rounded-3xl p-8 border border-[#E7E5DF] shadow-md space-y-8 max-w-2xl mx-auto animate-in fade-in duration-200">
          <div className="space-y-2 text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-[#107492]">Passo 1 de 3</span>
            <h2 className="font-serif text-2xl font-bold text-[#26332F]">Quem está viajando com você?</h2>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { id: 'casal', label: 'Casal / Romance', icon: Heart, desc: 'A dois com tranquilidade' },
              { id: 'familia', label: 'Família', icon: Users, desc: 'Com crianças e estrutura' },
              { id: 'amigos', label: 'Grupo de Amigos', icon: Users, desc: 'Diversão & vivências' },
              { id: 'sozinho', label: 'Sozinho', icon: User, desc: 'Explorador independente' },
            ].map((option) => {
              const Icon = option.icon;
              return (
                <button
                  key={option.id}
                  onClick={() => setTravelers(option.id as typeof travelers)}
                  aria-label={`Selecionar viagem com ${option.label}`}
                  className={`p-6 rounded-2xl border text-left transition-all space-y-2 cursor-pointer ${
                    travelers === option.id
                      ? 'border-[#1B4931] bg-[#F6F0D4]/60 ring-2 ring-[#F19F14] shadow-sm'
                      : 'border-[#E7E5DF] hover:bg-[#F6F0D4]/30'
                  }`}
                >
                  <div className="flex items-center gap-2 font-serif font-bold text-[#26332F] text-base">
                    <Icon className="w-5 h-5 text-[#107492]" aria-hidden="true" />
                    <span>{option.label}</span>
                  </div>
                  <div className="text-xs text-[#26332F]/70">{option.desc}</div>
                </button>
              );
            })}
          </div>

          <div className="flex justify-end pt-4 border-t border-[#E7E5DF]">
            <button
              onClick={() => setStep(2)}
              aria-label="Avançar para o passo de duração"
              className="inline-flex items-center gap-2 bg-[#F19F14] hover:bg-[#D86E04] text-[#071510] hover:text-[#FFFFFF] font-bold text-sm px-6 py-3 rounded-xl shadow-md transition-all cursor-pointer"
            >
              <span>Avançar</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: DURAÇÃO */}
      {step === 2 && (
        <div className="bg-white rounded-3xl p-8 border border-[#E7E5DF] shadow-md space-y-8 max-w-2xl mx-auto animate-in fade-in duration-200">
          <div className="space-y-2 text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-[#107492]">Passo 2 de 3</span>
            <h2 className="font-serif text-2xl font-bold text-[#26332F]">Quanto tempo você tem disponível?</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { id: 'horas', label: 'Poucas Horas', icon: Clock, desc: 'Bate-e-volta rápido' },
              { id: '1dia', label: '1 Dia Completo', icon: Calendar, desc: 'Manhã até o entardecer' },
              { id: 'fimdesemana', label: 'Fim de Semana', icon: Hotel, desc: 'Com pernoite na pousada' },
            ].map((option) => {
              const Icon = option.icon;
              return (
                <button
                  key={option.id}
                  onClick={() => setDuration(option.id as typeof duration)}
                  aria-label={`Selecionar duração ${option.label}`}
                  className={`p-6 rounded-2xl border text-left transition-all space-y-2 cursor-pointer ${
                    duration === option.id
                      ? 'border-[#1B4931] bg-[#F6F0D4]/60 ring-2 ring-[#F19F14] shadow-sm'
                      : 'border-[#E7E5DF] hover:bg-[#F6F0D4]/30'
                  }`}
                >
                  <div className="flex items-center gap-2 font-serif font-bold text-[#26332F] text-base">
                    <Icon className="w-5 h-5 text-[#107492]" aria-hidden="true" />
                    <span>{option.label}</span>
                  </div>
                  <div className="text-xs text-[#26332F]/70">{option.desc}</div>
                </button>
              );
            })}
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-[#E7E5DF]">
            <button
              onClick={() => setStep(1)}
              aria-label="Voltar para o passo anterior"
              className="inline-flex items-center gap-2 text-xs font-bold text-[#26332F]/70 hover:text-[#071510] px-4 py-2 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Voltar</span>
            </button>
            <button
              onClick={() => setStep(3)}
              aria-label="Avançar para interesses"
              className="inline-flex items-center gap-2 bg-[#F19F14] hover:bg-[#D86E04] text-[#071510] hover:text-[#FFFFFF] font-bold text-sm px-6 py-3 rounded-xl shadow-md transition-all cursor-pointer"
            >
              <span>Avançar</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: INTERESSES */}
      {step === 3 && (
        <div className="bg-white rounded-3xl p-8 border border-[#E7E5DF] shadow-md space-y-8 max-w-2xl mx-auto animate-in fade-in duration-200">
          <div className="space-y-2 text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-[#107492]">Passo 3 de 3</span>
            <h2 className="font-serif text-2xl font-bold text-[#26332F]">O que você quer priorizar?</h2>
            <p className="text-xs text-[#26332F]/70">Selecione uma ou mais preferências para o seu itinerário:</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              { id: 'vinhos', label: 'Vinhos & Degustação', icon: Wine },
              { id: 'gastronomia', label: 'Alta Gastronomia', icon: Utensils },
              { id: 'natureza', label: 'Natureza & Trilhas', icon: Trees },
              { id: 'aventura', label: 'Aventura & Mirantes', icon: Compass },
              { id: 'compras', label: 'Compras & Artesanato', icon: ShoppingBag },
              { id: 'cultura', label: 'Cultura & História', icon: Landmark },
            ].map((option) => {
              const isSelected = interests.includes(option.id);
              const Icon = option.icon;
              return (
                <button
                  key={option.id}
                  onClick={() => toggleInterest(option.id)}
                  aria-label={`Alternar interesse ${option.label}`}
                  className={`p-4 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-2 cursor-pointer ${
                    isSelected
                      ? 'border-[#1B4931] bg-[#071510] text-[#FFFFFF] shadow-md font-semibold'
                      : 'border-[#E7E5DF] text-[#26332F] hover:bg-[#F6F0D4]/50'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isSelected ? 'text-[#F19F14]' : 'text-[#107492]'}`} aria-hidden="true" />
                  <span className="text-xs">{option.label}</span>
                </button>
              );
            })}
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-[#E7E5DF]">
            <button
              onClick={() => setStep(2)}
              aria-label="Voltar para a etapa anterior"
              className="inline-flex items-center gap-2 text-xs font-bold text-[#26332F]/70 hover:text-[#071510] px-4 py-2 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Voltar</span>
            </button>
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              aria-label="Gerar meu roteiro personalizado"
              className="inline-flex items-center gap-2 bg-[#F19F14] hover:bg-[#D86E04] text-[#071510] hover:text-[#FFFFFF] font-bold text-sm px-7 py-3 rounded-xl shadow-lg transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isGenerating ? 'Criando roteiro...' : 'Gerar Roteiro Personalizado'}</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: RESULTADO GERADO */}
      {step === 4 && itinerary && (
        <div className="space-y-8 animate-in zoom-in-95 duration-300">
          <div className="bg-[#071510] text-[#FFFFFF] rounded-3xl p-8 shadow-xl border border-[#1B4931]/50 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <span className="text-xs font-bold text-[#F19F14] uppercase tracking-wider block">
                Roteiro Gerado com Sucesso
              </span>
              <h2 className="font-serif text-3xl font-bold">{itinerary.title}</h2>
              <div className="flex flex-wrap gap-2 text-xs pt-1 justify-center md:justify-start">
                <span className="bg-[#1B4931] px-3 py-1 rounded-full border border-[#1B4931] text-[#FFFFFF] font-semibold">
                  {itinerary.profileLabel}
                </span>
                <span className="bg-[#1B4931] px-3 py-1 rounded-full border border-[#1B4931] text-[#FFFFFF] font-semibold">
                  {itinerary.durationLabel}
                </span>
              </div>
            </div>
            <button
              onClick={resetWizard}
              className="bg-white/10 hover:bg-white/20 text-[#FFFFFF] text-xs font-semibold px-4 py-2.5 rounded-xl border border-white/30 transition-all shrink-0 cursor-pointer"
            >
              Refazer Perguntas
            </button>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            <h3 className="font-serif text-2xl font-bold text-[#26332F] border-b border-[#E7E5DF] pb-3">
              Cronograma de Paradas Recomendado
            </h3>

            <div className="relative border-l-2 border-[#1B4931]/40 pl-6 sm:pl-8 space-y-10">
              {itinerary.stops.map((stop, idx) => {
                const mapsUrl = stop.business
                  ? buildGoogleMapsUrl(stop.business.address, stop.business.latitude, stop.business.longitude, 'São Roque')
                  : '';

                return (
                  <div key={idx} className="relative space-y-4 bg-white p-6 rounded-3xl border border-[#E7E5DF] shadow-sm">
                    <div className="absolute -left-[41px] top-6 w-9 h-9 rounded-full bg-[#071510] text-[#F19F14] font-bold text-xs flex items-center justify-center border-4 border-[#F6F0D4] shadow-md">
                      {stop.time}
                    </div>

                    <div className="space-y-1">
                      <h4 className="font-serif text-xl font-bold text-[#26332F]">
                        {stop.title}
                      </h4>
                      <p className="text-sm text-[#26332F]/80 leading-relaxed">
                        {stop.description}
                      </p>
                    </div>

                    {stop.business && (
                      <div className="pt-2 border-t border-[#E7E5DF] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="space-y-0.5">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-[#107492] block">
                            Parceiro Recomendado
                          </span>
                          <span className="font-serif font-bold text-[#26332F] text-base block">
                            {stop.business.name}
                          </span>
                          <span className="text-xs text-[#26332F]/70 block">{stop.business.address}</span>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                          <Link
                            href={`/sao-roque/empresa/${stop.business.slug}`}
                            className="inline-flex items-center gap-1 text-xs font-semibold text-[#1B4931] bg-[#F6F0D4] hover:bg-[#E7E5DF] px-3 py-2 rounded-xl transition-all"
                          >
                            <span>Ver empresa</span>
                            <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
                          </Link>

                          {mapsUrl && (
                            <a
                              href={mapsUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-xs font-semibold text-[#26332F] bg-[#F6F0D4] hover:bg-[#E7E5DF] px-3 py-2 rounded-xl transition-all"
                            >
                              <Navigation className="w-3.5 h-3.5 text-[#107492]" aria-hidden="true" />
                              <span>Como chegar</span>
                            </a>
                          )}

                          <WhatsAppButton
                            phoneOrWhatsapp={stop.business.whatsapp || stop.business.phone}
                            businessName={stop.business.name}
                            cityName="São Roque"
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
