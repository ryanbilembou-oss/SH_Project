--
-- PostgreSQL database dump
--

\restrict s11iSHtwrX1hB19EvfSTRTKTmNh6qm5Gjyph11QIJeZgGKlxq7ImHxhiXSFHqBM

-- Dumped from database version 16.13
-- Dumped by pg_dump version 16.11

-- Started on 2026-03-26 09:41:32 UTC

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

--
-- TOC entry 3774 (class 1262 OID 16384)
-- Name: silver_happy; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE silver_happy WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';


ALTER DATABASE silver_happy OWNER TO postgres;

\unrestrict s11iSHtwrX1hB19EvfSTRTKTmNh6qm5Gjyph11QIJeZgGKlxq7ImHxhiXSFHqBM
\connect silver_happy
\restrict s11iSHtwrX1hB19EvfSTRTKTmNh6qm5Gjyph11QIJeZgGKlxq7ImHxhiXSFHqBM

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
-- TOC entry 253 (class 1259 OID 16719)
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
-- TOC entry 252 (class 1259 OID 16718)
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
-- TOC entry 3775 (class 0 OID 0)
-- Dependencies: 252
-- Name: abonnement_id_abonnement_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.abonnement_id_abonnement_seq OWNED BY public.abonnement.id_abonnement;


--
-- TOC entry 233 (class 1259 OID 16517)
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
-- TOC entry 232 (class 1259 OID 16516)
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
-- TOC entry 3776 (class 0 OID 0)
-- Dependencies: 232
-- Name: article_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.article_id_seq OWNED BY public.article.id;


--
-- TOC entry 220 (class 1259 OID 16413)
-- Name: categorie_article; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.categorie_article (
    id_categorie integer NOT NULL,
    nom_categorie character varying(100) NOT NULL
);


ALTER TABLE public.categorie_article OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16412)
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
-- TOC entry 3777 (class 0 OID 0)
-- Dependencies: 219
-- Name: categorie_article_id_categorie_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.categorie_article_id_categorie_seq OWNED BY public.categorie_article.id_categorie;


--
-- TOC entry 267 (class 1259 OID 16840)
-- Name: categorie_document; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.categorie_document (
    id_categorie integer NOT NULL,
    id_type integer NOT NULL,
    nom_categorie character varying(100) NOT NULL
);


ALTER TABLE public.categorie_document OWNER TO postgres;

--
-- TOC entry 266 (class 1259 OID 16839)
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
-- TOC entry 3778 (class 0 OID 0)
-- Dependencies: 266
-- Name: categorie_document_id_categorie_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.categorie_document_id_categorie_seq OWNED BY public.categorie_document.id_categorie;


--
-- TOC entry 222 (class 1259 OID 16422)
-- Name: categorie_evenement; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.categorie_evenement (
    id_categorie integer NOT NULL,
    nom_categorie character varying(100) NOT NULL
);


ALTER TABLE public.categorie_evenement OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 16421)
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
-- TOC entry 3779 (class 0 OID 0)
-- Dependencies: 221
-- Name: categorie_evenement_id_categorie_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.categorie_evenement_id_categorie_seq OWNED BY public.categorie_evenement.id_categorie;


--
-- TOC entry 218 (class 1259 OID 16404)
-- Name: categorie_services; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.categorie_services (
    id_categorie integer NOT NULL,
    nom_categorie character varying(100) NOT NULL
);


ALTER TABLE public.categorie_services OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16403)
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
-- TOC entry 3780 (class 0 OID 0)
-- Dependencies: 217
-- Name: categorie_services_id_categorie_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.categorie_services_id_categorie_seq OWNED BY public.categorie_services.id_categorie;


--
-- TOC entry 224 (class 1259 OID 16431)
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
-- TOC entry 223 (class 1259 OID 16430)
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
-- TOC entry 3781 (class 0 OID 0)
-- Dependencies: 223
-- Name: conseil_id_conseil_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.conseil_id_conseil_seq OWNED BY public.conseil.id_conseil;


--
-- TOC entry 243 (class 1259 OID 16612)
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
-- TOC entry 242 (class 1259 OID 16611)
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
-- TOC entry 3782 (class 0 OID 0)
-- Dependencies: 242
-- Name: devis_id_devis_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.devis_id_devis_seq OWNED BY public.devis.id_devis;


--
-- TOC entry 237 (class 1259 OID 16559)
-- Name: documents_pro; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.documents_pro (
    id_doc integer NOT NULL,
    id_user integer NOT NULL,
    type_doc character varying(100) NOT NULL,
    url_document character varying(255) NOT NULL,
    date_upload timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    id_categorie integer
);


ALTER TABLE public.documents_pro OWNER TO postgres;

--
-- TOC entry 236 (class 1259 OID 16558)
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
-- TOC entry 3783 (class 0 OID 0)
-- Dependencies: 236
-- Name: documents_pro_id_doc_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.documents_pro_id_doc_seq OWNED BY public.documents_pro.id_doc;


--
-- TOC entry 235 (class 1259 OID 16538)
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
-- TOC entry 234 (class 1259 OID 16537)
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
-- TOC entry 3784 (class 0 OID 0)
-- Dependencies: 234
-- Name: evenements_id_evenement_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.evenements_id_evenement_seq OWNED BY public.evenements.id_evenement;


--
-- TOC entry 245 (class 1259 OID 16642)
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
-- TOC entry 244 (class 1259 OID 16641)
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
-- TOC entry 3785 (class 0 OID 0)
-- Dependencies: 244
-- Name: facture_id_facture_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.facture_id_facture_seq OWNED BY public.facture.id_facture;


--
-- TOC entry 241 (class 1259 OID 16586)
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
-- TOC entry 240 (class 1259 OID 16585)
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
-- TOC entry 3786 (class 0 OID 0)
-- Dependencies: 240
-- Name: intervention_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.intervention_id_seq OWNED BY public.intervention.id;


--
-- TOC entry 249 (class 1259 OID 16684)
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
-- TOC entry 248 (class 1259 OID 16683)
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
-- TOC entry 3787 (class 0 OID 0)
-- Dependencies: 248
-- Name: litiges_id_litige_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.litiges_id_litige_seq OWNED BY public.litiges.id_litige;


--
-- TOC entry 257 (class 1259 OID 16756)
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
-- TOC entry 256 (class 1259 OID 16755)
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
-- TOC entry 3788 (class 0 OID 0)
-- Dependencies: 256
-- Name: messagerie_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.messagerie_id_seq OWNED BY public.messagerie.id;


