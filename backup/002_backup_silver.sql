--
-- PostgreSQL database dump
--

\restrict 5iQfL9bMGEliBcFdj8d1U2mkEBMXJLe3CX87BfOvY6popwNjB73BeRVAg4ba0sV

-- Dumped from database version 16.13
-- Dumped by pg_dump version 16.11

-- Started on 2026-03-26 09:33:57 UTC

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
-- TOC entry 3718 (class 1262 OID 16384)
-- Name: silver_happy; Type: DATABASE; Schema: -; Owner: -
--

CREATE DATABASE silver_happy WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';


\unrestrict 5iQfL9bMGEliBcFdj8d1U2mkEBMXJLe3CX87BfOvY6popwNjB73BeRVAg4ba0sV
\connect silver_happy
\restrict 5iQfL9bMGEliBcFdj8d1U2mkEBMXJLe3CX87BfOvY6popwNjB73BeRVAg4ba0sV

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
-- TOC entry 3661 (class 0 OID 16390)
-- Dependencies: 216
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
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
-- TOC entry 3698 (class 0 OID 16719)
-- Dependencies: 253
-- Data for Name: abonnement; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.abonnement (id_abonnement, id_user, type_abonnement, prix_abonnement, date_debut, date_fin, stripe_subscription_id) FROM stdin;
\.


--
-- TOC entry 3665 (class 0 OID 16413)
-- Dependencies: 220
-- Data for Name: categorie_article; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.categorie_article (id_categorie, nom_categorie) FROM stdin;
1	Santé & Bien-être
3	Loisirs & Jeux
5	Non classé
\.


--
-- TOC entry 3678 (class 0 OID 16517)
-- Dependencies: 233
-- Data for Name: article; Type: TABLE DATA; Schema: public; Owner: -
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
-- TOC entry 3710 (class 0 OID 16833)
-- Dependencies: 265
-- Data for Name: type_prestataire; Type: TABLE DATA; Schema: public; Owner: -
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
-- TOC entry 3712 (class 0 OID 16840)
-- Dependencies: 267
-- Data for Name: categorie_document; Type: TABLE DATA; Schema: public; Owner: -
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
-- TOC entry 3667 (class 0 OID 16422)
-- Dependencies: 222
-- Data for Name: categorie_evenement; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.categorie_evenement (id_categorie, nom_categorie) FROM stdin;
5	Non classé
7	sport
\.


--
-- TOC entry 3663 (class 0 OID 16404)
-- Dependencies: 218
-- Data for Name: categorie_services; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.categorie_services (id_categorie, nom_categorie) FROM stdin;
1	Ménage
2	Aide Administrative
3	Bricolage
\.


--
-- TOC entry 3669 (class 0 OID 16431)
-- Dependencies: 224
-- Data for Name: conseil; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.conseil (id_conseil, categorie, titre, contenu) FROM stdin;
\.


--
-- TOC entry 3672 (class 0 OID 16463)
-- Dependencies: 227
-- Data for Name: profile_pro; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.profile_pro (id_user, nom, prenom, date_naissance, genre, statut_validation, is_subscription_valid, siret, bio, rib, telephone_pro, logo_url, note_moyenne, commission, nom_entreprise, adresse_pro, statut_juridique, id_type) FROM stdin;
3	MARTIN	Sophie	\N	\N	en_attente	f	12345678901234	Spécialiste du service à la personne depuis 10 ans.	\N	0788990011	\N	4.50	15.00	\N	\N	\N	\N
9	zak	HOUARI	2005-09-07	M	en_attente	f	01345678765432	glufydykgulihglfulgihmobk	hpigufiydtusryqstduyjjbvkhcj	0638057605	\N	0.00	15.00	saki	81 rue du chevaleret	\N	\N
\.


--
-- TOC entry 3671 (class 0 OID 16449)
-- Dependencies: 226
-- Data for Name: profile_senior; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.profile_senior (id_user, nom, prenom, genre, date_naissance, is_first_login, is_subscription_valid, adresse, telephone) FROM stdin;
2	DUPONT	Jean	Masculin	1945-05-15	t	f	12 rue de la Paix, 75002 Paris	0612345678
\.


--
-- TOC entry 3674 (class 0 OID 16482)
-- Dependencies: 229
-- Data for Name: service; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.service (id, id_categorie, nom, description, prix_reference, image_url) FROM stdin;
1	1	Nettoyage complet	Ménage de printemps, sols, vitres et poussière.	25.00	\N
2	1	Repassage	Repassage à domicile, linge de maison.	20.00	\N
3	2	Aide déclaration impôts	Accompagnement pour les démarches administratives.	40.00	\N
\.


--
-- TOC entry 3686 (class 0 OID 16586)
-- Dependencies: 241
-- Data for Name: intervention; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.intervention (id, id_pro, id_senior, id_service, bio_intervention, date_heure_debut, date_heure_fin, lieu, statut, commission_montant, prix, est_medical) FROM stdin;
1	3	2	1	\N	2024-03-01 13:00:00+00	2024-03-01 15:00:00+00	12 rue de la Paix, 75002 Paris	terminee	6.75	45.00	f
\.


