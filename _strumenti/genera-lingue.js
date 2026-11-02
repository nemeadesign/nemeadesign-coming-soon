// Genera una pagina per lingua da index.html (inglese, la pagina principale):
// / (en), /de/, /es/, /fr/, /it/, collegate fra loro con hreflang per Google.
// Uso: node _strumenti/genera-lingue.js   (dalla cartella del repository)
// La cartella _strumenti non viene pubblicata da GitHub Pages (Jekyll ignora le cartelle con "_").
//
// Google: le parole che la gente cerca davvero (alettone, splitter, pre-preg, autoclave…) stanno nel titolo
// della scheda, nella descrizione e nella sezione "cosa facciamo", tutte visibili. Il meta "keywords" Google
// lo ignora, e il testo nascosto lo penalizza: per questo le parole sono scritte sulla pagina.
const fs = require('fs');
const path = require('path');

const SITO = 'https://www.nemeadesign.com';
const ORDINE = ['en', 'de', 'es', 'fr', 'it']; // ordine voluto da Claudio (31/10/2026)

// "Collezione" resta in italiano in tutte le lingue: è la firma del made in Italy.
const KICKER = 'Collezione · WIP<span class="wip" aria-hidden="true"></span>';

const TESTI = {
  en: {
    title: 'Nemea Design — Carbon fiber car parts and components | Motor Valley, Italy',
    description: 'Carbon fiber, any shape you imagine. Spoilers, wings, splitters, side skirts and hoods in pre-preg carbon fiber, laid up in clean room and cured in autoclave in the Motor Valley, Italy. Straight from the maker, no middlemen.',
    ogTitle: 'Nemea Design — Carbon fiber. Any shape you imagine.',
    h1: 'Carbon fiber.<br>Any shape you imagine.',
    lead: 'From automotive to furniture, from sport to everyday objects. Where style meets technology. Motor Valley.',
    cosaKicker: 'What we make',
    cosa: 'Carbon fiber parts for cars and motorcycles: spoilers and wings, front splitters, side skirts, hoods, diffusers, mirror caps and interior trim. And far beyond the car: boats and yachts, bicycles, padel rackets and sports equipment, helmets, drones, furniture and lighting, watches, eyewear and accessories, prototypes and custom industrial parts. We work pre-preg carbon fiber: cut by plotter, laid up in our clean room, cured in autoclave in our own molds. From our clean room to you, with no middlemen: a collector’s piece at the price of a component.',
    pezziTitolo: 'Parts',
    pezzi: ['Spoiler', 'Rear wing', 'Front splitter', 'Side skirts', 'Hood', 'Diffuser', 'Mirror caps', 'Interior trim'],
    lavoroTitolo: 'Process',
    lavoro: ['Pre-preg carbon fiber', '3D scanning', '3D modeling and machining', 'Plotter cutting', 'Clean room', 'Autoclave', 'Molds', 'CFD simulation'],
    footer: 'Nemea Design · Motor Valley, Italy',
    iscrizioneTitolo: 'Something is taking shape.',
    iscrizioneTesto: 'Born in our clean room, straight to you, with no middlemen. Leave your email and watch it take shape, before anyone else.',
    email: 'Your email',
    bottone: 'Count me in',
    interesse: 'Your passion:',
    interessi: ['Porsche 992', 'Tesla', 'Something else'],
    consenso: 'I agree to receive emails from Nemea Design about the Collezione. I can unsubscribe at any time.',
    fatto: 'Almost there: confirm your email and you are in.',
    errEmail: 'Please enter a valid email.',
    errConsenso: 'Please tick the consent box.',
    errInvio: 'Something went wrong. Please try again in a moment.',
    inattivo: 'Sign-ups open in a few days.',
    privacyTitolo: 'Privacy',
    chiudi: 'Close',
    privacy: [
      'Data controller: NEMEA s.r.l., via T. Franchini 14/A, 47822 Santarcangelo di Romagna (RN), Italy, VAT IT04339130405. Workshop and operations: via Venezia 100, 47521 Cesena (FC), Italy.',
      'We use your email, what interests you and the language of the page only to send you news about the Collezione and the opening of the shop. The legal basis is your consent, which you can withdraw at any time with the link at the bottom of every email.',
      'Emails are sent through Klaviyo Inc., which stores the data in the United States under the safeguards required by the GDPR (EU-US Data Privacy Framework and standard contractual clauses). We keep the data for as long as you stay subscribed.',
      'You can ask to access, correct, delete or port your data, or object to its use, by writing to <a href="mailto:info@nemeadesign.com">info@nemeadesign.com</a>. You can also lodge a complaint with a data protection authority, such as the Italian Garante per la protezione dei dati personali.'
    ]
  },
  de: {
    title: 'Nemea Design — Carbonteile und Carbon-Komponenten fürs Auto | Motor Valley, Italien',
    description: 'Carbonfaser, in jeder Form, die Sie sich vorstellen. Spoiler, Heckflügel, Frontsplitter, Seitenschweller und Motorhauben aus Prepreg-Carbon, im Clean Room laminiert und im Autoklaven ausgehärtet, im Motor Valley in Italien. Direkt vom Hersteller, ohne Zwischenhändler.',
    ogTitle: 'Nemea Design — Carbonfaser. Jede Form, die Sie sich vorstellen.',
    h1: 'Carbonfaser.<br>Jede Form, die Sie sich vorstellen.',
    lead: 'Von Automotive bis Einrichtung, von Sport bis zu Alltagsobjekten. Wo Stil auf Technologie trifft. Motor Valley.',
    cosaKicker: 'Was wir fertigen',
    cosa: 'Carbonteile für Autos und Motorräder: Spoiler und Heckflügel, Frontsplitter, Seitenschweller, Motorhauben, Diffusoren, Spiegelkappen und Innenraumverkleidungen. Und weit über das Auto hinaus: Boote und Yachten, Fahrräder, Padelschläger und Sportgeräte, Helme, Drohnen, Möbel und Leuchten, Uhren, Brillen und Accessoires, Prototypen und Industrieteile nach Maß. Wir verarbeiten Prepreg-Carbonfaser: per Plotter zugeschnitten, in unserem Clean Room laminiert, im Autoklaven in eigenen Formen ausgehärtet. Aus unserem Clean Room direkt zu Ihnen, ohne Zwischenhändler: ein Sammlerstück zum Preis eines Bauteils.',
    pezziTitolo: 'Teile',
    pezzi: ['Spoiler', 'Heckflügel', 'Frontsplitter', 'Seitenschweller', 'Motorhaube', 'Diffusor', 'Spiegelkappen', 'Interieur'],
    lavoroTitolo: 'Verfahren',
    lavoro: ['Prepreg-Carbonfaser', '3D-Scan', '3D-Modellierung und -Bearbeitung', 'Plotterzuschnitt', 'Clean Room', 'Autoklav', 'Formen', 'CFD-Simulation'],
    footer: 'Nemea Design · Motor Valley, Italien',
    iscrizioneTitolo: 'Etwas nimmt Gestalt an.',
    iscrizioneTesto: 'Entstanden in unserem Clean Room, direkt zu Ihnen, ohne Zwischenhändler. Hinterlassen Sie Ihre E-Mail und sehen Sie zu, wie es Gestalt annimmt, vor allen anderen.',
    email: 'Ihre E-Mail',
    bottone: 'Ich bin dabei',
    interesse: 'Ihre Leidenschaft:',
    interessi: ['Porsche 992', 'Tesla', 'Etwas anderes'],
    consenso: 'Ich möchte E-Mails von Nemea Design über die Collezione erhalten. Ich kann mich jederzeit abmelden.',
    fatto: 'Fast geschafft: Bestätigen Sie Ihre E-Mail-Adresse, und Sie sind dabei.',
    errEmail: 'Bitte geben Sie eine gültige E-Mail-Adresse ein.',
    errConsenso: 'Bitte bestätigen Sie die Einwilligung.',
    errInvio: 'Etwas ist schiefgelaufen. Bitte versuchen Sie es gleich noch einmal.',
    inattivo: 'Die Anmeldung öffnet in wenigen Tagen.',
    privacyTitolo: 'Datenschutz',
    chiudi: 'Schließen',
    privacy: [
      'Verantwortlicher: NEMEA s.r.l., via T. Franchini 14/A, 47822 Santarcangelo di Romagna (RN), Italien, USt-IdNr. IT04339130405. Betriebsstätte und Werkstatt: via Venezia 100, 47521 Cesena (FC), Italien.',
      'Wir verwenden Ihre E-Mail-Adresse, Ihr Interesse und die Sprache der Seite nur, um Ihnen Neuigkeiten über die Collezione und die Eröffnung des Shops zu senden. Rechtsgrundlage ist Ihre Einwilligung, die Sie jederzeit über den Link am Ende jeder E-Mail widerrufen können.',
      'Die E-Mails werden über Klaviyo Inc. versendet, die die Daten in den USA mit den von der DSGVO vorgesehenen Garantien speichert (EU-US Data Privacy Framework und Standardvertragsklauseln). Wir speichern die Daten, solange Sie angemeldet bleiben.',
      'Sie können Auskunft, Berichtigung, Löschung oder Übertragung Ihrer Daten verlangen oder der Verarbeitung widersprechen: <a href="mailto:info@nemeadesign.com">info@nemeadesign.com</a>. Sie können sich außerdem bei einer Datenschutz-Aufsichtsbehörde beschweren.'
    ]
  },
  es: {
    title: 'Nemea Design — Piezas y componentes de fibra de carbono para coche | Motor Valley, Italia',
    description: 'Fibra de carbono, cualquier forma que imagines. Alerones, spoilers, splitters, taloneras y capós de fibra de carbono pre-preg, laminados en clean room y curados en autoclave en la Motor Valley, Italia. Directo del fabricante, sin intermediarios.',
    ogTitle: 'Nemea Design — Fibra de carbono. Cualquier forma que imagines.',
    h1: 'Fibra de carbono.<br>Cualquier forma que imagines.',
    lead: 'De la automoción al mobiliario, del deporte a los objetos de cada día. Donde el estilo se encuentra con la tecnología. Motor Valley.',
    cosaKicker: 'Lo que hacemos',
    cosa: 'Piezas de fibra de carbono para coches y motos: alerones y spoilers, splitters delanteros, taloneras, capós, difusores, carcasas de retrovisor y molduras interiores. Y mucho más allá del coche: barcos y yates, bicicletas, palas de pádel y material deportivo, cascos, drones, mobiliario e iluminación, relojes, gafas y accesorios, prototipos y piezas industriales a medida. Trabajamos fibra de carbono pre-preg (preimpregnada): cortada con plotter, laminada en nuestra clean room y curada en autoclave en nuestros propios moldes. De nuestra clean room a ti, sin intermediarios: una pieza de colección al precio de un componente.',
    pezziTitolo: 'Piezas',
    pezzi: ['Alerón', 'Spoiler', 'Splitter delantero', 'Taloneras', 'Capó', 'Difusor', 'Carcasas de retrovisor', 'Interior'],
    lavoroTitolo: 'Proceso',
    lavoro: ['Fibra de carbono pre-preg', 'Escaneo 3D', 'Modelado y mecanizado 3D', 'Corte con plotter', 'Clean room', 'Autoclave', 'Moldes', 'Simulación CFD'],
    footer: 'Nemea Design · Motor Valley, Italia',
    iscrizioneTitolo: 'Algo está tomando forma.',
    iscrizioneTesto: 'Nace en nuestra clean room y llega directamente a ti, sin intermediarios. Déjanos tu correo y míralo tomar forma antes que nadie.',
    email: 'Tu correo',
    bottone: 'Quiero estar',
    interesse: 'Tu pasión:',
    interessi: ['Porsche 992', 'Tesla', 'Otra cosa'],
    consenso: 'Acepto recibir correos de Nemea Design sobre la Collezione. Puedo darme de baja cuando quiera.',
    fatto: 'Casi listo: confirma tu correo y estarás dentro.',
    errEmail: 'Escribe un correo válido.',
    errConsenso: 'Marca la casilla de consentimiento.',
    errInvio: 'Algo ha fallado. Inténtalo de nuevo en un momento.',
    inattivo: 'Las inscripciones abren en pocos días.',
    privacyTitolo: 'Privacidad',
    chiudi: 'Cerrar',
    privacy: [
      'Responsable del tratamiento: NEMEA s.r.l., via T. Franchini 14/A, 47822 Santarcangelo di Romagna (RN), Italia, IVA IT04339130405. Sede operativa y taller: via Venezia 100, 47521 Cesena (FC), Italia.',
      'Usamos tu correo, lo que te interesa y el idioma de la página solo para enviarte noticias sobre la Collezione y la apertura de la tienda. La base es tu consentimiento, que puedes retirar cuando quieras con el enlace al final de cada correo.',
      'Los correos se envían con Klaviyo Inc., que guarda los datos en Estados Unidos con las garantías previstas por el RGPD (Marco de Privacidad de Datos UE-EE. UU. y cláusulas contractuales tipo). Conservamos los datos mientras sigas suscrito.',
      'Puedes pedir acceso, rectificación, supresión o portabilidad de tus datos, u oponerte al tratamiento, escribiendo a <a href="mailto:info@nemeadesign.com">info@nemeadesign.com</a>. También puedes presentar una reclamación ante una autoridad de protección de datos.'
    ]
  },
  fr: {
    title: 'Nemea Design — Pièces et composants en fibre de carbone pour auto | Motor Valley, Italie',
    description: 'La fibre de carbone, dans toutes les formes que vous imaginez. Ailerons, spoilers, splitters, bas de caisse et capots en carbone pré-imprégné, drapés en clean room et cuits en autoclave dans la Motor Valley, en Italie. Directement du fabricant, sans intermédiaires.',
    ogTitle: 'Nemea Design — Fibre de carbone. Toutes les formes que vous imaginez.',
    h1: 'Fibre de carbone.<br>Toutes les formes que vous imaginez.',
    lead: 'De l’automobile au mobilier, du sport aux objets du quotidien. Là où le style rencontre la technologie. Motor Valley.',
    cosaKicker: 'Ce que nous fabriquons',
    cosa: 'Pièces en fibre de carbone pour autos et motos : ailerons et spoilers, lames avant (splitters), bas de caisse, capots, diffuseurs, coques de rétroviseurs et garnitures intérieures. Et bien au-delà de l’auto : bateaux et yachts, vélos, raquettes de padel et équipements sportifs, casques, drones, mobilier et luminaires, montres, lunettes et accessoires, prototypes et pièces industrielles sur mesure. Nous travaillons la fibre de carbone pré-imprégnée (pre-preg) : découpée au plotter, drapée dans notre clean room, cuite en autoclave dans nos propres moules. De notre clean room jusqu’à vous, sans intermédiaires : une pièce de collection au prix d’un composant.',
    pezziTitolo: 'Pièces',
    pezzi: ['Aileron', 'Spoiler', 'Splitter avant', 'Bas de caisse', 'Capot', 'Diffuseur', 'Coques de rétroviseurs', 'Intérieur'],
    lavoroTitolo: 'Procédé',
    lavoro: ['Carbone pré-imprégné', 'Numérisation 3D', 'Modélisation et usinage 3D', 'Découpe au plotter', 'Clean room', 'Autoclave', 'Moules', 'Simulation CFD'],
    footer: 'Nemea Design · Motor Valley, Italie',
    iscrizioneTitolo: 'Quelque chose prend forme.',
    iscrizioneTesto: 'Né dans notre clean room, directement chez vous, sans intermédiaires. Laissez votre e-mail et regardez-le prendre forme, avant tout le monde.',
    email: 'Votre e-mail',
    bottone: 'J’en suis',
    interesse: 'Votre passion :',
    interessi: ['Porsche 992', 'Tesla', 'Autre chose'],
    consenso: 'J’accepte de recevoir des e-mails de Nemea Design sur la Collezione. Je peux me désinscrire à tout moment.',
    fatto: 'Presque terminé : confirmez votre e-mail et vous en êtes.',
    errEmail: 'Saisissez une adresse e-mail valide.',
    errConsenso: 'Cochez la case de consentement.',
    errInvio: 'Une erreur est survenue. Réessayez dans un instant.',
    inattivo: 'Les inscriptions ouvrent dans quelques jours.',
    privacyTitolo: 'Confidentialité',
    chiudi: 'Fermer',
    privacy: [
      'Responsable du traitement : NEMEA s.r.l., via T. Franchini 14/A, 47822 Santarcangelo di Romagna (RN), Italie, TVA IT04339130405. Site de production : via Venezia 100, 47521 Cesena (FC), Italie.',
      'Nous utilisons votre e-mail, ce qui vous intéresse et la langue de la page uniquement pour vous envoyer des nouvelles de la Collezione et de l’ouverture de la boutique. La base légale est votre consentement, que vous pouvez retirer à tout moment via le lien en bas de chaque e-mail.',
      'Les e-mails sont envoyés via Klaviyo Inc., qui conserve les données aux États-Unis avec les garanties prévues par le RGPD (cadre de protection des données UE-États-Unis et clauses contractuelles types). Nous conservons les données tant que vous restez inscrit.',
      'Vous pouvez demander l’accès, la rectification, l’effacement ou la portabilité de vos données, ou vous opposer à leur traitement, en écrivant à <a href="mailto:info@nemeadesign.com">info@nemeadesign.com</a>. Vous pouvez aussi introduire une réclamation auprès d’une autorité de protection des données.'
    ]
  },
  it: {
    title: 'Nemea Design — Componenti in fibra di carbonio per auto | Motor Valley',
    description: 'Fibra di carbonio, qualunque forma tu immagini. Alettoni, spoiler, splitter, minigonne e cofani in carbonio pre-preg, laminati in clean room e cotti in autoclave nella Motor Valley. Direttamente da chi li produce, senza intermediari.',
    ogTitle: 'Nemea Design — Fibra di carbonio. Qualunque forma tu immagini.',
    h1: 'Fibra di carbonio.<br>Qualunque forma tu immagini.',
    lead: 'Dall’automotive all’arredo, dallo sport agli oggetti di ogni giorno. Dove lo stile incontra la tecnologia. Motor Valley.',
    cosaKicker: 'Cosa facciamo',
    cosa: 'Componenti in fibra di carbonio per auto e moto: alettoni e spoiler, splitter anteriori, minigonne, cofani, diffusori, calotte degli specchietti e finiture interne. E molto oltre l’auto: nautica e yacht, biciclette, racchette da padel e attrezzature sportive, caschi, droni, arredo e illuminazione, orologi, occhiali e accessori, prototipi e componenti industriali su misura. Lavoriamo fibra di carbonio pre-preg (pre-impregnata): tagliata al plotter, laminata nella nostra clean room, cotta in autoclave nei nostri stampi. Dalla nostra clean room a te, senza intermediari: un oggetto da collezione, al prezzo di un componente.',
    pezziTitolo: 'Componenti',
    pezzi: ['Alettone', 'Spoiler', 'Splitter anteriore', 'Minigonne', 'Cofano', 'Diffusore', 'Calotte specchietti', 'Interni'],
    lavoroTitolo: 'Lavorazione',
    lavoro: ['Carbonio pre-preg', 'Scansione 3D', 'Modellazione e lavorazioni 3D', 'Taglio al plotter', 'Clean room', 'Autoclave', 'Stampi', 'Simulazione CFD'],
    footer: 'Nemea Design · Motor Valley, Italia',
    iscrizioneTitolo: 'Qualcosa sta prendendo forma.',
    iscrizioneTesto: 'Nasce nella nostra clean room e arriva a te, senza intermediari. Lascia la tua email e guardalo prendere forma, prima di tutti.',
    email: 'La tua email',
    bottone: 'Voglio esserci',
    interesse: 'La tua passione:',
    interessi: ['Porsche 992', 'Tesla', 'Altro'],
    consenso: 'Accetto di ricevere email da Nemea Design sulla Collezione. Posso cancellarmi quando voglio.',
    fatto: 'Ci siamo quasi: conferma la tua email e sei dentro.',
    errEmail: 'Scrivi un’email valida.',
    errConsenso: 'Spunta la casella del consenso.',
    errInvio: 'Qualcosa è andato storto. Riprova tra un momento.',
    inattivo: 'Le iscrizioni aprono tra pochi giorni.',
    privacyTitolo: 'Privacy',
    chiudi: 'Chiudi',
    privacy: [
      'Titolare del trattamento: NEMEA s.r.l., via T. Franchini 14/A, 47822 Santarcangelo di Romagna (RN), P.IVA 04339130405. Sede operativa e laboratorio: via Venezia 100, 47521 Cesena (FC).',
      'Usiamo la tua email, cosa ti interessa e la lingua della pagina solo per mandarti notizie sulla Collezione e sull’apertura del negozio. La base è il tuo consenso, che puoi ritirare quando vuoi con il link in fondo a ogni email.',
      'Le email partono da Klaviyo Inc., che conserva i dati negli Stati Uniti con le garanzie previste dal GDPR (Data Privacy Framework UE-USA e clausole contrattuali standard). Teniamo i dati finché resti iscritto.',
      'Puoi chiedere accesso, correzione, cancellazione o portabilità dei tuoi dati, oppure opporti al loro uso, scrivendo a <a href="mailto:info@nemeadesign.com">info@nemeadesign.com</a>. Puoi anche presentare reclamo al Garante per la protezione dei dati personali.'
    ]
  }
};

