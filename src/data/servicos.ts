// As quatro soluções. Os endereços (slug) são os mesmos do site antigo.
// Regras de escrita: .claude/skills/connect-copy-website e connect-geo.

export type Pergunta = { pergunta: string; resposta: string };

export type Servico = {
  slug: string;
  nome: string;
  nomeCurto: string;
  etiqueta: string;
  tipo: string;
  resumo: string;
  tituloPagina: string;
  descricaoPagina: string;
  definicao: string;
  paraQuem: string[];
  inclui: string[];
  motivos: { titulo: string; texto: string }[];
  perguntas: Pergunta[];
  imagem: string;
};

export const servicos: Servico[] = [
  {
    slug: 'entrega-expressa-de-medicamentos',
    nome: 'Entrega expressa de medicamentos',
    nomeCurto: 'Medicamentos',
    etiqueta: 'Expressa e D-1',
    tipo: 'Logística farmacêutica',
    resumo:
      'Medicamento na casa do cliente em até 3 horas, rastreado do balcão à porta e com controle de temperatura quando o produto exige.',
    tituloPagina: 'Entrega expressa de medicamentos | Connect Express Log',
    descricaoPagina:
      'Entrega expressa de medicamentos em até 3 horas para redes de farmácias, clínicas e hospitais. Rastreio em tempo real e operação em 10 estados.',
    definicao:
      'Entrega expressa de medicamentos é o transporte rápido de remédios da farmácia ou do centro de distribuição até o paciente, com rastreio e cuidados próprios da carga farmacêutica. A Connect Express Log faz essa entrega em até 3 horas para redes de farmácias, distribuidoras, clínicas e hospitais em 10 estados, com uma operação de cerca de 450 motoboys e mais de 15 anos de experiência.',
    paraQuem: ['Redes de farmácias', 'Distribuidoras', 'Clínicas', 'Hospitais'],
    inclui: [
      'Coleta e entrega programadas ou sob demanda',
      'Entrega expressa em até 3 horas e modelo D-1',
      'Rastreamento em tempo real de cada pedido',
      'Controle de temperatura para produtos sensíveis',
      'Operação alinhada às normas da ANVISA e da ANTT',
      'Suporte operacional dedicado do início ao fim',
    ],
    motivos: [
      {
        titulo: 'Mais de 100 farmácias na operação',
        texto: 'A Connect Express Log já entrega para grandes redes do país. O processo está testado em volume real.',
      },
      {
        titulo: 'Cerca de 450 motoboys treinados',
        texto: 'Equipe treinada para o setor de saúde, do manuseio da carga ao atendimento na entrega.',
      },
      {
        titulo: 'Expressa ou D-1, conforme o pedido',
        texto: 'Dois modelos na mesma operação. Sua rede escolhe o prazo por tipo de venda e controla o custo.',
      },
    ],
    perguntas: [
      {
        pergunta: 'Em quanto tempo a entrega expressa de medicamentos chega?',
        resposta:
          'A entrega expressa de medicamentos da Connect Express Log chega em até 3 horas após a coleta, dentro da área de cobertura. Para pedidos sem urgência existe o modelo D-1, com entrega no dia seguinte. A rede de farmácias define o modelo por tipo de pedido.',
      },
      {
        pergunta: 'Quais medicamentos podem ser transportados?',
        resposta:
          'A Connect Express Log transporta medicamentos de uso comum, controlados, hospitalares e sensíveis à temperatura. Cada categoria segue o procedimento exigido pela ANVISA, com embalagem adequada e controle de temperatura quando o produto pede.',
      },
      {
        pergunta: 'Como funciona o rastreamento em tempo real?',
        resposta:
          'Cada pedido recebe um código de rastreio. A farmácia e o cliente final acompanham o trajeto e a previsão de chegada pelo portal de rastreio da Connect Express Log, da coleta até a confirmação da entrega.',
      },
      {
        pergunta: 'Entrega D-1 ou expressa: quando cada modelo faz sentido?',
        resposta:
          'A entrega expressa serve para o pedido urgente, quando o paciente precisa do medicamento no mesmo dia. A entrega D-1 serve para compras recorrentes e programadas, com custo menor por pedido. Muitas redes combinam os dois modelos na mesma operação.',
      },
    ],
    imagem: 'solucao-medicamentos',
  },
  {
    slug: 'transporte-de-materiais-biologicos',
    nome: 'Transporte de materiais biológicos',
    nomeCurto: 'Materiais biológicos',
    etiqueta: 'Biossegurança',
    tipo: 'Transporte de amostras biológicas',
    resumo:
      'Amostra íntegra da coleta ao laboratório, com embalagem certificada, temperatura controlada e equipe treinada em biossegurança.',
    tituloPagina: 'Transporte de materiais biológicos | Connect Express Log',
    descricaoPagina:
      'Transporte de materiais biológicos para laboratórios, hospitais e clínicas, com biossegurança, temperatura controlada e rastreio em tempo real.',
    definicao:
      'Transporte de materiais biológicos é o deslocamento de amostras clínicas, exames e substâncias que podem conter agentes infecciosos, sob regras de biossegurança. A Connect Express Log faz a coleta e a entrega dessas amostras para laboratórios, hospitais e clínicas em 10 estados, com embalagens certificadas, controle de temperatura e rastreio do início ao fim.',
    paraQuem: ['Laboratórios', 'Hospitais', 'Clínicas'],
    inclui: [
      'Coleta e entrega de amostras clínicas e laboratoriais',
      'Controle de temperatura durante todo o trajeto',
      'Embalagens certificadas, conforme as exigências da ANVISA',
      'Rastreamento em tempo real',
      'Suporte operacional dedicado para urgências',
    ],
    motivos: [
      {
        titulo: 'Equipe treinada em biossegurança',
        texto: 'Quem coleta e transporta conhece o protocolo de cada tipo de amostra e sabe agir em caso de incidente.',
      },
      {
        titulo: 'Conformidade com ANVISA e ANTT',
        texto: 'Embalagem, identificação e documentação seguem as normas do transporte de material biológico.',
      },
      {
        titulo: 'Mais de 15 anos na logística da saúde',
        texto: 'A mesma operação que entrega medicamentos para grandes redes cuida das suas amostras.',
      },
    ],
    perguntas: [
      {
        pergunta: 'O que é o transporte de materiais biológicos?',
        resposta:
          'É o transporte de amostras clínicas, exames e outras substâncias que podem conter agentes infecciosos. Por envolver risco sanitário, ele exige embalagem própria, controle de temperatura, identificação correta e equipe treinada em biossegurança.',
      },
      {
        pergunta: 'Quais cuidados o transporte de materiais biológicos exige?',
        resposta:
          'O transporte de materiais biológicos exige embalagem tripla, veículo higienizado, controle de temperatura, equipe treinada em biossegurança e rastreamento. A Connect Express Log segue esses cuidados em todas as coletas, conforme as normas da ANVISA e da ANTT.',
      },
      {
        pergunta: 'A Connect Express Log atende urgências de laboratório?',
        resposta:
          'Sim. A Connect Express Log tem suporte operacional dedicado para coletas urgentes de laboratórios, hospitais e clínicas. O pedido é priorizado na operação e acompanhado em tempo real até a entrega da amostra.',
      },
    ],
    imagem: 'solucao-biologicos',
  },
  {
    slug: 'entregas-rapidas-com-motoboy',
    nome: 'Entregas rápidas com motoboy',
    nomeCurto: 'Motoboy',
    etiqueta: 'Porta a porta',
    tipo: 'Entrega rápida com motoboy',
    resumo:
      'Coleta e entrega porta a porta de medicamentos, insumos, documentos e encomendas leves, com motoboy treinado e rastreio.',
    tituloPagina: 'Entregas rápidas com motoboy | Connect Express Log',
    descricaoPagina:
      'Entregas rápidas com motoboy para empresas, clínicas e comércios. Cerca de 450 motoboys treinados, rastreio em tempo real e coleta agendada.',
    definicao:
      'Entregas rápidas com motoboy são coletas e entregas porta a porta de itens leves, feitas de moto dentro da cidade. A Connect Express Log oferece esse serviço para empresas, clínicas e comércios, com cerca de 450 motoboys uniformizados e treinados, rastreio em tempo real e agendamento de coletas.',
    paraQuem: ['Empresas', 'Clínicas', 'Comércios', 'Farmácias'],
    inclui: [
      'Coleta e entrega expressa de medicamentos, insumos, documentos e encomendas leves',
      'Agendamento de coletas e entregas',
      'Motoboys uniformizados e equipados',
      'Rastreamento em tempo real',
      'Entrega porta a porta',
      'Suporte operacional dedicado',
    ],
    motivos: [
      {
        titulo: 'Cerca de 450 motoboys',
        texto: 'Escala para atender picos de demanda sem atrasar o pedido do dia a dia.',
      },
      {
        titulo: 'Treinados para a saúde e para empresas',
        texto: 'Motoboys treinados para os setores de saúde e corporativo.',
      },
      {
        titulo: 'Tudo rastreado',
        texto: 'Sua equipe vê onde está cada entrega, sem precisar ligar para o motoboy.',
      },
    ],
    perguntas: [
      {
        pergunta: 'Que tipo de entrega o serviço de motoboy atende?',
        resposta:
          'O serviço de motoboy da Connect Express Log atende medicamentos, insumos de saúde, documentos e encomendas leves. As entregas são porta a porta, dentro da cidade, com coleta imediata ou agendada.',
      },
      {
        pergunta: 'Posso agendar coletas recorrentes?',
        resposta:
          'Sim. A empresa pode agendar coletas e entregas em dias e horários fixos, além de pedir coletas avulsas quando precisar. As rotas recorrentes entram no planejamento da operação e mantêm o mesmo padrão de rastreio.',
      },
      {
        pergunta: 'Como acompanho a entrega feita por motoboy?',
        resposta:
          'Cada entrega tem rastreamento em tempo real. Sua equipe acompanha a coleta, o trajeto e a confirmação da entrega pelo portal de rastreio da Connect Express Log.',
      },
    ],
    imagem: 'solucao-motoboy',
  },
  {
    slug: 'transporte-e-logistica-para-e-commerce',
    nome: 'Transporte e logística para e-commerce',
    nomeCurto: 'E-commerce',
    etiqueta: 'D1 e D2',
    tipo: 'Logística para e-commerce',
    resumo:
      'Entrega em D1 e D2 com rastreio, armazenagem e cross docking. A operação cresce junto com o volume da sua loja.',
    tituloPagina: 'Logística para e-commerce D1 e D2 | Connect Express Log',
    descricaoPagina:
      'Logística para e-commerce com entregas D1 e D2, armazenagem, cross docking e rastreio em tempo real. Operação em 10 estados para lojas de todos os portes.',
    definicao:
      'Logística para e-commerce é o conjunto de coleta, armazenagem, transporte e entrega dos pedidos de uma loja virtual. A Connect Express Log faz esse trabalho com entregas em D1 e D2, cross docking e rastreio em tempo real, para lojas de qualquer porte em 10 estados.',
    paraQuem: ['Lojas virtuais', 'Marketplaces', 'Varejo com venda online'],
    inclui: [
      'Entregas em D1 e D2',
      'Coleta e distribuição urbana e interestadual',
      'Armazenagem e cross docking',
      'Rastreamento em tempo real',
      'Gestão logística com relatórios de desempenho',
      'Suporte operacional dedicado',
    ],
    motivos: [
      {
        titulo: 'Prazo de D1 e D2',
        texto: 'O pedido chega no dia seguinte ou em dois dias, e o cliente acompanha tudo pelo rastreio.',
      },
      {
        titulo: 'Operação em 10 estados',
        texto: 'Matriz na Bahia, filial em São Paulo e centros de distribuição em São Paulo e no Rio de Janeiro.',
      },
      {
        titulo: 'Escala sem trocar de parceiro',
        texto: 'Da loja pequena à grande operação, o processo e o padrão de entrega são os mesmos.',
      },
    ],
    perguntas: [
      {
        pergunta: 'Como funciona a logística para e-commerce da Connect Express Log?',
        resposta:
          'A Connect Express Log coleta os pedidos na loja ou no centro de distribuição, faz a triagem em cross docking e entrega ao cliente final em D1 ou D2. Cada pedido é rastreado em tempo real e a loja recebe relatórios de desempenho.',
      },
      {
        pergunta: 'Vale a pena terceirizar a logística do e-commerce?',
        resposta:
          'Terceirizar a logística reduz custo fixo com frota e equipe e melhora o prazo de entrega, porque a loja passa a usar uma operação já estruturada. A loja se concentra em vender, e a entrega fica com quem faz isso todos os dias.',
      },
      {
        pergunta: 'A Connect Express Log atende lojas pequenas?',
        resposta:
          'Sim. A Connect Express Log atende e-commerces de todos os portes, de pequenos lojistas a grandes operações. O modelo é escalável: o volume cresce sem mudar o processo nem o padrão de entrega.',
      },
    ],
    imagem: 'solucao-ecommerce',
  },
];

export const buscarServico = (slug: string) => servicos.find((s) => s.slug === slug);
