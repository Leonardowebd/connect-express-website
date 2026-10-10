---
name: connect-ux
description: Experiência de uso do site da Connect Express Log - públicos, jornadas, hierarquia de ações, formulários e acessibilidade. Use ao decidir a ordem de seções, onde colocar um botão, como desenhar um formulário, o que mostrar em estados de erro ou sucesso, ou ao revisar se uma página leva o visitante à cotação.
---

# UX: Connect Express Log

## Quem visita e o que quer

| Público | O que procura | Ação que queremos |
|---|---|---|
| Decisor de rede de farmácias (logística, operações, e-commerce) | Saber se a operação aguenta o volume e o prazo dele | Pedir cotação |
| Laboratório, clínica, hospital | Segurança e conformidade no transporte | Pedir cotação |
| E-commerce | Prazo, cobertura, rastreio | Pedir cotação |
| Destinatário de uma entrega | Onde está o pedido | Ir ao rastreio |
| Entregador ou candidato | Como se cadastrar | Ir a Trabalhe Conosco |

O site é feito para o primeiro grupo. Os dois últimos precisam de um atalho visível no cabeçalho e não devem ocupar o conteúdo principal.

Lembrete do posicionamento: a Connect vende para empresas, mas quem decide é uma pessoa. Ela chega desconfiada, comparando fornecedores, e quer provas.

## Hierarquia de ações

1. **Principal:** "Pedir cotação". Aparece no cabeçalho, no herói, ao fim de cada página de solução e na chamada final.
2. **Secundária:** "Falar no WhatsApp". Botão flutuante e na seção de contato.
3. **Utilitárias:** "Rastreie seu pedido" e "Trabalhe conosco". Só no cabeçalho e no rodapé.

Uma seção tem no máximo uma ação principal.

## Jornada do decisor

1. Chega pela busca ou por indicação. Lê o título do herói.
2. Procura prova: números, clientes, cobertura.
3. Abre a solução que interessa. Lê o que está incluído e as perguntas frequentes.
4. Decide falar. Escolhe formulário ou WhatsApp.

Cada página de solução deve permitir os passos 2 a 4 sem voltar à página inicial.

## Formulário de cotação

- Campos: nome, empresa, e-mail, telefone, mensagem. Só nome, e-mail e mensagem obrigatórios.
- Rótulo sempre visível, acima do campo. Nunca só `placeholder`.
- `type`, `inputmode` e `autocomplete` corretos em cada campo (`email`, `tel`, `name`, `organization`).
- Validação ao sair do campo e ao enviar. Mensagem diz o que fazer: "Informe um e-mail válido, como nome@empresa.com.br".
- Ao enviar: botão mostra "Enviando..." e fica desabilitado.
- Sucesso: mensagem no lugar do formulário com prazo de resposta e alternativa de WhatsApp.
- Falha: mensagem com os contatos diretos. Os dados digitados não se perdem.
- Aviso de uso dos dados com link para a Política de Privacidade, junto ao botão.

## Acessibilidade (WCAG 2.2 AA)

- Link "Pular para o conteúdo" como primeiro elemento focável.
- Marcos: `header`, `nav`, `main`, `footer`. Um `h1` por página, títulos sem saltar nível.
- Tudo operável por teclado, na ordem visual. Foco sempre visível.
- Alvos de toque de 44 por 44 px.
- Contraste de texto 4,5:1.
- Imagem informativa com texto alternativo; decorativa com `alt=""`.
- Menu, perguntas frequentes e mensagens de formulário anunciados por leitor de tela (`aria-expanded`, `aria-live`).
- Nada depende só de cor, de hover ou de movimento.

## Conteúdo e leitura

- Uma ideia por seção. Título responde "o que é isto" sem precisar do parágrafo.
- Listas para o que é lista (o que está incluído, requisitos, estados).
- Números com unidade e contexto: "entrega expressa em até 3 horas", não "3H".
- Contatos sempre em texto e clicáveis (`tel:`, `mailto:`, `wa.me`).

## Perguntas para revisar uma página

1. Em 5 segundos dá para dizer o que a empresa faz e qual é o próximo passo?
2. A prova aparece antes da segunda rolagem?
3. Existe uma única ação principal por seção?
4. O destinatário acha o rastreio sem rolar?
5. O formulário pode ser preenchido e enviado só com o teclado?
6. No celular, o botão de cotação está ao alcance do polegar?
