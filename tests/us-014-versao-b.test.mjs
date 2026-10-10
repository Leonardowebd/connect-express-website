import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { test } from 'node:test';
import { RAIZ, SLUGS, arquivoGerado, attr, blocos, links, meta, tags, texto } from './apoio.mjs';

const b = fs.readFileSync(path.join(RAIZ, '.next/server/app/b.html'), 'utf8');

test('@spec:AC-040 a versão B mostra o mesmo conteúdo em outro layout', () => {
  const h1 = blocos(b, 'h1');
  assert.equal(h1.length, 1, 'um único título principal');
  assert.match(texto(h1[0]), /sa[úu]de/i);
  assert.ok(blocos(blocos(b, 'dl', 'data-numeros')[0] ?? '', 'div', 'data-indicador').length >= 4, 'números da operação');
  const solucoes = blocos(b, 'article', 'data-solucao');
  assert.equal(solucoes.length, 4, 'quatro soluções');
  for (const slug of SLUGS) assert.ok(solucoes.some((s) => s.includes(`/servicos/${slug}/`)), `link para ${slug}`);
  const cobertura = blocos(b, 'section', 'id="cobertura"')[0];
  assert.ok(blocos(blocos(cobertura ?? '', 'ul', 'data-estados')[0] ?? '', 'li').length >= 9, 'estados na cobertura');
  assert.ok(blocos(b, 'details').length >= 3, 'perguntas frequentes');
  const contato = blocos(b, 'section', 'id="contato"')[0];
  assert.ok(contato && tags(contato, 'form').length === 1, 'formulário de cotação');
  assert.ok(links(blocos(b, 'header')[0]).some((l) => l.texto === 'Pedir cotação'), 'cotação no topo');
  assert.ok(links(blocos(b, 'footer')[0]).some((l) => l.href === '/politica-de-privacidade/'), 'política no rodapé');
});

test('@spec:AC-041 a versão B não concorre com a oficial nos buscadores', () => {
  assert.match(meta(b, 'robots') ?? '', /noindex/);
  const canonico = tags(b, 'link').find((t) => attr(t, 'rel') === 'canonical');
  assert.equal(canonico && attr(canonico, 'href'), 'https://www.connectexpresslog.com.br/');
  assert.doesNotMatch(arquivoGerado('sitemap.xml'), /\/b\/</, 'fora do mapa de páginas');
});

test('@spec:AC-042 a versão C mostra o mesmo conteúdo em um terceiro layout', () => {
  const c = fs.readFileSync(path.join(RAIZ, '.next/server/app/c.html'), 'utf8');
  const h1 = blocos(c, 'h1');
  assert.equal(h1.length, 1, 'um único título principal');
  assert.match(texto(h1[0]), /sa[úu]de/i);
  assert.ok(blocos(blocos(c, 'dl', 'data-numeros')[0] ?? '', 'div', 'data-indicador').length >= 4, 'números da operação');
  const solucoes = blocos(c, 'article', 'data-solucao');
  assert.equal(solucoes.length, 4, 'quatro soluções');
  for (const slug of SLUGS) assert.ok(solucoes.some((s) => s.includes(`/servicos/${slug}/`)), `link para ${slug}`);
  const cobertura = blocos(c, 'section', 'id="cobertura"')[0];
  assert.ok(blocos(blocos(cobertura ?? '', 'ul', 'data-estados')[0] ?? '', 'li').length >= 9, 'estados na cobertura');
  assert.ok(blocos(blocos(c, 'ul', 'data-clientes')[0] ?? '', 'li').length >= 6, 'clientes');
  assert.ok(blocos(c, 'details').length >= 3, 'perguntas frequentes');
  const contato = blocos(c, 'section', 'id="contato"')[0];
  assert.ok(contato && tags(contato, 'form').length === 1, 'formulário de cotação');
  assert.ok(links(blocos(c, 'header')[0]).some((l) => l.texto.startsWith('Pedir cotação')), 'cotação no topo');
  assert.ok(links(blocos(c, 'footer')[0]).some((l) => l.href === '/politica-de-privacidade/'), 'política no rodapé');
  assert.match(meta(c, 'robots') ?? '', /noindex/);
  const canonico = tags(c, 'link').find((t) => attr(t, 'rel') === 'canonical');
  assert.equal(canonico && attr(canonico, 'href'), 'https://www.connectexpresslog.com.br/');
  assert.doesNotMatch(arquivoGerado('sitemap.xml'), /\/c\/</, 'fora do mapa de páginas');
});
