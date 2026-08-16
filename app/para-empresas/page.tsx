import React from 'react';
import Link from 'next/link';
import { 
  Building2, 
  CheckCircle2, 
  Sparkles, 
  Crown, 
  MessageCircle, 
  ArrowRight,
  Eye,
  Compass,
  Wine,
  Users,
  Check,
  Trees,
  Waves
} from 'lucide-react';
import { constructMetadata } from '@/lib/seo/metadata';

export const metadata = constructMetadata({
  title: 'Para Empresas | Anuncie no Descubra Cidades',
  description: 'Conecte sua empresa a visitantes que estão planejando sua viagem para São Roque, Atibaia, Socorro e outros destinos turísticos.',
});

export default function ParaEmpresasPage() {
  return (
    <div className="pb-20 space-y-16 bg-[#F6F0D4]">
      
      {/* HERO BANNER */}
      <section className="bg-[#071510] text-[#FFFFFF] py-20 border-b border-[#1B4931]/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1B4931] text-[#F19F14] text-xs font-semibold border border-[#1B4931]">
            <Building2 className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Portal Comercial para Anunciantes • Multicidade</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold leading-tight max-w-4xl mx-auto">
            Faça sua empresa ser encontrada por quem está viajando para o seu destino.
          </h1>

          <p className="text-base sm:text-lg text-[#E7E5DF] max-w-3xl mx-auto leading-relaxed">
            Seu cliente já está procurando o que fazer em São Roque, Atibaia e Socorro. A plataforma Descubra Cidades conecta turistas a experiências, restaurantes, hospedagens e comércios locais.
          </p>

          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <Link
              href="/cadastro-parceiro"
              aria-label="Quero cadastrar minha empresa"
              className="inline-flex items-center gap-2 bg-[#F19F14] hover:bg-[#D86E04] text-[#071510] hover:text-[#FFFFFF] font-bold text-base px-8 py-4 rounded-2xl shadow-xl transition-all transform active:scale-95 cursor-pointer"
            >
              <span>Quero Cadastrar Minha Empresa</span>
              <ArrowRight className="w-5 h-5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* SEÇÃO: SEJA UM PARCEIRO OFICIAL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#071510] text-[#FFFFFF] rounded-3xl p-8 sm:p-12 border-2 border-[#1B4931] shadow-2xl space-y-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
            <Compass className="w-64 h-64 text-[#F19F14]" aria-hidden="true" />
          </div>

          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1B4931] text-[#F19F14] text-xs font-extrabold uppercase tracking-wider border border-[#1B4931]">
              <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Rede Multicidade em Expansão</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#FFFFFF] flex items-center gap-2.5">
              <span>Seja um Parceiro Oficial Descubra Cidades</span>
            </h2>
            <p className="text-sm sm:text-base text-[#E7E5DF] leading-relaxed">
              Destaque seu negócio nas páginas de São Roque, Atibaia, Socorro e novas cidades da rede com benefícios exclusivos e contato direto por WhatsApp.
            </p>
          </div>

          {/* BENEFÍCIOS DO PARCEIRO */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-semibold">
            {[
              'Perfil exclusivo no guia do destino',
              'Galeria de fotos em alta resolução',
              'Link direto para o seu WhatsApp',
              'Redirecionamento para Instagram',
              'Destaque na sua categoria',
              'Participação prioritária em Roteiros',
              'Relatórios e métricas de cliques',
              'Suporte no cadastro do perfil',
            ].map((item, idx) => (
              <div key={idx} className="bg-[#1B4931]/60 p-3.5 rounded-2xl border border-[#1B4931] flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#F19F14] shrink-0" aria-hidden="true" />
                <span className="text-[#FFFFFF]">{item}</span>
              </div>
            ))}
          </div>

          <div className="pt-4 flex flex-wrap gap-4 items-center">
            <Link
              href="/cadastro-parceiro?city=sao-roque"
              className="inline-flex items-center gap-2 bg-[#F19F14] hover:bg-[#D86E04] text-[#071510] hover:text-[#FFFFFF] font-bold text-sm px-6 py-3.5 rounded-2xl shadow-lg transition-all"
            >
              <Wine className="w-4 h-4" />
              <span>Cadastrar em São Roque</span>
            </Link>
            <Link
              href="/cadastro-parceiro?city=atibaia"
              className="inline-flex items-center gap-2 bg-[#1B4931] hover:bg-[#071510] text-[#FFFFFF] font-bold text-sm px-6 py-3.5 rounded-2xl shadow-lg border border-[#1B4931] transition-all"
            >
              <Trees className="w-4 h-4 text-[#F19F14]" />
              <span>Cadastrar em Atibaia</span>
            </Link>
            <Link
              href="/cadastro-parceiro?city=socorro"
              className="inline-flex items-center gap-2 bg-[#107492] hover:bg-[#071510] text-[#FFFFFF] font-bold text-sm px-6 py-3.5 rounded-2xl shadow-lg border border-[#107492] transition-all"
            >
              <Waves className="w-4 h-4 text-[#F19F14]" />
              <span>Cadastrar em Socorro</span>
            </Link>
          </div>
        </div>
      </section>

      {/* FLUXO VISUAL COMERCIAL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-xs font-bold text-[#107492] uppercase tracking-wider">
            Por Que Anunciar?
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#26332F]">
            Como o Descubra Cidades gera valor para o seu negócio
          </h2>
        </div>

        {/* FUNIL VISUAL */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          
          <div className="bg-white p-6 rounded-3xl border border-[#E7E5DF] shadow-sm text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#F6F0D4] text-[#107492] flex items-center justify-center mx-auto border border-[#E7E5DF]">
              <Eye className="w-6 h-6 stroke-[1.8]" aria-hidden="true" />
            </div>
            <h4 className="font-serif font-bold text-base text-[#26332F]">1. VISIBILIDADE</h4>
            <p className="text-xs text-[#26332F]/80 leading-relaxed">
              Sua empresa presente no guia digital onde os turistas planejam a viagem.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-[#E7E5DF] shadow-sm text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#F6F0D4] text-[#1B4931] flex items-center justify-center mx-auto border border-[#E7E5DF]">
              <Compass className="w-6 h-6 stroke-[1.8]" aria-hidden="true" />
            </div>
            <h4 className="font-serif font-bold text-base text-[#26332F]">2. DESCOBERTA</h4>
            <p className="text-xs text-[#26332F]/80 leading-relaxed">
              Destaque para suas especialidades, pratos, vinhos, passeios e chalés.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-[#E7E5DF] shadow-sm text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#F6F0D4] text-[#107492] flex items-center justify-center mx-auto border border-[#E7E5DF]">
              <MessageCircle className="w-6 h-6 stroke-[1.8]" aria-hidden="true" />
            </div>
            <h4 className="font-serif font-bold text-base text-[#26332F]">3. CONTATO</h4>
            <p className="text-xs text-[#26332F]/80 leading-relaxed">
              O turista clica e fala direto com seu WhatsApp comercial sem intermediários.
            </p>
          </div>

          <div className="bg-[#071510] text-[#FFFFFF] p-6 rounded-3xl border border-[#1B4931]/50 shadow-md text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#F19F14] text-[#071510] flex items-center justify-center mx-auto shadow-sm">
              <Users className="w-6 h-6 stroke-[1.8]" aria-hidden="true" />
            </div>
            <h4 className="font-serif font-bold text-base text-[#F19F14]">4. NOVOS CLIENTES</h4>
            <p className="text-xs text-[#E7E5DF] leading-relaxed">
              Visitantes bem informados que chegam ao seu estabelecimento prontos para consumir.
            </p>
          </div>

        </div>
      </section>

      {/* PRICING PLANS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-xs font-bold text-[#107492] uppercase tracking-wider">
            Planos Comerciais
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#26332F]">
            Escolha o melhor plano para seu estabelecimento
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          
          {/* PLANO GRATUITO */}
          <div className="bg-white rounded-3xl p-8 border border-[#E7E5DF] shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="text-xs font-bold text-[#26332F]/60 uppercase tracking-wider block">
                Plano Básico
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#26332F]">
                GRATUITO
              </h3>
              <div className="text-3xl font-bold text-[#26332F]">
                R$ 0 <span className="text-xs text-[#26332F]/60 font-normal">/sempre</span>
              </div>
              <ul className="space-y-3 text-xs sm:text-sm text-[#26332F]/80 border-t border-[#E7E5DF] pt-4">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#1B4931] shrink-0" aria-hidden="true" />
                  <span>Perfil básico na plataforma</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#1B4931] shrink-0" aria-hidden="true" />
                  <span>Telefone, WhatsApp e Endereço</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#1B4931] shrink-0" aria-hidden="true" />
                  <span>Presença na categoria</span>
                </li>
              </ul>
            </div>
            <Link
              href="/cadastro-parceiro?plan=free"
              aria-label="Cadastrar empresa no plano grátis"
              className="w-full text-center bg-[#F6F0D4] hover:bg-[#E7E5DF] text-[#1B4931] font-bold text-sm py-3.5 rounded-2xl transition-all"
            >
              Cadastrar Grátis
            </Link>
          </div>

          {/* PLANO DESTAQUE */}
          <div className="bg-[#1B4931] text-[#FFFFFF] rounded-3xl p-8 border-2 border-[#1B4931] shadow-xl flex flex-col justify-between space-y-6 relative transform md:-translate-y-2">
            <div className="absolute -top-3.5 right-6 bg-[#F19F14] text-[#071510] text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
              Recomendado
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#F19F14] uppercase tracking-wider">
                <Sparkles className="w-4 h-4" aria-hidden="true" />
                <span>Plano Destaque</span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#FFFFFF]">
                DESTAQUE
              </h3>
              <div className="text-3xl font-bold text-[#F19F14]">
                R$ 39,90 <span className="text-xs text-[#E7E5DF] font-normal">/mês</span>
              </div>
              <ul className="space-y-3 text-xs sm:text-sm text-[#E7E5DF] border-t border-[#1B4931] pt-4">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#F19F14] shrink-0" aria-hidden="true" />
                  <span>Perfil completo com galeria de fotos</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#F19F14] shrink-0" aria-hidden="true" />
                  <span>Botão direto do WhatsApp e Instagram</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#F19F14] shrink-0" aria-hidden="true" />
                  <span>Destaque nas categorias de buscas</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#F19F14] shrink-0" aria-hidden="true" />
                  <span>Selo de Parceiro em Destaque</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#F19F14] shrink-0" aria-hidden="true" />
                  <span>Divulgação de experiências e roteiros</span>
                </li>
              </ul>
            </div>
            <Link
              href="/cadastro-parceiro?plan=highlight"
              aria-label="Quero assinar o plano destaque"
              className="w-full text-center bg-[#F19F14] hover:bg-[#D86E04] text-[#071510] hover:text-[#FFFFFF] font-bold text-sm py-3.5 rounded-2xl shadow-md transition-all cursor-pointer"
            >
              Quero Plano Destaque
            </Link>
          </div>

          {/* PLANO PREMIUM */}
          <div className="bg-[#071510] text-[#FFFFFF] rounded-3xl p-8 border border-[#1B4931]/50 shadow-md flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#F19F14] uppercase tracking-wider">
                <Crown className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Plano VIP</span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#FFFFFF]">
                PREMIUM
              </h3>
              <div className="text-3xl font-bold text-[#F19F14]">
                R$ 79,90 <span className="text-xs text-[#E7E5DF] font-normal">/mês</span>
              </div>
              <ul className="space-y-3 text-xs sm:text-sm text-[#E7E5DF] border-t border-[#1B4931]/40 pt-4">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#F19F14] shrink-0" aria-hidden="true" />
                  <span>Tudo do Plano Destaque</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#F19F14] shrink-0" aria-hidden="true" />
                  <span>Prioridade máxima nos resultados da Home</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#F19F14] shrink-0" aria-hidden="true" />
                  <span>Participação prioritária em Roteiros</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#F19F14] shrink-0" aria-hidden="true" />
                  <span>Relatórios e estatísticas de cliques</span>
                </li>
              </ul>
            </div>
            <Link
              href="/cadastro-parceiro?plan=premium"
              aria-label="Quero assinar o plano premium VIP"
              className="w-full text-center bg-[#F19F14] hover:bg-[#D86E04] text-[#071510] hover:text-[#FFFFFF] font-bold text-sm py-3.5 rounded-2xl shadow-md transition-all cursor-pointer"
            >
              Quero Plano Premium
            </Link>
          </div>

        </div>
      </section>

    </div>
  );
}
