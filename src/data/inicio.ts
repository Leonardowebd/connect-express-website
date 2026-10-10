// Textos da página inicial. Copy do site antigo reescrita.
// Regras: .claude/skills/connect-copy-website e connect-geo.

import type { Pergunta } from './servicos';

export const metaInicio = {
  titulo: 'Logística para farmácias e saúde | Connect Express Log',
  descricao:
    'Transportadora especializada em saúde: entrega expressa de medicamentos em até 3 horas, mais de 100 farmácias atendidas e operação em 10 estados.',
};

export const heroi = {
  titulo: ['Logística para a saúde,', 'entregue no prazo'],
  texto: [
    { t: 'Entregamos medicamentos para ' },
    { t: 'mais de 100 farmácias', destaque: true },
    { t: ', com ' },
    { t: 'cerca de 450 motoboys', destaque: true },
    { t: ' e entrega expressa em ' },
    { t: 'até 3 horas', destaque: true },
    { t: '.' },
  ],
  indicador: { valor: '3h', legenda: 'da farmácia à casa do paciente, na entrega expressa' },
};

export const quemSomos = {
  rotulo: 'Quem somos',
  titulo: 'Há mais de 15 anos levando saúde até a porta',
  chamada: 'Uma transportadora que nasceu na logística farmacêutica e cresceu com as maiores redes do país.',
  paragrafos: [
    'A Connect Express Log é uma transportadora especializada em logística para a saúde. Atende redes de farmácias, laboratórios, clínicas, hospitais e lojas virtuais com entregas rápidas, rastreadas e dentro das normas da ANVISA e da ANTT.',
    'A operação tem matriz em Lauro de Freitas, na Bahia, filial em São Paulo e centros de distribuição em São Paulo e no Rio de Janeiro. São 10 estados atendidos, cerca de 450 motoboys e mais de 100 farmácias na rotina diária.',
    'O trabalho é um só: fazer a urgência da saúde encontrar a precisão da logística.',
  ],
};

export const desafio = {
  rotulo: 'O desafio',
  titulo: 'Entregar medicamento não é entregar encomenda',
  itens: [
    {
      titulo: 'O paciente não pode esperar',
      texto: 'Remédio comprado agora é remédio que precisa chegar hoje. Prazo de dias úteis não serve para a saúde.',
    },
    {
      titulo: 'A carga exige cuidado',
      texto: 'Produto sensível à temperatura, medicamento controlado e amostra biológica pedem procedimento próprio, do manuseio à embalagem.',
    },
    {
      titulo: 'A norma não é opcional',
      texto: 'O transporte de produtos de saúde segue regras da ANVISA e da ANTT. Quem não conhece expõe a farmácia a risco.',
    },
    {
      titulo: 'O volume muda de um dia para o outro',
      texto: 'Uma campanha ou um pico de demanda dobra os pedidos. A operação precisa ter gente para absorver sem atrasar.',
    },
  ],
};

export const solucoes = {
  rotulo: 'Soluções',
  titulo: 'Quatro soluções, uma operação especializada em saúde',
  chamada: 'Pedir cotação',
};

export const operacao = {
  rotulo: 'Por que a Connect',
  titulo: 'Uma operação feita para a última milha da saúde',
  itens: [
    {
      titulo: 'Especialização em farma',
      texto: 'A rotina da operação é medicamento. Equipe, processo e atendimento foram montados para esse tipo de carga.',
    },
    {
      titulo: 'Rastreio em tempo real',
      texto: 'Sua equipe e o cliente final acompanham cada pedido, da coleta à confirmação da entrega.',
    },
    {
      titulo: 'Expressa e D-1',
      texto: 'Entrega em até 3 horas para o que é urgente e no dia seguinte para o que pode esperar.',
    },
    {
      titulo: 'Escala comprovada',
      texto: 'Cerca de 450 motoboys e mais de 100 farmácias atendidas todos os dias.',
    },
  ],
};

export const cobertura = {
  rotulo: 'Cobertura',
  titulo: 'Operação em 10 estados, com base local em cada um',
  texto:
    'A Connect Express Log atua nas regiões Nordeste, Sudeste, Sul e Centro-Oeste, com base local em cada estado.',
};

export const valores = {
  rotulo: 'Valores',
  titulo: 'O que guia cada entrega',
  itens: [
    { titulo: 'Compromisso com a vida', texto: 'A carga mais importante é a que alguém está esperando para se tratar.' },
    { titulo: 'Ética e conformidade regulatória', texto: 'A operação segue as normas da saúde em cada etapa.' },
    { titulo: 'Agilidade com responsabilidade', texto: 'Rápido, sem abrir mão da integridade da carga.' },
    { titulo: 'Inovação e tecnologia', texto: 'Rastreio e gestão para o cliente enxergar a própria operação.' },
    { titulo: 'Transparência e confiança', texto: 'Informação clara sobre cada pedido, inclusive quando algo sai do previsto.' },
    { titulo: 'Atendimento humanizado', texto: 'Gente que atende, ouve e resolve.' },
  ],
};

export const clientesSecao = {
  rotulo: 'Clientes',
  titulo: 'Quem já entrega com a Connect',
};

export const perguntasGerais: Pergunta[] = [
  {
    pergunta: 'O que a Connect Express Log faz?',
    resposta:
      'A Connect Express Log é uma transportadora especializada em logística para a saúde. Faz entrega expressa de medicamentos, transporte de materiais biológicos, entregas rápidas com motoboy e logística para e-commerce, para empresas em 10 estados do Brasil.',
  },
  {
    pergunta: 'Em quais estados a Connect Express Log atua?',
    resposta:
      'A Connect Express Log atua em 10 estados, entre eles Bahia, São Paulo, Rio de Janeiro, Espírito Santo, Distrito Federal, Mato Grosso, Paraná, Minas Gerais e Pernambuco. A matriz fica em Lauro de Freitas, na Bahia, e a filial em São Paulo.',
  },
  {
    pergunta: 'O que avaliar antes de contratar delivery para uma rede de farmácias?',
    resposta:
      'Antes de contratar delivery para uma rede de farmácias, avalie quatro pontos: se a transportadora é especializada em medicamentos, se oferece rastreio em tempo real, se tem equipe para absorver picos de demanda e se cumpre as normas da ANVISA e da ANTT.',
  },
  {
    pergunta: 'Por que entregar medicamento em 3 horas exige outra operação?',
    resposta:
      'Entregar medicamento em até 3 horas exige equipe perto das lojas, acompanhamento em tempo real e procedimento para carga de saúde. Uma operação de encomendas comuns trabalha com rotas fixas e prazo de dias, e não consegue responder a um pedido urgente.',
  },
  {
    pergunta: 'Como peço uma cotação?',
    resposta:
      'A cotação é pedida pelo formulário de contato do site, pelo WhatsApp comercial (11) 95595-4684 ou pelo e-mail comercial@connectexpresslog.com.br. Informe o tipo de carga, as cidades atendidas e o volume médio de pedidos.',
  },
];

export const contatoSecao = {
  rotulo: 'Contato',
  titulo: 'Peça uma cotação',
  texto: 'Conte como é a sua operação. O comercial responde com uma proposta para o seu volume e a sua região.',
};

// Públicos atendidos, reunidos do campo "paraQuem" das soluções.
export const publicos = [
  'Redes de farmácias',
  'Distribuidoras de medicamentos',
  'Laboratórios',
  'Clínicas e hospitais',
  'Lojas virtuais e marketplaces',
  'Empresas e comércios',
];
