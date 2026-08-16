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
  DEMO_CITY as SAO_ROQUE_CITY, 
  DEMO_CATEGORIES as SAO_ROQUE_CATEGORIES, 
  DEMO_BUSINESSES as SAO_ROQUE_BUSINESSES, 
  DEMO_EXPERIENCES as SAO_ROQUE_EXPERIENCES, 
  DEMO_ROUTES as SAO_ROQUE_ROUTES, 
  DEMO_EVENTS as SAO_ROQUE_EVENTS 
} from '@/lib/mock-data/sao-roque';
import { 
  ATIBAIA_CATEGORIES, 
  ATIBAIA_BUSINESSES, 
  ATIBAIA_EXPERIENCES, 
  ATIBAIA_ROUTES, 
  ATIBAIA_EVENTS 
} from '@/lib/mock-data/atibaia';
import {
  SOCORRO_CATEGORIES,
  SOCORRO_BUSINESSES,
  SOCORRO_EXPERIENCES,
  SOCORRO_ROUTES,
  SOCORRO_EVENTS
} from '@/lib/mock-data/socorro';
import { CITIES, DEFAULT_CITY } from '@/lib/mock-data/cities';
import { createClient as createBrowserSupabase } from '@/lib/supabase/client';

// In-memory mutable copies for DEMO CRUD state
let localCities: City[] = [...CITIES];
let localCategories: Category[] = [...SAO_ROQUE_CATEGORIES, ...ATIBAIA_CATEGORIES, ...SOCORRO_CATEGORIES];
let localBusinesses: Business[] = [...SAO_ROQUE_BUSINESSES, ...ATIBAIA_BUSINESSES, ...SOCORRO_BUSINESSES];
let localExperiences: Experience[] = [...SAO_ROQUE_EXPERIENCES, ...ATIBAIA_EXPERIENCES, ...SOCORRO_EXPERIENCES];
let localRoutes: Route[] = [...SAO_ROQUE_ROUTES, ...ATIBAIA_ROUTES, ...SOCORRO_ROUTES];
let localEvents: EventItem[] = [...SAO_ROQUE_EVENTS, ...ATIBAIA_EVENTS, ...SOCORRO_EVENTS];

// In-memory leads storage for offline/fallback mode
let memoryLeads: PartnerLead[] = [
  {
    id: 'lead-1',
    company_name: 'Vinícola Bella Aurora',
    responsible_name: 'Carlos Alberto Góes',
    whatsapp: '11988887777',
    email: 'carlos@vinicolabellaaurora.com.br',
    category: 'Vinícolas & Adegas',
    city_id: 'city-sao-roque',
    desired_plan: 'highlight',
    message: 'Gostaria de colocar nossa vinícola e os novos passeios em destaque no Roteiro do Vinho.',
    status: 'pending',
    created_at: new Date().toISOString(),
  },
  {
    id: 'lead-2',
    company_name: 'Voo Livre Mantiqueira',
    responsible_name: 'Mariana Lima',
    whatsapp: '11977776666',
    email: 'mariana@voolivremantiqueira.com.br',
    category: 'Turismo de Aventura',
    city_id: 'city-atibaia',
    desired_plan: 'premium',
    message: 'Queremos anunciar nossos voos duplos de parapente e asa-delta na Pedra Grande.',
    status: 'pending',
    created_at: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: 'lead-3',
    company_name: 'Pousada Encanto da Mantiqueira',
    responsible_name: 'Roberto Mendes',
    whatsapp: '19998885544',
    email: 'contato@encantodamantiqueira.com.br',
    category: 'Pousadas & Chalés',
    city_id: 'city-socorro',
    desired_plan: 'premium',
    message: 'Temos chalés de luxo com vista panorâmica para as montanhas e queremos entrar como destaque em Socorro.',
    status: 'pending',
    created_at: new Date(Date.now() - 7200000).toISOString(),
  }
];

// Helper to normalize city slug or ID
function resolveCityId(citySlugOrId?: string): string | undefined {
  if (!citySlugOrId || citySlugOrId === 'all') return undefined;
  const found = localCities.find((c) => c.slug === citySlugOrId || c.id === citySlugOrId);
  return found?.id;
}

// -------------------------------------------------------------
// CITIES
// -------------------------------------------------------------

export async function getCities(): Promise<City[]> {
  const supabase = createBrowserSupabase();
  if (supabase) {
    const { data } = await supabase.from('cities').select('*').eq('is_active', true);
    if (data && data.length > 0) return data as City[];
  }
  return localCities.filter((c) => c.is_active);
}

