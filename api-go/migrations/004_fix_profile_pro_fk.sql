ALTER TABLE profile_pro
ADD COLUMN IF NOT EXISTS id_type INTEGER;

ALTER TABLE profile_pro
ADD CONSTRAINT fk_profile_pro_type
FOREIGN KEY (id_type) REFERENCES type_prestataire(id_type);