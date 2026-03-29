CREATE TABLE IF NOT EXISTS inscription_evenement (
    id SERIAL PRIMARY KEY,
    id_user INTEGER NOT NULL REFERENCES users(id_user) ON DELETE CASCADE,
    id_evenement INTEGER NOT NULL REFERENCES evenements(id_evenement) ON DELETE CASCADE,
    date_inscription TIMESTAMPTZ DEFAULT NOW(),
    statut VARCHAR(50) DEFAULT 'inscrit',
    UNIQUE(id_user, id_evenement)
);