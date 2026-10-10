---
name: connect-geo
description: GEO (otimização para mecanismos generativos) do site da Connect Express Log - como escrever e estruturar o conteúdo para ser citado por ChatGPT, Gemini, Perplexity, Claude e pelas respostas de IA do Google. Use ao escrever perguntas frequentes, aberturas de página e definições, ao criar o `llms.txt`, ao configurar robôs de IA, ou ao revisar se uma página é fácil de extrair e citar.
---

# GEO: Connect Express Log

## Objetivo

Quando alguém perguntar a um assistente "qual transportadora entrega medicamentos para redes de farmácias?" ou "como funciona a entrega expressa de medicamentos?", a Connect Express Log deve ser uma das fontes citadas.

Assistentes citam trechos que respondem sozinhos, com fato verificável e fonte identificável. O trabalho é produzir esses trechos.

## Regras de escrita

1. **Resposta primeiro.** A primeira frase depois de um título responde ao título. Contexto vem depois.
2. **Trecho autossuficiente.** Cada parágrafo faz sentido fora da página. Escreva "A Connect Express Log entrega...", não "Nós entregamos..." nem "Ela entrega...".
3. **Fato com número.** "Operação em 9 estados" é citável. "Ampla cobertura" não é.
4. **Entidade consistente.** O nome é sempre "Connect Express Log". Categoria sempre "transportadora especializada em logística para a saúde". Mesmos telefones e endereços em todo lugar.
5. **Pergunta como o cliente pergunta.** Títulos de perguntas frequentes na forma falada: "Quanto tempo leva a entrega expressa de medicamentos?"
6. **Tamanho de resposta.** 40 a 80 palavras. A primeira frase já responde.
7. **Listas e tabelas** para o que é enumerável: o que está incluído, estados atendidos, requisitos, comparação entre expressa e D-1.
8. **Só fatos aprovados.** A tabela de fatos está em `connect-copy-website`. Dado não confirmado não entra, porque um assistente vai repetir.

## Bloco de definição

Toda página de solução abre com um parágrafo neste formato:

> [Nome da solução] é [o que é, em uma frase]. A Connect Express Log oferece [o que entrega] para [quem], em [onde], com [prova].

É o trecho que os assistentes mais reaproveitam.

## Perguntas frequentes

- Pelo menos 3 por página de solução, mais um bloco geral na página inicial.
- Visíveis em HTML (`details` e `summary`), com a resposta presente no código mesmo fechada.
- As mesmas perguntas e respostas em JSON-LD `FAQPage` (critério de aceite AC-023). Texto idêntico ao visível.

Perguntas que valem a pena responder:

- O que avaliar antes de contratar delivery para uma rede de farmácias?
- Por que entregar medicamento em 3 horas exige outra operação?
- Entrega D-1 ou expressa: quando cada modelo faz sentido?
- Quais medicamentos podem ser transportados?
- Como funciona o rastreamento em tempo real?
- Quais cuidados o transporte de materiais biológicos exige?
- Em quais estados a Connect Express Log atua?

## `llms.txt`

Arquivo em `/llms.txt`, em Markdown simples (critério de aceite AC-024):

```
# Connect Express Log

> Transportadora especializada em logística para a saúde: entrega expressa de
> medicamentos, transporte de materiais biológicos, motoboy e e-commerce.

## Soluções
- [Entrega expressa de medicamentos](https://www.connectexpresslog.com.br/servicos/entrega-expressa-de-medicamentos/): resumo de uma linha
...

## Cobertura
Estados atendidos, matriz e filial.

## Contato
Comercial, SAC, endereços.
```

Gerado a partir de `src/data/`, para nunca divergir do site.

## Dados estruturados

`Organization`, `Service` e `FAQPage` em JSON-LD (detalhe em `connect-seo`). Para GEO importam mais: `sameAs` com LinkedIn e Instagram, `areaServed` com os estados, e `Service` em cada solução (critério de aceite AC-025).

## Robôs de IA

Em `robots.txt`, permitir de forma explícita: `GPTBot`, `OAI-SearchBot`, `ChatGPT-User`, `ClaudeBot`, `Claude-SearchBot`, `PerplexityBot`, `Google-Extended`. A decisão de liberar é do cliente; o padrão recomendado é liberar, porque o objetivo é ser citado.

O conteúdo precisa estar no HTML entregue pelo servidor. Robôs de IA em geral não executam JavaScript.

## Fora do site

Assistentes confiam mais em quem é mencionado em vários lugares. Recomendar ao cliente, fora do escopo de código: perfil no Google atualizado, página do LinkedIn com a mesma descrição, menções em veículos do setor farmacêutico e de logística, e conteúdo do fundador respondendo às perguntas acima.

## Revisão de uma página

1. A primeira frase de cada seção responde ao título?
2. Cada parágrafo se sustenta sozinho, com o nome da empresa?
3. Há pelo menos um número verificável por seção?
4. As perguntas frequentes estão no HTML e no JSON-LD, com o mesmo texto?
5. O conteúdo aparece com JavaScript desligado?
6. Teste manual: perguntar a dois assistentes sobre o tema da página, um mês depois de publicar, e registrar se a empresa é citada.