const radice = path.join(__dirname, '..');
const modello = fs.readFileSync(path.join(radice, 'index.html'), 'utf8');
const url = (l) => (l === 'en' ? `${SITO}/` : `${SITO}/${l}/`);
const href = (da, a) => (da === 'en' ? (a === 'en' ? './' : `${a}/`) : (a === 'en' ? '../' : `../${a}/`));
const lista = (voci) => voci.map((v) => `<li>${v}</li>`).join('');

// Modulo di iscrizione alla Collezione (Klaviyo). I messaggi stanno negli attributi data-* del modulo,
// così lo script nella pagina è uguale per tutte le lingue.
const attr = (x) => x.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
const trattini = (k) => k.replace(/[A-Z]/g, (c) => '-' + c.toLowerCase());

function iscrizione(t) {
  const valori = ['porsche-992', 'tesla', 'altro'];
  const messaggi = ['fatto', 'errEmail', 'errConsenso', 'errInvio', 'inattivo'].map((k) => ` data-${trattini(k)}="${attr(t[k])}"`).join('');
  return '<!-- iscrizione -->\n' +
    '      <section class="iscrizione" aria-labelledby="titolo-collezione">\n' +
    `        <h2 id="titolo-collezione">${t.iscrizioneTitolo}</h2>\n` +
    `        <p class="iscrizione-testo">${t.iscrizioneTesto}</p>\n` +
    `        <form id="modulo-collezione" novalidate${messaggi}>\n` +
    '          <div class="riga-email">\n' +
    `            <input type="email" name="email" autocomplete="email" required placeholder="${attr(t.email)}" aria-label="${attr(t.email)}">\n` +
    `            <button class="bottone" type="submit">${t.bottone}</button>\n` +
    '          </div>\n' +
    '          <fieldset class="interessi">\n' +
    `            <legend>${t.interesse}</legend>\n` +
    t.interessi.map((n, i) => `            <label><input type="radio" name="interesse" value="${valori[i]}"><span>${n}</span></label>`).join('\n') + '\n' +
    '          </fieldset>\n' +
    `          <label class="consenso"><input type="checkbox" name="consenso" required><span>${t.consenso} <button type="button" class="link" data-privacy>${t.privacyTitolo}</button></span></label>\n` +
    '        </form>\n' +
    '        <p id="messaggio-collezione" class="messaggio" role="status" hidden></p>\n' +
    '      </section>\n' +
    '      <!-- /iscrizione -->';
}

