# Immagini

- `logo-nana.jpg` — logo ufficiale del brand (header, footer, preloader di tutte le pagine).
- `prodotti-stack.jpg` — foto reale degli anelli impilati (hero home, banner collezione, chi siamo).
- `anello-arancio.jpg`, `anello-rosso.jpg`, `anello-turchese.jpg`, `anello-verde.jpg` — foto reali usate nelle card prodotto di Arancio (Mandarino), Rosso (Ciliegia), Turchese e Verde (Lime), in home e collezione.

Le card di **Fucsia**, **Blu**, **Lilla** e il "Doppio Anello Fucsia & Nero" usano ancora un'icona SVG
su sfondo colorato, perché non abbiamo ancora una foto reale per questi colori. Per sostituirle:

1. Copia qui la foto, es. `images/anello-fucsia.jpg`.
2. In `collezione.html` e `index.html`, dentro il relativo `<div class="card-swatch ...">`, sostituisci il tag `<svg>...</svg>` con `<img src="images/anello-fucsia.jpg" alt="Anello Fucsia">`.
3. Consiglio: foto quadrate o verticali, sfondo chiaro/neutro per uniformità con le altre.
