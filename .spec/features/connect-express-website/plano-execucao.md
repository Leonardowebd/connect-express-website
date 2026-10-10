# Plano de execução — connect-express-website

> gerado por `onp-spec plano` em 2026-10-10 14:45 — NÃO edite à mão;
> mudou tasks.md ou a config? Regenere: `onp-spec plano connect-express-website`

## Resumo — o que vai acontecer

- **17 tarefa(s) pendente(s)**: 17 em 16 faixa(s) paralela(s) + 0 sequencial(is)
- **1 faixa = 1 worktree + 1 branch + 1 janela de contexto limpa** — faixas não compartilham nenhum arquivo entre si
- prefere outra seleção ou uma após a outra? Regenere com `onp-spec plano connect-express-website --paralelizar T-xxx,T-yyy` ou `--sequencial`
- tudo acontece na branch de trabalho `spec/connect-express-website`; levar para a main é decisão sua

## Faixas e ondas

### Onda 1 — faixa-1 ∥ faixa-2 ∥ faixa-3

#### faixa-1 — branch `spec/connect-express-website-faixa-1` — worktree `../onp-worktrees/Connect Express-connect-express-website-faixa-1`

| tarefa | título | modelo | esforço | arquivos |
|---|---|---|---|---|
| T-001 | Base do projeto Next.js, tokens e apoio de testes | `claude-sonnet-5` | medium | `package.json`, `package-lock.json`, `tsconfig.json`, `next.config.ts`, `eslint.config.mjs`, `onpspec.config.json`, `.spec/constituicao.md`, `src/app/layout.tsx`, `src/app/globals.css`, `src/app/page.tsx`, `src/styles/tokens.css`, `src/styles/base.css`, `tests/apoio.mjs`, `tests/us-012-marca.test.mjs` |
| T-009 | Montagem da página inicial | `claude-sonnet-5` | medium | `src/app/page.tsx`, `tests/us-001-proposta.test.mjs`, `tests/us-003-confianca.test.mjs` |

#### faixa-2 — branch `spec/connect-express-website-faixa-2` — worktree `../onp-worktrees/Connect Express-connect-express-website-faixa-2`

| tarefa | título | modelo | esforço | arquivos |
|---|---|---|---|---|
| T-002 | Dados de conteúdo e copy | `claude-sonnet-5` | medium | `src/data/empresa.ts`, `src/data/servicos.ts`, `src/data/inicio.ts`, `src/data/imagens.ts` |

#### faixa-3 — branch `spec/connect-express-website-faixa-3` — worktree `../onp-worktrees/Connect Express-connect-express-website-faixa-3`

| tarefa | título | modelo | esforço | arquivos |
|---|---|---|---|---|
| T-003 | Componente de imagem com substituto | `claude-sonnet-5` | medium | `src/components/Imagem/Imagem.tsx`, `src/components/Imagem/Imagem.module.css`, `public/imagens/.gitkeep`, `tests/us-013-imagens.test.mjs` |

### Onda 2 — faixa-4 ∥ faixa-5 ∥ faixa-6

#### faixa-4 — branch `spec/connect-express-website-faixa-4` — worktree `../onp-worktrees/Connect Express-connect-express-website-faixa-4`

| tarefa | título | modelo | esforço | arquivos |
|---|---|---|---|---|
| T-004 | Componentes de animação com GSAP | `claude-sonnet-5` | medium | `src/animacoes/gsap.ts`, `src/animacoes/Revelar.tsx`, `src/animacoes/Escalonar.tsx`, `src/animacoes/Contador.tsx`, `src/animacoes/constantes.ts` |

#### faixa-5 — branch `spec/connect-express-website-faixa-5` — worktree `../onp-worktrees/Connect Express-connect-express-website-faixa-5`

| tarefa | título | modelo | esforço | arquivos |
|---|---|---|---|---|
| T-005 | Cabeçalho, menu, rodapé e botão de WhatsApp | `claude-sonnet-5` | medium | `src/components/Cabecalho/Cabecalho.tsx`, `src/components/Cabecalho/Cabecalho.module.css`, `src/components/Cabecalho/MenuCelular.tsx`, `src/components/Rodape/Rodape.tsx`, `src/components/Rodape/Rodape.module.css`, `src/components/BotaoWhatsApp/BotaoWhatsApp.tsx`, `src/components/BotaoWhatsApp/BotaoWhatsApp.module.css`, `src/components/Botao/Botao.tsx`, `src/components/Botao/Botao.module.css`, `src/components/PularConteudo/PularConteudo.tsx`, `public/logos/.gitkeep`, `tests/us-011-acessibilidade.test.mjs`, `tests/us-005-atalhos.test.mjs` |

