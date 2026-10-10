# Tasks: Connect express website

> feature: connect-express-website

<!--
  Status: pendente | em-andamento | concluida
  Cada tarefa segue as skills do projeto indicadas em Notas.
  Executadas uma após a outra, na ordem, por decisão do dono do projeto.
-->

## T-001 - Base do projeto Next.js, tokens e apoio de testes [concluida]

- Refs: US-012, AC-036
- Arquivos: package.json, package-lock.json, tsconfig.json, next.config.mjs, onpspec.config.json, .env.example, src/app/layout.tsx, src/app/globals.css, tests/apoio.mjs
- Notas: Skills connect-frontend, connect-id-visual, connect-ui-design. Next.js com App Router e TypeScript, React, gsap e @gsap/react. Fontes Geologica e Poppins por next/font/google. tokens.css é o único arquivo com valores de cor.

## T-002 - Dados de conteúdo e copy [concluida]

- Refs: US-002, US-003, AC-013
- Arquivos: src/data/empresa.ts, src/data/inicio.ts, src/data/imagens.ts
- Notas: Skills connect-copy-website, connect-geo, connect-seo. Copy do site antigo reescrita. Números: site atual e apresentação juntos, vale o maior.

## T-003 - Componente de imagem com substituto [concluida]

- Refs: US-013, AC-038, AC-039, AC-034, AC-028
- Arquivos: src/components/Imagem/Imagem.tsx, src/components/Imagem/Imagem.module.css, public/imagens/.gitkeep
- Notas: Skills connect-frontend, connect-performance. Usa next/image se o arquivo do manifesto existe em public/imagens; senão, bloco com a mesma proporção.

## T-004 - Componentes de animação com GSAP [concluida]

- Refs: US-009, AC-027
- Arquivos: src/animacoes/gsap.ts, src/animacoes/Revelar.tsx, src/animacoes/Contador.tsx, src/animacoes/constantes.ts
- Notas: Skills connect-frontend, connect-ui-design. useGSAP com escopo, gsap.from para o conteúdo nascer visível, gsap.matchMedia para movimento reduzido.

## T-005 - Cabeçalho, menu, rodapé e botão de WhatsApp [concluida]

- Refs: US-001, AC-003, AC-012, AC-014, AC-017, AC-037, US-011, AC-033, AC-035, AC-030
- Arquivos: src/components/secoes/Cabecalho.tsx, src/components/secoes/Rodape.tsx, src/components/secoes/Pilula.tsx, src/components/MenuCelular/MenuCelular.tsx, src/components/MenuCelular/MenuCelular.module.css, src/components/BotaoWhatsApp.tsx, src/components/BotaoWhatsApp.module.css, public/logos/logo-connect-express-log.png, public/logos/logo-connect-express-log-claro.png, src/app/(inicio)/layout.tsx, src/app/(site)/layout.tsx
- Notas: Skills connect-ui-design, connect-ux, connect-responsive, connect-security. Navegação em pílulas: sobre a foto na página inicial, sobre fundo claro nas internas. Menu do celular com aria-expanded, Esc e foco. Rodapé verde com letreiro.

## T-006 - Seções da página inicial: herói, fatos e quem somos [concluida]

- Refs: AC-001, AC-002, AC-007
- Arquivos: src/components/secoes/Heroi.tsx, src/components/secoes/Fatos.tsx, src/components/secoes/Sobre.tsx, src/components/secoes/secoes.module.css
- Notas: Skills connect-design-concept, connect-ui-design, connect-responsive. Herói em cartão arredondado com caixa de vidro. Fatos com os números e a faixa de logotipos dos clientes. Quem somos com os seis valores.

## T-007 - Seções da página inicial: soluções, operação, cobertura e chamada [concluida]

- Refs: AC-004, AC-008, AC-009
- Arquivos: src/components/secoes/Solucoes.tsx, src/components/secoes/Operacao.tsx, src/components/secoes/Cobertura.tsx, src/components/secoes/Chamada.tsx, public/clientes/decathlon.png, public/clientes/drogaria-pacheco.png, public/clientes/drogaria-rosario.png, public/clientes/drogaria-sao-paulo.png, public/clientes/extrafarma.png, public/clientes/magazine-luiza.png, public/clientes/pague-menos.png, public/clientes/salvador-medical.png, public/clientes/mastermed.png
- Notas: Skills connect-design-concept, connect-ui-design. Soluções em linhas com botão em pílula. Cobertura em foto e cartões, com os estados em texto. Logotipos dos clientes extraídos do site antigo.

## T-008 - Perguntas frequentes, contato e envio do formulário [concluida]

- Refs: US-004, AC-010, AC-011, AC-031, AC-006
- Arquivos: src/components/secoes/Perguntas.tsx, src/components/secoes/Contato.tsx, src/components/Formulario/Formulario.tsx, src/components/Formulario/Formulario.module.css, src/lib/validacao.ts, src/lib/envio.ts, src/app/api/contato/route.ts
- Notas: Skills connect-ux, connect-security, connect-geo. Cotação em painel arredondado: cartão verde com os contatos diretos ao lado do formulário, campos grandes de canto arredondado e envio em pílula. O destino do envio depende da pergunta em aberto Q-002: fica atrás da variável FORMULARIO_WEBHOOK_URL.

## T-009 - Montagem da página inicial [concluida]

