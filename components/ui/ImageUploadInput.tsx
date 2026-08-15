'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { UploadCloud, Link as LinkIcon, X } from 'lucide-react';

interface ImageUploadInputProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

export function ImageUploadInput({
  value,
  onChange,
  label = 'Imagem de Capa / Foto',
}: ImageUploadInputProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          onChange(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-2 sm:col-span-2">
      <label className="font-bold text-[#26332F] block text-xs">{label}</label>

      {/* PREVIEW CONTAINER */}
      {value ? (
        <div className="relative w-full h-40 rounded-2xl overflow-hidden bg-[#FCFAF5] border border-[#e6dfd4] shadow-xs group">
          <Image
            src={value}
            alt="Preview da imagem"
            fill
            className="object-cover"
            unoptimized={value.startsWith('data:')}
          />
          <div className="absolute inset-0 bg-[#26332F]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="bg-[#183A32] text-[#FCFAF5] font-semibold text-xs px-3 py-1.5 rounded-xl shadow-md flex items-center gap-1.5 hover:bg-[#245247]"
            >
              <UploadCloud className="w-4 h-4 text-[#D49A3A]" aria-hidden="true" />
              <span>Trocar Arquivo</span>
            </button>
            <button
              type="button"
              onClick={() => onChange('')}
              className="bg-[#722F3E] text-[#FCFAF5] font-semibold text-xs px-3 py-1.5 rounded-xl shadow-md flex items-center gap-1.5 hover:bg-rose-900"
            >
              <X className="w-4 h-4" aria-hidden="true" />
              <span>Remover</span>
            </button>
          </div>
        </div>
      ) : null}

      {/* DUAL INPUT OPTIONS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* FILE UPLOAD SELECTION */}
        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            id={`file-upload-${label.replace(/\s+/g, '-').toLowerCase()}`}
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="w-full flex items-center justify-center gap-2 p-2.5 rounded-xl border border-dashed border-[#183A32]/40 bg-[#183A32]/5 hover:bg-[#183A32]/10 text-[#183A32] font-semibold text-xs transition-colors"
          >
            <UploadCloud className="w-4 h-4 text-[#D49A3A]" aria-hidden="true" />
            <span>Enviar Arquivo do Computador</span>
          </button>
        </div>

        {/* LINK URL INPUT */}
        <div className="relative">
          <LinkIcon className="w-3.5 h-3.5 text-[#82967A] absolute left-3 top-3" aria-hidden="true" />
          <input
            type="text"
            value={value && !value.startsWith('data:') ? value : ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Ou cole a URL da imagem (https://...)"
            className="w-full pl-8 pr-3 py-2 border border-[#e6dfd4] rounded-xl text-xs text-[#26332F] bg-white focus:outline-none focus:ring-2 focus:ring-[#183A32]"
          />
        </div>
      </div>
    </div>
  );
}
