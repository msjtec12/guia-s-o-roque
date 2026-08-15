import React from 'react';
import Link from 'next/link';
import { Wine, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#183A32] text-[#FCFAF5] pt-16 pb-12 border-t border-[#245247]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#245247]">
          
          {/* BRAND COLUMN */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3" aria-label="Página Inicial - Descubra São Roque">
              <div className="w-10 h-10 rounded-xl bg-[#D49A3A] flex items-center justify-center text-[#26332F] font-bold shadow-md">
                <Wine className="w-5 h-5" aria-hidden="true" />
              </div>
              <span className="font-serif text-2xl font-bold text-[#FCFAF5]">
                Descubra <span className="text-[#D49A3A] font-normal">São Roque</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-[#F4EBDD]/80 max-w-sm">
              Plataforma e guia digital oficial para turistas descobrirem vinícolas, restaurantes, hospedagens, passeios e o Roteiro do Vinho em São Roque - SP.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#245247] text-[#FCFAF5] text-xs border border-[#82967A]/40">
                <MapPin className="w-3.5 h-3.5 text-[#D49A3A]" aria-hidden="true" />
                Estância Turística de São Roque - SP
              </span>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div className="space-y-3">
            <h4 className="text-[#FCFAF5] font-semibold text-sm uppercase tracking-wider">Navegação</h4>
            <ul className="space-y-2 text-sm text-[#F4EBDD]">
              <li>
                <Link href="/explorar" className="hover:text-[#D49A3A] transition-colors">Explorar Guia</Link>
              </li>
              <li>
                <Link href="/experiencias" className="hover:text-[#D49A3A] transition-colors">Experiências</Link>
              </li>
              <li>
                <Link href="/roteiros" className="hover:text-[#D49A3A] transition-colors">Roteiros Prontos</Link>
              </li>
              <li>
                <Link href="/eventos" className="hover:text-[#D49A3A] transition-colors">Calendário de Eventos</Link>
              </li>
            </ul>
          </div>

          {/* CATEGORIES */}
          <div className="space-y-3">
            <h4 className="text-[#FCFAF5] font-semibold text-sm uppercase tracking-wider">Categorias</h4>
            <ul className="space-y-2 text-sm text-[#F4EBDD]">
              <li>
                <Link href="/explorar?category=vinicolas-adegas" className="hover:text-[#D49A3A] transition-colors">Vinícolas & Adegas</Link>
              </li>
              <li>
                <Link href="/explorar?category=restaurantes" className="hover:text-[#D49A3A] transition-colors">Restaurantes</Link>
              </li>
              <li>
                <Link href="/explorar?category=hospedagem" className="hover:text-[#D49A3A] transition-colors">Hotéis & Pousadas</Link>
              </li>
              <li>
                <Link href="/explorar?category=passeios-agencias" className="hover:text-[#D49A3A] transition-colors">Passeios Turísticos</Link>
              </li>
            </ul>
          </div>

          {/* FOR BUSINESSES */}
          <div className="space-y-3">
            <h4 className="text-[#FCFAF5] font-semibold text-sm uppercase tracking-wider">Para Empresas</h4>
            <p className="text-xs text-[#82967A]">
              Divulgue seu estabelecimento para milhares de turistas que visitam São Roque mensalmente.
            </p>
            <Link
              href="/para-empresas"
              className="inline-block w-full text-center bg-[#722F3E] hover:bg-[#5e2633] text-[#FCFAF5] font-semibold text-xs py-2.5 px-4 rounded-xl transition-all shadow-md border border-[#89283f]/40"
            >
              Anuncie Seu Negócio
            </Link>
          </div>

        </div>

        {/* BOTTOM DISCLAIMER & COPYRIGHT */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#82967A]">
          <p>© {new Date().getFullYear()} Descubra São Roque. Todos os direitos reservados. Projeto Multi-cidades MVP.</p>
          <div className="flex items-center gap-4">
            <Link href="/para-empresas" className="hover:text-[#D49A3A]">Seja Nosso Parceiro</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
