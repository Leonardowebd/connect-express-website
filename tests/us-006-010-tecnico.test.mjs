import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  ROTAS,
  ROTAS_DE_SOLUCAO,
  arquivoGerado,
  attr,
  blocos,
  cssGerado,
  html,
  jsonld,
  links,
  meta,
  paginas,
  pesoDaPrimeiraCarga,
  tags,
  temAttr,
  texto,
  titulo,
} from './apoio.mjs';

const SITE = 'https://www.connectexpresslog.com.br';
const css = cssGerado();
const doTipo = (h, tipo) => jsonld(h).filter((d) => d['@type'] === tipo);

// US-006: qualquer aparelho

test('@spec:AC-016 o site se ajusta à largura do aparelho', () => {
  for (const [rota, h] of paginas()) {
    assert.match(meta(h, 'viewport') ?? '', /width=device-width/, `${rota}: viewport`);
    assert.doesNotMatch(meta(h, 'viewport') ?? '', /user-scalable=no|maximum-scale=1/, `${rota}: zoom liberado`);
  }
  for (const largura of ['768px', '1024px']) {
    assert.ok(css.includes(`min-width:${largura}`), `regras para telas a partir de ${largura}`);
  }
  assert.match(css, /overflow-x:clip/, 'a página não rola para os lados');
  assert.match(css, /img,svg\{[^}]*max-width:100%/, 'imagens nunca passam da largura da tela');
});

test('@spec:AC-017 no celular o menu vira um botão acessível', () => {
  for (const [rota, h] of paginas()) {
    const botao = tags(blocos(h, 'header')[0], 'button').find((t) => temAttr(t, 'aria-expanded'));
    assert.ok(botao, `${rota}: botão de menu informa se está aberto`);
    assert.ok((attr(botao, 'aria-label') ?? '').length > 3, `${rota}: botão de menu tem nome`);
    const painel = attr(botao, 'aria-controls');
    assert.ok(painel && h.includes(`id="${painel}"`), `${rota}: botão aponta para o painel do menu`);
  }
});

test('@spec:AC-018 botões e links são fáceis de tocar', () => {
  assert.match(css, /--toque-minimo:2\.75rem/, 'alvo mínimo de 44 px definido nos tokens');
  assert.match(css, /\.botao\{[^}]*min-height:var\(--toque-minimo\)/, 'todo botão respeita o alvo mínimo');
  for (const [rota, h] of paginas()) {
    const acoes = links(h).filter((l) => ['Pedir cotação', 'Falar no WhatsApp', 'Conhecer as soluções'].includes(l.texto));
    const soltas = acoes.filter((l) => !/class="[^"]*(botao|pilula)/.test(l.tag) && l.texto !== 'Conhecer as soluções');
    assert.deepEqual(soltas.map((l) => l.texto), [], `${rota}: toda ação principal usa o componente de botão`);
  }
});

// US-007: busca

test('@spec:AC-019 cada página tem título e descrição próprios', () => {
  const titulos = new Set();
  const descricoes = new Set();
  for (const [rota, h] of paginas()) {
    const t = titulo(h);
    const d = meta(h, 'description') ?? '';
    assert.ok(t.length > 10 && t.length <= 60, `${rota}: título com até 60 caracteres (tem ${t.length}): ${t}`);
    assert.ok(d.length >= 70 && d.length <= 160, `${rota}: descrição entre 70 e 160 caracteres (tem ${d.length})`);
    titulos.add(t);
    descricoes.add(d);
  }
  assert.equal(titulos.size, Object.keys(ROTAS).length, 'títulos únicos');
  assert.equal(descricoes.size, Object.keys(ROTAS).length, 'descrições únicas');
});

test('@spec:AC-020 cada página declara seu endereço oficial e prévia de compartilhamento', () => {
  for (const [rota, h] of paginas()) {
    assert.match(h, /<html[^>]*\slang="pt-BR"/, `${rota}: idioma`);
    const canonico = tags(h, 'link').find((t) => attr(t, 'rel') === 'canonical');
    assert.equal(canonico && attr(canonico, 'href'), `${SITE}${rota}`, `${rota}: endereço canônico`);
    for (const chave of ['og:title', 'og:description', 'og:image', 'og:type']) {
      assert.ok((meta(h, chave) ?? '').length > 0, `${rota}: ${chave}`);
    }
  }
});

test('@spec:AC-021 o site entrega mapa de páginas e regras para robôs', () => {
  const mapa = arquivoGerado('sitemap.xml');
  for (const rota of Object.keys(ROTAS)) assert.ok(mapa.includes(`<loc>${SITE}${rota}</loc>`), `mapa lista ${rota}`);
  assert.match(arquivoGerado('robots.txt'), new RegExp(`Sitemap: ${SITE}/sitemap\\.xml`));
});

