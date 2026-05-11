--
-- PostgreSQL database dump
--

\restrict XHvgxM7pYSh4RmxgpX3vj4gypK5GFTgECmRCXEZ2t9H5zZN2aVmMqd1NDFO91AS

-- Dumped from database version 16.13
-- Dumped by pg_dump version 16.13

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: abonnement; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.abonnement (
    id_abonnement integer NOT NULL,
    id_user integer NOT NULL,
    type_abonnement character varying(50) NOT NULL,
    prix_abonnement numeric(10,2) NOT NULL,
    date_debut timestamp with time zone NOT NULL,
    date_fin timestamp with time zone NOT NULL,
    stripe_subscription_id character varying(255),
    statut character varying(20) DEFAULT 'actif'::character varying,
    date_resiliation timestamp with time zone
);


ALTER TABLE public.abonnement OWNER TO postgres;

--
-- Name: abonnement_id_abonnement_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.abonnement_id_abonnement_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.abonnement_id_abonnement_seq OWNER TO postgres;

--
-- Name: abonnement_id_abonnement_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.abonnement_id_abonnement_seq OWNED BY public.abonnement.id_abonnement;


--
-- Name: article; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.article (
    id integer NOT NULL,
    id_user integer,
    id_categorie integer NOT NULL,
    nom character varying(150) NOT NULL,
    prix numeric(10,2) NOT NULL,
    bio text,
    stock integer DEFAULT 0,
    image_url character varying(255),
    CONSTRAINT article_stock_check CHECK ((stock >= 0))
);


ALTER TABLE public.article OWNER TO postgres;

--
-- Name: article_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.article_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.article_id_seq OWNER TO postgres;

--
-- Name: article_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.article_id_seq OWNED BY public.article.id;


--
-- Name: categorie_article; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.categorie_article (
    id_categorie integer NOT NULL,
    nom_categorie character varying(100) NOT NULL
);


ALTER TABLE public.categorie_article OWNER TO postgres;

--
-- Name: categorie_article_id_categorie_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.categorie_article_id_categorie_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.categorie_article_id_categorie_seq OWNER TO postgres;

--
-- Name: categorie_article_id_categorie_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.categorie_article_id_categorie_seq OWNED BY public.categorie_article.id_categorie;


--
-- Name: categorie_document; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.categorie_document (
    id_categorie integer NOT NULL,
    id_type integer NOT NULL,
    nom_categorie character varying(100) NOT NULL
);


ALTER TABLE public.categorie_document OWNER TO postgres;

--
-- Name: categorie_document_id_categorie_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.categorie_document_id_categorie_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.categorie_document_id_categorie_seq OWNER TO postgres;

--
-- Name: categorie_document_id_categorie_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.categorie_document_id_categorie_seq OWNED BY public.categorie_document.id_categorie;


--
-- Name: categorie_evenement; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.categorie_evenement (
    id_categorie integer NOT NULL,
    nom_categorie character varying(100) NOT NULL
);


ALTER TABLE public.categorie_evenement OWNER TO postgres;

--
-- Name: categorie_evenement_id_categorie_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.categorie_evenement_id_categorie_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.categorie_evenement_id_categorie_seq OWNER TO postgres;

--
-- Name: categorie_evenement_id_categorie_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.categorie_evenement_id_categorie_seq OWNED BY public.categorie_evenement.id_categorie;


--
-- Name: categorie_services; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.categorie_services (
    id_categorie integer NOT NULL,
    nom_categorie character varying(100) NOT NULL
);


ALTER TABLE public.categorie_services OWNER TO postgres;

--
-- Name: categorie_services_id_categorie_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.categorie_services_id_categorie_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.categorie_services_id_categorie_seq OWNER TO postgres;

--
-- Name: categorie_services_id_categorie_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.categorie_services_id_categorie_seq OWNED BY public.categorie_services.id_categorie;


--
-- Name: conseil; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.conseil (
    id_conseil integer NOT NULL,
    categorie character varying(100),
    titre character varying(255) NOT NULL,
    contenu text NOT NULL
);


ALTER TABLE public.conseil OWNER TO postgres;

--
-- Name: conseil_id_conseil_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.conseil_id_conseil_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.conseil_id_conseil_seq OWNER TO postgres;

--
-- Name: conseil_id_conseil_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.conseil_id_conseil_seq OWNED BY public.conseil.id_conseil;


