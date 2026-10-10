# Tasks: Connect express website

> feature: connect-express-website

<!--
  Status: pendente | em-andamento | concluida
  Cada tarefa lê as skills do projeto indicadas em Notas antes de começar.
  Um commit por tarefa, com o código da tarefa na mensagem.
-->

## T-001 - Base do projeto Next.js, tokens e apoio de testes [pendente]

- Refs: US-012, AC-036
- Arquivos: package.json, package-lock.json, tsconfig.json, next.config.ts, eslint.config.mjs, onpspec.config.json, .spec/constituicao.md, src/app/layout.tsx, src/app/globals.css, src/app/page.tsx, src/styles/tokens.css, src/styles/base.css, tests/apoio.mjs, tests/us-012-marca.test.mjs
- Notas: Skills connect-frontend, connect-id-visual, connect-ui-design. Next.js com App Router e TypeScript, React, gsap e @gsap/react. Fontes Geologica e Poppins por next/font/google. tokens.css com todas as cores, fontes, espaços e raios. page.tsx provisória. Ajustar testCommand para rodar next build antes dos testes e os globs do onpspec.config.json e do princípio P-002 para ts e tsx. Todas as outras tarefas dependem desta.

## T-002 - Dados de conteúdo e copy [pendente]

- Refs: US-002, US-003, AC-013
- Arquivos: src/data/empresa.ts, src/data/servicos.ts, src/data/inicio.ts, src/data/imagens.ts
- Notas: Skills connect-copy-website, connect-geo, connect-seo. Reescrever a copy do site antigo. empresa.ts: contatos, endereços, CNPJ, redes, estados, clientes, números. servicos.ts: as quatro soluções com abertura, o que inclui, motivos, perguntas frequentes, título e descrição de página. inicio.ts: textos das seções da página inicial, valores e perguntas gerais. imagens.ts: manifesto dos espaços de imagem. Só fatos da tabela de fatos; números a confirmar ficam com o valor do site atual. Depende de T-001.

## T-003 - Componente de imagem com substituto [pendente]

- Refs: US-013, AC-038, AC-039, AC-034, AC-028
- Arquivos: src/components/Imagem/Imagem.tsx, src/components/Imagem/Imagem.module.css, public/imagens/.gitkeep, tests/us-013-imagens.test.mjs
- Notas: Skills connect-frontend, connect-performance. Lê o manifesto; usa next/image se o arquivo existe em public/imagens, senão bloco com aspect-ratio, fundo da marca e role img. Depende de T-001 e T-002.

## T-004 - Componentes de animação com GSAP [pendente]

- Refs: US-009, AC-027
- Arquivos: src/animacoes/gsap.ts, src/animacoes/Revelar.tsx, src/animacoes/Escalonar.tsx, src/animacoes/Contador.tsx, src/animacoes/constantes.ts
- Notas: Skills connect-frontend, connect-ui-design, connect-performance. useGSAP com escopo, gsap.from para o conteúdo nascer visível, gsap.matchMedia para movimento reduzido. Contador mantém o número final no HTML. Depende de T-001.

## T-005 - Cabeçalho, menu, rodapé e botão de WhatsApp [pendente]

- Refs: US-001, AC-003, AC-012, AC-014, AC-017, AC-037, US-011, AC-033, AC-035, AC-030
- Arquivos: src/components/Cabecalho/Cabecalho.tsx, src/components/Cabecalho/Cabecalho.module.css, src/components/Cabecalho/MenuCelular.tsx, src/components/Rodape/Rodape.tsx, src/components/Rodape/Rodape.module.css, src/components/BotaoWhatsApp/BotaoWhatsApp.tsx, src/components/BotaoWhatsApp/BotaoWhatsApp.module.css, src/components/Botao/Botao.tsx, src/components/Botao/Botao.module.css, src/components/PularConteudo/PularConteudo.tsx, public/logos/.gitkeep, tests/us-011-acessibilidade.test.mjs, tests/us-005-atalhos.test.mjs
- Notas: Skills connect-ui-design, connect-ux, connect-responsive, connect-security. Rodapé com cartão escuro de cotação, contatos, CNPJ, redes e link da política. Menu do celular com aria-expanded, Esc e foco. Copiar os logotipos de ID Visual para public/logos. Depende de T-001 e T-002.

## T-006 - Seções da página inicial: herói, números, quem somos e desafio [pendente]

- Refs: AC-001, AC-002, AC-007
- Arquivos: src/components/secoes/Heroi.tsx, src/components/secoes/Heroi.module.css, src/components/secoes/Numeros.tsx, src/components/secoes/Numeros.module.css, src/components/secoes/QuemSomos.tsx, src/components/secoes/QuemSomos.module.css, src/components/secoes/Desafio.tsx, src/components/secoes/Desafio.module.css, src/components/secoes/Valores.tsx, src/components/secoes/Valores.module.css
- Notas: Skills connect-design-concept, connect-ui-design, connect-responsive. Seguir a tradução da referência CargoKite. Sem animação de entrada no título do herói. Depende de T-002, T-003 e T-004.

## T-007 - Seções da página inicial: soluções, operação, cobertura e clientes [pendente]