#### faixa-6 — branch `spec/connect-express-website-faixa-6` — worktree `../onp-worktrees/Connect Express-connect-express-website-faixa-6`

| tarefa | título | modelo | esforço | arquivos |
|---|---|---|---|---|
| T-006 | Seções da página inicial: herói, números, quem somos e desafio | `claude-sonnet-5` | medium | `src/components/secoes/Heroi.tsx`, `src/components/secoes/Heroi.module.css`, `src/components/secoes/Numeros.tsx`, `src/components/secoes/Numeros.module.css`, `src/components/secoes/QuemSomos.tsx`, `src/components/secoes/QuemSomos.module.css`, `src/components/secoes/Desafio.tsx`, `src/components/secoes/Desafio.module.css`, `src/components/secoes/Valores.tsx`, `src/components/secoes/Valores.module.css` |

### Onda 3 — faixa-7 ∥ faixa-8 ∥ faixa-9

#### faixa-7 — branch `spec/connect-express-website-faixa-7` — worktree `../onp-worktrees/Connect Express-connect-express-website-faixa-7`

| tarefa | título | modelo | esforço | arquivos |
|---|---|---|---|---|
| T-007 | Seções da página inicial: soluções, operação, cobertura e clientes | `claude-sonnet-5` | medium | `src/components/secoes/Solucoes.tsx`, `src/components/secoes/Solucoes.module.css`, `src/components/secoes/Operacao.tsx`, `src/components/secoes/Operacao.module.css`, `src/components/secoes/Cobertura.tsx`, `src/components/secoes/Cobertura.module.css`, `src/components/secoes/Clientes.tsx`, `src/components/secoes/Clientes.module.css` |

#### faixa-8 — branch `spec/connect-express-website-faixa-8` — worktree `../onp-worktrees/Connect Express-connect-express-website-faixa-8`

| tarefa | título | modelo | esforço | arquivos |
|---|---|---|---|---|
| T-008 | Perguntas frequentes, contato e envio do formulário | `claude-sonnet-5` | medium | `src/components/secoes/Perguntas.tsx`, `src/components/secoes/Perguntas.module.css`, `src/components/secoes/Contato.tsx`, `src/components/secoes/Contato.module.css`, `src/components/Formulario/FormularioContato.tsx`, `src/components/Formulario/Formulario.module.css`, `src/components/Formulario/validacao.ts`, `src/app/api/contato/route.ts`, `.env.example`, `tests/us-004-cotacao.test.mjs` |

#### faixa-9 — branch `spec/connect-express-website-faixa-9` — worktree `../onp-worktrees/Connect Express-connect-express-website-faixa-9`

| tarefa | título | modelo | esforço | arquivos |
|---|---|---|---|---|
| T-010 | Páginas de solução | `claude-sonnet-5` | medium | `src/app/servicos/[slug]/page.tsx`, `src/app/servicos/[slug]/pagina.module.css`, `tests/us-002-solucoes.test.mjs` |

### Onda 4 — faixa-10 ∥ faixa-11 ∥ faixa-12

#### faixa-10 — branch `spec/connect-express-website-faixa-10` — worktree `../onp-worktrees/Connect Express-connect-express-website-faixa-10`

| tarefa | título | modelo | esforço | arquivos |
|---|---|---|---|---|
| T-011 | Página Trabalhe Conosco | `claude-sonnet-5` | medium | `src/app/trabalhe-conosco/page.tsx`, `src/app/trabalhe-conosco/pagina.module.css`, `src/components/Formulario/FormularioVagas.tsx`, `src/app/api/vagas/route.ts` |

#### faixa-11 — branch `spec/connect-express-website-faixa-11` — worktree `../onp-worktrees/Connect Express-connect-express-website-faixa-11`

