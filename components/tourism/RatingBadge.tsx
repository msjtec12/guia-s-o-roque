import React from 'react';
import { Star } from 'lucide-react';

interface RatingBadgeProps {
  rating?: number;
  reviewCount?: number;
  showText?: boolean;
  className?: string;
}

export function RatingBadge({ rating = 4.8, reviewCount, showText = true, className = '' }: RatingBadgeProps) {
  return (
    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200/60 text-amber-900 text-xs font-semibold ${className}`}>
      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500 shrink-0" />
      <span>{rating.toFixed(1)}</span>
      {reviewCount && showText && (
        <span className="text-stone-500 font-normal">({reviewCount})</span>
      )}
    </div>
  );
}
