
-- Create storage bucket for portfolio assets (resume, profile photo)
INSERT INTO storage.buckets (id, name, public) VALUES ('portfolio-assets', 'portfolio-assets', true);

-- Allow anyone to view files (public portfolio)
CREATE POLICY "Anyone can view portfolio assets"
ON storage.objects FOR SELECT
USING (bucket_id = 'portfolio-assets');

-- Only admins can upload files
CREATE POLICY "Admins can upload portfolio assets"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'portfolio-assets' 
  AND public.has_role(auth.uid(), 'admin'::public.app_role)
);

-- Only admins can update files
CREATE POLICY "Admins can update portfolio assets"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'portfolio-assets' 
  AND public.has_role(auth.uid(), 'admin'::public.app_role)
);

-- Only admins can delete files
CREATE POLICY "Admins can delete portfolio assets"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'portfolio-assets' 
  AND public.has_role(auth.uid(), 'admin'::public.app_role)
);
