---
name: connect-id-visual
description: Identidade visual da Connect Express Log - logotipos, paleta, tipografia e regras de uso da marca. Use antes de definir qualquer cor, fonte, logotipo ou token no site, ao criar ou revisar `tokens.css`, ou quando alguém perguntar "qual é a cor/fonte da marca".
---

# Identidade visual: Connect Express Log

Fonte da verdade, em ordem de prioridade:

1. Figma, nó de identidade e fontes: `https://www.figma.com/design/skgCHymwiw2aKVL59plhxy/Connect-Express?node-id=1-3472`
2. Pasta `ID Visual/` do projeto.
3. Este arquivo.

Se o Figma e este arquivo divergirem, o Figma vence e este arquivo deve ser atualizado na mesma tarefa.

## Estado atual

O Figma ainda não foi lido (falta autorização do conector). Tudo marcado como PROVISÓRIO abaixo foi extraído do logotipo em PNG e precisa ser conferido no nó `1-3472` antes de implementar componentes.

## Logotipos

| Arquivo | Uso |
|---|---|
| `ID Visual/logo-connectexpress-log.png` | Versão colorida, para fundos claros. |
| `ID Visual/logo-connectexpress-log-verde.png` | Versão com letras brancas, para fundos escuros ou verdes. |

Regras:

- O logotipo nunca é recolorido, distorcido, girado ou recebe sombra.
- Área de respiro mínima: a altura da letra "C" em todos os lados.
- Largura mínima em tela: 120 px.
- No site o logotipo é servido em SVG (pedir ao cliente ou exportar do Figma). PNG só como último recurso, em 2x.
- Texto alternativo: "Connect Express Log".
- O nome da empresa em texto corrido é "Connect Express Log". Nunca "Connecte".

## Paleta (PROVISÓRIA, extraída do logotipo)

| Token | Valor | Papel |
|---|---|---|
| `--cor-verde` | `#47A81B` | Cor principal da marca. Fundos de destaque, ícones, detalhes. |
| `--cor-laranja` | `#F3570B` | Ação. Botão principal e chamadas de cotação. |
| `--cor-azul` | `#0D7BD6` | Apoio. Links secundários e detalhes pontuais. |

Contraste, medido contra branco:

- Verde `#47A81B`: cerca de 3,1:1. Não usar para texto pequeno sobre branco nem texto branco pequeno sobre verde. Para texto use uma variação mais escura (a definir no Figma).
- Laranja `#F3570B`: cerca de 3,4:1. Texto branco sobre laranja só em tamanho grande (18,66 px negrito ou 24 px regular). Para botões com texto pequeno, usar a variação escura.
- Azul `#0D7BD6`: cerca de 4,4:1. Abaixo do mínimo de 4,5:1 por pouco. Conferir antes de usar em texto corrido.

Faltam, e vêm do Figma: neutros (fundo, superfície, texto, borda), variações escuras e claras de cada cor, cor de erro e de sucesso.

## Tipografia

A definir pelo Figma (nó `1-3472`). Até lá:

- Não escolher fonte por conta própria.
- As fontes serão servidas pelo próprio site em WOFF2, nunca por CDN de terceiros (ver `connect-performance`).
- Registrar aqui: família de títulos, família de texto, pesos usados, escala de tamanhos e altura de linha.

## Como aplicar no código

- Todo valor de cor, fonte, raio, sombra e espaçamento vive em `src/styles/tokens.css` como propriedade CSS (`--cor-*`, `--fonte-*`, `--espaco-*`, `--raio-*`).
- Nenhum outro arquivo CSS ou componente contém valor hexadecimal. O critério de aceite AC-036 testa isso.
- Tokens têm nome pelo papel (`--cor-acao`, `--cor-texto`), apontando para os tokens de marca (`--cor-laranja`). Componentes usam só os tokens de papel.

## Não fazer

- Não usar os tokens de `Dados/DESIGN.md` nem de `Dados/SKILL.md`: descrevem outra marca (Terminal Yard Operating System).
- Não usar o verde como cor de texto sobre branco.
- Não misturar as três cores da marca com o mesmo peso em uma mesma seção. Uma domina, as outras pontuam.
