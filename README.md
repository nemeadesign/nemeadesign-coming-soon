# nemeadesign.com — pagina "coming soon"

Pagina statica provvisoria per `www.nemeadesign.com`, finché il negozio Shopify non va online.
Pubblicata con GitHub Pages dal ramo `main`.

Versione attuale: **Edition 001 statica** (per la 911 992.2). Raccoglie le richieste d'invito, senza pagamenti.
Lingue: inglese, tedesco, spagnolo, francese, italiano (`?lang=de` ecc.; altrimenti la lingua del browser).

- Colori e logo: brand identity Nemea (NemeaOS, `progetti/brand-identity/`). Il leone della medaglia è ritagliato
  da `img/nemea-logo.png` con una maschera CSS; la trama del carbonio è disegnata in CSS.
- Font: Urbanist (Google Fonts) al posto di Gilroy, finché non è confermata la licenza web di Gilroy.
  Gilroy non va mai messo in questo repository: è pubblico.
- Quando il dominio sarà collegato: aggiungere il file `CNAME` con `www.nemeadesign.com`
  e i record DNS di GitHub Pages. Al lancio del negozio il dominio passa a Shopify e questo repository si archivia.

## Modulo (Klaviyo)

Il modulo manda i contatti a Klaviyo con l'API client, che usa solo la chiave pubblica del sito.
In `index.html`, in cima allo script, compilare `KLAVIYO.companyId` (chiave pubblica, 6 caratteri) e
`KLAVIYO.listId` (ID della lista "Edition 001", con doppio consenso attivo).
Finché sono vuoti il modulo non salva niente e chiede di scrivere a info@nemeafactory.com.
Per provare il percorso in locale senza inviare nulla: `?demo=1`.

Proprietà salvate sul profilo: `edition001_car`, `edition001_interest`, `edition001_country`, `edition001_language`,
`edition001_requested_at` e, se il cliente risponde, le 4 domande di prezzo (`edition001_vw_*`, metodo Van Westendorp)
con `edition001_price_currency`.

## Prima di pubblicare

- Titolare del trattamento nella finestra Privacy (oggi segnaposto `[ragione sociale, sede e P.IVA da completare]`).
- Chiavi Klaviyo compilate e un invio di prova controllato in Klaviyo.

## Immagini

- `img/medaglia-carbonio.jpg`: sfondo della medaglia. Foto di Thomas De Giorgio su Unsplash
  (https://unsplash.com/photos/lLk1IjQLoH4), licenza Unsplash (uso commerciale libero, citazione non obbligatoria),
  ritagliata e desaturata. Da sostituire con una foto di un pannello Nemea 2x2 twill 200 g quando c'è.
- `img/nemea-leone.png`: il leone del logo intero (rombo compreso), estratto da `img/nemea-logo.png` senza la scritta.
  Sulla medaglia è usato come maschera e colorato in oro.