export async function getCityBySlug(slug: string = 'sao-roque'): Promise<City> {
  const supabase = createBrowserSupabase();
  if (supabase) {
    const { data } = await supabase.from('cities').select('*').eq('slug', slug).single();
    if (data) return data as City;
  }
  const found = localCities.find((c) => c.slug === slug);
  return found || DEFAULT_CITY;
}

// -------------------------------------------------------------
// CATEGORIES
// -------------------------------------------------------------

export async function getCategories(citySlugOrId?: string): Promise<Category[]> {
  const targetCityId = resolveCityId(citySlugOrId);
  
  const supabase = createBrowserSupabase();
  if (supabase) {
    let query = supabase.from('categories').select('*').eq('is_active', true);
    if (targetCityId) {
      query = query.or(`city_id.eq.${targetCityId},city_id.is.null`);
    }
    const { data } = await query;
    if (data && data.length > 0) return data as Category[];
  }

  if (targetCityId) {
    const cityCategories = localCategories.filter((c) => c.city_id === targetCityId && c.is_active);
    if (cityCategories.length > 0) return cityCategories;
  } else if (citySlugOrId === 'atibaia') {
    return ATIBAIA_CATEGORIES;
  } else if (citySlugOrId === 'sao-roque') {
    return SAO_ROQUE_CATEGORIES;
  }

  return localCategories.filter((c) => c.is_active);
}

export async function getCategoryBySlug(slug: string, citySlugOrId?: string): Promise<Category | null> {
  const categories = await getCategories(citySlugOrId);
  return categories.find((c) => c.slug === slug) || null;
}

// -------------------------------------------------------------
// BUSINESSES
// -------------------------------------------------------------

