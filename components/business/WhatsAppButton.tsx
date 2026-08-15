'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';
import { buildWhatsAppUrl } from '@/lib/utils';
import { logBusinessEvent } from '@/lib/services/analytics';

interface WhatsAppButtonProps {
  phoneOrWhatsapp: string;
  businessName: string;
  businessId?: string;
  variant?: 'primary' | 'secondary' | 'compact';
  fullWidth?: boolean;
  className?: string;
}

export function WhatsAppButton({
  phoneOrWhatsapp,
  businessName,
  businessId,
  variant = 'primary',
  fullWidth = false,
  className = '',
}: WhatsAppButtonProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (businessId) {
      logBusinessEvent(businessId, 'whatsapp_click');
    }
  };

  const url = buildWhatsAppUrl(phoneOrWhatsapp, businessName);

  if (variant === 'compact') {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className={`inline-flex items-center justify-center p-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-md hover:shadow-lg transition-all duration-200 ${className}`}
        title={`Falar com ${businessName} pelo WhatsApp`}
        aria-label="Falar pelo WhatsApp"
      >
        <MessageCircle className="w-5 h-5 fill-current" />
      </a>
    );
  }

  const baseStyles = 'inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2';
  
  const variantStyles =
    variant === 'secondary'
      ? 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 px-4 py-2.5 text-sm'
      : 'bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-3 text-sm font-semibold shadow-emerald-700/20 shadow-lg hover:shadow-xl hover:shadow-emerald-700/30';

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={`${baseStyles} ${variantStyles} ${fullWidth ? 'w-full' : ''} ${className}`}
    >
      <MessageCircle className="w-4 h-4 shrink-0 fill-current" />
      <span>Falar no WhatsApp</span>
    </a>
  );
}
