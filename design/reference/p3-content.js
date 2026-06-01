/* =====================================================================
   P3 STUDIO — TREŚĆ STRONY / SITE CONTENT
   ---------------------------------------------------------------------
   Ten plik zawiera CAŁY tekst strony w dwóch językach: pl (polski) i en
   (English). Edytuj tylko tekst w cudzysłowach "...". Nie ruszaj nazw
   pól (np. headline, sub, tags) ani nawiasów { } [ ].

   Edit only the text inside the quotes "...". Do not change the field
   names, brackets { } [ ] or commas.

   KILKA WSKAZÓWEK / NOTES:
   • headline / title bywają TABLICĄ 3 części, np.:
       ["Biorę na siebie ", "cyfrowe wyzwania", " — ..."]
     ŚRODKOWY fragment to słowo WYRÓŻNIONE kolorem na stronie.
   • paragraphs / items / tags to LISTY — każdy element w "..." oddzielony
     przecinkiem. Możesz dodać/usunąć element (pamiętaj o przecinku).
   • Pary typu ["Etykieta", "Wartość"] albo ["Tekst", "adres-linku"] —
     pierwszy to widoczny tekst, drugi (jeśli link) to adres URL.
   • Po zapisaniu odśwież stronę — tekst zaktualizuje się automatycznie.
   ===================================================================== */

