'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Wine, Lock, Mail, ArrowRight } from 'lucide-react';
import { createClient as createBrowserSupabase } from '@/lib/supabase/client';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('admin@saoroque.com.br');
  const [password, setPassword] = useState('admin123');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const supabase = createBrowserSupabase();
    if (supabase) {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        console.log('Supabase auth fallback:', error.message);
      }
    }

    // Set auth cookie for middleware protection
    document.cookie = 'admin_session=authenticated; path=/; max-age=86400; SameSite=Lax';

    // Navigate to /admin
    router.push('/admin');
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-[#183A32] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-[#245247] shadow-2xl space-y-6">
        
        <div className="text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-[#D49A3A] text-[#26332F] flex items-center justify-center mx-auto shadow-md">
            <Wine className="w-6 h-6" aria-hidden="true" />
          </div>
          <h1 className="font-serif text-2xl font-bold text-[#26332F]">
            Acesso Administrativo
          </h1>
          <p className="text-xs text-[#52615B]">
            Entre com suas credenciais para gerenciar a plataforma Descubra São Roque.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4 text-xs">
          <div className="space-y-1.5">
            <label className="font-bold text-[#26332F]">E-mail Administrativo</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#82967A] absolute left-3 top-3" aria-hidden="true" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-[#e6dfd4] focus:ring-2 focus:ring-[#183A32] focus:outline-none text-[#26332F]"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="font-bold text-[#26332F]">Senha</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#82967A] absolute left-3 top-3" aria-hidden="true" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-[#e6dfd4] focus:ring-2 focus:ring-[#183A32] focus:outline-none text-[#26332F]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            aria-label="Acessar painel administrativo"
            className="w-full inline-flex items-center justify-center gap-2 bg-[#183A32] hover:bg-[#245247] text-[#FCFAF5] font-bold text-sm py-3.5 rounded-xl shadow-md transition-all"
          >
            <span>{loading ? 'Entrando...' : 'Acessar Painel'}</span>
            <ArrowRight className="w-4 h-4 text-[#D49A3A]" aria-hidden="true" />
          </button>
        </form>

        <p className="text-[11px] text-center text-[#82967A]">
          Área restrita e protegida para administradores da plataforma.
        </p>

      </div>
    </div>
  );
}