--
-- Name: demande_service; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.demande_service (
    id_demande integer NOT NULL,
    id_senior integer NOT NULL,
    id_offre integer NOT NULL,
    date_souhaitee date NOT NULL,
    message text,
    statut character varying(50) DEFAULT 'en_attente'::character varying,
    date_creation timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.demande_service OWNER TO postgres;

--
-- Name: demande_service_id_demande_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.demande_service_id_demande_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.demande_service_id_demande_seq OWNER TO postgres;

--
-- Name: demande_service_id_demande_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.demande_service_id_demande_seq OWNED BY public.demande_service.id_demande;


--
-- Name: devis; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.devis (
    id_devis integer NOT NULL,
    id_pro integer NOT NULL,
    id_senior integer NOT NULL,
    id_service integer NOT NULL,
    id_intervention integer,
    montant_ht numeric(10,2) NOT NULL,
    montant_ttc numeric(10,2) NOT NULL,
    taux_commission numeric(5,2) NOT NULL,
    date_validite date NOT NULL,
    statut character varying(50) DEFAULT 'en_attente'::character varying,
    CONSTRAINT devis_statut_check CHECK (((statut)::text = ANY ((ARRAY['en_attente'::character varying, 'accepte'::character varying, 'refuse'::character varying, 'paye'::character varying, 'annule'::character varying])::text[])))
);


ALTER TABLE public.devis OWNER TO postgres;

--
-- Name: devis_id_devis_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.devis_id_devis_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.devis_id_devis_seq OWNER TO postgres;

--
-- Name: devis_id_devis_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.devis_id_devis_seq OWNED BY public.devis.id_devis;


--
-- Name: documents_pro; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.documents_pro (
    id_doc integer NOT NULL,
    id_user integer NOT NULL,
    type_doc character varying(100) NOT NULL,
    url_document character varying(255) NOT NULL,
    date_upload timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    id_categorie integer,
    statut character varying(50) DEFAULT 'en_attente'::character varying
);


ALTER TABLE public.documents_pro OWNER TO postgres;

--
-- Name: documents_pro_id_doc_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.documents_pro_id_doc_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.documents_pro_id_doc_seq OWNER TO postgres;

--
-- Name: documents_pro_id_doc_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.documents_pro_id_doc_seq OWNED BY public.documents_pro.id_doc;


--
-- Name: evenements; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.evenements (
    id_evenement integer NOT NULL,
    id_createur integer,
    id_categorie integer NOT NULL,
    titre character varying(150) NOT NULL,
    description text,
    date_heure timestamp with time zone NOT NULL,
    lieu text NOT NULL,
    prix_ticket numeric(10,2) NOT NULL,
    nb_places_max integer NOT NULL,
    nb_inscrits integer DEFAULT 0,
    CONSTRAINT evenements_nb_places_max_check CHECK ((nb_places_max > 0))
);


ALTER TABLE public.evenements OWNER TO postgres;

--
-- Name: evenements_id_evenement_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.evenements_id_evenement_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.evenements_id_evenement_seq OWNER TO postgres;

--
-- Name: evenements_id_evenement_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.evenements_id_evenement_seq OWNED BY public.evenements.id_evenement;


--
-- Name: facture; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.facture (
    id_facture integer NOT NULL,
    id_emetteur integer NOT NULL,
    id_recepteur integer NOT NULL,
    id_intervention integer,
    montant_ht numeric(10,2) NOT NULL,
    montant_ttc numeric(10,2) NOT NULL,
    commission_sh numeric(10,2) NOT NULL,
    pdf_url character varying(255),
    type_achat character varying(50),
    id_achat integer,
    details_json text
);


ALTER TABLE public.facture OWNER TO postgres;

--
-- Name: facture_id_facture_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.facture_id_facture_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.facture_id_facture_seq OWNER TO postgres;

--
-- Name: facture_id_facture_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.facture_id_facture_seq OWNED BY public.facture.id_facture;


--
-- Name: inscription_evenement; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.inscription_evenement (
    id integer NOT NULL,
    id_user integer NOT NULL,
    id_evenement integer NOT NULL,
    date_inscription timestamp with time zone DEFAULT now(),
    statut character varying(50) DEFAULT 'inscrit'::character varying
);


ALTER TABLE public.inscription_evenement OWNER TO postgres;

--
-- Name: inscription_evenement_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.inscription_evenement_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.inscription_evenement_id_seq OWNER TO postgres;

--
-- Name: inscription_evenement_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.inscription_evenement_id_seq OWNED BY public.inscription_evenement.id;


--
-- Name: intervention; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.intervention (
    id integer NOT NULL,
    id_pro integer NOT NULL,
    id_senior integer NOT NULL,
    id_service integer NOT NULL,
    bio_intervention text,
    date_heure_debut timestamp with time zone NOT NULL,
    date_heure_fin timestamp with time zone NOT NULL,
    lieu text NOT NULL,
    statut character varying(50) DEFAULT 'planifiee'::character varying,
    commission_montant numeric(10,2) NOT NULL,
    prix numeric(10,2) NOT NULL,
    est_medical boolean DEFAULT false
);


ALTER TABLE public.intervention OWNER TO postgres;

--
-- Name: intervention_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.intervention_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.intervention_id_seq OWNER TO postgres;

--
-- Name: intervention_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.intervention_id_seq OWNED BY public.intervention.id;


--
-- Name: litige_message; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.litige_message (
    id integer NOT NULL,
    id_litige integer NOT NULL,
    id_user integer NOT NULL,
    message text NOT NULL,
    date_envoi timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.litige_message OWNER TO postgres;

--
-- Name: litige_message_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.litige_message_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.litige_message_id_seq OWNER TO postgres;

--
-- Name: litige_message_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.litige_message_id_seq OWNED BY public.litige_message.id;


--
-- Name: litige_preuve; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.litige_preuve (
    id integer NOT NULL,
    id_litige integer NOT NULL,
    id_user integer NOT NULL,
    url_fichier character varying(255) NOT NULL,
    date_upload timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.litige_preuve OWNER TO postgres;

--
-- Name: litige_preuve_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.litige_preuve_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.litige_preuve_id_seq OWNER TO postgres;

--
-- Name: litige_preuve_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.litige_preuve_id_seq OWNED BY public.litige_preuve.id;


--
-- Name: litiges; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.litiges (
    id_litige integer NOT NULL,
    id_intervention integer NOT NULL,
    motif text NOT NULL,
    statut character varying(50) DEFAULT 'ouvert'::character varying,
    date_ouverture timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    id_senior integer,
    id_pro integer,
    ouvert_par character varying(10) DEFAULT 'senior'::character varying,
    statut_detail character varying(50) DEFAULT 'ouvert'::character varying,
    decision character varying(20),
    date_fermeture timestamp with time zone
);


ALTER TABLE public.litiges OWNER TO postgres;

--
-- Name: litiges_id_litige_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.litiges_id_litige_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.litiges_id_litige_seq OWNER TO postgres;

--
-- Name: litiges_id_litige_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.litiges_id_litige_seq OWNED BY public.litiges.id_litige;


--
-- Name: messagerie; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.messagerie (
    id integer NOT NULL,
    id_expediteur integer NOT NULL,
    id_destinataire integer NOT NULL,
    contenu text NOT NULL,
    date_envoi timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    lu boolean DEFAULT false,
    id_objet_lie integer
);


ALTER TABLE public.messagerie OWNER TO postgres;

--
-- Name: messagerie_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.messagerie_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.messagerie_id_seq OWNER TO postgres;

--
-- Name: messagerie_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.messagerie_id_seq OWNED BY public.messagerie.id;


--
-- Name: migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.migrations (
    id integer NOT NULL,
    filename character varying(255) NOT NULL,
    applied_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.migrations OWNER TO postgres;

--
-- Name: migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.migrations_id_seq OWNER TO postgres;

--
-- Name: migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.migrations_id_seq OWNED BY public.migrations.id;


--
-- Name: negociation_commission; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.negociation_commission (
    id integer NOT NULL,
    id_pro integer,
    taux_propose numeric(5,2) NOT NULL,
    taux_actuel numeric(5,2) NOT NULL,
    message text,
    statut character varying(20) DEFAULT 'en_attente'::character varying,
    reponse_admin text,
    date_demande timestamp without time zone DEFAULT now(),
    date_reponse timestamp without time zone,
    CONSTRAINT negociation_commission_statut_check CHECK (((statut)::text = ANY ((ARRAY['en_attente'::character varying, 'accepte'::character varying, 'refuse'::character varying])::text[])))
);


ALTER TABLE public.negociation_commission OWNER TO postgres;

--
-- Name: negociation_commission_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.negociation_commission_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.negociation_commission_id_seq OWNER TO postgres;

--
-- Name: negociation_commission_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.negociation_commission_id_seq OWNED BY public.negociation_commission.id;


--
-- Name: newsletter; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.newsletter (
    id_newsletter integer NOT NULL,
    email character varying(255) NOT NULL,
    date_inscription timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    id_user integer,
    preferences text,
    titre character varying(255),
    contenu text
);


ALTER TABLE public.newsletter OWNER TO postgres;

--
-- Name: newsletter_id_newsletter_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.newsletter_id_newsletter_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.newsletter_id_newsletter_seq OWNER TO postgres;

--
-- Name: newsletter_id_newsletter_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.newsletter_id_newsletter_seq OWNED BY public.newsletter.id_newsletter;


--
-- Name: note_avis; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.note_avis (
    id_avis integer NOT NULL,
    id_intervention integer,
    note integer NOT NULL,
    commentaire text,
    date_publication timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT note_avis_note_check CHECK (((note >= 1) AND (note <= 5)))
);


ALTER TABLE public.note_avis OWNER TO postgres;

--
-- Name: note_avis_id_avis_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.note_avis_id_avis_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.note_avis_id_avis_seq OWNER TO postgres;

--
-- Name: note_avis_id_avis_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.note_avis_id_avis_seq OWNED BY public.note_avis.id_avis;


--
-- Name: notification; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.notification (
    id integer NOT NULL,
    id_user integer NOT NULL,
    titre character varying(255) NOT NULL,
    message text NOT NULL,
    type character varying(50) NOT NULL,
    est_lu boolean DEFAULT false,
    lien_redirection character varying(255),
    date_creation timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.notification OWNER TO postgres;

--
-- Name: notification_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.notification_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.notification_id_seq OWNER TO postgres;

--
-- Name: notification_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.notification_id_seq OWNED BY public.notification.id;


--
-- Name: offre_prestataire; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.offre_prestataire (
    id_offre integer NOT NULL,
    id_pro integer,
    id_service integer,
    prix_personnalise numeric(10,2) NOT NULL,
    titre character varying(150),
    bio text
);


ALTER TABLE public.offre_prestataire OWNER TO postgres;

--
-- Name: offre_prestataire_id_offre_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.offre_prestataire_id_offre_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.offre_prestataire_id_offre_seq OWNER TO postgres;

--
-- Name: offre_prestataire_id_offre_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.offre_prestataire_id_offre_seq OWNED BY public.offre_prestataire.id_offre;


--
-- Name: paiements; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.paiements (
    id_paiement integer NOT NULL,
    id_user integer NOT NULL,
    prix numeric(10,2) NOT NULL,
    type_objet character varying(50) NOT NULL,
    id_objet integer NOT NULL,
    date timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    stripe_session_id character varying(255),
    stripe_paiement_id character varying(255),
    statut character varying(50) DEFAULT 'en_attente'::character varying,
    CONSTRAINT paiements_type_objet_check CHECK (((type_objet)::text = ANY ((ARRAY['article'::character varying, 'abonnement'::character varying, 'evenement'::character varying, 'intervention'::character varying, 'panier'::character varying])::text[])))
);


ALTER TABLE public.paiements OWNER TO postgres;

--
-- Name: paiements_id_paiement_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.paiements_id_paiement_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.paiements_id_paiement_seq OWNER TO postgres;

--
-- Name: paiements_id_paiement_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.paiements_id_paiement_seq OWNED BY public.paiements.id_paiement;


--
-- Name: panier; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.panier (
    id_panier integer NOT NULL,
    id_user integer NOT NULL,
    type_objet character varying(20) NOT NULL,
    id_objet integer NOT NULL,
    quantite integer DEFAULT 1 NOT NULL,
    date_ajout timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT panier_quantite_check CHECK ((quantite > 0)),
    CONSTRAINT panier_type_objet_check CHECK (((type_objet)::text = ANY ((ARRAY['article'::character varying, 'evenement'::character varying])::text[])))
);


ALTER TABLE public.panier OWNER TO postgres;

--
-- Name: panier_id_panier_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.panier_id_panier_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.panier_id_panier_seq OWNER TO postgres;

--
-- Name: panier_id_panier_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.panier_id_panier_seq OWNED BY public.panier.id_panier;


--
-- Name: planning_pro; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.planning_pro (
    id_planning integer NOT NULL,
    id_pro integer NOT NULL,
    jour_semaine integer,
    heure_debut time without time zone NOT NULL,
    heure_fin time without time zone NOT NULL,
    est_actif boolean DEFAULT true,
    duree_intervention integer DEFAULT 60,
    pause_entre integer DEFAULT 0,
    CONSTRAINT planning_pro_jour_semaine_check CHECK (((jour_semaine >= 1) AND (jour_semaine <= 7)))
);


ALTER TABLE public.planning_pro OWNER TO postgres;

--
-- Name: planning_pro_id_planning_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.planning_pro_id_planning_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.planning_pro_id_planning_seq OWNER TO postgres;

--
-- Name: planning_pro_id_planning_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.planning_pro_id_planning_seq OWNED BY public.planning_pro.id_planning;


--
-- Name: planning_senior; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.planning_senior (
    id_agenda integer NOT NULL,
    id_senior integer NOT NULL,
    id_intervention integer,
    rappel_notification timestamp with time zone,
    note_perso text
);


ALTER TABLE public.planning_senior OWNER TO postgres;

--
-- Name: planning_senior_id_agenda_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.planning_senior_id_agenda_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.planning_senior_id_agenda_seq OWNER TO postgres;

--
-- Name: planning_senior_id_agenda_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.planning_senior_id_agenda_seq OWNED BY public.planning_senior.id_agenda;


--
-- Name: profile_admin; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.profile_admin (
    id_user integer NOT NULL,
    nom character varying(100) NOT NULL,
    prenom character varying(100) NOT NULL,
    genre character varying(50),
    telephone character varying(20)
);


ALTER TABLE public.profile_admin OWNER TO postgres;

--
-- Name: profile_pro; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.profile_pro (
    id_user integer NOT NULL,
    nom character varying(100) NOT NULL,
    prenom character varying(100) NOT NULL,
    date_naissance date,
    genre character varying(50),
    statut_juridique character varying(50),
    nom_entreprise character varying(150),
    adresse_pro text,
    id_type integer,
    statut_validation character varying(50) DEFAULT 'en_attente'::character varying,
    is_subscription_valid boolean DEFAULT false,
    siret character varying(14),
    bio text,
    rib character varying(34),
    telephone_pro character varying(20),
    logo_url character varying(255),
    note_moyenne numeric(3,2) DEFAULT 0.00,
    commission numeric(5,2) DEFAULT 15.00,
    is_first_login boolean DEFAULT true
);


ALTER TABLE public.profile_pro OWNER TO postgres;

--
-- Name: profile_senior; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.profile_senior (
    id_user integer NOT NULL,
    nom character varying(100) NOT NULL,
    prenom character varying(100) NOT NULL,
    genre character varying(50),
    date_naissance date,
    is_first_login boolean DEFAULT true,
    is_subscription_valid boolean DEFAULT false,
    adresse text,
    telephone character varying(20)
);


ALTER TABLE public.profile_senior OWNER TO postgres;

--
-- Name: referencement; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.referencement (
    id integer NOT NULL,
    id_pro integer,
    type character varying(20) NOT NULL,
    prix numeric(5,2) NOT NULL,
    date_debut timestamp without time zone DEFAULT now(),
    date_fin timestamp without time zone NOT NULL,
    actif boolean DEFAULT true,
    stripe_session_id character varying(255),
    CONSTRAINT referencement_type_check CHECK (((type)::text = ANY ((ARRAY['semaine'::character varying, 'mois'::character varying])::text[])))
);


ALTER TABLE public.referencement OWNER TO postgres;

--
-- Name: referencement_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.referencement_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.referencement_id_seq OWNER TO postgres;

--
-- Name: referencement_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.referencement_id_seq OWNED BY public.referencement.id;


--
-- Name: service; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.service (
    id integer NOT NULL,
    id_categorie integer NOT NULL,
    nom character varying(150) NOT NULL,
    description text,
    prix_reference numeric(10,2) NOT NULL,
    image_url character varying(255)
);


ALTER TABLE public.service OWNER TO postgres;

--
-- Name: service_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.service_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.service_id_seq OWNER TO postgres;

--
-- Name: service_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.service_id_seq OWNED BY public.service.id;


--
-- Name: type_prestataire; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.type_prestataire (
    id_type integer NOT NULL,
    nom_type character varying(100) NOT NULL
);


ALTER TABLE public.type_prestataire OWNER TO postgres;

--
-- Name: type_prestataire_categorie; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.type_prestataire_categorie (
    id_type integer NOT NULL,
    id_categorie integer NOT NULL
);


ALTER TABLE public.type_prestataire_categorie OWNER TO postgres;

--
-- Name: type_prestataire_id_type_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.type_prestataire_id_type_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.type_prestataire_id_type_seq OWNER TO postgres;

--
-- Name: type_prestataire_id_type_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.type_prestataire_id_type_seq OWNED BY public.type_prestataire.id_type;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id_user integer NOT NULL,
    email character varying(255) NOT NULL,
    password_hash character varying(255) NOT NULL,
    role character varying(50) NOT NULL,
    token_session character varying(255),
    date_inscription timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    accepte_newsletter boolean DEFAULT false,
    est_banni boolean DEFAULT false,
    ban_jusqu_au timestamp with time zone,
    ban_raison text,
    onesignal_player_id character varying(255),
    CONSTRAINT users_role_check CHECK (((role)::text = ANY ((ARRAY['admin'::character varying, 'senior'::character varying, 'pro'::character varying])::text[])))
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_user_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_user_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_user_seq OWNER TO postgres;

--
-- Name: users_id_user_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_user_seq OWNED BY public.users.id_user;


--
-- Name: virement; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.virement (
    id_virement integer NOT NULL,
    id_pro integer NOT NULL,
    id_facture integer NOT NULL,
    id_intervention integer,
    montant numeric(10,2) NOT NULL,
    statut character varying(20) DEFAULT 'en_attente'::character varying,
    date_creation timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    date_virement timestamp with time zone,
    CONSTRAINT virement_statut_check CHECK (((statut)::text = ANY ((ARRAY['en_attente'::character varying, 'effectue'::character varying, 'annule'::character varying])::text[])))
);


ALTER TABLE public.virement OWNER TO postgres;

--
-- Name: virement_id_virement_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.virement_id_virement_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.virement_id_virement_seq OWNER TO postgres;

--
-- Name: virement_id_virement_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.virement_id_virement_seq OWNED BY public.virement.id_virement;


--
-- Name: abonnement id_abonnement; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.abonnement ALTER COLUMN id_abonnement SET DEFAULT nextval('public.abonnement_id_abonnement_seq'::regclass);


--
-- Name: article id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.article ALTER COLUMN id SET DEFAULT nextval('public.article_id_seq'::regclass);


--
-- Name: categorie_article id_categorie; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categorie_article ALTER COLUMN id_categorie SET DEFAULT nextval('public.categorie_article_id_categorie_seq'::regclass);


--
-- Name: categorie_document id_categorie; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categorie_document ALTER COLUMN id_categorie SET DEFAULT nextval('public.categorie_document_id_categorie_seq'::regclass);


--
-- Name: categorie_evenement id_categorie; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categorie_evenement ALTER COLUMN id_categorie SET DEFAULT nextval('public.categorie_evenement_id_categorie_seq'::regclass);


--
-- Name: categorie_services id_categorie; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categorie_services ALTER COLUMN id_categorie SET DEFAULT nextval('public.categorie_services_id_categorie_seq'::regclass);


--
-- Name: conseil id_conseil; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.conseil ALTER COLUMN id_conseil SET DEFAULT nextval('public.conseil_id_conseil_seq'::regclass);


--
-- Name: demande_service id_demande; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.demande_service ALTER COLUMN id_demande SET DEFAULT nextval('public.demande_service_id_demande_seq'::regclass);


--
-- Name: devis id_devis; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.devis ALTER COLUMN id_devis SET DEFAULT nextval('public.devis_id_devis_seq'::regclass);


--
-- Name: documents_pro id_doc; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.documents_pro ALTER COLUMN id_doc SET DEFAULT nextval('public.documents_pro_id_doc_seq'::regclass);


--
-- Name: evenements id_evenement; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.evenements ALTER COLUMN id_evenement SET DEFAULT nextval('public.evenements_id_evenement_seq'::regclass);


--
-- Name: facture id_facture; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.facture ALTER COLUMN id_facture SET DEFAULT nextval('public.facture_id_facture_seq'::regclass);


--
-- Name: inscription_evenement id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inscription_evenement ALTER COLUMN id SET DEFAULT nextval('public.inscription_evenement_id_seq'::regclass);


--
-- Name: intervention id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.intervention ALTER COLUMN id SET DEFAULT nextval('public.intervention_id_seq'::regclass);


--
-- Name: litige_message id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.litige_message ALTER COLUMN id SET DEFAULT nextval('public.litige_message_id_seq'::regclass);


--
-- Name: litige_preuve id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.litige_preuve ALTER COLUMN id SET DEFAULT nextval('public.litige_preuve_id_seq'::regclass);


--
-- Name: litiges id_litige; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.litiges ALTER COLUMN id_litige SET DEFAULT nextval('public.litiges_id_litige_seq'::regclass);


--
-- Name: messagerie id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.messagerie ALTER COLUMN id SET DEFAULT nextval('public.messagerie_id_seq'::regclass);


--
-- Name: migrations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.migrations ALTER COLUMN id SET DEFAULT nextval('public.migrations_id_seq'::regclass);


--
-- Name: negociation_commission id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.negociation_commission ALTER COLUMN id SET DEFAULT nextval('public.negociation_commission_id_seq'::regclass);


--
-- Name: newsletter id_newsletter; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.newsletter ALTER COLUMN id_newsletter SET DEFAULT nextval('public.newsletter_id_newsletter_seq'::regclass);


--
-- Name: note_avis id_avis; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.note_avis ALTER COLUMN id_avis SET DEFAULT nextval('public.note_avis_id_avis_seq'::regclass);


--
-- Name: notification id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notification ALTER COLUMN id SET DEFAULT nextval('public.notification_id_seq'::regclass);


--
-- Name: offre_prestataire id_offre; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.offre_prestataire ALTER COLUMN id_offre SET DEFAULT nextval('public.offre_prestataire_id_offre_seq'::regclass);


--
-- Name: paiements id_paiement; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.paiements ALTER COLUMN id_paiement SET DEFAULT nextval('public.paiements_id_paiement_seq'::regclass);


--
-- Name: panier id_panier; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.panier ALTER COLUMN id_panier SET DEFAULT nextval('public.panier_id_panier_seq'::regclass);


--
-- Name: planning_pro id_planning; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.planning_pro ALTER COLUMN id_planning SET DEFAULT nextval('public.planning_pro_id_planning_seq'::regclass);


--
-- Name: planning_senior id_agenda; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.planning_senior ALTER COLUMN id_agenda SET DEFAULT nextval('public.planning_senior_id_agenda_seq'::regclass);


--
-- Name: referencement id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.referencement ALTER COLUMN id SET DEFAULT nextval('public.referencement_id_seq'::regclass);


--
-- Name: service id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.service ALTER COLUMN id SET DEFAULT nextval('public.service_id_seq'::regclass);


--
-- Name: type_prestataire id_type; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.type_prestataire ALTER COLUMN id_type SET DEFAULT nextval('public.type_prestataire_id_type_seq'::regclass);


--
-- Name: users id_user; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id_user SET DEFAULT nextval('public.users_id_user_seq'::regclass);


--
-- Name: virement id_virement; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.virement ALTER COLUMN id_virement SET DEFAULT nextval('public.virement_id_virement_seq'::regclass);


--
-- Data for Name: abonnement; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.abonnement (id_abonnement, id_user, type_abonnement, prix_abonnement, date_debut, date_fin, stripe_subscription_id, statut, date_resiliation) FROM stdin;
1	2	annuel	40.00	2026-01-01 01:00:00+01	2027-01-01 01:00:00+01	sub_test_001	actif	\N
2	3	mensuel	4.00	2026-03-01 01:00:00+01	2026-04-01 02:00:00+02	sub_test_002	actif	\N
24	1	mensuel	3.00	2026-05-04 22:32:14.076966+02	2026-06-04 22:32:14.076966+02		actif	\N
25	17	mensuel	4.00	2026-05-05 00:38:14.977227+02	2026-06-05 00:38:14.977227+02	sub_1TTV7wPoI0jgtoigY6CeuPMI	actif	\N
\.


--
-- Data for Name: article; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.article (id, id_user, id_categorie, nom, prix, bio, stock, image_url) FROM stdin;
1	\N	1	Téléphone Grosses Touches	39.99	Volume amplifié et touches raccourcis avec photos.	10	fa-mobile-alt
5	\N	1	Pilulier Semainier Ergonomique	12.50	Pilulier 7 jours avec 4 compartiments par jour.	50	\N
3	\N	2	Canne de Marche Pliante	18.00	Canne légère et pliable, idéale pour les déplacements.	0	\N
4	\N	3	Jeu de Cartes Mémoire	12.00	Jeu de cartes pour stimuler la mémoire.	48	\N
\.


--
-- Data for Name: categorie_article; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.categorie_article (id_categorie, nom_categorie) FROM stdin;
1	Santé & Bien-être
2	Mobilité & Confort
3	Loisirs & Jeux
4	Cuisine Adaptée
5	Non classé
\.


--
-- Data for Name: categorie_document; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.categorie_document (id_categorie, id_type, nom_categorie) FROM stdin;
8	3	Diplôme de kinésithérapie
10	3	Assurance responsabilité civile
11	4	Diplôme ADVF ou équivalent
12	4	Casier judiciaire
13	4	Assurance responsabilité civile
15	5	Casier judiciaire
16	5	Assurance responsabilité civile
17	6	Certification professionnelle
18	6	Assurance responsabilité civile
22	8	BPJEPS ou équivalent
23	8	Casier judiciaire
24	8	Assurance responsabilité civile
25	9	Diplôme informatique
26	9	Assurance responsabilité civile
27	10	Permis de conduire
28	10	Carte professionnelle VTC
29	10	Assurance véhicule
30	11	Certification animalière
31	11	Assurance responsabilité civile
32	12	Portfolio
33	12	Assurance responsabilité civile
34	13	Diplôme comptabilité
35	13	Assurance responsabilité civile
38	15	Pièce d'identité
39	15	Assurance responsabilité civile
9	3	Diplôme de médecine updated
\.


--
-- Data for Name: categorie_evenement; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.categorie_evenement (id_categorie, nom_categorie) FROM stdin;
1	Conférence
2	Atelier
3	Sortie culturelle
4	Sport
5	Non classé
\.


--
-- Data for Name: categorie_services; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.categorie_services (id_categorie, nom_categorie) FROM stdin;
2	Aide Administrative
3	Bricolage
4	Santé & Bien-être
5	Sport & Loisirs
6	Non classé
1	Méninge
9	Autre
10	Ménage
\.


--
-- Data for Name: conseil; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.conseil (id_conseil, categorie, titre, contenu) FROM stdin;
2	Nutrition	Alimentation équilibrée pour les seniors	Une alimentation variée et équilibrée est clé pour maintenir sa vitalité après 60 ans.
3	Sport	Rester actif à tout âge	La pratique régulière d une activité physique adaptée améliore la qualité de vie des seniors.
4	Santé	Bien dormir après 60 ans	Le sommeil est essentiel pour rester en bonne santé.
5	Santé	Bien dormir après 60 ans	Le sommeil est essentiel pour rester en bonne santé.
\.


--
-- Data for Name: demande_service; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.demande_service (id_demande, id_senior, id_offre, date_souhaitee, message, statut, date_creation) FROM stdin;
1	17	5	2026-04-28		accepte	2026-04-01 16:21:47.006163+02
3	17	13	2026-04-11	uytgfrd	acceptee	2026-04-18 19:34:58.055142+02
4	17	13	2026-04-20	stp	refusee	2026-04-18 20:19:43.659498+02
5	17	13	2026-04-23	stp chef stp chef	refusee	2026-04-18 20:41:41.34248+02
6	17	13	2026-04-24	stp	refusee	2026-04-18 20:46:25.102643+02
7	17	13	2026-04-21	stp	refuse	2026-04-18 20:54:50.026013+02
8	17	13	2026-04-22	stp wsh je veux maigrrir	accepte	2026-04-18 20:57:53.613514+02
9	17	15	2026-04-22	azertyu	accepte	2026-04-18 21:10:39.362477+02
11	17	13	2026-04-25	zertyu	accepte	2026-04-18 21:26:30.802116+02
12	17	13	2026-04-17	azertyuiop^	accepte	2026-04-18 21:29:34.339464+02
14	17	13	2026-04-26	azerghj	accepte	2026-04-18 22:16:19.046272+02
15	17	15	2026-04-25	salutnun devis test	accepte	2026-04-18 22:51:51.152827+02
23	17	13	2026-05-02		accepte	2026-04-19 00:02:01.740066+02
24	17	15	2026-04-20		accepte	2026-04-19 10:29:20.707393+02
25	17	13	2026-04-30	o	accepte	2026-04-19 11:11:16.113643+02
26	17	13	2026-05-08		accepte	2026-04-19 16:27:21.182528+02
27	17	15	2026-05-10	fdefefe	accepte	2026-04-20 01:33:45.809535+02
28	17	15	2026-04-23		accepte	2026-04-21 08:56:59.956335+02
29	17	15	2026-06-06	oiu	accepte	2026-05-05 14:32:45.500704+02
30	17	15	2026-05-20	zak test remboursement 	accepte	2026-05-05 20:23:32.608894+02
31	17	15	2026-05-07		accepte	2026-05-06 16:41:08.271052+02
32	17	17	2026-05-15	azertyuiop	accepte	2026-05-06 16:46:33.163667+02
33	17	17	2026-05-16	wsh frere accepte la t'abuse	accepte	2026-05-06 17:01:35.14366+02
34	17	15	2026-05-12		accepte	2026-05-08 20:09:38.255781+02
\.


--
-- Data for Name: devis; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.devis (id_devis, id_pro, id_senior, id_service, id_intervention, montant_ht, montant_ttc, taux_commission, date_validite, statut) FROM stdin;
3	9	10	7	\N	22.50	27.00	15.00	2026-05-01	en_attente
4	9	10	7	\N	40.00	48.00	15.00	2026-04-15	accepte
5	9	10	7	\N	35.00	42.00	15.00	2026-03-30	refuse
6	9	10	7	\N	50.00	60.00	15.00	2026-06-01	en_attente
7	5	17	4	\N	14.00	16.80	15.00	2026-04-28	refuse
9	23	17	5	25	35.00	42.00	15.00	2026-04-25	refuse
14	23	17	6	34	0.01	0.01	15.00	2026-04-20	en_attente
13	23	17	5	33	35.00	42.00	15.00	2026-05-02	paye
15	23	17	5	35	35.00	42.00	15.00	2026-04-30	refuse
17	23	17	1	37	20.00	24.00	15.00	2026-04-20	paye
10	23	17	5	26	35.00	42.00	15.00	2026-04-17	annule
20	23	17	6	39	24.00	28.80	15.00	2026-04-23	en_attente
19	23	17	6	38	0.01	0.01	15.00	2026-05-10	paye
11	23	17	5	27	35.00	42.00	15.00	2026-04-26	annule
8	23	17	6	24	0.01	0.01	15.00	2026-04-22	annule
12	23	17	6	28	0.01	0.01	15.00	2026-04-25	annule
21	23	17	6	40	24.00	28.80	15.00	2026-06-06	paye
16	23	17	5	36	35.00	42.00	15.00	2026-05-08	annule
22	23	17	6	41	24.00	28.80	15.00	2026-05-20	annule
25	23	17	3	44	15.00	18.00	15.00	2026-05-16	paye
24	23	17	3	43	15.00	18.00	15.00	2026-05-15	paye
23	23	17	6	42	24.00	28.80	15.00	2026-05-07	paye
26	23	17	6	45	24.00	28.80	15.00	2026-05-12	en_attente
\.


--
-- Data for Name: documents_pro; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.documents_pro (id_doc, id_user, type_doc, url_document, date_upload, id_categorie, statut) FROM stdin;
17	23	Casier judiciaire	/uploads/documents_pro/23/1776519817148969263_Casier_judiciaire.pdf	2026-04-18 15:43:37.154891+02	23	valide
14	23	BPJEPS ou équivalent	/uploads/documents_pro/23/1776517641169848339_BPJEPS_ou_équivalent.pdf	2026-04-18 15:07:21.174871+02	22	valide
10	23	Assurance responsabilité civile	/uploads/documents_pro/23/1776516076615514421_Assurance_responsabilité_civile.pdf	2026-04-18 14:41:16.633806+02	24	valide
4	9	Diplôme ADVF ou équivalent	https://silverhappy.fr/uploads/documents_pro/9/diplome_advf.pdf	2026-03-28 16:19:16.696326+01	11	valide
5	9	Casier judiciaire	https://silverhappy.fr/uploads/documents_pro/9/casier_judiciaire.pdf	2026-03-28 16:19:16.696326+01	12	valide
6	9	Assurance responsabilité civile	https://silverhappy.fr/uploads/documents_pro/9/assurance_rc.pdf	2026-03-28 16:19:16.696326+01	13	valide
\.


--
-- Data for Name: evenements; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.evenements (id_evenement, id_createur, id_categorie, titre, description, date_heure, lieu, prix_ticket, nb_places_max, nb_inscrits) FROM stdin;
4	1	1	Atelier cuisine seniors	Atelier cuisine convivial pour les seniors	2026-03-29 12:00:00+02	Centre communautaire Paris 15	5.00	20	0
5	1	1	Sortie au musée	Visite guidée du musée d'Orsay	2026-03-31 16:00:00+02	Musée d'Orsay, Paris	8.00	15	4
6	1	1	Yoga doux	Séance de yoga adaptée aux seniors	2026-04-02 11:00:00+02	Salle polyvalente Paris 12	0.00	10	0
1	1	2	Atelier Peinture Aquarelle	Un atelier convivial pour découvrir la peinture à l aquarelle.	2026-04-15 16:00:00+02	Salle Polyvalente - Bâtiment B	5.00	20	4
2	1	1	Conférence Bien Vieillir	Conseils pratiques pour bien vieillir au quotidien.	2026-05-10 12:00:00+02	Salle Conférence Paris 11	0.00	50	10
3	1	4	Yoga Doux pour Seniors	Séance de yoga adaptée aux seniors débutants.	2026-04-20 11:00:00+02	Salle Sport - Paris 13	8.00	15	11
\.


--
-- Data for Name: facture; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.facture (id_facture, id_emetteur, id_recepteur, id_intervention, montant_ht, montant_ttc, commission_sh, pdf_url, type_achat, id_achat, details_json) FROM stdin;
6	9	10	8	40.00	48.00	6.00	https://silverhappy.fr/factures/facture_002.pdf	\N	\N	\N
7	9	10	9	35.00	42.00	5.25	https://silverhappy.fr/factures/facture_003.pdf	\N	\N	\N
21	2	1	\N	2.50	3.00	0.00	/uploads/factures/facture_21.pdf	abonnement	\N	{"label":"Abonnement mensuel Silver Happy","type":"abonnement","type_abonnement":"mensuel"}
12	2	17	\N	41.67	50.00	0.00	/uploads/factures/facture_12.pdf	panier	\N	{"items":[{"type_objet":"article","id_objet":5,"nom":"Pilulier Semainier Ergonomique","prix":12.5,"quantite":4},{"type_objet":"article","id_objet":2,"nom":"Coussin Chauffant Cervicales","prix":0,"quantite":3}],"type":"panier"}
13	2	23	\N	33.33	40.00	0.00	/uploads/factures/facture_13.pdf	abonnement	\N	{"label":"Abonnement annuel Silver Happy","type":"abonnement","type_abonnement":"annuel"}
14	2	23	\N	33.33	40.00	0.00	/uploads/factures/facture_14.pdf	abonnement	\N	{"label":"Abonnement annuel Silver Happy","type":"abonnement","type_abonnement":"annuel"}
15	2	17	\N	6.67	8.00	0.00	/uploads/factures/facture_15.pdf	panier	\N	{"items":[{"type_objet":"evenement","id_objet":3,"nom":"Yoga Doux pour Seniors","prix":8,"quantite":1}],"type":"panier"}
16	2	23	\N	33.33	40.00	0.00	/uploads/factures/facture_16.pdf	abonnement	\N	{"label":"Abonnement annuel Silver Happy","type":"abonnement","type_abonnement":"annuel"}
17	2	23	\N	33.33	40.00	0.00	/uploads/factures/facture_17.pdf	abonnement	\N	{"label":"Abonnement annuel Silver Happy","type":"abonnement","type_abonnement":"annuel"}
19	2	1	\N	3.33	4.00	0.00	/uploads/factures/facture_19.pdf	abonnement	\N	{"label":"Abonnement mensuel Silver Happy","type":"abonnement","type_abonnement":"mensuel"}
20	2	1	\N	2.50	3.00	0.00	/uploads/factures/facture_20.pdf	abonnement	\N	{"label":"Abonnement mensuel Silver Happy","type":"abonnement","type_abonnement":"mensuel"}
9	23	17	37	20.00	24.00	3.00	/uploads/factures/facture_9.pdf	\N	\N	\N
10	2	17	\N	20.83	25.00	0.00	/uploads/factures/facture_10.pdf	\N	\N	\N
11	2	17	\N	33.33	40.00	0.00	/uploads/factures/facture_11.pdf	\N	\N	\N
22	2	17	\N	450.00	540.00	0.00	/uploads/factures/facture_22.pdf	panier	\N	{"items":[{"type_objet":"article","id_objet":3,"nom":"Canne de Marche Pliante","prix":18,"quantite":30}],"type":"panier"}
23	2	17	\N	450.00	540.00	0.00	/uploads/factures/facture_23.pdf	panier	\N	{"items":[{"type_objet":"article","id_objet":3,"nom":"Canne de Marche Pliante","prix":18,"quantite":30}],"type":"panier"}
24	2	17	\N	450.00	540.00	0.00	/uploads/factures/facture_24.pdf	panier	\N	{"items":[{"type_objet":"article","id_objet":3,"nom":"Canne de Marche Pliante","prix":18,"quantite":30}],"type":"panier"}
25	2	17	\N	3.33	4.00	0.00	/uploads/factures/facture_25.pdf	abonnement	\N	{"label":"Abonnement mensuel Silver Happy","type":"abonnement","type_abonnement":"mensuel"}
27	23	17	41	24.00	28.80	3.60	/uploads/factures/facture_27.pdf	intervention	\N	\N
28	23	17	44	15.00	18.00	2.25	/uploads/factures/facture_28.pdf	intervention	\N	\N
29	23	17	43	15.00	18.00	2.25	/uploads/factures/facture_29.pdf	intervention	\N	\N
30	23	17	42	24.00	28.80	3.60	/uploads/factures/facture_30.pdf	intervention	\N	\N
31	2	17	\N	20.00	24.00	0.00	/uploads/factures/facture_31.pdf	panier	\N	{"items":[{"type_objet":"article","id_objet":4,"nom":"Jeu de Cartes Mémoire","prix":12,"quantite":2}],"type":"panier"}
\.


--
-- Data for Name: inscription_evenement; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.inscription_evenement (id, id_user, id_evenement, date_inscription, statut) FROM stdin;
1	10	4	2026-03-28 01:31:23.430737+01	inscrit
2	10	5	2026-03-28 01:31:23.430737+01	inscrit
3	10	6	2026-03-28 01:31:23.430737+01	inscrit
4	9	4	2026-03-28 01:31:23.430737+01	inscrit
5	9	5	2026-03-28 01:31:23.430737+01	inscrit
6	9	6	2026-03-28 01:31:23.430737+01	inscrit
8	17	4	2026-03-29 18:54:01.534552+02	annule
9	17	5	2026-03-29 20:15:56.931941+02	annule
16	17	6	2026-03-29 21:01:32.260319+02	annule
22	17	1	2026-04-01 10:54:35.223718+02	inscrit
29	17	2	2026-04-03 12:13:07.182007+02	annule
28	17	3	2026-04-02 21:14:25.770232+02	annule
\.


--
-- Data for Name: intervention; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.intervention (id, id_pro, id_senior, id_service, bio_intervention, date_heure_debut, date_heure_fin, lieu, statut, commission_montant, prix, est_medical) FROM stdin;
5	9	10	7	pkjhogifuv	2026-04-01 11:00:00+02	2026-04-01 13:00:00+02	12 rue de la Paix, 75002 Paris	terminee	3.37	22.50	f
37	23	17	1	\N	2026-04-17 16:31:10.836099+02	2026-04-17 17:31:10.836099+02	Paris 11ème	terminee	3.00	20.00	f
6	9	2	4	îpuoyitgfuvjbkhjpkjhogiuvjb	2026-04-04 14:11:00+02	2026-04-04 18:11:00+02	11 rue de gimbsheim Talant	planifiee	15.00	100.00	t
7	9	10	7	\N	2026-03-01 10:00:00+01	2026-03-01 12:00:00+01	12 rue de la Paix, Paris	terminee	3.37	22.50	f
8	9	10	7	\N	2026-03-10 15:00:00+01	2026-03-10 17:00:00+01	5 avenue des Fleurs, Paris	terminee	6.00	40.00	f
10	9	10	7	\N	2026-03-28 10:00:00+01	2026-03-28 12:00:00+01	12 rue de la Paix, Paris	planifiee	3.37	22.50	f
11	9	10	7	\N	2026-03-30 16:00:00+02	2026-03-30 18:00:00+02	5 avenue des Fleurs, Paris	planifiee	4.50	30.00	f
12	9	10	7	\N	2026-04-01 12:00:00+02	2026-04-01 14:00:00+02	8 rue du Commerce, Paris	planifiee	5.25	35.00	f
17	9	17	7	\N	2026-03-20 09:00:00+01	2026-03-20 11:00:00+01	Domicile senior	terminee	3.37	22.50	f
19	23	17	5	uytgfrd	2026-04-11 09:00:00+02	2026-04-11 10:00:00+02	paris	terminee	5.25	35.00	f
21	23	17	5	stp	2026-04-20 09:00:00+02	2026-04-20 10:00:00+02	paris	annulee	5.25	35.00	f
22	23	17	5	stp	2026-04-20 09:00:00+02	2026-04-20 10:00:00+02	paris	annulee	5.25	35.00	f
26	23	17	5	azertyuiop^	2026-04-17 09:00:00+02	2026-04-17 10:00:00+02	paris	terminee	5.25	35.00	f
29	23	10	1	Séance de coaching test	2026-04-10 10:00:00+02	2026-04-10 11:00:00+02	Paris 11ème	terminee	3.00	20.00	f
32	23	17	6	Séance de coaching test	2026-04-10 10:00:00+02	2026-04-10 11:00:00+02	Paris 11ème	terminee	3.00	20.00	f
15	9	17	7	\N	2026-04-02 15:00:00+02	2026-04-02 17:00:00+02	Domicile senior	terminee	3.37	22.50	f
16	9	17	7	\N	2026-04-05 11:00:00+02	2026-04-05 13:00:00+02	Domicile senior	terminee	3.37	22.50	f
14	9	17	7	\N	2026-03-31 10:00:00+02	2026-03-31 12:00:00+02	Domicile senior	terminee	3.37	22.50	f
18	23	10	1	Séance de coaching	2026-04-19 10:00:00+02	2026-04-19 11:00:00+02	Paris 11ème	terminee	3.37	22.50	f
20	23	17	5	stp	2026-04-20 09:00:00+02	2026-04-20 10:00:00+02	paris	terminee	5.25	35.00	f
34	23	17	6	\N	2026-04-20 12:01:00+02	2026-04-20 18:00:00+02	paris	terminee	0.00	0.01	f
38	23	17	6	fdefefe	2026-05-10 09:00:00+02	2026-05-10 10:00:00+02	paris	annulee	0.00	0.01	f
25	23	17	5	zertyu	2026-04-25 09:00:00+02	2026-04-25 10:00:00+02	paris	terminee	5.25	35.00	f
27	23	17	5	azerghj	2026-04-26 09:00:00+02	2026-04-26 10:00:00+02	paris	terminee	5.25	35.00	f
24	23	17	6	azertyu	2026-04-22 09:00:00+02	2026-04-22 10:00:00+02	paris	terminee	0.00	0.01	f
35	23	17	5	o	2026-04-30 09:00:00+02	2026-04-30 10:00:00+02	paris	terminee	5.25	35.00	f
28	23	17	6	salutnun devis test	2026-04-25 09:00:00+02	2026-04-25 10:00:00+02	paris	terminee	0.00	0.01	f
39	23	17	6	\N	2026-04-23 09:00:00+02	2026-04-23 10:00:00+02	paris	terminee	3.60	24.00	f
23	23	17	5	stp wsh je veux maigrrir	2026-04-22 09:00:00+02	2026-04-22 10:00:00+02	paris	terminee	5.25	35.00	f
33	23	17	5	\N	2026-05-02 09:00:00+02	2026-05-02 10:00:00+02	paris	terminee	5.25	35.00	f
40	23	17	6	oiu	2026-06-06 09:00:00+02	2026-06-06 10:00:00+02	paris	planifiee	3.60	24.00	f
9	9	10	7	\N	2026-03-20 11:00:00+01	2026-03-20 13:00:00+01	8 rue du Commerce, Paris	terminee	5.25	35.00	f
36	23	17	5	\N	2026-05-08 09:00:00+02	2026-05-08 10:00:00+02	paris	annulee	5.25	35.00	f
41	23	17	6	zak test remboursement	2026-05-20 09:00:00+02	2026-05-20 10:00:00+02	paris	annulee	3.60	24.00	f
43	23	17	3	azertyuiop	2026-05-15 09:00:00+02	2026-05-15 10:00:00+02	azertyuiop10.	terminee	2.25	15.00	f
44	23	17	3	wsh frere accepte la t'abuse	2026-05-16 09:00:00+02	2026-05-16 10:00:00+02	paris champion d'europe quoi	planifiee	2.25	15.00	f
42	23	17	6	azertyuiop	2026-05-07 09:00:00+02	2026-05-07 10:00:00+02	paris	terminee	3.60	24.00	f
45	23	17	6	\N	2026-05-12 09:00:00+02	2026-05-12 10:00:00+02	paris	planifiee	3.60	24.00	f
\.


--
-- Data for Name: litige_message; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.litige_message (id, id_litige, id_user, message, date_envoi) FROM stdin;
1	5	17	kjhgfcfghjk	2026-05-07 14:35:30.395043+02
3	8	23	ouais mais non il m'avait pourtant dit que c'etait lui	2026-05-07 14:40:35.249049+02
\.


--
-- Data for Name: litige_preuve; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.litige_preuve (id, id_litige, id_user, url_fichier, date_upload) FROM stdin;
\.


--
-- Data for Name: litiges; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.litiges (id_litige, id_intervention, motif, statut, date_ouverture, id_senior, id_pro, ouvert_par, statut_detail, decision, date_fermeture) FROM stdin;
7	5	jiuigyfutdy	ferme	2026-03-27 10:43:39.348726+01	\N	\N	senior	ferme	senior	2026-05-07 14:34:59.059428+02
6	5	kpohigu	ferme	2026-03-27 10:43:20.780427+01	\N	\N	senior	ferme	pro	2026-05-07 14:35:18.598919+02
5	5	Le prestataire est arrivé en retard de 45 minutes sans prévenir	ouvert	2026-03-27 10:35:34.767891+01	\N	\N	senior	en_instruction	\N	\N
8	43	gros gros probleme la c'est du foutage de geule c'est pas possible	ouvert	2026-05-07 14:36:38.911473+02	17	23	senior	ouvert	\N	\N
\.


--
-- Data for Name: messagerie; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.messagerie (id, id_expediteur, id_destinataire, contenu, date_envoi, lu, id_objet_lie) FROM stdin;
2	4	2	Bonjour Jean, oui c est possible pour moi à 14h.	2026-03-26 21:18:42.887675+01	f	\N
3	3	5	Bonjour Paul, pouvez-vous venir mercredi matin ?	2026-03-26 21:18:42.887675+01	f	\N
4	2	4	Bonjour, êtes-vous disponible lundi ?	2026-03-26 22:54:32.40175+01	f	\N
7	17	23	yo	2026-04-19 21:37:35.819585+02	t	\N
9	17	23	ca fonctionne Nickel enfin !!!!!	2026-04-19 21:37:59.56826+02	t	\N
6	17	23	oui quest ce qu'il ya	2026-04-19 21:35:47.976693+02	t	\N
8	23	17	test final	2026-04-19 21:37:46.86064+02	t	\N
5	23	17	yo man	2026-04-19 21:35:32.755353+02	t	\N
10	23	17	ouais t'as vu	2026-04-19 21:38:09.827642+02	t	\N
11	23	17	yo	2026-04-19 21:38:35.114973+02	t	\N
12	17	23	wsg	2026-04-19 21:44:02.779567+02	t	\N
13	17	23	edfvfvcx	2026-04-20 01:43:57.172299+02	t	\N
14	23	17	yo	2026-04-20 01:44:05.322384+02	t	\N
16	17	17	salut mec	2026-05-08 18:30:59.216765+02	t	\N
15	17	26	coucou	2026-05-08 18:27:52.904938+02	t	\N
17	17	17	ca dit quoi	2026-05-08 18:31:05.622626+02	t	\N
\.


--
-- Data for Name: migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.migrations (id, filename, applied_at) FROM stdin;
1	001_init.sql	2026-03-26 16:45:27.132321+01
2	002_add_type_prestataire.sql	2026-03-26 16:45:27.138189+01
3	003_add_categorie_document.sql	2026-03-26 16:45:27.147045+01
4	004_fix_profile_pro_fk.sql	2026-03-26 16:45:27.151204+01
5	005_fix_documents_pro_fk.sql	2026-03-26 16:45:27.15377+01
6	006_fix_note_avis.sql	2026-03-26 16:48:41.399039+01
8	007_inscription_evenement.sql	2026-03-28 01:17:53.926407+01
9	008_timezone_paris.sql	2026-03-28 01:44:10.365282+01
10	009_documents_pro_statut.sql	2026-03-28 15:45:25.536204+01
11	009_first_login_pro.sql	2026-03-29 03:49:59.544854+02
12	010_fix_panier.sql	2026-04-01 14:53:05.384666+02
13	011_fix_demande_service.sql	2026-04-01 15:27:43.104888+02
14	012_stripe_null.sql	2026-04-02 17:49:27.006246+02
15	013_fix_abo.sql	2026-04-03 00:07:15.532876+02
16	014_fix_paiement.sql	2026-04-03 12:17:40.776785+02
17	015_create_table_type_prestataire_service.sql	2026-04-18 18:15:35.323337+02
18	016_fix_note_avis.sql	2026-04-18 23:37:53.598875+02
19	017_fix_pdf_facture.sql	2026-04-19 16:36:43.341935+02
20	018_facture_details.sql	2026-04-19 17:30:54.492762+02
21	019_fix_devis_statut.sql	2026-04-19 17:42:27.002397+02
22	020_negociation_commission.sql	2026-04-19 22:05:05.077352+02
23	021_referencement.sql	2026-04-19 22:41:36.505954+02
24	022_virement.sql	2026-05-05 14:16:55.459099+02
25	023_virement_unique.sql	2026-05-05 18:21:47.335054+02
26	024_banissement.sql	2026-05-07 03:32:53.311928+02
27	025_litiges_update.sql	2026-05-07 04:01:06.991259+02
28	026_planning_duree.sql	2026-05-08 19:25:35.15838+02
29	027_planning_duree.sql	2026-05-08 19:45:00.045885+02
30	028_onesignal.sql	2026-05-09 19:44:21.391741+02
31	029_onesignal.sql	2026-05-09 20:25:15.421727+02
32	030_date_creation.sql	2026-05-09 20:36:18.936567+02
\.


--
-- Data for Name: negociation_commission; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.negociation_commission (id, id_pro, taux_propose, taux_actuel, message, statut, reponse_admin, date_demande, date_reponse) FROM stdin;
1	23	4.00	0.00	je voudrais negocier a ce tarif car voila	refuse	\N	2026-04-19 22:07:10.759456	2026-04-19 22:07:27.17796
2	23	12.50	0.00	aszdefgh	accepte	\N	2026-04-20 01:46:44.324339	2026-04-20 01:47:13.129528
\.


--
-- Data for Name: newsletter; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.newsletter (id_newsletter, email, date_inscription, id_user, preferences, titre, contenu) FROM stdin;
3	contact@test.fr	2026-03-26 21:18:42.887675+01	\N	general	\N	\N
4	test@gmail.com	2026-03-26 23:00:39.323881+01	2	sate,sport	Newsletter Avril	Voici les actualités du mois.
\.


--
-- Data for Name: note_avis; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.note_avis (id_avis, id_intervention, note, commentaire, date_publication) FROM stdin;
6	26	4	super humain	2026-04-18 23:35:14.746233+02
7	19	3	okok	2026-04-18 23:38:27.020273+02
8	17	3	interventions_senior.js?v=1776548296:253  POST http://144.76.74.130:8082/admin/note_avis/create 409 (Conflict)	2026-04-18 23:39:05.13217+02
9	32	3	za	2026-04-18 23:46:41.640368+02
10	15	3	test etoile	2026-04-19 11:25:47.255691+02
11	16	3	azer	2026-04-19 11:30:45.589578+02
12	14	3	frfrfrfrf	2026-04-19 11:32:16.423731+02
13	37	3	dfvg	2026-04-20 01:45:57.017304+02
\.


--
-- Data for Name: notification; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.notification (id, id_user, titre, message, type, est_lu, lien_redirection, date_creation) FROM stdin;
1	2	Rappel intervention	Votre intervention avec Sophie est prévue demain à 9h.	rappel	f	/interventions/1	2026-05-09 20:36:18.923179+02
2	3	Nouveau devis	Vous avez reçu un nouveau devis de Paul.	devis	f	/devis/2	2026-05-09 20:36:18.923179+02
3	4	Nouvelle réservation	Un senior a réservé votre service de ménage.	reservation	f	/interventions/3	2026-05-09 20:36:18.923179+02
4	17	Test notification	Ceci est un test	info	t	/users/seniors/accueil_senior.php	2026-05-09 20:36:18.923179+02
5	17	Test notification	Ceci est un test	info	t	/users/seniors/accueil_senior.php	2026-05-09 20:36:18.923179+02
6	17	Test notification	Ceci est un test	info	t	/users/seniors/accueil_senior.php	2026-05-09 20:36:18.923179+02
7	23	Test notification	Ceci est un test	info	f	/users/pro/accueil_pro.php	2026-05-09 20:40:06.137701+02
\.


--
-- Data for Name: offre_prestataire; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.offre_prestataire (id_offre, id_pro, id_service, prix_personnalise, titre, bio) FROM stdin;
2	5	5	40.00	Coaching sportif doux	Séances adaptées à votre condition physique, en douceur et en sécurité.
5	5	4	14.00	ezd	dqzferezdfvqsd
6	6	4	10.00	un papier	tailel
7	6	6	0.04	un papier	bfd
8	9	7	20.00	Nettoyage complet à domicile	Prestataire expérimentée, disponible en semaine.
9	9	4	20.00	Nettoyage complet à domicile	Prestataire expérimentée, disponible en semaine.
10	9	3	20.00	Nettoyage complet à domicile	Prestataire expérimentée, disponible en semaine.
11	5	1	20.00	Nettoyage complet à domicile	Prestataire expérimentée, disponible en semaine.
13	23	5	35.00	Remise en forme senior	Programme adapté aux seniors
15	23	6	24.00	fz	fz
17	23	3	15.00	aide assister ordi	je vous propose mon serice d'aide admin
\.


--
-- Data for Name: paiements; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.paiements (id_paiement, id_user, prix, type_objet, id_objet, date, stripe_session_id, stripe_paiement_id, statut) FROM stdin;
2	3	4.00	abonnement	2	2026-03-26 21:18:42.887675+01	\N	\N	complete
3	2	5.00	evenement	1	2026-03-26 21:18:42.887675+01	\N	\N	complete
4	2	22.50	intervention	1	2026-03-26 21:18:42.887675+01	\N	\N	complete
83	17	18.00	intervention	43	2026-05-06 16:48:15.302713+02	cs_test_a1oTxtVbLfu4HgKksUsgXkIwQ6GQZj27GzBiaeGcGRdfNsbTxZj1CiitcW	\N	en_attente
44	23	40.00	abonnement	23	2026-04-21 08:55:10.546732+02	cs_test_a1Y4XVx3M66XGVRZlQi166hti09YEzNuDiNrw0dAJVljKbpJIemfWZ26nZ	\N	paye
84	17	18.00	intervention	44	2026-05-06 17:03:04.116999+02	cs_test_a1GgWIYOg7WRVG4qrbfmTdLtTq3jAYmzgzyjRgzvz41KgzsNOgchHzAXz1	\N	paye
85	17	18.00	intervention	43	2026-05-06 17:03:26.138373+02	cs_test_a1CcGCerL9VcAIvkFlPoKFnyiK9SmkNUoE6uz6D9y47j9Lv4R2Vtpfrs05	\N	paye
86	23	40.00	abonnement	23	2026-05-07 22:05:02.775543+02	cs_test_a13kebZF8ItO6m0mhkMKMEOrQP10Aq23TcuIkrkrn1gjk4RAJd6m9wCvwm	\N	en_attente
11	23	40.00	abonnement	23	2026-04-19 16:02:27.702412+02	cs_test_a1dbiP7NKpeBIM4G9mFtWT9ho6wTDT6wXqmSSPfWoLcW94eTCC3Bfd8dSu	\N	paye
87	17	28.80	intervention	42	2026-05-07 22:09:30.790058+02	cs_test_a117EPoeXy3dZWx43f3idqAETsUOK7rUOhiWU6JKsFq3f9tGcyEAYD4nHI	\N	paye
88	17	24.00	panier	0	2026-05-09 20:21:25.447638+02	cs_test_a1Cq0gl9DfNR943AQL0plprxaukD1bKYPzww8yrYETFNFKDRc6jwa0SQFk	\N	en_attente
56	17	0.00	intervention	38	2026-04-21 09:06:19.35713+02	cs_test_a1tVuYpxEoGOwJj2yp6Ymsf7K6UL0tsRfhngcUQlpAb3VF4fIlH0XMgN54	\N	paye
89	17	24.00	panier	0	2026-05-09 20:21:53.068398+02	cs_test_a1OSh9HsL3nV6XNrQ2cCsk8SZ5akqKKhYgSlQLyS7sSl1G2yetOOccAc0z	\N	paye
16	23	40.00	abonnement	23	2026-04-19 16:10:30.68196+02	cs_test_a1wtZf5RiTcO3GhqdeV5qPi0U7f4IpKNrsYKZFYXAZaI3c0zuKXkYMYHi5	\N	paye
17	17	40.00	abonnement	17	2026-04-19 16:16:16.432723+02	cs_test_a1BzAe7cRELSkww3FyLVfXzFfsQgG0zJlvvkK2uVH89qpzcwJzq2hFNUs1	\N	paye
19	17	42.00	intervention	33	2026-04-19 16:29:20.661338+02	cs_test_a1DfXu0rnP10RSTr2vCEaqs2epQCfPXZBIjNZwWROMUwUoEdpo7ve8r3b3	\N	paye
20	17	0.00	panier	0	2026-04-19 16:56:31.228493+02	cs_test_a1sXMBjdS8OnwCRYm0QUfhOyYO1XjAufxVzNzD6a0jI5PbL9ZZOHBMnOw6	\N	paye
22	17	25.00	panier	0	2026-04-19 17:21:43.388877+02	cs_test_a1LuzLP9uTXJHye6zwWBTWQgmN9e8LVtBZp8NxZcu8EJXQH6ziwfnRccf8	\N	paye
23	17	40.00	panier	0	2026-04-19 17:22:38.390639+02	cs_test_a1bbEEszAV3njxOlg15MLQa3x8j6EQ1H3PCTwPFEbpk0uumSRyvxQyHQNG	\N	paye
25	17	50.00	panier	0	2026-04-19 17:31:59.114496+02	cs_test_b1QVNJgVu3mBQqujYj4j32plFeg07X2e7NT1u9XlVjf78S8wcAqKxHpCHB	\N	paye
26	23	40.00	abonnement	23	2026-04-19 21:21:23.015439+02	cs_test_a140P2pyG9EOJ7XsWPexYZ7Z0y6qUCMJpCf1Ct2coHu2gF01vUj0JeTHQt	\N	paye
27	23	40.00	abonnement	23	2026-04-19 21:22:16.292557+02	cs_test_a12d9flnuui5PcozUTskDfUCadIYJIIh5yECssvFc3yYWl4wKfT7uzhEuy	\N	paye
1	2	40.00	abonnement	1	2026-03-26 21:18:42.887675+01	cs_test_789	\N	paye
28	17	8.00	panier	0	2026-04-20 01:32:18.993588+02	cs_test_a1OK3qGE61VxX6TGelUqMBW2rTlvKsN9UsBg9IwTw0wdwBH5bnYcpuoVVI	\N	paye
68	17	54.00	panier	0	2026-05-05 00:03:43.332492+02	cs_test_a1xqKa2xaAh132XVRTIxGawyC7w2xheOdFH0iZResngpzfyxJKXd2O5ldm	\N	en_attente
69	17	36.00	panier	0	2026-05-05 00:04:37.416706+02	cs_test_a1QRyZfBEeYYzPUCzxN9xiFd4WmSxtyYdOc4fjJcDZkcsN7WWmbofPmucm	\N	en_attente
70	17	36.00	panier	0	2026-05-05 00:04:56.328746+02	cs_test_a1Bbmd29ZIAv3O8t2V9OSEtUdaTwUC947TrnRzCfPzBtP8868CHSivUaJb	\N	en_attente
71	17	36.00	panier	0	2026-05-05 00:06:44.493863+02	cs_test_a1ku3jvmHzBWLEfuaj1Yz3ai3DbnViGlHnK9G6W0KtvxuuW1CIrZNkgh5K	\N	en_attente
72	17	36.00	panier	0	2026-05-05 00:07:07.88352+02	cs_test_a1mKV9bL8n1l1jheYUP4GWsIUVffwVQfBnOD2fGrRBperU5RGvuwHiLkGm	\N	en_attente
37	23	40.00	abonnement	23	2026-04-20 01:41:53.515974+02	cs_test_a1Vl3Js4sPSeJYUmOTJZDnXYttDPMvIqxFcsmenK4QxCexUbeQFQVu2pAb	\N	paye
73	17	540.00	panier	0	2026-05-05 00:12:17.532493+02	cs_test_a1pmnbPIkTQ8mNIwCGm3UZXHBexiFu5RgNtC4WMSdqGemqJIBfNBLL8Zbc	\N	paye
74	17	540.00	panier	0	2026-05-05 00:13:02.165093+02	cs_test_a1kaPg7Ir4dopW0w1sng1GASyxH3p2mKrWG0yliqDKQzU8uSIeJOmjX6uZ	\N	paye
75	17	540.00	panier	0	2026-05-05 00:16:16.440803+02	cs_test_a17x0RxRxSqDwTfUgNcogPilNwd0OV1qHa4WyP5WDUv5wjoTlcG14flFB2	\N	paye
76	17	780.00	panier	0	2026-05-05 00:16:58.966297+02	cs_test_a1k0TTJPcygOD29pdg28yFt4HVKeHJyJsSXfpKJiKYROtqiVdRWGCZq4Xj	\N	en_attente
77	17	4.00	abonnement	17	2026-05-05 00:37:42.173108+02	cs_test_a1nq8BPUD3eXQyMzRAfdPCH7ZZk17aq0bRi6tROXo79CKEFoFot5KjrPzb	\N	paye
78	17	0.00	intervention	40	2026-05-05 14:35:27.380859+02	cs_test_a1arLrBTyxVjF0UFNJu1HsL4xSub2KHEMzmNN5eFkzkBKaMYeDS0clFGVS	\N	en_attente
79	17	0.00	intervention	40	2026-05-05 14:35:39.238273+02	cs_test_a1YTki7BAsZuC6oqnwciLfy6hJftOouIHkjXgco0NsQLk5A7bJ6sAee6ZE	\N	paye
18	17	42.00	intervention	36	2026-04-19 16:28:29.434176+02	cs_test_a1BXvh2s8mUjYXUqBKXw1bzZzFHZHA5NFZDnrbsDgxATgOLxRojqB4X1HV	\N	rembourse
80	17	0.00	intervention	41	2026-05-05 20:25:10.558854+02	cs_test_a1guGFvPQahacpvNVRbRgx1JaLJMr2fIBRzUObLbssd04raADOlXB4lpju	\N	rembourse
81	17	28.80	intervention	41	2026-05-05 20:29:36.792822+02	cs_test_a18pkJxc60OQVBmBiSwtLLfOYzoDqDjHXDaAQg0ml6B1P24Dd8qznTXXcH	\N	rembourse
82	17	28.80	intervention	41	2026-05-05 20:29:52.104637+02	cs_test_a1z2Un2QxVQqMawdwwrvkysUMzMK3GO9gneECQYlRmsR0BZXPeNlYyPBW2	\N	rembourse
\.


--
-- Data for Name: panier; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.panier (id_panier, id_user, type_objet, id_objet, quantite, date_ajout) FROM stdin;
\.


--
-- Data for Name: planning_pro; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.planning_pro (id_planning, id_pro, jour_semaine, heure_debut, heure_fin, est_actif, duree_intervention, pause_entre) FROM stdin;
4	5	1	09:00:00	18:00:00	t	60	0
5	5	4	09:00:00	13:00:00	t	60	0
7	9	6	19:31:00	21:32:00	t	60	0
14	23	2	09:00:00	18:00:00	t	60	0
15	23	4	09:00:00	18:00:00	t	60	0
36	23	4	19:00:00	20:00:00	t	60	0
37	23	1	09:00:00	18:00:00	t	60	0
38	23	1	18:00:00	21:00:00	t	90	0
\.


--
-- Data for Name: planning_senior; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.planning_senior (id_agenda, id_senior, id_intervention, rappel_notification, note_perso) FROM stdin;
\.


--
-- Data for Name: profile_admin; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.profile_admin (id_user, nom, prenom, genre, telephone) FROM stdin;
26	Happy	Support	\N	\N
\.


--
-- Data for Name: profile_pro; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.profile_pro (id_user, nom, prenom, date_naissance, genre, statut_juridique, nom_entreprise, adresse_pro, id_type, statut_validation, is_subscription_valid, siret, bio, rib, telephone_pro, logo_url, note_moyenne, commission, is_first_login) FROM stdin;
9	MARTIN	Sophie	\N	\N	\N	\N	\N	4	valide	f	\N	\N	\N	\N	\N	3.00	15.00	t
23	Houari	Zakaria	2020-04-17	homme	auto-entrepreneur	Zakaria Houari	81 rue du chevaleret	8	valide	f	01345678765432	azertyhjhbgvfcdxs	azertyuiop	0638057605	\N	3.25	15.00	t
5	BERNARD	Paul	1978-11-30	Masculin	auto-entrepreneur	Paul Coach	8 rue du Sport, 75016 Paris	\N	valide	t	98765432109876	Coach sportif certifié pour seniors.	\N	0644444444	\N	0.00	15.00	t
6	Houari	Zakaria	2004-06-28	Féminin	auto-entrepreneur	Zakaria Houari	81 rue du chevaleret	\N	en_attente	f	01345678765444	huiyvug	FFRE344	0638057605	\N	0.00	15.00	t
\.


--
-- Data for Name: profile_senior; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.profile_senior (id_user, nom, prenom, genre, date_naissance, is_first_login, is_subscription_valid, adresse, telephone) FROM stdin;
10	DUPONT	Jean	\N	\N	t	f	\N	\N
2	DUPONT	Jean	Masculin	1950-03-15	f	t	12 rue de la Paix, 75002 Paris	0761111141
19	Houari	Zakaria	Masculin	2008-04-03	t	f	81 rue du chevaleret	0638057605
17	Houari	Zakaria	Féminin	2004-02-29	t	t	81 rue du chevaleret	0638057605
\.


--
-- Data for Name: referencement; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.referencement (id, id_pro, type, prix, date_debut, date_fin, actif, stripe_session_id) FROM stdin;
1	23	mois	15.00	2026-04-19 22:45:37.203469	2026-05-19 20:45:37.201593	t	\N
2	23	mois	15.00	2026-04-21 08:55:41.904077	2026-05-21 06:55:41.90352	t	\N
\.


--
-- Data for Name: service; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.service (id, id_categorie, nom, description, prix_reference, image_url) FROM stdin;
1	1	Nettoyage complet	Ménage de printemps, sols, vitres et poussière.	25.00	\N
3	2	Aide déclaration impôts	Accompagnement pour les démarches administratives.	40.00	\N
4	4	Massage bien-être	Séance de massage relaxant à domicile.	60.00	\N
5	5	Coaching sportif	Séance de sport adaptée aux seniors.	45.00	\N
6	2	zak	\N	10.00	\N
7	1	Nettoyage complet	\N	25.00	\N
\.


--
-- Data for Name: type_prestataire; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.type_prestataire (id_type, nom_type) FROM stdin;
3	Kinésithérapeute
4	Aide à domicile
5	Animateur
6	Jardinier
9	Informaticien
10	Chauffeur
11	Garde d'animaux
12	Décorateur
13	Comptable
15	Autre
16	Médecin
25	Ergothérapeute
8	Coach sportif
\.


--
-- Data for Name: type_prestataire_categorie; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.type_prestataire_categorie (id_type, id_categorie) FROM stdin;
8	2
8	5
4	1
4	2
4	3
3	4
3	9
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id_user, email, password_hash, role, token_session, date_inscription, accepte_newsletter, est_banni, ban_jusqu_au, ban_raison, onesignal_player_id) FROM stdin;
1	zakaria.pro24@gmail.com	$2a$10$sl2v2bL4oYnh6dC6lm0R0.ZQL7B04lbGFCtyeEfhnW1CPns0KgC.W	senior	\N	2026-03-26 21:15:05.137424+01	f	f	\N	\N	\N
2	admin@silverhappy.fr	$2a$10$akOZUShOZFXXYAi93JCFf.Vv56NCJqoq.kajwWJ7FPCH6W7Fke3m2	admin	\N	2026-03-26 21:18:42.887675+01	f	f	\N	\N	\N
4	marie.martin@gmail.com	$2a$10$akOZUShOZFXXYAi93JCFf.Vv56NCJqoq.kajwWJ7FPCH6W7Fke3m2	senior	\N	2026-03-26 21:18:42.887675+01	f	f	\N	\N	\N
5	sophie.pro@gmail.com	$2a$10$akOZUShOZFXXYAi93JCFf.Vv56NCJqoq.kajwWJ7FPCH6W7Fke3m2	pro	\N	2026-03-26 21:18:42.887675+01	f	f	\N	\N	\N
6	paul.pro@gmail.com	$2a$10$akOZUShOZFXXYAi93JCFf.Vv56NCJqoq.kajwWJ7FPCH6W7Fke3m2	pro	\N	2026-03-26 21:18:42.887675+01	t	f	\N	\N	\N
9	pro@test.com	$2a$10$akOZUShOZFXXYAi93JCFf.Vv56NCJqoq.kajwWJ7FPCH6W7Fke3m2	pro	\N	2026-03-27 10:32:48.096793+01	f	f	\N	\N	\N
10	senior@test.com	$2a$10$akOZUShOZFXXYAi93JCFf.Vv56NCJqoq.kajwWJ7FPCH6W7Fke3m2	senior	\N	2026-03-27 10:33:29.207571+01	f	f	\N	\N	\N
17	a@a.a	$2a$10$OiRy05Kvj/l/ZDre5SoyRuESvCQYlRuNdXvTIckGJPI4h73KkaTeK	senior	\N	2026-03-29 15:32:59.889042+02	f	f	\N	\N	\N
19	zakaria.pr24@gmail.com	$2a$10$ldvlbSTSCZ8rtWcRzhjU8Ozab2OsDBTdIyIWlTfVjH0pYbxUi08QC	senior	\N	2026-04-18 12:03:23.85538+02	f	f	\N	\N	\N
23	zakaria24@gmail.com	$2a$10$la2Z68.fuecS6JyCJZRUz.Ht/t4mghXnMJ9V2l0QSM5knq.kfgpV.	pro	\N	2026-04-18 14:06:18.271701+02	f	f	\N	\N	\N
24	z@z.z	$2a$10$qktYHDdAQ3UaHY52wiCvR.v8Qp/0mEE.x5j1XAXODnU4ZIoC.6EFa	admin	\N	2026-04-19 23:47:40.023086+02	f	f	\N	\N	\N
3	jean.dupont@gmail.com	$2a$10$akOZUShOZFXXYAi93JCFf.Vv56NCJqoq.kajwWJ7FPCH6W7Fke3m2	senior	\N	2026-03-26 21:18:42.887675+01	t	t	\N		\N
26	support@silverhappy.fr	$2a$10$dummy	admin	\N	2026-05-08 18:24:06.432492+02	f	f	\N	\N	\N
\.


--
-- Data for Name: virement; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.virement (id_virement, id_pro, id_facture, id_intervention, montant, statut, date_creation, date_virement) FROM stdin;
2	23	9	37	17.00	effectue	2026-05-05 15:06:56.288156+02	2026-05-05 15:06:56.287541+02
3	9	6	8	34.00	effectue	2026-05-05 18:28:33.285025+02	2026-05-05 18:28:33.23995+02
5	9	7	9	29.75	effectue	2026-05-05 18:29:03.455671+02	2026-05-05 18:29:03.454262+02
6	23	29	43	12.75	effectue	2026-05-06 17:03:41.91686+02	2026-05-06 17:03:41.916106+02
7	23	30	42	20.40	effectue	2026-05-07 22:09:50.60591+02	2026-05-07 22:09:50.604664+02
\.


--
-- Name: abonnement_id_abonnement_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.abonnement_id_abonnement_seq', 25, true);


--
-- Name: article_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.article_id_seq', 7, true);


--
-- Name: categorie_article_id_categorie_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.categorie_article_id_categorie_seq', 5, true);


--
-- Name: categorie_document_id_categorie_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.categorie_document_id_categorie_seq', 41, true);


--
-- Name: categorie_evenement_id_categorie_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.categorie_evenement_id_categorie_seq', 5, true);


--
-- Name: categorie_services_id_categorie_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.categorie_services_id_categorie_seq', 10, true);


--
-- Name: conseil_id_conseil_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.conseil_id_conseil_seq', 6, true);


--
-- Name: demande_service_id_demande_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.demande_service_id_demande_seq', 34, true);


--
-- Name: devis_id_devis_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.devis_id_devis_seq', 26, true);


--
-- Name: documents_pro_id_doc_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.documents_pro_id_doc_seq', 17, true);


--
-- Name: evenements_id_evenement_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.evenements_id_evenement_seq', 7, true);


--
-- Name: facture_id_facture_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.facture_id_facture_seq', 31, true);


--
-- Name: inscription_evenement_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.inscription_evenement_id_seq', 36, true);


--
-- Name: intervention_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.intervention_id_seq', 45, true);


--
-- Name: litige_message_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.litige_message_id_seq', 3, true);


--
-- Name: litige_preuve_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.litige_preuve_id_seq', 1, false);


--
-- Name: litiges_id_litige_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.litiges_id_litige_seq', 8, true);


--
-- Name: messagerie_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.messagerie_id_seq', 17, true);


--
-- Name: migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.migrations_id_seq', 32, true);


--
-- Name: negociation_commission_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.negociation_commission_id_seq', 2, true);


--
-- Name: newsletter_id_newsletter_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.newsletter_id_newsletter_seq', 4, true);


--
-- Name: note_avis_id_avis_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.note_avis_id_avis_seq', 13, true);


--
-- Name: notification_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.notification_id_seq', 7, true);


--
-- Name: offre_prestataire_id_offre_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.offre_prestataire_id_offre_seq', 17, true);


--
-- Name: paiements_id_paiement_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.paiements_id_paiement_seq', 89, true);


--
-- Name: panier_id_panier_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.panier_id_panier_seq', 102, true);


--
-- Name: planning_pro_id_planning_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.planning_pro_id_planning_seq', 38, true);


--
-- Name: planning_senior_id_agenda_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.planning_senior_id_agenda_seq', 4, true);


--
-- Name: referencement_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.referencement_id_seq', 2, true);


--
-- Name: service_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.service_id_seq', 7, true);


--
-- Name: type_prestataire_id_type_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.type_prestataire_id_type_seq', 25, true);


--
-- Name: users_id_user_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_user_seq', 26, true);


--
-- Name: virement_id_virement_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.virement_id_virement_seq', 7, true);


--
-- Name: abonnement abonnement_id_user_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.abonnement
    ADD CONSTRAINT abonnement_id_user_key UNIQUE (id_user);


--
-- Name: abonnement abonnement_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.abonnement
    ADD CONSTRAINT abonnement_pkey PRIMARY KEY (id_abonnement);


--
-- Name: abonnement abonnement_stripe_subscription_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.abonnement
    ADD CONSTRAINT abonnement_stripe_subscription_id_key UNIQUE (stripe_subscription_id);


--
-- Name: article article_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.article
    ADD CONSTRAINT article_pkey PRIMARY KEY (id);


--
-- Name: categorie_article categorie_article_nom_categorie_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categorie_article
    ADD CONSTRAINT categorie_article_nom_categorie_key UNIQUE (nom_categorie);


--
-- Name: categorie_article categorie_article_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categorie_article
    ADD CONSTRAINT categorie_article_pkey PRIMARY KEY (id_categorie);


--
-- Name: categorie_document categorie_document_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categorie_document
    ADD CONSTRAINT categorie_document_pkey PRIMARY KEY (id_categorie);


--
-- Name: categorie_evenement categorie_evenement_nom_categorie_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categorie_evenement
    ADD CONSTRAINT categorie_evenement_nom_categorie_key UNIQUE (nom_categorie);


--
-- Name: categorie_evenement categorie_evenement_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categorie_evenement
    ADD CONSTRAINT categorie_evenement_pkey PRIMARY KEY (id_categorie);


--
-- Name: categorie_services categorie_services_nom_categorie_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categorie_services
    ADD CONSTRAINT categorie_services_nom_categorie_key UNIQUE (nom_categorie);


--
-- Name: categorie_services categorie_services_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categorie_services
    ADD CONSTRAINT categorie_services_pkey PRIMARY KEY (id_categorie);


--
-- Name: conseil conseil_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.conseil
    ADD CONSTRAINT conseil_pkey PRIMARY KEY (id_conseil);


--
-- Name: demande_service demande_service_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.demande_service
    ADD CONSTRAINT demande_service_pkey PRIMARY KEY (id_demande);


--
-- Name: demande_service demande_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.demande_service
    ADD CONSTRAINT demande_unique UNIQUE (id_senior, id_offre, date_souhaitee);


--
-- Name: devis devis_id_intervention_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.devis
    ADD CONSTRAINT devis_id_intervention_key UNIQUE (id_intervention);


--
-- Name: devis devis_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.devis
    ADD CONSTRAINT devis_pkey PRIMARY KEY (id_devis);


--
-- Name: documents_pro documents_pro_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.documents_pro
    ADD CONSTRAINT documents_pro_pkey PRIMARY KEY (id_doc);


--
-- Name: evenements evenements_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.evenements
    ADD CONSTRAINT evenements_pkey PRIMARY KEY (id_evenement);


--
-- Name: facture facture_id_intervention_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.facture
    ADD CONSTRAINT facture_id_intervention_key UNIQUE (id_intervention);


--
-- Name: facture facture_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.facture
    ADD CONSTRAINT facture_pkey PRIMARY KEY (id_facture);


--
-- Name: inscription_evenement inscription_evenement_id_user_id_evenement_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inscription_evenement
    ADD CONSTRAINT inscription_evenement_id_user_id_evenement_key UNIQUE (id_user, id_evenement);


--
-- Name: inscription_evenement inscription_evenement_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inscription_evenement
    ADD CONSTRAINT inscription_evenement_pkey PRIMARY KEY (id);


--
-- Name: intervention intervention_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.intervention
    ADD CONSTRAINT intervention_pkey PRIMARY KEY (id);


--
-- Name: litige_message litige_message_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.litige_message
    ADD CONSTRAINT litige_message_pkey PRIMARY KEY (id);


--
-- Name: litige_preuve litige_preuve_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.litige_preuve
    ADD CONSTRAINT litige_preuve_pkey PRIMARY KEY (id);


--
-- Name: litiges litiges_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.litiges
    ADD CONSTRAINT litiges_pkey PRIMARY KEY (id_litige);


--
-- Name: messagerie messagerie_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.messagerie
    ADD CONSTRAINT messagerie_pkey PRIMARY KEY (id);


--
-- Name: migrations migrations_filename_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.migrations
    ADD CONSTRAINT migrations_filename_key UNIQUE (filename);


--
-- Name: migrations migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.migrations
    ADD CONSTRAINT migrations_pkey PRIMARY KEY (id);


--
-- Name: negociation_commission negociation_commission_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.negociation_commission
    ADD CONSTRAINT negociation_commission_pkey PRIMARY KEY (id);


--
-- Name: newsletter newsletter_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.newsletter
    ADD CONSTRAINT newsletter_email_key UNIQUE (email);


--
-- Name: newsletter newsletter_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.newsletter
    ADD CONSTRAINT newsletter_pkey PRIMARY KEY (id_newsletter);


--
-- Name: note_avis note_avis_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.note_avis
    ADD CONSTRAINT note_avis_pkey PRIMARY KEY (id_avis);


--
-- Name: notification notification_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notification
    ADD CONSTRAINT notification_pkey PRIMARY KEY (id);


--
-- Name: offre_prestataire offre_prestataire_id_pro_id_service_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.offre_prestataire
    ADD CONSTRAINT offre_prestataire_id_pro_id_service_key UNIQUE (id_pro, id_service);


--
-- Name: offre_prestataire offre_prestataire_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.offre_prestataire
    ADD CONSTRAINT offre_prestataire_pkey PRIMARY KEY (id_offre);


--
-- Name: paiements paiements_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.paiements
    ADD CONSTRAINT paiements_pkey PRIMARY KEY (id_paiement);


--
-- Name: paiements paiements_stripe_paiement_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.paiements
    ADD CONSTRAINT paiements_stripe_paiement_id_key UNIQUE (stripe_paiement_id);


--
-- Name: paiements paiements_stripe_session_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.paiements
    ADD CONSTRAINT paiements_stripe_session_id_key UNIQUE (stripe_session_id);


--
-- Name: panier panier_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.panier
    ADD CONSTRAINT panier_pkey PRIMARY KEY (id_panier);


--
-- Name: panier panier_unique_item; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.panier
    ADD CONSTRAINT panier_unique_item UNIQUE (id_user, type_objet, id_objet);


--
-- Name: planning_pro planning_pro_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.planning_pro
    ADD CONSTRAINT planning_pro_pkey PRIMARY KEY (id_planning);


--
-- Name: planning_senior planning_senior_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.planning_senior
    ADD CONSTRAINT planning_senior_pkey PRIMARY KEY (id_agenda);


--
-- Name: profile_admin profile_admin_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profile_admin
    ADD CONSTRAINT profile_admin_pkey PRIMARY KEY (id_user);


--
-- Name: profile_pro profile_pro_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profile_pro
    ADD CONSTRAINT profile_pro_pkey PRIMARY KEY (id_user);


--
-- Name: profile_pro profile_pro_siret_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profile_pro
    ADD CONSTRAINT profile_pro_siret_key UNIQUE (siret);


--
-- Name: profile_senior profile_senior_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profile_senior
    ADD CONSTRAINT profile_senior_pkey PRIMARY KEY (id_user);


--
-- Name: referencement referencement_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.referencement
    ADD CONSTRAINT referencement_pkey PRIMARY KEY (id);


--
-- Name: service service_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.service
    ADD CONSTRAINT service_pkey PRIMARY KEY (id);


--
-- Name: type_prestataire_categorie type_prestataire_categorie_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.type_prestataire_categorie
    ADD CONSTRAINT type_prestataire_categorie_pkey PRIMARY KEY (id_type, id_categorie);


--
-- Name: type_prestataire type_prestataire_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.type_prestataire
    ADD CONSTRAINT type_prestataire_pkey PRIMARY KEY (id_type);


--
-- Name: note_avis unique_avis_intervention; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.note_avis
    ADD CONSTRAINT unique_avis_intervention UNIQUE (id_intervention);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id_user);


--
-- Name: virement virement_intervention_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.virement
    ADD CONSTRAINT virement_intervention_unique UNIQUE (id_intervention);


--
-- Name: virement virement_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.virement
    ADD CONSTRAINT virement_pkey PRIMARY KEY (id_virement);


--
-- Name: abonnement abonnement_id_user_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.abonnement
    ADD CONSTRAINT abonnement_id_user_fkey FOREIGN KEY (id_user) REFERENCES public.users(id_user) ON DELETE CASCADE;


--
-- Name: article article_id_categorie_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.article
    ADD CONSTRAINT article_id_categorie_fkey FOREIGN KEY (id_categorie) REFERENCES public.categorie_article(id_categorie) ON DELETE RESTRICT;


--
-- Name: article article_id_user_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.article
    ADD CONSTRAINT article_id_user_fkey FOREIGN KEY (id_user) REFERENCES public.users(id_user) ON DELETE SET NULL;


--
-- Name: categorie_document categorie_document_id_type_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categorie_document
    ADD CONSTRAINT categorie_document_id_type_fkey FOREIGN KEY (id_type) REFERENCES public.type_prestataire(id_type) ON DELETE CASCADE;


--
-- Name: demande_service demande_service_id_offre_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.demande_service
    ADD CONSTRAINT demande_service_id_offre_fkey FOREIGN KEY (id_offre) REFERENCES public.offre_prestataire(id_offre) ON DELETE CASCADE;


--
-- Name: demande_service demande_service_id_senior_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.demande_service
    ADD CONSTRAINT demande_service_id_senior_fkey FOREIGN KEY (id_senior) REFERENCES public.profile_senior(id_user) ON DELETE CASCADE;


--
-- Name: devis devis_id_intervention_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.devis
    ADD CONSTRAINT devis_id_intervention_fkey FOREIGN KEY (id_intervention) REFERENCES public.intervention(id) ON DELETE SET NULL;


--
-- Name: devis devis_id_pro_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.devis
    ADD CONSTRAINT devis_id_pro_fkey FOREIGN KEY (id_pro) REFERENCES public.profile_pro(id_user) ON DELETE CASCADE;


--
-- Name: devis devis_id_senior_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.devis
    ADD CONSTRAINT devis_id_senior_fkey FOREIGN KEY (id_senior) REFERENCES public.profile_senior(id_user) ON DELETE CASCADE;


--
-- Name: devis devis_id_service_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.devis
    ADD CONSTRAINT devis_id_service_fkey FOREIGN KEY (id_service) REFERENCES public.service(id) ON DELETE CASCADE;


--
-- Name: documents_pro documents_pro_id_user_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.documents_pro
    ADD CONSTRAINT documents_pro_id_user_fkey FOREIGN KEY (id_user) REFERENCES public.profile_pro(id_user) ON DELETE CASCADE;


--
-- Name: evenements evenements_id_categorie_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.evenements
    ADD CONSTRAINT evenements_id_categorie_fkey FOREIGN KEY (id_categorie) REFERENCES public.categorie_evenement(id_categorie) ON DELETE RESTRICT;


--
-- Name: evenements evenements_id_createur_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.evenements
    ADD CONSTRAINT evenements_id_createur_fkey FOREIGN KEY (id_createur) REFERENCES public.users(id_user) ON DELETE SET NULL;


--
-- Name: facture facture_id_emetteur_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.facture
    ADD CONSTRAINT facture_id_emetteur_fkey FOREIGN KEY (id_emetteur) REFERENCES public.users(id_user) ON DELETE RESTRICT;


--
-- Name: facture facture_id_intervention_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.facture
    ADD CONSTRAINT facture_id_intervention_fkey FOREIGN KEY (id_intervention) REFERENCES public.intervention(id) ON DELETE RESTRICT;


--
-- Name: facture facture_id_recepteur_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.facture
    ADD CONSTRAINT facture_id_recepteur_fkey FOREIGN KEY (id_recepteur) REFERENCES public.users(id_user) ON DELETE RESTRICT;


--
-- Name: documents_pro fk_documents_pro_categorie; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.documents_pro
    ADD CONSTRAINT fk_documents_pro_categorie FOREIGN KEY (id_categorie) REFERENCES public.categorie_document(id_categorie);


--
-- Name: profile_pro fk_profile_pro_type; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profile_pro
    ADD CONSTRAINT fk_profile_pro_type FOREIGN KEY (id_type) REFERENCES public.type_prestataire(id_type);


--
-- Name: inscription_evenement inscription_evenement_id_evenement_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inscription_evenement
    ADD CONSTRAINT inscription_evenement_id_evenement_fkey FOREIGN KEY (id_evenement) REFERENCES public.evenements(id_evenement) ON DELETE CASCADE;


--
-- Name: inscription_evenement inscription_evenement_id_user_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inscription_evenement
    ADD CONSTRAINT inscription_evenement_id_user_fkey FOREIGN KEY (id_user) REFERENCES public.users(id_user) ON DELETE CASCADE;


--
-- Name: intervention intervention_id_pro_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.intervention
    ADD CONSTRAINT intervention_id_pro_fkey FOREIGN KEY (id_pro) REFERENCES public.profile_pro(id_user) ON DELETE RESTRICT;


--
-- Name: intervention intervention_id_senior_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.intervention
    ADD CONSTRAINT intervention_id_senior_fkey FOREIGN KEY (id_senior) REFERENCES public.profile_senior(id_user) ON DELETE RESTRICT;


--
-- Name: intervention intervention_id_service_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.intervention
    ADD CONSTRAINT intervention_id_service_fkey FOREIGN KEY (id_service) REFERENCES public.service(id) ON DELETE RESTRICT;


--
-- Name: litige_message litige_message_id_litige_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.litige_message
    ADD CONSTRAINT litige_message_id_litige_fkey FOREIGN KEY (id_litige) REFERENCES public.litiges(id_litige) ON DELETE CASCADE;


--
-- Name: litige_message litige_message_id_user_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.litige_message
    ADD CONSTRAINT litige_message_id_user_fkey FOREIGN KEY (id_user) REFERENCES public.users(id_user) ON DELETE CASCADE;


--
-- Name: litige_preuve litige_preuve_id_litige_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.litige_preuve
    ADD CONSTRAINT litige_preuve_id_litige_fkey FOREIGN KEY (id_litige) REFERENCES public.litiges(id_litige) ON DELETE CASCADE;


--
-- Name: litige_preuve litige_preuve_id_user_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.litige_preuve
    ADD CONSTRAINT litige_preuve_id_user_fkey FOREIGN KEY (id_user) REFERENCES public.users(id_user) ON DELETE CASCADE;


--
-- Name: litiges litiges_id_intervention_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.litiges
    ADD CONSTRAINT litiges_id_intervention_fkey FOREIGN KEY (id_intervention) REFERENCES public.intervention(id) ON DELETE RESTRICT;


--
-- Name: litiges litiges_id_pro_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.litiges
    ADD CONSTRAINT litiges_id_pro_fkey FOREIGN KEY (id_pro) REFERENCES public.users(id_user);


--
-- Name: litiges litiges_id_senior_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.litiges
    ADD CONSTRAINT litiges_id_senior_fkey FOREIGN KEY (id_senior) REFERENCES public.users(id_user);


--
-- Name: messagerie messagerie_id_destinataire_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.messagerie
    ADD CONSTRAINT messagerie_id_destinataire_fkey FOREIGN KEY (id_destinataire) REFERENCES public.users(id_user) ON DELETE CASCADE;


--
-- Name: messagerie messagerie_id_expediteur_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.messagerie
    ADD CONSTRAINT messagerie_id_expediteur_fkey FOREIGN KEY (id_expediteur) REFERENCES public.users(id_user) ON DELETE CASCADE;


--
-- Name: negociation_commission negociation_commission_id_pro_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.negociation_commission
    ADD CONSTRAINT negociation_commission_id_pro_fkey FOREIGN KEY (id_pro) REFERENCES public.users(id_user) ON DELETE CASCADE;


--
-- Name: newsletter newsletter_id_user_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.newsletter
    ADD CONSTRAINT newsletter_id_user_fkey FOREIGN KEY (id_user) REFERENCES public.users(id_user) ON DELETE SET NULL;


--
-- Name: note_avis note_avis_id_intervention_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.note_avis
    ADD CONSTRAINT note_avis_id_intervention_fkey FOREIGN KEY (id_intervention) REFERENCES public.intervention(id) ON DELETE CASCADE;


--
-- Name: notification notification_id_user_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notification
    ADD CONSTRAINT notification_id_user_fkey FOREIGN KEY (id_user) REFERENCES public.users(id_user) ON DELETE CASCADE;


--
-- Name: offre_prestataire offre_prestataire_id_pro_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.offre_prestataire
    ADD CONSTRAINT offre_prestataire_id_pro_fkey FOREIGN KEY (id_pro) REFERENCES public.profile_pro(id_user) ON DELETE CASCADE;


--
-- Name: offre_prestataire offre_prestataire_id_service_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.offre_prestataire
    ADD CONSTRAINT offre_prestataire_id_service_fkey FOREIGN KEY (id_service) REFERENCES public.service(id) ON DELETE CASCADE;


--
-- Name: paiements paiements_id_user_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.paiements
    ADD CONSTRAINT paiements_id_user_fkey FOREIGN KEY (id_user) REFERENCES public.users(id_user) ON DELETE RESTRICT;


--
-- Name: panier panier_id_user_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.panier
    ADD CONSTRAINT panier_id_user_fkey FOREIGN KEY (id_user) REFERENCES public.users(id_user) ON DELETE CASCADE;


--
-- Name: planning_pro planning_pro_id_pro_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.planning_pro
    ADD CONSTRAINT planning_pro_id_pro_fkey FOREIGN KEY (id_pro) REFERENCES public.profile_pro(id_user) ON DELETE CASCADE;


--
-- Name: planning_senior planning_senior_id_intervention_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.planning_senior
    ADD CONSTRAINT planning_senior_id_intervention_fkey FOREIGN KEY (id_intervention) REFERENCES public.intervention(id) ON DELETE CASCADE;


--
-- Name: planning_senior planning_senior_id_senior_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.planning_senior
    ADD CONSTRAINT planning_senior_id_senior_fkey FOREIGN KEY (id_senior) REFERENCES public.profile_senior(id_user) ON DELETE CASCADE;


--
-- Name: profile_admin profile_admin_id_user_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profile_admin
    ADD CONSTRAINT profile_admin_id_user_fkey FOREIGN KEY (id_user) REFERENCES public.users(id_user) ON DELETE CASCADE;


--
-- Name: profile_pro profile_pro_id_user_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profile_pro
    ADD CONSTRAINT profile_pro_id_user_fkey FOREIGN KEY (id_user) REFERENCES public.users(id_user) ON DELETE CASCADE;


--
-- Name: profile_senior profile_senior_id_user_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profile_senior
    ADD CONSTRAINT profile_senior_id_user_fkey FOREIGN KEY (id_user) REFERENCES public.users(id_user) ON DELETE CASCADE;


--
-- Name: referencement referencement_id_pro_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.referencement
    ADD CONSTRAINT referencement_id_pro_fkey FOREIGN KEY (id_pro) REFERENCES public.users(id_user) ON DELETE CASCADE;


--
-- Name: service service_id_categorie_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.service
    ADD CONSTRAINT service_id_categorie_fkey FOREIGN KEY (id_categorie) REFERENCES public.categorie_services(id_categorie) ON DELETE RESTRICT;


--
-- Name: type_prestataire_categorie type_prestataire_categorie_id_categorie_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.type_prestataire_categorie
    ADD CONSTRAINT type_prestataire_categorie_id_categorie_fkey FOREIGN KEY (id_categorie) REFERENCES public.categorie_services(id_categorie) ON DELETE CASCADE;


--
-- Name: type_prestataire_categorie type_prestataire_categorie_id_type_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.type_prestataire_categorie
    ADD CONSTRAINT type_prestataire_categorie_id_type_fkey FOREIGN KEY (id_type) REFERENCES public.type_prestataire(id_type) ON DELETE CASCADE;


--
-- Name: virement virement_id_facture_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.virement
    ADD CONSTRAINT virement_id_facture_fkey FOREIGN KEY (id_facture) REFERENCES public.facture(id_facture) ON DELETE CASCADE;


--
-- Name: virement virement_id_intervention_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.virement
    ADD CONSTRAINT virement_id_intervention_fkey FOREIGN KEY (id_intervention) REFERENCES public.intervention(id) ON DELETE SET NULL;


--
-- Name: virement virement_id_pro_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.virement
    ADD CONSTRAINT virement_id_pro_fkey FOREIGN KEY (id_pro) REFERENCES public.users(id_user) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict XHvgxM7pYSh4RmxgpX3vj4gypK5GFTgECmRCXEZ2t9H5zZN2aVmMqd1NDFO91AS

