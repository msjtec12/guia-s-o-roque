import { 
  Business, 
  Category, 
  City, 
  Experience, 
  Route, 
  EventItem, 
  PartnerLead, 
  FilterOptions,
  LeadStatus,
  CustomRouteQuery,
  GeneratedItinerary,
  ItineraryStop
} from '@/types';
import { 
  DEMO_CITY, 
  DEMO_CATEGORIES, 
  DEMO_BUSINESSES, 
  DEMO_EXPERIENCES, 
  DEMO_ROUTES, 
  DEMO_EVENTS 
} from '@/lib/mock-data/sao-roque';
import { createClient as createBrowserSupabase } from '@/lib/supabase/client';

// In-memory leads storage for demo mode
let memoryLeads: PartnerLead[] = [
  {
    id: 'lead-1',
    company_name: 'Adega Bella Vista (DEMO)',
    responsible_name: 'Carlos Alberto',
    whatsapp: '11988887777',
    email: 'carlos@adegabellavista.com.br',
    category: 'Vinícolas & Adegas',
    city_id: 'city-sao-roque',
    desired_plan: 'highlight',
    message: 'Gostaria de colocar nossa adega em destaque no Roteiro do Vinho.',
    status: 'pending',
    created_at: new Date().toISOString(),
  },
];

// In-memory mutable copies for DEMO CRUD state
let localBusinesses = [...DEMO_BUSINESSES];
let localExperiences = [...DEMO_EXPERIENCES];
let localRoutes = [...DEMO_ROUTES];
let localEvents = [...DEMO_EVENTS];

export async function getCityBySlug(slug: string = 'sao-roque'): Promise<City> {
  const supabase = createBrowserSupabase();
  if (supabase) {
    const { data } = await supabase.from('cities').select('*').eq('slug', slug).single();
    if (data) return data as City;
  }
  return DEMO_CITY;
}

export async function getCategories(): Promise<Category[]> {
  const supabase = createBrowserSupabase();
  if (supabase) {
    const { data } = await supabase.from('categories').select('*').eq('is_active', true);
    if (data && data.length > 0) return data as Category[];
  }
  return DEMO_CATEGORIES;
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const categories = await getCategories();
  return categories.find((c) => c.slug === slug) || null;
}

export async function getBusinesses(filters: FilterOptions = {}): Promise<Business[]> {
  const supabase = createBrowserSupabase();
  
  if (supabase) {
    let query = supabase.from('businesses').select('*, category:categories(*)').eq('status', 'published');

    if (filters.categorySlug) {
      const cat = await getCategoryBySlug(filters.categorySlug);
      if (cat) query = query.eq('category_id', cat.id);
    }

    if (filters.isFeaturedOnly) {
      query = query.eq('is_featured', true);
    }

    const { data } = await query;
    if (data && data.length > 0) {
      let results = data as Business[];
      if (filters.searchQuery) {
        const q = filters.searchQuery.toLowerCase();
        results = results.filter(
          (b) =>
            b.name.toLowerCase().includes(q) ||
            b.description.toLowerCase().includes(q) ||
            b.address.toLowerCase().includes(q) ||
            b.tags?.some((t) => t.toLowerCase().includes(q))
        );
      }

      if (filters.tag) {
        const tagLower = filters.tag.toLowerCase();
        results = results.filter(
          (b) =>
            b.tags?.some((t) => t.toLowerCase().includes(tagLower)) ||
            b.description.toLowerCase().includes(tagLower)
        );
      }

      return results;
    }
  }

  // Fallback to local DEMO data
  let results = [...localBusinesses].filter((b) => b.status === 'published');

  if (filters.categorySlug) {
    const cat = DEMO_CATEGORIES.find((c) => c.slug === filters.categorySlug);
    if (cat) {
      results = results.filter((b) => b.category_id === cat.id);
    }
  }

  if (filters.isFeaturedOnly) {
    results = results.filter((b) => b.is_featured);
  }

  if (filters.searchQuery) {
    const q = filters.searchQuery.toLowerCase();
    results = results.filter(
      (b) =>
        b.name.toLowerCase().includes(q) ||
        b.description.toLowerCase().includes(q) ||
        b.address.toLowerCase().includes(q) ||
        b.category_id.toLowerCase().includes(q) ||
        b.tags?.some((t) => t.toLowerCase().includes(q)) ||
        (q === 'vinho' && b.category_id === 'cat-vinicolas') ||
        (q === 'restaurante' && b.category_id === 'cat-restaurantes') ||
        (q === 'passeio' && (b.category_id === 'cat-passeios' || b.category_id === 'cat-natureza'))
    );
  }

  if (filters.tag) {
    const tagLower = filters.tag.toLowerCase();
    results = results.filter(
      (b) =>
        b.tags?.some((t) => t.toLowerCase().includes(tagLower)) ||
        b.description.toLowerCase().includes(tagLower) ||
        (tagLower === 'romantico' && (b.tags?.includes('Casal') || b.tags?.includes('Romântico'))) ||
        (tagLower === 'familia' && (b.tags?.includes('Família') || b.amenities?.includes('Espaço Kids'))) ||
        (tagLower === 'natureza' && (b.tags?.includes('Natureza') || b.tags?.includes('Trilha'))) ||
        (tagLower === 'vinho' && (b.tags?.includes('Vinhos') || b.category_id === 'cat-vinicolas')) ||
        (tagLower === 'aventura' && (b.tags?.includes('Aventura') || b.tags?.includes('Trilha')))
    );
  }

  if (filters.priceLevel) {
    if (filters.priceLevel === '1') results = results.filter((b) => b.price_min <= 50);
    else if (filters.priceLevel === '2') results = results.filter((b) => b.price_min > 50 && b.price_min <= 150);
    else if (filters.priceLevel === '3') results = results.filter((b) => b.price_min > 150);
  }

  // Attach full category objects
  results = results.map((b) => ({
    ...b,
    category: DEMO_CATEGORIES.find((c) => c.id === b.category_id),
  }));

  return results;
}

