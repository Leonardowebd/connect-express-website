# Spec: Connect express website

> feature: connect-express-website
> status: rascunho

## Contexto

A Connect Express Log é uma transportadora especializada em logística para a saúde (entrega expressa de medicamentos, materiais biológicos, motoboy e e-commerce) cuja operação cresceu mais do que a comunicação: o site atual está defasado e gera cerca de 1 lead por mês. Esta feature entrega o novo site institucional, com layout desenhado a partir das referências do Figma, a identidade visual da marca e a copy do site antigo reescrita, para que decisores de redes de farmácias, laboratórios, clínicas e e-commerces entendam o valor da operação e peçam uma cotação.

Fontes usadas nesta especificação:

- Site atual: https://www.connectexpresslog.com.br/ (home, 4 páginas de serviço, trabalhe conosco).
- `Dados/Sobre Connect/Connecte_Express_Projeto_.pptx` (posicionamento e números da operação).
- `Dados/Site-antigo.png`, `Referencias/` (2 referências Behance), `ID Visual/` (2 logos).
- Figma, lido em 2026-10-10: seção de identidade (logotipo, três cores, fontes Geologica e Poppins) e páginas de referência de outros sites. Não contém layout pronto da Connect Express.

## Histórias

### US-001 - Entender a proposta de valor na primeira tela

Como decisor de uma rede de farmácias ou empresa de saúde, quero entender em poucos segundos o que a Connect Express faz e para quem, para que eu decida se vale continuar na página.

#### AC-001 - A primeira tela diz o que a empresa faz e oferece a cotação

- **Dado** que abro a página inicial
- **Quando** a página carrega
- **Então** vejo um único título principal que cita logística ou entrega para a saúde
- **E** vejo um botão de pedir cotação e um botão secundário para conhecer as soluções (um único `h1` na página)

#### AC-002 - Os números da operação aparecem como prova

- **Dado** que abro a página inicial
- **Quando** rolo até o bloco de números
- **Então** vejo pelo menos 4 indicadores da operação, cada um com número e legenda (ex.: farmácias atendidas, estados, entregadores, prazo expresso)

#### AC-003 - O menu leva a todas as seções e ações principais

- **Dado** que estou em qualquer página do site
- **Quando** olho o cabeçalho
- **Então** encontro links para Início, Quem Somos, Soluções, Cobertura e Contato
- **E** encontro os atalhos "Rastreie seu pedido" e "Trabalhe conosco"

### US-002 - Conhecer as soluções

Como decisor, quero ver as soluções que a Connect Express oferece e o detalhe de cada uma, para que eu saiba se atendem a minha operação.

#### AC-004 - As quatro soluções aparecem na página inicial

- **Dado** que abro a página inicial
- **Quando** chego à seção de soluções
- **Então** vejo quatro cartões: entrega expressa de medicamentos, transporte de materiais biológicos, entregas rápidas com motoboy e logística para e-commerce
- **E** cada cartão tem título, resumo e link para a página da solução

#### AC-005 - Cada solução tem página própria no mesmo endereço do site antigo

- **Dado** os endereços `/servicos/entrega-expressa-de-medicamentos/`, `/servicos/transporte-de-materiais-biologicos/`, `/servicos/entregas-rapidas-com-motoboy/` e `/servicos/transporte-e-logistica-para-e-commerce/`
- **Quando** abro cada um deles
- **Então** a página existe e mostra título próprio, o que está incluído, onde a empresa atua, motivos para contratar e um botão de cotação

#### AC-006 - Cada página de solução responde às dúvidas comuns

- **Dado** que abro uma página de solução
- **Quando** chego à seção de perguntas frequentes
- **Então** vejo pelo menos 3 perguntas com resposta visível em texto

### US-003 - Confiar na empresa

Como decisor, quero ver quem é a empresa, onde ela atua e quem já é cliente, para que eu confie em entregar a minha operação.

#### AC-007 - A seção Quem Somos conta a história e os valores

- **Dado** que abro a página inicial
- **Quando** chego à seção Quem Somos
- **Então** vejo o texto institucional e os seis valores da empresa, cada um com título e descrição

