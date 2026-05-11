ALTER TABLE users ADD COLUMN IF NOT EXISTS onesignal_player_id varchar(255);
CREATE TABLE IF NOT EXISTS notification (
    id SERIAL PRIMARY KEY,
    id_user integer NOT NULL REFERENCES users(id_user) ON DELETE CASCADE,
    titre varchar(255) NOT NULL,
    message text NOT NULL,
    type varchar(50) DEFAULT 'info',
    est_lu boolean DEFAULT false,
    lien_redirection varchar(255),
    date_creation timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);