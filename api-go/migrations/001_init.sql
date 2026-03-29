CREATE TABLE IF NOT EXISTS users (
    id_user SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL CHECK (role IN ('admin', 'senior', 'pro')),
    token_session VARCHAR(255),
    date_inscription TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    accepte_newsletter BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS categorie_services (
    id_categorie SERIAL PRIMARY KEY,
    nom_categorie VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS categorie_article (
    id_categorie SERIAL PRIMARY KEY,
    nom_categorie VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS categorie_evenement (
    id_categorie SERIAL PRIMARY KEY,
    nom_categorie VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS conseil (
    id_conseil SERIAL PRIMARY KEY,
    categorie VARCHAR(100),
    titre VARCHAR(255) NOT NULL,
    contenu TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS profile_admin (
    id_user INTEGER PRIMARY KEY REFERENCES users(id_user) ON DELETE CASCADE,
    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100) NOT NULL,
    genre VARCHAR(50),
    telephone VARCHAR(20)
);

CREATE TABLE IF NOT EXISTS profile_senior (
    id_user INTEGER PRIMARY KEY REFERENCES users(id_user) ON DELETE CASCADE,
    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100) NOT NULL,
    genre VARCHAR(50),
    date_naissance DATE,
    is_first_login BOOLEAN DEFAULT TRUE,
    is_subscription_valid BOOLEAN DEFAULT FALSE,
    adresse TEXT,
    telephone VARCHAR(20)
);

CREATE TABLE IF NOT EXISTS profile_pro (
    id_user INTEGER PRIMARY KEY REFERENCES users(id_user) ON DELETE CASCADE,
    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100) NOT NULL,
    date_naissance DATE,
    genre VARCHAR(50),
    statut_juridique VARCHAR(50),
    nom_entreprise VARCHAR(150),
    adresse_pro TEXT,
    id_type INTEGER,
    statut_validation VARCHAR(50) DEFAULT 'en_attente',
    is_subscription_valid BOOLEAN DEFAULT FALSE,
    siret VARCHAR(14) UNIQUE,
    bio TEXT,
    rib VARCHAR(34),
    telephone_pro VARCHAR(20),
    logo_url VARCHAR(255),
    note_moyenne NUMERIC(3,2) DEFAULT 0.00,
    commission NUMERIC(5,2) DEFAULT 15.00
);

CREATE TABLE IF NOT EXISTS service (
    id SERIAL PRIMARY KEY,
    id_categorie INTEGER NOT NULL REFERENCES categorie_services(id_categorie) ON DELETE RESTRICT,
    nom VARCHAR(150) NOT NULL,
    description TEXT,
    prix_reference NUMERIC(10,2) NOT NULL,
    image_url VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS offre_prestataire (
    id_offre SERIAL PRIMARY KEY,
    id_pro INTEGER REFERENCES profile_pro(id_user) ON DELETE CASCADE,
    id_service INTEGER REFERENCES service(id) ON DELETE CASCADE,
    prix_personnalise NUMERIC(10,2) NOT NULL,
    titre VARCHAR(150),
    bio TEXT,
    UNIQUE (id_pro, id_service)
);

CREATE TABLE IF NOT EXISTS article (
    id SERIAL PRIMARY KEY,
    id_user INTEGER REFERENCES users(id_user) ON DELETE SET NULL,
    id_categorie INTEGER NOT NULL REFERENCES categorie_article(id_categorie) ON DELETE RESTRICT,
    nom VARCHAR(150) NOT NULL,
    prix NUMERIC(10,2) NOT NULL,
    bio TEXT,
    stock INTEGER DEFAULT 0 CHECK (stock >= 0),
    image_url VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS evenements (
    id_evenement SERIAL PRIMARY KEY,
    id_createur INTEGER REFERENCES users(id_user) ON DELETE SET NULL,
    id_categorie INTEGER NOT NULL REFERENCES categorie_evenement(id_categorie) ON DELETE RESTRICT,
    titre VARCHAR(150) NOT NULL,
    description TEXT,
    date_heure TIMESTAMPTZ NOT NULL,
    lieu TEXT NOT NULL,
    prix_ticket NUMERIC(10,2) NOT NULL,
    nb_places_max INTEGER NOT NULL CHECK (nb_places_max > 0),
    nb_inscrits INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS documents_pro (
    id_doc SERIAL PRIMARY KEY,
    id_user INTEGER NOT NULL REFERENCES profile_pro(id_user) ON DELETE CASCADE,
    type_doc VARCHAR(100) NOT NULL,
    url_document VARCHAR(255) NOT NULL,
    date_upload TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    id_categorie INTEGER
);

CREATE TABLE IF NOT EXISTS planning_pro (
    id_planning SERIAL PRIMARY KEY,
    id_pro INTEGER NOT NULL REFERENCES profile_pro(id_user) ON DELETE CASCADE,
    jour_semaine INTEGER CHECK (jour_semaine BETWEEN 1 AND 7),
    heure_debut TIME NOT NULL,
    heure_fin TIME NOT NULL,
    est_actif BOOLEAN DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS intervention (
    id SERIAL PRIMARY KEY,
    id_pro INTEGER NOT NULL REFERENCES profile_pro(id_user) ON DELETE RESTRICT,
    id_senior INTEGER NOT NULL REFERENCES profile_senior(id_user) ON DELETE RESTRICT,
    id_service INTEGER NOT NULL REFERENCES service(id) ON DELETE RESTRICT,
    bio_intervention TEXT,
    date_heure_debut TIMESTAMPTZ NOT NULL,
    date_heure_fin TIMESTAMPTZ NOT NULL,
    lieu TEXT NOT NULL,
    statut VARCHAR(50) DEFAULT 'planifiee',
    commission_montant NUMERIC(10,2) NOT NULL,
    prix NUMERIC(10,2) NOT NULL,
    est_medical BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS devis (
    id_devis SERIAL PRIMARY KEY,
    id_pro INTEGER NOT NULL REFERENCES profile_pro(id_user) ON DELETE CASCADE,
    id_senior INTEGER NOT NULL REFERENCES profile_senior(id_user) ON DELETE CASCADE,
    id_service INTEGER NOT NULL REFERENCES service(id) ON DELETE CASCADE,
    id_intervention INTEGER UNIQUE REFERENCES intervention(id) ON DELETE SET NULL,
    montant_ht NUMERIC(10,2) NOT NULL,
    montant_ttc NUMERIC(10,2) NOT NULL,
    taux_commission NUMERIC(5,2) NOT NULL,
    date_validite DATE NOT NULL,
    statut VARCHAR(50) DEFAULT 'en_attente'
);

CREATE TABLE IF NOT EXISTS facture (
    id_facture SERIAL PRIMARY KEY,
    id_emetteur INTEGER NOT NULL REFERENCES users(id_user) ON DELETE RESTRICT,
    id_recepteur INTEGER NOT NULL REFERENCES users(id_user) ON DELETE RESTRICT,
    id_intervention INTEGER UNIQUE REFERENCES intervention(id) ON DELETE RESTRICT,
    montant_ht NUMERIC(10,2) NOT NULL,
    montant_ttc NUMERIC(10,2) NOT NULL,
    commission_sh NUMERIC(10,2) NOT NULL,
    pdf_url VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS note_avis (
    id_avis SERIAL PRIMARY KEY,
    id_intervention INTEGER REFERENCES intervention(id) ON DELETE CASCADE, 
    note INTEGER NOT NULL CHECK (note BETWEEN 1 AND 5),
    commentaire TEXT,
    date_publication TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS litiges (
    id_litige SERIAL PRIMARY KEY,
    id_intervention INTEGER NOT NULL REFERENCES intervention(id) ON DELETE RESTRICT,
    motif TEXT NOT NULL,
    statut VARCHAR(50) DEFAULT 'ouvert',
    date_ouverture TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS planning_senior (
    id_agenda SERIAL PRIMARY KEY,
    id_senior INTEGER NOT NULL REFERENCES profile_senior(id_user) ON DELETE CASCADE,
    id_intervention INTEGER REFERENCES intervention(id) ON DELETE CASCADE,
    rappel_notification TIMESTAMPTZ,
    note_perso TEXT
);

CREATE TABLE IF NOT EXISTS abonnement (
    id_abonnement SERIAL PRIMARY KEY,
    id_user INTEGER NOT NULL UNIQUE REFERENCES users(id_user) ON DELETE CASCADE,
    type_abonnement VARCHAR(50) NOT NULL,
    prix_abonnement NUMERIC(10,2) NOT NULL,
    date_debut TIMESTAMPTZ NOT NULL,
    date_fin TIMESTAMPTZ NOT NULL,
    stripe_subscription_id VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS paiements (
    id_paiement SERIAL PRIMARY KEY,
    id_user INTEGER NOT NULL REFERENCES users(id_user) ON DELETE RESTRICT,
    prix NUMERIC(10,2) NOT NULL,
    type_objet VARCHAR(50) NOT NULL CHECK (type_objet IN ('article', 'abonnement', 'evenement', 'intervention')),
    id_objet INTEGER NOT NULL,
    date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    stripe_session_id VARCHAR(255) UNIQUE,
    stripe_paiement_id VARCHAR(255) UNIQUE,
    statut VARCHAR(50) DEFAULT 'en_attente'
);

CREATE TABLE IF NOT EXISTS messagerie (
    id SERIAL PRIMARY KEY,
    id_expediteur INTEGER NOT NULL REFERENCES users(id_user) ON DELETE CASCADE,
    id_destinataire INTEGER NOT NULL REFERENCES users(id_user) ON DELETE CASCADE,
    contenu TEXT NOT NULL,
    date_envoi TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    lu BOOLEAN DEFAULT FALSE,
    id_objet_lie INTEGER
);

CREATE TABLE IF NOT EXISTS notification (
    id SERIAL PRIMARY KEY,
    id_user INTEGER NOT NULL REFERENCES users(id_user) ON DELETE CASCADE,
    titre VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    type VARCHAR(50) NOT NULL,
    est_lu BOOLEAN DEFAULT FALSE,
    lien_redirection VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS newsletter (
    id_newsletter SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    date_inscription TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    id_user INTEGER REFERENCES users(id_user) ON DELETE SET NULL,
    preferences TEXT,
    titre VARCHAR(255),
    contenu TEXT
);