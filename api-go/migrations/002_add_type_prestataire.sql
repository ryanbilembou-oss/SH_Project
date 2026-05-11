CREATE TABLE IF NOT EXISTS type_prestataire (
    id_type SERIAL PRIMARY KEY,
    nom_type VARCHAR(100) NOT NULL
);

INSERT INTO type_prestataire (nom_type) VALUES
('Médecin'),
('Infirmier'),
('Kinésithérapeute'),
('Aide à domicile'),
('Animateur'),
('Jardinier'),
('Cuisinier'),
('Coach sportif'),
('Informaticien'),
('Chauffeur'),
('Garde d''animaux'),
('Décorateur'),
('Comptable'),
('Avocat'),
('Autre')
ON CONFLICT DO NOTHING;