- Refs: AC-004, AC-008, AC-009
- Arquivos: src/components/secoes/Solucoes.tsx, src/components/secoes/Solucoes.module.css, src/components/secoes/Operacao.tsx, src/components/secoes/Operacao.module.css, src/components/secoes/Cobertura.tsx, src/components/secoes/Cobertura.module.css, src/components/secoes/Clientes.tsx, src/components/secoes/Clientes.module.css
- Notas: Skills connect-design-concept, connect-ui-design, connect-responsive. Soluções em mosaico escuro. Cobertura com a lista de estados em texto, matriz e filial. Clientes em grade com linhas finas e nomes em texto. Depende de T-002, T-003 e T-004.

## T-008 - Perguntas frequentes, contato e envio do formulário [pendente]

- Refs: US-004, AC-010, AC-011, AC-031, AC-006
- Arquivos: src/components/secoes/Perguntas.tsx, src/components/secoes/Perguntas.module.css, src/components/secoes/Contato.tsx, src/components/secoes/Contato.module.css, src/components/Formulario/FormularioContato.tsx, src/components/Formulario/Formulario.module.css, src/components/Formulario/validacao.ts, src/app/api/contato/route.ts, .env.example, tests/us-004-cotacao.test.mjs
- Notas: Skills connect-ux, connect-security, connect-geo. Perguntas com details e summary. Formulário com rótulos, validação nos dois lados, campo armadilha, aviso de uso dos dados. O destino do envio depende da pergunta em aberto Q-002: deixar o envio atrás de uma função única configurada por variável de ambiente. Depende de T-002 e T-005.

## T-009 - Montagem da página inicial [pendente]

- Refs: US-001, US-003, AC-001, AC-002, AC-004, AC-007, AC-008, AC-009
- Arquivos: src/app/page.tsx, tests/us-001-proposta.test.mjs, tests/us-003-confianca.test.mjs
- Notas: Skill connect-design-concept para a ordem das seções. Manter as âncoras sobre, servicos e contato do site antigo. Depende de T-005, T-006, T-007 e T-008.

## T-010 - Páginas de solução [pendente]

- Refs: US-002, AC-005, AC-006
- Arquivos: src/app/servicos/[slug]/page.tsx, src/app/servicos/[slug]/pagina.module.css, tests/us-002-solucoes.test.mjs
- Notas: Skills connect-copy-website, connect-geo, connect-seo. generateStaticParams com os quatro endereços do site antigo. Abertura no formato de definição, o que inclui, onde atua, motivos, perguntas, chamada de cotação. Depende de T-002, T-003, T-005 e T-008.

## T-011 - Página Trabalhe Conosco [pendente]

- Refs: US-005, AC-015
- Arquivos: src/app/trabalhe-conosco/page.tsx, src/app/trabalhe-conosco/pagina.module.css, src/components/Formulario/FormularioVagas.tsx, src/app/api/vagas/route.ts
- Notas: Skills connect-ux, connect-security. Vantagens, requisitos para entregadores, formulário com nome, cidade, e-mail, área de atuação e telefone. Depende de T-005 e T-008.

## T-012 - Política de Privacidade e página não encontrada [pendente]

- Refs: US-010, AC-032
- Arquivos: src/app/politica-de-privacidade/page.tsx, src/app/politica-de-privacidade/pagina.module.css, src/app/not-found.tsx
- Notas: Skill connect-security, parte de LGPD. Texto-base marcado para revisão do cliente (pergunta em aberto Q-006). Depende de T-005.

## T-013 - SEO: metadados, sitemap, robôs e dados da organização [pendente]

- Refs: US-007, AC-019, AC-020, AC-021, AC-022
- Arquivos: src/app/sitemap.ts, src/app/robots.ts, src/lib/metadados.ts, src/lib/jsonld.ts, src/components/JsonLd/JsonLd.tsx, tests/us-007-seo.test.mjs
- Notas: Skill connect-seo. Função única de metadados usada por todas as páginas, com canônico e Open Graph. JSON-LD da organização no layout. Depende de T-009, T-010, T-011 e T-012.

## T-014 - GEO: llms.txt e dados estruturados de perguntas e serviços [pendente]

- Refs: US-008, AC-023, AC-024, AC-025
- Arquivos: src/app/llms.txt/route.ts, tests/us-008-geo.test.mjs
- Notas: Skill connect-geo. FAQPage e Service gerados dos mesmos dados visíveis, usando src/lib/jsonld.ts. Robôs de IA liberados em robots.ts. Depende de T-013.

## T-015 - Segurança: cabeçalhos e links externos [pendente]

- Refs: US-010, AC-029, AC-030
- Arquivos: tests/us-010-seguranca.test.mjs
- Notas: Skill connect-security. Cabeçalhos na função headers de next.config.ts, com a decisão sobre script-src registrada. Noindex fora do domínio de produção. Altera next.config.ts, por isso roda depois de T-014. Depende de T-014.

## T-016 - Responsividade, toque e orçamento de peso [pendente]

- Refs: US-006, AC-016, AC-017, AC-018, US-009, AC-026, AC-027, AC-028
- Arquivos: tests/us-006-responsivo.test.mjs, tests/us-009-velocidade.test.mjs
- Notas: Skills connect-responsive, connect-performance. Conferir todas as páginas em 320, 360, 768, 1024 e 1440 px e corrigir o que quebrar. Medir a primeira carga comprimida de cada rota. Depende de T-015.

## T-017 - Publicação na Vercel [pendente]

- Refs: US-009, US-010
- Arquivos: README.md
- Notas: Skills connect-security, connect-performance. Criar o projeto na Vercel ligado ao repositório privado do GitHub, com proteção de pré-visualização ativa. Só depois de T-016, para nunca publicar os arquivos do cliente que estão no repositório. Registrar no README como rodar, testar e publicar.
