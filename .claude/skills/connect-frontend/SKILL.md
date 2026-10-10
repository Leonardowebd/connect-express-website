---
name: connect-frontend
description: Padrões de frontend do site da Connect Express Log - Next.js, React e GSAP, estrutura de pastas, componentes de servidor e de cliente, animação, dados de conteúdo, sistema de substitutos de imagem e testes. Use ao criar ou alterar qualquer arquivo de código do site, ao montar uma página nova, ao adicionar uma animação ou uma imagem, ou ao escrever os testes dos critérios de aceite.
---

# Frontend: Connect Express Log

## Stack

Definida pelo dono do projeto em 2026-10-10:

- **Next.js** com App Router, em TypeScript, publicado na Vercel.
- **React** com componentes de servidor por padrão.
- **GSAP** para animação, com `@gsap/react`.

Decisões complementares (suposição até confirmação):

- **CSS Modules** com propriedades CSS (tokens). Sem Tailwind e sem biblioteca de componentes.
- Páginas geradas de forma estática no build. Nada de renderização por requisição nas páginas de conteúdo.
- Envio de formulário por Route Handler em `app/api/`.
- **Testes** com `node --test` lendo o HTML gerado pelo `next build`.

## Estrutura

```
src/
  app/
    layout.tsx                    html, fontes, cabeçalho, rodapé, JSON-LD da organização
    page.tsx                      página inicial
    servicos/[slug]/page.tsx      as quatro soluções, com generateStaticParams
    trabalhe-conosco/page.tsx
    politica-de-privacidade/page.tsx
    not-found.tsx
    sitemap.ts
    robots.ts
    llms.txt/route.ts
    api/contato/route.ts          recebe o formulário
    globals.css                   importa tokens e base
  components/                     um componente por pasta: Componente.tsx e Componente.module.css
  animacoes/                      componentes de cliente com GSAP
  data/
    empresa.ts                    contatos, endereços, números, redes, clientes
    servicos.ts                   as quatro soluções com texto e perguntas frequentes
    imagens.ts                    manifesto de espaços de imagem
  styles/
    tokens.css                    ÚNICO lugar com valores de cor, fonte e medida
    base.css                      reset, tipografia, utilitários
public/
  imagens/                        imagens finais, pelo nome do manifesto
tests/                            um arquivo por história de usuário
next.config.ts                    cabeçalhos de segurança, cache e redirecionamentos
```

## Servidor e cliente

- Todo componente é de servidor, a menos que precise de estado, evento ou GSAP.
- `'use client'` só nas folhas: menu do celular, formulário, e os componentes de `animacoes/`. Nunca em `layout.tsx`, em `page.tsx` ou em uma seção inteira.
- Um componente de cliente recebe o conteúdo como `children` vindo do servidor. Assim o texto continua no HTML e o JavaScript enviado fica pequeno.
- Cada página exporta `metadata` ou `generateMetadata` com título, descrição, canônico e Open Graph. `metadataBase` definido no layout.
- Rotas com barra no final (`trailingSlash: true`), iguais às do site antigo.

## GSAP

- Importar só o necessário: `gsap` e `ScrollTrigger`. Registrar plugins uma vez, em um módulo de cliente.
- Sempre com o gancho `useGSAP` de `@gsap/react` e um `scope` de referência, para a limpeza acontecer sozinha ao desmontar.
- **O conteúdo nasce visível.** Nunca esconder elemento por CSS esperando o GSAP revelar. Usar `gsap.from()` dentro do `useGSAP`, de modo que sem JavaScript, ou com falha de script, a página aparece inteira. Isso protege SEO, GEO e LCP.
- O título e a imagem do herói não recebem animação de entrada que atrase a primeira pintura.
- Animar só `transform` e `opacity`. Nada de `top`, `left`, `width`, `height` ou `margin`.
- `gsap.matchMedia()` com `(prefers-reduced-motion: reduce)`: nesse caso, nenhuma animação.
- Pontos de quebra dentro do `matchMedia`, alinhados aos de `connect-responsive`.
- Sem rolagem sequestrada, sem `pin` em seção longa no celular, sem suavização de rolagem.
- Duração entre 0,3 e 0,8 s para entradas; `ease: 'power2.out'` como padrão. Definir duração e curva em um arquivo de constantes.
- Componentes prontos em `animacoes/`: `Revelar` (entrada ao rolar), `Contador` (número que sobe) e `Escalonar` (entrada em sequência de filhos). Seções usam esses, não escrevem linha do tempo própria.
- O `Contador` mostra o número final no HTML; a animação só troca o texto durante a contagem.

