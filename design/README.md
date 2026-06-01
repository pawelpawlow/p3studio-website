# Handoff: P3 Studio — strona wizytówka (cel: maksymalnie szybka, statyczna, bez bibliotek runtime)

## Cel zadania
Mam działający prototyp strony jednoekranowej (one-page) zbudowany w HTML + React + Babel
(transpilacja w przeglądarce). **Zadaniem jest odtworzyć go 1:1 jako maksymalnie zoptymalizowaną,
statyczną stronę BEZ żadnych bibliotek runtime** (bez React, bez ReactDOM, bez Babel) i dostarczyć
**skrypt budujący**, który produkuje gotowy do wdrożenia katalog `dist/`.

Wygląd, treść i zachowania mają pozostać **identyczne** jak w referencji. Zmienia się tylko
implementacja (vanilla JS + zminifikowany CSS) i pipeline budowania.

Domena docelowa: **https://www.p3studio.eu** (one-page, język domyślny PL + przełącznik EN).

## O plikach w tym pakiecie (`reference/`)
- **`index.html`** — **źródło prawdy** dla wyglądu, struktury DOM, pełnego CSS i wszystkich zachowań.
  To obecny build produkcyjny (React 18.3.1 prod + in-browser Babel). Przeczytaj go w całości —
  zawiera dokładny CSS (kolory, gradienty, scrim hero, animacje) i logikę komponentów w JSX.
- **`p3-content.js`** — CAŁA treść strony w dwóch językach (`window.P3_CONTENT = { pl: {...}, en: {...} }`).
  To jest plik, który właściciel edytuje. **Workflow edycji treści musi zostać zachowany.**
- **`portrait-light.png` / `portrait-dark.png`** — portrety (1122×1402, ~4:5), osobne dla trybu dziennego/nocnego.
- **`hero-wroclaw.mp4`** — tło hero. To już zoptymalizowany plik (~12 MB, 960×540, „ping-pong"
  forward+reverse wkompilowany, natywny `loop`). Można dodatkowo wygenerować WebM/AV1 + poster.

> ⚠️ HTML w tym pakiecie to **referencja projektowa**, a nie kod do wdrożenia w obecnej postaci.
> Należy go zreimplementować jako statyczną stronę vanilla zgodnie z wymaganiami niżej.

## Fidelity: HIGH (pixel-perfect)
Odtwarzaj dokładnie: kolory (hex niżej / w CSS), typografię, odstępy, gradienty, scrim hero,
czasy i krzywe animacji. Wartości referencyjne w `reference/index.html` są wiążące.

---

## Architektura docelowa (proponowana)
```
src/
  index.html          # szablon HTML (head, meta, sloty na sekcje) — bez React
  styles.css          # cały CSS (z obecnego <style>), do zminifikowania
  app.js              # cała interaktywność w vanilla JS (kilka KB)
  content.js          # = obecne p3-content.js (edytowalna treść, oba języki)
  assets/             # portrety, wideo, (font woff2 jeśli self-host)
build/
  build.mjs           # skrypt budujący (Node, ESM)
dist/                 # WYNIK: gotowe do wdrożenia (zminifikowane, z hashami)
package.json          # scripts: "build", "dev", "preview"
```
Runtime ma być **czysto statyczny** — żadnych frameworków w przeglądarce.
Build może używać narzędzi dev (esbuild / lightningcss / sharp) — byle wynik był vanilla.

## Skrypt budujący — wymagania
`npm run build` ma wyprodukować `dist/`:

1. **Zero bibliotek runtime.** Usuń React/ReactDOM/Babel. Zreimplementuj logikę w vanilla JS.
2. **Inline treści w czasie buildu.** Wczytaj `content.js`, wstrzyknij dane do HTML/JS przy
   budowaniu (renderuj statyczny HTML obu wersji językowych lub serializuj dane do małego JSON-a
   osadzonego inline). Źródło `content.js` zostaje edytowalne; po edycji wystarczy `npm run build`.
   - **Pełny PL i EN muszą być w wyjściu** (SSR/prerender) — przełącznik języka tylko podmienia
     widoczny tekst, bez dociągania danych z sieci.
