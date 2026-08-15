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
  Check
} from 'lucide-react';
import { constructMetadata } from '@/lib/seo/metadata';

export const metadata = constructMetadata({
  title: 'Empresas em São Roque | Turismo, Gastronomia e Serviços',
  description: 'Faça sua empresa ser encontrada por quem está descobrindo São Roque. Anuncie seu restaurante, vinícola ou pousada e receba contatos no WhatsApp.',
});

export default function ParaEmpresasPage() {
  return (
    <div className="pb-20 space-y-16 bg-[#FCFAF5]">
      
      {/* HERO BANNER */}
      <section className="bg-[#183A32] text-[#FCFAF5] py-20 border-b border-[#245247]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#245247] text-[#D49A3A] text-xs font-semibold border border-[#82967A]/40">
            <Building2 className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Portal Comercial para Anunciantes</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold leading-tight max-w-4xl mx-auto">
            Faça sua empresa ser encontrada por quem está descobrindo São Roque.
          </h1>

          <p className="text-base sm:text-lg text-[#F4EBDD]/90 max-w-3xl mx-auto leading-relaxed">
            Seu cliente já está procurando o que fazer em São Roque. O Descubra São Roque conecta visitantes a empresas, experiências e serviços locais.
          </p>

          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <Link
              href="/cadastro-parceiro"
              aria-label="Quero ser parceiro fundador"
              className="inline-flex items-center gap-2 bg-[#D49A3A] hover:bg-[#c28c32] text-[#26332F] font-bold text-base px-8 py-4 rounded-2xl shadow-xl transition-all transform active:scale-95"
            >
              <span>Quero Ser Parceiro Fundador</span>
              <ArrowRight className="w-5 h-5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* SEÇÃO: SEJA UM PARCEIRO FUNDADOR (COM ÍCONE LUCIDE WINE / SPARKLES) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#722F3E] text-[#FCFAF5] rounded-3xl p-8 sm:p-12 border-2 border-[#D49A3A]/60 shadow-2xl space-y-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
            <Wine className="w-64 h-64 text-[#D49A3A]" aria-hidden="true" />
          </div>

          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D49A3A] text-[#26332F] text-xs font-extrabold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 fill-[#26332F]" aria-hidden="true" />
              <span>Lançamento Exclusivo</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#FCFAF5] flex items-center gap-2.5">
              <Wine className="w-8 h-8 text-[#D49A3A]" aria-hidden="true" />
              <span>Seja um Parceiro Fundador</span>
            </h2>
            <p className="text-sm sm:text-base text-[#F4EBDD] leading-relaxed">
              Estamos selecionando os primeiros parceiros do Descubra São Roque com benefícios e condições especiais de lançamento comercial.
            </p>
          </div>

          {/* BENEFÍCIOS DO PARCEIRO FUNDADOR */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-semibold">
            {[
              'Perfil completo no guia',
              'Galeria de fotos em alta resolução',
              'Link direto para o seu WhatsApp',
              'Redirecionamento para Instagram',
              'Destaque na sua categoria',
              'Participação prioritária em Roteiros',
              'Condições especiais de lançamento',
              'Suporte no cadastro do perfil',
            ].map((item, idx) => (
              <div key={idx} className="bg-[#8d3d4e]/70 p-3.5 rounded-xl border border-[#FCFAF5]/20 flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#D49A3A] shrink-0" aria-hidden="true" />
                <span className="text-[#FCFAF5]">{item}</span>
              </div>
            ))}
          </div>

          <div className="pt-4 flex justify-start">
            <Link
              href="/cadastro-parceiro"
              aria-label="Quero ser parceiro fundador"
              className="inline-flex items-center gap-2 bg-[#D49A3A] hover:bg-[#c28c32] text-[#26332F] font-bold text-sm px-8 py-3.5 rounded-xl shadow-lg transition-all"
            >
              <span>Quero ser Parceiro Fundador</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* FLUXO VISUAL COMERCIAL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-xs font-bold text-[#183A32] uppercase tracking-wider">
            Por Que Anunciar?
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#26332F]">
            Como o Descubra São Roque gera valor para o seu negócio
          </h2>
        </div>

        {/* FUNIL VISUAL */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          
          <div className="bg-white p-6 rounded-2xl border border-[#e6dfd4] shadow-sm text-center space-y-3">
            <div className="w-12 h-12 rounded-[14px] bg-[#F4EBDD] text-[#183A32] flex items-center justify-center mx-auto border border-[#e6dfd4]">
              <Eye className="w-6 h-6 stroke-[1.8]" aria-hidden="true" />
            </div>
            <h4 className="font-serif font-bold text-base text-[#26332F]">1. VISIBILIDADE</h4>
            <p className="text-xs text-[#52615B] leading-relaxed">
              Sua empresa presente no guia digital onde os turistas planejam a viagem.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#e6dfd4] shadow-sm text-center space-y-3">
            <div className="w-12 h-12 rounded-[14px] bg-[#F4EBDD] text-[#B86F52] flex items-center justify-center mx-auto border border-[#e6dfd4]">
              <Compass className="w-6 h-6 stroke-[1.8]" aria-hidden="true" />
            </div>
            <h4 className="font-serif font-bold text-base text-[#26332F]">2. DESCOBERTA</h4>
            <p className="text-xs text-[#52615B] leading-relaxed">
              Destaque para suas especialidades, pratos, vinhos e passeios exclusivos.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#e6dfd4] shadow-sm text-center space-y-3">
            <div className="w-12 h-12 rounded-[14px] bg-[#F4EBDD] text-[#722F3E] flex items-center justify-center mx-auto border border-[#e6dfd4]">
              <MessageCircle className="w-6 h-6 stroke-[1.8]" aria-hidden="true" />
            </div>
            <h4 className="font-serif font-bold text-base text-[#26332F]">3. CONTATO</h4>
            <p className="text-xs text-[#52615B] leading-relaxed">
              O turista clica e fala direto com seu WhatsApp comercial sem intermediários.
            </p>
          </div>

          <div className="bg-[#183A32] text-[#FCFAF5] p-6 rounded-2xl border border-[#245247] shadow-md text-center space-y-3">
            <div className="w-12 h-12 rounded-[14px] bg-[#D49A3A] text-[#26332F] flex items-center justify-center mx-auto border border-[#D49A3A]/40">
              <Users className="w-6 h-6 stroke-[1.8]" aria-hidden="true" />
            </div>
            <h4 className="font-serif font-bold text-base text-[#D49A3A]">4. NOVOS CLIENTES</h4>
            <p className="text-xs text-[#F4EBDD] leading-relaxed">
              Visitantes bem informados que chegam ao seu estabelecimento prontos para consumir.
            </p>
          </div>

        </div>
      </section>

      {/* PRICING PLANS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-xs font-bold text-[#183A32] uppercase tracking-wider">
            Planos Comerciais
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#26332F]">
            Escolha o melhor plano para seu estabelecimento
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          
          {/* PLANO GRATUITO */}
          <div className="bg-white rounded-3xl p-8 border border-[#e6dfd4] shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="text-xs font-bold text-[#82967A] uppercase tracking-wider block">
                Plano Básico
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#26332F]">
                GRATUITO
              </h3>
              <div className="text-3xl font-bold text-[#26332F]">
                R$ 0 <span className="text-xs text-[#82967A] font-normal">/sempre</span>
              </div>
              <ul className="space-y-3 text-xs sm:text-sm text-[#52615B] border-t border-[#F4EBDD] pt-4">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#183A32] shrink-0" aria-hidden="true" />
                  <span>Perfil básico na plataforma</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#183A32] shrink-0" aria-hidden="true" />
                  <span>Telefone, WhatsApp e Endereço</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#183A32] shrink-0" aria-hidden="true" />
                  <span>Presença na categoria</span>
                </li>
              </ul>
            </div>
            <Link
              href="/cadastro-parceiro?plan=free"
              aria-label="Cadastrar empresa no plano grátis"
              className="w-full text-center bg-[#F4EBDD] hover:bg-[#e8dbca] text-[#26332F] font-bold text-sm py-3.5 rounded-xl transition-all"
            >
              Cadastrar Grátis
            </Link>
          </div>

          {/* PLANO DESTAQUE */}
          <div className="bg-[#183A32] text-[#FCFAF5] rounded-3xl p-8 border-2 border-[#245247] shadow-xl flex flex-col justify-between space-y-6 relative transform md:-translate-y-2">
            <div className="absolute -top-3.5 right-6 bg-[#D49A3A] text-[#26332F] text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
              Recomendado
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#D49A3A] uppercase tracking-wider">
                <Sparkles className="w-4 h-4" aria-hidden="true" />
                <span>Plano Destaque</span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#FCFAF5]">
                DESTAQUE
              </h3>
              <div className="text-3xl font-bold text-[#D49A3A]">
                R$ 39,90 <span className="text-xs text-[#F4EBDD] font-normal">/mês</span>
              </div>
              <ul className="space-y-3 text-xs sm:text-sm text-[#F4EBDD] border-t border-[#245247] pt-4">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#D49A3A] shrink-0" aria-hidden="true" />
                  <span>Perfil completo com galeria de fotos</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#D49A3A] shrink-0" aria-hidden="true" />
                  <span>Botão direto do WhatsApp e Instagram</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#D49A3A] shrink-0" aria-hidden="true" />
                  <span>Destaque nas categorias de buscas</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#D49A3A] shrink-0" aria-hidden="true" />
                  <span>Selo de Parceiro em Destaque</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#D49A3A] shrink-0" aria-hidden="true" />
                  <span>Divulgação de experiências e roteiros</span>
                </li>
              </ul>
            </div>
            <Link
              href="/cadastro-parceiro?plan=highlight"
              aria-label="Quero assinar o plano destaque"
              className="w-full text-center bg-[#D49A3A] hover:bg-[#c28c32] text-[#26332F] font-bold text-sm py-3.5 rounded-xl shadow-md transition-all"
            >
              Quero Plano Destaque
            </Link>
          </div>

          {/* PLANO PREMIUM */}
          <div className="bg-[#722F3E] text-[#FCFAF5] rounded-3xl p-8 border border-[#8d3d4e] shadow-md flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#D49A3A] uppercase tracking-wider">
                <Crown className="w-4 h-4" aria-hidden="true" />
                <span>Plano VIP</span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#FCFAF5]">
                PREMIUM
              </h3>
              <div className="text-3xl font-bold text-[#D49A3A]">
                R$ 79,90 <span className="text-xs text-[#F4EBDD] font-normal">/mês</span>
              </div>
              <ul className="space-y-3 text-xs sm:text-sm text-[#F4EBDD] border-t border-[#8d3d4e] pt-4">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#D49A3A] shrink-0" aria-hidden="true" />
                  <span>Tudo do Plano Destaque</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#D49A3A] shrink-0" aria-hidden="true" />
                  <span>Prioridade máxima nos resultados da Home</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#D49A3A] shrink-0" aria-hidden="true" />
                  <span>Participação prioritária em Roteiros</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#D49A3A] shrink-0" aria-hidden="true" />
                  <span>Relatórios e estatísticas de cliques</span>
                </li>
              </ul>
            </div>
            <Link
              href="/cadastro-parceiro?plan=premium"
              aria-label="Quero assinar o plano premium VIP"
              className="w-full text-center bg-[#D49A3A] hover:bg-[#c28c32] text-[#26332F] font-bold text-sm py-3.5 rounded-xl transition-all"
            >
              Quero Plano Premium
            </Link>
          </div>

        </div>
      </section>

    </div>
  );
}