export async function getBusinessBySlug(slug: string): Promise<Business | null> {
  const supabase = createBrowserSupabase();
  if (supabase) {
    const { data } = await supabase
      .from('businesses')
      .select('*, category:categories(*), gallery:business_images(*)')
      .eq('slug', slug)
      .single();
    if (data) return data as Business;
  }

  const found = localBusinesses.find((b) => b.slug === slug);
  if (!found) return null;

  const category = DEMO_CATEGORIES.find((c) => c.id === found.category_id);
  const experiences = localExperiences.filter((e) => e.business_id === found.id);

  return {
    ...found,
    category,
    experiences,
  };
}

export async function getExperiences(isFeaturedOnly = false): Promise<Experience[]> {
  const supabase = createBrowserSupabase();
  if (supabase) {
    let query = supabase.from('experiences').select('*, business:businesses(*)').eq('status', 'published');
    if (isFeaturedOnly) query = query.eq('is_featured', true);
    const { data } = await query;
    if (data && data.length > 0) return data as Experience[];
  }

  let list = localExperiences.filter((e) => e.status === 'published');
  if (isFeaturedOnly) list = list.filter((e) => e.is_featured);

  return list.map((exp) => ({
    ...exp,
    business: localBusinesses.find((b) => b.id === exp.business_id),
    category: DEMO_CATEGORIES.find((c) => c.id === exp.category_id),
  }));
}

export async function getExperienceBySlug(slug: string): Promise<Experience | null> {
  const experiences = await getExperiences();
  return experiences.find((e) => e.slug === slug) || null;
}

export async function getRoutes(): Promise<Route[]> {
  const supabase = createBrowserSupabase();
  if (supabase) {
    const { data } = await supabase.from('routes').select('*, items:route_items(*)').eq('status', 'published');
    if (data && data.length > 0) return data as Route[];
  }

  return localRoutes.filter((r) => r.status === 'published');
}

export async function getRouteBySlug(slug: string): Promise<Route | null> {
  const routes = await getRoutes();
  const found = routes.find((r) => r.slug === slug);
  if (!found) return null;

  const hydratedItems = (found.items || []).map((item) => ({
    ...item,
    business: localBusinesses.find((b) => b.id === item.business_id),
  }));

  return {
    ...found,
    items: hydratedItems,
  };
}

export async function getEvents(): Promise<EventItem[]> {
  const supabase = createBrowserSupabase();
  if (supabase) {
    const { data } = await supabase.from('events').select('*, business:businesses(*)').eq('status', 'published');
    if (data && data.length > 0) return data as EventItem[];
  }

  return localEvents.filter((e) => e.status === 'published').map((evt) => ({
    ...evt,
    business: localBusinesses.find((b) => b.id === evt.business_id),
  }));
}

