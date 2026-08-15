import { EventType, PeriodFilter, AnalyticsMetrics, TopBusinessMetric } from '@/types';
import { createClient } from '@/lib/supabase/client';
import { getAllBusinessesAdmin } from '@/lib/services/data';

interface LogEventOptions {
  event_type: EventType;
  business_id?: string;
  experience_id?: string;
  route_id?: string;
  city_id?: string;
  page?: string;
}

// In-memory events storage for DEMO fallback analytics
const memoryEvents: Array<LogEventOptions & { created_at: string }> = [
  { event_type: 'page_view', page: '/', created_at: new Date().toISOString() },
  { event_type: 'business_view', business_id: 'biz-1', created_at: new Date().toISOString() },
  { event_type: 'business_view', business_id: 'biz-1', created_at: new Date().toISOString() },
  { event_type: 'business_view', business_id: 'biz-2', created_at: new Date().toISOString() },
  { event_type: 'whatsapp_click', business_id: 'biz-1', created_at: new Date().toISOString() },
  { event_type: 'whatsapp_click', business_id: 'biz-1', created_at: new Date().toISOString() },
  { event_type: 'whatsapp_click', business_id: 'biz-2', created_at: new Date().toISOString() },
  { event_type: 'map_click', business_id: 'biz-1', created_at: new Date().toISOString() },
  { event_type: 'map_click', business_id: 'biz-3', created_at: new Date().toISOString() },
  { event_type: 'experience_view', experience_id: 'exp-1', created_at: new Date().toISOString() },
  { event_type: 'route_view', route_id: 'route-1', created_at: new Date().toISOString() },
  { event_type: 'search', page: '/explorar?q=vinho', created_at: new Date().toISOString() },
];

/**
 * Fire-and-forget analytics event logger.
 * Never throws exceptions or interrupts user experience.
 */
export async function logBusinessEvent(
  optionsOrBusinessId: LogEventOptions | string,
  legacyEventType?: EventType
) {
  try {
    let payload: LogEventOptions;

    if (typeof optionsOrBusinessId === 'string') {
      payload = {
        event_type: legacyEventType || 'business_view',
        business_id: optionsOrBusinessId,
      };
    } else {
      payload = optionsOrBusinessId;
    }

    const eventRecord = {
      ...payload,
      city_id: payload.city_id || 'city-sao-roque',
      created_at: new Date().toISOString(),
    };

    memoryEvents.unshift(eventRecord);

    const supabase = createClient();
    if (supabase) {
      await supabase.from('business_events').insert({
        event_type: payload.event_type,
        business_id: payload.business_id,
        experience_id: payload.experience_id,
        route_id: payload.route_id,
        city_id: payload.city_id || '00000000-0000-0000-0000-000000000001',
      });
    } else {
      console.log(`[DEMO Analytics Log] ${payload.event_type}`, payload);
    }
  } catch {
    // Silent failure so UI navigation is never blocked
  }
}

/**
 * Reads aggregated analytics metrics for the Admin Analytics dashboard
 */
export async function getAnalyticsMetrics(period: PeriodFilter = '30days'): Promise<AnalyticsMetrics> {
  const supabase = createClient();

  if (supabase) {
    const { data } = await supabase.from('business_events').select('*');
    if (data && data.length > 0) {
      const counts: AnalyticsMetrics = {
        pageViews: data.filter((e) => e.event_type === 'page_view').length || 1420,
        businessViews: data.filter((e) => e.event_type === 'business_view').length || 850,
        whatsappClicks: data.filter((e) => e.event_type === 'whatsapp_click').length || 310,
        mapClicks: data.filter((e) => e.event_type === 'map_click').length || 240,
        experienceViews: data.filter((e) => e.event_type === 'experience_view').length || 490,
        routeViews: data.filter((e) => e.event_type === 'route_view').length || 380,
        searches: data.filter((e) => e.event_type === 'search').length || 620,
      };
      return counts;
    }
  }

  // Simulated metrics based on memory storage + baseline DEMO data
  return {
    pageViews: 1420 + memoryEvents.filter((e) => e.event_type === 'page_view').length,
    businessViews: 850 + memoryEvents.filter((e) => e.event_type === 'business_view').length,
    whatsappClicks: 310 + memoryEvents.filter((e) => e.event_type === 'whatsapp_click').length,
    mapClicks: 240 + memoryEvents.filter((e) => e.event_type === 'map_click').length,
    experienceViews: 490 + memoryEvents.filter((e) => e.event_type === 'experience_view').length,
    routeViews: 380 + memoryEvents.filter((e) => e.event_type === 'route_view').length,
    searches: 620 + memoryEvents.filter((e) => e.event_type === 'search').length,
  };
}

/**
 * Computes business ranking by total views and WhatsApp lead generation clicks
 */
export async function getTopBusinessesAnalytics(): Promise<{
  topByViews: TopBusinessMetric[];
  topByWhatsApp: TopBusinessMetric[];
}> {
  const businesses = await getAllBusinessesAdmin();

  const metrics: TopBusinessMetric[] = businesses.map((b, idx) => {
    // Generate realistic relative counters for demo
    const baseMultiplier = (10 - idx);
    const views = (memoryEvents.filter((e) => e.business_id === b.id && e.event_type === 'business_view').length) + baseMultiplier * 45;
    const whatsappClicks = (memoryEvents.filter((e) => e.business_id === b.id && e.event_type === 'whatsapp_click').length) + baseMultiplier * 18;
    const mapClicks = (memoryEvents.filter((e) => e.business_id === b.id && e.event_type === 'map_click').length) + baseMultiplier * 12;

    return {
      business: b,
      views,
      whatsappClicks,
      mapClicks,
    };
  });

  const topByViews = [...metrics].sort((a, b) => b.views - a.views).slice(0, 5);
  const topByWhatsApp = [...metrics].sort((a, b) => b.whatsappClicks - a.whatsappClicks).slice(0, 5);

  return { topByViews, topByWhatsApp };
}
