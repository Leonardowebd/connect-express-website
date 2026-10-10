---
name: connect-design-concept
description: Conceito de design do site da Connect Express Log - a ideia central, o que tirar de cada referência e o que evitar. Use ao decidir a direção visual de uma seção nova, ao adaptar algo que o Figma não cobre, ou ao revisar se uma tela "parece Connect Express".
---

# Conceito de design: Connect Express Log

## A ideia em uma frase

Uma operação de saúde que já é grande, mostrada com a calma de quem entrega no prazo: muito espaço, números grandes, poucas cores, nenhuma decoração que não informe.

## Por que este conceito

O diagnóstico do projeto (`Dados/Sobre Connect/Connecte_Express_Projeto_.pptx`) diz que a operação é maior do que a comunicação faz parecer. O site antigo (`Dados/Site-antigo.png`) comunica o contrário do que a empresa é: blocos verdes e laranjas saturados disputando atenção, cartões com borda e sombra, banners com texto dentro de imagem. O novo site precisa transmitir escala, precisão e cuidado com a carga.

## Princípios

1. **Prova antes de promessa.** Números reais, nomes de clientes e cobertura aparecem cedo e grandes. Adjetivo sem dado não entra.
2. **Uma cor por vez.** Fundo neutro como base. Verde identifica a marca, laranja é reservado para a ação. Nunca um bloco verde ao lado de um bloco laranja.
3. **Espaço é sinal de confiança.** Seções respiram. Conteúdo em largura contida, margens generosas.
4. **Texto é texto.** Nenhuma informação fica presa dentro de imagem. Títulos, números e estados são HTML.
5. **Cantos e superfícies consistentes.** Um raio para cartões, um para botões. Sombra só onde há elevação real.
6. **Funciona sem foto.** O layout precisa ficar de pé com os substitutos de imagem, porque as fotos chegam depois.

## O que tirar de cada referência

**Figma (fonte principal do layout):** nós `1-11` e `1-1196`. A estrutura, a ordem das seções, a grade e os componentes saem dali. As referências abaixo só orientam quando o Figma não responde.

**`Referencias/B2B logistics corporate website template` (Cargomaxis):**

- Herói com imagem ocupando a largura e cartão de texto sobreposto.
- Bloco "fatos rápidos": título à esquerda, grade de números à direita.
- Faixa escura com logotipos de clientes.
- Lista de serviços em linhas, com botão à direita, em vez de cartões.
- Seção de valores em bloco escuro com três colunas.
- Rótulo pequeno sublinhado acima de cada título de seção.

**`Referencias/Logistics Landing Page UI_UX Design` (SwiftMove):**

- Títulos condensados em caixa alta, muito pesados.
- Linha de indicadores logo abaixo do herói.
- Cartões de serviço em grade 2 por 2, com etiqueta no canto e botão "saiba mais".
- Bloco "setores atendidos" como lista com seta, sobre imagem.
- Cartão de métrica em destaque (um número grande em fundo de cor sólida).
- Chamada final sobre imagem, com um único botão.

**`Dados/DESIGN.md` e `Dados/SKILL.md` (Terminal Yard Operating System):** servem pelo método (tokens semânticos, estados obrigatórios de componente, portões de qualidade). As cores, a fonte SuisseIntl e o fundo preto NÃO são da Connect Express.

## O que não repetir do site antigo

- Texto dentro de banners em imagem.
- Seis cartões verdes idênticos para os valores.
- Mapa do Brasil como imagem sem a lista de estados em texto.
- Carrossel no herói.
- Dois botões de cores diferentes com o mesmo peso lado a lado.
- Faixa de WhatsApp repetida acima e abaixo do conteúdo.

## Ordem de seções recomendada para a página inicial

Vale até o Figma confirmar ou corrigir:

1. Herói: proposta de valor, cotação, soluções.
2. Números da operação.
3. Clientes.
4. Soluções.
5. Diferenciais da operação farmacêutica.
6. Cobertura.
7. Quem Somos e valores.
8. Perguntas frequentes.
9. Chamada final de cotação.
10. Contato e localização.

## Teste rápido de aderência

Uma tela está no conceito quando: dá para entender o que a empresa faz sem ler além do título; o laranja aparece só em ações; nenhum texto está em imagem; ela continua organizada com os substitutos de imagem.
