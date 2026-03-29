package documents_pro

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"silver-happy-api/database"
	"strconv"
	"strings"
	"time"
)

func UploadDocument(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}

	if r.Method != http.MethodPost {
		http.Error(w, `{"erreur": "Méthode non autorisée"}`, http.StatusMethodNotAllowed)
		return
	}

	// Parse multipart form — max 10MB
	if err := r.ParseMultipartForm(10 << 20); err != nil {
		http.Error(w, `{"erreur": "Fichier trop volumineux (max 10MB)"}`, http.StatusBadRequest)
		return
	}

	idUserStr := r.FormValue("id_user")
	idCategorieStr := r.FormValue("id_categorie")
	typeDoc := r.FormValue("type_doc")

	idUser, err := strconv.Atoi(idUserStr)
	if err != nil || idUser == 0 {
		http.Error(w, `{"erreur": "id_user invalide"}`, http.StatusBadRequest)
		return
	}

	idCategorie, _ := strconv.Atoi(idCategorieStr)

	file, handler, err := r.FormFile("fichier")
	if err != nil {
		http.Error(w, `{"erreur": "Fichier manquant"}`, http.StatusBadRequest)
		return
	}
	defer file.Close()

	// Crée le dossier uploads si inexistant
	uploadDir := fmt.Sprintf("uploads/documents_pro/%d", idUser)
	if err := os.MkdirAll(uploadDir, 0755); err != nil {
		log.Printf("❌ UploadDocument - Erreur création dossier: %v", err)
		http.Error(w, `{"erreur": "Erreur serveur"}`, http.StatusInternalServerError)
		return
	}

	// Nom de fichier unique
	ext := filepath.Ext(handler.Filename)
	filename := fmt.Sprintf("%d_%s%s", time.Now().UnixNano(), strings.ReplaceAll(typeDoc, " ", "_"), ext)
	filePath := filepath.Join(uploadDir, filename)

	// Sauvegarde le fichier
	dst, err := os.Create(filePath)
	if err != nil {
		log.Printf("❌ UploadDocument - Erreur création fichier: %v", err)
		http.Error(w, `{"erreur": "Erreur sauvegarde fichier"}`, http.StatusInternalServerError)
		return
	}
	defer dst.Close()
	io.Copy(dst, file)

	// URL publique
	urlDocument := fmt.Sprintf("/uploads/documents_pro/%d/%s", idUser, filename)

	// Insère en BDD
	var idDoc int
	var query string
	var execErr error

	if idCategorie > 0 {
		query = `INSERT INTO documents_pro (id_user, type_doc, url_document, date_upload, id_categorie, statut) VALUES ($1, $2, $3, NOW(), $4, 'en_attente') RETURNING id_doc`
		execErr = database.DB.QueryRow(query, idUser, typeDoc, urlDocument, idCategorie).Scan(&idDoc)
	} else {
		query = `INSERT INTO documents_pro (id_user, type_doc, url_document, date_upload, statut) VALUES ($1, $2, $3, NOW(), 'en_attente') RETURNING id_doc`
		execErr = database.DB.QueryRow(query, idUser, typeDoc, urlDocument).Scan(&idDoc)
	}

	if execErr != nil {
		log.Printf("❌ UploadDocument - Erreur SQL: %v", execErr)
		http.Error(w, `{"erreur": "Erreur base de données"}`, http.StatusInternalServerError)
		return
	}

	log.Printf("✅ Document uploadé pour user %d : %s", idUser, filePath)
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]interface{}{
		"status":     "success",
		"id_doc":     idDoc,
		"url":        urlDocument,
	})
}