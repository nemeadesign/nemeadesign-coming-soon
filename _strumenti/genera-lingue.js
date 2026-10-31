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
    description: 'Carbon fiber, any shape you imagine. Spoilers, wings, splitters, side skirts and hoods in pre-preg carbon fiber, laid up in clean room and cured in autoclave in the Motor Valley, Italy. Online shop coming soon.',
    ogTitle: 'Nemea Design — Carbon fiber. Any shape you imagine.',
    h1: 'Carbon fiber.<br>Any shape you imagine.',
    lead: 'From automotive to furniture, from sport to everyday objects. Where style meets technology. Motor Valley.',
    cosaKicker: 'What we make',
    cosa: 'Carbon fiber parts for cars and motorcycles: spoilers and wings, front splitters, side skirts, hoods, diffusers, mirror caps and interior trim. And custom carbon parts for furniture, sport and design objects. We work pre-preg carbon fiber: cut by plotter, laid up in our clean room, cured in autoclave in our own molds. Our online shop opens soon.',
    pezziTitolo: 'Parts',
    pezzi: ['Spoiler', 'Rear wing', 'Front splitter', 'Side skirts', 'Hood', 'Diffuser', 'Mirror caps', 'Interior trim'],
    lavoroTitolo: 'Process',
    lavoro: ['Pre-preg carbon fiber', 'Plotter cutting', 'Clean room', 'Autoclave', 'Molds', 'CFD simulation'],
    footer: 'Nemea Design · Motor Valley, Italy'
  },
  de: {
    title: 'Nemea Design — Carbonteile und Carbon-Komponenten fürs Auto | Motor Valley, Italien',
    description: 'Carbonfaser, in jeder Form, die Sie sich vorstellen. Spoiler, Heckflügel, Frontsplitter, Seitenschweller und Motorhauben aus Prepreg-Carbon, im Reinraum laminiert und im Autoklaven ausgehärtet, im Motor Valley in Italien. Online-Shop in Kürze.',
    ogTitle: 'Nemea Design — Carbonfaser. Jede Form, die Sie sich vorstellen.',
    h1: 'Carbonfaser.<br>Jede Form, die Sie sich vorstellen.',
    lead: 'Von Automotive bis Einrichtung, von Sport bis zu Alltagsobjekten. Wo Stil auf Technologie trifft. Motor Valley.',
    cosaKicker: 'Was wir fertigen',
    cosa: 'Carbonteile für Autos und Motorräder: Spoiler und Heckflügel, Frontsplitter, Seitenschweller, Motorhauben, Diffusoren, Spiegelkappen und Innenraumverkleidungen. Dazu Carbonteile nach Maß für Einrichtung, Sport und Designobjekte. Wir verarbeiten Prepreg-Carbonfaser: per Plotter zugeschnitten, in unserem Reinraum laminiert, im Autoklaven in eigenen Formen ausgehärtet. Unser Online-Shop öffnet in Kürze.',
    pezziTitolo: 'Teile',
    pezzi: ['Spoiler', 'Heckflügel', 'Frontsplitter', 'Seitenschweller', 'Motorhaube', 'Diffusor', 'Spiegelkappen', 'Interieur'],
    lavoroTitolo: 'Verfahren',
    lavoro: ['Prepreg-Carbonfaser', 'Plotterzuschnitt', 'Reinraum', 'Autoklav', 'Formen', 'CFD-Simulation'],
    footer: 'Nemea Design · Motor Valley, Italien'
  },
  es: {
    title: 'Nemea Design — Piezas y componentes de fibra de carbono para coche | Motor Valley, Italia',
    description: 'Fibra de carbono, cualquier forma que imagines. Alerones, spoilers, splitters, taloneras y capós de fibra de carbono pre-preg, laminados en sala limpia y curados en autoclave en la Motor Valley, Italia. Tienda online muy pronto.',
    ogTitle: 'Nemea Design — Fibra de carbono. Cualquier forma que imagines.',
    h1: 'Fibra de carbono.<br>Cualquier forma que imagines.',
    lead: 'De la automoción al mobiliario, del deporte a los objetos de cada día. Donde el estilo se encuentra con la tecnología. Motor Valley.',
    cosaKicker: 'Lo que hacemos',
    cosa: 'Piezas de fibra de carbono para coches y motos: alerones y spoilers, splitters delanteros, taloneras, capós, difusores, carcasas de retrovisor y molduras interiores. Y piezas de carbono a medida para mobiliario, deporte y objetos de diseño. Trabajamos fibra de carbono pre-preg (preimpregnada): cortada con plotter, laminada en nuestra sala limpia y curada en autoclave en nuestros propios moldes. Nuestra tienda online abre muy pronto.',
    pezziTitolo: 'Piezas',
    pezzi: ['Alerón', 'Spoiler', 'Splitter delantero', 'Taloneras', 'Capó', 'Difusor', 'Carcasas de retrovisor', 'Interior'],
    lavoroTitolo: 'Proceso',
    lavoro: ['Fibra de carbono pre-preg', 'Corte con plotter', 'Sala limpia', 'Autoclave', 'Moldes', 'Simulación CFD'],
    footer: 'Nemea Design · Motor Valley, Italia'
  },
  fr: {
    title: 'Nemea Design — Pièces et composants en fibre de carbone pour auto | Motor Valley, Italie',
    description: 'La fibre de carbone, dans toutes les formes que vous imaginez. Ailerons, spoilers, splitters, bas de caisse et capots en carbone pré-imprégné, drapés en salle blanche et cuits en autoclave dans la Motor Valley, en Italie. Boutique en ligne bientôt.',
    ogTitle: 'Nemea Design — Fibre de carbone. Toutes les formes que vous imaginez.',
    h1: 'Fibre de carbone.<br>Toutes les formes que vous imaginez.',
    lead: 'De l’automobile au mobilier, du sport aux objets du quotidien. Là où le style rencontre la technologie. Motor Valley.',
    cosaKicker: 'Ce que nous fabriquons',
    cosa: 'Pièces en fibre de carbone pour autos et motos : ailerons et spoilers, lames avant (splitters), bas de caisse, capots, diffuseurs, coques de rétroviseurs et garnitures intérieures. Et des pièces en carbone sur mesure pour le mobilier, le sport et les objets design. Nous travaillons la fibre de carbone pré-imprégnée (pre-preg) : découpée au plotter, drapée dans notre salle blanche, cuite en autoclave dans nos propres moules. Notre boutique en ligne ouvre bientôt.',
    pezziTitolo: 'Pièces',
    pezzi: ['Aileron', 'Spoiler', 'Splitter avant', 'Bas de caisse', 'Capot', 'Diffuseur', 'Coques de rétroviseurs', 'Intérieur'],
    lavoroTitolo: 'Procédé',
    lavoro: ['Carbone pré-imprégné', 'Découpe au plotter', 'Salle blanche', 'Autoclave', 'Moules', 'Simulation CFD'],
    footer: 'Nemea Design · Motor Valley, Italie'
  },
  it: {
    title: 'Nemea Design — Componenti in fibra di carbonio per auto | Motor Valley',
    description: 'Fibra di carbonio, qualunque forma tu immagini. Alettoni, spoiler, splitter, minigonne e cofani in carbonio pre-preg, laminati in clean room e cotti in autoclave nella Motor Valley. Negozio online in arrivo.',
    ogTitle: 'Nemea Design — Fibra di carbonio. Qualunque forma tu immagini.',
    h1: 'Fibra di carbonio.<br>Qualunque forma tu immagini.',
    lead: 'Dall’automotive all’arredo, dallo sport agli oggetti di ogni giorno. Dove lo stile incontra la tecnologia. Motor Valley.',
    cosaKicker: 'Cosa facciamo',
    cosa: 'Componenti in fibra di carbonio per auto e moto: alettoni e spoiler, splitter anteriori, minigonne, cofani, diffusori, calotte degli specchietti e finiture interne. E pezzi in carbonio su misura per arredo, sport e oggetti di design. Lavoriamo fibra di carbonio pre-preg (pre-impregnata): tagliata al plotter, laminata nella nostra clean room, cotta in autoclave nei nostri stampi. Il nostro negozio online apre a breve.',
    pezziTitolo: 'Componenti',
    pezzi: ['Alettone', 'Spoiler', 'Splitter anteriore', 'Minigonne', 'Cofano', 'Diffusore', 'Calotte specchietti', 'Interni'],
    lavoroTitolo: 'Lavorazione',
    lavoro: ['Carbonio pre-preg', 'Taglio al plotter', 'Clean room', 'Autoclave', 'Stampi', 'Simulazione CFD'],
    footer: 'Nemea Design · Motor Valley, Italia'
  }
};

const radice = path.join(__dirname, '..');
const modello = fs.readFileSync(path.join(radice, 'index.html'), 'utf8');
const url = (l) => (l === 'en' ? `${SITO}/` : `${SITO}/${l}/`);
const href = (da, a) => (da === 'en' ? (a === 'en' ? './' : `${a}/`) : (a === 'en' ? '../' : `../${a}/`));
const lista = (voci) => voci.map((v) => `<li>${v}</li>`).join('');

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
