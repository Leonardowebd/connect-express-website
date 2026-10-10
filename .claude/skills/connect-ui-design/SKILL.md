---
name: connect-ui-design
description: Regras de interface do site da Connect Express Log - grade, espaçamento, componentes e seus estados. Use ao construir ou revisar qualquer componente visual (botão, cartão, cabeçalho, formulário, seção), ao traduzir um quadro do Figma para código, ou ao criar um componente que o Figma não desenhou.
---

# UI design: Connect Express Log

Leia antes `connect-id-visual` (cores e fontes) e `connect-design-concept` (direção e referências).

O Figma do projeto não tem layout pronto da Connect Express: tem a identidade e páginas de referência de outros sites. Os componentes abaixo são o sistema do site. Para conferir uma referência, abra o arquivo `https://www.figma.com/design/skgCHymwiw2aKVL59plhxy/Connect-Express` (referência principal em `node-id=1-1196`).

## Fundamentos

- **Grade:** 12 colunas, conteúdo com largura máxima de 1200 px, calha de 24 px. Margem lateral de 16 px no celular, 32 px no tablet, 48 px no desktop.
- **Espaçamento:** escala de 4 px: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128. Nada fora da escala.
- **Ritmo vertical de seção:** 64 px no celular, 96 px no tablet, 128 px no desktop.
- **Raios:** blocos grandes com `--raio-b` (1,75 rem), cartões com `--raio-cartao` (1,25 rem), campos de formulário com `--raio-campo` (0,875 rem), botões em pílula (`--raio-pilula`).
- **Superfícies:** branco, cinza claro (`--cor-papel`) e blocos verdes. Sem bloco preto. Sem sombra em cartões; a separação é por fundo e por linha fina.
- **Formulário:** rótulo acima do campo, campo branco de 52 px de altura com borda de contraste 3:1, foco com contorno verde, envio em pílula laranja com seta em círculo, aviso de privacidade ao lado do botão.
- **Tipografia:** Geologica nos títulos, peso 500, entrelinha de 1,05 a 1,15 e espaçamento entre letras levemente negativo. Poppins no texto, peso 400, entrelinha 1,6. Escala fluida com `clamp()`: título do herói de 40 a 88 px, título de seção de 32 a 56 px, subtítulo de 20 a 28 px, texto 16 a 18 px, rótulo 14 px. Texto corrido nunca abaixo de 16 px. Linha de texto com no máximo 70 caracteres.
- **Rótulo de seção:** texto pequeno em `--cor-tinta-suave`, à esquerda do título no desktop e acima dele no celular.
- **Destaque em título:** uma palavra ou expressão em `--cor-laranja`. No máximo uma por título.

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

Animação feita com GSAP. As regras de código estão em `connect-frontend`. Para decidir se um efeito entra, onde e como otimizar, use `connect-smart-effects`.

- Transições de estado (hover, foco, abrir menu): 150 a 300 ms, em CSS.
- Entradas de seção ao rolar: 0,3 a 0,8 s, deslocamento de até 24 px, uma vez só.
- Números da operação podem contar até o valor final ao entrar na tela.
- Só `opacity` e `transform`.
- O movimento serve para orientar a leitura. Nada de rolagem sequestrada, paralaxe pesada ou elemento que persegue o cursor.
- Respeitar `prefers-reduced-motion: reduce` desligando animações.

## Portões de qualidade

Antes de dar um componente por pronto:

1. Todos os estados existem e são distinguíveis sem depender só de cor.
2. Contraste de texto 4,5:1, de elementos gráficos 3:1.
3. Nenhum valor hexadecimal, tamanho de fonte ou espaçamento solto: só tokens.
4. Funciona com conteúdo longo (título de 3 linhas) e curto.
5. Funciona em 360, 768 e 1440 px.
6. Funciona com o substituto de imagem.
7. Ao lado da referência principal, tem o mesmo ritmo de espaço e de tipografia.
