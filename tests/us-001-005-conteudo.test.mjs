import assert from 'node:assert/strict';
import { test } from 'node:test';
import { ROTAS_DE_SOLUCAO, SLUGS, attr, blocos, html, links, paginas, semScripts, tags, temAttr, texto } from './apoio.mjs';

const inicio = html('/');
const contar = (h, marca) => (semScripts(h).match(new RegExp(`\\s${marca}=""`, 'g')) ?? []).length;
const campos = (h) => [...tags(h, 'input'), ...tags(h, 'textarea'), ...tags(h, 'select')];
const campo = (h, nome) => campos(h).find((t) => attr(t, 'name') === nome);

test('@spec:AC-001 a primeira tela diz o que a empresa faz e oferece a cotação', () => {
  const h1 = blocos(inicio, 'h1');
  assert.equal(h1.length, 1, 'a página inicial tem um único título principal');
  assert.match(texto(h1[0]), /log[íi]stica|entrega/i);
  assert.match(texto(h1[0]), /sa[úu]de/i);
  const rotulos = links(blocos(inicio, 'section')[0]).map((l) => l.texto);
  assert.ok(rotulos.includes('Pedir cotação'), 'botão de pedir cotação na primeira tela');
  assert.ok(rotulos.includes('Conhecer as soluções'), 'botão secundário para as soluções');
});

test('@spec:AC-002 os números da operação aparecem como prova', () => {
  const lista = blocos(inicio, 'dl', 'data-numeros')[0];
  assert.ok(lista, 'bloco de números existe');
  const itens = blocos(lista, 'div', 'data-indicador');
  assert.ok(itens.length >= 4, `pelo menos 4 indicadores, achei ${itens.length}`);
  for (const item of itens) {
    assert.match(texto(blocos(item, 'dd')[0] ?? ''), /\d/, 'indicador tem número');
    assert.ok(texto(blocos(item, 'dt')[0] ?? '').length > 3, 'indicador tem legenda');
  }
});

test('@spec:AC-003 o menu leva a todas as seções e ações principais', () => {
  for (const [rota, h] of paginas()) {
    const rotulos = links(blocos(h, 'header')[0]).map((l) => l.texto);
    for (const esperado of ['Início', 'Quem Somos', 'Soluções', 'Cobertura', 'Contato', 'Rastreie seu pedido', 'Trabalhe conosco']) {
      assert.ok(rotulos.includes(esperado), `${rota}: cabeçalho tem "${esperado}"`);
    }
  }
});

test('@spec:AC-004 as quatro soluções aparecem na página inicial', () => {
  const cartoes = blocos(inicio, 'article', 'data-solucao');
  assert.equal(cartoes.length, 4);
  for (const slug of SLUGS) {
    const cartao = cartoes.find((c) => c.includes(`/servicos/${slug}/`));
    assert.ok(cartao, `cartão com link para ${slug}`);
    assert.ok(texto(blocos(cartao, 'h3')[0] ?? '').length > 5, 'cartão tem título');
    assert.ok(texto(blocos(cartao, 'p').at(-1) ?? '').length > 30, 'cartão tem resumo');
  }
});

test('@spec:AC-005 cada solução tem página própria no mesmo endereço do site antigo', () => {
  const titulos = new Set();
  for (const rota of ROTAS_DE_SOLUCAO) {
    const h = html(rota);
    const h1 = blocos(h, 'h1');
    assert.equal(h1.length, 1, `${rota}: um título principal`);
    titulos.add(texto(h1[0]));
    assert.ok(blocos(blocos(h, 'ul', 'data-inclui')[0] ?? '', 'li').length >= 4, `${rota}: o que está incluído`);
    assert.ok(blocos(blocos(h, 'ul', 'data-estados')[0] ?? '', 'li').length >= 9, `${rota}: onde atua`);
    assert.ok(contar(h, 'data-motivo') >= 3, `${rota}: motivos para contratar`);
    assert.ok(links(blocos(h, 'main')[0]).some((l) => l.texto === 'Pedir cotação'), `${rota}: botão de cotação`);
  }
  assert.equal(titulos.size, 4, 'cada página tem título próprio');
});

test('@spec:AC-006 cada página de solução responde às dúvidas comuns', () => {
  for (const rota of ROTAS_DE_SOLUCAO) {
    const perguntas = blocos(html(rota), 'details');
    assert.ok(perguntas.length >= 3, `${rota}: pelo menos 3 perguntas`);
    for (const p of perguntas) {
      assert.match(texto(blocos(p, 'summary')[0] ?? ''), /\?$/, 'pergunta termina com interrogação');
      assert.ok(texto(blocos(p, 'p')[0] ?? '').length > 60, 'resposta em texto no HTML');
    }
  }
});

test('@spec:AC-007 a seção Quem Somos conta a história e os valores', () => {
  const sobre = blocos(inicio, 'section', 'id="sobre"')[0];
  assert.ok(sobre, 'seção com a âncora "sobre"');
  assert.ok(texto(sobre).length > 300, 'texto institucional');
  const valores = blocos(inicio, 'article', 'data-valor');
  assert.equal(valores.length, 6, 'seis valores');
  for (const v of valores) {
    assert.ok(texto(blocos(v, 'h3')[0] ?? '').length > 5);
    assert.ok(texto(blocos(v, 'p')[0] ?? '').length > 15);
  }
});

