import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { test } from 'node:test';
import { RAIZ, attr, blocos, cssGerado, fontes, links, paginas, semScripts, tags, temAttr } from './apoio.mjs';

const css = cssGerado();

// US-011: teclado e leitor de tela

test('@spec:AC-033 a estrutura da página é anunciada corretamente', () => {
  for (const [rota, h] of paginas()) {
    for (const marco of ['header', 'nav', 'main', 'footer']) assert.ok(tags(h, marco).length >= 1, `${rota}: <${marco}>`);
    const corpo = h.slice(h.indexOf('<body'));
    const primeiroLink = links(corpo)[0];
    assert.equal(primeiroLink.texto, 'Pular para o conteúdo', `${rota}: primeiro link da página`);
    assert.ok(h.includes(`id="${primeiroLink.href.slice(1)}"`), `${rota}: destino do link existe`);
    const niveis = [...semScripts(h).matchAll(/<h([1-6])[\s>]/g)].map((m) => Number(m[1]));
    assert.equal(niveis.filter((n) => n === 1).length, 1, `${rota}: um único h1`);
    assert.equal(niveis[0], 1, `${rota}: o primeiro título é o h1`);
    niveis.forEach((n, i) => {
      if (i > 0) assert.ok(n - niveis[i - 1] <= 1, `${rota}: títulos sem saltar nível (h${niveis[i - 1]} seguido de h${n})`);
    });
  }
});

test('@spec:AC-034 toda imagem informativa tem descrição', () => {
  for (const [rota, h] of paginas()) {
    for (const img of tags(h, 'img')) assert.ok(attr(img, 'alt') !== null, `${rota}: imagem com alt: ${img.slice(0, 80)}`);
    for (const el of [...tags(h, 'div'), ...tags(h, 'span')].filter((t) => attr(t, 'role') === 'img')) {
      assert.ok((attr(el, 'aria-label') ?? '').length > 5, `${rota}: substituto de imagem com descrição`);
    }
    for (const svg of tags(h, 'svg')) assert.equal(attr(svg, 'aria-hidden'), 'true', `${rota}: ícone decorativo escondido do leitor`);
  }
});

test('@spec:AC-035 o foco do teclado é sempre visível', () => {
  assert.match(css, /:focus-visible\{[^}]*outline:[^;}]*solid/, 'contorno de foco definido');
  for (const { arquivo, conteudo } of fontes(['.css'])) {
    assert.doesNotMatch(conteudo, /outline:\s*(none|0)\b/, `${arquivo}: nunca remove o contorno de foco`);
  }
});

// US-012: marca

test('@spec:AC-036 cores e fontes vêm de um único lugar', () => {
  const COR = /#[0-9a-fA-F]{3,8}\b|\brgba?\(|\bhsla?\(/;
  for (const { arquivo, conteudo } of fontes(['.css', '.tsx', '.ts'])) {
    if (arquivo.endsWith('tokens.css')) continue;
    const semComentarios = conteudo.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');
    const achado = semComentarios.match(COR);
    assert.equal(achado, null, `${arquivo}: cor escrita fora de tokens.css (${achado?.[0]})`);
  }
  const tokens = fs.readFileSync(path.join(RAIZ, 'src/styles/tokens.css'), 'utf8');
  for (const cor of ['#f3570b', '#47a81b', '#0e7bd6']) assert.ok(tokens.includes(cor), `cor da marca ${cor} nos tokens`);
  assert.match(css, /Geologica/, 'fonte primária da marca');
  assert.match(css, /Poppins/, 'fonte secundária da marca');
});

test('@spec:AC-037 o logotipo oficial aparece no cabeçalho e no rodapé', () => {
  for (const [rota, h] of paginas()) {
    const cabecalho = blocos(h, 'header')[0];
    const linkDoLogo = [...cabecalho.matchAll(/<a(\s[^>]*)?>([\s\S]*?)<\/a>/g)].find((m) => m[2].includes('<img'));
    assert.ok(linkDoLogo, `${rota}: logotipo no cabeçalho é um link`);
    assert.equal(attr(`<a${linkDoLogo[1]}>`, 'href'), '/', `${rota}: logotipo leva ao início`);
    assert.equal(attr(tags(linkDoLogo[2], 'img')[0], 'alt'), 'Connect Express Log');
    const logoDoRodape = tags(blocos(h, 'footer')[0], 'img')[0];
    assert.equal(logoDoRodape && attr(logoDoRodape, 'alt'), 'Connect Express Log', `${rota}: logotipo no rodapé`);
  }
});

// US-013: publicar antes das imagens finais

test('@spec:AC-038 cada espaço de imagem tem nome, proporção e substituto', async () => {
  const { imagens } = await import('../src/data/imagens.ts');
  const ids = new Set(imagens.map((i) => i.id));
  let espacos = 0;
  for (const [rota, h] of paginas()) {
    for (const el of [...tags(h, 'div'), ...tags(h, 'img')].filter((t) => temAttr(t, 'data-espaco'))) {
      espacos += 1;
      assert.ok(ids.has(attr(el, 'data-espaco')), `${rota}: espaço "${attr(el, 'data-espaco')}" está no manifesto`);
    }
    for (const img of tags(h, 'img')) assert.ok((attr(img, 'src') ?? '').length > 0, `${rota}: nenhuma imagem sem arquivo`);
  }
  assert.ok(espacos >= ids.size, `espaços de imagem preenchidos nas páginas (achei ${espacos})`);
  const usados = new Set(paginas().flatMap(([, h]) => [...h.matchAll(/data-espaco="([^"]+)"/g)].map((m) => m[1])));
  for (const id of ids) assert.ok(usados.has(id), `espaço "${id}" do manifesto aparece em alguma página`);
  for (const i of imagens) {
    assert.ok(i.largura > 0 && i.altura > 0 && i.alt.length > 5 && i.pedido.length > 10, `${i.id}: proporção, descrição e pedido de foto`);
  }
});

test('@spec:AC-039 trocar uma imagem é trocar um arquivo', async () => {
  const { imagens } = await import('../src/data/imagens.ts');
  assert.equal(new Set(imagens.map((i) => i.arquivo)).size, imagens.length, 'um arquivo por espaço');
  const componente = fs.readFileSync(path.join(RAIZ, 'src/components/Imagem/Imagem.tsx'), 'utf8');
  assert.match(componente, /existsSync/, 'o componente confere se o arquivo final existe');
  assert.match(componente, /`\/imagens\/\$\{imagem\.arquivo\}`/, 'e usa o arquivo com o nome do manifesto');
  for (const { arquivo, conteudo } of fontes(['.tsx'])) {
    if (arquivo.endsWith('Imagem.tsx')) continue;
    assert.doesNotMatch(conteudo, /['"`]\/imagens\//, `${arquivo}: páginas não apontam para arquivos de imagem, só para o id do manifesto`);
  }
  // Com o arquivo presente, a página usa a foto; ausente, usa o substituto.
  const pasta = path.join(RAIZ, 'public/imagens');
  for (const [rota, h] of paginas()) {
    for (const el of [...tags(h, 'div'), ...tags(h, 'img')].filter((t) => temAttr(t, 'data-espaco'))) {
      const imagem = imagens.find((i) => i.id === attr(el, 'data-espaco'));
      const existe = fs.existsSync(path.join(pasta, imagem.arquivo));
      assert.equal(el.startsWith('<img'), existe, `${rota}: "${imagem.id}" mostra ${existe ? 'a foto' : 'o substituto'}`);
    }
  }
});
