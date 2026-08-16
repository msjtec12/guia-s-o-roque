'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Building2, 
  Tags, 
  Sparkles, 
  MapPin, 
  Calendar, 
  Users, 
  TrendingUp,
  Compass,
  LogOut,
  ExternalLink,
  Globe2
} from 'lucide-react';
import { createClient as createBrowserSupabase } from '@/lib/supabase/client';
import { AdminCityProvider, useAdminCity } from '@/components/admin/AdminCityContext';
import { CITIES } from '@/lib/mock-data/cities';

function AdminSidebarContent({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { selectedCityId, setSelectedCityId } = useAdminCity();

  useEffect(() => {
    if (pathname === '/admin/login') return;

    // Client-side authentication check
    const hasAuthCookie = document.cookie.includes('admin_session=authenticated');
    if (!hasAuthCookie) {
      router.push('/admin/login');
    }
  }, [pathname, router]);

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    document.cookie = 'admin_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax';

    const supabase = createBrowserSupabase();
    if (supabase) {
      await supabase.auth.signOut();
    }

    router.push('/admin/login');
    router.refresh();
  };

  const menuItems = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Cidades & Destinos', href: '/admin/cidades', icon: Globe2 },
    { name: 'Analytics', href: '/admin/analytics', icon: TrendingUp },
    { name: 'Empresas', href: '/admin/empresas', icon: Building2 },
    { name: 'Categorias', href: '/admin/categorias', icon: Tags },
    { name: 'Experiências', href: '/admin/experiencias', icon: Sparkles },
    { name: 'Roteiros', href: '/admin/roteiros', icon: MapPin },
    { name: 'Eventos', href: '/admin/eventos', icon: Calendar },
    { name: 'Leads de Parceiros', href: '/admin/leads', icon: Users },
  ];

  return (
    <div className="min-h-screen bg-[#FCFAF5] flex flex-col md:flex-row font-sans text-[#26332F]">
      
      {/* ADMIN SIDEBAR */}
      <aside className="w-full md:w-64 bg-[#183A32] text-[#FCFAF5] p-6 flex flex-col justify-between border-r border-[#245247] shrink-0 space-y-6">
        <div className="space-y-6">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#D49A3A] text-[#26332F] flex items-center justify-center font-bold shadow-md">
              <Compass className="w-5 h-5" aria-hidden="true" />
            </div>
            <div>
              <span className="font-serif text-lg font-bold text-[#FCFAF5]">
                Admin <span className="text-[#D49A3A]">Descubra</span>
              </span>
              <span className="block text-[10px] text-[#82967A] uppercase tracking-widest font-semibold">
                Painel Multicidade
              </span>
            </div>
          </Link>

          {/* DROPDOWN DESTINO ATUAL NO ADMIN */}
          <div className="bg-[#245247]/70 p-3 rounded-2xl border border-[#82967A]/30 space-y-1.5">
            <label className="text-[10px] uppercase tracking-wider text-[#D49A3A] font-bold block">
              Destino Atual Selecionado:
            </label>
            <select
              value={selectedCityId}
              onChange={(e) => setSelectedCityId(e.target.value)}
              className="w-full bg-[#183A32] text-xs font-semibold text-[#FCFAF5] p-2 rounded-xl border border-[#82967A]/50 focus:outline-none focus:ring-1 focus:ring-[#D49A3A] cursor-pointer"
            >
              <option value="all">🌐 Todas as Cidades</option>
              {CITIES.map((c) => (
                <option key={c.id} value={c.id}>
                  📍 {c.name} - {c.state}
                </option>
              ))}
            </select>
          </div>

          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                    isActive
                      ? 'bg-[#245247] text-[#D49A3A] shadow-sm'
                      : 'text-[#F4EBDD] hover:text-[#D49A3A] hover:bg-[#245247]/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#D49A3A]' : 'text-[#82967A]'} shrink-0`} aria-hidden="true" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="pt-6 border-t border-[#245247] space-y-3">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between text-xs text-[#82967A] hover:text-[#D49A3A]"
          >
            <span>Ver site público</span>
            <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
          </Link>
          <button
            onClick={handleLogout}
            aria-label="Sair do painel administrativo"
            className="w-full flex items-center gap-2 text-xs text-rose-300 hover:text-rose-100 transition-colors pt-1 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Sair do Painel</span>
          </button>
        </div>
      </aside>

      {/* MAIN ADMIN CONTENT AREA */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto bg-[#FCFAF5]">
        {children}
      </main>

    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminCityProvider>
      <AdminSidebarContent>{children}</AdminSidebarContent>
    </AdminCityProvider>
  );
}
