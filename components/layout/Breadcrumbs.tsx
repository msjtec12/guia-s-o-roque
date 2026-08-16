import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className = '' }: BreadcrumbsProps) {
  // Schema.org BreadcrumbList structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Descubra',
        item: 'https://descubra.tur.br',
      },
      ...items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 2,
        name: item.label,
        ...(item.href ? { item: `https://descubra.tur.br${item.href}` } : {}),
      })),
    ],
  };

  return (
    <nav aria-label="Navegação estrutural" className={`flex flex-wrap items-center gap-1.5 text-xs text-[#52615B] ${className}`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Link
        href="/"
        className="inline-flex items-center gap-1 hover:text-[#183A32] transition-colors font-medium"
      >
        <Home className="w-3.5 h-3.5 text-[#82967A]" aria-hidden="true" />
        <span>Descubra</span>
      </Link>

      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <React.Fragment key={index}>
            <ChevronRight className="w-3.5 h-3.5 text-[#82967A]/60 shrink-0" aria-hidden="true" />
            {item.href && !isLast ? (
              <Link
                href={item.href}
                className="hover:text-[#183A32] transition-colors font-medium truncate max-w-[160px] sm:max-w-none"
              >
                {item.label}
              </Link>
            ) : (
              <span className="font-semibold text-[#26332F] truncate max-w-[200px] sm:max-w-none">
                {item.label}
              </span>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
