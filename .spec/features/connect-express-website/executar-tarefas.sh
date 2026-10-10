#!/usr/bin/env bash
# executar-tarefas.sh — gerado por `onp-spec plano connect-express-website` em 2026-10-10 14:45
# NÃO edite à mão: mudou tasks.md ou a config, regenere o plano.
#
# uso:
#   bash executar-tarefas.sh                  tudo (ondas → sequenciais → gate)
#   bash executar-tarefas.sh --faixa <id>     reexecuta UMA faixa (+ merge + gate)
#   bash executar-tarefas.sh --seq <T-xxx>    reexecuta UMA tarefa sequencial
#   bash executar-tarefas.sh --gate           só o gate (verify + audit)
#   bash executar-tarefas.sh --listar         mostra faixas, tarefas e estados
#   (acrescente --sem-gate para não rodar o gate ao final)
#
# resumo do que está rolando, a qualquer momento: onp-spec resumo connect-express-website
set -u
set -o pipefail

RUN_ID='Connect Express-connect-express-website-mv2iafpw'
FEATURE='connect-express-website'
BASE_BRANCH='spec/connect-express-website'
ENGINE='.claude/skills/onp-spec-driven/scripts/onp-spec.mjs'
CLAUDE_FLAGS=(--permission-mode acceptEdits --allowedTools 'Bash(git add:*),Bash(git commit:*),Bash(git status:*),Bash(git diff:*),Bash(git log:*),Bash(node:*)')
STREAM_FLAGS=(--output-format stream-json --verbose)
FALHAS=""
COM_GATE=1
RESUMO_MODEL='claude-haiku-4-5'
RESUMO_PID=""

verde()    { printf '\033[32m%s\033[0m\n' "$*"; }
vermelho() { printf '\033[31m%s\033[0m\n' "$*"; }
amarelo()  { printf '\033[33m%s\033[0m\n' "$*"; }
info()     { printf '· %s\n' "$*"; }
falhar()   { vermelho "✘ $*"; exit 1; }

# eventos vão para o ledger GLOBAL (~/.onp-spec/painel/ledger.jsonl):
# um arquivo para todos os projetos, é o que o onp-spec resumo lê
evento() { node "$ENGINE" evento --run "$RUN_ID" "$@" >/dev/null 2>&1 || true; }

# ── ambiente (todos os modos passam por aqui) ────────────────────────
preparar_ambiente() {
  command -v git >/dev/null 2>&1 || falhar "git não encontrado"
  command -v node >/dev/null 2>&1 || falhar "node não encontrado"
  command -v claude >/dev/null 2>&1 || falhar "Claude Code CLI (claude) não encontrado — instale-o ou siga o modo manual em plano-execucao.md"
  TOPLEVEL=$(git rev-parse --show-toplevel 2>/dev/null) || falhar "fora de um repositório git"
  cd "$TOPLEVEL" || exit 1
  # artefatos recém-gerados pelo `onp-spec plano` são sujeira esperada:
  # se forem a ÚNICA sujeira, o script mesmo commita; qualquer outra, aborta
  if [ -n "$(git status --porcelain)" ]; then
    if [ -z "$(git status --porcelain | grep -v -e 'plano-execucao\.' -e 'plano\.json' -e 'executar-tarefas\.sh')" ]; then
      git add -A
      git commit -q -m "plano de execução: $FEATURE (artefatos gerados)"
      info "artefatos do plano commitados"
    else
      falhar "árvore suja além dos artefatos do plano — commite ou faça git stash antes (os worktrees partem do último commit)"
    fi
  fi
  git ls-files --error-unmatch -- '.spec/features/connect-express-website/spec.md' >/dev/null 2>&1 || falhar "spec.md não está commitada — os worktrees das faixas precisam dela no git"
  ATUAL=$(git rev-parse --abbrev-ref HEAD)
  [ "$ATUAL" != "HEAD" ] || falhar "HEAD destacado — troque para uma branch"
  if [ "$ATUAL" != "$BASE_BRANCH" ]; then
    if git show-ref --verify --quiet "refs/heads/$BASE_BRANCH"; then
      git checkout -q "$BASE_BRANCH" || falhar "não consegui trocar para $BASE_BRANCH"
    else
      git checkout -q -b "$BASE_BRANCH" || falhar "não consegui criar $BASE_BRANCH"
    fi
    info "branch de trabalho: $BASE_BRANCH (a partir de $ATUAL)"
  fi
  git worktree prune
  LOG_DIR="$(dirname "$TOPLEVEL")/onp-worktrees/Connect Express-connect-express-website-logs"
  WT_BASE="$(dirname "$TOPLEVEL")/onp-worktrees/Connect Express-connect-express-website"
  STREAMS_DIR="${ONP_SPEC_HOME:-$HOME/.onp-spec}/painel/streams/$RUN_ID"
  mkdir -p "$LOG_DIR" "$STREAMS_DIR"
}

# worktree limpo mesmo depois de uma tentativa que falhou
preparar_worktree() { # $1=faixa $2=branch $3=worktree
  git worktree prune
  if [ -e "$3" ]; then git worktree remove --force "$3" >/dev/null 2>&1; rm -rf "$3"; fi
  if git show-ref --verify --quiet "refs/heads/$2"; then git branch -D "$2" >/dev/null 2>&1; fi
  git worktree add "$3" -b "$2" >/dev/null 2>&1 || { vermelho "✘ não consegui criar o worktree de $1 em $3"; return 1; }
}

tentativa() { # $1=faixa — conta reexecuções (vai para o ledger)
  local arq="$LOG_DIR/.tentativa-$1"
  local n=1
  [ -f "$arq" ] && n=$(( $(cat "$arq") + 1 ))
  printf "%s" "$n" > "$arq"
  printf "%s" "$n"
}

# uma tarefa = uma sessão claude headless com contexto limpo.
# o JSONL da sessão vira o stream da tarefa no ledger
rodar_tarefa() { # $1=escopo(faixa|seq) $2=T-xxx $3=prompt $4=modelo $5=esforço
  local chave="$1--$2"
  local stream="$STREAMS_DIR/$chave.jsonl"
  evento --tipo tarefa --tarefa "$2" --faixa "$1" --estado executando --stream "$chave"
  info "$2 — claude -p ($4 · $5) · stream: $chave"
  if claude -p "$3" --model "$4" --effort "$5" "${STREAM_FLAGS[@]}" "${CLAUDE_FLAGS[@]}" > "$stream" 2>>"$LOG_DIR/$1.log"; then
    evento --tipo tarefa --tarefa "$2" --faixa "$1" --estado concluida --stream "$chave"
    node "$ENGINE" stream-resumo "$RUN_ID" "$chave" 2>/dev/null || true
    return 0
  fi
  evento --tipo tarefa --tarefa "$2" --faixa "$1" --estado falhou --stream "$chave"
  node "$ENGINE" stream-resumo "$RUN_ID" "$chave" 2>/dev/null || true
  return 1
}

