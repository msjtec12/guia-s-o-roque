export type City = {
  id: string;
  name: string;
  slug: string;
  state: string;
  country?: string;
  description: string;
  subtitle?: string;
  badge?: string;
  tags?: string[];
  image_url?: string;
  hero_image?: string;
  is_active?: boolean;
  active?: boolean;
  created_at?: string;
};

export type Category = {
  id: string;
  city_id?: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  image_url: string;
  is_active: boolean;
  created_at?: string;
};

export type BusinessPlan = 'free' | 'highlight' | 'premium';
export type BusinessStatus = 'published' | 'pending' | 'draft';

export type Business = {
  id: string;
  city_id: string;
  category_id: string;
  name: string;
  slug: string;
  description: string;
  address: string;
  phone: string;
  whatsapp: string;
  instagram: string;
  website: string;
  latitude: number;
  longitude: number;
  price_min: number;
  price_max: number;
  opening_hours: string;
  main_image_url: string;
  status: BusinessStatus;
  plan: BusinessPlan;
  is_featured: boolean;
  is_premium: boolean;
  created_at?: string;
  updated_at?: string;
  
  // Joined fields
  category?: Category;
  city?: City;
  gallery?: BusinessImage[];
  experiences?: Experience[];
  rating?: number;
  review_count?: number;
  amenities?: string[];
  tags?: string[];
};

export type BusinessImage = {
  id: string;
  business_id: string;
  image_url: string;
  sort_order: number;
  created_at?: string;
};

export type Experience = {
  id: string;
  city_id?: string;
  business_id?: string;
  category_id?: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  duration: string;
  main_image_url: string;
  status: BusinessStatus;
  is_featured?: boolean;
  rating?: number;
  review_count?: number;
  included?: string[];
  created_at?: string;
  updated_at?: string;
  
  // Joined fields
  business?: Business;
  category?: Category;
};

export type RouteItem = {
  id: string;
  route_id: string;
  business_id?: string;
  experience_id?: string;
  title: string;
  description: string;
  sort_order: number;
  
  // Joined fields
  business?: Business;
  experience?: Experience;
};

export type Route = {
  id: string;
  city_id?: string;
  name: string;
  slug: string;
  description: string;
  duration: string;
  profile: string;
  image_url: string;
  status: BusinessStatus;
  is_featured?: boolean;
  created_at?: string;
  updated_at?: string;
  
  // Joined items
  items?: RouteItem[];
};

export type EventItem = {
  id: string;
  city_id?: string;
  business_id?: string;
  name: string;
  title?: string;
  slug?: string;
  description: string;
  event_date?: string;
  event_time?: string;
  start_date?: string;
  end_date?: string;
  location: string;
  image_url: string;
  external_url?: string;
  status: BusinessStatus;
  is_featured?: boolean;
  created_at?: string;
  
  // Joined fields
  business?: Business;
};

export type LeadStatus = 'pending' | 'contacted' | 'approved' | 'rejected' | 'archived';

export type PartnerLead = {
  id: string;
  company_name: string;
  responsible_name: string;
  whatsapp: string;
  email: string;
  category: string;
  city_id: string;
  address?: string;
  instagram?: string;
  website?: string;
  description?: string;
  desired_plan: BusinessPlan;
  message?: string;
  status: LeadStatus;
  created_at?: string;
};

export type UserRole = 'admin' | 'partner' | 'user';

export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  created_at?: string;
};

export type EventType = 
  | 'page_view'
  | 'search'
  | 'category_click'
  | 'business_view'
  | 'experience_view'
  | 'route_view'
  | 'whatsapp_click' 
  | 'map_click' 
  | 'instagram_click' 
  | 'website_click';

export type BusinessEvent = {
  id: string;
  event_type: EventType;
  business_id?: string;
  experience_id?: string;
  route_id?: string;
  city_id?: string;
  page?: string;
  created_at?: string;
};

export type FilterOptions = {
  citySlug?: string;
  cityId?: string;
  categorySlug?: string;
  priceLevel?: string;
  searchQuery?: string;
  tag?: string;
  isFeaturedOnly?: boolean;
  isOpenNow?: boolean;
  sortBy?: 'recommended' | 'rating' | 'name';
};

// "Monte Seu Roteiro" Wizard Types
export type CustomRouteQuery = {
  travelers: 'casal' | 'familia' | 'amigos' | 'sozinho';
  duration: 'horas' | '1dia' | 'fimdesemana';
  interests: string[];
};

export type ItineraryStop = {
  time: string;
  title: string;
  description: string;
  categoryIcon?: string;
  business?: Business;
  experience?: Experience;
};

export type GeneratedItinerary = {
  title: string;
  profileLabel: string;
  durationLabel: string;
  stops: ItineraryStop[];
};

// Analytics Dashboard Types
export type PeriodFilter = 'today' | '7days' | '30days' | 'month';

export type AnalyticsMetrics = {
  pageViews: number;
  businessViews: number;
  whatsappClicks: number;
  mapClicks: number;
  experienceViews: number;
  routeViews: number;
  searches: number;
};

export type TopBusinessMetric = {
  business: Business;
  views: number;
  whatsappClicks: number;
  mapClicks: number;
};
