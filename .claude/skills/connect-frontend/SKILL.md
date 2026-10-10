---
name: connect-frontend
description: Padrões de frontend do site da Connect Express Log - stack, estrutura de pastas, componentes, dados de conteúdo, sistema de substitutos de imagem e testes. Use ao criar ou alterar qualquer arquivo de código do site, ao montar uma página nova, ao adicionar uma imagem, ou ao escrever os testes dos critérios de aceite.
---

# Frontend: Connect Express Log

## Stack

Suposição ASM-001 da especificação, ainda não confirmada pelo dono do projeto:

- **Astro**, saída estática. HTML pronto no servidor, sem JavaScript por padrão.
- **CSS próprio** com propriedades CSS (tokens). Sem Tailwind e sem biblioteca de componentes.
- **JavaScript** só onde há interação: menu no celular e validação de formulário. Em módulos pequenos, sem framework.
- **Testes** com `node --test` lendo o HTML e o CSS gerados em `dist/`.

Se a stack mudar, atualize este arquivo e a suposição antes de escrever código.

## Estrutura

```
src/
  pages/                      uma rota por arquivo
    index.astro
    servicos/[slug].astro
    trabalhe-conosco.astro
    politica-de-privacidade.astro
    llms.txt.ts
    robots.txt.ts
  layouts/Base.astro          head, cabeçalho, rodapé, dados estruturados
  components/                 um componente por arquivo
  data/
    empresa.ts                contatos, endereços, números, redes, clientes
    servicos.ts               as quatro soluções com texto e perguntas frequentes
    imagens.ts                manifesto de espaços de imagem
  styles/
    tokens.css                ÚNICO lugar com valores de cor, fonte e medida
    base.css                  reset, tipografia, utilitários
  scripts/                    menu.js, formulario.js
public/
  fontes/                     WOFF2
  imagens/                    imagens finais, pelo nome do manifesto
tests/                        um arquivo por história de usuário
vercel.json                   cabeçalhos de segurança, cache e redirecionamentos
```

## Regras de código

- **Conteúdo em dados.** Todo texto que se repete ou é fato (telefone, endereço, estados, números, clientes, soluções) vem de `src/data/`. Componente não tem telefone escrito à mão.
- **Tokens.** Nenhum hexadecimal, `rgb()` ou `hsl()` fora de `tokens.css`. Componentes usam `var(--...)`.
- **HTML semântico primeiro.** `button` para ação, `a` para navegação, `details` para perguntas frequentes, `form` com `label`.
- **Estilo com escopo.** CSS do componente no próprio arquivo `.astro`. Globais só em `base.css`.
- **Sem dependência nova** sem necessidade clara. Cada pacote entra com justificativa na tarefa.
- **Endereços preservados.** As rotas de serviço e de Trabalhe Conosco são as mesmas do site antigo, com barra no final.
- **Links externos** que abrem em nova aba levam `rel="noopener noreferrer"`.
- **Nomes em português** para componentes, dados e classes, como no restante do projeto.

## Substitutos de imagem

As fotos chegam depois (`Dados/Imagens Novo site/` está vazia). O site precisa ficar completo sem elas.

`src/data/imagens.ts` é o manifesto. Cada espaço tem:

```ts
{
  id: 'heroi-inicio',
  arquivo: 'heroi-inicio.webp',
  largura: 1600,
  altura: 900,
  alt: 'Entregador da Connect Express com baú térmico',
  prioridade: true,
}
```

O componente `Imagem.astro` recebe o `id`:

- Se `public/imagens/<arquivo>` existe na hora do build, gera `<img>` com `width`, `height`, `alt`, `loading="lazy"` e `decoding="async"` (ou `fetchpriority="high"` quando `prioridade` é verdadeira).
- Se não existe, gera um bloco com a mesma proporção (`aspect-ratio`), fundo da marca e `role="img"` com o `alt` do manifesto.

Trocar uma imagem é colocar o arquivo com o nome do manifesto e gerar o site de novo. Nenhuma página muda. Isso atende aos critérios de aceite AC-038 e AC-039.

Mantenha no manifesto uma lista das imagens ainda pendentes para passar a quem produz as fotos, com proporção e descrição do que precisa aparecer.

## Testes

- Um teste por critério de aceite, com `@spec:AC-xxx` no título. Sem isso o critério não existe para a auditoria.
- O teste lê `dist/` depois de `astro build` e confere o resultado descrito na especificação, não a forma do código.
- Teste pulado não vale como prova. Nunca enfraquecer um teste para passar.
- Fluxo: `onp-spec scaffold`, implementar, `onp-spec verify`, `onp-spec audit --ci`.
- Um commit por tarefa, com o código da tarefa na mensagem.

## Antes de entregar uma página

1. Gera sem erro e sem aviso.
2. Confere com o quadro do Figma em 360, 768 e 1440 px.
3. Navegável só por teclado.
4. Sem JavaScript a página continua legível e os links funcionam.
5. Testes dos critérios da tarefa passam em `onp-spec verify`.