/**
 * Generates custom itinerary based on user preferences matching real existing database / mock entities
 */
export async function generateCustomItinerary(query: CustomRouteQuery): Promise<GeneratedItinerary> {
  const businesses = await getBusinesses();
  const experiences = await getExperiences();

  // Traveler Profile Label
  const travelerMap = {
    casal: '❤️ Casal / Romance',
    familia: '👨‍👩‍👧 Família',
    amigos: '👥 Grupo de Amigos',
    sozinho: '🧍 Explorador Solo',
  };

  const durationMap = {
    horas: '☀️ Algumas horas (Meio dia)',
    '1dia': '📅 1 Dia Completo (09h às 18h)',
    fimdesemana: '🏨 Fim de Semana (2 Dias)',
  };

  // Find winery business
  const winery = businesses.find((b) => b.category_id === 'cat-vinicolas') || businesses[0];
  // Find restaurant business
  const restaurant = businesses.find((b) => b.category_id === 'cat-restaurantes') || businesses[1];
  // Find nature or tour business
  const natureOrTour = businesses.find((b) => b.category_id === 'cat-natureza' || b.category_id === 'cat-passeios') || businesses[2];
  // Find shopping or sweets business
  const shopping = businesses.find((b) => b.category_id === 'cat-compras') || businesses[3];

  // Find matching experiences
  const expTasting = experiences.find((e) => e.slug.includes('degustacao') || e.slug.includes('pisa')) || experiences[0];

  const stops: ItineraryStop[] = [
    {
      time: '09:30',
      title: 'Café da Manhã Rural & Recepção',
      description: 'Comece o dia com quitutes artesanais, suco de uva natural e clima de serra.',
      categoryIcon: 'Coffee',
      business: shopping,
    },
    {
      time: '11:00',
      title: 'Passeio nos Vinhedos & Degustação',
      description: 'Visita guiada pelos parreirais e degustação de vinhos finos na adega.',
      categoryIcon: 'Wine',
      business: winery,
      experience: expTasting,
    },
    {
      time: '13:00',
      title: 'Almoço Gastronômico com Vista',
      description: 'Gastronomia típica portuguesa e italiana harmonizada em ambiente acolhedor.',
      categoryIcon: 'Utensils',
      business: restaurant,
    },
    {
      time: '15:30',
      title: 'Contemplação da Natureza ou Passeio',
      description: 'Caminhada relaxante em parque ecológico ou passeio turístico com vista panorâmica.',
      categoryIcon: 'Trees',
      business: natureOrTour,
    },
    {
      time: '18:00',
      title: 'Empório de Produtos Locais',
      description: 'Compras de queijos curados, chocolates artesanais e compotas de alcachofra de lembrança.',
      categoryIcon: 'ShoppingBag',
      business: shopping,
    },
  ];

  return {
    title: `Roteiro Personalizado em São Roque`,
    profileLabel: travelerMap[query.travelers] || 'Turismo Geral',
    durationLabel: durationMap[query.duration] || '1 Dia',
    stops,
  };
}

export async function submitPartnerLead(leadData: Omit<PartnerLead, 'id' | 'created_at' | 'status'>): Promise<{ success: boolean; id: string }> {
  const newId = `lead-${Date.now()}`;
  const fullLead: PartnerLead = {
    ...leadData,
    id: newId,
    status: 'pending',
    created_at: new Date().toISOString(),
  };

  const supabase = createBrowserSupabase();
  if (supabase) {
    const { error } = await supabase.from('partner_leads').insert({
      company_name: leadData.company_name,
      responsible_name: leadData.responsible_name,
      whatsapp: leadData.whatsapp,
      email: leadData.email,
      category: leadData.category,
      city_id: leadData.city_id,
      address: leadData.address,
      instagram: leadData.instagram,
      website: leadData.website,
      description: leadData.description,
      desired_plan: leadData.desired_plan,
      message: leadData.message,
      status: 'pending',
    });
    if (error) {
      console.error('Supabase error saving lead:', error);
    }
  }

  memoryLeads.unshift(fullLead);
  return { success: true, id: newId };
}

export async function getPartnerLeads(): Promise<PartnerLead[]> {
  const supabase = createBrowserSupabase();
  if (supabase) {
    const { data } = await supabase.from('partner_leads').select('*').order('created_at', { ascending: false });
    if (data && data.length > 0) return data as PartnerLead[];
  }
  return memoryLeads;
}