test('@spec:AC-022 a empresa é descrita em dados estruturados', () => {
  const [org] = doTipo(html('/'), 'Organization');
  assert.ok(org, 'JSON-LD da organização na página inicial');
  assert.equal(org.name, 'Connect Express Log');
  assert.match(org.logo, /^https:\/\/www\.connectexpresslog\.com\.br\/.+\.png$/);
  assert.ok(org.telephone && org.email);
  assert.equal(org.address.length, 2, 'matriz e filial');
  assert.deepEqual(org.address.map((a) => a.addressLocality), ['Lauro de Freitas', 'São Paulo']);
  assert.ok(org.areaServed.length >= 9, 'área atendida');
  assert.ok(org.sameAs.some((u) => u.includes('linkedin.com')) && org.sameAs.some((u) => u.includes('instagram.com')));
});

// US-008: assistentes de IA

test('@spec:AC-023 as perguntas frequentes são legíveis por máquina', () => {
  const comPerguntas = paginas().filter(([, h]) => blocos(h, 'details').length > 0);
  assert.ok(comPerguntas.length >= 5, 'início e as quatro soluções têm perguntas');
  for (const [rota, h] of comPerguntas) {
    const visiveis = blocos(h, 'details').map((d) => [texto(blocos(d, 'summary')[0]), texto(blocos(d, 'p')[0])]);
    const [faq] = doTipo(h, 'FAQPage');
    assert.ok(faq, `${rota}: JSON-LD FAQPage`);
    const estruturadas = faq.mainEntity.map((q) => [q.name, q.acceptedAnswer.text]);
    assert.deepEqual(estruturadas, visiveis, `${rota}: mesmo texto na página e nos dados estruturados`);
  }
});

