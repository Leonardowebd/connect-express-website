---
name: connect-security
description: Segurança do site da Connect Express Log - cabeçalhos na Vercel, política de conteúdo, formulários, segredos, dependências, LGPD e repositório privado. Use ao configurar `vercel.json`, ao criar ou alterar um formulário ou função de envio, ao adicionar script de terceiros ou dependência, ao lidar com variáveis de ambiente, ou antes de publicar.
---

# Segurança: Connect Express Log

Site institucional estático na Vercel, com dois formulários. A superfície é pequena: cabeçalhos, formulários, terceiros, segredos e dados pessoais.

## Cabeçalhos (em `vercel.json`, para todas as rotas)

| Cabeçalho | Valor |
|---|---|
| `Content-Security-Policy` | Ver abaixo |
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` |
| `X-Content-Type-Options` | `nosniff` |
| `X-Frame-Options` | `DENY` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=(), payment=()` |
| `Cross-Origin-Opener-Policy` | `same-origin` |

Atende ao critério de aceite AC-029.

Política de conteúdo de partida:

```
default-src 'self';
script-src 'self';
style-src 'self';
img-src 'self' data:;
font-src 'self';
connect-src 'self';
frame-ancestors 'none';
base-uri 'self';
form-action 'self';
object-src 'none';
upgrade-insecure-requests
```

- Sem `'unsafe-inline'` e sem `'unsafe-eval'`. Script e estilo ficam em arquivos, não embutidos. JSON-LD em `<script type="application/ld+json">` não é executado e não precisa de exceção.
- Cada domínio de terceiro (mapa, medição) entra de forma explícita, com justificativa na tarefa.
- Testar primeiro com `Content-Security-Policy-Report-Only` na pré-visualização.

## Formulários

- **Validação nos dois lados.** O navegador valida para ajudar; a função de envio valida de novo e é a que vale.
- **Limites.** Tamanho máximo por campo, tipo conferido, e-mail em formato válido.
- **Robôs.** Campo armadilha escondido de pessoas (fora da tela, `tabindex="-1"`, `autocomplete="off"`, `aria-hidden="true"`). Preenchido, descarta o envio. Tempo mínimo entre abrir e enviar. Se o spam passar, acrescentar Cloudflare Turnstile.
- **Limite de envios** por IP na função.
- **Sem injeção em e-mail.** Nunca montar cabeçalho de e-mail com texto do visitante. Remover quebras de linha de nome e assunto.
- **Saída escapada.** Texto do visitante nunca vira HTML sem escape.
- **Erros genéricos** para o visitante; detalhe só no registro do servidor.
- **Sem dados pessoais em endereço** (`GET`) nem em registros.

Atende ao critério de aceite AC-031.

## Segredos

- Chaves de serviço de e-mail ou CRM só em variáveis de ambiente da Vercel. Nunca no código, nunca no repositório.
- `.env` e `.env.*` no `.gitignore`. Manter `.env.example` sem valores.
- Variável com prefixo `PUBLIC_` vai para o navegador: nunca colocar segredo ali.
- Chave exposta por engano é trocada na hora, não apenas apagada do histórico.

## Links e terceiros

- `target="_blank"` sempre com `rel="noopener noreferrer"` (critério de aceite AC-030).
- Nenhum script de CDN. Se for inevitável, com `integrity` e `crossorigin`.
- Fontes servidas pelo próprio site.
- Mapa do Google só carrega depois de clique.

## Dependências

- `package-lock.json` no repositório. Instalar com `npm ci`.
- `npm audit` antes de publicar. Vulnerabilidade alta ou crítica bloqueia.
- Dependabot ativo no repositório do GitHub.
- Cada pacote novo entra com justificativa.

## Repositório e Vercel

- Repositório do GitHub privado.
- Proteção de pré-visualização da Vercel ativa, para que versões de teste não fiquem públicas nem indexadas.
- `X-Robots-Tag: noindex` fora do domínio de produção.
- Materiais do cliente que não fazem parte do site (apresentação, referências) não vão para `public/`.

## LGPD

- Aviso junto ao botão do formulário dizendo para que os dados serão usados, com link para a Política de Privacidade.
- Política em `/politica-de-privacidade/`, ligada no rodapé (critério de aceite AC-032), com: quem é o controlador (razão social e CNPJ), quais dados, finalidade, prazo de guarda, com quem são compartilhados, direitos do titular e canal de contato.
- Coletar só o necessário. O formulário de vagas não pede documento.
- Medição ou pixel só depois de consentimento, com aviso de cookies. Sem medição, sem aviso.
- O texto final da política precisa de revisão do cliente ou do jurídico dele.

## Antes de publicar

1. Cabeçalhos conferidos em securityheaders.com, nota A ou superior.
2. Política de conteúdo sem violação no console.
3. Envio de formulário testado com campo armadilha preenchido, campos vazios, texto longo e HTML no campo de mensagem.
4. `npm audit` limpo de altas e críticas.
5. Busca por segredos no repositório sem resultado.
6. Pré-visualizações protegidas e sem indexação.
