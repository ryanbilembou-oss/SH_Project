CREATE TABLE IF NOT EXISTS negociation_commission (
    id SERIAL PRIMARY KEY,
    id_pro INTEGER REFERENCES users(id_user) ON DELETE CASCADE,
    taux_propose NUMERIC(5,2) NOT NULL,
    taux_actuel NUMERIC(5,2) NOT NULL,
    message TEXT,
    statut VARCHAR(20) DEFAULT 'en_attente' CHECK (statut IN ('en_attente', 'accepte', 'refuse')),
    reponse_admin TEXT,
    date_demande TIMESTAMP DEFAULT NOW(),
    date_reponse TIMESTAMP
);