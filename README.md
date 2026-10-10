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
| Logotipos dos clientes | `public/clientes/` |
| Textos das soluções e suas perguntas frequentes | `src/data/servicos.ts` |
| Textos da página inicial | `src/data/inicio.ts` |
| Textos de Trabalhe Conosco | `src/data/vagas.ts` |
| Cores, fontes e medidas | `src/styles/tokens.css` |
| Cabeçalhos de segurança | `next.config.mjs` |

## Fotos

As fotos de `Dados/Imagens Novo site/` foram convertidas para WebP e estão em `public/imagens/`, com o nome de cada espaço. O manifesto `src/data/imagens.ts` diz de qual arquivo cada uma veio. São seis fotos para nove espaços, então três se repetem; o campo `pedido` do manifesto indica quais.

Para trocar uma foto, salve o novo arquivo em `public/imagens/` com o mesmo nome (WebP, na largura do manifesto) e gere o site de novo. Exemplo de conversão: `cwebp -q 76 -resize 1280 0 foto.png -o public/imagens/operacao.webp`. Sem o arquivo, o site mostra um substituto da marca na mesma proporção.

## Formulários

Os formulários de contato e de vagas enviam para o endereço da variável de ambiente `FORMULARIO_WEBHOOK_URL` (veja `.env.example`). Sem essa variável, o formulário valida os campos e mostra os contatos diretos em vez de enviar. O destino final ainda precisa ser definido com o cliente.

## Publicar

O projeto está ligado à Vercel e ao repositório do GitHub: cada envio para `main` publica em https://connectexpresslog.vercel.app.

Enquanto a variável `SITE_NO_AR` não for `sim` na Vercel, o site responde com `X-Robots-Tag: noindex` e fica fora dos buscadores. Defina essa variável só no lançamento, junto com o domínio oficial.

## Layout

O layout segue a referência Cargomaxis (nó 1-10 do Figma): cartões arredondados, navegação e botões em pílula, rodapé com letreiro. As versões A e C, usadas na comparação, foram removidas em 2026-10-10.

## Pendências antes de ir ao ar

- Confirmar o décimo estado atendido (o site lista nove nomes e fala em dez).
- Definir o destino dos formulários.
- Revisar o texto da Política de Privacidade com o cliente.
- Receber o logotipo em SVG e três fotos para os espaços que hoje repetem imagem.
- Confirmar a lista de clientes exibida.

## Skills do projeto

As regras de design, copy, frontend, SEO, GEO, velocidade, responsividade e segurança estão em `.claude/skills/connect-*`.
