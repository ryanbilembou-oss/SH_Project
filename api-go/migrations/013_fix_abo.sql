ALTER TABLE abonnement ADD COLUMN statut VARCHAR(20) DEFAULT 'actif';
ALTER TABLE abonnement ADD COLUMN date_resiliation TIMESTAMPTZ;