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
    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md border border-[#E7E5DF] text-[#26332F] text-xs font-bold shadow-xs ${className}`}>
      <Star className="w-3.5 h-3.5 fill-[#F19F14] text-[#F19F14] shrink-0" />
      <span>{rating.toFixed(1)}</span>
      {reviewCount && showText && (
        <span className="text-[#26332F]/60 font-normal text-[11px]">({reviewCount})</span>
      )}
    </div>
  );
}