test('@spec:AC-008 a cobertura lista os estados atendidos', () => {
  const secao = blocos(inicio, 'section', 'id="cobertura"')[0];
  assert.ok(secao, 'seção com a âncora "cobertura"');
  const estados = texto(blocos(secao, 'ul', 'data-estados')[0] ?? '');
  for (const nome of ['Bahia', 'São Paulo', 'Rio de Janeiro', 'Espírito Santo', 'Distrito Federal', 'Mato Grosso', 'Paraná', 'Minas Gerais', 'Pernambuco']) {
    assert.ok(estados.includes(nome), `estado ${nome} em texto`);
  }
  assert.match(texto(secao), /Matriz: Lauro de Freitas \(BA\)/);
  assert.match(texto(secao), /Filial: São Paulo \(SP\)/);
});

test('@spec:AC-009 os clientes aparecem como prova social', () => {
  const nomes = blocos(blocos(inicio, 'ul', 'data-clientes')[0] ?? '', 'li').map(texto);
  assert.ok(nomes.length >= 6, 'pelo menos seis clientes');
  for (const nome of ['Drogaria São Paulo', 'Pague Menos', 'Extrafarma']) assert.ok(nomes.includes(nome), nome);
});

test('@spec:AC-010 o formulário de contato pede só o necessário', () => {
  const secao = blocos(inicio, 'section', 'id="contato"')[0];
  const rotulos = tags(secao, 'label').map((t) => attr(t, 'for'));
  for (const nome of ['nome', 'empresa', 'email', 'telefone', 'mensagem']) {
    const c = campo(secao, nome);
    assert.ok(c, `campo ${nome}`);
    assert.ok(rotulos.includes(attr(c, 'id')), `campo ${nome} tem rótulo ligado a ele`);
  }
  for (const nome of ['nome', 'email', 'mensagem']) assert.ok(temAttr(campo(secao, nome), 'required'), `${nome} é obrigatório`);
  for (const nome of ['empresa', 'telefone']) assert.ok(!temAttr(campo(secao, nome), 'required'), `${nome} é opcional`);
});

test('@spec:AC-011 o formulário avisa o que falta antes de enviar', async () => {
  const { camposContato, validar } = await import('../src/lib/validacao.ts');
  const base = { nome: 'Ana', mensagem: 'Quero uma cotação.' };
  assert.match(validar(camposContato, { ...base, email: '' }).email, /Preencha/);
  assert.match(validar(camposContato, { ...base, email: 'ana@' }).email, /e-mail válido/);
  assert.deepEqual(validar(camposContato, { ...base, email: 'ana@empresa.com.br' }), {});
  const secao = blocos(inicio, 'section', 'id="contato"')[0];
  assert.ok(temAttr(tags(secao, 'form')[0], 'novalidate'), 'a validação é feita pelo site, com mensagem própria');
  const descrito = attr(campo(secao, 'email'), 'aria-describedby');
  assert.ok(descrito && secao.includes(`id="${descrito}"`), 'a mensagem de erro está ligada ao campo');
});

test('@spec:AC-012 o WhatsApp comercial está a um toque', () => {
  for (const [rota, h] of paginas()) {
    const zap = links(h).filter((l) => l.href?.startsWith('https://wa.me/5511955954684'));
    assert.ok(zap.length >= 1, `${rota}: link para o WhatsApp comercial`);
    assert.ok(zap.every((l) => /\?text=.+/.test(l.href)), `${rota}: mensagem inicial preenchida`);
  }
});

test('@spec:AC-013 telefones, e-mails e endereços estão em texto', () => {
  const hrefs = links(inicio).map((l) => l.href);
  for (const esperado of ['tel:+5511955954684', 'tel:+551150280388', 'mailto:comercial@connectexpresslog.com.br', 'mailto:sac@connectexpresslog.com.br']) {
    assert.ok(hrefs.includes(esperado), esperado);
  }
  const t = texto(inicio);
  for (const esperado of ['(11) 95595-4684', '(11) 5028-0388', 'R. Gilvan Fernandes, 188', 'Av. Itaberaba, 4688', '23.039.490/0001-35']) {
    assert.ok(t.includes(esperado), esperado);
  }
});

test('@spec:AC-014 o rastreio abre o portal oficial', () => {
  for (const [rota, h] of paginas()) {
    const rastreio = links(h).filter((l) => l.texto === 'Rastreie seu pedido');
    assert.ok(rastreio.length >= 1, `${rota}: atalho de rastreio`);
    assert.ok(rastreio.every((l) => l.href === 'https://rastreio.connectexpresslog.com.br/'), `${rota}: aponta para o portal`);
  }
});

test('@spec:AC-015 a página Trabalhe Conosco explica requisitos e recebe candidaturas', () => {
  const h = html('/trabalhe-conosco/');
  assert.ok(blocos(blocos(h, 'ul', 'data-vantagens')[0] ?? '', 'li').length >= 3, 'vantagens');
  assert.ok(blocos(blocos(h, 'ol', 'data-requisitos')[0] ?? '', 'li').length >= 4, 'requisitos');
  for (const nome of ['nome', 'cidade', 'email', 'area', 'telefone']) assert.ok(campo(h, nome), `campo ${nome}`);
});
