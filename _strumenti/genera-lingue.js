// Genera una pagina per lingua da index.html (inglese, la pagina principale):
// / (en), /de/, /es/, /fr/, /it/, collegate fra loro con hreflang per Google.
// Uso: node _strumenti/genera-lingue.js   (dalla cartella del repository)
// La cartella _strumenti non viene pubblicata da GitHub Pages (Jekyll ignora le cartelle con "_").
const fs = require('fs');
const path = require('path');

const SITO = 'https://www.nemeadesign.com';
const ORDINE = ['en', 'de', 'es', 'fr', 'it']; // ordine voluto da Claudio (31/10/2026)

// "Collezione" resta in italiano in tutte le lingue: è la firma del made in Italy.
const KICKER = 'Collezione · WIP<span class="wip" aria-hidden="true"></span>';

const TESTI = {
  en: {
    title: 'Nemea Design — Carbon fiber, any shape you imagine',
    description: 'Carbon fiber, any shape you imagine. From automotive to furniture, from sport to everyday objects. Where style meets technology. Motor Valley, Italy.',
    h1: 'Carbon fiber.<br>Any shape you imagine.',
    lead: 'From automotive to furniture, from sport to everyday objects. Where style meets technology. Motor Valley.',
    footer: 'Nemea Design · Motor Valley, Italy'
  },
  de: {
    title: 'Nemea Design — Carbonfaser, in jeder Form, die Sie sich vorstellen',
    description: 'Carbonfaser, in jeder Form, die Sie sich vorstellen. Von Automotive bis Einrichtung, von Sport bis zu Alltagsobjekten. Wo Stil auf Technologie trifft. Motor Valley, Italien.',
    h1: 'Carbonfaser.<br>Jede Form, die Sie sich vorstellen.',
    lead: 'Von Automotive bis Einrichtung, von Sport bis zu Alltagsobjekten. Wo Stil auf Technologie trifft. Motor Valley.',
    footer: 'Nemea Design · Motor Valley, Italien'
  },
  es: {
    title: 'Nemea Design — Fibra de carbono, cualquier forma que imagines',
    description: 'Fibra de carbono, cualquier forma que imagines. De la automoción al mobiliario, del deporte a los objetos de cada día. Donde el estilo se encuentra con la tecnología. Motor Valley, Italia.',
    h1: 'Fibra de carbono.<br>Cualquier forma que imagines.',
    lead: 'De la automoción al mobiliario, del deporte a los objetos de cada día. Donde el estilo se encuentra con la tecnología. Motor Valley.',
    footer: 'Nemea Design · Motor Valley, Italia'
  },
  fr: {
    title: 'Nemea Design — Fibre de carbone, toutes les formes que vous imaginez',
    description: 'Fibre de carbone, toutes les formes que vous imaginez. De l’automobile au mobilier, du sport aux objets du quotidien. Là où le style rencontre la technologie. Motor Valley, Italie.',
    h1: 'Fibre de carbone.<br>Toutes les formes que vous imaginez.',
    lead: 'De l’automobile au mobilier, du sport aux objets du quotidien. Là où le style rencontre la technologie. Motor Valley.',
    footer: 'Nemea Design · Motor Valley, Italie'
  },
  it: {
    title: 'Nemea Design — Fibra di carbonio, qualunque forma tu immagini',
    description: 'Fibra di carbonio, qualunque forma tu immagini. Dall’automotive all’arredo, dallo sport agli oggetti di ogni giorno. Dove lo stile incontra la tecnologia. Motor Valley, Italia.',
    h1: 'Fibra di carbonio.<br>Qualunque forma tu immagini.',
    lead: 'Dall’automotive all’arredo, dallo sport agli oggetti di ogni giorno. Dove lo stile incontra la tecnologia. Motor Valley.',
    footer: 'Nemea Design · Motor Valley, Italia'
  }
};

const radice = path.join(__dirname, '..');
const modello = fs.readFileSync(path.join(radice, 'index.html'), 'utf8');
const url = (l) => (l === 'en' ? `${SITO}/` : `${SITO}/${l}/`);
const href = (da, a) => (da === 'en' ? (a === 'en' ? './' : `${a}/`) : (a === 'en' ? '../' : `../${a}/`));

function sostituisci(html, re, nuovo) {
  if (!re.test(html)) throw new Error('Non trovato nel modello: ' + re);
  return html.replace(re, nuovo);
}

for (const l of ORDINE) {
  const t = TESTI[l];
  let h = modello;
  h = sostituisci(h, /<html lang="[^"]*">/, `<html lang="${l}">`);
  h = sostituisci(h, /<title>[^<]*<\/title>/, `<title>${t.title}</title>`);
  h = sostituisci(h, /<meta name="description" content="[^"]*">/, `<meta name="description" content="${t.description}">`);
  h = sostituisci(h, /<meta property="og:title" content="[^"]*">/, `<meta property="og:title" content="${t.title}">`);
  h = sostituisci(h, /<meta property="og:description" content="[^"]*">/, `<meta property="og:description" content="${t.description}">`);
  h = sostituisci(h, /<!-- lingue-head -->[\s\S]*?<!-- \/lingue-head -->/,
    '<!-- lingue-head -->\n' +
    `  <link rel="canonical" href="${url(l)}">\n` +
    ORDINE.map((x) => `  <link rel="alternate" hreflang="${x}" href="${url(x)}">`).join('\n') + '\n' +
    `  <link rel="alternate" hreflang="x-default" href="${url('en')}">\n` +
    '  <!-- /lingue-head -->');
  h = sostituisci(h, /<!-- lingue-nav -->[\s\S]*?<!-- \/lingue-nav -->/,
    '<!-- lingue-nav -->\n    <nav class="langs" aria-label="Language">\n' +
    ORDINE.map((x) => `      <a href="${href(l, x)}" hreflang="${x}" lang="${x}"${x === l ? ' aria-current="page"' : ''}>${x.toUpperCase()}</a>`).join('\n') +
    '\n    </nav>\n    <!-- /lingue-nav -->');
  h = sostituisci(h, /<p class="kicker">[\s\S]*?<\/p>/, `<p class="kicker">${KICKER}</p>`);
  h = sostituisci(h, /<h1>[\s\S]*?<\/h1>/, `<h1>${t.h1}</h1>`);
  h = sostituisci(h, /<p class="lead">[\s\S]*?<\/p>/, `<p class="lead">${t.lead}</p>`);
  h = sostituisci(h, /<footer>\s*<span>[^<]*<\/span>/, `<footer>\n      <span>${t.footer}</span>`);
  if (l !== 'en') h = h.replace(/(["'(])img\//g, '$1../img/');

  const cartella = l === 'en' ? radice : path.join(radice, l);
  fs.mkdirSync(cartella, { recursive: true });
  fs.writeFileSync(path.join(cartella, 'index.html'), h);
  console.log('scritto', l === 'en' ? 'index.html' : `${l}/index.html`);
}