--
-- TOC entry 3688 (class 0 OID 16612)
-- Dependencies: 243
-- Data for Name: devis; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.devis (id_devis, id_pro, id_senior, id_service, id_intervention, montant_ht, montant_ttc, taux_commission, date_validite, statut) FROM stdin;
\.


--
-- TOC entry 3682 (class 0 OID 16559)
-- Dependencies: 237
-- Data for Name: documents_pro; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.documents_pro (id_doc, id_user, type_doc, url_document, date_upload, id_categorie) FROM stdin;
\.


--
-- TOC entry 3680 (class 0 OID 16538)
-- Dependencies: 235
-- Data for Name: evenements; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.evenements (id_evenement, id_createur, id_categorie, titre, description, date_heure, lieu, prix_ticket, nb_places_max, nb_inscrits) FROM stdin;
7	\N	5	Atelier Peinture Aquarelle	Un atelier convivial pour découvrir la peinture à l'aquarelle.	2026-04-15 14:00:00+00	Salle Polyvalente - Bâtiment B	5.00	20	0
9	11	5	un papier		2026-03-25 02:09:00+00	salle polyvalentre de gabin	15.50	200	0
10	11	5	un papier	\N	2026-03-19 02:09:00+00	salle de test	24.40	200	0
\.


--
-- TOC entry 3690 (class 0 OID 16642)
-- Dependencies: 245
-- Data for Name: facture; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.facture (id_facture, id_emetteur, id_recepteur, id_intervention, montant_ht, montant_ttc, commission_sh, pdf_url) FROM stdin;
\.


--
-- TOC entry 3694 (class 0 OID 16684)
-- Dependencies: 249
-- Data for Name: litiges; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.litiges (id_litige, id_intervention, motif, statut, date_ouverture) FROM stdin;
\.


--
-- TOC entry 3702 (class 0 OID 16756)
-- Dependencies: 257
-- Data for Name: messagerie; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.messagerie (id, id_expediteur, id_destinataire, contenu, date_envoi, lu, id_objet_lie) FROM stdin;
1	2	3	Bonjour Sophie, seriez-vous disponible mardi prochain ?	2026-02-26 16:06:04.022609+00	f	\N
2	3	2	Bonjour Jean, oui c'est possible pour moi à 14h.	2026-02-26 16:06:04.022609+00	f	\N
\.


--
-- TOC entry 3708 (class 0 OID 16811)
-- Dependencies: 263
-- Data for Name: migrations; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.migrations (id, filename, applied_at) FROM stdin;
1	001_init.sql	2026-03-18 01:41:34.107394+00
2	002_add_type_prestataire.sql	2026-03-18 01:41:34.118332+00
3	003_add_categorie_document.sql	2026-03-18 01:41:34.131815+00
4	004_fix_profile_pro_fk.sql	2026-03-18 01:43:09.007746+00
5	005_fix_documents_pro_fk.sql	2026-03-18 01:44:03.324726+00
\.


--
-- TOC entry 3706 (class 0 OID 16792)
-- Dependencies: 261
-- Data for Name: newsletter; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.newsletter (id_newsletter, email, date_inscription, id_user, preferences, titre, contenu) FROM stdin;
\.


--
-- TOC entry 3692 (class 0 OID 16666)
-- Dependencies: 247
-- Data for Name: note_avis; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.note_avis (id_avis, id_intervention, note, commentaire, date_publication) FROM stdin;
1	1	5	Sophie est ponctuelle et très efficace. Je recommande !	2026-02-26 16:06:04.022609+00
\.


--
-- TOC entry 3704 (class 0 OID 16777)
-- Dependencies: 259
-- Data for Name: notification; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.notification (id, id_user, titre, message, type, est_lu, lien_redirection) FROM stdin;
\.


--
-- TOC entry 3676 (class 0 OID 16496)
-- Dependencies: 231
-- Data for Name: offre_prestataire; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.offre_prestataire (id_offre, id_pro, id_service, prix_personnalise, titre, bio) FROM stdin;
1	3	1	22.50	Ménage méticuleux par Sophie	Je propose mes services de nettoyage avec mes propres produits écologiques.
\.


--
-- TOC entry 3700 (class 0 OID 16735)
-- Dependencies: 255
-- Data for Name: paiements; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.paiements (id_paiement, id_user, prix, type_objet, id_objet, date, stripe_session_id, stripe_paiement_id, statut) FROM stdin;
1	2	45.00	intervention	1	2026-02-26 16:06:04.022609+00	\N	\N	complete
\.


--
-- TOC entry 3684 (class 0 OID 16572)
-- Dependencies: 239
-- Data for Name: planning_pro; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.planning_pro (id_planning, id_pro, jour_semaine, heure_debut, heure_fin, est_actif) FROM stdin;
\.


