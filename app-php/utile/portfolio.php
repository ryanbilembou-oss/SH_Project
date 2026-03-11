<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Zakaria Houari — Portfolio</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Barlow+Condensed:wght@300;400;600;700&display=swap" rel="stylesheet">
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --ink:     #0E0C0A;
    --dark:    #151210;
    --dark2:   #1C1814;
    --umber:   #3D2B1F;
    --sienna:  #7A4A2E;
    --warm:    #C4A882;
    --cream:   #EAE0D0;
    --fog:     #9A8E80;
    --muted:   #5C5248;
    --border:  rgba(196,168,130,0.13);
    --border2: rgba(196,168,130,0.07);
    --sidebar: 280px;
    --f-title: 'Bebas Neue', sans-serif;
    --f-body:  'Barlow', sans-serif;
    --f-cond:  'Barlow Condensed', sans-serif;
  }

  html, body { height: 100%; }

  body {
    background: var(--ink);
    color: var(--cream);
    font-family: var(--f-body);
    overflow: hidden;
    display: flex;
  }

  /* grain */
  body::after {
    content: '';
    position: fixed; inset: 0; z-index: 9999; pointer-events: none;
    opacity: 0.025;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-size: 160px;
  }

  ::-webkit-scrollbar { width: 3px; }
  ::-webkit-scrollbar-track { background: var(--ink); }
  ::-webkit-scrollbar-thumb { background: var(--umber); border-radius: 2px; }

  /* ═══════════════════════════════
     SIDEBAR
  ═══════════════════════════════ */
  .sidebar {
    width: var(--sidebar);
    flex-shrink: 0;
    height: 100vh;
    position: fixed;
    left: 0; top: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 48px 36px;
    background: var(--dark);
    border-right: 1px solid var(--border2);
    z-index: 100;
  }

  .sidebar-top {}

  .sidebar-avatar {
    width: 52px; height: 52px;
    border-radius: 50%;
    background: var(--umber);
    border: 1px solid var(--border);
    display: flex; align-items: center; justify-content: center;
    font-family: var(--f-title);
    font-size: 18px; letter-spacing: 2px;
    color: var(--warm);
    margin-bottom: 28px;
    overflow: hidden;
  }

  .sidebar-name {
    font-family: var(--f-cond);
    font-size: 13px; font-weight: 600;
    letter-spacing: 0.08em;
    color: var(--cream);
    margin-bottom: 4px;
  }

  .sidebar-sub {
    font-family: var(--f-body);
    font-size: 12px; font-weight: 300;
    color: var(--fog);
    font-style: italic;
    margin-bottom: 48px;
    line-height: 1.5;
  }

  .sidebar-nav {
    display: flex; flex-direction: column; gap: 4px;
    list-style: none;
  }

  .sidebar-nav a {
    display: flex; align-items: center; gap: 12px;
    padding: 10px 12px;
    border-radius: 6px;
    font-family: var(--f-cond);
    font-size: 12px; font-weight: 600;
    letter-spacing: 0.16em; text-transform: uppercase;
    color: var(--muted);
    text-decoration: none;
    transition: all 0.2s;
    position: relative;
  }

  .sidebar-nav a::before {
    content: '';
    width: 3px; height: 3px; border-radius: 50%;
    background: var(--warm);
    opacity: 0; transition: opacity 0.2s;
    flex-shrink: 0;
  }

  .sidebar-nav a:hover, .sidebar-nav a.active {
    color: var(--cream);
    background: rgba(196,168,130,0.06);
  }

  .sidebar-nav a:hover::before, .sidebar-nav a.active::before { opacity: 1; }

  .sidebar-bottom {}

  .sidebar-badge {
    display: inline-block;
    padding: 5px 10px;
    border: 1px solid var(--border);
    border-radius: 100px;
    font-family: var(--f-cond);
    font-size: 10px; font-weight: 600;
    letter-spacing: 0.16em; text-transform: uppercase;
    color: var(--warm);
    background: rgba(196,168,130,0.06);
    margin-bottom: 20px;
  }

  .sidebar-badge::before {
    content: '● ';
    font-size: 7px;
    animation: blink 2s infinite;
  }

  @keyframes blink { 0%,100%{opacity:1} 50%{opacity:.3} }

  .sidebar-copy {
    font-family: var(--f-body);
    font-size: 11px; font-weight: 300;
    color: var(--muted);
    line-height: 1.7;
  }

  /* ═══════════════════════════════
     MAIN SCROLL AREA
  ═══════════════════════════════ */
  .main {
    margin-left: var(--sidebar);
    flex: 1;
    height: 100vh;
    overflow-y: auto;
    overflow-x: hidden;
    scroll-behavior: smooth;
  }

  /* ═══════════════════════════════
     HERO
  ═══════════════════════════════ */
  #hero {
    min-height: 100vh;
    display: flex; flex-direction: column; justify-content: flex-end;
    padding: 64px 80px;
    position: relative;
    overflow: hidden;
    border-bottom: 1px solid var(--border2);
  }

  .hero-bg {
    position: absolute; inset: 0;
    background:
      radial-gradient(ellipse 60% 70% at 80% 20%, rgba(196,168,130,0.06) 0%, transparent 60%),
      radial-gradient(ellipse 50% 60% at 10% 90%, rgba(61,43,31,0.4) 0%, transparent 60%),
      linear-gradient(170deg, var(--dark) 0%, var(--ink) 55%);
  }

  .hero-content { position: relative; z-index: 2; }

  .hero-eyebrow {
    font-family: var(--f-cond);
    font-size: 11px; font-weight: 600;
    letter-spacing: 0.24em; text-transform: uppercase;
    color: var(--warm);
    margin-bottom: 24px;
    display: flex; align-items: center; gap: 12px;
  }

  .hero-eyebrow::before { content: ''; width: 32px; height: 1px; background: var(--warm); }

  h1.hero-name {
    font-family: var(--f-title);
    font-size: clamp(80px, 13vw, 160px);
    line-height: 0.88;
    letter-spacing: 2px;
    color: var(--cream);
    margin-bottom: 40px;
  }

  h1.hero-name em { display: block; font-style: normal; color: var(--warm); }

  .hero-bottom {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 60px;
    align-items: end;
    padding-top: 48px;
    border-top: 1px solid var(--border2);
  }

  .hero-desc {
    font-family: var(--f-body);
    font-size: 15px; font-weight: 300; font-style: italic;
    color: var(--fog); line-height: 1.9;
  }

  .hero-desc strong { font-style: normal; font-weight: 500; color: var(--cream); }

  .hero-cta { display: flex; gap: 12px; flex-wrap: wrap; justify-content: flex-end; align-items: flex-end; }

  .btn {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 12px 24px; border-radius: 3px;
    font-family: var(--f-cond); font-size: 12px; font-weight: 600;
    letter-spacing: 0.14em; text-transform: uppercase;
    text-decoration: none; transition: all 0.22s; border: none; cursor: pointer;
  }

  .btn-primary { background: var(--warm); color: var(--ink); }
  .btn-primary:hover { background: var(--cream); transform: translateY(-2px); }
  .btn-ghost { background: transparent; color: var(--fog); border: 1px solid var(--border); }
  .btn-ghost:hover { color: var(--cream); border-color: var(--warm); }

  /* ═══════════════════════════════
     SECTIONS
  ═══════════════════════════════ */
  section:not(#hero) {
    padding: 96px 80px;
    border-bottom: 1px solid var(--border2);
  }

  .section-header {
    display: flex; align-items: baseline; justify-content: space-between;
    margin-bottom: 64px;
    padding-bottom: 24px;
    border-bottom: 1px solid var(--border2);
  }

  .section-label {
    font-family: var(--f-cond);
    font-size: 11px; font-weight: 600;
    letter-spacing: 0.24em; text-transform: uppercase;
    color: var(--warm);
    display: flex; align-items: center; gap: 12px;
  }

  .section-label::before { content: ''; width: 24px; height: 1px; background: var(--warm); }

  .section-title {
    font-family: var(--f-title);
    font-size: clamp(40px, 5vw, 68px);
    letter-spacing: 2px; line-height: 1.0;
    color: var(--cream);
  }

  .section-num {
    font-family: var(--f-title);
    font-size: 60px; letter-spacing: 2px;
    color: var(--border); line-height: 1;
  }

  /* ═══════════════════════════════
     ABOUT
  ═══════════════════════════════ */
  #about { background: var(--dark); }

  .about-layout {
    display: grid;
    grid-template-columns: 1.4fr 1fr;
    gap: 80px;
  }

  .about-text p {
    font-family: var(--f-body); font-weight: 300;
    color: var(--fog); margin-bottom: 22px;
    font-size: 16px; line-height: 1.95;
  }

  .about-text p strong { color: var(--cream); font-weight: 500; }

  .about-infos { display: flex; flex-direction: column; }

  .info-row {
    display: flex; flex-direction: column; gap: 3px;
    padding: 16px 0;
    border-bottom: 1px solid var(--border2);
  }

  .info-row:first-child { border-top: 1px solid var(--border2); }

  .info-label {
    font-family: var(--f-cond); font-size: 9px; font-weight: 600;
    letter-spacing: 0.22em; text-transform: uppercase; color: var(--warm);
  }

  .info-val {
    font-family: var(--f-body); font-size: 13px; font-weight: 300; color: var(--fog);
  }

  /* ═══════════════════════════════
     SKILLS
  ═══════════════════════════════ */
  #skills { background: var(--ink); }

  .skills-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 48px 80px; }

  .skill-cat-title {
    font-family: var(--f-title);
    font-size: 18px; letter-spacing: 3px;
    color: var(--warm); margin-bottom: 24px;
  }

  .skill-circles { display: flex; flex-wrap: wrap; gap: 24px; }

  .skill-circle-item { display: flex; flex-direction: column; align-items: center; gap: 8px; }

  .circle-wrap { position: relative; width: 68px; height: 68px; }
  .circle-wrap svg { transform: rotate(-90deg); width: 68px; height: 68px; }
  .circle-bg { fill: none; stroke: rgba(196,168,130,0.08); stroke-width: 3; }
  .circle-fill {
    fill: none; stroke: var(--warm); stroke-width: 3; stroke-linecap: round;
    stroke-dasharray: 175; stroke-dashoffset: 175;
    transition: stroke-dashoffset 1.5s cubic-bezier(0.4,0,0.2,1);
  }
  .circle-pct {
    position: absolute; inset: 0;
    display: flex; align-items: center; justify-content: center;
    font-family: var(--f-cond); font-size: 12px; font-weight: 600; color: var(--cream);
  }
  .skill-name {
    font-family: var(--f-body); font-size: 10px; font-weight: 300;
    color: var(--muted); text-align: center; max-width: 68px;
  }

  .tags { display: flex; flex-wrap: wrap; gap: 7px; }
  .tag {
    padding: 4px 11px; border: 1px solid var(--border2); border-radius: 2px;
    font-family: var(--f-body); font-size: 11px; font-weight: 300; color: var(--muted);
    background: rgba(196,168,130,0.03); transition: all 0.2s;
  }
  .tag:hover { color: var(--cream); border-color: var(--warm); }

  /* ═══════════════════════════════
     PROJETS — style muhsalmon
  ═══════════════════════════════ */
  #projets { background: var(--dark); }

  .project-item {
    display: grid;
    grid-template-columns: 80px 1fr;
    gap: 0;
    border-top: 1px solid var(--border2);
    padding: 40px 0;
    transition: background 0.2s;
    opacity: 0; transform: translateY(20px);
    transition: opacity 0.5s ease, transform 0.5s ease;
  }

  .project-item.visible { opacity: 1; transform: translateY(0); }

  .project-item:last-child { border-bottom: 1px solid var(--border2); }

  .project-index {
    font-family: var(--f-title);
    font-size: 13px; letter-spacing: 3px;
    color: var(--umber);
    padding-top: 4px;
  }

  .project-body {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
    align-items: start;
  }

  .project-left {}

  .project-title {
    font-family: var(--f-title);
    font-size: clamp(28px, 3.5vw, 46px);
    letter-spacing: 2px; line-height: 1.05;
    color: var(--cream);
    margin-bottom: 16px;
    transition: color 0.2s;
  }

  .project-item:hover .project-title { color: var(--warm); }

  .project-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 20px; }

  .project-tag {
    font-family: var(--f-cond); font-size: 10px; font-weight: 600;
    letter-spacing: 0.14em; text-transform: uppercase;
    color: var(--sienna);
    padding: 3px 8px; border: 1px solid rgba(122,74,46,0.3); border-radius: 2px;
  }

  .project-desc {
    font-family: var(--f-body); font-size: 13px; font-weight: 300; font-style: italic;
    color: var(--fog); line-height: 1.85;
  }

  .project-stack { display: flex; flex-wrap: wrap; gap: 6px; align-content: start; }

  /* ═══════════════════════════════
     PARCOURS — muhsalmon experience style
  ═══════════════════════════════ */
  #parcours { background: var(--ink); }

  .experience-item {
    display: grid;
    grid-template-columns: 200px 1fr;
    gap: 0;
    border-top: 1px solid var(--border2);
    padding: 36px 0;
    opacity: 0; transform: translateX(-16px);
    transition: opacity 0.5s ease, transform 0.5s ease;
  }

  .experience-item.visible { opacity: 1; transform: translateX(0); }
  .experience-item:last-child { border-bottom: 1px solid var(--border2); }

  .exp-date {
    font-family: var(--f-cond);
    font-size: 11px; font-weight: 600;
    letter-spacing: 0.14em; text-transform: uppercase;
    color: var(--warm);
    padding-top: 4px;
    line-height: 1.5;
  }

  .exp-right {}

  .exp-title {
    font-family: var(--f-title);
    font-size: 26px; letter-spacing: 2px;
    color: var(--cream); margin-bottom: 4px;
  }

  .exp-org {
    font-family: var(--f-body); font-style: italic;
    font-size: 13px; font-weight: 300;
    color: var(--sienna); margin-bottom: 14px;
  }

  .exp-desc {
    font-family: var(--f-body); font-size: 14px; font-weight: 300;
    color: var(--fog); line-height: 1.85; max-width: 560px;
  }

  /* ═══════════════════════════════
     CONTACT
  ═══════════════════════════════ */
  #contact { background: var(--dark); }

  .contact-layout {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 80px;
    align-items: center;
  }

  .contact-big {
    font-family: var(--f-title);
    font-size: clamp(44px, 6vw, 80px);
    letter-spacing: 2px; line-height: 0.95;
    color: var(--cream); margin-bottom: 24px;
  }

  .contact-sub {
    font-family: var(--f-body); font-size: 14px; font-weight: 300;
    font-style: italic; color: var(--fog); line-height: 1.9;
    max-width: 360px;
  }

  .contact-links { display: flex; flex-direction: column; gap: 12px; }

  .contact-link {
    display: flex; align-items: center; gap: 18px;
    padding: 22px 24px;
    border: 1px solid var(--border2);
    border-radius: 6px;
    text-decoration: none;
    background: rgba(196,168,130,0.02);
    transition: all 0.25s;
  }

  .contact-link:hover {
    border-color: var(--warm);
    background: rgba(196,168,130,0.05);
    transform: translateX(6px);
  }

  .contact-link-icon {
    width: 38px; height: 38px; border-radius: 50%;
    border: 1px solid var(--border);
    display: flex; align-items: center; justify-content: center;
    color: var(--warm); flex-shrink: 0;
  }

  .contact-link-label {
    font-family: var(--f-cond); font-size: 9px; font-weight: 600;
    letter-spacing: 0.2em; text-transform: uppercase; color: var(--warm);
    display: block; margin-bottom: 2px;
  }

  .contact-link-val {
    font-family: var(--f-body); font-size: 13px; font-weight: 300; color: var(--cream);
  }

  /* ═══════════════════════════════
     FADE IN
  ═══════════════════════════════ */
  .fade-up { opacity: 0; transform: translateY(24px); transition: opacity 0.6s ease, transform 0.6s ease; }
  .fade-up.visible { opacity: 1; transform: translateY(0); }

  /* ═══════════════════════════════
     MOBILE
  ═══════════════════════════════ */
  @media (max-width: 900px) {
    body { flex-direction: column; overflow: auto; }
    .sidebar { position: relative; width: 100%; height: auto; flex-direction: row; flex-wrap: wrap; padding: 20px 24px; gap: 16px; border-right: none; border-bottom: 1px solid var(--border2); }
    .sidebar-top, .sidebar-bottom { display: contents; }
    .sidebar-nav { flex-direction: row; flex-wrap: wrap; gap: 4px; }
    .sidebar-avatar { margin-bottom: 0; }
    .sidebar-sub { display: none; }
    .main { margin-left: 0; height: auto; overflow: visible; }
    #hero { min-height: 80vh; padding: 80px 24px 48px; }
    section:not(#hero) { padding: 72px 24px; }
    .hero-bottom, .about-layout, .contact-layout, .project-body { grid-template-columns: 1fr; gap: 32px; }
    .hero-cta { justify-content: flex-start; }
    .project-item, .experience-item { grid-template-columns: 1fr; gap: 12px; }
    .section-num { display: none; }
  }
</style>
</head>
<body>

<!-- ══════════ SIDEBAR ══════════ -->
<aside class="sidebar">
  <div class="sidebar-top">
    <div class="sidebar-avatar">ZH</div>
    <div class="sidebar-name">Zakaria Houari</div>
    <div class="sidebar-sub">Étudiant ESGI Paris<br>Data · IA · Dev</div>
    <ul class="sidebar-nav">
      <li><a href="#about">À propos</a></li>
      <li><a href="#skills">Skills</a></li>
      <li><a href="#projets">Projets</a></li>
      <li><a href="#parcours">Parcours</a></li>
      <li><a href="#contact">Contact</a></li>
    </ul>
  </div>
  <div class="sidebar-bottom">
    <div class="sidebar-badge">Dispo Sept. 2026</div>
    <div class="sidebar-copy">
      Alternance 2 ans<br>
      1 sem. école / 3 sem. entreprise<br>
      Paris, 75013
    </div>
  </div>
</aside>

<!-- ══════════ MAIN ══════════ -->
<main class="main" id="main-scroll">

  <!-- HERO -->
  <section id="hero">
    <div class="hero-bg"></div>
    <div class="hero-content">
      <div class="hero-eyebrow">Bachelor Informatique · ESGI Paris · 2024–2027</div>
      <h1 class="hero-name">
        Zakaria<br>
        <em>Houari</em>
      </h1>
      <div class="hero-bottom">
        <p class="hero-desc">
          Étudiant passionné par la <strong>Data, l'IA et le développement</strong> —
          je construis des choses qui ont du sens. Curieux, autonome, rapide à apprendre.
        </p>
        <div class="hero-cta">
          <a href="#projets" class="btn btn-primary">Voir mes projets</a>
          <a href="#contact" class="btn btn-ghost">Me contacter</a>
        </div>
      </div>
    </div>
  </section>

  <!-- ABOUT -->
  <section id="about">
    <div class="section-header">
      <div class="section-label">À propos</div>
      <div class="section-num">01</div>
    </div>
    <div class="about-layout">
      <div class="about-text fade-up">
        <p>Je suis <strong>Zakaria Houari</strong>, étudiant en 2ème année de Bachelor Informatique à l'ESGI Paris. Je cherche une alternance de 2 ans dans les domaines de la <strong>Data et l'IA</strong>, à partir de septembre 2026.</p>
        <p>Mon rythme : <strong>1 semaine formation / 3 semaines entreprise</strong>. Curieux, autonome et rapide à apprendre — que ce soit sur un projet data, une infra réseau ou du développement web.</p>
        <p>Expérience concrète en stage technicien IT et plusieurs projets aboutis : de l'analyse de datasets à la création d'APIs sécurisées en Go.</p>
      </div>
      <div class="about-infos fade-up">
        <div class="info-row"><span class="info-label">Localisation</span><span class="info-val">Paris, 75013</span></div>
        <div class="info-row"><span class="info-label">Formation</span><span class="info-val">ESGI Paris — Bachelor Info</span></div>
        <div class="info-row"><span class="info-label">Recherche</span><span class="info-val">Alternance 2 ans · Data / IA</span></div>
        <div class="info-row"><span class="info-label">Disponible</span><span class="info-val">Septembre 2026</span></div>
        <div class="info-row"><span class="info-label">Rythme</span><span class="info-val">1 sem. école / 3 sem. entreprise</span></div>
        <div class="info-row"><span class="info-label">Langues</span><span class="info-val">FR · EN B2 · ES B1</span></div>
        <div class="info-row"><span class="info-label">Certification</span><span class="info-val">Intro to CyberSecurity</span></div>
      </div>
    </div>
  </section>

  <!-- SKILLS -->
  <section id="skills">
    <div class="section-header">
      <div class="section-label">Compétences</div>
      <div class="section-num">02</div>
    </div>
    <div class="skills-grid">
      <div class="skill-cat fade-up">
        <div class="skill-cat-title">Data & IA</div>
        <div class="skill-circles">
          <div class="skill-circle-item"><div class="circle-wrap"><svg viewBox="0 0 68 68"><circle class="circle-bg" cx="34" cy="34" r="28"/><circle class="circle-fill" cx="34" cy="34" r="28" data-pct="82"/></svg><div class="circle-pct">82%</div></div><span class="skill-name">Python</span></div>
          <div class="skill-circle-item"><div class="circle-wrap"><svg viewBox="0 0 68 68"><circle class="circle-bg" cx="34" cy="34" r="28"/><circle class="circle-fill" cx="34" cy="34" r="28" data-pct="75"/></svg><div class="circle-pct">75%</div></div><span class="skill-name">Pandas / ML</span></div>
          <div class="skill-circle-item"><div class="circle-wrap"><svg viewBox="0 0 68 68"><circle class="circle-bg" cx="34" cy="34" r="28"/><circle class="circle-fill" cx="34" cy="34" r="28" data-pct="70"/></svg><div class="circle-pct">70%</div></div><span class="skill-name">SQL</span></div>
          <div class="skill-circle-item"><div class="circle-wrap"><svg viewBox="0 0 68 68"><circle class="circle-bg" cx="34" cy="34" r="28"/><circle class="circle-fill" cx="34" cy="34" r="28" data-pct="65"/></svg><div class="circle-pct">65%</div></div><span class="skill-name">Scikit-Learn</span></div>
        </div>
      </div>
      <div class="skill-cat fade-up">
        <div class="skill-cat-title">Développement</div>
        <div class="skill-circles">
          <div class="skill-circle-item"><div class="circle-wrap"><svg viewBox="0 0 68 68"><circle class="circle-bg" cx="34" cy="34" r="28"/><circle class="circle-fill" cx="34" cy="34" r="28" data-pct="80"/></svg><div class="circle-pct">80%</div></div><span class="skill-name">PHP / JS</span></div>
          <div class="skill-circle-item"><div class="circle-wrap"><svg viewBox="0 0 68 68"><circle class="circle-bg" cx="34" cy="34" r="28"/><circle class="circle-fill" cx="34" cy="34" r="28" data-pct="72"/></svg><div class="circle-pct">72%</div></div><span class="skill-name">Go</span></div>
          <div class="skill-circle-item"><div class="circle-wrap"><svg viewBox="0 0 68 68"><circle class="circle-bg" cx="34" cy="34" r="28"/><circle class="circle-fill" cx="34" cy="34" r="28" data-pct="68"/></svg><div class="circle-pct">68%</div></div><span class="skill-name">C / Java</span></div>
          <div class="skill-circle-item"><div class="circle-wrap"><svg viewBox="0 0 68 68"><circle class="circle-bg" cx="34" cy="34" r="28"/><circle class="circle-fill" cx="34" cy="34" r="28" data-pct="78"/></svg><div class="circle-pct">78%</div></div><span class="skill-name">Git / Docker</span></div>
        </div>
      </div>
      <div class="skill-cat fade-up">
        <div class="skill-cat-title">Systèmes & Réseaux</div>
        <div class="skill-circles">
          <div class="skill-circle-item"><div class="circle-wrap"><svg viewBox="0 0 68 68"><circle class="circle-bg" cx="34" cy="34" r="28"/><circle class="circle-fill" cx="34" cy="34" r="28" data-pct="74"/></svg><div class="circle-pct">74%</div></div><span class="skill-name">Active Directory</span></div>
          <div class="skill-circle-item"><div class="circle-wrap"><svg viewBox="0 0 68 68"><circle class="circle-bg" cx="34" cy="34" r="28"/><circle class="circle-fill" cx="34" cy="34" r="28" data-pct="70"/></svg><div class="circle-pct">70%</div></div><span class="skill-name">VMware / EVE-NG</span></div>
          <div class="skill-circle-item"><div class="circle-wrap"><svg viewBox="0 0 68 68"><circle class="circle-bg" cx="34" cy="34" r="28"/><circle class="circle-fill" cx="34" cy="34" r="28" data-pct="65"/></svg><div class="circle-pct">65%</div></div><span class="skill-name">pfSense / VPN</span></div>
        </div>
      </div>
      <div class="skill-cat fade-up">
        <div class="skill-cat-title">Outils</div>
        <div class="tags">
          <span class="tag">Jupyter</span><span class="tag">Postman</span><span class="tag">Oracle DB</span><span class="tag">GLPI</span><span class="tag">Figma</span><span class="tag">VS Code</span><span class="tag">PowerShell</span><span class="tag">Makefile</span><span class="tag">Mailinblack</span><span class="tag">WithSecure</span><span class="tag">Docker</span><span class="tag">GitHub</span>
        </div>
      </div>
    </div>
  </section>

  <!-- PROJETS -->
  <section id="projets">
    <div class="section-header">
      <div class="section-label">Projets</div>
      <div class="section-num">03</div>
    </div>

    <div class="project-item">
      <div class="project-index">01</div>
      <div class="project-body">
        <div class="project-left">
          <h3 class="project-title">Application Web Dynamique</h3>
          <div class="project-tags"><span class="project-tag">Full Stack</span><span class="project-tag">Sécurité</span></div>
          <p class="project-desc">Plateforme complète avec messagerie temps réel, cartographie Leaflet, authentification 2FA et backend PHP sécurisé avec MySQL.</p>
        </div>
        <div class="project-stack">
          <span class="tag">PHP</span><span class="tag">JavaScript</span><span class="tag">MySQL</span><span class="tag">Bootstrap</span><span class="tag">PHPMailer</span><span class="tag">Figma</span>
        </div>
      </div>
    </div>

    <div class="project-item">
      <div class="project-index">02</div>
      <div class="project-body">
        <div class="project-left">
          <h3 class="project-title">Analyse Prédictive IMDB</h3>
          <div class="project-tags"><span class="project-tag">Data Science</span><span class="project-tag">Machine Learning</span></div>
          <p class="project-desc">Dataset 5 000 films — Data Cleaning, EDA, visualisations et modèles ML pour prédire popularité et note des films.</p>
        </div>
        <div class="project-stack">
          <span class="tag">Python</span><span class="tag">Pandas</span><span class="tag">Scikit-Learn</span><span class="tag">Matplotlib</span><span class="tag">Jupyter</span>
        </div>
      </div>
    </div>

    <div class="project-item">
      <div class="project-index">03</div>
      <div class="project-body">
        <div class="project-left">
          <h3 class="project-title">API Facturation Comptable</h3>
          <div class="project-tags"><span class="project-tag">Backend</span><span class="project-tag">Go</span></div>
          <p class="project-desc">API HTTP sécurisée en Go pour la gestion de données comptables. Création de routes, exploitation et sécurisation d'une base relationnelle.</p>
        </div>
        <div class="project-stack">
          <span class="tag">Go</span><span class="tag">SQL</span><span class="tag">REST API</span><span class="tag">HTTP</span>
        </div>
      </div>
    </div>

    <div class="project-item">
      <div class="project-index">04</div>
      <div class="project-body">
        <div class="project-left">
          <h3 class="project-title">Recommandation de Films</h3>
          <div class="project-tags"><span class="project-tag">Algo</span><span class="project-tag">C</span></div>
          <p class="project-desc">Application logicielle complète en C avec interface graphique GTK, algorithme de préférences et automatisation Makefile.</p>
        </div>
        <div class="project-stack">
          <span class="tag">C</span><span class="tag">GTK</span><span class="tag">Makefile</span><span class="tag">GitHub</span>
        </div>
      </div>
    </div>

    <div class="project-item">
      <div class="project-index">05</div>
      <div class="project-body">
        <div class="project-left">
          <h3 class="project-title">Architecture Réseau Virtualisée</h3>
          <div class="project-tags"><span class="project-tag">Réseau</span><span class="project-tag">Sécurité</span></div>
          <p class="project-desc">Infrastructure LAN/DMZ simulant deux sites distants. Tunnel VPN IPsec, règles pfSense strictes, domaine Active Directory.</p>
        </div>
        <div class="project-stack">
          <span class="tag">EVE-NG</span><span class="tag">pfSense</span><span class="tag">VMware</span><span class="tag">Windows Server</span><span class="tag">GLPI</span>
        </div>
      </div>
    </div>

    <div class="project-item">
      <div class="project-index">06</div>
      <div class="project-body">
        <div class="project-left">
          <h3 class="project-title">Administration Windows Server</h3>
          <div class="project-tags"><span class="project-tag">Sysadmin</span><span class="project-tag">AD DS</span></div>
          <p class="project-desc">Contrôleur de domaine AD DS avec GPO, DNS, DHCP. Sécurisation des accès et inventaire automatisé du parc via PowerShell.</p>
        </div>
        <div class="project-stack">
          <span class="tag">Windows Server</span><span class="tag">PowerShell</span><span class="tag">AD DS</span><span class="tag">GLPI</span>
        </div>
      </div>
    </div>

  </section>

  <!-- PARCOURS -->
  <section id="parcours">
    <div class="section-header">
      <div class="section-label">Parcours</div>
      <div class="section-num">04</div>
    </div>

    <div class="experience-item">
      <div class="exp-date">Sept. 2024 → 2027</div>
      <div class="exp-right">
        <div class="exp-title">Bachelor Informatique</div>
        <div class="exp-org">ESGI — Paris 12ème</div>
        <p class="exp-desc">Sécurité des réseaux, développement web, Cloud Computing, administration systèmes, data mining. Formation en alternance rythme 1/3.</p>
      </div>
    </div>

    <div class="experience-item">
      <div class="exp-date">Mai — Juil. 2025</div>
      <div class="exp-right">
        <div class="exp-title">Stage Technicien Informatique</div>
        <div class="exp-org">Communauté d'Agglomération des Pays de Fontainebleau</div>
        <p class="exp-desc">Support N1/N2 pour un parc de 120 agents. Administration Active Directory, déploiement Mailinblack (conformité NIS2), gestion WithSecure, création d'un module intranet PHP/MySQL sécurisé.</p>
      </div>
    </div>

    <div class="experience-item">
      <div class="exp-date">Mai — Août 2023</div>
      <div class="exp-right">
        <div class="exp-title">Équipier Polyvalent</div>
        <div class="exp-org">McDonald's — Dijon</div>
        <p class="exp-desc">Gestion du flux lors des rush, traitement des incidents clients, application stricte des normes HACCP.</p>
      </div>
    </div>

    <div class="experience-item">
      <div class="exp-date">2021 — 2023</div>
      <div class="exp-right">
        <div class="exp-title">Baccalauréat</div>
        <div class="exp-org">Lycée Montchapet — Dijon</div>
        <p class="exp-desc">Spécialités : Mathématiques, Sciences Économiques et Sociales, Numérique et Sciences Informatiques.</p>
      </div>
    </div>

  </section>

  <!-- CONTACT -->
  <section id="contact">
    <div class="section-header">
      <div class="section-label">Contact</div>
      <div class="section-num">05</div>
    </div>
    <div class="contact-layout">
      <div class="fade-up">
        <div class="contact-big">Travaillons<br>ensemble.</div>
        <p class="contact-sub">Vous cherchez un alternant motivé en Data ou IA ? Disponible dès septembre 2026, rythme 1 semaine école / 3 semaines entreprise.</p>
      </div>
      <div class="contact-links fade-up">
        <a href="mailto:zakaria.pro24@gmail.com" class="contact-link">
          <div class="contact-link-icon"><svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg></div>
          <div><span class="contact-link-label">Email</span><span class="contact-link-val">zakaria.pro24@gmail.com</span></div>
        </a>
        <a href="https://www.linkedin.com/in/zakaria-houari-775259351" target="_blank" class="contact-link">
          <div class="contact-link-icon"><svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg></div>
          <div><span class="contact-link-label">LinkedIn</span><span class="contact-link-val">Zakaria Houari</span></div>
        </a>
        <a href="tel:0638057605" class="contact-link">
          <div class="contact-link-icon"><svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.1 2.18 2 2 0 012.08 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.16 6.16l1.28-1.28a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg></div>
          <div><span class="contact-link-label">Téléphone</span><span class="contact-link-val">06 38 05 76 05</span></div>
        </a>
      </div>
    </div>
  </section>

</main>

<script>
  const scroller = document.getElementById('main-scroll');

  // Fade-up observer (sur le scroll du main)
  const obs = new IntersectionObserver(e => {
    e.forEach(x => { if(x.isIntersecting) x.target.classList.add('visible'); });
  }, { threshold: 0.1, root: scroller });

  document.querySelectorAll('.fade-up, .project-item, .experience-item').forEach(el => obs.observe(el));

  // Circles
  const circObs = new IntersectionObserver(e => {
    e.forEach(x => {
      if(x.isIntersecting) x.target.querySelectorAll('.circle-fill').forEach(c => {
        const r = 28, circ = 2 * Math.PI * r;
        const pct = parseInt(c.dataset.pct);
        setTimeout(() => { c.style.strokeDasharray = circ; c.style.strokeDashoffset = circ - (pct/100)*circ; }, 200);
      });
    });
  }, { threshold: 0.2, root: scroller });

  document.querySelectorAll('.skill-cat').forEach(el => circObs.observe(el));

  // Active nav sidebar
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.sidebar-nav a');

  scroller.addEventListener('scroll', () => {
    let cur = '';
    sections.forEach(s => { if(scroller.scrollTop >= s.offsetTop - 120) cur = s.id; });
    navLinks.forEach(l => {
      l.classList.toggle('active', l.getAttribute('href') === '#' + cur);
    });
  });
</script>
</body>
</html>