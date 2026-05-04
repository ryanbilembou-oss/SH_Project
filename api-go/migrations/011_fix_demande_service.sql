CREATE TABLE IF NOT EXISTS demande_service (
    id_demande SERIAL PRIMARY KEY,
    id_senior INTEGER NOT NULL REFERENCES profile_senior(id_user) ON DELETE CASCADE,
    id_offre INTEGER NOT NULL REFERENCES offre_prestataire(id_offre) ON DELETE CASCADE,
    date_souhaitee DATE NOT NULL,
    message TEXT,
    statut VARCHAR(50) DEFAULT 'en_attente',
    date_creation TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT demande_unique UNIQUE (id_senior, id_offre, statut)
);