---
name: connect-id-visual
description: Identidade visual da Connect Express Log - logotipos, paleta, tipografia e regras de uso da marca. Use antes de definir qualquer cor, fonte, logotipo ou token no site, ao criar ou revisar `tokens.css`, ou quando alguém perguntar "qual é a cor/fonte da marca".
---

# Identidade visual: Connect Express Log

Fonte da verdade, em ordem de prioridade:

1. Figma, seção "Identidade": `https://www.figma.com/design/skgCHymwiw2aKVL59plhxy/Connect-Express?node-id=1-3472`
2. Pasta `ID Visual/` do projeto.
3. Este arquivo.

Se o Figma e este arquivo divergirem, o Figma vence e este arquivo deve ser atualizado na mesma tarefa.

## O que o Figma define (lido em 2026-10-10)

A seção "Identidade" contém só quatro coisas: o logotipo, três cores, a fonte primária e a fonte secundária. Não há neutros, escala tipográfica, espaçamentos nem componentes. Tudo o que não está nas tabelas "Marca" abaixo é decisão de projeto, marcada como tal.

## Logotipos

| Arquivo | Uso |
|---|---|
| `ID Visual/logo-connectexpress-log.png` | Versão colorida, para fundos claros. |
| `ID Visual/logo-connectexpress-log-verde.png` | Versão com letras brancas, para fundos escuros ou verdes. |

Regras:

- O logotipo nunca é recolorido, distorcido, girado ou recebe sombra.
- Área de respiro mínima: a altura da letra "C" em todos os lados.
- Largura mínima em tela: 120 px.
- Só existem versões em PNG de 900 por 486 px. Pedir ao cliente o arquivo vetorial (SVG). Enquanto não chegar, usar o PNG por `next/image`.
- Texto alternativo: "Connect Express Log".
- O nome da empresa em texto corrido é "Connect Express Log". Nunca "Connecte".

## Cores

### Marca (do Figma)

| Token | Valor | Papel |
|---|---|---|
| `--cor-laranja` | `#F3570B` | Ação e destaque. Botão principal, palavra destacada em título, ícones. |
| `--cor-verde` | `#47A81B` | Assinatura da marca. Detalhes, selos de confirmação, bloco de marca. |
| `--cor-azul` | `#0E7BD6` | Apoio. Links, detalhes de mapa e de dados. |

Regra de uso, definida pelo dono do projeto em 2026-10-10: **o verde domina**.

- Verde: blocos fortes (herói, mosaico de soluções, bloco de diferenciais, cartão do rodapé), réguas e detalhes de marca. Os blocos usam o verde escuro, com texto branco, por contraste.
- Laranja: botões e a palavra destacada dos títulos sobre fundo claro.
- Azul: links, siglas dos estados, numeração e foco do teclado.
- Preto: só texto. Não há bloco preto no site.
- Sobre verde, laranja não tem contraste para texto: destaques e links ficam brancos. Laranja sobre verde só como bloco ou botão, com texto escuro.

### Decisão de projeto (não está no Figma)

| Token | Valor | Papel |
|---|---|---|
| `--cor-laranja-escuro` | `#C2410C` | Texto laranja pequeno e fundo de botão com texto branco pequeno. |
| `--cor-verde-escuro` | `#2F7A0E` | Fundo dos blocos fortes, com texto branco. |
| `--cor-verde-profundo` | `#17420A` | Fundo do herói, ladrilhos do mosaico e rodapé da versão B. |
| `--cor-azul-escuro` | `#0A5FA8` | Links em texto corrido. |
| `--cor-tinta` | `#111111` | Texto principal e blocos escuros. |
| `--cor-tinta-suave` | `#5B6168` | Texto secundário e rótulos. |
| `--cor-linha` | `#D9DEE3` | Bordas e divisores. |
| `--cor-nevoa` | `#E9ECEF` | Fundo de seção alternada. |
| `--cor-papel` | `#F5F5F5` | Fundo de cartão. É o fundo da seção de identidade no Figma. |
| `--cor-branco` | `#FFFFFF` | Fundo base. |

As variações escuras existem por contraste. Conferir cada par com uma ferramenta antes de fechar `tokens.css`.

### Contraste das cores de marca contra branco

- Laranja `#F3570B`: cerca de 3,4:1. Serve para título grande (24 px ou mais, ou 18,66 px em negrito) e elementos gráficos. Não serve para texto pequeno.
- Verde `#47A81B`: cerca de 3,1:1. Mesma restrição.
- Azul `#0E7BD6`: cerca de 4,4:1. Abaixo do mínimo de 4,5:1 por pouco. Para texto corrido, usar o azul escuro.

## Tipografia (do Figma)

| Papel | Família | Uso |
|---|---|---|
| Primária | **Geologica** (peso Medium, 500, no Figma) | Títulos, números da operação, botões, navegação. |
| Secundária | **Poppins** (peso Regular, 400, no Figma) | Texto corrido, legendas, formulários. |

As duas são distribuídas pelo Google Fonts com licença aberta (OFL). Geologica é fonte variável.

Decisão de projeto:

- Geologica: pesos 400, 500 e 600. Eixos `CRSV`, `SHRP` e `slnt` em zero, como no Figma.
- Poppins: pesos 400, 500 e 600.
- Carregar com `next/font/google`, que baixa os arquivos no build e serve pelo próprio domínio. Nenhuma requisição ao Google no navegador.
- Escala de tamanhos, altura de linha e espaçamento entre letras ficam em `connect-ui-design`.

## Como aplicar no código

- Todo valor de cor, fonte, raio, sombra e espaçamento vive em `src/styles/tokens.css` como propriedade CSS (`--cor-*`, `--fonte-*`, `--espaco-*`, `--raio-*`).
- Nenhum outro arquivo CSS ou componente contém valor hexadecimal. O critério de aceite AC-036 testa isso.
- Tokens de papel (`--cor-acao`, `--cor-texto`, `--cor-fundo`) apontam para os tokens acima. Componentes usam só os tokens de papel.

## Não fazer

- Não usar os tokens de `Dados/DESIGN.md` nem de `Dados/SKILL.md`: descrevem outra marca (Terminal Yard Operating System).
- Não usar as fontes das referências (Helvetica Now Display, condensadas em caixa alta). A marca usa Geologica e Poppins.
- Não usar o azul vivo das referências SwiftMove e Logistica OS como cor dominante. O azul da marca é apoio.
- Não usar laranja ou verde de marca em texto pequeno.
- Não usar bloco preto.
- Não misturar as três cores com o mesmo peso em uma seção. Uma domina, as outras pontuam.
