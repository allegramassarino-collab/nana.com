# nanà — sito web

Sito multipagina per il brand di gioielli **nanà** (@nanaenjoycolors) — anelli in argento e smalto colorato.

## Struttura

```
index.html         Home
collezione.html     Collezione prodotti con filtri per colore
chi-siamo.html      Storia del brand e valori
contatti.html        WhatsApp, Instagram, FAQ, form di contatto
css/style.css        Tutti gli stili e le animazioni
js/main.js           Interazioni: preloader, cursore custom, reveal on scroll,
                      tilt 3D sulle card, filtri collezione, contatori, accordion FAQ
images/               Cartella per le foto prodotto reali (vedi images/README.md)
```

Nessun framework o build tool: è HTML/CSS/JS puro, funziona aprendo direttamente `index.html`
oppure pubblicando la cartella su qualsiasi hosting statico.

## Come vederlo in locale

Basta aprire `index.html` nel browser. Per un test più fedele (facoltativo, serve solo se vuoi
simulare un vero server), con Python installato:

```bash
python3 -m http.server 8000
```

poi vai su `http://localhost:8000`.

## Pubblicare su GitHub

```bash
git init
git add .
git commit -m "Sito nanà: home, collezione, chi siamo, contatti"
git branch -M main
git remote add origin <URL_DEL_TUO_REPO>
git push -u origin main
```

Da lì puoi attivare **GitHub Pages** (Settings → Pages → Branch: main) per avere il sito online gratis.

## Personalizzare

- **Colori brand**: variabili CSS in cima a `css/style.css` (`--pink`, `--orange`, `--teal`, ecc.).
- **Numero WhatsApp / Instagram**: cerca `393498881684` e `nanaenjoycolors` in tutti i file HTML.
- **Foto prodotto**: vedi `images/README.md`.
- **Testi**: modifica direttamente l'HTML di ogni pagina, sono in italiano semplice, facilmente
  sostituibili.
