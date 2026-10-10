import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import { test } from 'node:test';
import { RAIZ, arquivoGerado, attr, blocos, html, meta, semScripts, tags, temAttr, texto } from './apoio.mjs';

const ESTADOS = ['Bahia', 'São Paulo', 'Rio de Janeiro', 'Espírito Santo', 'Distrito Federal', 'Mato Grosso', 'Paraná', 'Minas Gerais', 'Pernambuco'];
const inicio = html('/');
const globo = fs.readFileSync(path.join(RAIZ, '.next/server/app/globo.html'), 'utf8');
const fonte = (arquivo) => fs.readFileSync(path.join(RAIZ, 'src/efeitos', arquivo), 'utf8');

function conferirMapa(pagina, modo) {
  const marca = `data-efeito="mapa-${modo}"`;
  assert.ok(semScripts(pagina).includes(marca), `mapa em modo ${modo} na página`);
  const tela = tags(pagina, 'canvas')[0];
  assert.equal(attr(tela, 'role'), 'img');
  for (const nome of ESTADOS) assert.ok(attr(tela, 'aria-label').includes(nome), `descrição do mapa cita ${nome}`);
  const lista = blocos(pagina, 'ul', 'data-estados')[0];
  const botoes = tags(lista, 'button');
  assert.equal(botoes.length, ESTADOS.length, 'um botão por estado atendido');
  assert.ok(botoes.every((b) => temAttr(b, 'aria-pressed')), 'cada botão informa se está selecionado');
  for (const nome of ESTADOS) assert.ok(texto(lista).includes(nome), `botão com o nome ${nome}`);
  assert.ok(semScripts(pagina).includes('aria-live="polite"'), 'o cartão anuncia o estado escolhido');
}

test('@spec:AC-048 o mapa de cobertura responde ao mouse, ao toque e ao teclado', () => {
  conferirMapa(inicio, 'plano');
  assert.ok(blocos(inicio, 'section', 'id="cobertura"')[0].includes('data-efeito="mapa-plano"'), 'fica na seção de cobertura');
  const componente = fonte('MapaCobertura.tsx');
  for (const evento of ['pointermove', 'pointerup', 'onFocus', 'onClick']) {
    assert.ok(componente.includes(evento), `o mapa trata ${evento}`);
  }
  assert.match(componente, /Matriz|base\.tipo/, 'o cartão mostra a base do estado');
});

test('@spec:AC-049 o mapa é leve e não esconde informação', () => {
  for (const arquivo of ['brasil-ufs.json', 'terra.json']) {
    const peso = zlib.gzipSync(fs.readFileSync(path.join(RAIZ, 'public/dados', arquivo))).length;
    assert.ok(peso < 15 * 1024, `${arquivo}: ${Math.round(peso / 1024)} KB comprimidos, limite de 15 KB`);
  }
  const ufs = JSON.parse(fs.readFileSync(path.join(RAIZ, 'public/dados/brasil-ufs.json'), 'utf8'));
  assert.equal(Object.keys(ufs).length, 27, 'os 27 contornos do Brasil');
  const componente = fonte('MapaCobertura.tsx');
  assert.match(componente, /IntersectionObserver[\s\S]*carregar\(\)/, 'os contornos são baixados só perto da tela');
  assert.doesNotMatch(inicio, /brasil-ufs\.json/, 'a página não pede os contornos na primeira carga');
  assert.match(componente, /prefers-reduced-motion/, 'respeita movimento reduzido');
  assert.match(componente, /devicePixelRatio \|\| 1, 2\)/, 'densidade do canvas limitada');
  // A lista de estados já vem no HTML, com ou sem o mapa.
  assert.ok(blocos(blocos(inicio, 'ul', 'data-estados')[0], 'li').length >= 9);
});

test('@spec:AC-050 a versão em globo mostra a mesma cobertura em seção inteira', () => {
  conferirMapa(globo, 'globo');
  assert.equal(blocos(globo, 'h1').length, 1, 'um título principal');
  assert.match(meta(globo, 'robots') ?? '', /noindex/);
  const canonico = tags(globo, 'link').find((t) => attr(t, 'rel') === 'canonical');
  assert.equal(canonico && attr(canonico, 'href'), 'https://www.connectexpresslog.com.br/');
  assert.doesNotMatch(arquivoGerado('sitemap.xml'), /globo/, 'fora do mapa de páginas');
  const estilos = fs.readFileSync(path.join(RAIZ, 'src/efeitos/mapa/mapa.module.css'), 'utf8');
  assert.match(estilos, /\.globo \{[^}]*min-height: 100svh/, 'ocupa a tela inteira');
});