3. **CSS:** zminifikuj (lightningcss / esbuild), zinline'uj krytyczny CSS w `<head>`. Autoprefiks.
4. **JS:** zminifikuj (esbuild/terser). Ładuj z `defer`. Cel: **< 10 KB gzip** całego JS.
5. **Fonty:** self-host **Marcellus** (display) i **Manrope** (300/400/500/600) jako `woff2`,
   `font-display: swap`, `<link rel="preload">` dla najważniejszych. Usuń round-trip do Google Fonts.
6. **Obrazy:** wygeneruj nowoczesne formaty (AVIF + WebP + PNG fallback) w kilku szerokościach
   (np. 550, 825, 1122 px) i podaj przez `<picture>`/`srcset`. Zachowaj `width/height`,
   `loading="lazy"`, `decoding="async"`. Portrety są poniżej hero (lazy OK).
7. **Wideo hero:** zachowaj bramkowanie (patrz „Zachowania"). Dodatkowo wygeneruj `.webm` (VP9/AV1)
   obok `.mp4` i `poster` (klatka z wideo) dla szybszego pierwszego klatkowania na desktopie.
8. **Cache-busting:** hashe w nazwach plików statycznych (`app.[hash].js`, `styles.[hash].css`,
   portrety, wideo) + odpowiednie odwołania w HTML.
9. **HTML:** zminifikuj. Zachowaj wszystkie meta SEO/OG, `lang`, `theme-color`, canonical.
10. **Skrypt pre-paint motywu** (ustawia `data-theme` zanim namaluje stronę) MUSI zostać inline
    w `<head>` jako pierwszy, bez `defer` (zapobiega mignięciu złego motywu).
11. Dodaj `robots.txt` i prosty `sitemap.xml` dla `https://www.p3studio.eu/`.

## Cele wydajności (Lighthouse, mobile, throttling 4G)
- Performance **≥ 95**, Best Practices ≥ 95, SEO ≥ 95, A11y ≥ 95.
- **LCP < 2.0 s** mobile, CLS ~0, brak JS blokującego renderowanie.
- Całe JS runtime **< 10 KB gzip**; brak transpilacji w przeglądarce.
- Brak poziomego przewijania na żadnej szerokości (już zabezpieczone: `overflow-x:hidden` + `max-width:100%`).

---

## Sekcje (one-page, w kolejności)
Wszystkie teksty pochodzą z `content.js` (klucze w nawiasach).

1. **Nav (sticky)** — logo „P3·Studio" (duże „P3", mała kropka-złoto, małe „STUDIO"),
   linki (`nav`), przełącznik języka PL/EN (`LangSwitch`), przełącznik dzień/noc (słońce/księżyc),
   CTA „Porozmawiajmy" (`cta`). Po przewinięciu nav dostaje tło + blur (`.nav.scrolled`).
   < 980 px: linki i CTA chowane → przycisk hamburgera → pełnoekranowe `mobile-menu`.
2. **Hero** (`hero`) — eyebrow, headline (tablica 3 części; **środkowa** część jest wyróżniona
   kolorem `--bronze`/`--bronze-soft`), sub, dwa przyciski (`primary` pełny, `secondary` ghost),
   tag w rogu (`slot`/`slotLoaded`), meta (`meta`). Tło: wideo + gradient + ziarno + winieta/scrim.
3. **O mnie** (`about`, id `#about`) — `num`, `title`, 3× `paragraphs` (pierwszy akapit ma
   inicjał/drop-cap pierwszej litery w `--serif`/`--bronze`), karta założyciela po **lewej**
   (portret + `founder`/„Paweł Pawłow"/`role` + tabela `meta` par [label,value]), proza po **prawej**.
   Układ 2-kolumnowy `1fr 1.05fr` (portret w `order:-1`); < 980 px → 1 kolumna.
4. **Kontrakty/Usługi** (`services`, id `#services`) — `num`, `title` (3 części, środek wyróżniony),
   lista `items` (pillar, title, desc, tags). Wiersze rozwijane po kliknięciu/hover: subtelne tło
   `--paper` + lewy pasek `box-shadow: inset 3px 0 0 var(--bronze)` + przesunięcie tytułu o 6px.
   **WAŻNE: rozwijanie NIE może zmieniać szerokości kolumn ani zawijać tekstu** (nie używać paddingu
   poziomego do efektu — tylko tło/box-shadow/transform).
5. **Kodeks/Podejście** (`approach`, id `#approach`) — `num`, `title`, 3× `items` (title, body)
   w siatce 3-kolumnowej z numeracją **03 → 02 → 01** (malejąco; treść wyświetlana w odwróconej
   kolejności względem danych). < 980 px → 1 kolumna.
6. **Kontakt** (`contact`, id `#contact`) — `num`, headline (3 części), `items` ([label, value, href]),
   `locationLabel` + `location`.
7. **Stopka** (`footer`) — `tag`, kolumny linków (`columns`), `legal`, `tagline`, logo.

---

## Zachowania / interakcje (do odtworzenia w vanilla JS)

### Motyw dzień/noc
- **Pre-paint** (inline w `<head>`, pierwszy skrypt): ustaw `document.documentElement[data-theme]`
  z `localStorage["p3-theme"]` jeśli jest (`"light"`/`"dark"`), inaczej z pory dnia:
  **07:00–18:59 → `light`, poza tym → `dark`**.
- Przełącznik (słońce/księżyc) w nav: zmienia `data-theme`, zapisuje do `localStorage`.
- Light = paleta domyślna (`:root`). Dark = nadpisania pod `html[data-theme="dark"]`.
- **Płynne przejście**: `transition: ... .6s ease` na tłach/kolorach/filtrach.
- **Portret** robi cross-fade: dwa `<img>` nałożone, opacity sterowane selektorami
  `html[data-theme] .portrait-light/.portrait-dark`, transition opacity .6s. Klasa `.solo`
  (gdy istnieje tylko jedno zdjęcie) wymusza `opacity:1` w obu trybach. Fallback do placeholdera
  (kreskowane tło + etykieta) gdy brak obu plików.

### Język PL/EN
- `localStorage["p3-lang"]`, domyślnie `pl`. Przełącznik podmienia całą treść z `content.js`.
- `<title>` i `document.documentElement.lang` aktualizowane wraz z językiem.
- Etykiety nav używają „stabilnej szerokości" (rezerwują miejsce pod dłuższy z dwóch wariantów,
  by przełączanie nie przesuwało layoutu) — patrz `StableLabel` w referencji.

### Hero wideo (bramkowanie — kluczowe dla mobile)
Wideo ładuje się TYLKO gdy **wszystkie** warunki spełnione:
- szerokość ekranu **≥ 768 px** (`(max-width: 767px)` = NIE ładuj),
- **brak** `prefers-reduced-motion: reduce`,
- **brak** `navigator.connection.saveData`,
- łącze **nie** jest „2g".
W przeciwnym razie pokaż lekki gradientowy hero (bez pobierania ~12 MB).
Gdy wideo się załaduje → klasa `has-video` na `.hero` (zmienia scrim na tekst).
Atrybuty: `autoplay muted loop playsinline preload="auto"`. Plik ma wkompilowany ping-pong.

### Pozostałe
- **Reveal przy scrollu:** `.reveal { opacity:0; transform... }` → klasa `.in` przez
  `IntersectionObserver` (z fallbackiem: gdy brak IO, pokaż od razu).
- **Scroll-snap:** `html { scroll-snap-type: y proximity; scroll-padding-top: 77px }`,
  sekcje `min-height: 100vh/svh`, `scroll-snap-align: start`; **wyłączone < 600 px** (`align:none`).
  Sekcje „O mnie"/„Usługi" mogą być wyższe niż ekran — wjeżdżają od góry i scrollują wewnętrznie.
- **Menu mobilne:** pełnoekranowe, `transform: translateY(-100%)` → `.open` = `none`, transition .55s.
- Tap-targety ≥ 44 px na mobile.

---

## Design tokens

### Kolory — tryb JASNY (`:root`)
```
--bone #f1ebdc   (tło strony)        --paper #e7decb     --sand #d4c19a
--stone #8a7f6a  --stone-soft #b2a78f
--charcoal #2b2a25 (tekst)           --ink #1a1915
--bronze #9b3d2c (akcent, cegła)     --bronze-soft #c2705d
--gold #ad8237                        --gold-soft #c79f5a
--odra #5d7e8a   --park #5e8273   --pomarancza #d56a2a   --clay #dec396   --walnut #2d2a24
--line rgba(43,42,37,.14)            --line-light rgba(43,42,37,.08)
```
Nav scrolled: `background: rgba(241,235,220,.86)` + `backdrop-filter: saturate(140%) blur(14px)`.
Hero wideo (light): `filter: brightness(1.05) saturate(0.55)`.
Hero scrim (light, „mleczny"): `linear-gradient(180deg, rgba(241,235,220,.78) 0%, rgba(241,235,220,.68) 50%, rgba(241,235,220,.85) 100%)`.

### Kolory — tryb CIEMNY (`html[data-theme="dark"]`)
```
--bone #14130d   --paper #1b1912   --sand #2a2418
--stone #9b9079  --stone-soft #6f6757
--charcoal #f1ebdc  --ink #fbf7ec
--bronze #c2705d    --bronze-soft #d98a76
--gold #c79f5a      --gold-soft #dcbb7e
--odra #7d9aa6   --park #7ba08e   --pomarancza #e07e3a   --clay #221d13   --walnut #100f0a
--line rgba(241,235,220,.14)         --line-light rgba(241,235,220,.07)
```
Nav scrolled (dark): `rgba(18,17,11,.82)`.
Hero wideo (dark): `filter: brightness(0.72) saturate(0.7) contrast(1.06)`.
Hero scrim (dark, kinowy): `linear-gradient(180deg, rgba(18,17,11,.55) 0%, rgba(18,17,11,.35) 42%, rgba(18,17,11,.78) 100%)` + radialna winieta.

### Typografia
- Display/serif: **Marcellus** (`--serif`).
- Tekst/sans: **Manrope** 300/400/500/600 (`--sans`).
- Mono (tagi/etykiety): `ui-monospace, "SF Mono", Menlo, monospace`.
- Hero headline: `clamp(30px, min(5.4vw, 6.5vh), 108px)`, line-height ~1.0 (skaluje się też do wysokości okna).
- Body about: `clamp(17px, 1.4vw, 20px)`, line-height 1.62.

### Layout
- `--container: 1360px`, `--gutter: clamp(20px, 4vw, 56px)`.
- Breakpointy: **980px** (nav→hamburger, siatki→1 kolumna), **767px** (wideo off), **600px**
  (stopka 1 kol., founder-meta 1 kol., hero-meta-right ukryty, snap off).
- Wysokość nav ≈ 77 px (stąd `scroll-padding-top: 77px`).

## Struktura `content.js`
`window.P3_CONTENT = { pl: {...}, en: {...} }`, oba o identycznym kształcie:
```
nav: [{label, href}], cta, ctaMobile,
hero: { eyebrow, headline:[a,b,c], sub, primary, secondary, slot, slotLoaded, meta },
about:{ num, title, paragraphs:[...], founder, role, meta:[[label,value],...], portraitLabel },
services:{ num, title:[a,b,c], items:[{pillar,title,desc,tags:[...]}] },
approach:{ num, title, items:[{title,body}] },   // wyświetlane 03→02→01
contact:{ num, headline:[a,b,c], items:[[label,value,href],...], locationLabel, location },
footer:{ tag, columns:[{title, links:[[text,href],...]}], legal, tagline }
```
Headline/title jako tablica 3 elementów: **środkowy** = fragment wyróżniony kolorem.

## Dane stałe (nie z content.js)
- Imię: **Paweł Pawłow**. Rola: **Lead Architect · Tech Lead**.
- Wykształcenie: PL „**Magister Inżynier**, Systemy informatyczne i elektronika — Politechnika
  Wrocławska"; EN „M.Sc., IT Systems & Electronics — Wrocław University of Science and Technology".
- Dane prawne (stopka): „NIP 894-253-10-26 · ul. Zawiszy Czarnego 65, 52-214 Wrocław".
- E-mail: hello@p3studio.eu · LinkedIn: /in/pawelpawlow · www.p3studio.eu

## Deploy
Statyczny `dist/` na dowolny host statyczny (Cloudflare Pages / Netlify / FTP) pod
`www.p3studio.eu`, HTTPS. Zalecane nagłówki cache: długi `max-age` + `immutable` dla zahaszowanych
assetów; krótki/`no-cache` dla `index.html`.

## Pliki referencyjne w tym pakiecie
- `reference/index.html` — źródło prawdy (CSS + markup + logika w JSX).
- `reference/p3-content.js` — treść PL/EN.
- `reference/portrait-light.png`, `reference/portrait-dark.png` — portrety.
- `reference/hero-wroclaw.mp4` — wideo hero (ping-pong, 960×540).