#### AC-008 - A cobertura lista os estados atendidos

- **Dado** que abro a página inicial
- **Quando** chego à seção de cobertura
- **Então** vejo a lista dos estados atendidos escrita em texto (não só em imagem)
- **E** vejo a matriz em Lauro de Freitas (BA) e a filial em São Paulo (SP)

#### AC-009 - Os clientes aparecem como prova social

- **Dado** que abro a página inicial
- **Quando** chego à seção de clientes
- **Então** vejo os nomes das redes atendidas, cada um identificável por texto alternativo ou texto visível

### US-004 - Pedir uma cotação

Como decisor interessado, quero pedir uma cotação pelo canal que eu preferir, para que o comercial me responda rápido.

#### AC-010 - O formulário de contato pede só o necessário

- **Dado** que estou na seção de contato
- **Quando** olho o formulário
- **Então** vejo os campos nome, empresa, e-mail, telefone e mensagem, cada um com rótulo visível
- **E** nome, e-mail e mensagem são obrigatórios

#### AC-011 - O formulário avisa o que falta antes de enviar

- **Dado** o formulário de contato com o e-mail vazio ou inválido
- **Quando** tento enviar
- **Então** o envio não acontece e o campo com problema é indicado por uma mensagem em texto ligada ao campo

#### AC-012 - O WhatsApp comercial está a um toque

- **Dado** que estou em qualquer página
- **Quando** toco no botão de WhatsApp
- **Então** abre a conversa com o comercial (11) 95595-4684 com uma mensagem inicial já preenchida

#### AC-013 - Telefones, e-mails e endereços estão em texto

- **Dado** que estou na seção de contato ou no rodapé
- **Quando** procuro os contatos
- **Então** encontro comercial e SAC com telefone e e-mail clicáveis, os dois endereços e o CNPJ

### US-005 - Chegar ao rastreio e às vagas

Como destinatário de uma entrega ou candidato, quero achar rápido o rastreio e a página de vagas, para que eu não precise procurar.

#### AC-014 - O rastreio abre o portal oficial

- **Dado** que estou em qualquer página
- **Quando** clico em "Rastreie seu pedido"
- **Então** sou levado para `https://rastreio.connectexpresslog.com.br/`

#### AC-015 - A página Trabalhe Conosco explica requisitos e recebe candidaturas

- **Dado** o endereço `/trabalhe-conosco/`
- **Quando** abro a página
- **Então** vejo as vantagens, os requisitos para entregadores e um formulário com nome, cidade, e-mail, área de atuação e telefone

### US-006 - Usar o site em qualquer aparelho

Como visitante no celular, quero ler e navegar sem dar zoom nem rolar para os lados, para que eu consiga pedir a cotação pelo telefone.

#### AC-016 - O site se ajusta à largura do aparelho

- **Dado** qualquer página do site
- **Quando** ela é aberta em telas de 360, 768 e 1440 pixels de largura
- **Então** não há rolagem horizontal (a página declara `viewport` com `width=device-width` e o CSS tem regras para telas pequenas, médias e grandes)

#### AC-017 - No celular o menu vira um botão acessível

- **Dado** uma tela estreita
- **Quando** olho o cabeçalho
- **Então** vejo um botão de menu com nome acessível que informa se o menu está aberto ou fechado (`aria-expanded`)

#### AC-018 - Botões e links são fáceis de tocar

- **Dado** qualquer página em tela de toque
- **Quando** toco em um botão ou link de ação
- **Então** a área de toque tem pelo menos 44 por 44 pixels

### US-007 - Ser encontrado no Google

Como dono do site, quero que cada página esteja preparada para busca, para que a empresa apareça para quem procura logística farmacêutica.

#### AC-019 - Cada página tem título e descrição próprios

- **Dado** todas as páginas do site
- **Quando** leio o título e a descrição de cada uma
- **Então** cada título é único e tem até 60 caracteres, e cada descrição é única e tem entre 70 e 160 caracteres

#### AC-020 - Cada página declara seu endereço oficial e prévia de compartilhamento