--
-- TOC entry 263 (class 1259 OID 16811)
-- Name: migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.migrations (
    id integer NOT NULL,
    filename character varying(255) NOT NULL,
    applied_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.migrations OWNER TO postgres;

--
-- TOC entry 262 (class 1259 OID 16810)
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
-- TOC entry 3789 (class 0 OID 0)
-- Dependencies: 262
-- Name: migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.migrations_id_seq OWNED BY public.migrations.id;


--
-- TOC entry 261 (class 1259 OID 16792)
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
-- TOC entry 260 (class 1259 OID 16791)
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
-- TOC entry 3790 (class 0 OID 0)
-- Dependencies: 260
-- Name: newsletter_id_newsletter_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.newsletter_id_newsletter_seq OWNED BY public.newsletter.id_newsletter;


--
-- TOC entry 247 (class 1259 OID 16666)
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
-- TOC entry 246 (class 1259 OID 16665)
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
-- TOC entry 3791 (class 0 OID 0)
-- Dependencies: 246
-- Name: note_avis_id_avis_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.note_avis_id_avis_seq OWNED BY public.note_avis.id_avis;


--
-- TOC entry 259 (class 1259 OID 16777)
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
-- TOC entry 258 (class 1259 OID 16776)
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
-- TOC entry 3792 (class 0 OID 0)
-- Dependencies: 258
-- Name: notification_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.notification_id_seq OWNED BY public.notification.id;


--
-- TOC entry 231 (class 1259 OID 16496)
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
-- TOC entry 230 (class 1259 OID 16495)
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
-- TOC entry 3793 (class 0 OID 0)
-- Dependencies: 230
-- Name: offre_prestataire_id_offre_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.offre_prestataire_id_offre_seq OWNED BY public.offre_prestataire.id_offre;


--
-- TOC entry 255 (class 1259 OID 16735)
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
-- TOC entry 254 (class 1259 OID 16734)
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
-- TOC entry 3794 (class 0 OID 0)
-- Dependencies: 254
-- Name: paiements_id_paiement_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.paiements_id_paiement_seq OWNED BY public.paiements.id_paiement;


--
-- TOC entry 239 (class 1259 OID 16572)
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
-- TOC entry 238 (class 1259 OID 16571)
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
-- TOC entry 3795 (class 0 OID 0)
-- Dependencies: 238
-- Name: planning_pro_id_planning_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.planning_pro_id_planning_seq OWNED BY public.planning_pro.id_planning;


--
-- TOC entry 251 (class 1259 OID 16700)
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
-- TOC entry 250 (class 1259 OID 16699)
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
-- TOC entry 3796 (class 0 OID 0)
-- Dependencies: 250
-- Name: planning_senior_id_agenda_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.planning_senior_id_agenda_seq OWNED BY public.planning_senior.id_agenda;


--
-- TOC entry 225 (class 1259 OID 16439)
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
-- TOC entry 227 (class 1259 OID 16463)
-- Name: profile_pro; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.profile_pro (
    id_user integer NOT NULL,
    nom character varying(100) NOT NULL,
    prenom character varying(100) NOT NULL,
    date_naissance date,
    genre character varying(50),
    statut_validation character varying(50) DEFAULT 'en_attente'::character varying,
    is_subscription_valid boolean DEFAULT false,
    siret character varying(14),
    bio text,
    rib character varying(34),
    telephone_pro character varying(20),
    logo_url character varying(255),
    note_moyenne numeric(3,2) DEFAULT 0.00,
    commission numeric(5,2) DEFAULT 15.00,
    nom_entreprise character varying(150),
    adresse_pro text,
    statut_juridique character varying(50),
    id_type integer
);


ALTER TABLE public.profile_pro OWNER TO postgres;

--
-- TOC entry 226 (class 1259 OID 16449)
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
-- TOC entry 229 (class 1259 OID 16482)
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
-- TOC entry 228 (class 1259 OID 16481)
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
-- TOC entry 3797 (class 0 OID 0)
-- Dependencies: 228
-- Name: service_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.service_id_seq OWNED BY public.service.id;


--
-- TOC entry 265 (class 1259 OID 16833)
-- Name: type_prestataire; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.type_prestataire (
    id_type integer NOT NULL,
    nom_type character varying(100) NOT NULL
);


ALTER TABLE public.type_prestataire OWNER TO postgres;

--
-- TOC entry 264 (class 1259 OID 16832)
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
-- TOC entry 3798 (class 0 OID 0)
-- Dependencies: 264
-- Name: type_prestataire_id_type_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.type_prestataire_id_type_seq OWNED BY public.type_prestataire.id_type;


--
-- TOC entry 216 (class 1259 OID 16390)
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
-- TOC entry 215 (class 1259 OID 16389)
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
-- TOC entry 3799 (class 0 OID 0)
-- Dependencies: 215
-- Name: users_id_user_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_user_seq OWNED BY public.users.id_user;


--
-- TOC entry 3431 (class 2604 OID 16722)
-- Name: abonnement id_abonnement; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.abonnement ALTER COLUMN id_abonnement SET DEFAULT nextval('public.abonnement_id_abonnement_seq'::regclass);


--
-- TOC entry 3411 (class 2604 OID 16520)
-- Name: article id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.article ALTER COLUMN id SET DEFAULT nextval('public.article_id_seq'::regclass);


--
-- TOC entry 3400 (class 2604 OID 16416)
-- Name: categorie_article id_categorie; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categorie_article ALTER COLUMN id_categorie SET DEFAULT nextval('public.categorie_article_id_categorie_seq'::regclass);


--
-- TOC entry 3445 (class 2604 OID 16843)
-- Name: categorie_document id_categorie; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categorie_document ALTER COLUMN id_categorie SET DEFAULT nextval('public.categorie_document_id_categorie_seq'::regclass);


--
-- TOC entry 3401 (class 2604 OID 16425)
-- Name: categorie_evenement id_categorie; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categorie_evenement ALTER COLUMN id_categorie SET DEFAULT nextval('public.categorie_evenement_id_categorie_seq'::regclass);


--
-- TOC entry 3399 (class 2604 OID 16407)
-- Name: categorie_services id_categorie; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categorie_services ALTER COLUMN id_categorie SET DEFAULT nextval('public.categorie_services_id_categorie_seq'::regclass);


--
-- TOC entry 3402 (class 2604 OID 16434)
-- Name: conseil id_conseil; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.conseil ALTER COLUMN id_conseil SET DEFAULT nextval('public.conseil_id_conseil_seq'::regclass);


--
-- TOC entry 3422 (class 2604 OID 16615)
-- Name: devis id_devis; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.devis ALTER COLUMN id_devis SET DEFAULT nextval('public.devis_id_devis_seq'::regclass);


--
-- TOC entry 3415 (class 2604 OID 16562)
-- Name: documents_pro id_doc; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.documents_pro ALTER COLUMN id_doc SET DEFAULT nextval('public.documents_pro_id_doc_seq'::regclass);


--
-- TOC entry 3413 (class 2604 OID 16541)
-- Name: evenements id_evenement; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.evenements ALTER COLUMN id_evenement SET DEFAULT nextval('public.evenements_id_evenement_seq'::regclass);


--
-- TOC entry 3424 (class 2604 OID 16645)
-- Name: facture id_facture; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.facture ALTER COLUMN id_facture SET DEFAULT nextval('public.facture_id_facture_seq'::regclass);


--
-- TOC entry 3419 (class 2604 OID 16589)
-- Name: intervention id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.intervention ALTER COLUMN id SET DEFAULT nextval('public.intervention_id_seq'::regclass);


--
-- TOC entry 3427 (class 2604 OID 16687)
-- Name: litiges id_litige; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.litiges ALTER COLUMN id_litige SET DEFAULT nextval('public.litiges_id_litige_seq'::regclass);


--
-- TOC entry 3435 (class 2604 OID 16759)
-- Name: messagerie id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.messagerie ALTER COLUMN id SET DEFAULT nextval('public.messagerie_id_seq'::regclass);


--
-- TOC entry 3442 (class 2604 OID 16814)
-- Name: migrations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.migrations ALTER COLUMN id SET DEFAULT nextval('public.migrations_id_seq'::regclass);


--
-- TOC entry 3440 (class 2604 OID 16795)
-- Name: newsletter id_newsletter; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.newsletter ALTER COLUMN id_newsletter SET DEFAULT nextval('public.newsletter_id_newsletter_seq'::regclass);


--
-- TOC entry 3425 (class 2604 OID 16669)
-- Name: note_avis id_avis; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.note_avis ALTER COLUMN id_avis SET DEFAULT nextval('public.note_avis_id_avis_seq'::regclass);


--
-- TOC entry 3438 (class 2604 OID 16780)
-- Name: notification id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notification ALTER COLUMN id SET DEFAULT nextval('public.notification_id_seq'::regclass);


--
-- TOC entry 3410 (class 2604 OID 16499)
-- Name: offre_prestataire id_offre; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.offre_prestataire ALTER COLUMN id_offre SET DEFAULT nextval('public.offre_prestataire_id_offre_seq'::regclass);


--
-- TOC entry 3432 (class 2604 OID 16738)
-- Name: paiements id_paiement; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.paiements ALTER COLUMN id_paiement SET DEFAULT nextval('public.paiements_id_paiement_seq'::regclass);


--
-- TOC entry 3417 (class 2604 OID 16575)
-- Name: planning_pro id_planning; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.planning_pro ALTER COLUMN id_planning SET DEFAULT nextval('public.planning_pro_id_planning_seq'::regclass);


--
-- TOC entry 3430 (class 2604 OID 16703)
-- Name: planning_senior id_agenda; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.planning_senior ALTER COLUMN id_agenda SET DEFAULT nextval('public.planning_senior_id_agenda_seq'::regclass);


--
-- TOC entry 3409 (class 2604 OID 16485)
-- Name: service id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.service ALTER COLUMN id SET DEFAULT nextval('public.service_id_seq'::regclass);


--
-- TOC entry 3444 (class 2604 OID 16836)
-- Name: type_prestataire id_type; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.type_prestataire ALTER COLUMN id_type SET DEFAULT nextval('public.type_prestataire_id_type_seq'::regclass);


--
-- TOC entry 3396 (class 2604 OID 16393)
-- Name: users id_user; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id_user SET DEFAULT nextval('public.users_id_user_seq'::regclass);


--
-- TOC entry 3754 (class 0 OID 16719)
-- Dependencies: 253
-- Data for Name: abonnement; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.abonnement (id_abonnement, id_user, type_abonnement, prix_abonnement, date_debut, date_fin, stripe_subscription_id) FROM stdin;
\.


--
-- TOC entry 3734 (class 0 OID 16517)
-- Dependencies: 233
-- Data for Name: article; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.article (id, id_user, id_categorie, nom, prix, bio, stock, image_url) FROM stdin;
6	2	1	Coussin Chauffant Cervicales	29.90	Coussin avec 3 niveaux de température et arrêt automatique.	15	\N
2	\N	1	Téléphone Grosses	39.99	Volume amplifié et touches raccourcis avec photos.	10	fa-mobile-alt
8	\N	1	zak	130.00	rfgthynu,rtyergsfe	130	\N
5	\N	3	Pilulier Semainier Ergonomique	12.50	Pilulier 7 jours avec 4 compartiments par jour. Ouverture facile.	50	https://example.com/images/pilulier.png
9	\N	1	zak	120.00	EZFDQ	12000	fa-mobile-alt
7	\N	5	Canne de Marche Pliante	18.00	\N	30	https://example.com/images/canne.jpg
\.


--
-- TOC entry 3721 (class 0 OID 16413)
-- Dependencies: 220
-- Data for Name: categorie_article; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.categorie_article (id_categorie, nom_categorie) FROM stdin;
1	Santé & Bien-être
3	Loisirs & Jeux
5	Non classé
\.


--
-- TOC entry 3768 (class 0 OID 16840)
-- Dependencies: 267
-- Data for Name: categorie_document; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.categorie_document (id_categorie, id_type, nom_categorie) FROM stdin;
1	1	Diplôme de médecine
2	1	Numéro RPPS
3	1	Ordre des médecins
4	1	Assurance responsabilité civile
5	2	Diplôme d'État infirmier
6	2	Numéro RPPS
7	2	Assurance responsabilité civile
8	3	Diplôme de kinésithérapie
9	3	Numéro RPPS
10	3	Assurance responsabilité civile
11	4	Diplôme ADVF ou équivalent
12	4	Casier judiciaire
13	4	Assurance responsabilité civile
14	5	BAFA ou équivalent
15	5	Casier judiciaire
16	5	Assurance responsabilité civile
17	6	Certification professionnelle
18	6	Assurance responsabilité civile
19	7	CAP Cuisine ou équivalent
20	7	Certificat hygiène alimentaire
21	7	Assurance responsabilité civile
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
36	14	Certificat du barreau
37	14	Assurance responsabilité civile
38	15	Pièce d'identité
39	15	Assurance responsabilité civile
\.


--
-- TOC entry 3723 (class 0 OID 16422)
-- Dependencies: 222
-- Data for Name: categorie_evenement; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.categorie_evenement (id_categorie, nom_categorie) FROM stdin;
5	Non classé
7	sport
\.


--
-- TOC entry 3719 (class 0 OID 16404)
-- Dependencies: 218
-- Data for Name: categorie_services; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.categorie_services (id_categorie, nom_categorie) FROM stdin;
1	Ménage
2	Aide Administrative
3	Bricolage
\.


--
-- TOC entry 3725 (class 0 OID 16431)
-- Dependencies: 224
-- Data for Name: conseil; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.conseil (id_conseil, categorie, titre, contenu) FROM stdin;
\.


--
-- TOC entry 3744 (class 0 OID 16612)
-- Dependencies: 243
-- Data for Name: devis; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.devis (id_devis, id_pro, id_senior, id_service, id_intervention, montant_ht, montant_ttc, taux_commission, date_validite, statut) FROM stdin;
\.


--
-- TOC entry 3738 (class 0 OID 16559)
-- Dependencies: 237
-- Data for Name: documents_pro; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.documents_pro (id_doc, id_user, type_doc, url_document, date_upload, id_categorie) FROM stdin;
\.


--
-- TOC entry 3736 (class 0 OID 16538)
-- Dependencies: 235
-- Data for Name: evenements; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.evenements (id_evenement, id_createur, id_categorie, titre, description, date_heure, lieu, prix_ticket, nb_places_max, nb_inscrits) FROM stdin;
7	\N	5	Atelier Peinture Aquarelle	Un atelier convivial pour découvrir la peinture à l'aquarelle.	2026-04-15 14:00:00+00	Salle Polyvalente - Bâtiment B	5.00	20	0
9	11	5	un papier		2026-03-25 02:09:00+00	salle polyvalentre de gabin	15.50	200	0
10	11	5	un papier	\N	2026-03-19 02:09:00+00	salle de test	24.40	200	0
\.


--
-- TOC entry 3746 (class 0 OID 16642)
-- Dependencies: 245
-- Data for Name: facture; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.facture (id_facture, id_emetteur, id_recepteur, id_intervention, montant_ht, montant_ttc, commission_sh, pdf_url) FROM stdin;
\.


--
-- TOC entry 3742 (class 0 OID 16586)
-- Dependencies: 241
-- Data for Name: intervention; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.intervention (id, id_pro, id_senior, id_service, bio_intervention, date_heure_debut, date_heure_fin, lieu, statut, commission_montant, prix, est_medical) FROM stdin;
1	3	2	1	\N	2024-03-01 13:00:00+00	2024-03-01 15:00:00+00	12 rue de la Paix, 75002 Paris	terminee	6.75	45.00	f
\.


--
-- TOC entry 3750 (class 0 OID 16684)
-- Dependencies: 249
-- Data for Name: litiges; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.litiges (id_litige, id_intervention, motif, statut, date_ouverture) FROM stdin;
\.


--
-- TOC entry 3758 (class 0 OID 16756)
-- Dependencies: 257
-- Data for Name: messagerie; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.messagerie (id, id_expediteur, id_destinataire, contenu, date_envoi, lu, id_objet_lie) FROM stdin;
1	2	3	Bonjour Sophie, seriez-vous disponible mardi prochain ?	2026-02-26 16:06:04.022609+00	f	\N
2	3	2	Bonjour Jean, oui c'est possible pour moi à 14h.	2026-02-26 16:06:04.022609+00	f	\N
\.


--
-- TOC entry 3764 (class 0 OID 16811)
-- Dependencies: 263
-- Data for Name: migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.migrations (id, filename, applied_at) FROM stdin;
1	001_init.sql	2026-03-18 01:41:34.107394+00
2	002_add_type_prestataire.sql	2026-03-18 01:41:34.118332+00
3	003_add_categorie_document.sql	2026-03-18 01:41:34.131815+00
4	004_fix_profile_pro_fk.sql	2026-03-18 01:43:09.007746+00
5	005_fix_documents_pro_fk.sql	2026-03-18 01:44:03.324726+00
\.


--
-- TOC entry 3762 (class 0 OID 16792)
-- Dependencies: 261
-- Data for Name: newsletter; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.newsletter (id_newsletter, email, date_inscription, id_user, preferences, titre, contenu) FROM stdin;
\.


--
-- TOC entry 3748 (class 0 OID 16666)
-- Dependencies: 247
-- Data for Name: note_avis; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.note_avis (id_avis, id_intervention, note, commentaire, date_publication) FROM stdin;
1	1	5	Sophie est ponctuelle et très efficace. Je recommande !	2026-02-26 16:06:04.022609+00
\.


--
-- TOC entry 3760 (class 0 OID 16777)
-- Dependencies: 259
-- Data for Name: notification; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.notification (id, id_user, titre, message, type, est_lu, lien_redirection) FROM stdin;
\.


--
-- TOC entry 3732 (class 0 OID 16496)
-- Dependencies: 231
-- Data for Name: offre_prestataire; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.offre_prestataire (id_offre, id_pro, id_service, prix_personnalise, titre, bio) FROM stdin;
1	3	1	22.50	Ménage méticuleux par Sophie	Je propose mes services de nettoyage avec mes propres produits écologiques.
\.


--
-- TOC entry 3756 (class 0 OID 16735)
-- Dependencies: 255
-- Data for Name: paiements; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.paiements (id_paiement, id_user, prix, type_objet, id_objet, date, stripe_session_id, stripe_paiement_id, statut) FROM stdin;
1	2	45.00	intervention	1	2026-02-26 16:06:04.022609+00	\N	\N	complete
\.


--
-- TOC entry 3740 (class 0 OID 16572)
-- Dependencies: 239
-- Data for Name: planning_pro; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.planning_pro (id_planning, id_pro, jour_semaine, heure_debut, heure_fin, est_actif) FROM stdin;
\.


--
-- TOC entry 3752 (class 0 OID 16700)
-- Dependencies: 251
-- Data for Name: planning_senior; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.planning_senior (id_agenda, id_senior, id_intervention, rappel_notification, note_perso) FROM stdin;
\.


--
-- TOC entry 3726 (class 0 OID 16439)
-- Dependencies: 225
-- Data for Name: profile_admin; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.profile_admin (id_user, nom, prenom, genre, telephone) FROM stdin;
\.


--
-- TOC entry 3728 (class 0 OID 16463)
-- Dependencies: 227
-- Data for Name: profile_pro; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.profile_pro (id_user, nom, prenom, date_naissance, genre, statut_validation, is_subscription_valid, siret, bio, rib, telephone_pro, logo_url, note_moyenne, commission, nom_entreprise, adresse_pro, statut_juridique, id_type) FROM stdin;
3	MARTIN	Sophie	\N	\N	en_attente	f	12345678901234	Spécialiste du service à la personne depuis 10 ans.	\N	0788990011	\N	4.50	15.00	\N	\N	\N	\N
9	zak	HOUARI	2005-09-07	M	en_attente	f	01345678765432	glufydykgulihglfulgihmobk	hpigufiydtusryqstduyjjbvkhcj	0638057605	\N	0.00	15.00	saki	81 rue du chevaleret	\N	\N
\.


--
-- TOC entry 3727 (class 0 OID 16449)
-- Dependencies: 226
-- Data for Name: profile_senior; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.profile_senior (id_user, nom, prenom, genre, date_naissance, is_first_login, is_subscription_valid, adresse, telephone) FROM stdin;
2	DUPONT	Jean	Masculin	1945-05-15	t	f	12 rue de la Paix, 75002 Paris	0612345678
\.


--
-- TOC entry 3730 (class 0 OID 16482)
-- Dependencies: 229
-- Data for Name: service; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.service (id, id_categorie, nom, description, prix_reference, image_url) FROM stdin;
1	1	Nettoyage complet	Ménage de printemps, sols, vitres et poussière.	25.00	\N
2	1	Repassage	Repassage à domicile, linge de maison.	20.00	\N
3	2	Aide déclaration impôts	Accompagnement pour les démarches administratives.	40.00	\N
\.


--
-- TOC entry 3766 (class 0 OID 16833)
-- Dependencies: 265
-- Data for Name: type_prestataire; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.type_prestataire (id_type, nom_type) FROM stdin;
1	Médecin
2	Infirmier
3	Kinésithérapeute
4	Aide à domicile
5	Animateur
6	Jardinier
7	Cuisinier
8	Coach sportif
9	Informaticien
10	Chauffeur
11	Garde d'animaux
12	Décorateur
13	Comptable
14	Avocat
15	Autre
\.


--
-- TOC entry 3717 (class 0 OID 16390)
-- Dependencies: 216
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id_user, email, password_hash, role, token_session, date_inscription, accepte_newsletter) FROM stdin;
4	zak@test.com	$2a$10$V3jqBs1pI5MXKekhwX75wOp7crFuD.oRtt5kQhSTwip.mwpfc256u	senior	\N	2026-03-01 19:48:05.45132+00	f
9	zakuytf@test.com	$2a$10$awSxWOv44BBLe6Dp6QNhnukjFPLCVZ6FFbIqXeAmPkMoJbnWnufwy	pro	\N	2026-03-01 20:05:56.551508+00	f
10	zakaria.pro24fffg@gmail.com	$2a$10$1vk3DS0BBpB93OLypFCr.OuNDt3Y.BHwI.SU2nkQtB7dLYVMRAZo2	senior	\N	2026-03-02 13:34:48.896439+00	f
11	gtgtgtgtgtgg@gmail.com	$2a$10$5OP3neaGsuBEQ/7cLZR2uOMe/By4oFDa3iYrhZ8wNk7tIrkMPBBbe	admin	\N	2026-03-02 13:39:13.050964+00	f
2	jean.enior@gmail.com	$2a$10$akOZUShOZFXXYAi93JCFf.Vv56NCJqoq.kajwWJ7FPCH6W7Fke3m2	senior	\N	2026-02-26 16:06:04.022609+00	t
3	exper.menage@pro.fr	pro_hash	pro	\N	2026-02-26 16:06:04.022609+00	f
19	zak@tes.com	$2a$10$Wk2LyysM./UOswZig2nMKe1IJhsY1dIHmyPoo6/6rQvhny1Z2oGlK	senior	\N	2026-03-18 00:19:43.626861+00	f
20	z@z.com	$2a$10$G05pmEn/M4nWY4jEVbcJreTOJov5xTi7iUslJRor8V.TZqwI1a8xW	senior	\N	2026-03-18 00:35:26.413397+00	f
\.


