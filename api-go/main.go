package main

import (
	"fmt"
	"log"
	"net/http"
	"silver-happy-api/database" 
	"silver-happy-api/handlers/admin"
	"silver-happy-api/handlers/users"
	"silver-happy-api/handlers/admin/evenement"
	"silver-happy-api/handlers/admin/article" 
	"silver-happy-api/handlers/admin/evenement/categorie_evenement"
	"silver-happy-api/handlers/admin/article/categorie_article"
	"silver-happy-api/handlers/admin/service"
	"silver-happy-api/handlers/admin/service/categorie_service"
	"silver-happy-api/handlers/admin/intervention"
	"silver-happy-api/handlers/admin/devis"
	"silver-happy-api/handlers/admin/facture"
	"silver-happy-api/handlers/admin/note_avis"
	"silver-happy-api/handlers/admin/conseil"
	"silver-happy-api/handlers/admin/type_prestataire"
	"silver-happy-api/handlers/admin/categorie_documents"
	"silver-happy-api/handlers/admin/documents_pro"
	"silver-happy-api/handlers/admin/offre_prestataire"
	"silver-happy-api/handlers/admin/planning_pro"
	"silver-happy-api/handlers/admin/planning_senior"
	"silver-happy-api/handlers/admin/litiges"
	"silver-happy-api/handlers/admin/messagerie"
	"silver-happy-api/handlers/admin/newsletter"
	profile_senior "silver-happy-api/handlers/admin/profile/profile_senior"
	profile_pro    "silver-happy-api/handlers/admin/profile/profile_pro"
	profile_admin  "silver-happy-api/handlers/admin/profile/profile_admin"
	inscription_evenement "silver-happy-api/handlers/admin/inscription_evenement"
	"silver-happy-api/handlers/admin/panier"
	"silver-happy-api/handlers/admin/demande_service"

 	abonnement_handler "silver-happy-api/handlers/admin/abonnement"
	stripe_handler "silver-happy-api/handlers/admin/stripe"
	tpc "silver-happy-api/handlers/admin/type_prestataire_categorie"
	nego "silver-happy-api/handlers/admin/negociation_commission"
	ref "silver-happy-api/handlers/admin/referencement"
	virement "silver-happy-api/handlers/admin/virement"
	"silver-happy-api/jobs"
	notification "silver-happy-api/handlers/admin/notification"

)


