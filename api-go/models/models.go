package models

import "time"

// Table centrale de connexion
type Users struct {
	Id_user          int       `json:"id_user"`
	Email            string    `json:"email"`
	Password_hash    string    `json:"password_hash"`
	Role             string    `json:"role"`
	Token_session    string    `json:"token_session,omitempty"`
	Date_inscription time.Time `json:"date_inscription"`
}

// Profil spécifique aux Seniors
type Profiles_senior struct {
	Id_user               int    `json:"id_user"`
	Nom                   string `json:"nom"`
	Prenom                string `json:"prenom"`
	Genre                 string `json:"genre"` // homme, femme, autre
	Date_naissance        string `json:"date_naissance"`
	Is_first_login        int    `json:"is_first_login"`
	Is_subscription_valid int    `json:"is_subscription_valid"`
	Adresse               string `json:"adresse"`
	Telephone             string `json:"telephone"`
}

// Profil spécifique aux Prestataires (Professionnels)
type Profiles_pro struct {
	Id_user               int     `json:"id_user"`
	Nom_societe           string  `json:"nom_societe"`
	Genre                 string  `json:"genre"` // Genre du contact principal
	Statut_validation     string  `json:"statut_validation"`
	Is_subscription_valid int     `json:"is_subscription_valid"`
	Siret                 string  `json:"siret"`
	Bio                   string  `json:"bio"`
	Rib                   string  `json:"rib"`
	Telephone_pro         string  `json:"telephone_pro"`
	Logo_url              string  `json:"logo_url"`
	Note_moyenne          float64 `json:"note_moyenne"`
}
        

// Profil spécifique aux Administrateurs
type Profiles_admin struct {
	Id_user   int    `json:"id_user"`
	Nom       string `json:"nom"`
	Prenom    string `json:"prenom"`
	Genre     string `json:"genre"` // homme, femme, autre
	Telephone string `json:"telephone"`
}

type DocumentPro struct {
	IdDoc        int    `json:"id_doc"`
	IdUser       int    `json:"id_user"`
	TypeDoc      string `json:"type_doc"`
	UrlDocument  string `json:"url_document"`
	DateUpload   string `json:"date_upload"`
}