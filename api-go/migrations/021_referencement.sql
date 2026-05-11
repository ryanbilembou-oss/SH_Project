CREATE TABLE IF NOT EXISTS referencement (
    id SERIAL PRIMARY KEY,
    id_pro INTEGER REFERENCES users(id_user) ON DELETE CASCADE,
    type VARCHAR(20) NOT NULL CHECK (type IN ('semaine', 'mois')),
    prix NUMERIC(5,2) NOT NULL,
    date_debut TIMESTAMP DEFAULT NOW(),
    date_fin TIMESTAMP NOT NULL,
    actif BOOLEAN DEFAULT true,
    stripe_session_id VARCHAR(255)
);