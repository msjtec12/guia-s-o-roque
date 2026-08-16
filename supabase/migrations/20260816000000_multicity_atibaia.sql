-- Migration: 20260816000000_multicity_atibaia.sql
-- Description: Suporte Completo Multicidade (São Roque e Atibaia)

-- 1. Garantir que a tabela cities existe
CREATE TABLE IF NOT EXISTS public.cities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    state VARCHAR(2) NOT NULL DEFAULT 'SP',
    country TEXT NOT NULL DEFAULT 'Brasil',
    description TEXT,
    image_url TEXT,
    hero_image TEXT,
    subtitle TEXT,
    tags TEXT[],
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Garantir coluna city_id em todas as tabelas relacionadas
ALTER TABLE public.businesses ADD COLUMN IF NOT EXISTS city_id UUID REFERENCES public.cities(id) ON DELETE CASCADE;
ALTER TABLE public.experiences ADD COLUMN IF NOT EXISTS city_id UUID REFERENCES public.cities(id) ON DELETE CASCADE;
ALTER TABLE public.routes ADD COLUMN IF NOT EXISTS city_id UUID REFERENCES public.cities(id) ON DELETE CASCADE;
ALTER TABLE public.events ADD COLUMN IF NOT EXISTS city_id UUID REFERENCES public.cities(id) ON DELETE CASCADE;
ALTER TABLE public.categories ADD COLUMN IF NOT EXISTS city_id UUID REFERENCES public.cities(id) ON DELETE CASCADE;
ALTER TABLE public.partner_leads ADD COLUMN IF NOT EXISTS city_id UUID REFERENCES public.cities(id) ON DELETE SET NULL;
ALTER TABLE public.business_events ADD COLUMN IF NOT EXISTS city_id UUID REFERENCES public.cities(id) ON DELETE CASCADE;

-- 3. Inserir ou atualizar cidades São Roque e Atibaia
INSERT INTO public.cities (id, name, slug, state, country, description, is_active)
VALUES (
    '00000000-0000-0000-0000-000000000001',
    'São Roque',
    'sao-roque',
    'SP',
    'Brasil',
    'Estância Turística de São Roque - Roteiro do Vinho, Gastronomia e Natureza',
    true
)
ON CONFLICT (slug) DO UPDATE 
SET name = EXCLUDED.name, 
    description = EXCLUDED.description,
    is_active = true;

INSERT INTO public.cities (id, name, slug, state, country, description, is_active)
VALUES (
    '00000000-0000-0000-0000-000000000002',
    'Atibaia',
    'atibaia',
    'SP',
    'Brasil',
    'Estância Turística de Atibaia - Pedra Grande, Morango, Flores e Aventura',
    true
)
ON CONFLICT (slug) DO UPDATE 
SET name = EXCLUDED.name, 
    description = EXCLUDED.description,
    is_active = true;

INSERT INTO public.cities (id, name, slug, state, country, description, is_active)
VALUES (
    '00000000-0000-0000-0000-000000000003',
    'Socorro',
    'socorro',
    'SP',
    'Brasil',
    'Estância Hidromineral de Socorro - Capital da Aventura, Natureza, Rafting e Polo de Malhas',
    true
)
ON CONFLICT (slug) DO UPDATE 
SET name = EXCLUDED.name, 
    description = EXCLUDED.description,
    is_active = true;

-- 4. Associar registros legados sem cidade a São Roque por padrão
UPDATE public.businesses SET city_id = '00000000-0000-0000-0000-000000000001' WHERE city_id IS NULL;
UPDATE public.experiences SET city_id = '00000000-0000-0000-0000-000000000001' WHERE city_id IS NULL;
UPDATE public.routes SET city_id = '00000000-0000-0000-0000-000000000001' WHERE city_id IS NULL;
UPDATE public.events SET city_id = '00000000-0000-0000-0000-000000000001' WHERE city_id IS NULL;
UPDATE public.categories SET city_id = '00000000-0000-0000-0000-000000000001' WHERE city_id IS NULL;
UPDATE public.partner_leads SET city_id = '00000000-0000-0000-0000-000000000001' WHERE city_id IS NULL;

-- 5. Criar índices para performance de busca multicidade
CREATE INDEX IF NOT EXISTS idx_businesses_city_id ON public.businesses(city_id);
CREATE INDEX IF NOT EXISTS idx_experiences_city_id ON public.experiences(city_id);
CREATE INDEX IF NOT EXISTS idx_routes_city_id ON public.routes(city_id);
CREATE INDEX IF NOT EXISTS idx_events_city_id ON public.events(city_id);
CREATE INDEX IF NOT EXISTS idx_categories_city_id ON public.categories(city_id);
CREATE INDEX IF NOT EXISTS idx_partner_leads_city_id ON public.partner_leads(city_id);
CREATE INDEX IF NOT EXISTS idx_business_events_city_id ON public.business_events(city_id);