- Refs: US-001, US-003, AC-001, AC-002, AC-004, AC-007, AC-008, AC-009
- Arquivos: src/app/(inicio)/page.tsx, tests/us-001-005-conteudo.test.mjs
- Notas: Ordem das seções da skill connect-design-concept. Âncoras sobre, servicos, cobertura e contato.

## T-010 - Páginas de solução [concluida]

- Refs: US-002, AC-005, AC-006
- Arquivos: src/data/servicos.ts
- Notas: Skills connect-copy-website, connect-geo, connect-seo. Os quatro endereços do site antigo, gerados de forma estática.

## T-011 - Página Trabalhe Conosco [concluida]

- Refs: US-005, AC-015
- Arquivos: src/app/api/vagas/route.ts, src/data/vagas.ts
- Notas: Skills connect-ux, connect-security. Vantagens, requisitos e formulário de cadastro.

## T-012 - Política de Privacidade e página não encontrada [concluida]

- Refs: US-010, AC-032
- Arquivos: src/app/not-found.tsx
- Notas: Skill connect-security, parte de LGPD. Texto-base para revisão do cliente (pergunta em aberto Q-006).

## T-013 - SEO: metadados, sitemap, robôs e dados da organização [concluida]

- Refs: US-007, AC-019, AC-020, AC-021, AC-022
- Arquivos: src/app/sitemap.ts, src/app/robots.ts, src/lib/metadados.ts, src/lib/jsonld.ts, src/components/JsonLd.tsx
- Notas: Skill connect-seo. Função única de metadados com canônico e Open Graph. JSON-LD da organização no layout.

## T-014 - GEO: llms.txt e dados estruturados de perguntas e serviços [concluida]

- Refs: US-008, AC-023, AC-024, AC-025
- Arquivos: src/app/llms.txt/route.ts
- Notas: Skill connect-geo. FAQPage e Service gerados dos mesmos dados visíveis. Robôs de IA liberados em robots.ts.

## T-015 - Segurança: cabeçalhos e links externos [concluida]

- Refs: US-010, AC-029, AC-030
- Arquivos: tests/us-006-010-tecnico.test.mjs
- Notas: Skill connect-security. Cabeçalhos em next.config.mjs. script-src aceita 'unsafe-inline' porque páginas estáticas do Next não podem usar nonce. Noindex fora de produção.

## T-016 - Responsividade, toque, peso e acessibilidade [concluida]

- Refs: US-006, AC-016, AC-017, AC-018, US-009, AC-026, AC-027, AC-028
- Arquivos: tests/us-011-013-acessibilidade-marca.test.mjs
- Notas: Skills connect-responsive, connect-performance. Conferido em 390 e 1440 px, sem rolagem horizontal.

## T-017 - Publicação na Vercel [concluida]

- Refs: US-009, US-010
- Arquivos: README.md
- Notas: Projeto connect-express-website na Vercel, ligado ao repositório do GitHub (cada envio para main publica). Endereço connectexpresslog.vercel.app; connectexpress.vercel.app já pertence a outro site. README com as instruções de rodar, testar, trocar imagens e publicar.

## T-018 - Paleta com o verde da marca dominante [concluida]

- Refs: US-012, AC-036
- Arquivos: src/styles/tokens.css, src/styles/base.css
- Notas: Skill connect-id-visual. Blocos fortes em verde, laranja em botões e destaques, azul em links e detalhes. Sobre verde, destaques e links ficam brancos por contraste.

## T-019 - Layout da versão B adotado em todo o site [concluida]

- Refs: US-012, US-002, AC-005
- Arquivos: src/app/(site)/paginas.module.css, src/app/(site)/servicos/[slug]/page.tsx, src/app/(site)/servicos/[slug]/pagina.module.css, src/app/(site)/trabalhe-conosco/page.tsx, src/app/(site)/politica-de-privacidade/page.tsx
- Notas: Skills connect-design-concept, connect-ui-design. O dono do projeto escolheu a versão B (referência Cargomaxis, nó 1-10 do Figma) em 2026-10-10. As versões A e C saíram do código. Páginas internas com o mesmo cabeçalho, rodapé, pílulas e cartões arredondados.

## T-021 - Skill de smart effects e os quatro efeitos [concluida]

- Refs: US-015, AC-043, AC-045, AC-046, AC-047
- Arquivos: .claude/skills/connect-smart-effects/SKILL.md, src/efeitos/TextoRevelado.tsx, src/efeitos/DesfoqueGradual.tsx, src/efeitos/TrocaPixel.tsx, src/efeitos/ExpansaoNaRolagem.tsx, src/efeitos/efeitos.module.css, src/components/secoes/Chamada.tsx, tests/us-015-efeitos.test.mjs
- Notas: Skill connect-smart-effects. Efeitos do React Bits adaptados: texto revelado na declaração de Quem Somos, desfoque gradual no herói e no rodapé, troca por pixels na foto de Quem Somos, expansão na rolagem na chamada final.

## T-022 - Prévia de imagem das soluções, com mouse e com toque [concluida]

- Refs: US-015, AC-044
- Arquivos: src/efeitos/ObservaPrevias.tsx
- Notas: Skill connect-smart-effects. Com mouse, a imagem flutua inclinada sobre a linha em foco, só com CSS. Em toque, fica dentro da linha e aparece com a rolagem.