export async function updatePartnerLeadStatusAdmin(id: string, newStatus: LeadStatus): Promise<boolean> {
  const idx = memoryLeads.findIndex((l) => l.id === id);
  if (idx !== -1) {
    memoryLeads[idx].status = newStatus;
  }
  const supabase = createBrowserSupabase();
  if (supabase) {
    await supabase.from('partner_leads').update({ status: newStatus }).eq('id', id);
  }
  return true;
}

export async function deletePartnerLeadAdmin(id: string): Promise<boolean> {
  memoryLeads = memoryLeads.filter((l) => l.id !== id);
  const supabase = createBrowserSupabase();
  if (supabase) {
    await supabase.from('partner_leads').delete().eq('id', id);
  }
  return true;
}

// Category Admin CRUD
export async function saveCategoryAdmin(cat: Partial<Category>): Promise<Category> {
  if (cat.id) {
    const idx = DEMO_CATEGORIES.findIndex((c) => c.id === cat.id);
    if (idx !== -1) {
      DEMO_CATEGORIES[idx] = { ...DEMO_CATEGORIES[idx], ...cat };
      return DEMO_CATEGORIES[idx];
    }
  }
  const newCat: Category = {
    id: `cat-${Date.now()}`,
    city_id: cat.city_id || DEMO_CITY.id,
    name: cat.name || 'Nova Categoria',
    slug: cat.slug || `categoria-${Date.now()}`,
    description: cat.description || '',
    icon: cat.icon || 'Wine',
    image_url: cat.image_url || 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80',
    is_active: cat.is_active !== undefined ? cat.is_active : true,
  };
  DEMO_CATEGORIES.unshift(newCat);
  return newCat;
}

export async function deleteCategoryAdmin(id: string): Promise<boolean> {
  const idx = DEMO_CATEGORIES.findIndex((c) => c.id === id);
  if (idx !== -1) {
    DEMO_CATEGORIES.splice(idx, 1);
  }
  return true;
}

// Experience Admin CRUD
export async function getAllExperiencesAdmin(): Promise<Experience[]> {
  return localExperiences.map((exp) => ({
    ...exp,
    business: localBusinesses.find((b) => b.id === exp.business_id),
    category: DEMO_CATEGORIES.find((c) => c.id === exp.category_id),
  }));
}

export async function saveExperienceAdmin(exp: Partial<Experience>): Promise<Experience> {
  if (exp.id) {
    const idx = localExperiences.findIndex((e) => e.id === exp.id);
    if (idx !== -1) {
      localExperiences[idx] = { ...localExperiences[idx], ...exp, updated_at: new Date().toISOString() };
      return localExperiences[idx];
    }
  }
  const newExp: Experience = {
    id: `exp-${Date.now()}`,
    city_id: exp.city_id || DEMO_CITY.id,
    business_id: exp.business_id || localBusinesses[0]?.id || '',
    category_id: exp.category_id || DEMO_CATEGORIES[0]?.id || '',
    name: exp.name || 'Nova Experiência',
    slug: exp.slug || `experiencia-${Date.now()}`,
    description: exp.description || '',
    duration: exp.duration || '2 horas',
    price: exp.price || 0,
    main_image_url: exp.main_image_url || 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80',
    status: exp.status || 'published',
    is_featured: exp.is_featured || false,
    rating: 5.0,
    review_count: 1,
    included: exp.included || ['Degustação guiada'],
  };
  localExperiences.unshift(newExp);
  return newExp;
}

export async function deleteExperienceAdmin(id: string): Promise<boolean> {
  localExperiences = localExperiences.filter((e) => e.id !== id);
  return true;
}

// Route Admin CRUD
export async function getAllRoutesAdmin(): Promise<Route[]> {
  return localRoutes;
}

export async function saveRouteAdmin(routeData: Partial<Route>): Promise<Route> {
  if (routeData.id) {
    const idx = localRoutes.findIndex((r) => r.id === routeData.id);
    if (idx !== -1) {
      localRoutes[idx] = { ...localRoutes[idx], ...routeData, updated_at: new Date().toISOString() };
      return localRoutes[idx];
    }
  }
  const newRoute: Route = {
    id: `route-${Date.now()}`,
    city_id: routeData.city_id || DEMO_CITY.id,
    name: routeData.name || 'Novo Roteiro',
    slug: routeData.slug || `roteiro-${Date.now()}`,
    description: routeData.description || '',
    duration: routeData.duration || '1 Dia',
    profile: routeData.profile || 'Geral',
    image_url: routeData.image_url || 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80',
    status: routeData.status || 'published',
    is_featured: routeData.is_featured || false,
    items: routeData.items || [],
  };
  localRoutes.unshift(newRoute);
  return newRoute;
}

