-- Drop all existing tables and related objects
DROP TABLE IF EXISTS public.projects CASCADE;
DROP TABLE IF EXISTS public.user_roles CASCADE;

-- Drop the enum type
DROP TYPE IF EXISTS public.app_role CASCADE;

-- Drop the function
DROP FUNCTION IF EXISTS public.has_role(uuid, app_role) CASCADE;