- **Dado** qualquer página
- **Quando** ela é compartilhada ou indexada
- **Então** ela declara endereço canônico, idioma `pt-BR` e os dados de prévia (título, descrição, imagem e tipo)

#### AC-021 - O site entrega mapa de páginas e regras para robôs

- **Dado** o site publicado
- **Quando** abro `/sitemap.xml` e `/robots.txt`
- **Então** o mapa lista todas as páginas públicas e o arquivo de robôs aponta para o mapa

#### AC-022 - A empresa é descrita em dados estruturados

- **Dado** a página inicial
- **Quando** um buscador lê os dados estruturados
- **Então** encontra a organização com nome, logotipo, telefones, e-mails, os dois endereços, área atendida e redes sociais (JSON-LD válido)

### US-008 - Ser citado por assistentes de IA

Como dono do site, quero que o conteúdo seja fácil de extrair por ChatGPT, Gemini e similares, para que a empresa seja citada quando alguém perguntar por logística de medicamentos.

#### AC-023 - As perguntas frequentes são legíveis por máquina

- **Dado** uma página com perguntas frequentes
- **Quando** um assistente lê os dados estruturados
- **Então** encontra as mesmas perguntas e respostas que estão visíveis na página (JSON-LD `FAQPage`)

#### AC-024 - O site oferece um resumo para assistentes

- **Dado** o site publicado
- **Quando** abro `/llms.txt`
- **Então** encontro o resumo da empresa, as soluções com link, a cobertura e os contatos em texto simples

#### AC-025 - Cada solução é descrita como serviço

- **Dado** uma página de solução
- **Quando** um assistente lê os dados estruturados
- **Então** encontra o serviço com nome, descrição, prestador e área atendida (JSON-LD `Service`)

### US-009 - Carregar rápido

Como visitante com internet móvel, quero que o site abra rápido, para que eu não desista antes de ver o conteúdo.

#### AC-026 - As páginas são leves

- **Dado** o site gerado para publicação
- **Quando** somo o peso comprimido do HTML, do CSS e do JavaScript da primeira carga de cada página (sem imagens)
- **Então** nenhuma página passa de 250 KB

#### AC-027 - Nada bloqueia a primeira pintura

- **Dado** qualquer página
- **Quando** ela começa a carregar
- **Então** nenhum script no cabeçalho bloqueia o carregamento e as fontes são servidas pelo próprio site com troca imediata de texto (`font-display: swap`)

#### AC-028 - As imagens não empurram o conteúdo

- **Dado** qualquer página
- **Quando** as imagens carregam
- **Então** o conteúdo não pula de lugar (toda imagem declara largura e altura, e as imagens fora da primeira tela carregam sob demanda)

### US-010 - Navegar com segurança

Como visitante, quero que o site não exponha meus dados nem me leve a lugares inesperados, para que eu confie em preencher o formulário.

#### AC-029 - O site declara as proteções de navegador

- **Dado** o site publicado
- **Quando** inspeciono a configuração de cabeçalhos
- **Então** estão definidos política de conteúdo (CSP), HSTS, proteção contra enquadramento, `nosniff`, política de referência e política de permissões

#### AC-030 - Links externos não dão controle da página a terceiros

- **Dado** qualquer link que abre em nova aba
- **Quando** inspeciono o link
- **Então** ele declara `rel="noopener noreferrer"`

#### AC-031 - O formulário barra robôs e informa o uso dos dados

- **Dado** o formulário de contato
- **Quando** olho o formulário
- **Então** vejo o aviso de uso dos dados com link para a Política de Privacidade
- **E** existe um campo armadilha invisível para pessoas que bloqueia envios automáticos

#### AC-032 - A Política de Privacidade existe

- **Dado** o endereço `/politica-de-privacidade/`
- **Quando** abro a página
- **Então** ela existe e está ligada no rodapé de todas as páginas

### US-011 - Usar o site com teclado e leitor de tela

Como visitante com deficiência visual ou motora, quero navegar por teclado e leitor de tela, para que eu tenha o mesmo acesso às informações.

#### AC-033 - A estrutura da página é anunciada corretamente