| tarefa | título | modelo | esforço | arquivos |
|---|---|---|---|---|
| T-012 | Política de Privacidade e página não encontrada | `claude-sonnet-5` | medium | `src/app/politica-de-privacidade/page.tsx`, `src/app/politica-de-privacidade/pagina.module.css`, `src/app/not-found.tsx` |

#### faixa-12 — branch `spec/connect-express-website-faixa-12` — worktree `../onp-worktrees/Connect Express-connect-express-website-faixa-12`

| tarefa | título | modelo | esforço | arquivos |
|---|---|---|---|---|
| T-013 | SEO: metadados, sitemap, robôs e dados da organização | `claude-sonnet-5` | medium | `src/app/sitemap.ts`, `src/app/robots.ts`, `src/lib/metadados.ts`, `src/lib/jsonld.ts`, `src/components/JsonLd/JsonLd.tsx`, `tests/us-007-seo.test.mjs` |

### Onda 5 — faixa-13 ∥ faixa-14 ∥ faixa-15

#### faixa-13 — branch `spec/connect-express-website-faixa-13` — worktree `../onp-worktrees/Connect Express-connect-express-website-faixa-13`

| tarefa | título | modelo | esforço | arquivos |
|---|---|---|---|---|
| T-014 | GEO: llms.txt e dados estruturados de perguntas e serviços | `claude-sonnet-5` | medium | `src/app/llms.txt/route.ts`, `tests/us-008-geo.test.mjs` |

#### faixa-14 — branch `spec/connect-express-website-faixa-14` — worktree `../onp-worktrees/Connect Express-connect-express-website-faixa-14`

| tarefa | título | modelo | esforço | arquivos |
|---|---|---|---|---|
| T-015 | Segurança: cabeçalhos e links externos | `claude-sonnet-5` | medium | `tests/us-010-seguranca.test.mjs` |

#### faixa-15 — branch `spec/connect-express-website-faixa-15` — worktree `../onp-worktrees/Connect Express-connect-express-website-faixa-15`

| tarefa | título | modelo | esforço | arquivos |
|---|---|---|---|---|
| T-016 | Responsividade, toque e orçamento de peso | `claude-sonnet-5` | medium | `tests/us-006-responsivo.test.mjs`, `tests/us-009-velocidade.test.mjs` |

### Onda 6 — faixa-16

#### faixa-16 — branch `spec/connect-express-website-faixa-16` — worktree `../onp-worktrees/Connect Express-connect-express-website-faixa-16`

| tarefa | título | modelo | esforço | arquivos |
|---|---|---|---|---|
| T-017 | Publicação na Vercel | `claude-sonnet-5` | medium | `README.md` |

## Gestão de branches e commits

1. branch de trabalho `spec/connect-express-website` criada do ponto atual (se ainda não existir)
2. cada faixa nasce dela como branch própria e roda no seu worktree — **1 tarefa = 1 commit** (`T-xxx feature: título`)
3. terminou a onda → merge `--no-ff` de cada faixa de volta, na ordem; conflito interrompe a faixa e pede resolução humana
4. faixa mesclada → worktree removido, branch apagada, tarefa marcada `[concluida]` no tasks.md
5. gate final na branch de trabalho: `onp-spec verify connect-express-website` + `onp-spec audit --ci` — **exit 0 ou não está pronto**

## Como executar

### ▶ Execução — Claude Code headless

```bash
bash .spec/features/connect-express-website/executar-tarefas.sh
```

Cada faixa roda `claude -p` com **janela de contexto limpa**, no seu worktree, com
`--model` e `--effort` já definidos por tarefa e permissões `acceptEdits`. Os prompts exatos estão
embutidos no script — quer rodar uma faixa na mão, é só copiá-los de lá.
Logs: `../onp-worktrees/Connect Express-connect-express-website-logs/`.

### 📣 Acompanhamento — tabela + resumo no chat (a cada 1 min)

O script roda em **background**: o agente AVISA o usuário antes de iniciar e,
enquanto roda, posta no chat a cada ~1 minuto a **tabela de andamento** (qual
tarefa está rodando, qual não está, o que concluiu/falhou) junto com o
**resumo geral de andamento** (escrito por IA; sem IA, o motor resume). Ao
final, o usuário recebe o resumo completo da execução. A qualquer momento:

```bash
onp-spec resumo connect-express-website --tabela   # a tabela de andamento
onp-spec resumo connect-express-website            # o resumo em texto
```

