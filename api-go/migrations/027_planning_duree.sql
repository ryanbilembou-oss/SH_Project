ALTER TABLE planning_pro ADD COLUMN IF NOT EXISTS duree_intervention integer DEFAULT 60;
ALTER TABLE planning_pro ADD COLUMN IF NOT EXISTS pause_entre integer DEFAULT 0;