// Informativa privacy in una finestra: titolare NEMEA s.r.l. finché non è costituita NEMEA Design (02/11/2026).
function finestraPrivacy(t) {
  return '<!-- privacy -->\n' +
    '  <dialog id="privacy" aria-labelledby="titolo-privacy">\n' +
    `    <h2 id="titolo-privacy">${t.privacyTitolo}</h2>\n` +
    t.privacy.map((p) => `    <p>${p}</p>`).join('\n') + '\n' +
    `    <form method="dialog"><button class="bottone">${t.chiudi}</button></form>\n` +
    '  </dialog>\n' +
    '  <!-- /privacy -->';
}

function sostituisci(html, re, nuovo) {
  if (!re.test(html)) throw new Error('Non trovato nel modello: ' + re);
  return html.replace(re, () => nuovo);
}

for (const l of ORDINE) {
  const t = TESTI[l];
  // Dati strutturati per Google: chi siamo e di cosa ci occupiamo.
  const datiStrutturati = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Nemea Design',
    url: url(l),
    logo: `${SITO}/img/nemea-design-logo.png`,
    description: t.description,
    address: { '@type': 'PostalAddress', addressRegion: 'Emilia-Romagna', addressCountry: 'IT' },
    knowsAbout: [...t.pezzi, ...t.lavoro, 'Carbon fiber']
  };
  let h = modello;
  h = sostituisci(h, /<html lang="[^"]*">/, `<html lang="${l}">`);
  h = sostituisci(h, /<title>[^<]*<\/title>/, `<title>${t.title}</title>`);
  h = sostituisci(h, /<meta name="description" content="[^"]*">/, `<meta name="description" content="${t.description}">`);
  h = sostituisci(h, /<meta property="og:title" content="[^"]*">/, `<meta property="og:title" content="${t.ogTitle}">`);
  h = sostituisci(h, /<meta property="og:description" content="[^"]*">/, `<meta property="og:description" content="${t.description}">`);
  h = sostituisci(h, /<!-- lingue-head -->[\s\S]*?<!-- \/lingue-head -->/,
    '<!-- lingue-head -->\n' +
    `  <link rel="canonical" href="${url(l)}">\n` +
    ORDINE.map((x) => `  <link rel="alternate" hreflang="${x}" href="${url(x)}">`).join('\n') + '\n' +
    `  <link rel="alternate" hreflang="x-default" href="${url('en')}">\n` +
    `  <script type="application/ld+json">${JSON.stringify(datiStrutturati)}</script>\n` +
    '  <!-- /lingue-head -->');
  h = sostituisci(h, /<!-- lingue-nav -->[\s\S]*?<!-- \/lingue-nav -->/,
    '<!-- lingue-nav -->\n    <nav class="langs" aria-label="Language">\n' +
    ORDINE.map((x) => `      <a href="${href(l, x)}" hreflang="${x}" lang="${x}"${x === l ? ' aria-current="page"' : ''}>${x.toUpperCase()}</a>`).join('\n') +
    '\n    </nav>\n    <!-- /lingue-nav -->');
  h = sostituisci(h, /<p class="kicker">[\s\S]*?<\/p>/, `<p class="kicker">${KICKER}</p>`);
  h = sostituisci(h, /<h1>[\s\S]*?<\/h1>/, `<h1>${t.h1}</h1>`);
  h = sostituisci(h, /<p class="lead">[\s\S]*?<\/p>/, `<p class="lead">${t.lead}</p>`);
  h = sostituisci(h, /<!-- cosa-facciamo -->[\s\S]*?<!-- \/cosa-facciamo -->/,
    '<!-- cosa-facciamo -->\n' +
    '  <section class="cosa">\n' +
    `    <h2 class="kicker">${t.cosaKicker}</h2>\n` +
    `    <p class="cosa-testo">${t.cosa}</p>\n` +
    '    <div class="cosa-liste">\n' +
    `      <div><h3>${t.pezziTitolo}</h3><ul>${lista(t.pezzi)}</ul></div>\n` +
    `      <div><h3>${t.lavoroTitolo}</h3><ul>${lista(t.lavoro)}</ul></div>\n` +
    '    </div>\n' +
    '  </section>\n' +
    '  <!-- /cosa-facciamo -->');
  h = sostituisci(h, /<footer>\s*<span>[^<]*<\/span>/, `<footer>\n      <span>${t.footer}</span>`);
  h = sostituisci(h, /<!-- iscrizione -->[\s\S]*?<!-- \/iscrizione -->/, iscrizione(t));
  h = sostituisci(h, /<!-- privacy -->[\s\S]*?<!-- \/privacy -->/, finestraPrivacy(t));
  h = sostituisci(h, /<footer>[\s\S]*?<\/footer>/,
    `<footer>\n      <span>${t.footer}</span>\n      <button type="button" class="link" data-privacy>${t.privacyTitolo}</button>\n    </footer>`);
  if (l !== 'en') h = h.replace(/(["'(])img\//g, '$1../img/');

  const cartella = l === 'en' ? radice : path.join(radice, l);
  fs.mkdirSync(cartella, { recursive: true });
  fs.writeFileSync(path.join(cartella, 'index.html'), h);
  console.log('scritto', l === 'en' ? 'index.html' : `${l}/index.html`);
}

// Mappa del sito per Google, con le 5 lingue collegate.
const alternate = ORDINE.map((x) => `    <xhtml:link rel="alternate" hreflang="${x}" href="${url(x)}"/>`).join('\n');
fs.writeFileSync(path.join(radice, 'sitemap.xml'),
  '<?xml version="1.0" encoding="UTF-8"?>\n' +
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n' +
  ORDINE.map((l) => `  <url>\n    <loc>${url(l)}</loc>\n${alternate}\n  </url>`).join('\n') +
  '\n</urlset>\n');
console.log('scritto sitemap.xml');