--
-- TOC entry 3800 (class 0 OID 0)
-- Dependencies: 252
-- Name: abonnement_id_abonnement_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.abonnement_id_abonnement_seq', 1, false);


--
-- TOC entry 3801 (class 0 OID 0)
-- Dependencies: 232
-- Name: article_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.article_id_seq', 9, true);


--
-- TOC entry 3802 (class 0 OID 0)
-- Dependencies: 219
-- Name: categorie_article_id_categorie_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.categorie_article_id_categorie_seq', 6, true);


--
-- TOC entry 3803 (class 0 OID 0)
-- Dependencies: 266
-- Name: categorie_document_id_categorie_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.categorie_document_id_categorie_seq', 39, true);


--
-- TOC entry 3804 (class 0 OID 0)
-- Dependencies: 221
-- Name: categorie_evenement_id_categorie_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.categorie_evenement_id_categorie_seq', 7, true);


--
-- TOC entry 3805 (class 0 OID 0)
-- Dependencies: 217
-- Name: categorie_services_id_categorie_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.categorie_services_id_categorie_seq', 3, true);


--
-- TOC entry 3806 (class 0 OID 0)
-- Dependencies: 223
-- Name: conseil_id_conseil_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.conseil_id_conseil_seq', 1, false);


--
-- TOC entry 3807 (class 0 OID 0)
-- Dependencies: 242
-- Name: devis_id_devis_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.devis_id_devis_seq', 1, false);


