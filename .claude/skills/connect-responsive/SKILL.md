---
name: connect-responsive
description: Responsividade do site da Connect Express Log - pontos de quebra, comportamento de cada seção por largura, toque, tipografia fluida e lista de aparelhos para conferência. Use ao escrever CSS de layout, ao adaptar um quadro de desktop do Figma para celular e tablet, ou ao revisar uma página em telas diferentes.
---

# Responsividade: Connect Express Log

## Abordagem

Celular primeiro. O CSS base serve 360 px; `@media (min-width: ...)` acrescenta para telas maiores. O conteúdo é o mesmo em todas as larguras: nada é escondido no celular por falta de espaço, só reorganizado.

## Pontos de quebra

| Nome | Largura mínima | Aparelhos |
|---|---|---|
| base | 0 | Celulares, a partir de 360 px (e 320 px sem quebrar) |
| `md` | 768 px | Tablets em pé, celulares grandes deitados |
| `lg` | 1024 px | Tablets deitados, notebooks pequenos |
| `xl` | 1280 px | Desktops |

Conteúdo com largura máxima de 1200 px. Acima de 1440 px só as margens crescem.

Se o Figma trouxer quadros de celular e de desktop, eles definem os extremos; tablet é interpolado por estas regras.

## Comportamento por seção

| Seção | Celular | Tablet (`md`) | Desktop (`lg` ou maior) |
|---|---|---|---|
| Cabeçalho | Logotipo, botão de menu | Igual ao celular | Navegação completa, atalhos, botão de cotação |
| Herói | Texto, botões empilhados, imagem abaixo | Texto e imagem empilhados | Texto e imagem lado a lado ou sobrepostos |
| Números | 2 colunas | 4 colunas | 4 colunas |
| Clientes | Grade de 2 ou 3 colunas, quebra em linhas | 4 colunas | Linha única |
| Soluções | 1 coluna | 2 colunas | 2 ou 4 colunas, conforme o Figma |
| Valores | 1 coluna | 2 colunas | 3 colunas |
| Cobertura | Lista de estados, depois mapa | Lado a lado | Lado a lado |
| Contato | Formulário, depois dados | Lado a lado | Lado a lado |
| Rodapé | 1 coluna, blocos empilhados | 2 colunas | 4 colunas |

## Técnicas

- Grade com `display: grid` e `repeat(auto-fit, minmax(...))` onde a quantidade de colunas pode variar sozinha.
- Tipografia fluida: `font-size: clamp(mínimo, valor com vw, máximo)`. Texto corrido nunca abaixo de 16 px.
- Espaçamento de seção fluido com `clamp()` entre 64 e 128 px.
- Unidades relativas (`rem`, `%`, `fr`). Largura fixa em px só em ícones.
- Imagens com `max-width: 100%`, `height: auto` e `aspect-ratio`. Usar `srcset` e `sizes` quando as imagens finais chegarem.
- Altura de tela cheia com `100dvh`, nunca `100vh` sozinho.
- `<meta name="viewport" content="width=device-width, initial-scale=1">`. Nunca bloquear o zoom.

## Toque

- Alvo mínimo de 44 por 44 px, com 8 px entre alvos vizinhos.
- Campos de formulário com fonte de 16 px ou mais, para o iOS não dar zoom.
- Nada depende de hover. O que aparece no hover também aparece no foco e no toque.
- Botão flutuante de WhatsApp não cobre conteúdo nem o botão de envio do formulário; respeita `env(safe-area-inset-bottom)`.

## Menu no celular

- Botão com `aria-expanded` e `aria-controls`.
- Painel ocupa a tela, com rolagem própria; a página por trás não rola.
- Fecha com Esc, ao tocar em um link e ao aumentar a tela para desktop.
- Foco vai para o primeiro link ao abrir e volta ao botão ao fechar.

## Conferência

Larguras obrigatórias: 320, 360, 390, 768, 1024, 1280, 1440 px. Em cada uma:

1. Sem rolagem horizontal.
2. Sem texto cortado ou sobreposto, inclusive com zoom do navegador em 200%.
3. Títulos longos quebram sem estourar o contêiner.
4. Botões alcançáveis e com tamanho de toque.
5. Imagens e substitutos mantêm a proporção.
6. Celular deitado continua utilizável.

Aparelhos de referência: iPhone SE, iPhone 15, Android de 360 px, iPad em pé e deitado, notebook de 1366 px, monitor de 1920 px.
