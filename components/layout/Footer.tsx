import React from 'react';
import Link from 'next/link';
import { Compass, MapPin, Wine, Trees } from 'lucide-react';
import { CITIES } from '@/lib/mock-data/cities';

export function Footer() {
  return (
    <footer className="bg-[#183A32] text-[#FCFAF5] pt-16 pb-12 border-t border-[#245247]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#245247]">
          
          {/* BRAND COLUMN */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3" aria-label="Página Inicial - Descubra">
              <div className="w-10 h-10 rounded-xl bg-[#D49A3A] flex items-center justify-center text-[#26332F] font-bold shadow-md">
                <Compass className="w-5 h-5" aria-hidden="true" />
              </div>
              <span className="font-serif text-2xl font-bold text-[#FCFAF5]">
                Descubra<span className="text-[#D49A3A]">.</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-[#F4EBDD]/80 max-w-sm">
              Rede de guias turísticos digitais especializados em destinos do Brasil. Descubra lugares, experiências e sabores.
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#245247] text-[#FCFAF5] text-xs border border-[#82967A]/40">
                <MapPin className="w-3.5 h-3.5 text-[#D49A3A]" aria-hidden="true" />
                São Roque • Atibaia • São Paulo
              </span>
            </div>
          </div>

          {/* DESTINATIONS COLUMN */}
          <div className="space-y-3">
            <h4 className="text-[#FCFAF5] font-semibold text-sm uppercase tracking-wider">Destinos</h4>
            <ul className="space-y-2 text-sm text-[#F4EBDD]">
              {CITIES.map((city) => {
                const isSR = city.slug === 'sao-roque';
                const Icon = isSR ? Wine : Trees;
                return (
                  <li key={city.id}>
                    <Link
                      href={`/${city.slug}`}
                      className="hover:text-[#D49A3A] transition-colors inline-flex items-center gap-1.5"
                    >
                      <Icon className="w-3.5 h-3.5 text-[#D49A3A]" />
                      <span>{city.name} - {city.state}</span>
                    </Link>
                  </li>
                );
              })}
              <li className="pt-1">
                <Link href="/#destinos" className="text-xs text-[#82967A] hover:text-[#D49A3A] transition-colors">
                  + Novos destinos em breve
                </Link>
              </li>
            </ul>
          </div>

          {/* EXPLORAR E EXPERIÊNCIAS */}
          <div className="space-y-3">
            <h4 className="text-[#FCFAF5] font-semibold text-sm uppercase tracking-wider">Navegação</h4>
            <ul className="space-y-2 text-sm text-[#F4EBDD]">
              <li>
                <Link href="/sao-roque/explorar" className="hover:text-[#D49A3A] transition-colors">Explorar São Roque</Link>
              </li>
              <li>
                <Link href="/atibaia/explorar" className="hover:text-[#D49A3A] transition-colors">Explorar Atibaia</Link>
              </li>
              <li>
                <Link href="/sao-roque/roteiros" className="hover:text-[#D49A3A] transition-colors">Roteiros em São Roque</Link>
              </li>
              <li>
                <Link href="/atibaia/roteiros" className="hover:text-[#D49A3A] transition-colors">Roteiros em Atibaia</Link>
              </li>
              <li>
                <Link href="/sao-roque/eventos" className="hover:text-[#D49A3A] transition-colors">Eventos & Festas</Link>
              </li>
            </ul>
          </div>

          {/* FOR BUSINESSES */}
          <div className="space-y-3">
            <h4 className="text-[#FCFAF5] font-semibold text-sm uppercase tracking-wider">Para Empresas</h4>
            <p className="text-xs text-[#82967A]">
              Conecte sua empresa a visitantes que estão planejando sua próxima viagem para São Roque e Atibaia.
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
          <p>© {new Date().getFullYear()} DESCUBRA. Plataforma de Turismo Digital Multicidade. Todos os direitos reservados.</p>
          <div className="flex items-center gap-4">
            <Link href="/para-empresas" className="hover:text-[#D49A3A]">Seja um Anunciante</Link>
            <span>•</span>
            <Link href="/admin/login" className="hover:text-[#D49A3A]">Acesso Restrito</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
