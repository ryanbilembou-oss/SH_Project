ALTER TABLE users ADD COLUMN IF NOT EXISTS est_banni boolean DEFAULT false;
ALTER TABLE users ADD COLUMN IF NOT EXISTS ban_jusqu_au timestamp with time zone;
ALTER TABLE users ADD COLUMN IF NOT EXISTS ban_raison text;