## Regras de código

- **Conteúdo em dados.** Todo fato (telefone, endereço, estados, números, clientes, soluções) vem de `src/data/`. Componente não tem telefone escrito à mão.
- **Tokens.** Nenhum hexadecimal, `rgb()` ou `hsl()` fora de `tokens.css`. Módulos CSS usam `var(--...)`.
- **HTML semântico primeiro.** `button` para ação, `Link` para navegação interna, `details` para perguntas frequentes, `form` com `label`.
- **Fontes** com `next/font/local`, a partir dos arquivos da identidade. Nada de Google Fonts por CDN.
- **Imagens** com `next/image`, sempre com `width`, `height`, `alt` e `sizes`. `priority` só na imagem do herói.
- **Sem dependência nova** sem necessidade clara. Cada pacote entra com justificativa na tarefa.
- **Links externos** que abrem em nova aba levam `rel="noopener noreferrer"`.
- **TypeScript estrito.** Sem `any`.
- **Nomes em português** para componentes, dados e classes.

## Substitutos de imagem

As fotos chegam depois (`Dados/Imagens Novo site/` está vazia). O site precisa ficar completo sem elas.

`src/data/imagens.ts` é o manifesto. Cada espaço tem:

```ts
{
  id: 'heroi-inicio',
  arquivo: 'heroi-inicio.webp',
  largura: 1600,
  altura: 900,
  alt: 'Entregador da Connect Express com baú térmico',
  prioridade: true,
}
```

O componente de servidor `Imagem.tsx` recebe o `id`:

- Se `public/imagens/<arquivo>` existe na hora do build, gera `next/image` com as dimensões e o `alt` do manifesto.
- Se não existe, gera um bloco com a mesma proporção (`aspect-ratio`), fundo da marca e `role="img"` com o `alt` do manifesto.

Trocar uma imagem é colocar o arquivo com o nome do manifesto e gerar o site de novo. Nenhuma página muda. Isso atende aos critérios de aceite AC-038 e AC-039.

Mantenha no manifesto a lista das imagens pendentes, com proporção e descrição do que precisa aparecer, para passar a quem produz as fotos.

## Testes

- Um teste por critério de aceite, com `@spec:AC-xxx` no título. Sem isso o critério não existe para a auditoria.
- O teste roda depois de `next build` e lê o HTML das páginas geradas (em `.next/server/app/`) e o CSS e JavaScript de `.next/static/`. Confere o resultado descrito na especificação, não a forma do código.
- Um auxiliar em `tests/apoio.mjs` concentra a leitura do build, para que uma mudança de versão do Next seja corrigida em um só lugar.
- Teste pulado não vale como prova. Nunca enfraquecer um teste para passar.
- Fluxo: `onp-spec scaffold`, implementar, `onp-spec verify`, `onp-spec audit --ci`.
- Um commit por tarefa, com o código da tarefa na mensagem.

## Antes de entregar uma página

1. `next build` sem erro e sem aviso; a página aparece como estática no resumo do build.
2. Confere com o quadro do Figma em 360, 768 e 1440 px.
3. Navegável só por teclado.
4. Com JavaScript desligado, todo o conteúdo está visível e os links funcionam.
5. Com movimento reduzido ativo, nada se anima.
6. Testes dos critérios da tarefa passam em `onp-spec verify`.
