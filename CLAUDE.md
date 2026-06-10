# P3 Studio — wskazówki dla Claude Code

Statyczna strona-wizytówka (https://www.p3studio.eu). Czysty HTML + CSS + vanilla JS —
**bez frameworków, bez kroku budowania, bez Node, bez cookies/trackingu**. Nie dodawaj
zależności ani build stepów.

## Treść i języki

- Treść **PL** jest wpisana na sztywno w `index.html` — edytuj ją tam.
- Treść **EN** to mapa `EN` na górze `script.js`; klucze odpowiadają atrybutom
  `data-i18n` w HTML. Trzy wyróżnione nagłówki mają osobną mapę `RICH_PL`.
- Tekst podmieniany jest przez `textContent` (nigdy `innerHTML`) — zachowaj to.

## Publikacja (GitHub Pages)

- Deploy: legacy GitHub Pages z gałęzi `main`, katalog `/` (push = publikacja).
- **Każdy plik w repo jest publicznie serwowany**, chyba że jest wykluczony w
  `_config.yml` (`exclude:`). Pliki wewnętrzne (CLAUDE.md, README.md,
  PROJECT-BRIEF.md, `design/`) są tam wykluczone — nowe pliki robocze dopisuj
  do tej listy. Nie przywracaj `.nojekyll` — wyłączyłoby to wykluczenia.
- `CNAME`, `robots.txt`, `sitemap.xml` muszą zostać w korzeniu.

## Portrety (pipeline obrazków)

Źródła leżą w `design/reference/` (aktualne: `portrait-light-v2.png`,
`portrait-dark-v2.png`, 1122×1402, ~4:5). Strona używa 6 plików pochodnych w
`assets/images/`: WebP 561w + 1122w (srcset) i JPEG 1122w (fallback), osobno
dla motywu jasnego/ciemnego. Po podmianie źródła wygeneruj je przez ffmpeg
(ImageMagick/cwebp nie są zainstalowane):

```bash
for theme in light dark; do
  src="design/reference/portrait-$theme-v2.png"   # dopasuj nazwę źródła
  ffmpeg -y -i "$src" -c:v libwebp -quality 82 -compression_level 6 "assets/images/portrait-$theme-1122.webp"
  ffmpeg -y -i "$src" -vf "scale=561:701:flags=lanczos" -c:v libwebp -quality 82 -compression_level 6 "assets/images/portrait-$theme-561.webp"
  ffmpeg -y -i "$src" -c:v mjpeg -q:v 3 -pix_fmt yuvj420p "assets/images/portrait-$theme.jpg"
done
```

Wymiary (`width`/`height` w `index.html`) muszą zgadzać się ze źródłem, inaczej
layout skacze. Oba motywy są w DOM jednocześnie i cross-fade'ują się przez CSS
(`html[data-theme]`).

## Różne

- `design/` to materiały źródłowe z prototypu (React) — strona ich nie używa.
- Pliki `*:Zone.Identifier` to śmieci z WSL/Windows — ignorowane w `.gitignore`,
  można usuwać.
- `ovh-dns-zone.txt` (eksport strefy DNS) ma pozostać poza repo (`.gitignore`).