--
-- TOC entry 3808 (class 0 OID 0)
-- Dependencies: 236
-- Name: documents_pro_id_doc_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.documents_pro_id_doc_seq', 1, false);


--
-- TOC entry 3809 (class 0 OID 0)
-- Dependencies: 234
-- Name: evenements_id_evenement_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.evenements_id_evenement_seq', 10, true);


--
-- TOC entry 3810 (class 0 OID 0)
-- Dependencies: 244
-- Name: facture_id_facture_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.facture_id_facture_seq', 1, false);


--
-- TOC entry 3811 (class 0 OID 0)
-- Dependencies: 240
-- Name: intervention_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.intervention_id_seq', 1, true);


--
-- TOC entry 3812 (class 0 OID 0)
-- Dependencies: 248
-- Name: litiges_id_litige_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.litiges_id_litige_seq', 1, false);


--
-- TOC entry 3813 (class 0 OID 0)
-- Dependencies: 256
-- Name: messagerie_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.messagerie_id_seq', 2, true);


--
-- TOC entry 3814 (class 0 OID 0)
-- Dependencies: 262
-- Name: migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.migrations_id_seq', 5, true);


--
-- TOC entry 3815 (class 0 OID 0)
-- Dependencies: 260
-- Name: newsletter_id_newsletter_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.newsletter_id_newsletter_seq', 1, false);


