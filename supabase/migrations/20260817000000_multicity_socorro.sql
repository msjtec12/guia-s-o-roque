-- Migration: 20260817000000_multicity_socorro.sql
-- Description: Suporte Completo ao Destino Socorro (SP)

-- 1. Inserir ou atualizar destino Socorro
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