--
-- TOC entry 3696 (class 0 OID 16700)
-- Dependencies: 251
-- Data for Name: planning_senior; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.planning_senior (id_agenda, id_senior, id_intervention, rappel_notification, note_perso) FROM stdin;
\.


--
-- TOC entry 3670 (class 0 OID 16439)
-- Dependencies: 225
-- Data for Name: profile_admin; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.profile_admin (id_user, nom, prenom, genre, telephone) FROM stdin;
\.


--
-- TOC entry 3719 (class 0 OID 0)
-- Dependencies: 252
-- Name: abonnement_id_abonnement_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.abonnement_id_abonnement_seq', 1, false);


--
-- TOC entry 3720 (class 0 OID 0)
-- Dependencies: 232
-- Name: article_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.article_id_seq', 9, true);


--
-- TOC entry 3721 (class 0 OID 0)
-- Dependencies: 219
-- Name: categorie_article_id_categorie_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.categorie_article_id_categorie_seq', 6, true);


--
-- TOC entry 3722 (class 0 OID 0)
-- Dependencies: 266
-- Name: categorie_document_id_categorie_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.categorie_document_id_categorie_seq', 39, true);


--
-- TOC entry 3723 (class 0 OID 0)
-- Dependencies: 221
-- Name: categorie_evenement_id_categorie_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.categorie_evenement_id_categorie_seq', 7, true);


--
-- TOC entry 3724 (class 0 OID 0)
-- Dependencies: 217
-- Name: categorie_services_id_categorie_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.categorie_services_id_categorie_seq', 3, true);


--
-- TOC entry 3725 (class 0 OID 0)
-- Dependencies: 223
-- Name: conseil_id_conseil_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.conseil_id_conseil_seq', 1, false);


--
-- TOC entry 3726 (class 0 OID 0)
-- Dependencies: 242
-- Name: devis_id_devis_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.devis_id_devis_seq', 1, false);


--
-- TOC entry 3727 (class 0 OID 0)
-- Dependencies: 236
-- Name: documents_pro_id_doc_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.documents_pro_id_doc_seq', 1, false);


--
-- TOC entry 3728 (class 0 OID 0)
-- Dependencies: 234
-- Name: evenements_id_evenement_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.evenements_id_evenement_seq', 10, true);


--
-- TOC entry 3729 (class 0 OID 0)
-- Dependencies: 244
-- Name: facture_id_facture_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.facture_id_facture_seq', 1, false);


--
-- TOC entry 3730 (class 0 OID 0)
-- Dependencies: 240
-- Name: intervention_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.intervention_id_seq', 1, true);


--
-- TOC entry 3731 (class 0 OID 0)
-- Dependencies: 248
-- Name: litiges_id_litige_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.litiges_id_litige_seq', 1, false);


--
-- TOC entry 3732 (class 0 OID 0)
-- Dependencies: 256
-- Name: messagerie_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.messagerie_id_seq', 2, true);


--
-- TOC entry 3733 (class 0 OID 0)
-- Dependencies: 262
-- Name: migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.migrations_id_seq', 5, true);


--
-- TOC entry 3734 (class 0 OID 0)
-- Dependencies: 260
-- Name: newsletter_id_newsletter_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.newsletter_id_newsletter_seq', 1, false);


--
-- TOC entry 3735 (class 0 OID 0)
-- Dependencies: 246
-- Name: note_avis_id_avis_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.note_avis_id_avis_seq', 1, true);


--
-- TOC entry 3736 (class 0 OID 0)
-- Dependencies: 258
-- Name: notification_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.notification_id_seq', 1, false);


--
-- TOC entry 3737 (class 0 OID 0)
-- Dependencies: 230
-- Name: offre_prestataire_id_offre_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.offre_prestataire_id_offre_seq', 1, true);


--
-- TOC entry 3738 (class 0 OID 0)
-- Dependencies: 254
-- Name: paiements_id_paiement_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.paiements_id_paiement_seq', 1, true);


--
-- TOC entry 3739 (class 0 OID 0)
-- Dependencies: 238
-- Name: planning_pro_id_planning_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.planning_pro_id_planning_seq', 1, false);


--
-- TOC entry 3740 (class 0 OID 0)
-- Dependencies: 250
-- Name: planning_senior_id_agenda_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.planning_senior_id_agenda_seq', 1, false);


--
-- TOC entry 3741 (class 0 OID 0)
-- Dependencies: 228
-- Name: service_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.service_id_seq', 3, true);


--
-- TOC entry 3742 (class 0 OID 0)
-- Dependencies: 264
-- Name: type_prestataire_id_type_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.type_prestataire_id_type_seq', 15, true);


--
-- TOC entry 3743 (class 0 OID 0)
-- Dependencies: 215
-- Name: users_id_user_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_user_seq', 20, true);


-- Completed on 2026-03-26 09:33:57 UTC

--
-- PostgreSQL database dump complete
--

\unrestrict 5iQfL9bMGEliBcFdj8d1U2mkEBMXJLe3CX87BfOvY6popwNjB73BeRVAg4ba0sV