mesclar_faixa() { # $1=faixa $2=branch $3=worktree $4=exit-da-faixa
  if [ "$4" -ne 0 ]; then
    evento --tipo faixa --faixa "$1" --estado falhou
    vermelho "✘ $1 falhou (log: $LOG_DIR/$1.log) — worktree mantido para inspeção: $3"
    amarelo "  reexecute só ela: bash .spec/features/connect-express-website/executar-tarefas.sh --faixa $1"
    FALHAS="$FALHAS $1"; return 1
  fi
  evento --tipo faixa --faixa "$1" --estado mesclando
  if git merge --no-ff "$2" -m "merge $1 ($FEATURE)"; then
    git worktree remove --force "$3" >/dev/null 2>&1
    git branch -d "$2" >/dev/null 2>&1
    evento --tipo faixa --faixa "$1" --estado mesclada
    verde "✔ $1 mesclada em $BASE_BRANCH"
  else
    git merge --abort >/dev/null 2>&1
    evento --tipo faixa --faixa "$1" --estado conflito
    vermelho "✘ conflito ao mesclar $1 — resolva na mão: git merge $2 (worktree mantido: $3)"
    FALHAS="$FALHAS $1"; return 1
  fi
}

marcar_concluidas() { # $@=T-xxx
  for t in "$@"; do node "$ENGINE" tarefa "$FEATURE" "$t" concluida >/dev/null || true; done
}

