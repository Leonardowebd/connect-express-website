---
name: connect-performance
description: Velocidade do site da Connect Express Log - metas de Core Web Vitals, orçamento de peso, fontes, imagens, CSS, JavaScript do Next.js e do GSAP, e cache na Vercel. Use ao adicionar fonte, imagem, script ou dependência, ao revisar o peso de uma página, antes de publicar, ou quando o site parecer lento.
---

# Velocidade: Connect Express Log

## Metas

Medidas em celular intermediário com rede 4G, no percentil 75:

| Métrica | Meta |
|---|---|
| LCP (maior elemento visível) | até 2,0 s |
| INP (resposta à interação) | até 200 ms |
| CLS (salto de layout) | até 0,05 |
| Lighthouse, desempenho no celular | 95 ou mais |

## Orçamento por página

| Item | Limite |
|---|---|
| HTML, CSS e JavaScript da primeira carga, somados e comprimidos, sem imagens | 250 KB (critério de aceite AC-026) |
| JavaScript da primeira carga (React, Next.js, GSAP e código próprio) | 170 KB comprimido |
| CSS | 50 KB comprimido |
| Fontes | 2 famílias, 4 arquivos, 150 KB no total |
| Imagem do herói | 200 KB |
| Demais imagens | 100 KB cada |
| Scripts de terceiros | Zero por padrão. Cada um entra com justificativa. |

## HTML e CSS

- Páginas geradas no build: o HTML chega pronto, com todo o texto. Nada de conteúdo montado só no navegador.
- Sem `@import` em CSS. Sem CSS que não é usado na página.
- Animações só em `transform` e `opacity`.
- `content-visibility: auto` em seções longas abaixo da primeira tela, com `contain-intrinsic-size`.

## JavaScript

- Nenhum `<script>` no `<head>` sem `type="module"`, `defer` ou `async` (critério de aceite AC-027).
- Componentes de servidor por padrão. `'use client'` só no menu, no formulário e nos componentes de animação, sempre nas folhas da árvore.
- GSAP: importar só `gsap` e `ScrollTrigger`. Nenhum outro plugin sem justificativa. Sem segunda biblioteca de animação, de carrossel ou de rolagem suave.
- Animações abaixo da primeira tela podem carregar com `next/dynamic`; o conteúdo já está no HTML.
- Nada de animação de entrada no título ou na imagem do herói: eles definem o LCP.
- Conferir o tamanho de cada rota no resumo do `next build` a cada tarefa.
- Mapa: imagem ou SVG. Se o mapa do Google for exigido, carregar só depois de um clique.

## Fontes

- `next/font/local` com os arquivos WOFF2 da identidade, servidos pelo próprio domínio. Nada de Google Fonts por CDN.
- `display: 'swap'` em toda fonte.
- Só os pesos usados. Subconjunto latino. Fonte variável quando existir.
- `preload: true` só para a fonte do título do herói.
- Manter o ajuste automático da fonte reserva do `next/font`, para o texto não pular na troca.

## Imagens

- `next/image` em toda fotografia, com `formats` AVIF e WebP em `next.config.ts`. SVG para logotipo e ícones.
- `width` e `height` em toda imagem (critério de aceite AC-028).
- `loading="lazy"` e `decoding="async"` fora da primeira tela.
- Imagem do herói: `priority`, sem `lazy`.
- `sizes` correto em toda imagem, para o navegador não baixar arquivo maior que o necessário.
- Substitutos de imagem são CSS puro, sem arquivo.
- Logotipos de clientes em SVG ou em uma única imagem otimizada.

## Vercel

- Arquivos com hash no nome: `Cache-Control: public, max-age=31536000, immutable`.
- Fontes: mesmo cache longo.
- HTML: sem cache longo, para publicação imediata.
- Compressão Brotli já vem ativa.
- Configurar na função `headers()` de `next.config.ts`, junto dos cabeçalhos de segurança.

## Terceiros

Medição (Analytics, Tag Manager, pixel) depende da pergunta em aberto Q-005. Se entrar: carregar depois da interação ou do consentimento, nunca no `<head>` de forma bloqueante, e incluir o domínio na política de conteúdo (ver `connect-security`).

## Como medir

1. `next build` e conferir o tamanho da primeira carga de cada rota (o teste do AC-026 faz isso).
2. Lighthouse no celular contra a pré-visualização da Vercel.
3. PageSpeed Insights depois de publicar.
4. Registrar os números na tarefa. Piorou em relação à medição anterior, não entra.
