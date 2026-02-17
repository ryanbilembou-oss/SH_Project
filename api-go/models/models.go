package models

import "time"

type Users struct {
	Id_user           int       `json:"id_user"`
	Email             string    `json:"email"`
	Password_hash     string    `json:"password_hash"`
	Role              string    `json:"role"`
	Token_session     string    `json:"token_session,omitempty"`
	Date_inscription  time.Time `json:"date_inscription"`
}

type Profiles_senior struct {
	Id_user         int       `json:"id_user"`
	Nom             string    `json:"nom"`
	Prenom          string    `json:"prenom"`
	Adresse         string    `json:"adresse"`
	Date_naissance  time.Time `json:"date_naissance"`
	Telephone       string    `json:"telephone"`
}

type Profiles_pro struct {
	Id_user            int     `json:"id_user"`
	Nom_societe        string  `json:"nom_societe"`
	Siret              string  `json:"siret"`
	Bio                string  `json:"bio"`
	Statut_validation  string  `json:"statut_validation"`
	Note_moyenne       float64 `json:"note_moyenne"`
	Rib                string  `json:"rib"`
}

type User_settings struct {
	Id_user         int    `json:"id_user"`
	Taille_police   int    `json:"taille_police"`
	Contraste_eleve bool   `json:"contraste_eleve"`
	Langue_preferee string `json:"langue_preferee"`
	Tutoriel_vu     bool   `json:"tutoriel_vu"`
}

type Services_catalogue struct {
	Id_service     int     `json:"id_service"`
	Nom            string  `json:"nom"`
	Categorie      string  `json:"categorie"`
	Prix_standard  float64 `json:"prix_standard"`
	Est_medical    bool    `json:"est_medical"`
}

type Devis_contrats struct {
	Id_devis                int        `json:"id_devis"`
	Id_pro                  int        `json:"id_pro"`
	Id_senior               int        `json:"id_senior"`
	Id_service              int        `json:"id_service"`
	Description_detaillee   string     `json:"description_detaillee"`
	Montant_ht              float64    `json:"montant_ht"`
	Taux_tva                float64    `json:"taux_tva"`
	Montant_commission_sh   float64    `json:"montant_commission_sh"`
	Prix_total_ttc          float64    `json:"prix_total_ttc"`
	Statut_contrat          string     `json:"statut_contrat"`
	Date_emission           time.Time  `json:"date_emission"`
	Date_expiration         time.Time  `json:"date_expiration"`
	Date_signature          *time.Time `json:"date_signature,omitempty"`
}

type Planning_missions struct {
	Id_mission              int       `json:"id_mission"`
	Id_devis                int       `json:"id_devis"`
	Id_pro                  int       `json:"id_pro"`
	Id_senior               int       `json:"id_senior"`
	Date_heure_debut        time.Time `json:"date_heure_debut"`
	Duree_minutes           int       `json:"duree_minutes"`
	Statut_mission          string    `json:"statut_mission"`
	Motif_medical_chiffre   string    `json:"motif_medical_chiffre"`
	Est_anonymise           bool      `json:"est_anonymise"`
}

type Articles struct {
	Id_article          int     `json:"id_article"`
	Nom_produit         string  `json:"nom_produit"`
	Description         string  `json:"description"`
	Prix_unitaire_ttc   float64 `json:"prix_unitaire_ttc"`
	Stock_quantite      int     `json:"stock_quantite"`
	Image_url           string  `json:"image_url"`
}

type Evenements struct {
	Id_event        int       `json:"id_event"`
	Titre           string    `json:"titre"`
	Description     string    `json:"description"`
	Date_event      time.Time `json:"date_event"`
	Lieu            string    `json:"lieu"`
	Nb_places_max   int       `json:"nb_places_max"`
	Prix_ticket     float64   `json:"prix_ticket"`
}

type Paniers struct {
	Id_panier int `json:"id_panier"`
	Id_user   int `json:"id_user"`
}

type Panier_articles struct {
	Id_panier  int `json:"id_panier"`
	Id_article int `json:"id_article"`
	Quantite   int `json:"quantite"`
}

type Abonnements struct {
	Id_abo          int       `json:"id_abo"`
	Id_user         int       `json:"id_user"`
	Type_user       string    `json:"type_user"`
	Type_forfait    string    `json:"type_forfait"`
	Date_debut      time.Time `json:"date_debut"`
	Date_fin        time.Time `json:"date_fin"`
	Statut_paiement string    `json:"statut_paiement"`
}

type Paiements struct {
	Id_paiement            int       `json:"id_paiement"`
	Id_user                int       `json:"id_user"`
	Stripe_transaction_id  string    `json:"stripe_transaction_id"`
	Montant_ttc            float64   `json:"montant_ttc"`
	Date_paiement          time.Time `json:"date_paiement"`
	Statut                 string    `json:"statut"`
}

type Factures struct {
	Id_facture   int       `json:"id_facture"`
	Id_paiement  int       `json:"id_paiement"`
	Url_pdf      string    `json:"url_pdf"`
	Date_emission time.Time `json:"date_emission"`
}

type Messagerie struct {
	Id_message      int       `json:"id_message"`
	Id_expediteur   int       `json:"id_expediteur"`
	Id_destinataire int       `json:"id_destinataire"`
	Id_mission      *int      `json:"id_mission,omitempty"`
	Contenu         string    `json:"contenu"`
	Date_envoi      time.Time `json:"date_envoi"`
	Lu              bool      `json:"lu"`
}

type Documents_pro struct {
	Id_doc               int       `json:"id_doc"`
	Id_pro               int       `json:"id_pro"`
	Id_admin_validateur  *int      `json:"id_admin_validateur,omitempty"`
	Type_doc             string    `json:"type_doc"`
	Url_fichier          string    `json:"url_fichier"`
	Date_depot           time.Time `json:"date_depot"`
	Valide               bool      `json:"valide"`
}

type Logs_systeme struct {
	Id_log          int       `json:"id_log"`
	Id_user         int       `json:"id_user"`
	Action_realisee string    `json:"action_realisee"`
	Table_impactee  string    `json:"table_impactee"`
	Adresse_ip      string    `json:"adresse_ip"`
	Date_action     time.Time `json:"date_action"`
}

type Conseils_cms struct {
	Id_conseil       int       `json:"id_conseil"`
	Id_auteur        int       `json:"id_auteur"`
	Titre            string    `json:"titre"`
	Contenu_html     string    `json:"contenu_html"`
	Categorie        string    `json:"categorie"`
	Date_publication time.Time `json:"date_publication"`
}

type Avis_prestations struct {
	Id_avis          int       `json:"id_avis"`
	Id_mission       int       `json:"id_mission"`
	Note             int       `json:"note"`
	Commentaire      string    `json:"commentaire"`
	Date_publication time.Time `json:"date_publication"`
}

type Notifications struct {
	Id_notif    int       `json:"id_notif"`
	Id_user     int       `json:"id_user"`
	Titre       string    `json:"titre"`
	Message     string    `json:"message"`
	Date_envoi  time.Time `json:"date_envoi"`
	Lu          bool      `json:"lu"`
}