test('@spec:AC-024 o site oferece um resumo para assistentes', () => {
  const resumo = arquivoGerado('llms.txt');
  assert.match(resumo, /^# Connect Express Log/);
  assert.match(resumo, /transportadora especializada em logística para a saúde/);
  for (const rota of ROTAS_DE_SOLUCAO) assert.ok(resumo.includes(`(${SITE}${rota})`), `link para ${rota}`);
  assert.match(resumo, /## Cobertura[\s\S]*Bahia/);
  assert.match(resumo, /## Contato[\s\S]*\(11\) 5028-0388/);
});

test('@spec:AC-025 cada solução é descrita como serviço', () => {
  for (const rota of ROTAS_DE_SOLUCAO) {
    const h = html(rota);
    const [servico] = doTipo(h, 'Service');
    assert.ok(servico, `${rota}: JSON-LD Service`);
    assert.equal(servico.name, texto(blocos(h, 'h1')[0]), `${rota}: mesmo nome da página`);
    assert.ok(servico.description.length > 80, `${rota}: descrição`);
    assert.equal(servico.provider.name, 'Connect Express Log');
    assert.ok(servico.areaServed.length >= 9, `${rota}: área atendida`);
  }
});

// US-009: velocidade

test('@spec:AC-026 as páginas são leves', () => {
  const LIMITE = 250 * 1024;
  for (const [rota, h] of paginas()) {
    const peso = pesoDaPrimeiraCarga(h);
    assert.ok(peso <= LIMITE, `${rota}: ${Math.round(peso / 1024)} KB comprimidos, limite de 250 KB`);
  }
});

test('@spec:AC-027 nada bloqueia a primeira pintura', () => {
  for (const [rota, h] of paginas()) {
    const cabeca = h.slice(0, h.indexOf('</head>'));
    // Script com nomodule é o polyfill do Next para navegadores antigos:
    // navegadores com suporte a módulos não baixam nem executam.
    const bloqueantes = (cabeca.match(/<script[^>]*\ssrc="[^"]+"[^>]*>/g) ?? []).filter(
      (t) => !temAttr(t, 'async') && !temAttr(t, 'defer') && !temAttr(t, 'nomodule') && attr(t, 'type') !== 'module',
    );
    assert.deepEqual(bloqueantes, [], `${rota}: nenhum script bloqueante no cabeçalho`);
    assert.doesNotMatch(h, /fonts\.googleapis\.com|fonts\.gstatic\.com/, `${rota}: fontes servidas pelo próprio site`);
  }
  const fontes = css.match(/@font-face\{[^}]*\}/g) ?? [];
  assert.ok(fontes.length > 0, 'fontes declaradas no CSS do site');
  const semTroca = fontes.filter((f) => /src:url/.test(f) && !/font-display:swap/.test(f));
  assert.equal(semTroca.length, 0, 'toda fonte baixada usa font-display: swap');
  assert.ok(fontes.filter((f) => /src:url/.test(f)).every((f) => /url\(["']?(\.\.\/|\/_next\/)/.test(f)), 'arquivos de fonte locais');
});

test('@spec:AC-028 as imagens não empurram o conteúdo', () => {
  for (const [rota, h] of paginas()) {
    for (const img of tags(h, 'img')) {
      assert.ok(attr(img, 'width') && attr(img, 'height'), `${rota}: imagem com largura e altura: ${img.slice(0, 80)}`);
    }
    const principal = blocos(h, 'main')[0];
    // Só a imagem prioritária (a do herói) pode carregar de imediato, e ela
    // precisa estar pré-carregada no cabeçalho. Todas as outras são sob demanda.
    const precarregadas = tags(h, 'link')
      .filter((t) => attr(t, 'rel') === 'preload' && attr(t, 'as') === 'image')
      .map((t) => `${attr(t, 'imagesrcset') ?? ''} ${attr(t, 'href') ?? ''}`)
      .join(' ');
    const imediatas = tags(principal, 'img').filter((t) => attr(t, 'loading') !== 'lazy');
    assert.ok(imediatas.length <= 1, `${rota}: no máximo uma imagem carrega de imediato (achei ${imediatas.length})`);
    for (const img of imediatas) {
      const arquivo = encodeURIComponent(`/imagens/${attr(img, 'data-espaco')}.webp`);
      assert.ok(attr(img, 'fetchpriority') === 'high' || precarregadas.includes(arquivo), `${rota}: a imagem imediata está pré-carregada`);
    }
    for (const s of tags(h, 'div').filter((t) => temAttr(t, 'data-substituto'))) {
      const reservaEspaco = /aspect-ratio/.test(attr(s, 'style') ?? '') || /preencher/.test(attr(s, 'class') ?? '');
      assert.ok(reservaEspaco, `${rota}: substituto reserva o espaço da imagem`);
    }
  }
});

// US-010: segurança

test('@spec:AC-029 o site declara as proteções de navegador', async () => {
  const { default: config } = await import('../next.config.mjs');
  const regras = await config.headers();
  const geral = regras.find((r) => r.source === '/:path*');
  assert.ok(geral, 'cabeçalhos valem para todas as rotas');
  const mapa = Object.fromEntries(geral.headers.map((c) => [c.key, c.value]));
  for (const chave of [
    'Content-Security-Policy',
    'Strict-Transport-Security',
    'X-Frame-Options',
    'X-Content-Type-Options',
    'Referrer-Policy',
    'Permissions-Policy',
  ]) {
    assert.ok(mapa[chave], `cabeçalho ${chave}`);
  }
  assert.equal(mapa['X-Content-Type-Options'], 'nosniff');
  assert.match(mapa['Content-Security-Policy'], /default-src 'self'/);
  assert.match(mapa['Content-Security-Policy'], /frame-ancestors 'none'/);
  assert.match(mapa['Content-Security-Policy'], /object-src 'none'/);
  assert.doesNotMatch(mapa['Content-Security-Policy'], /unsafe-eval/);
});

test('@spec:AC-030 links externos não dão controle da página a terceiros', () => {
  for (const [rota, h] of paginas()) {
    for (const a of tags(h, 'a').filter((t) => attr(t, 'target') === '_blank')) {
      const rel = attr(a, 'rel') ?? '';
      assert.ok(rel.includes('noopener') && rel.includes('noreferrer'), `${rota}: ${attr(a, 'href')}`);
    }
    for (const a of tags(h, 'a').filter((t) => /^https?:\/\//.test(attr(t, 'href') ?? '') && !attr(t, 'href').startsWith(SITE))) {
      assert.equal(attr(a, 'target'), '_blank', `${rota}: link externo abre em nova aba: ${attr(a, 'href')}`);
    }
  }
});

test('@spec:AC-031 o formulário barra robôs e informa o uso dos dados', () => {
  for (const rota of ['/', '/trabalhe-conosco/']) {
    const form = blocos(html(rota), 'form')[0];
    assert.ok(form, `${rota}: formulário`);
    assert.ok(links(form).some((l) => l.href === '/politica-de-privacidade/'), `${rota}: link para a política junto ao envio`);
    assert.match(texto(form), /Usamos seus dados só para responder/, `${rota}: aviso de uso dos dados`);
    const armadilha = tags(form, 'input').find((t) => attr(t, 'name') === 'site');
    assert.ok(armadilha, `${rota}: campo armadilha`);
    assert.equal(attr(armadilha, 'tabindex'), '-1', `${rota}: campo armadilha fora da navegação por teclado`);
    assert.equal(attr(armadilha, 'autocomplete'), 'off');
  }
});

test('@spec:AC-032 a Política de Privacidade existe', () => {
  const politica = html('/politica-de-privacidade/');
  assert.match(texto(blocos(politica, 'h1')[0]), /Política de Privacidade/);
  assert.match(texto(politica), /23\.039\.490\/0001-35/, 'identifica o responsável pelos dados');
  for (const [rota, h] of paginas()) {
    assert.ok(links(blocos(h, 'footer')[0]).some((l) => l.href === '/politica-de-privacidade/'), `${rota}: rodapé liga para a política`);
  }
});
