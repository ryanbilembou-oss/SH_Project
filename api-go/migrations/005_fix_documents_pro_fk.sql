ALTER TABLE documents_pro
ADD COLUMN IF NOT EXISTS id_categorie INTEGER;

ALTER TABLE documents_pro
ADD CONSTRAINT fk_documents_pro_categorie
FOREIGN KEY (id_categorie) REFERENCES categorie_document(id_categorie);