# ── resumo geral de andamento: 1/min enquanto a execução roda ─────────
# escrito por IA (claude -p, sem ferramentas) com fallback do motor; vai
# para o terminal e para o ledger — o agente repassa o texto no chat.
gerar_resumo() {
  local ctx ia
  ctx=$(node "$ENGINE" resumo "$FEATURE" --contexto 2>/dev/null) || ctx=""
  [ -n "$ctx" ] || return 0
  ia=$(claude -p "Você narra, para o dono do produto, uma execução de tarefas de código em andamento. Estado mecânico:

$ctx

Escreva o RESUMO GERAL DE ANDAMENTO: um parágrafo único de 2 a 4 frases, em português simples, dizendo o que está acontecendo agora, o que já terminou, o que falhou e se o usuário precisa agir. Sem markdown, sem listas." --model "$RESUMO_MODEL" 2>/dev/null)
  if [ -n "$ia" ]; then
    node "$ENGINE" resumo "$FEATURE" --gravar --origem ia --texto "$ia" >/dev/null 2>&1 || true
    printf '\n📣 resumo (IA): %s\n' "$ia"
  else
    node "$ENGINE" resumo "$FEATURE" --gravar >/dev/null 2>&1 || true
    printf '\n📣 resumo: %s\n' "$(node "$ENGINE" resumo "$FEATURE" 2>/dev/null)"
  fi
}

# mata o loop E o sleep filho — senão o sleep herda o stdout e quem chamou
# o script via pipe fica esperando EOF por até 60s depois do exit
parar_resumos() {
  [ -n "$RESUMO_PID" ] || return 0
  command -v pkill >/dev/null 2>&1 && pkill -P "$RESUMO_PID" 2>/dev/null
  kill "$RESUMO_PID" 2>/dev/null
  RESUMO_PID=""
}

iniciar_resumos() {
  ( while :; do sleep 60; gerar_resumo; done ) &
  RESUMO_PID=$!
  # ao sair: para o loop e grava um último resumo (o estado final, do motor)
  trap 'parar_resumos; node "$ENGINE" resumo "$FEATURE" --gravar >/dev/null 2>&1 || true' EXIT
}

# ── faixa-1: T-001 T-009 ──
executar_faixa_1() {
  local WT="$WT_BASE-faixa-1"
  preparar_worktree 'faixa-1' 'spec/connect-express-website-faixa-1' "$WT" || return 1
  evento --tipo faixa --faixa 'faixa-1' --estado executando --tentativa "$(tentativa 'faixa-1')"
  : > "$LOG_DIR/faixa-1.log"
  (
    cd "$WT" || exit 9
    rodar_tarefa 'faixa-1' 'T-001' 'Você executa UMA tarefa da feature "connect-express-website" (fluxo onp-spec, spec-anchored).
Leia primeiro: .spec/features/connect-express-website/spec.md, .spec/features/connect-express-website/tasks.md e .spec/constituicao.md.

Sua tarefa (somente ela):
T-001 — "Base do projeto Next.js, tokens e apoio de testes"
  critérios/refs: AC-036 (Cores e fontes vêm de um único lugar)
  arquivos permitidos (e seus testes): package.json, package-lock.json, tsconfig.json, next.config.ts, eslint.config.mjs, onpspec.config.json, .spec/constituicao.md, src/app/layout.tsx, src/app/globals.css, src/app/page.tsx, src/styles/tokens.css, src/styles/base.css, tests/apoio.mjs, tests/us-012-marca.test.mjs
  mensagem de commit: "T-001 connect-express-website: Base do projeto Next.js, tokens e apoio de testes"

Regras inegociáveis:
- Todo critério de aceite referenciado vira teste com @spec:AC-xxx no título.
- NUNCA enfraqueça, pule (skip/todo) ou apague um teste para passar — teste pulado não é prova e o audit acusa.
- Rode os testes localmente com `node --test` até passarem.
- NÃO edite tasks.md, NÃO rode onp-spec verify/audit e NÃO toque em outras tarefas — o orquestrador cuida disso.
- Ao final de CADA tarefa: `git add` só no que você tocou e um commit próprio.' 'claude-sonnet-5' medium &&
    rodar_tarefa 'faixa-1' 'T-009' 'Você executa UMA tarefa da feature "connect-express-website" (fluxo onp-spec, spec-anchored).
Leia primeiro: .spec/features/connect-express-website/spec.md, .spec/features/connect-express-website/tasks.md e .spec/constituicao.md.

Sua tarefa (somente ela):
T-009 — "Montagem da página inicial"
  critérios/refs: AC-001 (A primeira tela diz o que a empresa faz e oferece a cotação), AC-002 (Os números da operação aparecem como prova), AC-004 (As quatro soluções aparecem na página inicial), AC-007 (A seção Quem Somos conta a história e os valores), AC-008 (A cobertura lista os estados atendidos), AC-009 (Os clientes aparecem como prova social)
  arquivos permitidos (e seus testes): src/app/page.tsx, tests/us-001-proposta.test.mjs, tests/us-003-confianca.test.mjs
  mensagem de commit: "T-009 connect-express-website: Montagem da página inicial"

Regras inegociáveis:
- Todo critério de aceite referenciado vira teste com @spec:AC-xxx no título.
- NUNCA enfraqueça, pule (skip/todo) ou apague um teste para passar — teste pulado não é prova e o audit acusa.
- Rode os testes localmente com `node --test` até passarem.
- NÃO edite tasks.md, NÃO rode onp-spec verify/audit e NÃO toque em outras tarefas — o orquestrador cuida disso.
- Ao final de CADA tarefa: `git add` só no que você tocou e um commit próprio.' 'claude-sonnet-5' medium
  ) >> "$LOG_DIR/faixa-1.log" 2>&1
  local st=$?
  mesclar_faixa 'faixa-1' 'spec/connect-express-website-faixa-1' "$WT" "$st" || return 1
  marcar_concluidas T-001 T-009
  return 0
}

# ── faixa-2: T-002 ──
executar_faixa_2() {
  local WT="$WT_BASE-faixa-2"
  preparar_worktree 'faixa-2' 'spec/connect-express-website-faixa-2' "$WT" || return 1
  evento --tipo faixa --faixa 'faixa-2' --estado executando --tentativa "$(tentativa 'faixa-2')"
  : > "$LOG_DIR/faixa-2.log"
  (
    cd "$WT" || exit 9
    rodar_tarefa 'faixa-2' 'T-002' 'Você executa UMA tarefa da feature "connect-express-website" (fluxo onp-spec, spec-anchored).
Leia primeiro: .spec/features/connect-express-website/spec.md, .spec/features/connect-express-website/tasks.md e .spec/constituicao.md.

Sua tarefa (somente ela):
T-002 — "Dados de conteúdo e copy"
  critérios/refs: AC-013 (Telefones, e-mails e endereços estão em texto)
  arquivos permitidos (e seus testes): src/data/empresa.ts, src/data/servicos.ts, src/data/inicio.ts, src/data/imagens.ts
  mensagem de commit: "T-002 connect-express-website: Dados de conteúdo e copy"

Regras inegociáveis:
- Todo critério de aceite referenciado vira teste com @spec:AC-xxx no título.
- NUNCA enfraqueça, pule (skip/todo) ou apague um teste para passar — teste pulado não é prova e o audit acusa.
- Rode os testes localmente com `node --test` até passarem.
- NÃO edite tasks.md, NÃO rode onp-spec verify/audit e NÃO toque em outras tarefas — o orquestrador cuida disso.
- Ao final de CADA tarefa: `git add` só no que você tocou e um commit próprio.' 'claude-sonnet-5' medium
  ) >> "$LOG_DIR/faixa-2.log" 2>&1
  local st=$?
  mesclar_faixa 'faixa-2' 'spec/connect-express-website-faixa-2' "$WT" "$st" || return 1
  marcar_concluidas T-002
  return 0
}

# ── faixa-3: T-003 ──
executar_faixa_3() {
  local WT="$WT_BASE-faixa-3"
  preparar_worktree 'faixa-3' 'spec/connect-express-website-faixa-3' "$WT" || return 1
  evento --tipo faixa --faixa 'faixa-3' --estado executando --tentativa "$(tentativa 'faixa-3')"
  : > "$LOG_DIR/faixa-3.log"
  (
    cd "$WT" || exit 9
    rodar_tarefa 'faixa-3' 'T-003' 'Você executa UMA tarefa da feature "connect-express-website" (fluxo onp-spec, spec-anchored).
Leia primeiro: .spec/features/connect-express-website/spec.md, .spec/features/connect-express-website/tasks.md e .spec/constituicao.md.

Sua tarefa (somente ela):
T-003 — "Componente de imagem com substituto"
  critérios/refs: AC-038 (Cada espaço de imagem tem nome, proporção e substituto), AC-039 (Trocar uma imagem é trocar um arquivo), AC-034 (Toda imagem informativa tem descrição), AC-028 (As imagens não empurram o conteúdo)
  arquivos permitidos (e seus testes): src/components/Imagem/Imagem.tsx, src/components/Imagem/Imagem.module.css, public/imagens/.gitkeep, tests/us-013-imagens.test.mjs
  mensagem de commit: "T-003 connect-express-website: Componente de imagem com substituto"

Regras inegociáveis:
- Todo critério de aceite referenciado vira teste com @spec:AC-xxx no título.
- NUNCA enfraqueça, pule (skip/todo) ou apague um teste para passar — teste pulado não é prova e o audit acusa.
- Rode os testes localmente com `node --test` até passarem.
- NÃO edite tasks.md, NÃO rode onp-spec verify/audit e NÃO toque em outras tarefas — o orquestrador cuida disso.
- Ao final de CADA tarefa: `git add` só no que você tocou e um commit próprio.' 'claude-sonnet-5' medium
  ) >> "$LOG_DIR/faixa-3.log" 2>&1
  local st=$?
  mesclar_faixa 'faixa-3' 'spec/connect-express-website-faixa-3' "$WT" "$st" || return 1
  marcar_concluidas T-003
  return 0
}

# ── faixa-4: T-004 ──
executar_faixa_4() {
  local WT="$WT_BASE-faixa-4"
  preparar_worktree 'faixa-4' 'spec/connect-express-website-faixa-4' "$WT" || return 1
  evento --tipo faixa --faixa 'faixa-4' --estado executando --tentativa "$(tentativa 'faixa-4')"
  : > "$LOG_DIR/faixa-4.log"
  (
    cd "$WT" || exit 9
    rodar_tarefa 'faixa-4' 'T-004' 'Você executa UMA tarefa da feature "connect-express-website" (fluxo onp-spec, spec-anchored).
Leia primeiro: .spec/features/connect-express-website/spec.md, .spec/features/connect-express-website/tasks.md e .spec/constituicao.md.

Sua tarefa (somente ela):
T-004 — "Componentes de animação com GSAP"
  critérios/refs: AC-027 (Nada bloqueia a primeira pintura)
  arquivos permitidos (e seus testes): src/animacoes/gsap.ts, src/animacoes/Revelar.tsx, src/animacoes/Escalonar.tsx, src/animacoes/Contador.tsx, src/animacoes/constantes.ts
  mensagem de commit: "T-004 connect-express-website: Componentes de animação com GSAP"

Regras inegociáveis:
- Todo critério de aceite referenciado vira teste com @spec:AC-xxx no título.
- NUNCA enfraqueça, pule (skip/todo) ou apague um teste para passar — teste pulado não é prova e o audit acusa.
- Rode os testes localmente com `node --test` até passarem.
- NÃO edite tasks.md, NÃO rode onp-spec verify/audit e NÃO toque em outras tarefas — o orquestrador cuida disso.
- Ao final de CADA tarefa: `git add` só no que você tocou e um commit próprio.' 'claude-sonnet-5' medium
  ) >> "$LOG_DIR/faixa-4.log" 2>&1
  local st=$?
  mesclar_faixa 'faixa-4' 'spec/connect-express-website-faixa-4' "$WT" "$st" || return 1
  marcar_concluidas T-004
  return 0
}

# ── faixa-5: T-005 ──
executar_faixa_5() {
  local WT="$WT_BASE-faixa-5"
  preparar_worktree 'faixa-5' 'spec/connect-express-website-faixa-5' "$WT" || return 1
  evento --tipo faixa --faixa 'faixa-5' --estado executando --tentativa "$(tentativa 'faixa-5')"
  : > "$LOG_DIR/faixa-5.log"
  (
    cd "$WT" || exit 9
    rodar_tarefa 'faixa-5' 'T-005' 'Você executa UMA tarefa da feature "connect-express-website" (fluxo onp-spec, spec-anchored).
Leia primeiro: .spec/features/connect-express-website/spec.md, .spec/features/connect-express-website/tasks.md e .spec/constituicao.md.

Sua tarefa (somente ela):
T-005 — "Cabeçalho, menu, rodapé e botão de WhatsApp"
  critérios/refs: AC-003 (O menu leva a todas as seções e ações principais), AC-012 (O WhatsApp comercial está a um toque), AC-014 (O rastreio abre o portal oficial), AC-017 (No celular o menu vira um botão acessível), AC-037 (O logotipo oficial aparece no cabeçalho e no rodapé), AC-033 (A estrutura da página é anunciada corretamente), AC-035 (O foco do teclado é sempre visível), AC-030 (Links externos não dão controle da página a terceiros)
  arquivos permitidos (e seus testes): src/components/Cabecalho/Cabecalho.tsx, src/components/Cabecalho/Cabecalho.module.css, src/components/Cabecalho/MenuCelular.tsx, src/components/Rodape/Rodape.tsx, src/components/Rodape/Rodape.module.css, src/components/BotaoWhatsApp/BotaoWhatsApp.tsx, src/components/BotaoWhatsApp/BotaoWhatsApp.module.css, src/components/Botao/Botao.tsx, src/components/Botao/Botao.module.css, src/components/PularConteudo/PularConteudo.tsx, public/logos/.gitkeep, tests/us-011-acessibilidade.test.mjs, tests/us-005-atalhos.test.mjs
  mensagem de commit: "T-005 connect-express-website: Cabeçalho, menu, rodapé e botão de WhatsApp"

Regras inegociáveis:
- Todo critério de aceite referenciado vira teste com @spec:AC-xxx no título.
- NUNCA enfraqueça, pule (skip/todo) ou apague um teste para passar — teste pulado não é prova e o audit acusa.
- Rode os testes localmente com `node --test` até passarem.
- NÃO edite tasks.md, NÃO rode onp-spec verify/audit e NÃO toque em outras tarefas — o orquestrador cuida disso.
- Ao final de CADA tarefa: `git add` só no que você tocou e um commit próprio.' 'claude-sonnet-5' medium
  ) >> "$LOG_DIR/faixa-5.log" 2>&1
  local st=$?
  mesclar_faixa 'faixa-5' 'spec/connect-express-website-faixa-5' "$WT" "$st" || return 1
  marcar_concluidas T-005
  return 0
}

# ── faixa-6: T-006 ──
executar_faixa_6() {
  local WT="$WT_BASE-faixa-6"
  preparar_worktree 'faixa-6' 'spec/connect-express-website-faixa-6' "$WT" || return 1
  evento --tipo faixa --faixa 'faixa-6' --estado executando --tentativa "$(tentativa 'faixa-6')"
  : > "$LOG_DIR/faixa-6.log"
  (
    cd "$WT" || exit 9
    rodar_tarefa 'faixa-6' 'T-006' 'Você executa UMA tarefa da feature "connect-express-website" (fluxo onp-spec, spec-anchored).
Leia primeiro: .spec/features/connect-express-website/spec.md, .spec/features/connect-express-website/tasks.md e .spec/constituicao.md.

Sua tarefa (somente ela):
T-006 — "Seções da página inicial: herói, números, quem somos e desafio"
  critérios/refs: AC-001 (A primeira tela diz o que a empresa faz e oferece a cotação), AC-002 (Os números da operação aparecem como prova), AC-007 (A seção Quem Somos conta a história e os valores)
  arquivos permitidos (e seus testes): src/components/secoes/Heroi.tsx, src/components/secoes/Heroi.module.css, src/components/secoes/Numeros.tsx, src/components/secoes/Numeros.module.css, src/components/secoes/QuemSomos.tsx, src/components/secoes/QuemSomos.module.css, src/components/secoes/Desafio.tsx, src/components/secoes/Desafio.module.css, src/components/secoes/Valores.tsx, src/components/secoes/Valores.module.css
  mensagem de commit: "T-006 connect-express-website: Seções da página inicial: herói, números, quem somos e desafio"

Regras inegociáveis:
- Todo critério de aceite referenciado vira teste com @spec:AC-xxx no título.
- NUNCA enfraqueça, pule (skip/todo) ou apague um teste para passar — teste pulado não é prova e o audit acusa.
- Rode os testes localmente com `node --test` até passarem.
- NÃO edite tasks.md, NÃO rode onp-spec verify/audit e NÃO toque em outras tarefas — o orquestrador cuida disso.
- Ao final de CADA tarefa: `git add` só no que você tocou e um commit próprio.' 'claude-sonnet-5' medium
  ) >> "$LOG_DIR/faixa-6.log" 2>&1
  local st=$?
  mesclar_faixa 'faixa-6' 'spec/connect-express-website-faixa-6' "$WT" "$st" || return 1
  marcar_concluidas T-006
  return 0
}

# ── faixa-7: T-007 ──
executar_faixa_7() {
  local WT="$WT_BASE-faixa-7"
  preparar_worktree 'faixa-7' 'spec/connect-express-website-faixa-7' "$WT" || return 1
  evento --tipo faixa --faixa 'faixa-7' --estado executando --tentativa "$(tentativa 'faixa-7')"
  : > "$LOG_DIR/faixa-7.log"
  (
    cd "$WT" || exit 9
    rodar_tarefa 'faixa-7' 'T-007' 'Você executa UMA tarefa da feature "connect-express-website" (fluxo onp-spec, spec-anchored).
Leia primeiro: .spec/features/connect-express-website/spec.md, .spec/features/connect-express-website/tasks.md e .spec/constituicao.md.

Sua tarefa (somente ela):
T-007 — "Seções da página inicial: soluções, operação, cobertura e clientes"
  critérios/refs: AC-004 (As quatro soluções aparecem na página inicial), AC-008 (A cobertura lista os estados atendidos), AC-009 (Os clientes aparecem como prova social)
  arquivos permitidos (e seus testes): src/components/secoes/Solucoes.tsx, src/components/secoes/Solucoes.module.css, src/components/secoes/Operacao.tsx, src/components/secoes/Operacao.module.css, src/components/secoes/Cobertura.tsx, src/components/secoes/Cobertura.module.css, src/components/secoes/Clientes.tsx, src/components/secoes/Clientes.module.css
  mensagem de commit: "T-007 connect-express-website: Seções da página inicial: soluções, operação, cobertura e clientes"

Regras inegociáveis:
- Todo critério de aceite referenciado vira teste com @spec:AC-xxx no título.
- NUNCA enfraqueça, pule (skip/todo) ou apague um teste para passar — teste pulado não é prova e o audit acusa.
- Rode os testes localmente com `node --test` até passarem.
- NÃO edite tasks.md, NÃO rode onp-spec verify/audit e NÃO toque em outras tarefas — o orquestrador cuida disso.
- Ao final de CADA tarefa: `git add` só no que você tocou e um commit próprio.' 'claude-sonnet-5' medium
  ) >> "$LOG_DIR/faixa-7.log" 2>&1
  local st=$?
  mesclar_faixa 'faixa-7' 'spec/connect-express-website-faixa-7' "$WT" "$st" || return 1
  marcar_concluidas T-007
  return 0
}

# ── faixa-8: T-008 ──
executar_faixa_8() {
  local WT="$WT_BASE-faixa-8"
  preparar_worktree 'faixa-8' 'spec/connect-express-website-faixa-8' "$WT" || return 1
  evento --tipo faixa --faixa 'faixa-8' --estado executando --tentativa "$(tentativa 'faixa-8')"
  : > "$LOG_DIR/faixa-8.log"
  (
    cd "$WT" || exit 9
    rodar_tarefa 'faixa-8' 'T-008' 'Você executa UMA tarefa da feature "connect-express-website" (fluxo onp-spec, spec-anchored).
Leia primeiro: .spec/features/connect-express-website/spec.md, .spec/features/connect-express-website/tasks.md e .spec/constituicao.md.

Sua tarefa (somente ela):
T-008 — "Perguntas frequentes, contato e envio do formulário"
  critérios/refs: AC-010 (O formulário de contato pede só o necessário), AC-011 (O formulário avisa o que falta antes de enviar), AC-031 (O formulário barra robôs e informa o uso dos dados), AC-006 (Cada página de solução responde às dúvidas comuns)
  arquivos permitidos (e seus testes): src/components/secoes/Perguntas.tsx, src/components/secoes/Perguntas.module.css, src/components/secoes/Contato.tsx, src/components/secoes/Contato.module.css, src/components/Formulario/FormularioContato.tsx, src/components/Formulario/Formulario.module.css, src/components/Formulario/validacao.ts, src/app/api/contato/route.ts, .env.example, tests/us-004-cotacao.test.mjs
  mensagem de commit: "T-008 connect-express-website: Perguntas frequentes, contato e envio do formulário"

Regras inegociáveis:
- Todo critério de aceite referenciado vira teste com @spec:AC-xxx no título.
- NUNCA enfraqueça, pule (skip/todo) ou apague um teste para passar — teste pulado não é prova e o audit acusa.
- Rode os testes localmente com `node --test` até passarem.
- NÃO edite tasks.md, NÃO rode onp-spec verify/audit e NÃO toque em outras tarefas — o orquestrador cuida disso.
- Ao final de CADA tarefa: `git add` só no que você tocou e um commit próprio.' 'claude-sonnet-5' medium
  ) >> "$LOG_DIR/faixa-8.log" 2>&1
  local st=$?
  mesclar_faixa 'faixa-8' 'spec/connect-express-website-faixa-8' "$WT" "$st" || return 1
  marcar_concluidas T-008
  return 0
}

# ── faixa-9: T-010 ──
executar_faixa_9() {
  local WT="$WT_BASE-faixa-9"
  preparar_worktree 'faixa-9' 'spec/connect-express-website-faixa-9' "$WT" || return 1
  evento --tipo faixa --faixa 'faixa-9' --estado executando --tentativa "$(tentativa 'faixa-9')"
  : > "$LOG_DIR/faixa-9.log"
  (
    cd "$WT" || exit 9
    rodar_tarefa 'faixa-9' 'T-010' 'Você executa UMA tarefa da feature "connect-express-website" (fluxo onp-spec, spec-anchored).
Leia primeiro: .spec/features/connect-express-website/spec.md, .spec/features/connect-express-website/tasks.md e .spec/constituicao.md.

Sua tarefa (somente ela):
T-010 — "Páginas de solução"
  critérios/refs: AC-005 (Cada solução tem página própria no mesmo endereço do site antigo), AC-006 (Cada página de solução responde às dúvidas comuns)
  arquivos permitidos (e seus testes): src/app/servicos/[slug]/page.tsx, src/app/servicos/[slug]/pagina.module.css, tests/us-002-solucoes.test.mjs
  mensagem de commit: "T-010 connect-express-website: Páginas de solução"

Regras inegociáveis:
- Todo critério de aceite referenciado vira teste com @spec:AC-xxx no título.
- NUNCA enfraqueça, pule (skip/todo) ou apague um teste para passar — teste pulado não é prova e o audit acusa.
- Rode os testes localmente com `node --test` até passarem.
- NÃO edite tasks.md, NÃO rode onp-spec verify/audit e NÃO toque em outras tarefas — o orquestrador cuida disso.
- Ao final de CADA tarefa: `git add` só no que você tocou e um commit próprio.' 'claude-sonnet-5' medium
  ) >> "$LOG_DIR/faixa-9.log" 2>&1
  local st=$?
  mesclar_faixa 'faixa-9' 'spec/connect-express-website-faixa-9' "$WT" "$st" || return 1
  marcar_concluidas T-010
  return 0
}

# ── faixa-10: T-011 ──
executar_faixa_10() {
  local WT="$WT_BASE-faixa-10"
  preparar_worktree 'faixa-10' 'spec/connect-express-website-faixa-10' "$WT" || return 1
  evento --tipo faixa --faixa 'faixa-10' --estado executando --tentativa "$(tentativa 'faixa-10')"
  : > "$LOG_DIR/faixa-10.log"
  (
    cd "$WT" || exit 9
    rodar_tarefa 'faixa-10' 'T-011' 'Você executa UMA tarefa da feature "connect-express-website" (fluxo onp-spec, spec-anchored).
Leia primeiro: .spec/features/connect-express-website/spec.md, .spec/features/connect-express-website/tasks.md e .spec/constituicao.md.

Sua tarefa (somente ela):
T-011 — "Página Trabalhe Conosco"
  critérios/refs: AC-015 (A página Trabalhe Conosco explica requisitos e recebe candidaturas)
  arquivos permitidos (e seus testes): src/app/trabalhe-conosco/page.tsx, src/app/trabalhe-conosco/pagina.module.css, src/components/Formulario/FormularioVagas.tsx, src/app/api/vagas/route.ts
  mensagem de commit: "T-011 connect-express-website: Página Trabalhe Conosco"

Regras inegociáveis:
- Todo critério de aceite referenciado vira teste com @spec:AC-xxx no título.
- NUNCA enfraqueça, pule (skip/todo) ou apague um teste para passar — teste pulado não é prova e o audit acusa.
- Rode os testes localmente com `node --test` até passarem.
- NÃO edite tasks.md, NÃO rode onp-spec verify/audit e NÃO toque em outras tarefas — o orquestrador cuida disso.
- Ao final de CADA tarefa: `git add` só no que você tocou e um commit próprio.' 'claude-sonnet-5' medium
  ) >> "$LOG_DIR/faixa-10.log" 2>&1
  local st=$?
  mesclar_faixa 'faixa-10' 'spec/connect-express-website-faixa-10' "$WT" "$st" || return 1
  marcar_concluidas T-011
  return 0
}

# ── faixa-11: T-012 ──
executar_faixa_11() {
  local WT="$WT_BASE-faixa-11"
  preparar_worktree 'faixa-11' 'spec/connect-express-website-faixa-11' "$WT" || return 1
  evento --tipo faixa --faixa 'faixa-11' --estado executando --tentativa "$(tentativa 'faixa-11')"
  : > "$LOG_DIR/faixa-11.log"
  (
    cd "$WT" || exit 9
    rodar_tarefa 'faixa-11' 'T-012' 'Você executa UMA tarefa da feature "connect-express-website" (fluxo onp-spec, spec-anchored).
Leia primeiro: .spec/features/connect-express-website/spec.md, .spec/features/connect-express-website/tasks.md e .spec/constituicao.md.

Sua tarefa (somente ela):
T-012 — "Política de Privacidade e página não encontrada"
  critérios/refs: AC-032 (A Política de Privacidade existe)
  arquivos permitidos (e seus testes): src/app/politica-de-privacidade/page.tsx, src/app/politica-de-privacidade/pagina.module.css, src/app/not-found.tsx
  mensagem de commit: "T-012 connect-express-website: Política de Privacidade e página não encontrada"

Regras inegociáveis:
- Todo critério de aceite referenciado vira teste com @spec:AC-xxx no título.
- NUNCA enfraqueça, pule (skip/todo) ou apague um teste para passar — teste pulado não é prova e o audit acusa.
- Rode os testes localmente com `node --test` até passarem.
- NÃO edite tasks.md, NÃO rode onp-spec verify/audit e NÃO toque em outras tarefas — o orquestrador cuida disso.
- Ao final de CADA tarefa: `git add` só no que você tocou e um commit próprio.' 'claude-sonnet-5' medium
  ) >> "$LOG_DIR/faixa-11.log" 2>&1
  local st=$?
  mesclar_faixa 'faixa-11' 'spec/connect-express-website-faixa-11' "$WT" "$st" || return 1
  marcar_concluidas T-012
  return 0
}

# ── faixa-12: T-013 ──
executar_faixa_12() {
  local WT="$WT_BASE-faixa-12"
  preparar_worktree 'faixa-12' 'spec/connect-express-website-faixa-12' "$WT" || return 1
  evento --tipo faixa --faixa 'faixa-12' --estado executando --tentativa "$(tentativa 'faixa-12')"
  : > "$LOG_DIR/faixa-12.log"
  (
    cd "$WT" || exit 9
    rodar_tarefa 'faixa-12' 'T-013' 'Você executa UMA tarefa da feature "connect-express-website" (fluxo onp-spec, spec-anchored).
Leia primeiro: .spec/features/connect-express-website/spec.md, .spec/features/connect-express-website/tasks.md e .spec/constituicao.md.

Sua tarefa (somente ela):
T-013 — "SEO: metadados, sitemap, robôs e dados da organização"
  critérios/refs: AC-019 (Cada página tem título e descrição próprios), AC-020 (Cada página declara seu endereço oficial e prévia de compartilhamento), AC-021 (O site entrega mapa de páginas e regras para robôs), AC-022 (A empresa é descrita em dados estruturados)
  arquivos permitidos (e seus testes): src/app/sitemap.ts, src/app/robots.ts, src/lib/metadados.ts, src/lib/jsonld.ts, src/components/JsonLd/JsonLd.tsx, tests/us-007-seo.test.mjs
  mensagem de commit: "T-013 connect-express-website: SEO: metadados, sitemap, robôs e dados da organização"

Regras inegociáveis:
- Todo critério de aceite referenciado vira teste com @spec:AC-xxx no título.
- NUNCA enfraqueça, pule (skip/todo) ou apague um teste para passar — teste pulado não é prova e o audit acusa.
- Rode os testes localmente com `node --test` até passarem.
- NÃO edite tasks.md, NÃO rode onp-spec verify/audit e NÃO toque em outras tarefas — o orquestrador cuida disso.
- Ao final de CADA tarefa: `git add` só no que você tocou e um commit próprio.' 'claude-sonnet-5' medium
  ) >> "$LOG_DIR/faixa-12.log" 2>&1
  local st=$?
  mesclar_faixa 'faixa-12' 'spec/connect-express-website-faixa-12' "$WT" "$st" || return 1
  marcar_concluidas T-013
  return 0
}

# ── faixa-13: T-014 ──
executar_faixa_13() {
  local WT="$WT_BASE-faixa-13"
  preparar_worktree 'faixa-13' 'spec/connect-express-website-faixa-13' "$WT" || return 1
  evento --tipo faixa --faixa 'faixa-13' --estado executando --tentativa "$(tentativa 'faixa-13')"
  : > "$LOG_DIR/faixa-13.log"
  (
    cd "$WT" || exit 9
    rodar_tarefa 'faixa-13' 'T-014' 'Você executa UMA tarefa da feature "connect-express-website" (fluxo onp-spec, spec-anchored).
Leia primeiro: .spec/features/connect-express-website/spec.md, .spec/features/connect-express-website/tasks.md e .spec/constituicao.md.

Sua tarefa (somente ela):
T-014 — "GEO: llms.txt e dados estruturados de perguntas e serviços"
  critérios/refs: AC-023 (As perguntas frequentes são legíveis por máquina), AC-024 (O site oferece um resumo para assistentes), AC-025 (Cada solução é descrita como serviço)
  arquivos permitidos (e seus testes): src/app/llms.txt/route.ts, tests/us-008-geo.test.mjs
  mensagem de commit: "T-014 connect-express-website: GEO: llms.txt e dados estruturados de perguntas e serviços"

Regras inegociáveis:
- Todo critério de aceite referenciado vira teste com @spec:AC-xxx no título.
- NUNCA enfraqueça, pule (skip/todo) ou apague um teste para passar — teste pulado não é prova e o audit acusa.
- Rode os testes localmente com `node --test` até passarem.
- NÃO edite tasks.md, NÃO rode onp-spec verify/audit e NÃO toque em outras tarefas — o orquestrador cuida disso.
- Ao final de CADA tarefa: `git add` só no que você tocou e um commit próprio.' 'claude-sonnet-5' medium
  ) >> "$LOG_DIR/faixa-13.log" 2>&1
  local st=$?
  mesclar_faixa 'faixa-13' 'spec/connect-express-website-faixa-13' "$WT" "$st" || return 1
  marcar_concluidas T-014
  return 0
}

# ── faixa-14: T-015 ──
executar_faixa_14() {
  local WT="$WT_BASE-faixa-14"
  preparar_worktree 'faixa-14' 'spec/connect-express-website-faixa-14' "$WT" || return 1
  evento --tipo faixa --faixa 'faixa-14' --estado executando --tentativa "$(tentativa 'faixa-14')"
  : > "$LOG_DIR/faixa-14.log"
  (
    cd "$WT" || exit 9
    rodar_tarefa 'faixa-14' 'T-015' 'Você executa UMA tarefa da feature "connect-express-website" (fluxo onp-spec, spec-anchored).
Leia primeiro: .spec/features/connect-express-website/spec.md, .spec/features/connect-express-website/tasks.md e .spec/constituicao.md.

Sua tarefa (somente ela):
T-015 — "Segurança: cabeçalhos e links externos"
  critérios/refs: AC-029 (O site declara as proteções de navegador), AC-030 (Links externos não dão controle da página a terceiros)
  arquivos permitidos (e seus testes): tests/us-010-seguranca.test.mjs
  mensagem de commit: "T-015 connect-express-website: Segurança: cabeçalhos e links externos"

Regras inegociáveis:
- Todo critério de aceite referenciado vira teste com @spec:AC-xxx no título.
- NUNCA enfraqueça, pule (skip/todo) ou apague um teste para passar — teste pulado não é prova e o audit acusa.
- Rode os testes localmente com `node --test` até passarem.
- NÃO edite tasks.md, NÃO rode onp-spec verify/audit e NÃO toque em outras tarefas — o orquestrador cuida disso.
- Ao final de CADA tarefa: `git add` só no que você tocou e um commit próprio.' 'claude-sonnet-5' medium
  ) >> "$LOG_DIR/faixa-14.log" 2>&1
  local st=$?
  mesclar_faixa 'faixa-14' 'spec/connect-express-website-faixa-14' "$WT" "$st" || return 1
  marcar_concluidas T-015
  return 0
}

# ── faixa-15: T-016 ──
executar_faixa_15() {
  local WT="$WT_BASE-faixa-15"
  preparar_worktree 'faixa-15' 'spec/connect-express-website-faixa-15' "$WT" || return 1
  evento --tipo faixa --faixa 'faixa-15' --estado executando --tentativa "$(tentativa 'faixa-15')"
  : > "$LOG_DIR/faixa-15.log"
  (
    cd "$WT" || exit 9
    rodar_tarefa 'faixa-15' 'T-016' 'Você executa UMA tarefa da feature "connect-express-website" (fluxo onp-spec, spec-anchored).
Leia primeiro: .spec/features/connect-express-website/spec.md, .spec/features/connect-express-website/tasks.md e .spec/constituicao.md.

Sua tarefa (somente ela):
T-016 — "Responsividade, toque e orçamento de peso"
  critérios/refs: AC-016 (O site se ajusta à largura do aparelho), AC-017 (No celular o menu vira um botão acessível), AC-018 (Botões e links são fáceis de tocar), AC-026 (As páginas são leves), AC-027 (Nada bloqueia a primeira pintura), AC-028 (As imagens não empurram o conteúdo)
  arquivos permitidos (e seus testes): tests/us-006-responsivo.test.mjs, tests/us-009-velocidade.test.mjs
  mensagem de commit: "T-016 connect-express-website: Responsividade, toque e orçamento de peso"

Regras inegociáveis:
- Todo critério de aceite referenciado vira teste com @spec:AC-xxx no título.
- NUNCA enfraqueça, pule (skip/todo) ou apague um teste para passar — teste pulado não é prova e o audit acusa.
- Rode os testes localmente com `node --test` até passarem.
- NÃO edite tasks.md, NÃO rode onp-spec verify/audit e NÃO toque em outras tarefas — o orquestrador cuida disso.
- Ao final de CADA tarefa: `git add` só no que você tocou e um commit próprio.' 'claude-sonnet-5' medium
  ) >> "$LOG_DIR/faixa-15.log" 2>&1
  local st=$?
  mesclar_faixa 'faixa-15' 'spec/connect-express-website-faixa-15' "$WT" "$st" || return 1
  marcar_concluidas T-016
  return 0
}

# ── faixa-16: T-017 ──
executar_faixa_16() {
  local WT="$WT_BASE-faixa-16"
  preparar_worktree 'faixa-16' 'spec/connect-express-website-faixa-16' "$WT" || return 1
  evento --tipo faixa --faixa 'faixa-16' --estado executando --tentativa "$(tentativa 'faixa-16')"
  : > "$LOG_DIR/faixa-16.log"
  (
    cd "$WT" || exit 9
    rodar_tarefa 'faixa-16' 'T-017' 'Você executa UMA tarefa da feature "connect-express-website" (fluxo onp-spec, spec-anchored).
Leia primeiro: .spec/features/connect-express-website/spec.md, .spec/features/connect-express-website/tasks.md e .spec/constituicao.md.

Sua tarefa (somente ela):
T-017 — "Publicação na Vercel"
  critérios/refs: US-009, US-010
  arquivos permitidos (e seus testes): README.md
  mensagem de commit: "T-017 connect-express-website: Publicação na Vercel"

Regras inegociáveis:
- Todo critério de aceite referenciado vira teste com @spec:AC-xxx no título.
- NUNCA enfraqueça, pule (skip/todo) ou apague um teste para passar — teste pulado não é prova e o audit acusa.
- Rode os testes localmente com `node --test` até passarem.
- NÃO edite tasks.md, NÃO rode onp-spec verify/audit e NÃO toque em outras tarefas — o orquestrador cuida disso.
- Ao final de CADA tarefa: `git add` só no que você tocou e um commit próprio.' 'claude-sonnet-5' medium
  ) >> "$LOG_DIR/faixa-16.log" 2>&1
  local st=$?
  mesclar_faixa 'faixa-16' 'spec/connect-express-website-faixa-16' "$WT" "$st" || return 1
  marcar_concluidas T-017
  return 0
}

# ── gate: quem decide é a máquina ────────────────────────────────────
rodar_gate() {
  echo
  info "gate: verify + audit --ci"
  evento --tipo gate --etapa inicio
  node "$ENGINE" verify "$FEATURE"
  local v=$?
  evento --tipo gate --etapa verify --exit "$v"
  node "$ENGINE" audit --ci
  AUDIT=$?
  evento --tipo gate --etapa audit --exit "$AUDIT"
  # fecha a contabilidade: status das tarefas + prova do verify no git
  if [ -n "$(git status --porcelain -- '.spec')" ]; then
    git add -A -- '.spec'
    git commit -q -m "$FEATURE: status das tarefas + prova do verify (plano)"
    info "status das tarefas e prova do verify commitados"
  fi
  return "$AUDIT"
}

encerrar() { # $1=escopo
  echo
  if [ -n "$FALHAS" ]; then vermelho "faixas/tarefas com falha:$FALHAS"; fi
  # sem gate não existe veredito: NUNCA anunciar alinhamento sem o audit
  if [ "$COM_GATE" -eq 0 ]; then
    evento --tipo fim --exit 1 --escopo "$1"
    if [ -z "$FALHAS" ]; then
      amarelo "○ trabalho de '$1' terminou SEM o gate (--sem-gate) — isto NÃO é prova de nada"
      amarelo "  para o veredito: bash .spec/features/connect-express-website/executar-tarefas.sh --gate"
      exit 0
    fi
    vermelho "e ainda há falhas — conserte e rode o gate"
    exit 1
  fi
  rodar_gate
  local audit=$?
  if [ "$audit" -eq 0 ] && [ -z "$FALHAS" ]; then
    evento --tipo fim --exit 0 --escopo "$1"
    verde "✔ plano concluído — especificação e código alinhados (audit exit 0) na branch $BASE_BRANCH"
    info "próximo passo: revise e leve para a main quando quiser (git merge $BASE_BRANCH)"
    exit 0
  fi
  evento --tipo fim --exit 1 --escopo "$1"
  vermelho "plano terminou com pendências — leia a saída do audit acima e os logs em $LOG_DIR"
  amarelo "dica: reexecute só o que falhou (--faixa <id> / --seq <T-xxx>)"
  exit 1
}

executar_tudo() {
  evento --tipo inicio --escopo tudo
  iniciar_resumos
  info "logs em: $LOG_DIR"
  info "resumo geral de andamento: a cada 1 min aqui no terminal (e via: onp-spec resumo)"
  # onda 1: faixa-1 ∥ faixa-2 ∥ faixa-3
  info "onda 1: faixa-1 ∥ faixa-2 ∥ faixa-3 — janelas limpas em paralelo"
  executar_faixa_1 & PID_FAIXA_1=$!
  executar_faixa_2 & PID_FAIXA_2=$!
  executar_faixa_3 & PID_FAIXA_3=$!
  wait "$PID_FAIXA_1" || true
  wait "$PID_FAIXA_2" || true
  wait "$PID_FAIXA_3" || true
  # onda 2: faixa-4 ∥ faixa-5 ∥ faixa-6
  info "onda 2: faixa-4 ∥ faixa-5 ∥ faixa-6 — janelas limpas em paralelo"
  executar_faixa_4 & PID_FAIXA_4=$!
  executar_faixa_5 & PID_FAIXA_5=$!
  executar_faixa_6 & PID_FAIXA_6=$!
  wait "$PID_FAIXA_4" || true
  wait "$PID_FAIXA_5" || true
  wait "$PID_FAIXA_6" || true
  # onda 3: faixa-7 ∥ faixa-8 ∥ faixa-9
  info "onda 3: faixa-7 ∥ faixa-8 ∥ faixa-9 — janelas limpas em paralelo"
  executar_faixa_7 & PID_FAIXA_7=$!
  executar_faixa_8 & PID_FAIXA_8=$!
  executar_faixa_9 & PID_FAIXA_9=$!
  wait "$PID_FAIXA_7" || true
  wait "$PID_FAIXA_8" || true
  wait "$PID_FAIXA_9" || true
  # onda 4: faixa-10 ∥ faixa-11 ∥ faixa-12
  info "onda 4: faixa-10 ∥ faixa-11 ∥ faixa-12 — janelas limpas em paralelo"
  executar_faixa_10 & PID_FAIXA_10=$!
  executar_faixa_11 & PID_FAIXA_11=$!
  executar_faixa_12 & PID_FAIXA_12=$!
  wait "$PID_FAIXA_10" || true
  wait "$PID_FAIXA_11" || true
  wait "$PID_FAIXA_12" || true
  # onda 5: faixa-13 ∥ faixa-14 ∥ faixa-15
  info "onda 5: faixa-13 ∥ faixa-14 ∥ faixa-15 — janelas limpas em paralelo"
  executar_faixa_13 & PID_FAIXA_13=$!
  executar_faixa_14 & PID_FAIXA_14=$!
  executar_faixa_15 & PID_FAIXA_15=$!
  wait "$PID_FAIXA_13" || true
  wait "$PID_FAIXA_14" || true
  wait "$PID_FAIXA_15" || true
  # onda 6: faixa-16
  info "onda 6: faixa-16 — janelas limpas em paralelo"
  executar_faixa_16 & PID_FAIXA_16=$!
  wait "$PID_FAIXA_16" || true
  encerrar tudo
}

listar() {
  echo "execução: $RUN_ID (feature $FEATURE, branch $BASE_BRANCH)"
  echo "  faixa-1  onda 1  T-001, T-009"
  echo "  faixa-2  onda 1  T-002"
  echo "  faixa-3  onda 1  T-003"
  echo "  faixa-4  onda 2  T-004"
  echo "  faixa-5  onda 2  T-005"
  echo "  faixa-6  onda 2  T-006"
  echo "  faixa-7  onda 3  T-007"
  echo "  faixa-8  onda 3  T-008"
  echo "  faixa-9  onda 3  T-010"
  echo "  faixa-10  onda 4  T-011"
  echo "  faixa-11  onda 4  T-012"
  echo "  faixa-12  onda 4  T-013"
  echo "  faixa-13  onda 5  T-014"
  echo "  faixa-14  onda 5  T-015"
  echo "  faixa-15  onda 5  T-016"
  echo "  faixa-16  onda 6  T-017"
  echo
  echo "reexecutar uma faixa:    --faixa <id>"
  echo "reexecutar sequencial:   --seq <T-xxx>"
  echo "só o gate:               --gate"
}

MODO="tudo"
ALVO=""
while [ $# -gt 0 ]; do
  case "$1" in
    --listar) MODO="listar" ;;
    --gate) MODO="gate" ;;
    --sem-gate) COM_GATE=0 ;;
    --faixa) MODO="faixa"; ALVO="${2:-}"; shift ;;
    --seq) MODO="seq"; ALVO="${2:-}"; shift ;;
    -h|--help) sed -n "2,14p" "$0"; exit 0 ;;
    *) vermelho "argumento desconhecido: $1"; sed -n "2,14p" "$0"; exit 2 ;;
  esac
  shift
