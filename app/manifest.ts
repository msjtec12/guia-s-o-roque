import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Descubra Cidades - Guia Turístico & Experiências',
    short_name: 'Descubra Cidades',
    description: 'Descubra lugares, experiências, restaurantes, hospedagens e passeios nas melhores cidades turísticas do Brasil.',
    start_url: '/',
    display: 'standalone',
    background_color: '#F6F0D4',
    theme_color: '#071510',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
