-- Add page_type column to team_members table to distinguish between landing and about page
ALTER TABLE public.team_members 
ADD COLUMN page_type TEXT NOT NULL DEFAULT 'landing' CHECK (page_type IN ('landing', 'about'));

-- Add index for better performance
CREATE INDEX idx_team_members_page_type ON public.team_members(page_type, active, display_order);

-- Update display_order column to allow for better sorting
ALTER TABLE public.team_members 
ALTER COLUMN display_order SET DEFAULT 0;