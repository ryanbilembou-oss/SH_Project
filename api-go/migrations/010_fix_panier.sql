CREATE TABLE IF NOT EXISTS panier (
    id_panier SERIAL PRIMARY KEY,
    id_user INTEGER NOT NULL REFERENCES users(id_user) ON DELETE CASCADE,
    type_objet VARCHAR(20) NOT NULL CHECK (type_objet IN ('article', 'evenement')),
    id_objet INTEGER NOT NULL,
    quantite INTEGER NOT NULL DEFAULT 1 CHECK (quantite > 0),
    date_ajout TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT panier_unique_item UNIQUE (id_user, type_objet, id_objet)
);