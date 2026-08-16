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
import { Logo } from '@/components/ui/Logo';

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
    <div className="min-h-screen bg-[#F6F0D4] flex flex-col md:flex-row font-sans text-[#26332F]">
      
      {/* ADMIN SIDEBAR */}
      <aside className="w-full md:w-64 bg-[#071510] text-[#FFFFFF] p-6 flex flex-col justify-between border-r border-[#1B4931]/60 shrink-0 space-y-6">
        <div className="space-y-6">
          <div className="pt-1">
            <Logo href="/admin" variant="light" size="sm" />
            <span className="block text-[10px] text-[#E7E5DF] uppercase tracking-widest font-semibold mt-1">
              Painel Administrativo
            </span>
          </div>

          {/* DROPDOWN DESTINO ATUAL NO ADMIN */}
          <div className="bg-[#1B4931]/60 p-3 rounded-2xl border border-[#1B4931] space-y-1.5">
            <label className="text-[10px] uppercase tracking-wider text-[#F19F14] font-bold block">
              Destino Atual Selecionado:
            </label>
            <select
              value={selectedCityId}
              onChange={(e) => setSelectedCityId(e.target.value)}
              className="w-full bg-[#071510] text-xs font-semibold text-[#FFFFFF] p-2 rounded-xl border border-[#1B4931] focus:outline-none focus:ring-1 focus:ring-[#F19F14] cursor-pointer"
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
                      ? 'bg-[#1B4931] text-[#F19F14] shadow-sm'
                      : 'text-[#E7E5DF] hover:text-[#F19F14] hover:bg-[#1B4931]/50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#F19F14]' : 'text-[#E7E5DF]/70'} shrink-0`} aria-hidden="true" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="pt-6 border-t border-[#1B4931] space-y-3">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between text-xs text-[#E7E5DF] hover:text-[#F19F14]"
          >
            <span>Ver site público</span>
            <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
          </Link>
          <button
            onClick={handleLogout}
            aria-label="Sair do painel administrativo"
            className="w-full flex items-center gap-2 text-xs text-red-300 hover:text-red-100 transition-colors pt-1 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Sair do Painel</span>
          </button>
        </div>
      </aside>

      {/* MAIN ADMIN CONTENT AREA */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto bg-[#F6F0D4]">
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