--
-- TOC entry 3816 (class 0 OID 0)
-- Dependencies: 246
-- Name: note_avis_id_avis_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.note_avis_id_avis_seq', 1, true);


--
-- TOC entry 3817 (class 0 OID 0)
-- Dependencies: 258
-- Name: notification_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.notification_id_seq', 1, false);


--
-- TOC entry 3818 (class 0 OID 0)
-- Dependencies: 230
-- Name: offre_prestataire_id_offre_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.offre_prestataire_id_offre_seq', 1, true);


--
-- TOC entry 3819 (class 0 OID 0)
-- Dependencies: 254
-- Name: paiements_id_paiement_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.paiements_id_paiement_seq', 1, true);


--
-- TOC entry 3820 (class 0 OID 0)
-- Dependencies: 238
-- Name: planning_pro_id_planning_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.planning_pro_id_planning_seq', 1, false);


--
-- TOC entry 3821 (class 0 OID 0)
-- Dependencies: 250
-- Name: planning_senior_id_agenda_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.planning_senior_id_agenda_seq', 1, false);


--
-- TOC entry 3822 (class 0 OID 0)
-- Dependencies: 228
-- Name: service_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.service_id_seq', 3, true);


--
-- TOC entry 3823 (class 0 OID 0)
-- Dependencies: 264
-- Name: type_prestataire_id_type_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.type_prestataire_id_type_seq', 15, true);


