import React from 'react';
import Link from 'next/link';
import { MapPin, Wine, Trees, Compass } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';
import { CITIES } from '@/lib/mock-data/cities';

export function Footer() {
  return (
    <footer className="bg-[#071510] text-[#FFFFFF] pt-16 pb-12 border-t border-[#1B4931]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#1B4931]/40">
          
          {/* BRAND COLUMN */}
          <div className="lg:col-span-2 space-y-4">
            <Logo variant="light" />
            <p className="text-sm leading-relaxed text-[#E7E5DF]/80 max-w-sm">
              &ldquo;Descubra lugares. Viva experiências.&rdquo; Plataforma nacional de guias turísticos, vivências locais, gastronomia e roteiros.
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1B4931]/70 text-[#FFFFFF] text-xs border border-[#1B4931]">
                <MapPin className="w-3.5 h-3.5 text-[#F19F14]" aria-hidden="true" />
                São Roque • Atibaia • Socorro • SP
              </span>
            </div>
          </div>

          {/* DESTINATIONS COLUMN */}
          <div className="space-y-3">
            <h4 className="text-[#FFFFFF] font-semibold text-sm uppercase tracking-wider text-[#F19F14]">Destinos</h4>
            <ul className="space-y-2 text-sm text-[#E7E5DF]">
              {CITIES.map((city) => {
                const isSR = city.slug === 'sao-roque';
                const isSoc = city.slug === 'socorro';
                const Icon = isSR ? Wine : isSoc ? Compass : Trees;
                return (
                  <li key={city.id}>
                    <Link
                      href={`/${city.slug}`}
                      className="hover:text-[#F19F14] transition-colors inline-flex items-center gap-1.5"
                    >
                      <Icon className="w-3.5 h-3.5 text-[#F19F14]" />
                      <span>{city.name} - {city.state}</span>
                    </Link>
                  </li>
                );
              })}
              <li className="pt-1">
                <Link href="/#destinos" className="text-xs text-[#E7E5DF]/60 hover:text-[#F19F14] transition-colors">
                  + Novos destinos em breve
                </Link>
              </li>
            </ul>
          </div>

          {/* EXPLORAR E EXPERIÊNCIAS */}
          <div className="space-y-3">
            <h4 className="text-[#FFFFFF] font-semibold text-sm uppercase tracking-wider text-[#F19F14]">Navegação</h4>
            <ul className="space-y-2 text-sm text-[#E7E5DF]">
              <li>
                <Link href="/sao-roque/explorar" className="hover:text-[#F19F14] transition-colors">Explorar São Roque</Link>
              </li>
              <li>
                <Link href="/atibaia/explorar" className="hover:text-[#F19F14] transition-colors">Explorar Atibaia</Link>
              </li>
              <li>
                <Link href="/socorro/explorar" className="hover:text-[#F19F14] transition-colors">Explorar Socorro</Link>
              </li>
              <li>
                <Link href="/experiencias" className="hover:text-[#F19F14] transition-colors">Todas as Experiências</Link>
              </li>
              <li>
                <Link href="/eventos" className="hover:text-[#F19F14] transition-colors">Eventos & Festas</Link>
              </li>
            </ul>
          </div>

          {/* FOR BUSINESSES */}
          <div className="space-y-3">
            <h4 className="text-[#FFFFFF] font-semibold text-sm uppercase tracking-wider text-[#F19F14]">Para Empresas</h4>
            <p className="text-xs text-[#E7E5DF]/70">
              Conecte sua empresa a milhares de turistas que planejam sua viagem pelas melhores cidades turísticas do Brasil.
            </p>
            <Link
              href="/para-empresas"
              className="inline-block w-full text-center bg-[#F19F14] hover:bg-[#D86E04] text-[#071510] font-bold text-xs py-2.5 px-4 rounded-xl transition-all shadow-md hover:text-[#FFFFFF]"
            >
              Anuncie Seu Negócio
            </Link>
          </div>

        </div>

        {/* BOTTOM DISCLAIMER & COPYRIGHT */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#E7E5DF]/70">
          <p>© {new Date().getFullYear()} DESCUBRA CIDADES. Plataforma de Turismo Digital. Todos os direitos reservados.</p>
          <div className="flex items-center gap-4">
            <Link href="/para-empresas" className="hover:text-[#F19F14]">Seja um Parceiro</Link>
            <span>•</span>
            <Link href="/cadastro-parceiro" className="hover:text-[#F19F14]">Cadastrar Empresa</Link>
            <span>•</span>
            <Link href="/admin/login" className="hover:text-[#F19F14]">Acesso Administrativo</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
