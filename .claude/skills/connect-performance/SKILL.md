---
name: connect-performance
description: Velocidade do site da Connect Express Log - metas de Core Web Vitals, orçamento de peso, fontes, imagens, CSS, JavaScript e cache na Vercel. Use ao adicionar fonte, imagem, script ou dependência, ao revisar o peso de uma página, antes de publicar, ou quando o site parecer lento.
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
| HTML, CSS e JavaScript próprios, somados, sem imagens | 200 KB (critério de aceite AC-026) |
| JavaScript | 30 KB comprimido |
| CSS | 50 KB comprimido |
| Fontes | 2 famílias, 4 arquivos, 150 KB no total |
| Imagem do herói | 200 KB |
| Demais imagens | 100 KB cada |
| Scripts de terceiros | Zero por padrão. Cada um entra com justificativa. |

## HTML e CSS

- Site estático: o HTML chega pronto. Nada de conteúdo montado no navegador.
- Sem `@import` em CSS. Sem CSS que não é usado na página.
- Animações só em `transform` e `opacity`.
- `content-visibility: auto` em seções longas abaixo da primeira tela, com `contain-intrinsic-size`.

## JavaScript

- Nenhum `<script>` no `<head>` sem `type="module"`, `defer` ou `async` (critério de aceite AC-027).
- Só menu e formulário. Sem framework no navegador, sem jQuery, sem biblioteca de carrossel ou de animação.
- Mapa: imagem ou SVG. Se o mapa do Google for exigido, carregar só depois de um clique.

## Fontes

- Arquivos WOFF2 em `public/fontes/`, servidos pelo próprio domínio. Nada de Google Fonts por CDN.
- `font-display: swap` em todo `@font-face`.
- Só os pesos usados. Subconjunto latino. Fonte variável quando existir.
- `<link rel="preload" as="font" type="font/woff2" crossorigin>` só para a fonte do título do herói.
- Fonte reserva com métricas ajustadas (`size-adjust`, `ascent-override`) para o texto não pular na troca.

## Imagens

- Formato AVIF ou WebP. SVG para logotipo e ícones.
- `width` e `height` em toda imagem (critério de aceite AC-028).
- `loading="lazy"` e `decoding="async"` fora da primeira tela.
- Imagem do herói: `fetchpriority="high"`, sem `lazy`.
- `srcset` e `sizes` com 3 larguras quando as imagens finais chegarem.
- Substitutos de imagem são CSS puro, sem arquivo.
- Logotipos de clientes em SVG ou em uma única imagem otimizada.

## Vercel

- Arquivos com hash no nome: `Cache-Control: public, max-age=31536000, immutable`.
- Fontes: mesmo cache longo.
- HTML: sem cache longo, para publicação imediata.
- Compressão Brotli já vem ativa.
- Configurar em `vercel.json`, junto dos cabeçalhos de segurança.

## Terceiros

Medição (Analytics, Tag Manager, pixel) depende da pergunta em aberto Q-005. Se entrar: carregar depois da interação ou do consentimento, nunca no `<head>` de forma bloqueante, e incluir o domínio na política de conteúdo (ver `connect-security`).

## Como medir

1. `astro build` e conferir o peso em `dist/` (o teste do AC-026 faz isso).
2. Lighthouse no celular contra a pré-visualização da Vercel.
3. PageSpeed Insights depois de publicar.
4. Registrar os números na tarefa. Piorou em relação à medição anterior, não entra.
