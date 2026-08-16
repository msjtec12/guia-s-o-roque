import { City } from '@/types';

export const CITIES: City[] = [
  {
    id: 'city-sao-roque',
    name: 'São Roque',
    slug: 'sao-roque',
    state: 'SP',
    country: 'Brasil',
    badge: 'Estância Turística de São Roque - SP',
    subtitle: 'Vinhos, gastronomia e experiências',
    description: 'Vinhos, gastronomia, natureza e experiências a poucos quilômetros da capital.',
    tags: ['Vinhos', 'Gastronomia', 'Natureza', 'Experiências'],
    image_url: '/images/hero-sao-roque.webp',
    hero_image: '/images/hero-sao-roque.webp',
    is_active: true,
  },
  {
    id: 'city-atibaia',
    name: 'Atibaia',
    slug: 'atibaia',
    state: 'SP',
    country: 'Brasil',
    badge: 'Estância Turística de Atibaia - SP',
    subtitle: 'Natureza, aventura e gastronomia',
    description: 'Natureza, aventura, gastronomia e experiências para aproveitar em qualquer época.',
    tags: ['Natureza', 'Aventura', 'Gastronomia', 'Família'],
    image_url: '/images/atibaia/hero.webp',
    hero_image: '/images/atibaia/hero.webp',
    is_active: true,
  },
  {
    id: 'city-socorro',
    name: 'Socorro',
    slug: 'socorro',
    state: 'SP',
    country: 'Brasil',
    badge: 'Estância Hidromineral de Socorro - SP',
    subtitle: 'Capital da Aventura e Ecoturismo',
    description: 'Rafting no Rio do Peixe, mirantes panorâmicos, gastronomia caipira e polo de compras de malhas.',
    tags: ['Aventura', 'Rafting', 'Natureza', 'Malhas'],
    image_url: '/images/socorro/hero.webp',
    hero_image: '/images/socorro/hero.webp',
    is_active: true,
  },
];

export const DEFAULT_CITY = CITIES[0]; // São Roque
