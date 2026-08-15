import { Metadata } from 'next';

export const siteConfig = {
  name: 'Descubra São Roque',
  slogan: 'Descubra lugares, experiências e sabores de São Roque.',
  description: 'Guia turístico digital de São Roque - SP. Vinícolas, restaurantes, hotéis, pousadas, passeios, Roteiro do Vinho e atrações.',
  url: 'https://descubrasaoroque.com.br',
  ogImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
};

export function constructMetadata({
  title = siteConfig.name,
  description = siteConfig.description,
  image = siteConfig.ogImage,
  noIndex = false,
}: {
  title?: string;
  description?: string;
  image?: string;
  noIndex?: boolean;
} = {}): Metadata {
  return {
    title: title === siteConfig.name ? title : `${title} | ${siteConfig.name}`,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: image }],
      type: 'website',
      siteName: siteConfig.name,
      locale: 'pt_BR',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
    },
  };
}