export async function deleteRouteAdmin(id: string): Promise<boolean> {
  localRoutes = localRoutes.filter((r) => r.id !== id);
  return true;
}

// Event Admin CRUD
export async function getAllEventsAdmin(): Promise<EventItem[]> {
  return localEvents.map((evt) => ({
    ...evt,
    business: localBusinesses.find((b) => b.id === evt.business_id),
  }));
}

export async function saveEventAdmin(evt: Partial<EventItem>): Promise<EventItem> {
  if (evt.id) {
    const idx = localEvents.findIndex((e) => e.id === evt.id);
    if (idx !== -1) {
      localEvents[idx] = { ...localEvents[idx], ...evt };
      return localEvents[idx];
    }
  }
  const eventName = evt.name || evt.title || 'Novo Evento';
  const newEvt: EventItem = {
    id: `evt-${Date.now()}`,
    city_id: evt.city_id || DEMO_CITY.id,
    business_id: evt.business_id || localBusinesses[0]?.id || '',
    name: eventName,
    title: eventName,
    slug: evt.slug || `evento-${Date.now()}`,
    description: evt.description || '',
    event_date: evt.event_date || evt.start_date || new Date().toISOString(),
    event_time: evt.event_time || '09:00 - 18:00',
    start_date: evt.start_date || evt.event_date || new Date().toISOString(),
    end_date: evt.end_date || evt.event_date || new Date().toISOString(),
    location: evt.location || 'São Roque - SP',
    image_url: evt.image_url || 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80',
    status: evt.status || 'published',
    is_featured: evt.is_featured || false,
  };
  localEvents.unshift(newEvt);
  return newEvt;
}

export async function deleteEventAdmin(id: string): Promise<boolean> {
  localEvents = localEvents.filter((e) => e.id !== id);
  return true;
}

// Admin CRUD functions
export async function getAllBusinessesAdmin(): Promise<Business[]> {
  return localBusinesses.map((b) => ({
    ...b,
    category: DEMO_CATEGORIES.find((c) => c.id === b.category_id),
  }));
}

export async function saveBusinessAdmin(biz: Partial<Business>): Promise<Business> {
  if (biz.id) {
    const idx = localBusinesses.findIndex((b) => b.id === biz.id);
    if (idx !== -1) {
      localBusinesses[idx] = { ...localBusinesses[idx], ...biz, updated_at: new Date().toISOString() };
      return localBusinesses[idx];
    }
  }
  
  const newBiz: Business = {
    id: `biz-${Date.now()}`,
    city_id: biz.city_id || DEMO_CITY.id,
    category_id: biz.category_id || DEMO_CATEGORIES[0].id,
    name: biz.name || 'Nova Empresa DEMO',
    slug: biz.slug || `empresa-${Date.now()}`,
    description: biz.description || '',
    address: biz.address || 'São Roque - SP',
    phone: biz.phone || '(11) 9999-9999',
    whatsapp: biz.whatsapp || '5511999999999',
    instagram: biz.instagram || '',
    website: biz.website || '',
    latitude: biz.latitude || -23.5300,
    longitude: biz.longitude || -47.1300,
    price_min: biz.price_min || 50,
    price_max: biz.price_max || 150,
    opening_hours: biz.opening_hours || '09:00 - 18:00',
    main_image_url: biz.main_image_url || 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
    status: biz.status || 'published',
    plan: biz.plan || 'free',
    is_featured: biz.is_featured || false,
    is_premium: biz.is_premium || false,
    rating: 5.0,
    review_count: 1,
    amenities: biz.amenities || ['Wi-Fi', 'Estacionamento'],
    tags: biz.tags || ['Turismo'],
  };

  localBusinesses.unshift(newBiz);
  return newBiz;
}

export async function deleteBusinessAdmin(id: string): Promise<boolean> {
  localBusinesses = localBusinesses.filter((b) => b.id !== id);
  return true;
}
