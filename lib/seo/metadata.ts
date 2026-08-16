import { Metadata } from 'next';

export const platformConfig = {
  name: 'Descubra Cidades',
  slogan: 'Descubra lugares. Viva experiências.',
  description: 'Plataforma oficial de turismo, destinos, lugares, gastronomia, hospedagem, passeios e experiências no Brasil.',
  url: 'https://descubra.tur.br',
  ogImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
};

export const destinationConfigs: Record<string, { name: string; title: string; description: string; image: string }> = {
  'sao-roque': {
    name: 'Descubra São Roque',
    title: 'Descubra São Roque | Lugares, experiências, gastronomia e turismo',
    description: 'Descubra lugares, experiências, restaurantes, vinícolas, hospedagens, passeios e roteiros em São Roque.',
    image: '/images/hero-sao-roque.webp',
  },
  'atibaia': {
    name: 'Descubra Atibaia',
    title: 'Descubra Atibaia | Turismo, natureza, aventura e experiências',
    description: 'Descubra o que fazer em Atibaia: natureza, aventura, gastronomia, hospedagem, passeios, eventos e experiências.',
    image: '/images/atibaia/hero.webp',
  },
  'socorro': {
    name: 'Descubra Socorro',
    title: 'Descubra Socorro | Aventura, rafting, ecoturismo e experiências',
    description: 'Descubra o que fazer em Socorro: rafting no Rio do Peixe, mirantes, gastronomia caipira, compras de malhas, hospedagem e ecoturismo.',
    image: '/images/socorro/hero.webp',
  },
};

export function constructMetadata({
  title = platformConfig.name,
  description = platformConfig.description,
  image = platformConfig.ogImage,
  noIndex = false,
  citySlug,
}: {
  title?: string;
  description?: string;
  image?: string;
  noIndex?: boolean;
  citySlug?: string;
} = {}): Metadata {
  const cityConfig = citySlug ? destinationConfigs[citySlug] : undefined;
  
  const siteName = cityConfig ? cityConfig.name : platformConfig.name;
  let finalTitle = title;
  
  if (title === platformConfig.name && cityConfig) {
    finalTitle = cityConfig.title;
  } else if (title !== platformConfig.name && !title.includes('Descubra')) {
    finalTitle = `${title} | ${siteName}`;
  }

  const finalDescription = (description === platformConfig.description && cityConfig) 
    ? cityConfig.description 
    : description;

  const finalImage = (image === platformConfig.ogImage && cityConfig)
    ? cityConfig.image
    : image;

  return {
    title: finalTitle,
    description: finalDescription,
    icons: {
      icon: [
        { url: '/favicon.ico?v=3', sizes: 'any' },
        { url: '/icon.png?v=3', sizes: '192x192', type: 'image/png' },
      ],
      apple: [
        { url: '/apple-icon.png?v=3', sizes: '180x180', type: 'image/png' },
      ],
      shortcut: '/favicon.ico?v=3',
    },
    openGraph: {
      title: finalTitle,
      description: finalDescription,
      images: [{ url: finalImage }],
      type: 'website',
      siteName,
      locale: 'pt_BR',
    },
    twitter: {
      card: 'summary_large_image',
      title: finalTitle,
      description: finalDescription,
      images: [finalImage],
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
    },
  };
}
