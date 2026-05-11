CREATE TABLE IF NOT EXISTS type_prestataire_categorie (
    id_type      INTEGER REFERENCES type_prestataire(id_type) ON DELETE CASCADE,
    id_categorie INTEGER REFERENCES categorie_services(id_categorie) ON DELETE CASCADE,
    PRIMARY KEY (id_type, id_categorie)
);