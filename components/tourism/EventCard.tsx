import React from 'react';
import Image from 'next/image';
import { Calendar, Clock, MapPin, ExternalLink } from 'lucide-react';
import { EventItem } from '@/types';
import { formatDate } from '@/lib/utils';

interface EventCardProps {
  event: EventItem;
}

export function EventCard({ event }: EventCardProps) {
  const displayTitle = event.title || event.name;
  const displayDate = event.event_date || event.start_date || new Date().toISOString();
  const displayTime = event.event_time || 'Consulte a programação';

  return (
    <div className="group bg-white rounded-3xl border border-[#E7E5DF] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full card-hover">
      <div className="relative h-48 w-full bg-[#F6F0D4] overflow-hidden">
        <Image
          src={event.image_url || 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80'}
          alt={displayTitle}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#071510]/80 via-transparent to-transparent" />

        {/* DATE BADGE */}
        <div className="absolute top-3 left-3 bg-[#F19F14] text-[#071510] text-xs font-extrabold px-3 py-1 rounded-full shadow-md flex items-center gap-1.5 border border-[#F19F14]/40">
          <Calendar className="w-3.5 h-3.5 fill-[#071510]" aria-hidden="true" />
          <span>{formatDate(displayDate)}</span>
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          {event.business && (
            <span className="text-[11px] font-bold text-[#107492] uppercase tracking-wider block">
              {event.business.name}
            </span>
          )}
          <h3 className="font-serif text-base font-bold text-[#26332F] group-hover:text-[#107492] transition-colors line-clamp-2">
            {displayTitle}
          </h3>
          <p className="text-xs text-[#26332F]/80 line-clamp-2 leading-relaxed">
            {event.description}
          </p>
        </div>

        <div className="space-y-1.5 text-xs text-[#26332F]/70 pt-2 border-t border-[#E7E5DF]">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#107492] shrink-0" aria-hidden="true" />
            <span>{displayTime}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#107492] shrink-0" aria-hidden="true" />
            <span className="line-clamp-1">{event.location}</span>
          </div>
        </div>

        {event.external_url && (
          <div className="pt-2">
            <a
              href={event.external_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full text-xs font-semibold text-[#1B4931] hover:text-[#071510] bg-[#F6F0D4] hover:bg-[#E7E5DF] border border-[#E7E5DF] py-2.5 rounded-xl transition-all"
            >
              <span>Saiba mais no site</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#F19F14]" aria-hidden="true" />
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
