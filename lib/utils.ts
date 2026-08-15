import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatPriceRange(min: number, max: number): string {
  if (!min && !max) return 'Consulte';
  if (min === max) return formatCurrency(min);
  return `${formatCurrency(min)} - ${formatCurrency(max)}`;
}

export function getPriceSymbol(min: number): string {
  if (!min || min < 40) return '$';
  if (min < 100) return '$$';
  if (min < 250) return '$$$';
  return '$$$$';
}

/**
 * Builds a direct WhatsApp contact link with exact pre-filled message
 */
export function buildWhatsAppUrl(phoneOrWhatsapp: string, businessName: string, customText?: string): string {
  const cleanPhone = phoneOrWhatsapp.replace(/\D/g, '');
  const formattedPhone = cleanPhone.startsWith('55') ? cleanPhone : `55${cleanPhone}`;
  
  const message = customText || `Olá! Encontrei a ${businessName} através do Descubra São Roque e gostaria de saber mais sobre os serviços e experiências.`;
  return `https://wa.me/${formattedPhone}?text=${encodeURIComponent(message)}`;
}

/**
 * Builds Google Maps directions URL based on coordinates or address fallback
 */
export function buildGoogleMapsUrl(address: string, lat?: number, lng?: number): string {
  if (lat && lng && lat !== 0 && lng !== 0) {
    return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
  }
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address + ', São Roque - SP')}`;
}

export function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(date);
  } catch {
    return dateString;
  }
}
