---
name: connect-smart-effects
description: Smart effects do site da Connect Express Log - decide se um efeito visual entra, em que lugar da página, com quais parâmetros, e como deixá-lo leve, acessível e funcional no celular. Use ao adicionar ou ajustar qualquer efeito (revelar texto na rolagem, desfoque, troca por pixels, expansão na rolagem, imagem ao passar o mouse, componentes do React Bits ou similares), ao receber um componente pronto para integrar, ou quando um efeito deixar a página lenta, travar no celular ou esconder conteúdo.
---

# Smart effects: Connect Express Log

Um efeito só entra se ajudar o visitante a entender ou a agir. Esta skill decide três coisas, nesta ordem: **se** o efeito entra, **onde** entra e **como** fica leve.

Leia junto: `connect-ui-design` (regras de movimento), `connect-performance` (orçamento de peso) e `connect-frontend` (GSAP e componentes de cliente).

## 1. O efeito entra?

Responda antes de escrever código. Um "não" em qualquer linha barra o efeito ou muda o desenho dele.

| Pergunta | Se a resposta for não |
|---|---|
| Ele tem um trabalho? (orientar a leitura, dar prova, convidar a uma ação, mostrar algo que o texto não mostra) | Não entra. Enfeite sem trabalho só custa. |
| O conteúdo continua inteiro no HTML, sem JavaScript? | Redesenhe: o efeito parte do conteúdo visível, nunca o cria. |
| Funciona com toque, sem passar o mouse? | Crie o equivalente para toque (ver seção 4). |
| Funciona só com teclado e com leitor de tela? | Dê foco, nome e estado, ou marque como decorativo. |
| Com movimento reduzido, a página continua completa? | Entregue o estado final, parado. |
| Cabe no orçamento de peso? | Corte parâmetros, adie o carregamento ou desista. |

## 2. Onde colocar

- **Nunca no elemento que define o LCP**: título e foto do herói não recebem animação de entrada.
- **Um efeito forte por tela.** Dois efeitos disputando atenção na mesma dobra se anulam.
- **Um efeito que prende a rolagem por página**, no máximo, e nunca antes do primeiro botão de cotação.
- **Efeito pesado vai abaixo da primeira tela**, onde pode esperar o script carregar.
- **Efeito de texto vai em frase curta**, de até 25 palavras. Parágrafo longo se lê, não se anima.
- **Formulário não recebe efeito.** Quem está preenchendo quer estabilidade.

## 3. Como deixar leve

1. **Propriedades**: só `transform`, `opacity`, `clip-path` e `filter`. Nada de `top`, `left`, `width`, `height` ou `margin`.
2. **Servidor primeiro**: se o efeito não depende de interação, faça como componente de servidor, calculado no build (é o caso do desfoque gradual). Zero JavaScript no navegador.
3. **CSS antes de JavaScript**: hover, foco e transições simples são CSS. JavaScript só para rolagem, medição e sequências.
4. **Um gatilho por efeito**: junte animações que partem do mesmo ponto em um só `ScrollTrigger`.
5. **Limpeza restrita**: `useGSAP` com `scope`. Nunca `ScrollTrigger.getAll().forEach(kill)`, que derruba os efeitos do resto da página.
6. **Rolagem**: ouvintes com `passive: true`, trabalho dentro de `requestAnimationFrame`, e ligados só enquanto a seção está perto da tela (`IntersectionObserver`).
7. **`will-change`** só no elemento que está animando, e só enquanto o efeito está ativo.
8. **`filter: blur` e `backdrop-filter` custam GPU**: poucas camadas, área pequena, e menos ainda no celular.
9. **Clonar DOM custa memória**: limite a quantidade (ver troca por pixels).
10. **Cores**: só tokens de `tokens.css`. Nenhum hexadecimal ou `rgb()` no efeito.
11. **Sem dependência nova** para um efeito só. Se o código do componente não usa a biblioteca que ele lista, não instale.

Orçamento: todos os efeitos juntos somam no máximo 15 KB de JavaScript comprimido, dentro dos 250 KB da primeira carga (critério de aceite AC-026).

## 4. Toque e celular

"Passar o mouse" não existe no celular. Para cada efeito de hover, escolha um equivalente:

| No desktop | No celular |
|---|---|
| Imagem que surge ao passar o mouse | Imagem dentro do próprio bloco, com espaço reservado, revelada pela rolagem |
| Troca de conteúdo no hover | Troca no toque (clique), com dica visível de que dá para tocar |
| Detalhe que aparece no hover | Detalhe sempre visível |

Regras:

- Separe os modos por capacidade, não por largura: `@media (hover: hover) and (pointer: fine)`.
- O modo de toque é o padrão do CSS; o modo de mouse é o que a consulta de mídia acrescenta.
- **Reserve o espaço** do que vai aparecer. Nada pode empurrar o conteúdo ao surgir.
- Um elemento recortado por inteiro (`clip-path` a 100%) não conta como visível para o `IntersectionObserver`. Recorte o filho, observe o pai.
- No celular a barra do navegador muda a altura da tela durante a rolagem. Efeitos presos à tela só remedem quando a **largura** muda.
- Reduza a carga em toque: menos camadas de desfoque, menos pixels, sem desfoque por palavra.

## 5. Acessibilidade