window.P3_CONTENT = {
      pl: {
        nav: [
          { label: "O mnie",    href: "#about" },
          { label: "Kontrakty", href: "#services" },
          { label: "Kodeks",    href: "#approach" },
          { label: "Kontakt",   href: "#contact" },
        ],
        cta: "Porozmawiajmy",
        ctaMobile: "Porozmawiajmy →",
        hero: {
          eyebrow: "Profesjonalne rzemiosło AI · Wrocław i Dolny Śląsk",
          headline: ["Biorę na siebie ", "cyfrowe wyzwania", " — bez magii, z dobrym ostrzem."],
          sub: "P3 Studio pomaga firmom bezpiecznie i praktycznie wykorzystywać AI, porządkować architekturę oraz usprawniać dostarczanie oprogramowania. Najpierw rozpoznanie terenu, potem konkretna robota — w duchu wiedźmińskiego rzemiosła: bez obietnic z wieży magów, za to z doświadczeniem ze Szlaku.",
          primary: "Porozmawiajmy",
          secondary: "Zobacz, co robię",
          slot: "Wrocław z drona",
          slotLoaded: "Wrocław",
          meta: "Wrocław · Dolny Śląsk · MMXXVI",
        },
        about: {
          num: "— 01 / O mnie",
          title: "Doświadczenie ze Szlaku — architektura, AI i inżynieria w praktyce.",
          paragraphs: [
            "Prowadzę P3 Studio — niezależną praktykę konsultingową. Nazywam się Paweł Pawłow i pracuję jako Lead Architect oraz Tech Lead, łącząc architekturę oprogramowania, wdrażanie AI i praktyczne przywództwo techniczne.",
            "Pomagam organizacjom przejść od fascynacji AI do użytecznych, powtarzalnych rozwiązań: w pracy z wiedzą, automatyzacji, tworzeniu oprogramowania i podejmowaniu decyzji. Jak na Szlaku — najpierw sprawdzam ślady, ryzyka i kontekst, dopiero potem dobieram narzędzia.",
            "Mam doświadczenie w środowiskach enterprise, platformach cyfrowych, e-commerce, logistyce, ochronie zdrowia i finansach. Łączę szerokie spojrzenie architektoniczne z inżynierską praktyką — stal ma działać, nie tylko dobrze wyglądać w pochwie.",
          ],
          founder: "— Założyciel",
          role: "Lead Architect · Tech Lead",
          meta: [
            ["Specjalizacja", "AI w firmie, architektura oprogramowania, przywództwo techniczne"],
            ["Wykształcenie", "Magister inżynier, systemy informatyczne i elektronika — Politechnika Wrocławska"],
            ["Mocne strony", "Myślenie systemowe · Komunikacja · Praktyczne wykorzystanie AI"],
            ["Lokalizacja", "Wrocław · Dolny Śląsk · projekty w Polsce i UE"],
          ],
          portraitLabel: "portret",
        },
        services: {
          num: "— 02 / Kontrakty",
          title: ["Trzy obszary. ", "Jedno", " rzemiosło."],
          items: [
            {
              pillar: "AI · Eliksiry",
              title: "AI w firmie — moc dawkowana z głową",
              desc: "Wprowadzam AI tam, gdzie przynosi realną wartość: w pracy zespołów, dokumentacji, analizie, prototypowaniu i dostarczaniu oprogramowania. Bez magicznych skrótów — z zasadami, bezpieczeństwem i mierzalnym efektem.",
              tags: ["Warsztaty AI", "Strategia i zasady użycia", "AI w delivery", "Prototypowanie", "Automatyzacja pracy z wiedzą"],
            },
            {
              pillar: "Architektura · Kuźnia",
              title: "Architektura i doradztwo — stal dopasowana do celu",
              desc: "Pomagam projektować i porządkować systemy, integracje, API oraz platformy cyfrowe. Dobieram rozwiązania do celu biznesowego, ograniczeń i ryzyk — tak, aby architektura była solidna w boju, nie tylko efektowna na diagramie.",
              tags: ["Architektura platform", "Integracje i API", "Przegląd architektury", "Modernizacja systemów"],
            },
            {
              pillar: "Przywództwo · Drużyna",
              title: "Przywództwo techniczne — prowadzenie drużyny przez mgłę",
              desc: "Wspieram zespoły i liderów w trudnych decyzjach technologicznych: od mentoringu inżynierów, przez planowanie dostarczania, po tłumaczenie między biznesem a technologią. Czasem największy potwór siedzi nie w kodzie, lecz w niejasności.",
              tags: ["Lead architect", "Tech lead na żądanie", "Mentoring", "Most biznes–IT"],
            },
          ],
        },
        approach: {
          num: "— 03 / Kodeks",
          title: "Trzy zasady mojego zawodowego kodeksu.",
          items: [
            { title: "Najpierw rozpoznanie, potem miecz", body: "Zaczynam od zrozumienia realnej pracy, decyzji, narzędzi i ograniczeń zespołu. Nie sprzedaję AI jako zaklęcia na wszystko — najpierw sprawdzam, jaki problem naprawdę wymaga rozwiązania." },
            { title: "AI ma być użyteczne, bezpieczne i powtarzalne", body: "Użyteczne — bo poprawia konkretne zadania. Bezpieczne — bo ma granice, nadzór i zdrowy rozsądek. Powtarzalne — bo zostawia po sobie procesy, wzorce i praktyki, które zespół potrafi utrzymać bez wiedźmińskiej obstawy." },
            { title: "Architektura musi zejść ze ściany do kodu", body: "Strategia, która kończy jako ozdobny diagram, jest jak miecz nad kominkiem. Pomagam przełożyć decyzje architektoniczne na backlog, kod, proces dostarczania i odpowiedzialność zespołu." },
          ],
        },
        contact: {
          num: "— 04 / Kontakt",
          headline: ["Masz ", "kontrakt", " na cyfrowego potwora? Pogadajmy."],
          items: [
            ["E-mail", "hello@p3studio.eu", "mailto:hello@p3studio.eu"],
            ["LinkedIn", "/in/pawelpawlow", "https://www.linkedin.com/in/pawelpawlow"],
          ],
          locationLabel: "Lokalizacja",
          location: "Wrocław · Dolny Śląsk · projekty w Polsce i UE",
        },
        footer: {
          tag: "Niezależna praktyka konsultingowa: AI, architektura oprogramowania i przywództwo techniczne. Od rozpoznania po wdrożenie — bez magii, za to z rzemiosłem.",
          columns: [
            { title: "Studio", links: [["O mnie", "#about"], ["Kontrakty", "#services"], ["Kodeks", "#approach"]] },
            { title: "Kontakt", links: [["hello@p3studio.eu", "mailto:hello@p3studio.eu"], ["LinkedIn", "https://www.linkedin.com/in/pawelpawlow"], ["www.p3studio.eu", "https://www.p3studio.eu"]] },
            { title: "Informacje prawne", links: [["Polityka prywatności", "#"], ["Cookies", "#"], ["Nota prawna", "#"]] },
          ],
          legal: "NIP 894-253-10-26 · ul. Zawiszy Czarnego 65, 52-214 Wrocław",
          tagline: "Wrocław · Dolny Śląsk · Rzemiosło zamiast zaklęć",
        },
      },

      en: {
        nav: [
          { label: "About",     href: "#about" },
          { label: "Contracts", href: "#services" },
          { label: "Code",      href: "#approach" },
          { label: "Contact",   href: "#contact" },
        ],
        cta: "Let’s talk",
        ctaMobile: "Let’s talk →",
        hero: {
          eyebrow: "Professional AI craft · Wrocław & Lower Silesia",
          headline: ["I take on ", "digital challenges", " — no magic, just a sharp blade."],
          sub: "P3 Studio helps companies use AI safely and practically, shape better architecture and improve software delivery. First comes reconnaissance, then the real work — in the spirit of witcher-like craft: no promises from an ivory tower, just experience from the Path.",
          primary: "Let’s talk",
          secondary: "See what I do",
          slot: "video slot — Wrocław drone footage",
          slotLoaded: "footage — Wrocław",
          meta: "Wrocław · Lower Silesia · MMXXVI",
        },
        about: {
          num: "— 01 / About",
          title: "Experience from the Path — architecture, AI and engineering in practice.",
          paragraphs: [
            "I run P3 Studio — an independent consulting practice. I’m Paweł Pawłow, a Lead Architect and Tech Lead combining software architecture, AI adoption and practical technical leadership.",
            "I help organisations move from AI fascination to useful, repeatable solutions: in knowledge work, automation, software delivery and decision-making. As on the Path, I first read the tracks, risks and context — only then choose the tools.",
            "My experience spans enterprise environments, digital platforms, e-commerce, logistics, healthcare and finance. I combine architectural perspective with hands-on engineering practice — the steel must work, not merely look good in the scabbard.",
          ],
          founder: "— Founder",
          role: "Lead Architect · Tech Lead",
          meta: [
            ["Focus", "AI in business, software architecture, technical leadership"],
            ["Education", "M.Sc., IT systems and electronics — Wrocław University of Science and Technology"],
            ["Strengths", "Systems thinking · Communication · Practical AI adoption"],
            ["Based in", "Wrocław · Lower Silesia · projects in Poland and the EU"],
          ],
          portraitLabel: "Portrait placeholder",
        },
        services: {
          num: "— 02 / Contracts",
          title: ["Three areas. ", "One", " craft."],
          items: [
            {
              pillar: "AI · Elixirs",
              title: "AI in business — power dosed with judgement",
              desc: "I introduce AI where it creates real value: team workflows, documentation, analysis, prototyping and software delivery. No magical shortcuts — just clear rules, safety and measurable outcomes.",
              tags: ["AI workshops", "Usage strategy and guardrails", "AI in delivery", "Prototyping", "Knowledge-work automation"],
            },
            {
              pillar: "Architecture · Forge",
              title: "Architecture and advisory — steel matched to the job",
              desc: "I help design and improve systems, integrations, APIs and digital platforms. Solutions are matched to business goals, constraints and risks — so the architecture holds in battle, not only on a diagram.",
              tags: ["Platform architecture", "Integrations and APIs", "Architecture review", "System modernisation"],
            },
            {
              pillar: "Leadership · Party",
              title: "Technical leadership — guiding the party through the fog",
              desc: "I support teams and leaders in difficult technology decisions: from mentoring engineers and planning delivery to translating between business and technology. Sometimes the real monster is not in the code, but in the uncertainty around it.",
              tags: ["Lead architect", "Tech lead on demand", "Mentoring", "Business–IT bridge"],
            },
          ],
        },
        approach: {
          num: "— 03 / Code",
          title: "Three rules of my professional code.",
          items: [
            { title: "Reconnaissance first, sword second", body: "I start by understanding the team’s real work, decisions, tools and constraints. I do not sell AI as a spell for everything — first I identify the problem that truly needs solving." },
            { title: "AI must be useful, safe and repeatable", body: "Useful — because it improves specific tasks. Safe — because it has boundaries, oversight and sound judgement. Repeatable — because it leaves behind processes, patterns and practices the team can sustain without a witcher on retainer." },
            { title: "Architecture must leave the wall and reach the code", body: "A strategy that ends as a decorative diagram is a sword above the mantelpiece. I help translate architectural decisions into backlog, code, delivery process and team ownership." },
          ],
        },
        contact: {
          num: "— 04 / Contact",
          headline: ["Got a ", "contract", " for a digital monster? Let’s talk."],
          items: [
            ["Email", "hello@p3studio.eu", "mailto:hello@p3studio.eu"],
            ["LinkedIn", "/in/pawelpawlow", "https://www.linkedin.com/in/pawelpawlow"],
          ],
          locationLabel: "Based in",
          location: "Wrocław · Lower Silesia · projects in Poland and the EU",
        },
        footer: {
          tag: "An independent consulting practice for AI, software architecture and technical leadership. From reconnaissance to delivery — no magic, just craft.",
          columns: [
            { title: "Studio", links: [["About", "#about"], ["Contracts", "#services"], ["Code", "#approach"]] },
            { title: "Contact", links: [["hello@p3studio.eu", "mailto:hello@p3studio.eu"], ["LinkedIn", "https://www.linkedin.com/in/pawelpawlow"], ["www.p3studio.eu", "https://www.p3studio.eu"]] },
            { title: "Legal", links: [["Privacy Policy", "#"], ["Cookies", "#"], ["Imprint", "#"]] },
          ],
          legal: "Tax ID (NIP) 894-253-10-26 · ul. Zawiszy Czarnego 65, 52-214 Wrocław",
          tagline: "Wrocław · Lower Silesia · Craft instead of spells",
        },
      },
    };
