# P3 Studio — strona / website

Statyczna strona-wizytówka **P3 Studio** (Paweł Pawłow). Czysty HTML + CSS +
odrobina vanilla JavaScript. **Bez frameworków, bez kroku budowania, bez Node,
bez backendu, bez śledzenia i bez plików cookie.** Hostowana na GitHub Pages,
domena i poczta w OVHcloud.

Domena docelowa: **https://www.p3studio.eu**

---

## 1. Struktura projektu

```
index.html          # strona główna (treść PL wbudowana w HTML, EN podmieniana przez JS)
privacy.html        # polityka prywatności (PL) — SZABLON do uzupełnienia przed publikacją
styles.css          # cały wygląd + @font-face (self-hosted)
script.js           # motyw dzień/noc, przełącznik PL/EN, wideo hero, menu mobilne, animacje
CNAME               # www.p3studio.eu  (domena dla GitHub Pages)
_config.yml         # lista plików WYKLUCZONYCH z publikacji (CLAUDE.md, README, design/…)
robots.txt          # SEO
sitemap.xml         # SEO (mapa strony)
assets/
  fonts/            # Marcellus + Manrope (woff2, latin + latin-ext)
  images/           # portrety (webp + jpg) + og-image.jpg (obraz do social media)
  video/            # hero-wroclaw.webm + .mp4 + hero-poster.jpg
design/             # MATERIAŁY ŹRÓDŁOWE z Claude Design (prototyp React, oryginalne assety)
                    # — nie są używane przez stronę; można je zostawić lub usunąć z repo.
```

> Strona działa też **bez JavaScriptu**: treść polska jest w HTML, a elementy
> wymagające JS (animacje, rozwijanie usług) mają sensowny stan domyślny.

---

## 2. Jak edytować treść

### Tekst polski (domyślny)
Edytuj bezpośrednio **`index.html`**. Szukaj tekstu między znacznikami, np.:

```html
<p class="hero-sub" data-i18n="hero.sub">P3 Studio pomaga firmom…</p>
```

Zmieniaj tylko widoczny tekst — **nie usuwaj** atrybutu `data-i18n="…"` (łączy
zdanie z jego angielskim odpowiednikiem).

### Tekst angielski
Edytuj mapę `EN` na początku **`script.js`**. Klucze odpowiadają atrybutom
`data-i18n` z HTML:

```js
"hero.sub": "P3 Studio helps companies…",
```

Trzy nagłówki z wyróżnionym (kolorowym) słowem mają w środku `<em>…</em>`:
- po polsku są w obiekcie `RICH_PL` w `script.js`,
- po angielsku w mapie `EN`.

Przykład: `"Trzy obszary. <em>Jedno</em> rzemiosło."` → kolorem podświetla się
słowo między `<em>` a `</em>`.

### Dane prawne, e-mail, NIP
Stopka w `index.html` (sekcja `<footer>`) oraz **`privacy.html`**. E-mail
kontaktowy `hello@p3studio.eu` występuje w `index.html`, `privacy.html`.

---

## 3. Jak podmienić wideo i obrazy

Wszystkie pliki są w `assets/`. Zachowaj te same nazwy plików, albo zaktualizuj
ścieżki w `index.html`.

### Wideo hero
W `index.html`:
```html
<video class="hero-video" ...
       data-webm="assets/video/hero-wroclaw.webm"
       data-mp4="assets/video/hero-wroclaw.mp4"
       data-poster="assets/video/hero-poster.jpg"></video>
```
Podmień pliki w `assets/video/`. Zalecane: krótka, bezszwowa pętla, ~960×540,
bez dźwięku. Wideo **ładuje się tylko na desktopie** (≥768 px, bez trybu
oszczędzania danych / reduced-motion) — na telefonach pokazywany jest lekki
gradient, więc strona zawsze jest szybka.