- **Dado** qualquer página
- **Quando** navego com leitor de tela
- **Então** encontro cabeçalho, navegação, conteúdo principal e rodapé identificados, um link "Pular para o conteúdo" e títulos em ordem sem saltar níveis

#### AC-034 - Toda imagem informativa tem descrição

- **Dado** qualquer página
- **Quando** inspeciono as imagens
- **Então** toda imagem tem texto alternativo, vazio apenas quando é decorativa

#### AC-035 - O foco do teclado é sempre visível

- **Dado** qualquer elemento clicável
- **Quando** chego a ele pelo teclado
- **Então** vejo um contorno de foco (o CSS define `:focus-visible` e nunca remove o contorno sem substituto)

### US-012 - Reconhecer a marca

Como dono da marca, quero que o site use só as cores, fontes e logotipos oficiais, para que a comunicação fique consistente.

#### AC-036 - Cores e fontes vêm de um único lugar

- **Dado** o código de estilos do site
- **Quando** procuro valores de cor
- **Então** as cores estão definidas apenas no arquivo de tokens da marca e o restante do CSS usa esses tokens

#### AC-037 - O logotipo oficial aparece no cabeçalho e no rodapé

- **Dado** qualquer página
- **Quando** olho cabeçalho e rodapé
- **Então** vejo o logotipo da Connect Express Log com texto alternativo, e o do cabeçalho leva à página inicial

### US-013 - Publicar antes das imagens finais

Como equipe do projeto, quero publicar o site sem as fotos definitivas e trocá-las depois sem mexer no layout, para que as imagens não atrasem a entrega.

#### AC-038 - Cada espaço de imagem tem nome, proporção e substituto

- **Dado** o site sem as imagens finais
- **Quando** abro qualquer página
- **Então** cada espaço de imagem aparece preenchido com um substituto da marca na proporção correta, sem ícone de imagem quebrada

#### AC-039 - Trocar uma imagem é trocar um arquivo

- **Dado** a lista de espaços de imagem do projeto (manifesto)
- **Quando** coloco o arquivo final com o nome previsto na pasta de imagens
- **Então** o site passa a usar a imagem final sem alteração de layout ou de código de página

### US-014 - Comparar duas direções de layout

Como dono do projeto, quero ver a página inicial em um segundo layout, com o mesmo conteúdo, para que eu escolha com o cliente qual direção seguir.

#### AC-040 - A versão B mostra o mesmo conteúdo em outro layout

- **Dado** o endereço `/b/`
- **Quando** abro a página
- **Então** vejo a página inicial no layout da referência Cargomaxis, com um único título principal, os números da operação, as quatro soluções com link, a cobertura com os estados, as perguntas frequentes e o formulário de cotação

#### AC-041 - A versão B não concorre com a oficial nos buscadores

- **Dado** a versão B publicada
- **Quando** um buscador a encontra
- **Então** ela pede para não ser indexada, aponta a página inicial como endereço oficial e não aparece no mapa de páginas

## Fora de escopo

- Blog (no site atual o link aponta para `#`).
- Portal de rastreio (continua no subdomínio externo `rastreio.connectexpresslog.com.br`).
- Área logada, painel administrativo ou CMS.
- Produção das imagens e vídeos (entram depois, pelo manifesto de imagens).
- Gestão de tráfego, campanhas e configuração de anúncios.
- Envio de currículo em anexo (o site atual pede por e-mail).

## Suposições

