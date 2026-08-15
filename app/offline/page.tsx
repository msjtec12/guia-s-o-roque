import React from 'react';
import Link from 'next/link';
import { WifiOff, Compass } from 'lucide-react';

export default function OfflinePage() {
  return (
    <div className="min-h-screen bg-[#FCFAF5] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-[#e6dfd4] shadow-xl text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-[#F4EBDD] text-[#722F3E] flex items-center justify-center mx-auto">
          <WifiOff className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h1 className="font-serif text-2xl font-bold text-[#26332F]">
            Você está offline
          </h1>
          <p className="text-sm text-[#52615B] leading-relaxed">
            Algumas informações da plataforma Descubra São Roque podem não estar disponíveis sem conexão à internet.
          </p>
        </div>
        <div className="pt-2 flex flex-col gap-3">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-[#183A32] hover:bg-[#245247] text-[#FCFAF5] font-semibold py-3 px-6 rounded-xl shadow-md transition-all text-sm"
          >
            <Compass className="w-4 h-4 text-[#D49A3A]" />
            <span>Tentar Novamente</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
