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

O pedido de contato é registrado por e-mail e, em seguida, o visitante é levado ao WhatsApp comercial com os mesmos dados já escritos. O cadastro de vagas só envia o e-mail.

- Na Hostinger, quem envia são os scripts PHP de `hostinger/api`. Destinos e remetente ficam em `hostinger/api/config.php`.
- Na Vercel (prévia), o envio depende da variável `FORMULARIO_WEBHOOK_URL`. Sem ela, o formulário mostra os contatos diretos.

## Publicar na Hostinger

O site vai como arquivos estáticos, com PHP só para os formulários. Funciona em qualquer plano de hospedagem da Hostinger.

1. **Gerar o pacote:** `npm run hostinger`. O arquivo sai em `hostinger/site-hostinger.zip`.
2. **Criar as caixas de e-mail** no hPanel, em E-mails: `site@connectexpresslog.com.br` (remetente dos avisos), `comercial@` e `vagas@` (destinos). O remetente precisa existir, senão as mensagens caem em spam ou são recusadas.
3. **Conferir o PHP:** em Avançado > Configuração PHP, versão 8.1 ou mais nova.
4. **Guardar o site antigo:** no Gerenciador de Arquivos, baixe ou renomeie a `public_html` atual (o WordPress antigo) antes de substituir.
5. **Enviar o pacote:** envie o zip para `public_html` e extraia ali. O `.htaccess` e a pasta `api` precisam ficar na raiz de `public_html`. Arquivos que começam com ponto só aparecem com "mostrar ocultos" ligado.
6. **Ligar o SSL** do domínio no hPanel (Segurança > SSL), se ainda não estiver ativo.
7. **Testar no ar:** abrir o site, enviar o formulário de contato com um e-mail seu, conferir a chegada em `comercial@` e a abertura do WhatsApp. Repetir em Trabalhe Conosco.

Para mudar um destino depois, edite `api/config.php` direto no servidor e também `hostinger/api/config.php` aqui, para o próximo pacote não desfazer a mudança.

Diferenças em relação à Vercel: as imagens vão no tamanho em que estão em `public/` (não há redimensionamento sob demanda), e os cabeçalhos de segurança vêm do `.htaccess`, gerado de `next.config.mjs`.

## Publicar na Vercel (prévia)

`vercel deploy --prod --yes --scope leonardos-projects-dd01b80e`. O endereço `connectexpresslog.vercel.app` fica fora dos buscadores.

## Layout

O layout segue a referência Cargomaxis (nó 1-10 do Figma): cartões arredondados, navegação e botões em pílula, rodapé com letreiro. As versões A e C, usadas na comparação, foram removidas em 2026-10-10.

## Pendências antes de ir ao ar

- Confirmar o décimo estado atendido (o site lista nove nomes e fala em dez).
- Testar o envio dos formulários no servidor da Hostinger (os scripts PHP ainda não rodaram em servidor real).
- Dizer na Política de Privacidade que o pedido de contato também é levado ao WhatsApp.
- Revisar o texto da Política de Privacidade com o cliente.
- Receber o logotipo em SVG e três fotos para os espaços que hoje repetem imagem.
- Confirmar a lista de clientes exibida.

## Skills do projeto

As regras de design, copy, frontend, SEO, GEO, velocidade, responsividade e segurança estão em `.claude/skills/connect-*`.
