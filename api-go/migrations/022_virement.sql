CREATE TABLE IF NOT EXISTS virement (
    id_virement SERIAL PRIMARY KEY,
    id_pro INTEGER NOT NULL REFERENCES users(id_user) ON DELETE CASCADE,
    id_facture INTEGER NOT NULL REFERENCES facture(id_facture) ON DELETE CASCADE,
    id_intervention INTEGER REFERENCES intervention(id) ON DELETE SET NULL,
    montant NUMERIC(10,2) NOT NULL,
    statut VARCHAR(20) DEFAULT 'en_attente',
    date_creation TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    date_virement TIMESTAMP WITH TIME ZONE,
    CONSTRAINT virement_statut_check CHECK (statut IN ('en_attente', 'effectue', 'annule'))
);