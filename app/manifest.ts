import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Descubra São Roque - Guia Turístico',
    short_name: 'Descubra São Roque',
    description: 'Descubra lugares, experiências, vinícolas, hospedagens e sabores de São Roque - SP.',
    start_url: '/',
    display: 'standalone',
    background_color: '#FCFAF5',
    theme_color: '#183A32',
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
