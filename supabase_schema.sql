-- ============================================================
-- SQL SCHEMA FOR DAGAUTO PLATFORM (SUPABASE / POSTGRESQL)
-- Скопируйте и запустите этот скрипт в Supabase SQL Editor
-- ============================================================

-- 1. Таблица автомобилей (Объявления)
CREATE TABLE IF NOT EXISTS public.cars (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    make TEXT NOT NULL,
    model TEXT NOT NULL,
    year INT NOT NULL,
    price BIGINT NOT NULL,
    mileage INT NOT NULL,
    engine_volume NUMERIC(3, 1) NOT NULL,
    engine_power INT NOT NULL,
    fuel_type TEXT DEFAULT 'PETROL',
    transmission TEXT DEFAULT 'AUTOMATIC',
    drive TEXT DEFAULT 'FWD',
    color TEXT NOT NULL,
    city TEXT NOT NULL,
    
    -- Учёт
    registration_type TEXT NOT NULL, -- 'RU', 'KG', 'AM', 'ABH', 'NO_DOCS'
    registration_country TEXT NOT NULL,
    customs_details TEXT,
    
    -- Состояние и доработки
    body_condition TEXT NOT NULL, -- 'NOT_BEATEN_NOT_PAINTED', 'ARMOR_FILM', 'COSMETIC_REFRESH', 'FULL_REPAINT'
    trim_level TEXT DEFAULT 'NORMA',
    regional_mods TEXT[] DEFAULT '{}',
    deal_types TEXT[] DEFAULT '{"SALE_ONLY"}',
    
    -- Медиа (Ссылки на Supabase Storage)
    images TEXT[] NOT NULL DEFAULT '{}',
    cold_start_video_url TEXT,
    exhaust_audio_url TEXT,
    
    -- Бартер и Рассрочка
    accepts_barter BOOLEAN DEFAULT false,
    barter_notes TEXT,
    murabaha_available BOOLEAN DEFAULT true,
    
    -- Контакты продавца
    seller_name TEXT NOT NULL,
    seller_phone TEXT NOT NULL,
    seller_whatsapp TEXT NOT NULL,
    seller_telegram TEXT,
    
    description TEXT,
    views_count INT DEFAULT 1,
    is_boosted BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Таблица заявок на «Умный бартер»
CREATE TABLE IF NOT EXISTS public.barter_proposals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    target_car_id UUID REFERENCES public.cars(id) ON DELETE CASCADE,
    offer_vehicle_description TEXT NOT NULL,
    surcharge_text TEXT,
    sender_phone TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Таблица заявок на Халяль-рассрочку (Мурабаха)
CREATE TABLE IF NOT EXISTS public.murabaha_applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    car_id UUID REFERENCES public.cars(id) ON DELETE SET NULL,
    applicant_name TEXT NOT NULL,
    applicant_phone TEXT NOT NULL,
    car_price BIGINT NOT NULL,
    down_payment_percent INT NOT NULL,
    term_months INT NOT NULL,
    partner_fund TEXT NOT NULL, -- 'LARiba', 'MZHK', 'PRIVATE_ISLAMIC_POOL'
    status TEXT DEFAULT 'NEW', -- 'NEW', 'IN_REVIEW', 'APPROVED', 'REJECTED'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Таблица записей на СТО
CREATE TABLE IF NOT EXISTS public.sto_bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sto_name TEXT NOT NULL,
    client_name TEXT NOT NULL,
    client_phone TEXT NOT NULL,
    car_info TEXT NOT NULL,
    status TEXT DEFAULT 'PENDING',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Настройка публичного доступа на чтение
ALTER TABLE public.cars ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read cars" ON public.cars FOR SELECT USING (true);
CREATE POLICY "Allow public insert cars" ON public.cars FOR INSERT WITH CHECK (true);

ALTER TABLE public.barter_proposals ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public insert barter" ON public.barter_proposals FOR INSERT WITH CHECK (true);

ALTER TABLE public.murabaha_applications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public insert murabaha" ON public.murabaha_applications FOR INSERT WITH CHECK (true);

ALTER TABLE public.sto_bookings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public insert sto" ON public.sto_bookings FOR INSERT WITH CHECK (true);