Polecenia użyte do wygenerowania obecnych plików (wymaga `ffmpeg`):
```bash
# WebM (VP9) — mniejszy, nowoczesny
ffmpeg -i ZRODLO.mp4 -c:v libvpx-vp9 -crf 44 -b:v 0 -an -row-mt 1 assets/video/hero-wroclaw.webm
# MP4 (H.264) — fallback, z faststart do szybkiego startu
ffmpeg -i ZRODLO.mp4 -c:v libx264 -crf 26 -preset slow -pix_fmt yuv420p -an -movflags +faststart assets/video/hero-wroclaw.mp4
# Poster (klatka ~2 s)
ffmpeg -ss 2 -i ZRODLO.mp4 -frames:v 1 -q:v 4 assets/video/hero-poster.jpg
```

### Portrety (tryb dzienny / nocny)
Dwa zdjęcia, które płynnie się przenikają przy zmianie motywu:
`portrait-light.*` (dzień) i `portrait-dark.*` (noc). Format ~4:5 (np. 1122×1402).
Każdy portret ma wersję `webp` (561 i 1122 px) oraz `jpg` (fallback). Jeśli plik
zniknie — pojawi się kreskowany placeholder (nic się nie psuje).

Polecenia (wymaga `ffmpeg`):
```bash
ffmpeg -i portret.png -vf scale=1122:-1 -c:v libwebp -quality 80 assets/images/portrait-light-1122.webp
ffmpeg -i portret.png -vf scale=561:-1  -c:v libwebp -quality 80 assets/images/portrait-light-561.webp
ffmpeg -i portret.png -vf scale=1122:-1 -q:v 4 assets/images/portrait-light.jpg
```

### Obraz do udostępniania (Open Graph)
`assets/images/og-image.jpg` (1200×630) — miniatura pokazywana przy linkowaniu
na LinkedIn / Slack / Facebook. Podmień plik zachowując proporcje 1200×630.

### Czcionki
W `assets/fonts/` (Marcellus + Manrope, OFL, self-hosted). Aby zmienić font:
wgraj nowe pliki `.woff2` i zaktualizuj reguły `@font-face` na początku
`styles.css` oraz `<link rel="preload">` w `<head>` plików HTML.

---

## 4. Jak przetestować lokalnie

Potrzebny jest dowolny serwer HTTP (otwarcie pliku przez `file://` zablokuje
część funkcji). Najprościej Pythonem:

```bash
cd p3studio-website
python3 -m http.server 8080
# otwórz http://localhost:8080
```

Co sprawdzić: przełącznik **PL/EN**, **dzień/noc**, rozwijanie usług, menu na
wąskim ekranie, wideo hero na szerokim ekranie. Warto też uruchomić **Lighthouse**
(DevTools → Lighthouse) — cel: Performance / SEO / Best Practices / A11y ≥ 95.

---

## 5. Publikacja na GitHub Pages

### Dokładne ustawienia GitHub Pages
1. Wypchnij pliki do repozytorium na GitHubie (patrz sekcja 7).
2. **Settings → Pages**.
3. **Build and deployment → Source:** `Deploy from a branch`.
4. **Branch:** `main` • **folder:** `/ (root)` → **Save**.
5. **Custom domain:** wpisz `www.p3studio.eu` → **Save**
   (plik `CNAME` w repo już to ustawia; GitHub zweryfikuje DNS).
6. Po propagacji DNS zaznacz **Enforce HTTPS**.

GitHub Pages przepuszcza repo przez Jekyll, ale pliki HTML/CSS/JS bez front
matter są kopiowane 1:1 — strona pozostaje w pełni statyczna. Jekyll jest
używany wyłącznie po to, by lista `exclude:` w **`_config.yml`** trzymała pliki
wewnętrzne (CLAUDE.md, README.md, PROJECT-BRIEF.md, `design/`) poza publikowaną
stroną. Nowe pliki robocze dopisuj do tej listy.

---

## 6. DNS w OVHcloud (dla GitHub Pages)

W panelu OVHcloud: **Domeny → p3studio.eu → Strefa DNS**. Dodaj/ustaw:

