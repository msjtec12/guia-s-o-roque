-- Migration: 20260815000000_init_schema.sql
-- Description: Complete schema for Descubra São Roque (Multi-city ready)

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- CITIES TABLE
CREATE TABLE IF NOT EXISTS public.cities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    state VARCHAR(2) NOT NULL DEFAULT 'SP',
    country TEXT NOT NULL DEFAULT 'Brasil',
    description TEXT,
    image_url TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- CATEGORIES TABLE
CREATE TABLE IF NOT EXISTS public.categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    icon TEXT NOT NULL DEFAULT 'Tag',
    image_url TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- BUSINESSES TABLE
CREATE TABLE IF NOT EXISTS public.businesses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    city_id UUID REFERENCES public.cities(id) ON DELETE CASCADE,
    category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    address TEXT,
    phone TEXT,
    whatsapp TEXT,
    instagram TEXT,
    website TEXT,
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION,
    price_min NUMERIC(10,2) DEFAULT 0,
    price_max NUMERIC(10,2) DEFAULT 0,
    opening_hours TEXT,
    main_image_url TEXT,
    status VARCHAR(20) DEFAULT 'published',
    plan VARCHAR(20) DEFAULT 'free',
    is_featured BOOLEAN DEFAULT false,
    is_premium BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- BUSINESS IMAGES GALLERY TABLE
CREATE TABLE IF NOT EXISTS public.business_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    business_id UUID REFERENCES public.businesses(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- EXPERIENCES TABLE
CREATE TABLE IF NOT EXISTS public.experiences (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    city_id UUID REFERENCES public.cities(id) ON DELETE CASCADE,
    business_id UUID REFERENCES public.businesses(id) ON DELETE SET NULL,
    category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    price NUMERIC(10,2) DEFAULT 0,
    duration TEXT,
    main_image_url TEXT,
    status VARCHAR(20) DEFAULT 'published',
    is_featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ROUTES TABLE
CREATE TABLE IF NOT EXISTS public.routes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    city_id UUID REFERENCES public.cities(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    duration TEXT,
    profile TEXT,
    image_url TEXT,
    status VARCHAR(20) DEFAULT 'published',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ROUTE ITEMS TABLE
CREATE TABLE IF NOT EXISTS public.route_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    route_id UUID REFERENCES public.routes(id) ON DELETE CASCADE,
    business_id UUID REFERENCES public.businesses(id) ON DELETE SET NULL,
    experience_id UUID REFERENCES public.experiences(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    description TEXT,
    sort_order INT DEFAULT 0
);

-- EVENTS TABLE
CREATE TABLE IF NOT EXISTS public.events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    city_id UUID REFERENCES public.cities(id) ON DELETE CASCADE,
    business_id UUID REFERENCES public.businesses(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    description TEXT,
    event_date DATE NOT NULL,
    event_time TEXT,
    location TEXT,
    image_url TEXT,
    external_url TEXT,
    status VARCHAR(20) DEFAULT 'published',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- PARTNER LEADS TABLE
CREATE TABLE IF NOT EXISTS public.partner_leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_name TEXT NOT NULL,
    responsible_name TEXT NOT NULL,
    whatsapp TEXT NOT NULL,
    email TEXT NOT NULL,
    category TEXT,
    city_id UUID REFERENCES public.cities(id) ON DELETE SET NULL,
    address TEXT,
    instagram TEXT,
    website TEXT,
    description TEXT,
    desired_plan VARCHAR(20) DEFAULT 'free',
    message TEXT,
    status VARCHAR(20) DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- USERS TABLE
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT,
    email TEXT UNIQUE NOT NULL,
    role VARCHAR(20) DEFAULT 'user',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- BUSINESS EVENTS (ANALYTICS) TABLE
CREATE TABLE IF NOT EXISTS public.business_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    business_id UUID REFERENCES public.businesses(id) ON DELETE CASCADE,
    event_type VARCHAR(50) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ROW LEVEL SECURITY (RLS) POLICIES

ALTER TABLE public.cities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.businesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.business_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.routes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.route_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.partner_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.business_events ENABLE ROW LEVEL SECURITY;

-- Public Read Policies
CREATE POLICY "Public can view active cities" ON public.cities FOR SELECT USING (is_active = true);
CREATE POLICY "Public can view active categories" ON public.categories FOR SELECT USING (is_active = true);
CREATE POLICY "Public can view published businesses" ON public.businesses FOR SELECT USING (status = 'published');
CREATE POLICY "Public can view business images" ON public.business_images FOR SELECT USING (true);
CREATE POLICY "Public can view published experiences" ON public.experiences FOR SELECT USING (status = 'published');
CREATE POLICY "Public can view published routes" ON public.routes FOR SELECT USING (status = 'published');
CREATE POLICY "Public can view route items" ON public.route_items FOR SELECT USING (true);
CREATE POLICY "Public can view published events" ON public.events FOR SELECT USING (status = 'published');

-- Public Insert for Leads and Analytics
CREATE POLICY "Public can submit partner leads" ON public.partner_leads FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can insert business analytics events" ON public.business_events FOR INSERT WITH CHECK (true);

-- Admin Full Access Policies (Checked via JWT auth role or auth.uid in users table with role = 'admin')
CREATE POLICY "Admin full access cities" ON public.cities ALL USING (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "Admin full access categories" ON public.categories ALL USING (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "Admin full access businesses" ON public.businesses ALL USING (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "Admin full access experiences" ON public.experiences ALL USING (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "Admin full access routes" ON public.routes ALL USING (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "Admin full access events" ON public.events ALL USING (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "Admin view partner leads" ON public.partner_leads FOR SELECT USING (auth.jwt() ->> 'role' = 'admin');

-- SEED SCRIPT (DEFAULT CITY SÃO ROQUE)
INSERT INTO public.cities (id, name, slug, state, country, description, is_active)
VALUES ('00000000-0000-0000-0000-000000000001', 'São Roque', 'sao-roque', 'SP', 'Brasil', 'Estância Turística de São Roque - Roteiro do Vinho', true)
ON CONFLICT (slug) DO NOTHING;