- `prefers-reduced-motion: reduce`: sem animação, sem prender a rolagem, estado final visível.
- `prefers-reduced-transparency: reduce`: sem faixas de desfoque.
- Camada decorativa leva `aria-hidden="true"`.
- Efeito interativo é um `button`, com nome (`aria-label`) e estado (`aria-pressed`).
- Conteúdo com opacidade zero precisa estar com `visibility: hidden` também, para sair do teclado e do leitor de tela.
- O texto animado continua sendo texto: palavras em `span`, espaços preservados, ordem de leitura intacta.

## 6. Catálogo

Os efeitos ficam em `src/efeitos/`. As entradas simples de seção (`Revelar`, `Contador`) continuam em `src/animacoes/`.

| Efeito | Arquivo | Onde está | Trabalho | No celular | Movimento reduzido |
|---|---|---|---|---|---|
| Texto revelado | `TextoRevelado.tsx` | Declaração em Quem Somos | Dar peso à frase que resume a empresa | Só opacidade, sem desfoque | Texto inteiro, parado |
| Desfoque gradual | `DesfoqueGradual.tsx` | Faixa fixa na base da tela, no site inteiro; base da foto do herói | Fazer o conteúdo sair da tela com suavidade durante toda a rolagem | Três camadas em vez de quatro | Mantido (não é movimento); some com transparência reduzida |
| Troca por pixels | `TrocaPixel.tsx` | Foto de Quem Somos, que troca pelos números | Convidar a tocar e entregar prova | Toque; até 40 pixels em vez de 96 | Troca imediata |
| Expansão na rolagem | `ExpansaoNaRolagem.tsx` | Chamada final de cotação, que aberta mostra números, frase, texto e dois botões | Dar palco ao último convite, com informação suficiente para decidir | Moldura inicial mais larga; não remede com a barra do navegador | Estado final, sem prender a rolagem |
| Prévia das soluções | `ObservaPrevias.tsx` e CSS em `secoes.module.css` | Lista de soluções | Mostrar a operação por trás de cada solução | Imagem dentro da linha, revelada pela rolagem | Imagem visível, sem transição |
| Mapa de cobertura | `MapaCobertura.tsx` e `mapa/motor.ts` | Seção Cobertura, dentro da grade: globo em ângulo (padrão) e mapa em bloco, alternados por um controle | Responder "vocês atendem a minha região?" | Toque no estado ou nos botões; cartão abaixo do mapa | Mapa parado, sem caminhões em movimento |

Parâmetros em uso (mude aqui e no código juntos):

- **Texto revelado**: opacidade inicial 0,15; desfoque de 4 px; rotação de 2 graus; desfoque desligado em toque e acima de 40 palavras.
- **Desfoque gradual**: faixa fixa de 5,5 rem, força 1,6, quatro camadas; herói com 9 rem, força 2, cinco camadas, curva exponencial.
- **Mapa de cobertura**: canvas 2D com densidade máxima de 2; camada parada desenhada uma vez e reaproveitada a cada quadro; contornos baixados só perto da tela; anima só enquanto visível.
- **Troca por pixels**: pixel de 56 px, duração de 1 s, padrão diagonal com 35% de aleatoriedade, gatilho por clique.
- **Expansão na rolagem**: moldura inicial de 42% por 58% (84% por 52% no celular), zoom de 1,25, rolagem de 0,8 tela mais 0,15 de retenção.
- **Prévia das soluções**: 17 rem de largura, inclinada 6 graus, no modo de mouse.

## 7. Integrar um componente pronto

Componentes de bibliotecas como o React Bits chegam genéricos. Antes de usar:

1. **Leia o código inteiro.** Procure limpeza global, estilos injetados no `document`, ouvintes sem `passive`, dependências listadas e não usadas.
2. **Passe pelas perguntas da seção 1.**
3. **Adapte**, não cole: TypeScript, nomes em português, CSS Module com tokens, `useGSAP` com `scope`, estado sem JavaScript, modo de toque, movimento reduzido.
4. **Corte o que o site não usa** (modos, predefinições, propriedades).
5. **Registre a origem** no cabeçalho do arquivo e o que mudou.
6. **Confira a licença** da biblioteca antes de entregar ao cliente.
7. **Acrescente a linha no catálogo** acima e o critério de aceite na especificação, com teste.

O que já foi corrigido nos quatro componentes do React Bits:

- `ScrollReveal`: matava todos os gatilhos de rolagem da página ao desmontar; tinha um `p` dentro de um `h2`; criava três gatilhos onde dois bastam.
- `GradualBlur`: injetava estilos no `document`, mantinha estado de hover e observadores que o site não usa, e listava `mathjs` sem usar. Virou componente de servidor.
- `PixelSwap`: até 220 cópias do conteúdo por transição; sem nome nem estado para leitor de tela.
- `ScrollExpand`: sem JavaScript, o conteúdo e o botão ficavam invisíveis; o botão invisível recebia foco; o título branco ficava ilegível fora da moldura; no celular a moldura pulava com a barra do navegador.

## 8. Conferir antes de entregar

1. JavaScript desligado: todo o conteúdo e todos os botões aparecem.
2. Movimento reduzido ligado: nada se move, nada prende a rolagem.
3. Celular de 360 px, com toque: o efeito tem equivalente e nada rola para os lados.
4. Teclado: o foco passa pelo efeito na ordem certa e nunca cai em algo invisível.
5. `npm test`: o peso da primeira carga continua dentro do orçamento.
6. Rolagem rápida de cima a baixo no celular, sem engasgo visível.
7. O efeito ainda tem um trabalho? Se a resposta mudou, tire.
