package models

import (
	"time"
)

type Users struct {
	Id_user            int        `json:"id_user"`
	Email              string     `json:"email"`
	Password_hash      string     `json:"-"`
	Role               string     `json:"role"`
	Token_session      *string    `json:"token_session"`
	Date_inscription   *time.Time `json:"date_inscription"`
	Accepte_newsletter bool       `json:"accepte_newsletter"`
}

type CategorieServices struct {
	Id_categorie  int    `json:"id_categorie"`
	Nom_categorie string `json:"nom_categorie"`
}

type CategorieArticle struct {
	Id_categorie  int    `json:"id_categorie"`
	Nom_categorie string `json:"nom_categorie"`
}

type CategorieEvenement struct {
	Id_categorie  int    `json:"id_categorie"`
	Nom_categorie string `json:"nom_categorie"`
}

type Conseil struct {
	Id_conseil int     `json:"id_conseil"`
	Categorie  *string `json:"categorie"`
	Titre      string  `json:"titre"`
	Contenu    string  `json:"contenu"`
}

type ProfileAdmin struct {
	Id_user   int     `json:"id_user"`
	Nom       string  `json:"nom"`
	Prenom    string  `json:"prenom"`
	Genre     *string `json:"genre"`
	Telephone *string `json:"telephone"`
}

type ProfileSenior struct {
	Id_user               int        `json:"id_user"`
	Nom                   string     `json:"nom"`
	Prenom                string     `json:"prenom"`
	Genre                 *string    `json:"genre"`
	Date_naissance        *time.Time `json:"date_naissance"`
	Is_first_login        bool       `json:"is_first_login"`
	Is_subscription_valid bool       `json:"is_subscription_valid"`
	Adresse               *string    `json:"adresse"`
	Telephone             *string    `json:"telephone"`
}

type ProfilePro struct {
	Id_user               int        `json:"id_user"`
	Nom                   string     `json:"nom"`
	Prenom                string     `json:"prenom"`
	Nom_entreprise        *string    `json:"nom_entreprise"`   
	Adresse_pro           *string    `json:"adresse_pro"`      
	Statut_juridique      *string    `json:"statut_juridique"` 
	Date_naissance        *time.Time `json:"date_naissance"`
	Genre                 *string    `json:"genre"`
	Statut_validation     string     `json:"statut_validation"`
	Is_subscription_valid bool       `json:"is_subscription_valid"`
	Siret                 *string    `json:"siret"`
	Bio                   *string    `json:"bio"`
	Rib                   *string    `json:"rib"`
	Id_type               *int       `json:"id_type"`
	Telephone_pro         *string    `json:"telephone_pro"`
	Logo_url              *string    `json:"logo_url"`
	Note_moyenne          float64    `json:"note_moyenne"`
	Commission            float64    `json:"commission"`
}

type Service struct {
	Id             int     `json:"id"`
	Id_categorie   int     `json:"id_categorie"`
	Nom            string  `json:"nom"`
	Description    *string `json:"description"`
	Prix_reference float64 `json:"prix_reference"`
	Image_url      *string `json:"image_url"`
}

type TypePrestataire struct {
	Id_type  int    `json:"id_type"`
	Nom_type string `json:"nom_type"`
}
type OffrePrestataire struct {
	Id_offre          int     `json:"id_offre"`
	Id_pro            *int    `json:"id_pro"`
	Id_service        *int    `json:"id_service"`
	Prix_personnalise float64 `json:"prix_personnalise"`
	Titre             *string `json:"titre"`
	Bio               *string `json:"bio"`
}

type Article struct {
	Id           int     `json:"id"`
	Id_user      *int    `json:"id_user"`
	Id_categorie int     `json:"id_categorie"`
	Nom          string  `json:"nom"`
	Prix         float64 `json:"prix"`
	Bio          *string `json:"bio"`
	Stock        int     `json:"stock"`
	Image_url    *string `json:"image_url"`
}

type Evenements struct {
	Id_evenement  int       `json:"id_evenement"`
	Id_createur   *int      `json:"id_createur"`
	Id_categorie  int       `json:"id_categorie"`
	Titre         string    `json:"titre"`
	Description   *string   `json:"description"`
	Date_heure    time.Time `json:"date_heure"`
	Lieu          string    `json:"lieu"`
	Prix_ticket   float64   `json:"prix_ticket"`
	Nb_places_max int       `json:"nb_places_max"`
	Nb_inscrits   int       `json:"nb_inscrits"`
}
type DocumentsPro struct {
	Id_doc       int        `json:"id_doc"`
	Id_user      int        `json:"id_user"`
	Type_doc     string     `json:"type_doc"`
	Url_document string     `json:"url_document"`
	Date_upload  *time.Time `json:"date_upload"`
	Id_categorie *int       `json:"id_categorie"`
	Statut       string     `json:"statut"`
}
type CategorieDocument struct {
	Id_categorie  int    `json:"id_categorie"`
	Id_type       int    `json:"id_type"`
	Nom_categorie string `json:"nom_categorie"`
}
type PlanningPro struct {
	Id_planning  int    `json:"id_planning"`
	Id_pro       int    `json:"id_pro"`
	Jour_semaine *int   `json:"jour_semaine"`
	Heure_debut  string `json:"heure_debut"`
	Heure_fin    string `json:"heure_fin"`
	Est_actif    bool   `json:"est_actif"`
}