done

if [ "$MODO" = "listar" ]; then listar; exit 0; fi

preparar_ambiente

case "$MODO" in
  tudo) executar_tudo ;;
  gate) COM_GATE=1; iniciar_resumos; encerrar gate ;;
  faixa)
    case "$ALVO" in
      faixa-1) evento --tipo inicio --escopo "faixa:faixa-1"; iniciar_resumos; executar_faixa_1 || true; encerrar "faixa:faixa-1" ;;
      faixa-2) evento --tipo inicio --escopo "faixa:faixa-2"; iniciar_resumos; executar_faixa_2 || true; encerrar "faixa:faixa-2" ;;
      faixa-3) evento --tipo inicio --escopo "faixa:faixa-3"; iniciar_resumos; executar_faixa_3 || true; encerrar "faixa:faixa-3" ;;
      faixa-4) evento --tipo inicio --escopo "faixa:faixa-4"; iniciar_resumos; executar_faixa_4 || true; encerrar "faixa:faixa-4" ;;
      faixa-5) evento --tipo inicio --escopo "faixa:faixa-5"; iniciar_resumos; executar_faixa_5 || true; encerrar "faixa:faixa-5" ;;
      faixa-6) evento --tipo inicio --escopo "faixa:faixa-6"; iniciar_resumos; executar_faixa_6 || true; encerrar "faixa:faixa-6" ;;
      faixa-7) evento --tipo inicio --escopo "faixa:faixa-7"; iniciar_resumos; executar_faixa_7 || true; encerrar "faixa:faixa-7" ;;
      faixa-8) evento --tipo inicio --escopo "faixa:faixa-8"; iniciar_resumos; executar_faixa_8 || true; encerrar "faixa:faixa-8" ;;
      faixa-9) evento --tipo inicio --escopo "faixa:faixa-9"; iniciar_resumos; executar_faixa_9 || true; encerrar "faixa:faixa-9" ;;
      faixa-10) evento --tipo inicio --escopo "faixa:faixa-10"; iniciar_resumos; executar_faixa_10 || true; encerrar "faixa:faixa-10" ;;
      faixa-11) evento --tipo inicio --escopo "faixa:faixa-11"; iniciar_resumos; executar_faixa_11 || true; encerrar "faixa:faixa-11" ;;
      faixa-12) evento --tipo inicio --escopo "faixa:faixa-12"; iniciar_resumos; executar_faixa_12 || true; encerrar "faixa:faixa-12" ;;
      faixa-13) evento --tipo inicio --escopo "faixa:faixa-13"; iniciar_resumos; executar_faixa_13 || true; encerrar "faixa:faixa-13" ;;
      faixa-14) evento --tipo inicio --escopo "faixa:faixa-14"; iniciar_resumos; executar_faixa_14 || true; encerrar "faixa:faixa-14" ;;
      faixa-15) evento --tipo inicio --escopo "faixa:faixa-15"; iniciar_resumos; executar_faixa_15 || true; encerrar "faixa:faixa-15" ;;
      faixa-16) evento --tipo inicio --escopo "faixa:faixa-16"; iniciar_resumos; executar_faixa_16 || true; encerrar "faixa:faixa-16" ;;
      *) falhar "faixa desconhecida: '$ALVO' — veja as disponíveis com --listar" ;;
    esac ;;
  seq)
    case "$ALVO" in
      *) falhar "tarefa sequencial desconhecida: '$ALVO' — veja as disponíveis com --listar" ;;
    esac ;;
esac
