-- Add missing columns to gallery_images table
ALTER TABLE public.gallery_images 
ADD COLUMN thumbnail_url TEXT,
ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT now();

-- Update existing records to have thumbnail_url same as image_url
UPDATE public.gallery_images SET thumbnail_url = image_url WHERE thumbnail_url IS NULL;

-- Make thumbnail_url required for new records
ALTER TABLE public.gallery_images ALTER COLUMN thumbnail_url SET NOT NULL;

-- Add trigger for updated_at timestamp
CREATE TRIGGER update_gallery_images_updated_at 
BEFORE UPDATE ON public.gallery_images
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();