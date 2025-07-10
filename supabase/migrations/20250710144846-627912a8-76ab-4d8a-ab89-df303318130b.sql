-- Phase 1: Fix Database Schema Mismatches

-- 1.1 Fix Testimonials Table - Add missing columns expected by components
ALTER TABLE public.testimonials 
ADD COLUMN location TEXT,
ADD COLUMN rating INTEGER CHECK (rating >= 1 AND rating <= 5),
ADD COLUMN text TEXT,
ADD COLUMN product_id UUID REFERENCES public.products(id);

-- Rename content to text if we want to keep existing data, or we can migrate data
UPDATE public.testimonials SET text = content WHERE text IS NULL;

-- 1.2 Fix Blog Posts Table - Add missing columns
ALTER TABLE public.blog_posts
ADD COLUMN author TEXT DEFAULT 'Admin',
ADD COLUMN author_name TEXT DEFAULT 'Admin',
ADD COLUMN is_published BOOLEAN GENERATED ALWAYS AS (status = 'published') STORED,
ADD COLUMN published_at TIMESTAMP WITH TIME ZONE;

-- Update published_at for existing published posts
UPDATE public.blog_posts 
SET published_at = updated_at 
WHERE status = 'published' AND published_at IS NULL;

-- 1.3 Fix Reviews Table - Add missing updated_at column
ALTER TABLE public.reviews
ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT now();

-- Create trigger for reviews updated_at
CREATE TRIGGER update_reviews_updated_at
    BEFORE UPDATE ON public.reviews
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- 1.4 Create Analytics Tables for comprehensive tracking
CREATE TABLE public.analytics_page_views (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    path TEXT NOT NULL,
    user_agent TEXT,
    ip_address INET,
    referrer TEXT,
    country TEXT,
    region TEXT,
    city TEXT,
    device_type TEXT,
    browser TEXT,
    os TEXT,
    screen_resolution TEXT,
    session_id TEXT,
    user_id UUID,
    timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    duration INTEGER, -- time spent on page in seconds
    bounce BOOLEAN DEFAULT false
);

CREATE TABLE public.analytics_events (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    event_name TEXT NOT NULL,
    event_data JSONB,
    path TEXT,
    user_agent TEXT,
    ip_address INET,
    country TEXT,
    region TEXT,
    city TEXT,
    device_type TEXT,
    browser TEXT,
    os TEXT,
    session_id TEXT,
    user_id UUID,
    timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 1.5 Create Customer Management Tables
CREATE TABLE public.customers (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    company TEXT,
    status TEXT DEFAULT 'lead' CHECK (status IN ('lead', 'prospect', 'customer', 'inactive')),
    source TEXT, -- how they found us
    assigned_to TEXT, -- staff member
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    last_contact TIMESTAMP WITH TIME ZONE,
    next_followup TIMESTAMP WITH TIME ZONE
);

CREATE TABLE public.conversations (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    customer_id UUID NOT NULL REFERENCES public.customers(id) ON DELETE CASCADE,
    subject TEXT NOT NULL,
    status TEXT DEFAULT 'open' CHECK (status IN ('open', 'closed', 'pending')),
    priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE public.conversation_entries (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    conversation_id UUID NOT NULL REFERENCES public.conversations(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    is_internal BOOLEAN DEFAULT false, -- internal notes vs customer communication
    author TEXT NOT NULL, -- staff member or 'customer'
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 1.6 Create Newsletter Management Table
CREATE TABLE public.newsletter_subscriptions (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    name TEXT,
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'unsubscribed', 'bounced')),
    subscribed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    unsubscribed_at TIMESTAMP WITH TIME ZONE,
    unsubscribe_token TEXT UNIQUE DEFAULT gen_random_uuid(),
    source TEXT, -- where they subscribed from
    preferences JSONB DEFAULT '{}' -- subscription preferences
);

-- 1.7 Create Wood Species Database Table
CREATE TABLE public.wood_species (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    scientific_name TEXT,
    common_names TEXT[], -- array of alternative names
    description TEXT,
    hardness_rating INTEGER, -- Janka hardness scale
    grain_pattern TEXT,
    color_description TEXT,
    workability TEXT,
    durability TEXT,
    typical_uses TEXT[],
    availability TEXT,
    price_range TEXT,
    image_url TEXT,
    grain_image_url TEXT,
    origin_regions TEXT[], -- where it's typically found
    sustainability_notes TEXT,
    moisture_content DECIMAL(5,2), -- typical moisture content percentage
    specific_gravity DECIMAL(4,3), -- density measure
    shrinkage_radial DECIMAL(4,2), -- shrinkage percentage
    shrinkage_tangential DECIMAL(4,2),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add indexes for performance
CREATE INDEX idx_analytics_page_views_timestamp ON public.analytics_page_views(timestamp);
CREATE INDEX idx_analytics_page_views_path ON public.analytics_page_views(path);
CREATE INDEX idx_analytics_page_views_session ON public.analytics_page_views(session_id);
CREATE INDEX idx_analytics_events_timestamp ON public.analytics_events(timestamp);
CREATE INDEX idx_analytics_events_name ON public.analytics_events(event_name);
CREATE INDEX idx_customers_email ON public.customers(email);
CREATE INDEX idx_customers_status ON public.customers(status);
CREATE INDEX idx_customers_updated_at ON public.customers(updated_at);
CREATE INDEX idx_newsletter_email ON public.newsletter_subscriptions(email);
CREATE INDEX idx_wood_species_name ON public.wood_species(name);

-- Add updated_at triggers for new tables
CREATE TRIGGER update_customers_updated_at
    BEFORE UPDATE ON public.customers
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_conversations_updated_at
    BEFORE UPDATE ON public.conversations
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_wood_species_updated_at
    BEFORE UPDATE ON public.wood_species
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- Enable RLS on all new tables
ALTER TABLE public.analytics_page_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversation_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wood_species ENABLE ROW LEVEL SECURITY;

-- Create RLS policies (public read/write for now, can be restricted later)
CREATE POLICY "Allow public read access" ON public.analytics_page_views FOR SELECT USING (true);
CREATE POLICY "Allow public write access" ON public.analytics_page_views FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read access" ON public.analytics_events FOR SELECT USING (true);
CREATE POLICY "Allow public write access" ON public.analytics_events FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public access" ON public.customers FOR ALL USING (true);
CREATE POLICY "Allow public access" ON public.conversations FOR ALL USING (true);
CREATE POLICY "Allow public access" ON public.conversation_entries FOR ALL USING (true);
CREATE POLICY "Allow public access" ON public.newsletter_subscriptions FOR ALL USING (true);
CREATE POLICY "Allow public access" ON public.wood_species FOR ALL USING (true);