export async function getBusinesses(filters: FilterOptions = {}): Promise<Business[]> {
  const targetCityId = resolveCityId(filters.citySlug || filters.cityId);
  const supabase = createBrowserSupabase();
  
  if (supabase) {
    let query = supabase.from('businesses').select('*, category:categories(*)').eq('status', 'published');

    if (targetCityId) {
      query = query.eq('city_id', targetCityId);
    }

    if (filters.categorySlug) {
      const cat = await getCategoryBySlug(filters.categorySlug, filters.citySlug);
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

  if (targetCityId) {
    results = results.filter((b) => b.city_id === targetCityId);
  } else if (filters.citySlug === 'atibaia') {
    results = results.filter((b) => b.city_id === 'city-atibaia');
  } else if (filters.citySlug === 'sao-roque') {
    results = results.filter((b) => b.city_id === 'city-sao-roque');
  }

  if (filters.categorySlug) {
    const cat = localCategories.find((c) => c.slug === filters.categorySlug);
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
        (q === 'vinho' && (b.tags?.includes('Vinhos') || b.category_id.includes('vinicolas'))) ||
        (q === 'morango' && (b.tags?.includes('Morango') || b.description.toLowerCase().includes('morango'))) ||
        (q === 'parapente' && (b.tags?.includes('Parapente') || b.tags?.includes('Voo Livre'))) ||
        (q === 'pedra grande' && b.address.toLowerCase().includes('pedra grande')) ||
        (q === 'restaurante' && b.category_id.includes('restaurantes')) ||
        (q === 'passeio' && (b.category_id.includes('passeios') || b.category_id.includes('natureza')))
    );
  }

  if (filters.tag) {
    const tagLower = filters.tag.toLowerCase();
    results = results.filter(
      (b) =>
        b.tags?.some((t) => t.toLowerCase().includes(tagLower)) ||
        b.description.toLowerCase().includes(tagLower) ||
        (tagLower === 'romantico' && (b.tags?.includes('Casal') || b.tags?.includes('Romântico') || b.tags?.includes('Pousada Romântica'))) ||
        (tagLower === 'familia' && (b.tags?.includes('Família') || b.amenities?.includes('Espaço Kids') || b.amenities?.includes('Playground'))) ||
        (tagLower === 'natureza' && (b.tags?.includes('Natureza') || b.tags?.includes('Trilha') || b.tags?.includes('Pedra Grande'))) ||
        (tagLower === 'vinho' && (b.tags?.includes('Vinhos') || b.category_id.includes('vinicolas'))) ||
        (tagLower === 'aventura' && (b.tags?.includes('Aventura') || b.tags?.includes('Voo Livre') || b.tags?.includes('Trilha')))
    );
  }

  if (filters.priceLevel) {
    if (filters.priceLevel === '1') results = results.filter((b) => b.price_min <= 50);
    else if (filters.priceLevel === '2') results = results.filter((b) => b.price_min > 50 && b.price_min <= 150);
    else if (filters.priceLevel === '3') results = results.filter((b) => b.price_min > 150);
  }

  // Attach full category and city objects
  results = results.map((b) => ({
    ...b,
    category: localCategories.find((c) => c.id === b.category_id),
    city: localCities.find((c) => c.id === b.city_id),
  }));

  return results;
}

export async function getBusinessBySlug(slug: string, citySlug?: string): Promise<Business | null> {
  const supabase = createBrowserSupabase();
  if (supabase) {
    const query = supabase
      .from('businesses')
      .select('*, category:categories(*), city:cities(*), gallery:business_images(*)')
      .eq('slug', slug);
      
    const { data } = await query.single();
    if (data) return data as Business;
  }

  const found = localBusinesses.find((b) => b.slug === slug);
  if (!found) return null;

  if (citySlug) {
    const city = localCities.find((c) => c.slug === citySlug);
    if (city && found.city_id !== city.id) {
      // If city constraint provided and doesn't match
      return null;
    }
  }

  const category = localCategories.find((c) => c.id === found.category_id);
  const city = localCities.find((c) => c.id === found.city_id);
  const experiences = localExperiences.filter((e) => e.business_id === found.id);

  return {
    ...found,
    category,
    city,
    experiences,
  };
}

// -------------------------------------------------------------
// EXPERIENCES
// -------------------------------------------------------------

export async function getExperiences(isFeaturedOnly = false, citySlug?: string): Promise<Experience[]> {
  const targetCityId = resolveCityId(citySlug);
  const supabase = createBrowserSupabase();
  
  if (supabase) {
    let query = supabase.from('experiences').select('*, business:businesses(*), category:categories(*)').eq('status', 'published');
    if (targetCityId) query = query.eq('city_id', targetCityId);
    if (isFeaturedOnly) query = query.eq('is_featured', true);
    const { data } = await query;
    if (data && data.length > 0) return data as Experience[];
  }

  let list = localExperiences.filter((e) => e.status === 'published');
  if (targetCityId) {
    list = list.filter((e) => e.city_id === targetCityId);
  } else if (citySlug === 'atibaia') {
    list = list.filter((e) => e.city_id === 'city-atibaia');
  } else if (citySlug === 'sao-roque') {
    list = list.filter((e) => e.city_id === 'city-sao-roque');
  }

  if (isFeaturedOnly) list = list.filter((e) => e.is_featured);

  return list.map((exp) => ({
    ...exp,
    business: localBusinesses.find((b) => b.id === exp.business_id),
    category: localCategories.find((c) => c.id === exp.category_id),
  }));
}

export async function getExperienceBySlug(slug: string, citySlug?: string): Promise<Experience | null> {
  const experiences = await getExperiences(false, citySlug);
  return experiences.find((e) => e.slug === slug) || null;
}

// -------------------------------------------------------------
// ROUTES
// -------------------------------------------------------------

export async function getRoutes(citySlug?: string): Promise<Route[]> {
  const targetCityId = resolveCityId(citySlug);
  const supabase = createBrowserSupabase();
  if (supabase) {
    let query = supabase.from('routes').select('*, items:route_items(*)').eq('status', 'published');
    if (targetCityId) query = query.eq('city_id', targetCityId);
    const { data } = await query;
    if (data && data.length > 0) return data as Route[];
  }

  let list = localRoutes.filter((r) => r.status === 'published');
  if (targetCityId) {
    list = list.filter((r) => r.city_id === targetCityId);
  } else if (citySlug === 'atibaia') {
    list = list.filter((r) => r.city_id === 'city-atibaia');
  } else if (citySlug === 'sao-roque') {
    list = list.filter((r) => r.city_id === 'city-sao-roque');
  }

  return list;
}

export async function getRouteBySlug(slug: string, citySlug?: string): Promise<Route | null> {
  const routes = await getRoutes(citySlug);
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

// -------------------------------------------------------------
// EVENTS
// -------------------------------------------------------------

export async function getEvents(citySlug?: string): Promise<EventItem[]> {
  const targetCityId = resolveCityId(citySlug);
  const supabase = createBrowserSupabase();
  if (supabase) {
    let query = supabase.from('events').select('*, business:businesses(*)').eq('status', 'published');
    if (targetCityId) query = query.eq('city_id', targetCityId);
    const { data } = await query;
    if (data && data.length > 0) return data as EventItem[];
  }

  let list = localEvents.filter((e) => e.status === 'published');
  if (targetCityId) {
    list = list.filter((e) => e.city_id === targetCityId);
  } else if (citySlug === 'atibaia') {
    list = list.filter((e) => e.city_id === 'city-atibaia');
  } else if (citySlug === 'sao-roque') {
    list = list.filter((e) => e.city_id === 'city-sao-roque');
  }

  return list.map((evt) => ({
    ...evt,
    business: localBusinesses.find((b) => b.id === evt.business_id),
  }));
}

// -------------------------------------------------------------
// CUSTOM ITINERARY GENERATOR
// -------------------------------------------------------------

export async function generateCustomItinerary(query: CustomRouteQuery, citySlug: string = 'sao-roque'): Promise<GeneratedItinerary> {
  const businesses = await getBusinesses({ citySlug });
  const experiences = await getExperiences(false, citySlug);

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

  if (citySlug === 'atibaia') {
    // Itinerary generation for Atibaia
    const telefericoOrPark = businesses.find((b) => b.slug.includes('parque-edmundo-zanoni')) || businesses[0];
    const morangoFazenda = businesses.find((b) => b.slug.includes('fazenda-do-morango')) || businesses[1];
    const pedraGrande = businesses.find((b) => b.slug.includes('pedra-grande')) || businesses[2];
    const emporio = businesses.find((b) => b.slug.includes('emporio-dos-morangos')) || businesses[3];
    const cervejaria = businesses.find((b) => b.slug.includes('cervejaria-mantiqueira')) || businesses[0];

    const expMorango = experiences.find((e) => e.slug.includes('colheita-morangos')) || experiences[0];
    const expPedra = experiences.find((e) => e.slug.includes('pedra-grande')) || experiences[1];

    const stops: ItineraryStop[] = [
      {
        time: '09:00',
        title: 'Passeio no Parque Zanoni & Teleférico',
        description: 'Comece a manhã respirando o ar puro da serra, curtindo o lago e a vista aérea no teleférico.',
        categoryIcon: 'Bus',
        business: telefericoOrPark,
      },
      {
        time: '11:30',
        title: 'Colheita de Morangos na Fazenda',
        description: 'Experiência sensorial colhendo morangos frescos diretamente nas estufas com toda a família.',
        categoryIcon: 'Trees',
        business: morangoFazenda,
        experience: expMorango,
      },
      {
        time: '13:00',
        title: 'Almoço Típico no Fogão a Lenha',
        description: 'Gastronomia caipira com pratos artesanais da fazenda e sobremesas frescas com morango.',
        categoryIcon: 'Utensils',
        business: morangoFazenda,
      },
      {
        time: '15:30',
        title: 'Contemplação & Trilha na Pedra Grande',
        description: 'Subida ao monumento rochoso a 1.418m de altitude para assistir aos voos livres e admirar o pôr do sol.',
        categoryIcon: 'Mountain',
        business: pedraGrande,
        experience: expPedra,
      },
      {
        time: '18:30',
        title: 'Empório de Sabores ou Cervejaria Mantiqueira',
        description: 'Finalize o passeio provando cervejas artesanais da serra ou comprando doces caseiros de lembrança.',
        categoryIcon: 'ShoppingBag',
        business: emporio || cervejaria,
      },
    ];

    return {
      title: `Roteiro Personalizado em Atibaia`,
      profileLabel: travelerMap[query.travelers] || 'Turismo Geral',
      durationLabel: durationMap[query.duration] || '1 Dia',
      stops,
    };
  }

  if (citySlug === 'socorro') {
    // Itinerary generation for Socorro
    const raftingAgency = businesses.find((b) => b.slug.includes('rio-abaixo')) || businesses[0];
    const mirantePedra = businesses.find((b) => b.slug.includes('pedra-bela-vista')) || businesses[1];
    const restauranteFogao = businesses.find((b) => b.slug.includes('fogao-de-lenha')) || businesses[2];
    const grutaDoAnjo = businesses.find((b) => b.slug.includes('gruta-do-anjo')) || businesses[3];
    const cervejaria = businesses.find((b) => b.slug.includes('quinta-do-malte')) || businesses[0];

    const expRafting = experiences.find((e) => e.slug.includes('rafting')) || experiences[0];
    const expMirante = experiences.find((e) => e.slug.includes('pedra-bela-vista')) || experiences[1];

    const stops: ItineraryStop[] = [
      {
        time: '09:00',
        title: 'Aventura de Rafting no Rio do Peixe',
        description: 'Comece a manhã com adrenalina descendo as corredeiras cristalinas do Rio do Peixe com instrutores experientes.',
        categoryIcon: 'Compass',
        business: raftingAgency,
        experience: expRafting,
      },
      {
        time: '12:30',
        title: 'Almoço Caipira no Fogão a Lenha',
        description: 'Saboreie a autêntica comida da roça paulista e mineira feita em panelas de barro com sobremesas caseiras.',
        categoryIcon: 'Utensils',
        business: restauranteFogao,
      },
      {
        time: '14:30',
        title: 'Passeio Ecológico na Gruta do Anjo',
        description: 'Explore a caverna inundada de águas límpidas em um passeio relaxante de pedalinho.',
        categoryIcon: 'Mountain',
        business: grutaDoAnjo,
      },
      {
        time: '16:30',
        title: 'Pôr do Sol Mágico na Pedra Bela Vista',
        description: 'Subida ao mirante a 1.250m de altitude com fogueira, música ao vivo e o famoso Pan de Palo na brasa.',
        categoryIcon: 'Mountain',
        business: mirantePedra,
        experience: expMirante,
      },
      {
        time: '19:30',
        title: 'Cervejaria Artesanal Quinta do Malte',
        description: 'Finalize a noite provando chopps especiais e petiscos artesanais em ambiente rústico acolhedor.',
        categoryIcon: 'Beer',
        business: cervejaria,
      },
    ];

    return {
      title: `Roteiro Personalizado em Socorro`,
      profileLabel: travelerMap[query.travelers] || 'Aventura & Ecoturismo',
      durationLabel: durationMap[query.duration] || '1 Dia',
      stops,
    };
  }

  // Itinerary generation for São Roque
  const winery = businesses.find((b) => b.category?.slug === 'vinicolas-adegas') || businesses[0];
  const restaurant = businesses.find((b) => b.category?.slug === 'restaurantes') || businesses[1];
  const natureOrTour = businesses.find((b) => b.category?.slug === 'natureza-trilhas' || b.category?.slug === 'passeios-agencias') || businesses[2];
  const shopping = businesses.find((b) => b.category?.slug === 'compras-doces') || businesses[3];
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

// -------------------------------------------------------------
// PARTNER LEADS
// -------------------------------------------------------------

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

export async function getPartnerLeads(cityId?: string): Promise<PartnerLead[]> {
  const supabase = createBrowserSupabase();
  if (supabase) {
    let query = supabase.from('partner_leads').select('*').order('created_at', { ascending: false });
    if (cityId && cityId !== 'all') {
      const resolvedId = resolveCityId(cityId);
      if (resolvedId) query = query.eq('city_id', resolvedId);
    }
    const { data } = await query;
    if (data && data.length > 0) return data as PartnerLead[];
  }

  if (cityId && cityId !== 'all') {
    const resolvedId = resolveCityId(cityId);
    return memoryLeads.filter((l) => l.city_id === resolvedId || l.city_id === cityId);
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

// -------------------------------------------------------------
// ADMIN CRUD (WITH MULTI-CITY SUPPORT)
// -------------------------------------------------------------

// Cities Admin CRUD
export async function getAllCitiesAdmin(): Promise<City[]> {
  const supabase = createBrowserSupabase();
  if (supabase) {
    const { data } = await supabase.from('cities').select('*').order('name');
    if (data && data.length > 0) return data as City[];
  }
  return localCities;
}

export async function saveCityAdmin(cityData: Partial<City>): Promise<City> {
  if (cityData.id) {
    const idx = localCities.findIndex((c) => c.id === cityData.id);
    if (idx !== -1) {
      localCities[idx] = { ...localCities[idx], ...cityData };
      return localCities[idx];
    }
  }

  const newCity: City = {
    id: cityData.id || `city-${Date.now()}`,
    name: cityData.name || 'Novo Destino',
    slug: cityData.slug || `destino-${Date.now()}`,
    state: cityData.state || 'SP',
    country: cityData.country || 'Brasil',
    badge: cityData.badge || `Estância Turística de ${cityData.name || 'Destino'} - SP`,
    subtitle: cityData.subtitle || 'Descubra lugares, experiências e sabores.',
    description: cityData.description || 'Novo destino turístico na plataforma Descubra.',
    tags: cityData.tags || ['Turismo', 'Gastronomia', 'Natureza'],
    image_url: cityData.image_url || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80',
    hero_image: cityData.hero_image,
    is_active: cityData.is_active !== undefined ? cityData.is_active : true,
  };

  localCities.push(newCity);
  return newCity;
}

export async function deleteCityAdmin(id: string): Promise<boolean> {
  localCities = localCities.filter((c) => c.id !== id);
  return true;
}

// Category Admin CRUD
export async function getAllCategoriesAdmin(cityId?: string): Promise<Category[]> {
  const resolved = resolveCityId(cityId);
  if (resolved) {
    return localCategories.filter((c) => c.city_id === resolved || !c.city_id);
  }
  return localCategories;
}

export async function saveCategoryAdmin(cat: Partial<Category>): Promise<Category> {
  if (cat.id) {
    const idx = localCategories.findIndex((c) => c.id === cat.id);
    if (idx !== -1) {
      localCategories[idx] = { ...localCategories[idx], ...cat };
      return localCategories[idx];
    }
  }
  const newCat: Category = {
    id: `cat-${Date.now()}`,
    city_id: cat.city_id || SAO_ROQUE_CITY.id,
    name: cat.name || 'Nova Categoria',
    slug: cat.slug || `categoria-${Date.now()}`,
    description: cat.description || '',
    icon: cat.icon || 'Wine',
    image_url: cat.image_url || 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80',
    is_active: cat.is_active !== undefined ? cat.is_active : true,
  };
  localCategories.unshift(newCat);
  return newCat;
}

export async function deleteCategoryAdmin(id: string): Promise<boolean> {
  localCategories = localCategories.filter((c) => c.id !== id);
  return true;
}

// Experience Admin CRUD
export async function getAllExperiencesAdmin(cityId?: string): Promise<Experience[]> {
  const resolved = resolveCityId(cityId);
  let list = localExperiences;
  if (resolved) {
    list = list.filter((e) => e.city_id === resolved);
  }
  return list.map((exp) => ({
    ...exp,
    business: localBusinesses.find((b) => b.id === exp.business_id),
    category: localCategories.find((c) => c.id === exp.category_id),
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
    city_id: exp.city_id || SAO_ROQUE_CITY.id,
    business_id: exp.business_id || localBusinesses[0]?.id || '',
    category_id: exp.category_id || localCategories[0]?.id || '',
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
export async function getAllRoutesAdmin(cityId?: string): Promise<Route[]> {
  const resolved = resolveCityId(cityId);
  if (resolved) {
    return localRoutes.filter((r) => r.city_id === resolved);
  }
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
    city_id: routeData.city_id || SAO_ROQUE_CITY.id,
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
export async function getAllEventsAdmin(cityId?: string): Promise<EventItem[]> {
  const resolved = resolveCityId(cityId);
  let list = localEvents;
  if (resolved) {
    list = list.filter((e) => e.city_id === resolved);
  }
  return list.map((evt) => ({
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
    city_id: evt.city_id || SAO_ROQUE_CITY.id,
    business_id: evt.business_id || localBusinesses[0]?.id || '',
    name: eventName,
    title: eventName,
    slug: evt.slug || `evento-${Date.now()}`,
    description: evt.description || '',
    event_date: evt.event_date || evt.start_date || new Date().toISOString(),
    event_time: evt.event_time || '09:00 - 18:00',
    start_date: evt.start_date || evt.event_date || new Date().toISOString(),
    end_date: evt.end_date || evt.event_date || new Date().toISOString(),
    location: evt.location || 'São Paulo - SP',
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

// Businesses Admin CRUD
export async function getAllBusinessesAdmin(cityId?: string): Promise<Business[]> {
  const resolved = resolveCityId(cityId);
  let list = localBusinesses;
  if (resolved) {
    list = list.filter((b) => b.city_id === resolved);
  }
  return list.map((b) => ({
    ...b,
    category: localCategories.find((c) => c.id === b.category_id),
    city: localCities.find((c) => c.id === b.city_id),
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
    city_id: biz.city_id || SAO_ROQUE_CITY.id,
    category_id: biz.category_id || localCategories[0].id,
    name: biz.name || 'Nova Empresa DEMO',
    slug: biz.slug || `empresa-${Date.now()}`,
    description: biz.description || '',
    address: biz.address || 'São Paulo - SP',
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
