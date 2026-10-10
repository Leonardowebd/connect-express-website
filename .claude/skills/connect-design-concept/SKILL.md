---
name: connect-design-concept
description: Conceito de design do site da Connect Express Log - a ideia central, o que tirar de cada referência do Figma e o que evitar. Use ao desenhar uma seção, ao decidir a direção visual de algo novo, ou ao revisar se uma tela "parece Connect Express".
---

# Conceito de design: Connect Express Log

## Ponto de partida

O Figma do projeto (lido em 2026-10-10) NÃO tem um layout pronto da Connect Express. Ele tem três seções:

- **Identidade** (`node-id=1-3472`): logotipo, três cores, duas fontes. Ver `connect-id-visual`.
- **REFERENCIA** (`node-id=1-1196`): uma página inteira de outro site (CargoKite), com 1724 px de largura. É a referência principal de estrutura e de ritmo.
- **Referencias** (`node-id=1-11`): dois layouts completos (Cargomaxis e SwiftMove, os mesmos da pasta `Referencias/`) e três heróis (Logistica OS, "AI that automates your pallet accounting", BeyRoute).

O layout da Connect Express é desenhado a partir dessas referências, com a identidade da marca. Nada é copiado: estrutura e ritmo servem de guia, conteúdo, cores e fontes são da Connect.

## A ideia em uma frase

Uma operação de saúde que já é grande, mostrada com a calma de quem entrega no prazo: página editorial clara, tipografia grande, muito espaço, laranja só onde importa, números e clientes como prova.

## Por que este conceito

O diagnóstico do projeto (`Dados/Sobre Connect/Connecte_Express_Projeto_.pptx`) diz que a operação é maior do que a comunicação faz parecer. O site antigo (`Dados/Site-antigo.png`) comunica o contrário do que a empresa é: blocos verdes e laranjas saturados disputando atenção, cartões com borda e sombra, banners com texto dentro de imagem. O novo site precisa transmitir escala, precisão e cuidado com a carga.

## Princípios

1. **Prova antes de promessa.** Números reais, nomes de clientes e cobertura aparecem cedo e grandes.
2. **Verde domina.** Fundo branco e cinza claro como base, blocos fortes em verde, laranja para ação e para a palavra destacada do título, azul para links e detalhes. Sem bloco preto.
3. **Espaço é sinal de confiança.** Seções respiram. Coluna de texto estreita, margens generosas.
4. **Texto é texto.** Nenhuma informação fica presa dentro de imagem.
5. **Cantos arredondados.** Blocos em cartões de raio grande e botões em pílula, como na referência adotada.
6. **Funciona sem foto.** As fotos chegam depois; o layout precisa ficar de pé com os substitutos.

## O que tirar de cada referência

### CargoKite (referência principal, `1-1196`)

Ordem das seções na referência e a tradução para a Connect:

| Na referência | Na Connect Express |
|---|---|
| Herói em tela cheia sobre imagem escura, título grande à esquerda, parágrafo curto à direita com trechos em laranja, faixa de logotipos na base | Herói com proposta de valor, frase com os dados em destaque, logotipos de clientes na base |
| "Company": rótulo pequeno à esquerda, título grande, coluna de texto com foto e link | Quem Somos |
| "Problem": título e blocos de imagem com legenda em grade assimétrica, sobre cinza claro | O desafio da última milha na saúde: o que dá errado quando a entrega de medicamento não é especializada |
| "Solution": título centralizado com palavra em laranja e esquema central com quatro chamadas ao redor | Como a operação funciona, em quatro pontos |
| "Technology": bloco preto com mosaico de quadrados, um quadrado laranja com o título e outro com a chamada | Soluções ou diferenciais em mosaico escuro, cada quadrado com um dado |
| "Why us": título com palavra em laranja, botão, e quadrados cinza em escada com ícone de traço laranja | Por que a Connect, com três motivos |
| "Trusted by": título centralizado, botão, grade de logotipos com linhas finas | Clientes |
| "FAQ": rótulo e título à esquerda, lista com sinal de mais à direita | Perguntas frequentes |
| Rodapé cinza claro com cartão preto sobreposto, navegação em linha, endereço e contatos em tipo grande | Rodapé com cartão escuro de cotação no lugar do boletim |