func main() {
	database.Connect()
	database.RunMigrations()
	jobs.StartVirementAuto(database.DB)

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "Bienvenue sur l'API Go de Silver Happy !")
	})
	

	http.HandleFunc("/register", users.RegisterUser)
	http.HandleFunc("/login", users.LoginUser)

	http.HandleFunc("/admin/users", admin.GetAllUsers)
	http.HandleFunc("/admin/users/delete", admin.DeleteUser)
	http.HandleFunc("/admin/users/create", admin.CreateUser)
	http.HandleFunc("/admin/users/update", admin.UpdateUser)
	http.HandleFunc("/admin/users/get", admin.GetUser)

	http.HandleFunc("/admin/evenement/create", evenement.CreateEvenement)
	http.HandleFunc("/admin/evenement/get", evenement.GetAllEvenements)
	http.HandleFunc("/admin/evenement/getone", evenement.GetEvenement)
	http.HandleFunc("/admin/evenement/delete", evenement.DeleteEvenement)
	http.HandleFunc("/admin/evenement/update", evenement.UpdateEvenement)


	http.HandleFunc("/admin/article/get",  article.GetAllArticles)
	http.HandleFunc("/admin/article/getone",     article.GetArticle)
	http.HandleFunc("/admin/article/create",   article.CreateArticle)
	http.HandleFunc("/admin/article/update", article.UpdateArticle)
	http.HandleFunc("/admin/article/delete", article.DeleteArticle)
	http.HandleFunc("/admin/evenement/categorie_evenement/create", categorie_evenement.CreateCategorieEvenement)
	http.HandleFunc("/admin/evenement/categorie_evenement/get", categorie_evenement.GetCategorieEvenement)

	http.HandleFunc("/admin/evenement/categorie_evenement/delete", categorie_evenement.DeleteCategorieEvenement)
	http.HandleFunc("/admin/evenement/categorie_evenement/update", categorie_evenement.UpdateCategorieEvenement)
	http.HandleFunc("/admin/evenement/categorie_evenement/getone", categorie_evenement.GetOneCategorieEvenement)
	http.HandleFunc("/admin/article/categorie_article/get",	categorie_article.GetCategorieArticle)
	http.HandleFunc("/admin/article/categorie_article/getone", categorie_article.GetOneCategorieArticle)
	http.HandleFunc("/admin/article/categorie_article/create", categorie_article.CreateCategorieArticle)
	http.HandleFunc("/admin/article/categorie_article/update", categorie_article.UpdateCategorieArticle)
	http.HandleFunc("/admin/article/categorie_article/delete", categorie_article.DeleteCategorieArticle)

	

	http.HandleFunc("/admin/service/create", service.CreateService)
	http.HandleFunc("/admin/service/get", service.GetAllServices)
	http.HandleFunc("/admin/service/getone", service.GetService)
	http.HandleFunc("/admin/service/delete", service.DeleteService)
	http.HandleFunc("/admin/service/update", service.UpdateService)

	http.HandleFunc("/admin/service/categorie_service/create", categorie_service.CreateCategorieService)
  http.HandleFunc("/admin/service/categorie_service/get",    categorie_service.GetCategoriesService)
  http.HandleFunc("/admin/service/categorie_service/getone", categorie_service.GetOneCategorieService)
  http.HandleFunc("/admin/service/categorie_service/update", categorie_service.UpdateCategorieService)
  http.HandleFunc("/admin/service/categorie_service/delete", categorie_service.DeleteCategorieService)

	http.HandleFunc("/admin/intervention/create", intervention.CreateIntervention)
	http.HandleFunc("/admin/intervention/get", intervention.GetAllInterventions)
	http.HandleFunc("/admin/intervention/getone", intervention.GetIntervention)
	http.HandleFunc("/admin/intervention/update", intervention.UpdateIntervention)
	http.HandleFunc("/admin/intervention/delete", intervention.DeleteIntervention)

	http.HandleFunc("/admin/devis/create", devis.CreateDevis)
	http.HandleFunc("/admin/devis/get", devis.GetAllDevis)
	http.HandleFunc("/admin/devis/getone", devis.GetDevis)
	http.HandleFunc("/admin/devis/update", devis.UpdateDevis)
	http.HandleFunc("/admin/devis/delete", devis.DeleteDevis)

	http.HandleFunc("/admin/facture/create", facture.CreateFacture)
	http.HandleFunc("/admin/facture/get", facture.GetAllFactures)
	http.HandleFunc("/admin/facture/getone", facture.GetFacture)
	http.HandleFunc("/admin/facture/delete", facture.DeleteFacture)

	http.HandleFunc("/admin/note_avis/create", note_avis.CreateNoteAvis)
	http.HandleFunc("/admin/note_avis/get", note_avis.GetAllNotesAvis)
	http.HandleFunc("/admin/note_avis/getone", note_avis.GetNoteAvis)
	http.HandleFunc("/admin/note_avis/delete", note_avis.DeleteNoteAvis)




	http.HandleFunc("/admin/conseil/create", conseil.CreateConseil)
	http.HandleFunc("/admin/conseil/get", conseil.GetAllConseils)
	http.HandleFunc("/admin/conseil/getone", conseil.GetConseil)
	http.HandleFunc("/admin/conseil/update", conseil.UpdateConseil)
	http.HandleFunc("/admin/conseil/delete", conseil.DeleteConseil)



	http.HandleFunc("/admin/type_prestataire/get", type_prestataire.GetAllTypesPrestataire)
	http.HandleFunc("/admin/type_prestataire/getone", type_prestataire.GetTypePrestataire)
	http.HandleFunc("/admin/type_prestataire/create", type_prestataire.CreateTypePrestataire)
	http.HandleFunc("/admin/type_prestataire/update", type_prestataire.UpdateTypePrestataire)
	http.HandleFunc("/admin/type_prestataire/delete", type_prestataire.DeleteTypePrestataire)


	http.HandleFunc("/admin/categorie_document/get", categorie_document.GetAllCategorieDocument)
	http.HandleFunc("/admin/categorie_document/getone", categorie_document.GetCategorieDocument)
	http.HandleFunc("/admin/categorie_document/create", categorie_document.CreateCategorieDocument)
	http.HandleFunc("/admin/categorie_document/update", categorie_document.UpdateCategorieDocument)
	http.HandleFunc("/admin/categorie_document/delete", categorie_document.DeleteCategorieDocument)


	http.HandleFunc("/admin/offre_prestataire/get", offre_prestataire.GetAllOffresPrestataire)
	http.HandleFunc("/admin/offre_prestataire/getone", offre_prestataire.GetOffrePrestataire)
	http.HandleFunc("/admin/offre_prestataire/create", offre_prestataire.CreateOffrePrestataire)
	http.HandleFunc("/admin/offre_prestataire/update", offre_prestataire.UpdateOffrePrestataire)
	http.HandleFunc("/admin/offre_prestataire/delete", offre_prestataire.DeleteOffrePrestataire)

	http.HandleFunc("/admin/documents_pro/get", documents_pro.GetAllDocumentsPro)
	http.HandleFunc("/admin/documents_pro/getone", documents_pro.GetDocumentPro)
	http.HandleFunc("/admin/documents_pro/create", documents_pro.CreateDocumentPro)
	http.HandleFunc("/admin/documents_pro/update", documents_pro.UpdateDocumentPro)
	http.HandleFunc("/admin/documents_pro/delete", documents_pro.DeleteDocumentPro)

	http.HandleFunc("/admin/planning_pro/get", planning_pro.GetAllPlanningPro)
	http.HandleFunc("/admin/planning_pro/getone", planning_pro.GetPlanningPro)
	http.HandleFunc("/admin/planning_pro/create", planning_pro.CreatePlanningPro)
	http.HandleFunc("/admin/planning_pro/update", planning_pro.UpdatePlanningPro)
	http.HandleFunc("/admin/planning_pro/delete", planning_pro.DeletePlanningPro)


	http.HandleFunc("/admin/planning_senior/get", planning_senior.GetAllPlanningSenior)
	http.HandleFunc("/admin/planning_senior/getone", planning_senior.GetPlanningSenior)
	http.HandleFunc("/admin/planning_senior/create", planning_senior.CreatePlanningSenior)
	http.HandleFunc("/admin/planning_senior/update", planning_senior.UpdatePlanningSenior)
	http.HandleFunc("/admin/planning_senior/delete", planning_senior.DeletePlanningSenior)

	http.HandleFunc("/admin/litiges/get", litiges.GetAllLitiges)
	http.HandleFunc("/admin/litiges/getone", litiges.GetOneLitige)
	http.HandleFunc("/admin/litiges/get_by_user", litiges.GetLitigesByUser)
	http.HandleFunc("/admin/litiges/create", litiges.CreateLitige)
	http.HandleFunc("/admin/litiges/update", litiges.UpdateLitige)
	http.HandleFunc("/admin/litiges/delete", litiges.DeleteLitige)
	http.HandleFunc("/admin/litiges/messages/get", litiges.GetMessages)
	http.HandleFunc("/admin/litiges/messages/send", litiges.SendMessage)



	

	http.HandleFunc("/admin/messagerie/get", messagerie.GetAllMessages)
	http.HandleFunc("/admin/messagerie/getone", messagerie.GetMessage)
	http.HandleFunc("/admin/messagerie/create", messagerie.CreateMessage)
	http.HandleFunc("/admin/messagerie/update", messagerie.UpdateMessage)
	http.HandleFunc("/admin/messagerie/delete", messagerie.DeleteMessage)


	http.HandleFunc("/admin/newsletter/get", newsletter.GetAllNewsletter)
	http.HandleFunc("/admin/newsletter/getone", newsletter.GetNewsletter)
	http.HandleFunc("/admin/newsletter/create", newsletter.CreateNewsletter)
	http.HandleFunc("/admin/newsletter/update", newsletter.UpdateNewsletter)
	http.HandleFunc("/admin/newsletter/delete", newsletter.DeleteNewsletter)

	
	http.HandleFunc("/admin/profile_senior/get", profile_senior.GetAllProfileSenior)
	http.HandleFunc("/admin/profile_senior/getone", profile_senior.GetProfileSenior)
	http.HandleFunc("/admin/profile_senior/update", profile_senior.UpdateProfileSenior)
	http.HandleFunc("/admin/profile_senior/delete", profile_senior.DeleteProfileSenior)


	http.HandleFunc("/admin/profile_pro/get", profile_pro.GetAllProfilePro)
	http.HandleFunc("/admin/profile_pro/getone", profile_pro.GetProfilePro)
	http.HandleFunc("/admin/profile_pro/update", profile_pro.UpdateProfilePro)
	http.HandleFunc("/admin/profile_pro/delete", profile_pro.DeleteProfilePro)


	http.HandleFunc("/admin/profile_admin/get", profile_admin.GetAllProfileAdmin)
	http.HandleFunc("/admin/profile_admin/getone", profile_admin.GetProfileAdmin)
	http.HandleFunc("/admin/profile_admin/update", profile_admin.UpdateProfileAdmin)
	http.HandleFunc("/admin/profile_admin/delete", profile_admin.DeleteProfileAdmin)

	http.HandleFunc("/admin/profile_admin/get_with_users", profile_admin.GetAllAdminsWithUsers)
	http.HandleFunc("/admin/profile_pro/get_with_users", profile_pro.GetAllProsWithUsers)
	http.HandleFunc("/admin/profile_senior/get_with_users", profile_senior.GetAllSeniorsWithUsers)

	http.HandleFunc("/admin/profile_senior/create", profile_senior.CreateProfileSenior)
	http.HandleFunc("/admin/profile_pro/create", profile_pro.CreateProfilePro)
	http.HandleFunc("/admin/profile_admin/create", profile_admin.CreateProfileAdmin)

	http.HandleFunc("/admin/inscription_evenement/get", inscription_evenement.GetAllInscriptions)
	http.HandleFunc("/admin/inscription_evenement/get_by_user", inscription_evenement.GetInscriptionsByUser)
	http.HandleFunc("/admin/inscription_evenement/create", inscription_evenement.CreateInscription)
	http.HandleFunc("/admin/inscription_evenement/delete", inscription_evenement.DeleteInscription)

	http.HandleFunc("/admin/documents_pro/upload", documents_pro.UploadDocument)
	http.HandleFunc("/admin/documents_pro/validate", documents_pro.ValidateDocument)


	http.HandleFunc("/admin/profile_pro/update_statut", profile_pro.UpdateStatutValidation)
	http.HandleFunc("/senior/planning/get", planning_senior.GetPlanningSeniorByUser)

	http.HandleFunc("/admin/panier/get", panier.GetPanier)
	http.HandleFunc("/admin/panier/add", panier.AddPanier)
	http.HandleFunc("/admin/panier/delete", panier.DeletePanier)
	http.HandleFunc("/admin/panier/update", panier.UpdateQuantite)
	http.HandleFunc("/admin/panier/vider", panier.ViderPanier)

	http.HandleFunc("/admin/devis/get_by_senior", devis.GetDevisBySenior)
	http.HandleFunc("/admin/demande_service/create", demande_service.CreateDemande)
	http.HandleFunc("/admin/demande_service/get", demande_service.GetAllDemandes)
	http.HandleFunc("/admin/demande_service/get_by_senior", demande_service.GetDemandesBySenior)
	http.HandleFunc("/admin/demande_service/update", demande_service.UpdateStatutDemande)
	http.HandleFunc("/admin/demande_service/delete", demande_service.DeleteDemande)
	http.HandleFunc("/admin/offre_prestataire/get_by_service", offre_prestataire.GetOffresByService)
	http.HandleFunc("/admin/devis/update_statut", devis.UpdateStatutDevis)

	http.HandleFunc("/admin/abonnement/get_by_user", abonnement_handler.GetByUser)
	http.HandleFunc("/admin/abonnement/create", abonnement_handler.CreateAbonnement)
	http.HandleFunc("/admin/abonnement/resilier", abonnement_handler.ResilierAbonnement)
	
	http.HandleFunc("/admin/stripe/checkout/abonnement", stripe_handler.CheckoutAbonnement)
	http.HandleFunc("/admin/stripe/checkout/article", stripe_handler.CheckoutArticle)
	http.HandleFunc("/admin/stripe/checkout/evenement", stripe_handler.CheckoutEvenement)
	http.HandleFunc("/admin/stripe/webhook", stripe_handler.Webhook)
	http.HandleFunc("/admin/stripe/checkout/panier", stripe_handler.CheckoutPanier)

	http.HandleFunc("/admin/type_prestataire_categorie/get",          tpc.GetAllTypePrestataireCategorie)
	http.HandleFunc("/admin/type_prestataire_categorie/get_by_type",  tpc.GetCategoriesByType)
	http.HandleFunc("/admin/type_prestataire_categorie/create",       tpc.CreateTypePrestataireCategorie)
	http.HandleFunc("/admin/type_prestataire_categorie/delete",       tpc.DeleteTypePrestataireCategorie)
	http.HandleFunc("/admin/type_prestataire_categorie/delete_by_type", tpc.DeleteAllByType)

	http.HandleFunc("/admin/stripe/checkout/intervention", stripe_handler.CheckoutIntervention)
	http.HandleFunc("/admin/negociation_commission/get",        nego.GetAll)
	http.HandleFunc("/admin/negociation_commission/get_by_pro", nego.GetByPro)
	http.HandleFunc("/admin/negociation_commission/create",     nego.Create)
	http.HandleFunc("/admin/negociation_commission/repondre",   nego.Repondre)
	http.HandleFunc("/admin/referencement/get_actifs",    ref.GetActifs)
	http.HandleFunc("/admin/referencement/get_by_pro",    ref.GetByPro)
	http.HandleFunc("/admin/referencement/checkout",      ref.Checkout)

	http.HandleFunc("/admin/referencement/get_tous", ref.GetTous)
	http.HandleFunc("/admin/facture/generate_pdfs", facture.GenerateMissingPDFs)

	http.HandleFunc("/admin/virement/trigger", virement.TriggerVirement)
	http.HandleFunc("/admin/virement/get_by_pro", virement.GetVirementsByPro)
	http.HandleFunc("/admin/virement/get_all", virement.GetAllVirements)
	http.HandleFunc("/admin/stripe/refund/intervention", stripe_handler.RefundIntervention)
	http.HandleFunc("/admin/users/ban", admin.BanUser)
	http.HandleFunc("/admin/users/unban", admin.UnbanUser)
	http.HandleFunc("/admin/notification/get", notification.GetByUser)
	http.HandleFunc("/admin/notification/marquer_lu", notification.MarquerLu)
	http.HandleFunc("/admin/notification/save_player_id", notification.SavePlayerID)
	http.HandleFunc("/admin/notification/envoyer_a_tous", notification.EnvoyerATous)



	fmt.Println(" API Go lancée et connectée à PostgreSQL sur le port 8081...")
	log.Fatal(http.ListenAndServe(":8081", nil))
}