type Intervention struct {
	Id                 int       `json:"id"`
	Id_pro             int       `json:"id_pro"`
	Id_senior          int       `json:"id_senior"`
	Id_service         int       `json:"id_service"`
	Bio_intervention   *string   `json:"bio_intervention"`
	Date_heure_debut   time.Time `json:"date_heure_debut"`
	Date_heure_fin     time.Time `json:"date_heure_fin"`
	Lieu               string    `json:"lieu"`
	Statut             string    `json:"statut"`
	Commission_montant float64   `json:"commission_montant"`
	Prix               float64   `json:"prix"`
	Est_medical        bool      `json:"est_medical"`
}

type Devis struct {
	Id_devis        int       `json:"id_devis"`
	Id_pro          int       `json:"id_pro"`
	Id_senior       int       `json:"id_senior"`
	Id_service      int       `json:"id_service"`
	Id_intervention *int      `json:"id_intervention"`
	Montant_ht      float64   `json:"montant_ht"`
	Montant_ttc     float64   `json:"montant_ttc"`
	Taux_commission float64   `json:"taux_commission"`
	Date_validite   time.Time `json:"date_validite"`
	Statut          string    `json:"statut"`
}

type Facture struct {
	Id_facture      int     `json:"id_facture"`
	Id_emetteur     int     `json:"id_emetteur"`
	Id_recepteur    int     `json:"id_recepteur"`
	Id_intervention *int    `json:"id_intervention"`
	Montant_ht      float64 `json:"montant_ht"`
	Montant_ttc     float64 `json:"montant_ttc"`
	Commission_sh   float64 `json:"commission_sh"`
	Pdf_url         string  `json:"pdf_url"`
}

type NoteAvis struct {
	Id_avis          int        `json:"id_avis"`
	Id_intervention  *int       `json:"id_intervention"`
	Note             int        `json:"note"`
	Commentaire      *string    `json:"commentaire"`
	Date_publication *time.Time `json:"date_publication"`
}

type Litiges struct {
	Id_litige      int        `json:"id_litige"`
	Id_intervention int       `json:"id_intervention"`
	Motif          string     `json:"motif"`
	Statut         string     `json:"statut"`
	Date_ouverture *time.Time `json:"date_ouverture"`
}

type PlanningSenior struct {
	Id_agenda           int        `json:"id_agenda"`
	Id_senior           int        `json:"id_senior"`
	Id_intervention     *int       `json:"id_intervention"`
	Rappel_notification *time.Time `json:"rappel_notification"`
	Note_perso          *string    `json:"note_perso"`
}

type Abonnement struct {
	Id_abonnement          int       `json:"id_abonnement"`
	Id_user                int       `json:"id_user"`
	Type_abonnement        string    `json:"type_abonnement"`
	Prix_abonnement        float64   `json:"prix_abonnement"`
	Date_debut             time.Time `json:"date_debut"`
	Date_fin               time.Time `json:"date_fin"`
	Stripe_subscription_id string    `json:"stripe_subscription_id"`
}

type Paiements struct {
	Id_paiement        int        `json:"id_paiement"`
	Id_user            int        `json:"id_user"`
	Prix               float64    `json:"prix"`
	Type_objet         string     `json:"type_objet"`
	Id_objet           int        `json:"id_objet"`
	Date               *time.Time `json:"date"`
	Stripe_session_id  *string    `json:"stripe_session_id"`
	Stripe_paiement_id *string    `json:"stripe_paiement_id"`
	Statut             string     `json:"statut"`
}

type Messagerie struct {
	Id              int        `json:"id"`
	Id_expediteur   int        `json:"id_expediteur"`
	Id_destinataire int        `json:"id_destinataire"`
	Contenu         string     `json:"contenu"`
	Date_envoi      *time.Time `json:"date_envoi"`
	Lu              bool       `json:"lu"`
	Id_objet_lie    *int       `json:"id_objet_lie"`
}

type Notification struct {
	Id               int     `json:"id"`
	Id_user          int     `json:"id_user"`
	Titre            string  `json:"titre"`
	Message          string  `json:"message"`
	Type             string  `json:"type"`
	Est_lu           bool    `json:"est_lu"`
	Lien_redirection *string `json:"lien_redirection"`
}

type Newsletter struct {
	Id_newsletter    int        `json:"id_newsletter"`
	Email            string     `json:"email"`
	Date_inscription *time.Time `json:"date_inscription"`
	Id_user          *int       `json:"id_user"`
	Preferences      *string    `json:"preferences"`
	Titre            *string    `json:"titre"`
	Contenu          *string    `json:"contenu"`
}