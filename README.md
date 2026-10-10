# Connect Express Log: site institucional

Site da Connect Express Log, transportadora especializada em logística para a saúde.
Feito com Next.js (App Router), React e GSAP. Publicado na Vercel.

## Rodar

```bash
npm install
npm run dev      # desenvolvimento, em http://localhost:3000
npm run build    # gera o site
npm run start    # serve o site gerado
```

## Testar

Cada critério de aceite da especificação tem um teste que lê o site gerado.

```bash
npm test
node .claude/skills/onp-spec-driven/scripts/onp-spec.mjs verify connect-express-website
node .claude/skills/onp-spec-driven/scripts/onp-spec.mjs audit
```

A especificação fica em `.spec/features/connect-express-website/spec.md`.

## Onde mexer

| Para mudar | Arquivo |
|---|---|
| Telefones, endereços, estados, números, clientes | `src/data/empresa.ts` |
| Textos das soluções e suas perguntas frequentes | `src/data/servicos.ts` |
| Textos da página inicial | `src/data/inicio.ts` |
| Textos de Trabalhe Conosco | `src/data/vagas.ts` |
| Cores, fontes e medidas | `src/styles/tokens.css` |
| Cabeçalhos de segurança | `next.config.mjs` |

## Trocar um substituto por uma foto

As fotos finais ainda não existem. Cada espaço de imagem está descrito em `src/data/imagens.ts`, com nome de arquivo, proporção e o que a foto precisa mostrar.

1. Salve a foto em `public/imagens/` com o nome que está no campo `arquivo` (por exemplo, `heroi-inicio.webp`).
2. Gere o site de novo.

Nenhuma página precisa ser alterada.

## Formulários

Os formulários de contato e de vagas enviam para o endereço da variável de ambiente `FORMULARIO_WEBHOOK_URL` (veja `.env.example`). Sem essa variável, o formulário valida os campos e mostra os contatos diretos em vez de enviar. O destino final ainda precisa ser definido com o cliente.

## Publicar

O projeto está ligado à Vercel e ao repositório do GitHub: cada envio para `main` publica em https://connectexpresslog.vercel.app.

Enquanto a variável `SITE_NO_AR` não for `sim` na Vercel, o site responde com `X-Robots-Tag: noindex` e fica fora dos buscadores. Defina essa variável só no lançamento, junto com o domínio oficial.

## Versões A e B

- Versão A: `/`, layout editorial (referência CargoKite).
- Versão B: `/b/`, só a página inicial, layout em cartões arredondados (referência Cargomaxis, nó 1-10 do Figma).

As duas usam os mesmos dados de `src/data/`. Depois da escolha, a versão descartada sai do código.

## Pendências antes de ir ao ar

- Confirmar o décimo estado atendido (o site lista nove nomes e fala em dez).
- Definir o destino dos formulários.
- Revisar o texto da Política de Privacidade com o cliente.
- Receber o logotipo em SVG e as fotos.
- Confirmar a lista de clientes exibida.

## Skills do projeto

As regras de design, copy, frontend, SEO, GEO, velocidade, responsividade e segurança estão em `.claude/skills/connect-*`.
