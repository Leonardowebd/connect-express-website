---
name: connect-ui-design
description: Regras de interface do site da Connect Express Log - grade, espaçamento, componentes e seus estados. Use ao construir ou revisar qualquer componente visual (botão, cartão, cabeçalho, formulário, seção), ao traduzir um quadro do Figma para código, ou ao criar um componente que o Figma não desenhou.
---

# UI design: Connect Express Log

Leia antes `connect-id-visual` (cores e fontes) e `connect-design-concept` (direção). O Figma é a fonte do layout:

- Layout: `node-id=1-11` e `node-id=1-1196`
- Identidade e fontes: `node-id=1-3472`
- Arquivo: `https://www.figma.com/design/skgCHymwiw2aKVL59plhxy/Connect-Express`

Ao implementar um quadro do Figma, use a skill `figma:figma-design-to-code` e leia as variáveis do arquivo. Os valores do Figma substituem os padrões abaixo.

## Fundamentos (padrões até o Figma definir)

- **Grade:** 12 colunas, conteúdo com largura máxima de 1200 px, calha de 24 px. Margem lateral de 16 px no celular, 32 px no tablet, 48 px no desktop.
- **Espaçamento:** escala de 4 px: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128. Nada fora da escala.
- **Ritmo vertical de seção:** 64 px no celular, 96 px no tablet, 128 px no desktop.
- **Raios:** um para controles (botões, campos), um para cartões, um para blocos grandes. Definir como `--raio-controle`, `--raio-cartao`, `--raio-bloco`.
- **Tipografia:** escala fluida com `clamp()`. Texto corrido nunca abaixo de 16 px. Linha de texto com no máximo 70 caracteres.

## Componentes e estados obrigatórios

Todo componente interativo define: padrão, hover, foco visível, ativo e desabilitado. Formulários definem também erro e enviando.

| Componente | Regras |
|---|---|
| Botão principal | Fundo `--cor-acao`. Um por seção. Altura mínima 44 px. Rótulo com verbo: "Pedir cotação". |
| Botão secundário | Contorno ou texto. Nunca disputa com o principal. |
| Link de texto | Sublinhado em texto corrido. Cor com contraste 4,5:1. |
| Cabeçalho | Logotipo à esquerda, navegação, atalhos de rastreio e vagas, botão de cotação. Fixo ao rolar, com fundo sólido. |
| Menu no celular | Botão com `aria-expanded`. Abre painel de tela cheia. Fecha com Esc. |
| Cartão de solução | Ícone, título, resumo de até 2 linhas, link. O cartão inteiro é clicável por um único link. |
| Indicador | Número grande, legenda curta. Número e legenda no mesmo elemento de leitura. |
| Faixa de clientes | Logotipos em tom único, mesma altura óptica. Sem carrossel automático. |
| Pergunta frequente | `details` e `summary` nativos. Resposta sempre presente no HTML. |
| Campo de formulário | Rótulo visível acima. Mensagem de erro abaixo, ligada por `aria-describedby`. |
| Espaço de imagem | Proporção fixa por `aspect-ratio`. Substituto com fundo da marca. Ver `connect-frontend`. |
| Rodapé | Logotipo, soluções, links úteis, contatos, CNPJ, redes sociais, política de privacidade. |

## Ícones

Um único conjunto, em SVG embutido, traço de mesma espessura. Ícone decorativo leva `aria-hidden="true"`. Ícone sozinho como botão leva nome acessível.

## Movimento

- Duração entre 150 e 300 ms, só em `opacity` e `transform`.
- Nada se move sem ação do visitante, exceto entrada sutil de seção.
- Respeitar `prefers-reduced-motion: reduce` desligando animações.

## Portões de qualidade

Antes de dar um componente por pronto:

1. Todos os estados existem e são distinguíveis sem depender só de cor.
2. Contraste de texto 4,5:1, de elementos gráficos 3:1.
3. Nenhum valor hexadecimal, tamanho de fonte ou espaçamento solto: só tokens.
4. Funciona com conteúdo longo (título de 3 linhas) e curto.
5. Funciona em 360, 768 e 1440 px.
6. Funciona com o substituto de imagem.
7. Confere com o quadro do Figma lado a lado.
