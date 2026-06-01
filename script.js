/* =====================================================================
   P3 STUDIO — script.js
   ---------------------------------------------------------------------
   Vanilla port of the Claude Design prototype behaviours. No frameworks.
   Polish content is rendered statically in index.html; this file swaps in
   the English strings (EN map below), handles the day/night theme, the
   hero-video gating, the mobile menu, scroll reveals and the services
   accordion.

   All swapped strings are trusted, hard-coded constants — text is applied
   with textContent (and explicit DOM nodes for the few highlighted
   headlines), never innerHTML, so there is no injection surface.

   TO EDIT POLISH TEXT: edit index.html directly.
   TO EDIT ENGLISH TEXT: edit the EN map (and RICH_PL for the three
   highlighted headlines) just below. Keys match the data-i18n attributes.
   ===================================================================== */
(function () {
  "use strict";

  /* English strings — keys mirror the data-i18n attributes in the HTML. */
  var EN = {
    "skip": "Skip to content",

    "nav.0": "About",
    "nav.1": "Contracts",
    "nav.2": "Code",
    "nav.3": "Contact",
    "cta": "Let’s talk",
    "ctaMobile": "Let’s talk →",

    "hero.eyebrow": "Professional AI craft · Wrocław & Lower Silesia",
    "hero.headline": "I take on <em>digital challenges</em> — no magic, just a sharp blade.",
    "hero.sub": "P3 Studio helps companies use AI safely and practically, shape better architecture and improve software delivery. First comes reconnaissance, then the real work — in the spirit of witcher-like craft: no promises from an ivory tower, just experience from the Path.",
    "hero.primary": "Let’s talk",
    "hero.secondary": "See what I do",
    "hero.meta": "Wrocław · Lower Silesia · MMXXVI",

    "about.num": "— 01 / About",
    "about.title": "Experience from the Path — architecture, AI and engineering in practice.",
    "about.p0": "I run P3 Studio — an independent consulting practice. I’m Paweł Pawłow, a Lead Architect and Tech Lead combining software architecture, AI adoption and practical technical leadership.",
    "about.p1": "I help organisations move from AI fascination to useful, repeatable solutions: in knowledge work, automation, software delivery and decision-making. As on the Path, I first read the tracks, risks and context — only then choose the tools.",
    "about.p2": "My experience spans enterprise environments, digital platforms, e-commerce, logistics, healthcare and finance. I combine architectural perspective with hands-on engineering practice — the steel must work, not merely look good in the scabbard.",
    "about.founder": "— Founder",
    "about.role": "Lead Architect · Tech Lead",
    "about.meta.0.k": "Focus",
    "about.meta.0.v": "AI in business, software architecture, technical leadership",
    "about.meta.1.k": "Education",
    "about.meta.1.v": "M.Sc., IT systems and electronics — Wrocław University of Science and Technology",
    "about.meta.2.k": "Strengths",
    "about.meta.2.v": "Systems thinking · Communication · Practical AI adoption",
    "about.meta.3.k": "Based in",
    "about.meta.3.v": "Wrocław · Lower Silesia · projects in Poland and the EU",

    "services.num": "— 02 / Contracts",
    "services.title": "Three areas. <em>One</em> craft.",
    "services.0.pillar": "AI · Elixirs",
    "services.0.title": "AI in business — power dosed with judgement",
    "services.0.desc": "I introduce AI where it creates real value: team workflows, documentation, analysis, prototyping and software delivery. No magical shortcuts — just clear rules, safety and measurable outcomes.",
    "services.0.tag.0": "AI workshops",
    "services.0.tag.1": "Usage strategy and guardrails",
    "services.0.tag.2": "AI in delivery",
    "services.0.tag.3": "Prototyping",
    "services.0.tag.4": "Knowledge-work automation",
    "services.1.pillar": "Architecture · Forge",
    "services.1.title": "Architecture and advisory — steel matched to the job",
    "services.1.desc": "I help design and improve systems, integrations, APIs and digital platforms. Solutions are matched to business goals, constraints and risks — so the architecture holds in battle, not only on a diagram.",
    "services.1.tag.0": "Platform architecture",
    "services.1.tag.1": "Integrations and APIs",
    "services.1.tag.2": "Architecture review",
    "services.1.tag.3": "System modernisation",
    "services.2.pillar": "Leadership · Party",
    "services.2.title": "Technical leadership — guiding the party through the fog",
    "services.2.desc": "I support teams and leaders in difficult technology decisions: from mentoring engineers and planning delivery to translating between business and technology. Sometimes the real monster is not in the code, but in the uncertainty around it.",
    "services.2.tag.0": "Lead architect",
    "services.2.tag.1": "Tech lead on demand",
    "services.2.tag.2": "Mentoring",
    "services.2.tag.3": "Business–IT bridge",

    "approach.num": "— 03 / Code",
    "approach.title": "Three rules of my professional code.",
    "approach.0.title": "Reconnaissance first, sword second",
    "approach.0.body": "I start by understanding the team’s real work, decisions, tools and constraints. I do not sell AI as a spell for everything — first I identify the problem that truly needs solving.",
    "approach.1.title": "AI must be useful, safe and repeatable",
    "approach.1.body": "Useful — because it improves specific tasks. Safe — because it has boundaries, oversight and sound judgement. Repeatable — because it leaves behind processes, patterns and practices the team can sustain without a witcher on retainer.",
    "approach.2.title": "Architecture must leave the wall and reach the code",
    "approach.2.body": "A strategy that ends as a decorative diagram is a sword above the mantelpiece. I help translate architectural decisions into backlog, code, delivery process and team ownership.",

    "contact.num": "— 04 / Contact",
    "contact.headline": "Got a <em>contract</em> for a digital monster? Let’s talk.",
    "contact.email.k": "Email",
    "contact.linkedin.k": "LinkedIn",
    "contact.locationLabel": "Based in",
    "contact.location": "Wrocław · Lower Silesia · projects in Poland and the EU",

    "footer.tag": "An independent consulting practice for AI, software architecture and technical leadership. From reconnaissance to delivery — no magic, just craft.",
    "footer.col0.title": "Studio",
    "footer.col1.title": "Contact",
    "footer.col2.title": "Legal",
    "footer.privacy": "Privacy Policy",
    "footer.cookies": "Cookies",
    "footer.imprint": "Imprint",
    "footer.legal": "Tax ID (NIP) 894-253-10-26 · ul. Zawiszy Czarnego 65, 52-214 Wrocław",
    "footer.tagline": "Wrocław · Lower Silesia · Craft instead of spells"
  };

  /* The three headlines have a colour-highlighted middle word. Polish
     versions (with the <em> boundary) live here; the EN versions are in the
     map above. Everything else captures its Polish text from the page. */
  var RICH_PL = {
    "hero.headline": "Biorę na siebie <em>cyfrowe wyzwania</em> — bez magii, z dobrym ostrzem.",
    "services.title": "Trzy obszary. <em>Jedno</em> rzemiosło.",
    "contact.headline": "Masz <em>kontrakt</em> na cyfrowego potwora? Pogadajmy."
  };

  var TITLES = {
    pl: "P3 Studio — praktyczne AI, architektura i przywództwo technologiczne",
    en: "P3 Studio — practical AI, architecture and technology leadership"
  };

  /* Hero corner tag has two states (idle / video loaded), per language. */
  var SLOT = {
    pl: { idle: "Wrocław z drona", loaded: "Wrocław" },
    en: { idle: "video slot — Wrocław drone footage", loaded: "footage — Wrocław" }
  };

  var ARIA = {
    pl: { nav: "Główna nawigacja", menu: "Menu" },
    en: { nav: "Primary navigation", menu: "Menu" }
  };

  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };

  /* Capture Polish plain strings from the rendered DOM (single source of
     truth for PL). Rich headlines come from RICH_PL instead. */
  var PL = {};
  $$("[data-i18n]").forEach(function (el) {
    var key = el.getAttribute("data-i18n");
    if (el.hasAttribute("data-i18n-loaded")) return;       // slot tag, handled below
    if (key in RICH_PL) { PL[key] = RICH_PL[key]; return; }
    if (!(key in PL)) PL[key] = el.textContent;
  });

  var RICH_RE = /^([\s\S]*?)<em>([\s\S]*?)<\/em>([\s\S]*)$/;

  /* Apply a string to an element. Supports a single <em>…</em> highlight,
     built from explicit DOM nodes (no innerHTML). */
  function setText(el, str) {
    var m = str.match(RICH_RE);
    if (!m) { el.textContent = str; return; }
    while (el.firstChild) el.removeChild(el.firstChild);
    if (m[1]) el.appendChild(document.createTextNode(m[1]));
    var em = document.createElement("em");
    em.textContent = m[2];
    el.appendChild(em);
    if (m[3]) el.appendChild(document.createTextNode(m[3]));
  }

  var heroLoaded = false;
  var lang = "pl";

  function setSlotTag() {
    var el = $("#hero-slot");
    if (el) el.textContent = SLOT[lang][heroLoaded ? "loaded" : "idle"];
  }

  function applyLang(next) {
    lang = (next === "en") ? "en" : "pl";
    var dict = (lang === "en") ? EN : PL;

    $$("[data-i18n]").forEach(function (el) {
      if (el.hasAttribute("data-i18n-loaded")) return;     // slot tag handled below
      var key = el.getAttribute("data-i18n");
      var val = dict[key];
      if (val == null) val = PL[key];                      // fall back to Polish
      if (val != null) setText(el, val);
    });
    setSlotTag();

    document.documentElement.setAttribute("lang", lang);
    document.title = TITLES[lang];

    $$(".lang-btn").forEach(function (b) {
      var on = b.getAttribute("data-lang") === lang;
      b.classList.toggle("active", on);
      b.setAttribute("aria-pressed", on ? "true" : "false");
    });

    var navEl = $("#nav-links"); if (navEl) navEl.setAttribute("aria-label", ARIA[lang].nav);
    var menuBtn = $("#menu-btn"); if (menuBtn) menuBtn.setAttribute("aria-label", ARIA[lang].menu);

    syncThemeIcon();
    try { localStorage.setItem("p3-lang", lang); } catch (e) {}
  }

  /* ---------------- THEME ---------------- */
  function currentTheme() {
    return document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
  }
  function syncThemeIcon() {
    var dark = currentTheme() === "dark";
    var sun = $(".icon-sun"), moon = $(".icon-moon");
    if (sun) sun.hidden = dark;
    if (moon) moon.hidden = !dark;
    var btn = $("#theme-toggle");
    if (btn) {
      btn.setAttribute("aria-label", (lang === "en")
        ? (dark ? "Switch to day mode" : "Switch to night mode")
        : (dark ? "Przełącz na tryb dzienny" : "Przełącz na tryb nocny"));
      btn.setAttribute("title", dark
        ? (lang === "en" ? "Day" : "Dzień")
        : (lang === "en" ? "Night" : "Noc"));
    }
  }
  function setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    try { localStorage.setItem("p3-theme", theme); } catch (e) {}
    syncThemeIcon();
  }

  /* ---------------- HERO VIDEO (gated) ----------------
     Only load the multi-MB clip on capable connections: wide viewport,
     no reduced-motion preference, no Save-Data, not on 2g. Everyone else
     keeps the lightweight gradient hero — text never depends on the video. */
  function maybeLoadVideo() {
    var v = $(".hero-video");
    var hero = $(".hero");
    if (!v || v.dataset.kicked) return;

    var narrow = window.matchMedia("(max-width: 767px)").matches;
    var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var conn = navigator.connection || {};
    var saveData = !!conn.saveData;
    var slow = conn.effectiveType && /(^|-)2g$/.test(conn.effectiveType);
    if (narrow || reduced || saveData || slow) return;

    v.dataset.kicked = "1";
    if (v.dataset.poster) v.setAttribute("poster", v.dataset.poster);

    function addSource(src, type) {
      if (!src) return;
      var s = document.createElement("source");
      s.src = src; s.type = type;
      v.appendChild(s);
    }
    addSource(v.dataset.webm, "video/webm");
    addSource(v.dataset.mp4, "video/mp4");

    v.addEventListener("loadeddata", function () {
      heroLoaded = true;
      v.classList.add("loaded");
      if (hero) hero.classList.add("has-video");
      setSlotTag();
    });
    v.addEventListener("error", function () { heroLoaded = false; });
    v.load();
    var p = v.play();
    if (p && p.catch) p.catch(function () {});
  }

  /* ---------------- SERVICES ACCORDION ---------------- */
  function initServices() {
    var rows = $$(".service-row");
    function setOpen(idx) {
      rows.forEach(function (r, i) {
        var on = i === idx;
        r.classList.toggle("expanded", on);
        r.setAttribute("aria-expanded", on ? "true" : "false");
        var arrow = $(".service-arrow", r);
        if (arrow) arrow.textContent = on ? "—" : "+";
      });
    }
    rows.forEach(function (row, i) {
      function toggle() {
        setOpen(row.classList.contains("expanded") ? -1 : i);
      }
      row.addEventListener("click", toggle);
      row.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(); }
      });
    });
  }

  /* ---------------- MOBILE MENU ---------------- */
  function initMenu() {
    var btn = $("#menu-btn");
    var menu = $("#mobile-menu");
    if (!btn || !menu) return;
    function close() {
      btn.classList.remove("open");
      menu.classList.remove("open");
      btn.setAttribute("aria-expanded", "false");
      menu.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    }
    function toggle() {
      var open = !menu.classList.contains("open");
      btn.classList.toggle("open", open);
      menu.classList.toggle("open", open);
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      menu.setAttribute("aria-hidden", open ? "false" : "true");
      document.body.style.overflow = open ? "hidden" : "";
    }
    btn.addEventListener("click", toggle);
    $$("a", menu).forEach(function (a) { a.addEventListener("click", close); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && menu.classList.contains("open")) close();
    });
  }

  /* ---------------- SCROLL REVEALS ---------------- */
  function initReveals() {
    var els = $$(".reveal");
    if (!("IntersectionObserver" in window)) {
      els.forEach(function (el) { el.classList.add("in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ---------------- NAV SCROLL STATE ---------------- */
  function initNav() {
    var nav = $("#top-nav");
    function onScroll() { if (nav) nav.classList.toggle("scrolled", window.scrollY > 80); }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------------- INIT ---------------- */
  function init() {
    var yr = $("#foot-year");
    if (yr) yr.textContent = String(new Date().getFullYear());

    // Initial language: saved choice wins; otherwise PL for Polish browsers,
    // EN for everyone else (the DOM ships as PL, so we only swap if needed).
    var initialLang = "pl";
    try {
      var saved = localStorage.getItem("p3-lang");
      if (saved === "pl" || saved === "en") {
        initialLang = saved;
      } else {
        var b = (navigator.language || "pl").toLowerCase();
        initialLang = b.indexOf("pl") === 0 ? "pl" : "en";
      }
    } catch (e) {}
    applyLang(initialLang);

    var tBtn = $("#theme-toggle");
    if (tBtn) tBtn.addEventListener("click", function () {
      setTheme(currentTheme() === "dark" ? "light" : "dark");
    });

    $$(".lang-btn").forEach(function (b) {
      b.addEventListener("click", function () { applyLang(b.getAttribute("data-lang")); });
    });

    initNav();
    initMenu();
    initServices();
    initReveals();

    maybeLoadVideo();
    var mq = window.matchMedia("(max-width: 767px)");
    var onMq = function () { maybeLoadVideo(); };
    if (mq.addEventListener) mq.addEventListener("change", onMq);
    else if (mq.addListener) mq.addListener(onMq);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
