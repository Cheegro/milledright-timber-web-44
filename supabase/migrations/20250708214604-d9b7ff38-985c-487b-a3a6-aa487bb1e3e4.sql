
-- Create storage buckets first
INSERT INTO storage.buckets (id, name, public) VALUES 
  ('product-images', 'product-images', true),
  ('project-images', 'project-images', true),
  ('blog-images', 'blog-images', true),
  ('gallery-images', 'gallery-images', true);

-- Create storage policies (allow public access)
CREATE POLICY "Public read access on product-images" ON storage.objects FOR SELECT USING (bucket_id = 'product-images');
CREATE POLICY "Public read access on project-images" ON storage.objects FOR SELECT USING (bucket_id = 'project-images');
CREATE POLICY "Public read access on blog-images" ON storage.objects FOR SELECT USING (bucket_id = 'blog-images');
CREATE POLICY "Public read access on gallery-images" ON storage.objects FOR SELECT USING (bucket_id = 'gallery-images');

CREATE POLICY "Public upload on product-images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'product-images');
CREATE POLICY "Public upload on project-images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'project-images');
CREATE POLICY "Public upload on blog-images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'blog-images');
CREATE POLICY "Public upload on gallery-images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'gallery-images');

-- Product categories table
CREATE TABLE public.product_categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Products table
CREATE TABLE public.products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  category_id UUID REFERENCES public.product_categories(id),
  price TEXT NOT NULL,
  price_unit TEXT DEFAULT 'each',
  description TEXT NOT NULL,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Projects table
CREATE TABLE public.projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  wood_type TEXT NOT NULL,
  category TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Blog categories table
CREATE TABLE public.blog_categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Blog posts table
CREATE TABLE public.blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content TEXT NOT NULL,
  excerpt TEXT,
  image_url TEXT,
  category_id UUID REFERENCES public.blog_categories(id),
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Reviews table
CREATE TABLE public.reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  author TEXT NOT NULL,
  location TEXT,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  text TEXT NOT NULL,
  status TEXT DEFAULT 'Pending' CHECK (status IN ('Published', 'Pending')),
  product_id UUID REFERENCES public.products(id),
  date TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Testimonials table
CREATE TABLE public.testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  author TEXT NOT NULL,
  content TEXT NOT NULL,
  image_url TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Gallery categories table
CREATE TABLE public.gallery_categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Gallery images table
CREATE TABLE public.gallery_images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  category_id UUID REFERENCES public.gallery_categories(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Site settings table
CREATE TABLE public.site_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  value TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create update timestamp triggers
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON public.products
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON public.projects
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON public.blog_posts
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON public.site_settings
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert some sample data
INSERT INTO public.product_categories (name) VALUES 
  ('Lumber'), 
  ('Hardware'), 
  ('Tools'), 
  ('Finishes');

INSERT INTO public.blog_categories (name, slug) VALUES 
  ('Woodworking Tips', 'woodworking-tips'),
  ('Project Showcase', 'project-showcase'),
  ('News', 'news');

INSERT INTO public.gallery_categories (name) VALUES 
  ('Furniture'), 
  ('Cabinetry'), 
  ('Flooring'), 
  ('Outdoor Projects');

-- Enable RLS (Row Level Security) - making tables publicly accessible for now
ALTER TABLE public.product_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Create permissive policies for public access
CREATE POLICY "Allow public read access" ON public.product_categories FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.products FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.blog_categories FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.blog_posts FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.reviews FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.testimonials FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.gallery_categories FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.gallery_images FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.site_settings FOR SELECT USING (true);

-- Allow public write access for admin functionality
CREATE POLICY "Allow public write access" ON public.product_categories FOR ALL USING (true);
CREATE POLICY "Allow public write access" ON public.products FOR ALL USING (true);
CREATE POLICY "Allow public write access" ON public.projects FOR ALL USING (true);
CREATE POLICY "Allow public write access" ON public.blog_categories FOR ALL USING (true);
CREATE POLICY "Allow public write access" ON public.blog_posts FOR ALL USING (true);
CREATE POLICY "Allow public write access" ON public.reviews FOR ALL USING (true);
CREATE POLICY "Allow public write access" ON public.testimonials FOR ALL USING (true);
CREATE POLICY "Allow public write access" ON public.gallery_categories FOR ALL USING (true);
CREATE POLICY "Allow public write access" ON public.gallery_images FOR ALL USING (true);
CREATE POLICY "Allow public write access" ON public.site_settings FOR ALL USING (true);