| ID | Suposição | Status | Resolução |
|---|---|---|---|
| ASM-001 | O site será estático, gerado com Astro e CSS próprio baseado em tokens, sem framework de interface no navegador. | invalidada | O dono do projeto definiu Next.js, React e GSAP em 2026-10-10. |
| ASM-011 | Com Next.js: App Router em TypeScript, páginas geradas de forma estática no build, estilos em CSS Modules com tokens (sem Tailwind) e formulário enviado por Route Handler. | aberta | - |
| ASM-002 | O nome usado no site é "Connect Express Log" (a apresentação escreve "Connecte Express"). | aberta | - |
| ASM-003 | As quatro soluções do site atual são mantidas, com a logística farmacêutica em destaque. | aberta | - |
| ASM-004 | Os endereços das páginas de serviço e de Trabalhe Conosco são preservados para não perder posicionamento no Google. | aberta | - |
| ASM-005 | O domínio continua `www.connectexpresslog.com.br`. | aberta | - |
| ASM-006 | Contatos, endereços, CNPJ e redes sociais do site atual continuam válidos. | aberta | - |
| ASM-007 | A lista de clientes exibida no site atual (Decathlon, Drogaria Pacheco, Drogaria Rosário, Drogaria São Paulo, Extrafarma, Magazine Luiza, Pague Menos, Salvador Medical) pode ser mantida. | aberta | - |
| ASM-008 | `Dados/SKILL.md` e `Dados/DESIGN.md` descrevem outra marca (Terminal Yard Operating System, terminal-industries.com). Servem como referência de método e de estilo, não como tokens da Connect Express. | aberta | - |
| ASM-009 | O layout final, as fontes e a paleta completa vêm dos três nós do Figma. | invalidada | Figma lido em 2026-10-10: ele só tem a identidade (logotipo, três cores, fontes Geologica e Poppins) e páginas de referência de outros sites. Não há layout pronto. Ver ASM-012. |
| ASM-012 | O layout é desenhado a partir das referências do Figma (CargoKite como principal), com a identidade da marca. Neutros, escala tipográfica, espaçamentos e variações escuras das cores são decisão de projeto, registrada nas skills `connect-id-visual` e `connect-ui-design`. | aberta | - |
| ASM-010 | O site é só em português do Brasil. | aberta | - |
| ASM-013 | Paleta "verde domina": os blocos fortes usam o verde da marca, o laranja fica para botões e destaques, o azul para links e detalhes, e o preto só para texto. | confirmada | Escolha do dono do projeto em 2026-10-10. |
| ASM-014 | A versão B cobre só a página inicial, em `/b/`, com o layout do nó 1-10 do Figma (Cargomaxis) e as cores da marca. As páginas internas continuam no layout A até a escolha. | confirmada | Escolha do dono do projeto em 2026-10-10. |

## Perguntas em aberto

| ID | Pergunta | Status | Resposta |
|---|---|---|---|
| Q-001 | Onde o site será hospedado (Vercel, Netlify, hospedagem atual)? Define como os cabeçalhos de segurança e o envio do formulário são configurados. | respondida | Vercel, com o código em repositório privado no GitHub (resposta do dono do projeto em 2026-10-10). |
| Q-002 | Para onde vai o formulário de contato: e-mail comercial, WhatsApp, CRM? | aberta | Adiada pelo dono do projeto em 2026-10-10. O envio fica preparado atrás de uma variável de ambiente e o destino é definido antes de publicar. |
| Q-003 | Quais números são oficiais? O site atual diz 15 anos e 9 estados; a apresentação diz 10 estados, 100+ farmácias, cerca de 450 motoboys e entrega expressa em 3 horas. | respondida | Usar as duas fontes; quando divergem, vale o maior número: mais de 15 anos, 10 estados, mais de 100 farmácias, cerca de 450 motoboys, entrega expressa em 3 horas (dono do projeto, 2026-10-10). |
| Q-004 | Existem depoimentos ou cases autorizados para publicação? As referências de layout têm seção de depoimentos. | aberta | - |
| Q-005 | Haverá ferramentas de medição (Google Analytics, Tag Manager, pixel)? Afeta a política de conteúdo, o aviso de cookies e o peso das páginas. | aberta | - |
| Q-006 | O texto atual da Política de Privacidade será reaproveitado ou reescrito? | aberta | - |
| Q-007 | O Figma prevê página única ou páginas separadas para Quem Somos, Soluções e Contato? | respondida | O Figma não define estrutura de páginas. Adotado: página inicial com as seções, uma página por solução, Trabalhe Conosco e Política de Privacidade, como no site atual. |
| Q-008 | Qual é o décimo estado atendido? O site atual lista nove (BA, SP, RJ, ES, DF, MT, PR, MG, PE) e a apresentação fala em dez. | aberta | - |