Detalhes de estilo a manter: rótulo de seção pequeno e cinza à esquerda do título; título em peso médio com entrelinha apertada; palavra-chave do título em laranja; links sublinhados em laranja; botão retangular laranja; ícones de traço fino em laranja; alternância entre branco, cinza claro e um bloco preto.

### Cargomaxis (`Referencias/B2B logistics corporate website template`)

- Bloco "fatos rápidos": título à esquerda, grade de números à direita. Usar para os números da operação.
- Lista de serviços em linhas com botão à direita. Alternativa aos cartões de solução.
- Chamada final sobre imagem com um único botão.

### SwiftMove (`Referencias/Logistics Landing Page UI_UX Design`)

- Linha de indicadores logo abaixo do herói.
- Cartões de serviço em grade 2 por 2 com etiqueta no canto.
- Bloco "setores atendidos" como lista com seta. Usar para os públicos: farmácias, laboratórios, clínicas, e-commerce.
- Cartão de métrica em destaque, com um número grande em fundo de cor sólida.

### Os três heróis

- Logistica OS e "pallet accounting": título em caixa alta centralizado sobre fundo azul. Aproveitar só a composição (título, subtítulo, um botão, faixa de logotipos). Não aproveitar o azul nem a caixa alta.
- BeyRoute: foto escura em tela cheia, título à esquerda, indicador grande no canto inferior ("5M+"), cartão pequeno de prova à direita. É a composição mais próxima do herói da Connect.

### `Dados/DESIGN.md` e `Dados/SKILL.md` (Terminal Yard Operating System)

Servem pelo método (tokens semânticos, estados obrigatórios de componente, portões de qualidade). Cores, fonte e fundo preto não são da Connect Express.

## O que não repetir do site antigo

- Texto dentro de banners em imagem.
- Seis cartões verdes idênticos para os valores.
- Mapa do Brasil como imagem sem a lista de estados em texto.
- Carrossel no herói.
- Dois botões de cores diferentes com o mesmo peso lado a lado.
- Faixa de WhatsApp repetida acima e abaixo do conteúdo.

## Ordem de seções da página inicial

1. Herói: proposta de valor, cotação, faixa de clientes.
2. Números da operação.
3. Quem Somos.
4. O desafio da última milha na saúde.
5. Soluções (as quatro).
6. Como a operação funciona e por que a Connect.
7. Cobertura.
8. Valores.
9. Clientes.
10. Perguntas frequentes.
11. Contato, com formulário e localização.
12. Rodapé com cartão de cotação.

## Layout adotado

Depois de comparar três versões da página inicial, o dono do projeto escolheu em 2026-10-10 a que segue a referência **Cargomaxis** (nó `1-10` do Figma). Ela vale para o site inteiro. As tabelas acima, sobre CargoKite e SwiftMove, ficam como registro do que foi testado e descartado.

Marcas do layout:

- Blocos em cartões bem arredondados, com margem pequena em relação à borda da tela.
- Navegação em pílulas: sobre a foto do herói na página inicial, sobre fundo claro nas páginas internas.
- Herói em cartão de foto, com o título em uma caixa de vidro no canto inferior esquerdo.
- Fatos rápidos: título à esquerda, números à direita, faixa clara com os logotipos dos clientes.
- Soluções em linhas, cada uma com botão em pílula e seta em círculo.
- Bloco verde arredondado para diferenciais, com selo numerado laranja e linha tracejada.
- Cobertura em foto e cartões.
- Chamada sobre foto.
- Perguntas frequentes em cartões.
- Cotação em painel: cartão verde com os contatos ao lado do formulário.
- Rodapé verde com o letreiro "Connect Express".

Ordem das seções da página inicial: herói, fatos rápidos, soluções, por que a Connect, quem somos e valores, cobertura, chamada, perguntas frequentes, cotação.

Componentes em `src/components/secoes/`.

## Movimento

Entradas discretas ao rolar, números que contam, e nada mais. Regras em `connect-ui-design` e `connect-frontend`.

## Teste rápido de aderência

Uma tela está no conceito quando: dá para entender o que a empresa faz sem ler além do título; o laranja aparece só em ações e destaques; nenhum texto está em imagem; ela continua organizada com os substitutos de imagem; ao lado da referência CargoKite, tem o mesmo ritmo de espaço e de tipografia.
