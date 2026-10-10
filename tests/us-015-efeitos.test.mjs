import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { test } from 'node:test';
import { RAIZ, attr, blocos, cssGerado, html, links, semScripts, tags, temAttr, texto } from './apoio.mjs';

const inicio = html('/');
const css = cssGerado();
const fonte = (arquivo) => fs.readFileSync(path.join(RAIZ, 'src/efeitos', arquivo), 'utf8');
const bloco = (marca) => {
  const m = semScripts(inicio).match(new RegExp(`<(\\w+)[^>]*data-efeito="${marca}"[^>]*>`));
  assert.ok(m, `efeito ${marca} está na página inicial`);
  return m[0];
};

test('@spec:AC-043 a frase em destaque aparece palavra a palavra sem deixar de ser texto', async () => {
  const { quemSomos } = await import('../src/data/inicio.ts');
  const frase = blocos(inicio, 'p', 'data-efeito="texto-revelado"')[0];
  assert.ok(frase, 'a frase está na seção');
  assert.equal(texto(frase), quemSomos.declaracao, 'o texto completo está no HTML, na ordem de leitura');
  const palavras = quemSomos.declaracao.split(/\s+/).length;
  assert.equal((frase.match(/data-palavra/g) ?? []).length, palavras, 'cada palavra pode ser animada');
  assert.ok(blocos(inicio, 'section', 'id="sobre"')[0].includes('data-efeito="texto-revelado"'), 'fica em Quem Somos');
});

test('@spec:AC-044 cada solução mostra uma imagem, com mouse ou com toque', () => {
  const solucoes = blocos(inicio, 'article', 'data-solucao');
  assert.equal(solucoes.length, 4);
  for (const s of solucoes) {
    const previa = tags(s, 'div').find((t) => temAttr(t, 'data-previa'));
    assert.ok(previa, 'a solução tem prévia de imagem');
    assert.equal(attr(previa, 'aria-hidden'), 'true', 'a prévia é decorativa');
    assert.match(s, /data-espaco="solucao-/, 'a prévia usa a imagem da solução');
  }
  assert.match(css, /\(hover:hover\) and \(pointer:fine\)/, 'o modo de mouse só vale onde existe mouse');
  assert.match(css, /:hover [^{]*previa[^{]*,[^{]*:focus-within [^{]*previa/, 'aparece com o mouse e com o foco do teclado');
  assert.match(css, /\[data-pronto\] [^{]*previa[^{]*:not\(\[data-visivel\]\)/, 'em toque, só fica escondida depois que o script liga a revelação');
});

test('@spec:AC-045 a abertura de Quem Somos se expande com a rolagem e nada some', () => {
  bloco('expansao-na-rolagem');
  const secao = blocos(inicio, 'section', 'id="sobre"')[0];
  assert.ok(secao.includes('data-efeito="expansao-na-rolagem"'), 'o efeito fica em Quem Somos');
  assert.match(texto(blocos(secao, 'h2')[0] ?? ''), /15 anos/);
  assert.ok(links(secao).some((l) => l.texto === 'Conhecer as soluções'), 'botão no HTML');
  const chamada = blocos(inicio, 'section', 'aria-labelledby="titulo-chamada"')[0];
  assert.ok(!chamada.includes('data-efeito="expansao-na-rolagem"'), 'a chamada final não prende a rolagem');
  assert.match(texto(blocos(chamada, 'h2')[0] ?? ''), /entregar mais rápido/);
  assert.ok(links(chamada).some((l) => l.texto === 'Pedir cotação' && l.href === '/#contato'), 'botão de cotação na chamada final');
  // Sem o script, nada do conteúdo pode estar escondido pelo CSS.
  const estilos = fonte('efeitos.module.css');
  const regra = (seletor) => (estilos.match(new RegExp(`\\n${seletor.replace('.', '\\.')} \\{[^}]*\\}`)) ?? [''])[0];
  for (const seletor of ['.expansaoConteudo', '.expansaoTitulo']) {
    assert.ok(regra(seletor).length > 0, `regra padrão de ${seletor}`);
    assert.doesNotMatch(regra(seletor), /opacity: 0|visibility: hidden|display: none/, `${seletor} visível por padrão`);
  }
  assert.match(estilos, /\.expansao\[data-pronto\] \.expansaoConteudo \{[^}]*visibility: hidden/, 'só o script esconde o conteúdo, e também do teclado');
});

test('@spec:AC-046 a troca entre foto e números funciona por toque e por teclado', () => {
  const controle = bloco('troca-pixel');
  assert.match(controle, /^<button/, 'é um botão de verdade');
  assert.ok((attr(controle, 'aria-label') ?? '').length > 10, 'tem nome');
  assert.equal(attr(controle, 'aria-pressed'), 'false', 'informa o estado');
  const corpo = blocos(inicio, 'button', 'data-efeito="troca-pixel"')[0];
  assert.match(corpo, /data-espaco="quem-somos"/, 'a foto está no HTML');
  for (const numero of ['10', '+100', '450']) assert.ok(texto(corpo).includes(numero), `o número ${numero} está no HTML`);
  assert.match(texto(blocos(inicio, 'section', 'id="sobre"')[0]), /Toque na imagem/, 'há uma dica visível de que dá para tocar');
});

test('@spec:AC-047 os efeitos respeitam quem pede menos movimento', () => {
  for (const arquivo of ['TextoRevelado.tsx', 'TrocaPixel.tsx', 'ExpansaoNaRolagem.tsx']) {
    assert.match(fonte(arquivo), /prefers-reduced-motion/, `${arquivo} confere a preferência de movimento`);
  }
  assert.doesNotMatch(fonte('DesfoqueGradual.tsx'), /['"]use client['"]/, 'o desfoque não leva JavaScript ao navegador');
  assert.equal(attr(bloco('desfoque-gradual'), 'aria-hidden'), 'true', 'o desfoque é decorativo');
  assert.match(fonte('efeitos.module.css'), /prefers-reduced-transparency: reduce/, 'some para quem pede menos transparência');
  for (const arquivo of ['TextoRevelado.tsx', 'TrocaPixel.tsx', 'ExpansaoNaRolagem.tsx', 'ObservaPrevias.tsx']) {
    assert.doesNotMatch(fonte(arquivo), /ScrollTrigger\.getAll\(\)/, `${arquivo} não derruba os efeitos do resto da página`);
  }
  assert.match(css, /prefers-reduced-motion:reduce/, 'transições em CSS também param');
});
