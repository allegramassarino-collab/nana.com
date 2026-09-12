# Immagini

- `logo-nana.jpg` — logo ufficiale del brand (usato in header, footer e preloader di tutte le pagine).
- `prodotti-stack.jpg` — foto reale degli anelli impilati (usata nella hero della home, nella pagina Collezione e in Chi siamo).

Le singole card prodotto (in `collezione.html` e `index.html`) usano ancora un'icona SVG di un anello
su sfondo colorato, perché non abbiamo una foto separata per ogni colore. Per sostituirle con foto vere:

1. Copia qui le foto, es. `images/anello-fucsia.jpg`.
2. In `collezione.html` e `index.html`, dentro ogni `<div class="card-swatch ...">`, sostituisci il tag `<svg>...</svg>` con `<img src="images/anello-fucsia.jpg" alt="Anello fucsia">`.
3. Consiglio: foto quadrate, almeno 800x800px, sfondo chiaro o neutro per uniformità.
