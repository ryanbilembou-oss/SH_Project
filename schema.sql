--
-- PostgreSQL database dump
--

\restrict QvtYvCD9w5Zv1hJBZ9bn1CTzjZ7yOrlrsOMrIfWVORhje9ClL9QwDuepipPRg15

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
    stripe_subscription_id character varying(255) NOT NULL
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
    statut character varying(50) DEFAULT 'en_attente'::character varying
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
    pdf_url character varying(255) NOT NULL
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
-- Name: litiges; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.litiges (
    id_litige integer NOT NULL,
    id_intervention integer NOT NULL,
    motif text NOT NULL,
    statut character varying(50) DEFAULT 'ouvert'::character varying,
    date_ouverture timestamp with time zone DEFAULT CURRENT_TIMESTAMP
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
    lien_redirection character varying(255)
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
    CONSTRAINT paiements_type_objet_check CHECK (((type_objet)::text = ANY ((ARRAY['article'::character varying, 'abonnement'::character varying, 'evenement'::character varying, 'intervention'::character varying])::text[])))
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
-- Name: planning_pro; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.planning_pro (
    id_planning integer NOT NULL,
    id_pro integer NOT NULL,
    jour_semaine integer,
    heure_debut time without time zone NOT NULL,
    heure_fin time without time zone NOT NULL,
    est_actif boolean DEFAULT true,
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
-- Name: planning_pro id_planning; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.planning_pro ALTER COLUMN id_planning SET DEFAULT nextval('public.planning_pro_id_planning_seq'::regclass);


--
-- Name: planning_senior id_agenda; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.planning_senior ALTER COLUMN id_agenda SET DEFAULT nextval('public.planning_senior_id_agenda_seq'::regclass);


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
-- Name: service service_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.service
    ADD CONSTRAINT service_pkey PRIMARY KEY (id);


--
-- Name: type_prestataire type_prestataire_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.type_prestataire
    ADD CONSTRAINT type_prestataire_pkey PRIMARY KEY (id_type);


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
-- Name: litiges litiges_id_intervention_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.litiges
    ADD CONSTRAINT litiges_id_intervention_fkey FOREIGN KEY (id_intervention) REFERENCES public.intervention(id) ON DELETE RESTRICT;


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
-- Name: service service_id_categorie_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.service
    ADD CONSTRAINT service_id_categorie_fkey FOREIGN KEY (id_categorie) REFERENCES public.categorie_services(id_categorie) ON DELETE RESTRICT;


--
-- PostgreSQL database dump complete
--

\unrestrict QvtYvCD9w5Zv1hJBZ9bn1CTzjZ7yOrlrsOMrIfWVORhje9ClL9QwDuepipPRg15