--
-- TOC entry 3824 (class 0 OID 0)
-- Dependencies: 215
-- Name: users_id_user_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_user_seq', 20, true);


--
-- TOC entry 3511 (class 2606 OID 16726)
-- Name: abonnement abonnement_id_user_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.abonnement
    ADD CONSTRAINT abonnement_id_user_key UNIQUE (id_user);


--
-- TOC entry 3513 (class 2606 OID 16724)
-- Name: abonnement abonnement_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.abonnement
    ADD CONSTRAINT abonnement_pkey PRIMARY KEY (id_abonnement);


--
-- TOC entry 3515 (class 2606 OID 16728)
-- Name: abonnement abonnement_stripe_subscription_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.abonnement
    ADD CONSTRAINT abonnement_stripe_subscription_id_key UNIQUE (stripe_subscription_id);


--
-- TOC entry 3485 (class 2606 OID 16526)
-- Name: article article_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.article
    ADD CONSTRAINT article_pkey PRIMARY KEY (id);


--
-- TOC entry 3461 (class 2606 OID 16420)
-- Name: categorie_article categorie_article_nom_categorie_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categorie_article
    ADD CONSTRAINT categorie_article_nom_categorie_key UNIQUE (nom_categorie);


--
-- TOC entry 3463 (class 2606 OID 16418)
-- Name: categorie_article categorie_article_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categorie_article
    ADD CONSTRAINT categorie_article_pkey PRIMARY KEY (id_categorie);


--
-- TOC entry 3537 (class 2606 OID 16845)
-- Name: categorie_document categorie_document_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categorie_document
    ADD CONSTRAINT categorie_document_pkey PRIMARY KEY (id_categorie);


--
-- TOC entry 3465 (class 2606 OID 16429)
-- Name: categorie_evenement categorie_evenement_nom_categorie_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categorie_evenement
    ADD CONSTRAINT categorie_evenement_nom_categorie_key UNIQUE (nom_categorie);


--
-- TOC entry 3467 (class 2606 OID 16427)
-- Name: categorie_evenement categorie_evenement_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categorie_evenement
    ADD CONSTRAINT categorie_evenement_pkey PRIMARY KEY (id_categorie);


--
-- TOC entry 3457 (class 2606 OID 16411)
-- Name: categorie_services categorie_services_nom_categorie_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categorie_services
    ADD CONSTRAINT categorie_services_nom_categorie_key UNIQUE (nom_categorie);


--
-- TOC entry 3459 (class 2606 OID 16409)
-- Name: categorie_services categorie_services_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categorie_services
    ADD CONSTRAINT categorie_services_pkey PRIMARY KEY (id_categorie);


--
-- TOC entry 3469 (class 2606 OID 16438)
-- Name: conseil conseil_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.conseil
    ADD CONSTRAINT conseil_pkey PRIMARY KEY (id_conseil);


--
-- TOC entry 3495 (class 2606 OID 16620)
-- Name: devis devis_id_intervention_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.devis
    ADD CONSTRAINT devis_id_intervention_key UNIQUE (id_intervention);


--
-- TOC entry 3497 (class 2606 OID 16618)
-- Name: devis devis_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.devis
    ADD CONSTRAINT devis_pkey PRIMARY KEY (id_devis);


--
-- TOC entry 3489 (class 2606 OID 16565)
-- Name: documents_pro documents_pro_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.documents_pro
    ADD CONSTRAINT documents_pro_pkey PRIMARY KEY (id_doc);


--
-- TOC entry 3487 (class 2606 OID 16547)
-- Name: evenements evenements_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.evenements
    ADD CONSTRAINT evenements_pkey PRIMARY KEY (id_evenement);


--
-- TOC entry 3499 (class 2606 OID 16649)
-- Name: facture facture_id_intervention_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.facture
    ADD CONSTRAINT facture_id_intervention_key UNIQUE (id_intervention);


--
-- TOC entry 3501 (class 2606 OID 16647)
-- Name: facture facture_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.facture
    ADD CONSTRAINT facture_pkey PRIMARY KEY (id_facture);


--
-- TOC entry 3493 (class 2606 OID 16595)
-- Name: intervention intervention_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.intervention
    ADD CONSTRAINT intervention_pkey PRIMARY KEY (id);


--
-- TOC entry 3507 (class 2606 OID 16693)
-- Name: litiges litiges_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.litiges
    ADD CONSTRAINT litiges_pkey PRIMARY KEY (id_litige);


--
-- TOC entry 3523 (class 2606 OID 16765)
-- Name: messagerie messagerie_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.messagerie
    ADD CONSTRAINT messagerie_pkey PRIMARY KEY (id);


--
-- TOC entry 3531 (class 2606 OID 16819)
-- Name: migrations migrations_filename_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.migrations
    ADD CONSTRAINT migrations_filename_key UNIQUE (filename);


--
-- TOC entry 3533 (class 2606 OID 16817)
-- Name: migrations migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.migrations
    ADD CONSTRAINT migrations_pkey PRIMARY KEY (id);


--
-- TOC entry 3527 (class 2606 OID 16802)
-- Name: newsletter newsletter_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.newsletter
    ADD CONSTRAINT newsletter_email_key UNIQUE (email);


--
-- TOC entry 3529 (class 2606 OID 16800)
-- Name: newsletter newsletter_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.newsletter
    ADD CONSTRAINT newsletter_pkey PRIMARY KEY (id_newsletter);


--
-- TOC entry 3503 (class 2606 OID 16677)
-- Name: note_avis note_avis_id_intervention_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.note_avis
    ADD CONSTRAINT note_avis_id_intervention_key UNIQUE (id_intervention);


--
-- TOC entry 3505 (class 2606 OID 16675)
-- Name: note_avis note_avis_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.note_avis
    ADD CONSTRAINT note_avis_pkey PRIMARY KEY (id_avis);


--
-- TOC entry 3525 (class 2606 OID 16785)
-- Name: notification notification_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notification
    ADD CONSTRAINT notification_pkey PRIMARY KEY (id);


