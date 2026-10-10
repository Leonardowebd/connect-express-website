---
name: connect-seo
description: SEO do site da Connect Express Log - termos por página, títulos e descrições, endereços e redirecionamentos da migração, dados estruturados, sitemap e SEO local. Use ao criar ou alterar uma página, ao escrever título, descrição ou cabeçalhos, ao mexer em rotas, ou antes de publicar o site no domínio.
---

# SEO: Connect Express Log

## Objetivo

Aparecer para quem procura logística e entrega de medicamentos para empresas, sem perder o que o site atual já tem indexado.

## Termos por página

Um termo principal por página. Ele aparece no título, no `h1`, no primeiro parágrafo e no endereço.

| Página | Endereço | Termo principal | Termos de apoio |
|---|---|---|---|
| Início | `/` | logística para farmácias | transportadora de medicamentos, delivery para farmácias, última milha farma |
| Medicamentos | `/servicos/entrega-expressa-de-medicamentos/` | entrega expressa de medicamentos | transporte de medicamentos, logística farmacêutica, ANVISA |
| Biológicos | `/servicos/transporte-de-materiais-biologicos/` | transporte de materiais biológicos | transporte de amostras, biossegurança, laboratórios |
| Motoboy | `/servicos/entregas-rapidas-com-motoboy/` | entregas rápidas com motoboy | motoboy para empresas, entrega no mesmo dia |
| E-commerce | `/servicos/transporte-e-logistica-para-e-commerce/` | logística para e-commerce | entrega D1 e D2, cross docking |
| Vagas | `/trabalhe-conosco/` | trabalhe conosco Connect Express | seja entregador, vagas motoboy |
| Privacidade | `/politica-de-privacidade/` | (sem termo) | |

Os termos são hipótese inicial. Validar volume em ferramenta de palavras-chave antes de publicar.

## Em cada página

- `<title>` único, até 60 caracteres, termo no início e "Connect Express Log" no fim.
- `<meta name="description">` única, 70 a 160 caracteres, com resultado e um dado.
- `<link rel="canonical">` absoluto, com `https://www.connectexpresslog.com.br` e barra no final.
- `<html lang="pt-BR">`.
- Open Graph: `og:title`, `og:description`, `og:image` (1200 por 630), `og:type`, `og:url`, `og:locale` com `pt_BR`. Cartão do Twitter em `summary_large_image`.
- Um `h1`. `h2` para seções, `h3` para itens. Sem saltar nível.
- Texto alternativo descritivo nas imagens.
- Ligações internas: cada página de solução aponta para as outras três e para o contato. Texto do link descreve o destino.

Esses itens são cobertos pelos critérios de aceite AC-019 e AC-020.

## Migração sem perder posição

- Manter exatamente os endereços do site atual listados na tabela.
- Redirecionamento 301 na função `redirects()` de `next.config.ts` para qualquer endereço antigo que mude ou deixe de existir. Levantar a lista com `site:connectexpresslog.com.br` e com o Search Console antes de trocar o domínio.
- Âncoras antigas (`/#sobre`, `/#servicos`, `/#contato`) continuam existindo como `id` na página inicial.
- `www` é o endereço oficial; a versão sem `www` e a `http` redirecionam para ele.
- Depois de publicar: enviar o sitemap no Search Console e acompanhar erros de rastreamento por 4 semanas.

## Arquivos do site

- `/sitemap.xml` gerado por `app/sitemap.ts`, com todas as páginas públicas e data de alteração.
- Título, descrição, canônico e Open Graph pela API `metadata` do Next em cada página, com `metadataBase` no layout.
- `/robots.txt` liberando o site e apontando para o sitemap (critério de aceite AC-021).
- Pré-visualizações da Vercel não podem ser indexadas: `X-Robots-Tag: noindex` fora do domínio de produção.
- Página 404 própria, com links para início, soluções e contato.

## Dados estruturados (JSON-LD)

| Onde | Tipo | Campos |
|---|---|---|
| Todas as páginas | `Organization` | `name`, `legalName`, `url`, `logo`, `telephone`, `email`, `address` (matriz e filial), `areaServed`, `sameAs`, `taxID` |
| Início | `WebSite` | `name`, `url`, `inLanguage` |
| Solução | `Service` | `name`, `description`, `provider`, `areaServed`, `serviceType` |
| Solução | `BreadcrumbList` | Início, Soluções, nome da solução |
| Páginas com perguntas | `FAQPage` | As mesmas perguntas e respostas visíveis |

Regras: os dados vêm de `src/data/empresa.ts` e `src/data/servicos.ts`, os mesmos que alimentam o texto visível. Nada em JSON-LD que não esteja na página. Validar no Rich Results Test antes de publicar.

## SEO local

- Perfil da empresa no Google para a matriz (Lauro de Freitas) e para a filial (São Paulo), com nome, endereço e telefone idênticos aos do site.
- Nome, endereço e telefone em texto no rodapé de todas as páginas.
- Estados atendidos em texto na seção de cobertura.

## Não fazer

- Texto escondido, repetição de termo, páginas quase iguais por cidade.
- Título ou descrição duplicados.
- Conteúdo importante só em imagem ou montado por JavaScript.
- Prometer na descrição um número que a página não mostra.
