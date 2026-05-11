ALTER TABLE devis DROP CONSTRAINT IF EXISTS devis_statut_check;
ALTER TABLE devis ADD CONSTRAINT devis_statut_check 
  CHECK (statut IN ('en_attente', 'accepte', 'refuse', 'paye', 'annule'));