--
-- TOC entry 3481 (class 2606 OID 16505)
-- Name: offre_prestataire offre_prestataire_id_pro_id_service_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.offre_prestataire
    ADD CONSTRAINT offre_prestataire_id_pro_id_service_key UNIQUE (id_pro, id_service);


--
-- TOC entry 3483 (class 2606 OID 16503)
-- Name: offre_prestataire offre_prestataire_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.offre_prestataire
    ADD CONSTRAINT offre_prestataire_pkey PRIMARY KEY (id_offre);


--
-- TOC entry 3517 (class 2606 OID 16745)
-- Name: paiements paiements_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.paiements
    ADD CONSTRAINT paiements_pkey PRIMARY KEY (id_paiement);


--
-- TOC entry 3519 (class 2606 OID 16749)
-- Name: paiements paiements_stripe_paiement_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.paiements
    ADD CONSTRAINT paiements_stripe_paiement_id_key UNIQUE (stripe_paiement_id);


--
-- TOC entry 3521 (class 2606 OID 16747)
-- Name: paiements paiements_stripe_session_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.paiements
    ADD CONSTRAINT paiements_stripe_session_id_key UNIQUE (stripe_session_id);


--
-- TOC entry 3491 (class 2606 OID 16579)
-- Name: planning_pro planning_pro_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.planning_pro
    ADD CONSTRAINT planning_pro_pkey PRIMARY KEY (id_planning);


--
-- TOC entry 3509 (class 2606 OID 16707)
-- Name: planning_senior planning_senior_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.planning_senior
    ADD CONSTRAINT planning_senior_pkey PRIMARY KEY (id_agenda);


--
-- TOC entry 3471 (class 2606 OID 16443)
-- Name: profile_admin profile_admin_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profile_admin
    ADD CONSTRAINT profile_admin_pkey PRIMARY KEY (id_user);


--
-- TOC entry 3475 (class 2606 OID 16473)
-- Name: profile_pro profile_pro_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profile_pro
    ADD CONSTRAINT profile_pro_pkey PRIMARY KEY (id_user);


--
-- TOC entry 3477 (class 2606 OID 16475)
-- Name: profile_pro profile_pro_siret_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profile_pro
    ADD CONSTRAINT profile_pro_siret_key UNIQUE (siret);


--
-- TOC entry 3473 (class 2606 OID 16457)
-- Name: profile_senior profile_senior_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profile_senior
    ADD CONSTRAINT profile_senior_pkey PRIMARY KEY (id_user);


--
-- TOC entry 3479 (class 2606 OID 16489)
-- Name: service service_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.service
    ADD CONSTRAINT service_pkey PRIMARY KEY (id);


--
-- TOC entry 3535 (class 2606 OID 16838)
-- Name: type_prestataire type_prestataire_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.type_prestataire
    ADD CONSTRAINT type_prestataire_pkey PRIMARY KEY (id_type);


--
-- TOC entry 3453 (class 2606 OID 16402)
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- TOC entry 3455 (class 2606 OID 16400)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id_user);


--
-- TOC entry 3566 (class 2606 OID 16729)
-- Name: abonnement abonnement_id_user_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.abonnement
    ADD CONSTRAINT abonnement_id_user_fkey FOREIGN KEY (id_user) REFERENCES public.users(id_user) ON DELETE CASCADE;


--
-- TOC entry 3545 (class 2606 OID 16532)
-- Name: article article_id_categorie_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.article
    ADD CONSTRAINT article_id_categorie_fkey FOREIGN KEY (id_categorie) REFERENCES public.categorie_article(id_categorie) ON DELETE RESTRICT;


--
-- TOC entry 3546 (class 2606 OID 16527)
-- Name: article article_id_user_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.article
    ADD CONSTRAINT article_id_user_fkey FOREIGN KEY (id_user) REFERENCES public.users(id_user) ON DELETE SET NULL;


--
-- TOC entry 3572 (class 2606 OID 16846)
-- Name: categorie_document categorie_document_id_type_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categorie_document
    ADD CONSTRAINT categorie_document_id_type_fkey FOREIGN KEY (id_type) REFERENCES public.type_prestataire(id_type) ON DELETE CASCADE;


--
-- TOC entry 3555 (class 2606 OID 16636)
-- Name: devis devis_id_intervention_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.devis
    ADD CONSTRAINT devis_id_intervention_fkey FOREIGN KEY (id_intervention) REFERENCES public.intervention(id) ON DELETE SET NULL;


--
-- TOC entry 3556 (class 2606 OID 16621)
-- Name: devis devis_id_pro_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.devis
    ADD CONSTRAINT devis_id_pro_fkey FOREIGN KEY (id_pro) REFERENCES public.profile_pro(id_user) ON DELETE CASCADE;


--
-- TOC entry 3557 (class 2606 OID 16626)
-- Name: devis devis_id_senior_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.devis
    ADD CONSTRAINT devis_id_senior_fkey FOREIGN KEY (id_senior) REFERENCES public.profile_senior(id_user) ON DELETE CASCADE;


--
-- TOC entry 3558 (class 2606 OID 16631)
-- Name: devis devis_id_service_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.devis
    ADD CONSTRAINT devis_id_service_fkey FOREIGN KEY (id_service) REFERENCES public.service(id) ON DELETE CASCADE;


--
-- TOC entry 3549 (class 2606 OID 16566)
-- Name: documents_pro documents_pro_id_user_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.documents_pro
    ADD CONSTRAINT documents_pro_id_user_fkey FOREIGN KEY (id_user) REFERENCES public.profile_pro(id_user) ON DELETE CASCADE;


--
-- TOC entry 3547 (class 2606 OID 16553)
-- Name: evenements evenements_id_categorie_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.evenements
    ADD CONSTRAINT evenements_id_categorie_fkey FOREIGN KEY (id_categorie) REFERENCES public.categorie_evenement(id_categorie) ON DELETE RESTRICT;


--
-- TOC entry 3548 (class 2606 OID 16548)
-- Name: evenements evenements_id_createur_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.evenements
    ADD CONSTRAINT evenements_id_createur_fkey FOREIGN KEY (id_createur) REFERENCES public.users(id_user) ON DELETE SET NULL;


--
-- TOC entry 3559 (class 2606 OID 16650)
-- Name: facture facture_id_emetteur_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.facture
    ADD CONSTRAINT facture_id_emetteur_fkey FOREIGN KEY (id_emetteur) REFERENCES public.users(id_user) ON DELETE RESTRICT;


--
-- TOC entry 3560 (class 2606 OID 16660)
-- Name: facture facture_id_intervention_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.facture
    ADD CONSTRAINT facture_id_intervention_fkey FOREIGN KEY (id_intervention) REFERENCES public.intervention(id) ON DELETE RESTRICT;


