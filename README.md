# nemeadesign.com — pagina "coming soon"

Pagina statica provvisoria per `www.nemeadesign.com`, finché il negozio Shopify non va online.
Pubblicata con GitHub Pages dal ramo `main`.

## Lingue

Una pagina per lingua, ognuna col suo indirizzo, collegate con `hreflang` perché Google le indicizzi una per una:
`/` inglese (apertura), poi `/de/`, `/es/`, `/fr/`, `/it/`, in quest'ordine (Claudio, 31/10/2026).

- Struttura e stile si cambiano **solo** in `index.html` (inglese). I testi di tutte le lingue stanno in
  `_strumenti/genera-lingue.js`. Dopo ogni modifica: `node _strumenti/genera-lingue.js`, che riscrive le 5 pagine.
- "Collezione" resta in italiano in tutte le lingue: è il nome della collezione e la firma del made in Italy.

## Iscrizione alla Collezione (Klaviyo)

Sotto il titolo c'è il modulo "Segui la Collezione": email, cosa interessa (Porsche 992, Tesla, Altro) e consenso.
Manda il contatto a Klaviyo con l'API client, che usa solo la chiave pubblica del sito.

- In `index.html`, in cima allo script: `KLAVIYO.listId` = ID della lista "Collezione" in Klaviyo, con doppio consenso attivo.
  Finché è vuoto il modulo non salva niente e dice che le iscrizioni aprono a breve.
- Proprietà salvate sul profilo: `collezione_interesse` (`porsche-992`, `tesla`, `altro`, `non indicato`),
  `collezione_lingua`, `collezione_iscritto_il`.
- Per provare senza inviare nulla: `?demo=1`.
- Testi del modulo e dell'informativa privacy, nelle 5 lingue, in `_strumenti/genera-lingue.js`.
  Titolare del trattamento: NEMEA s.r.l. finché non è costituita NEMEA Design (decisione del 02/11/2026).

- Colori e logo: brand identity Nemea (NemeaOS, `progetti/brand-identity/`).
- Font: Urbanist (Google Fonts) al posto di Gilroy, finché non è confermata la licenza web di Gilroy.
  Gilroy non va mai messo in questo repository: è pubblico.
- Quando il dominio sarà collegato: aggiungere il file `CNAME` con `www.nemeadesign.com`
  e i record DNS di GitHub Pages. Al lancio del negozio il dominio passa a Shopify e questo repository si archivia.
