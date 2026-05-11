ALTER TABLE litiges ADD COLUMN IF NOT EXISTS id_senior integer REFERENCES users(id_user);
ALTER TABLE litiges ADD COLUMN IF NOT EXISTS id_pro integer REFERENCES users(id_user);
ALTER TABLE litiges ADD COLUMN IF NOT EXISTS ouvert_par varchar(10) DEFAULT 'senior';
ALTER TABLE litiges ADD COLUMN IF NOT EXISTS statut_detail varchar(50) DEFAULT 'ouvert';
ALTER TABLE litiges ADD COLUMN IF NOT EXISTS decision varchar(20);
ALTER TABLE litiges ADD COLUMN IF NOT EXISTS date_fermeture timestamp with time zone;

CREATE TABLE IF NOT EXISTS litige_message (
    id SERIAL PRIMARY KEY,
    id_litige integer NOT NULL REFERENCES litiges(id_litige) ON DELETE CASCADE,
    id_user integer NOT NULL REFERENCES users(id_user) ON DELETE CASCADE,
    message text NOT NULL,
    date_envoi timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS litige_preuve (
    id SERIAL PRIMARY KEY,
    id_litige integer NOT NULL REFERENCES litiges(id_litige) ON DELETE CASCADE,
    id_user integer NOT NULL REFERENCES users(id_user) ON DELETE CASCADE,
    url_fichier varchar(255) NOT NULL,
    date_upload timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);