--
-- TOC entry 3561 (class 2606 OID 16655)
-- Name: facture facture_id_recepteur_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.facture
    ADD CONSTRAINT facture_id_recepteur_fkey FOREIGN KEY (id_recepteur) REFERENCES public.users(id_user) ON DELETE RESTRICT;


--
-- TOC entry 3550 (class 2606 OID 16856)
-- Name: documents_pro fk_documents_pro_categorie; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.documents_pro
    ADD CONSTRAINT fk_documents_pro_categorie FOREIGN KEY (id_categorie) REFERENCES public.categorie_document(id_categorie);


--
-- TOC entry 3540 (class 2606 OID 16851)
-- Name: profile_pro fk_profile_pro_type; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profile_pro
    ADD CONSTRAINT fk_profile_pro_type FOREIGN KEY (id_type) REFERENCES public.type_prestataire(id_type);


--
-- TOC entry 3552 (class 2606 OID 16596)
-- Name: intervention intervention_id_pro_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.intervention
    ADD CONSTRAINT intervention_id_pro_fkey FOREIGN KEY (id_pro) REFERENCES public.profile_pro(id_user) ON DELETE RESTRICT;


--
-- TOC entry 3553 (class 2606 OID 16601)
-- Name: intervention intervention_id_senior_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.intervention
    ADD CONSTRAINT intervention_id_senior_fkey FOREIGN KEY (id_senior) REFERENCES public.profile_senior(id_user) ON DELETE RESTRICT;


--
-- TOC entry 3554 (class 2606 OID 16606)
-- Name: intervention intervention_id_service_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.intervention
    ADD CONSTRAINT intervention_id_service_fkey FOREIGN KEY (id_service) REFERENCES public.service(id) ON DELETE RESTRICT;


--
-- TOC entry 3563 (class 2606 OID 16694)
-- Name: litiges litiges_id_intervention_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.litiges
    ADD CONSTRAINT litiges_id_intervention_fkey FOREIGN KEY (id_intervention) REFERENCES public.intervention(id) ON DELETE RESTRICT;


--
-- TOC entry 3568 (class 2606 OID 16771)
-- Name: messagerie messagerie_id_destinataire_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.messagerie
    ADD CONSTRAINT messagerie_id_destinataire_fkey FOREIGN KEY (id_destinataire) REFERENCES public.users(id_user) ON DELETE CASCADE;


--
-- TOC entry 3569 (class 2606 OID 16766)
-- Name: messagerie messagerie_id_expediteur_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.messagerie
    ADD CONSTRAINT messagerie_id_expediteur_fkey FOREIGN KEY (id_expediteur) REFERENCES public.users(id_user) ON DELETE CASCADE;


--
-- TOC entry 3571 (class 2606 OID 16803)
-- Name: newsletter newsletter_id_user_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.newsletter
    ADD CONSTRAINT newsletter_id_user_fkey FOREIGN KEY (id_user) REFERENCES public.users(id_user) ON DELETE SET NULL;


--
-- TOC entry 3562 (class 2606 OID 16678)
-- Name: note_avis note_avis_id_intervention_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.note_avis
    ADD CONSTRAINT note_avis_id_intervention_fkey FOREIGN KEY (id_intervention) REFERENCES public.intervention(id) ON DELETE CASCADE;


--
-- TOC entry 3570 (class 2606 OID 16786)
-- Name: notification notification_id_user_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notification
    ADD CONSTRAINT notification_id_user_fkey FOREIGN KEY (id_user) REFERENCES public.users(id_user) ON DELETE CASCADE;


--
-- TOC entry 3543 (class 2606 OID 16506)
-- Name: offre_prestataire offre_prestataire_id_pro_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.offre_prestataire
    ADD CONSTRAINT offre_prestataire_id_pro_fkey FOREIGN KEY (id_pro) REFERENCES public.profile_pro(id_user) ON DELETE CASCADE;


--
-- TOC entry 3544 (class 2606 OID 16511)
-- Name: offre_prestataire offre_prestataire_id_service_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.offre_prestataire
    ADD CONSTRAINT offre_prestataire_id_service_fkey FOREIGN KEY (id_service) REFERENCES public.service(id) ON DELETE CASCADE;


--
-- TOC entry 3567 (class 2606 OID 16750)
-- Name: paiements paiements_id_user_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.paiements
    ADD CONSTRAINT paiements_id_user_fkey FOREIGN KEY (id_user) REFERENCES public.users(id_user) ON DELETE RESTRICT;


--
-- TOC entry 3551 (class 2606 OID 16580)
-- Name: planning_pro planning_pro_id_pro_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.planning_pro
    ADD CONSTRAINT planning_pro_id_pro_fkey FOREIGN KEY (id_pro) REFERENCES public.profile_pro(id_user) ON DELETE CASCADE;


--
-- TOC entry 3564 (class 2606 OID 16713)
-- Name: planning_senior planning_senior_id_intervention_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.planning_senior
    ADD CONSTRAINT planning_senior_id_intervention_fkey FOREIGN KEY (id_intervention) REFERENCES public.intervention(id) ON DELETE CASCADE;


--
-- TOC entry 3565 (class 2606 OID 16708)
-- Name: planning_senior planning_senior_id_senior_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.planning_senior
    ADD CONSTRAINT planning_senior_id_senior_fkey FOREIGN KEY (id_senior) REFERENCES public.profile_senior(id_user) ON DELETE CASCADE;


--
-- TOC entry 3538 (class 2606 OID 16444)
-- Name: profile_admin profile_admin_id_user_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profile_admin
    ADD CONSTRAINT profile_admin_id_user_fkey FOREIGN KEY (id_user) REFERENCES public.users(id_user) ON DELETE CASCADE;


--
-- TOC entry 3541 (class 2606 OID 16476)
-- Name: profile_pro profile_pro_id_user_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profile_pro
    ADD CONSTRAINT profile_pro_id_user_fkey FOREIGN KEY (id_user) REFERENCES public.users(id_user) ON DELETE CASCADE;


--
-- TOC entry 3539 (class 2606 OID 16458)
-- Name: profile_senior profile_senior_id_user_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profile_senior
    ADD CONSTRAINT profile_senior_id_user_fkey FOREIGN KEY (id_user) REFERENCES public.users(id_user) ON DELETE CASCADE;


--
-- TOC entry 3542 (class 2606 OID 16490)
-- Name: service service_id_categorie_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.service
    ADD CONSTRAINT service_id_categorie_fkey FOREIGN KEY (id_categorie) REFERENCES public.categorie_services(id_categorie) ON DELETE RESTRICT;


-- Completed on 2026-03-26 09:41:32 UTC

--
-- PostgreSQL database dump complete
--

\unrestrict s11iSHtwrX1hB19EvfSTRTKTmNh6qm5Gjyph11QIJeZgGKlxq7ImHxhiXSFHqBM

