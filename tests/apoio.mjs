// Apoio dos testes: lê o resultado do `next build`.
// Se uma versão futura do Next mudar a pasta de saída, só este arquivo muda.
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';

export const RAIZ = path.resolve(import.meta.dirname, '..');
const APP = path.join(RAIZ, '.next', 'server', 'app');

export const SLUGS = [
  'entrega-expressa-de-medicamentos',
  'transporte-de-materiais-biologicos',
  'entregas-rapidas-com-motoboy',
  'transporte-e-logistica-para-e-commerce',
];

export const ROTAS = {
  '/': 'index.html',
  ...Object.fromEntries(SLUGS.map((s) => [`/servicos/${s}/`, `servicos/${s}.html`])),
  '/trabalhe-conosco/': 'trabalhe-conosco.html',
  '/politica-de-privacidade/': 'politica-de-privacidade.html',
};

export const ROTAS_DE_SOLUCAO = SLUGS.map((s) => `/servicos/${s}/`);

export function html(rota) {
  const arquivo = path.join(APP, ROTAS[rota]);
  if (!fs.existsSync(arquivo)) throw new Error(`Página ${rota} não foi gerada (${arquivo}). Rode "npm run build".`);
  return fs.readFileSync(arquivo, 'utf8');
}

export const paginas = () => Object.keys(ROTAS).map((rota) => [rota, html(rota)]);

export const arquivoGerado = (nome) => fs.readFileSync(path.join(APP, `${nome}.body`), 'utf8');

const decodificar = (t) =>
  t
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ');

/** Texto visível: sem scripts, estilos, comentários e marcação. */
export const texto = (h) =>
  decodificar(
    h
      .replace(/<script[\s\S]*?<\/script>/g, ' ')
      .replace(/<style[\s\S]*?<\/style>/g, ' ')
      .replace(/<!--[\s\S]*?-->/g, '')
      .replace(/<[^>]+>/g, ' '),
  )
    .replace(/\s+/g, ' ')
    .trim();

/** Marcação sem os scripts de hidratação, que repetem o conteúdo em texto. */
export const semScripts = (h) => h.replace(/<script[\s\S]*?<\/script>/g, '');

/** Tags de abertura de um elemento, como texto. */
export const tags = (h, nome) => semScripts(h).match(new RegExp(`<${nome}(\\s[^>]*)?>`, 'g')) ?? [];

export const attr = (tag, nome) => {
  // Nomes de atributo em HTML não diferenciam maiúsculas (o React escreve noValidate, autoComplete).
  const m = tag.match(new RegExp(`\\s${nome}="([^"]*)"`, 'i'));
  return m ? decodificar(m[1]) : null;
};

export const temAttr = (tag, nome) => new RegExp(`\\s${nome}(=|\\s|>|/)`, 'i').test(tag);

/** Conteúdo interno de cada ocorrência de um elemento (não lida com o mesmo elemento aninhado). */
export const blocos = (h, nome, filtro = '') =>
  [...semScripts(h).matchAll(new RegExp(`<${nome}(\\s[^>]*)?>([\\s\\S]*?)</${nome}>`, 'g'))]
    .filter((m) => (m[1] ?? '').includes(filtro))
    .map((m) => m[2]);

export const links = (h) =>
  [...semScripts(h).matchAll(/<a(\s[^>]*)?>([\s\S]*?)<\/a>/g)].map((m) => ({
    tag: `<a${m[1] ?? ''}>`,
    href: attr(`<a${m[1] ?? ''}>`, 'href'),
    texto: texto(m[2]),
  }));

export const jsonld = (h) =>
  [...h.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => JSON.parse(m[1]));

export const meta = (h, chave) => {
  const tag = tags(h, 'meta').find((t) => attr(t, 'name') === chave || attr(t, 'property') === chave);
  return tag ? attr(tag, 'content') : null;
};

export const titulo = (h) => decodificar((h.match(/<title>([\s\S]*?)<\/title>/) ?? [])[1] ?? '');

function listar(pasta, extensoes) {
  if (!fs.existsSync(pasta)) return [];
  return fs.readdirSync(pasta, { withFileTypes: true, recursive: true })
    .filter((e) => e.isFile() && extensoes.some((x) => e.name.endsWith(x)))
    .map((e) => path.join(e.parentPath, e.name));
}

/** Todo o CSS gerado pelo build, concatenado. */
export const cssGerado = () =>
  listar(path.join(RAIZ, '.next', 'static'), ['.css']).map((f) => fs.readFileSync(f, 'utf8')).join('\n');

/** Arquivos de código-fonte, com caminho relativo e conteúdo. */
export const fontes = (extensoes) =>
  listar(path.join(RAIZ, 'src'), extensoes).map((f) => ({ arquivo: path.relative(RAIZ, f), conteudo: fs.readFileSync(f, 'utf8') }));

const gzip = (conteudo) => zlib.gzipSync(conteudo).length;

/** Peso comprimido do HTML mais o CSS e o JavaScript que a página carrega na primeira carga. */
export function pesoDaPrimeiraCarga(h) {
  const recursos = new Set();
  for (const t of h.match(/<script[^>]*\ssrc="[^"]+"[^>]*>/g) ?? []) recursos.add(attr(t, 'src'));
  for (const t of h.match(/<link[^>]*>/g) ?? []) if (attr(t, 'rel') === 'stylesheet') recursos.add(attr(t, 'href'));
  let total = gzip(h);
  for (const r of recursos) {
    if (!r || !r.startsWith('/_next/static/')) continue;
    const arquivo = path.join(RAIZ, '.next', 'static', r.replace('/_next/static/', '').split('?')[0]);
    total += gzip(fs.readFileSync(arquivo));
  }
  return total;
}