### A) Subdomena `www` (główny adres strony)
| Typ   | Nazwa (subdomena) | Cel / wartość                |
|-------|-------------------|------------------------------|
| CNAME | `www`             | `pawelpawlow.github.io.`     |

> `pawelpawlow` to nazwa użytkownika GitHub. Kropka na końcu jest istotna w
> strefie OVHcloud.

### B) Domena główna (apex) `p3studio.eu` → przekierowanie na `www`
Dodaj **4 rekordy A** (IPv4) i opcjonalnie **4 rekordy AAAA** (IPv6) na pustą nazwę:

| Typ  | Nazwa | Wartość             |
|------|-------|---------------------|
| A    | `@`   | `185.199.108.153`   |
| A    | `@`   | `185.199.109.153`   |
| A    | `@`   | `185.199.110.153`   |
| A    | `@`   | `185.199.111.153`   |
| AAAA | `@`   | `2606:50c0:8000::153` |
| AAAA | `@`   | `2606:50c0:8001::153` |
| AAAA | `@`   | `2606:50c0:8002::153` |
| AAAA | `@`   | `2606:50c0:8003::153` |

> To oficjalne adresy GitHub Pages. Dzięki nim `p3studio.eu` przekieruje na
> `https://www.p3studio.eu`. Sprawdź aktualność adresów w dokumentacji GitHub
> Pages, gdyby przestały działać.

### ⚠️ NIE USUWAJ rekordów poczty OVHcloud!
Edytując strefę DNS, **zostaw nietknięte** rekordy obsługujące e-mail
`hello@p3studio.eu`, w szczególności:

- **MX** — kierują pocztę na serwery OVHcloud (np. `mx*.mail.ovh.net`),
- **SPF** — rekord `TXT` zaczynający się od `v=spf1 …` (zwykle `include:mx.ovh.com`),
- **DKIM** — rekord(y) `TXT`/`CNAME` z selektorem (np. `selector1._domainkey`),
- **DMARC** — rekord `TXT` na nazwie `_dmarc` (np. `v=DMARC1; p=…`),
- ewentualny **autoconfig / autodiscover** (CNAME) i **SRV** dla poczty.

Usunięcie któregokolwiek z nich **zepsuje odbieranie/wysyłanie poczty**. Zmieniaj
wyłącznie rekordy `A`/`AAAA` na apexie i `CNAME` dla `www`.

> Jeśli OVHcloud ma na apexie domyślne przekierowanie WWW lub rekord A na własny
> serwer „parkingowy", usuń tylko ten konkretny rekord A i zastąp go adresami
> GitHub powyżej.

---

## 7. Publikacja — komendy Git

Pierwsza publikacja (jeśli repozytorium nie jest jeszcze połączone z GitHubem):

```bash
cd p3studio-website
git add .
git commit -m "P3 Studio: statyczna strona dla GitHub Pages"
# utwórz puste repo na GitHubie, potem:
git branch -M main
git remote add origin https://github.com/pawelpawlow/p3studio-website.git
git push -u origin main
```

Kolejne aktualizacje treści:

```bash
git add .
git commit -m "Aktualizacja treści"
git push
```

GitHub Pages przebuduje stronę automatycznie po każdym `push` na gałąź `main`
(zwykle w ciągu 1–2 minut).

---

## 8. Checklist przed publikacją (go-live)

- [ ] Uzupełnić i sprawdzić **`privacy.html`** (wszystkie pola `[w nawiasach]`), usunąć baner ostrzegawczy.
- [ ] Zweryfikować dane prawne w stopce (NIP, adres).
- [ ] Podmienić portrety / wideo na finalne, jeśli trzeba.
- [ ] Ustawić domenę i DNS (sekcje 5–6), włączyć **Enforce HTTPS**.
- [ ] Sprawdzić podgląd linku (Open Graph) i wynik **Lighthouse**.
- [ ] Potwierdzić, że poczta `hello@p3studio.eu` nadal działa (rekordy MX/SPF/DKIM/DMARC nietknięte).
