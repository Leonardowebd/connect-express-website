// Fatos da empresa. Fonte: tabela de fatos em .claude/skills/connect-copy-website.
// Todo telefone, endereço, número e nome de cliente do site vem daqui.

export const URL_SITE = 'https://www.connectexpresslog.com.br';

export const empresa = {
  nome: 'Connect Express Log',
  razaoSocial: 'Mcs Translog Logistica e Servicos de Transporte LTDA',
  cnpj: '23.039.490/0001-35',
  categoria: 'transportadora especializada em logística para a saúde',
  resumo:
    'A Connect Express Log é uma transportadora especializada em logística para a saúde. Entrega medicamentos, materiais biológicos e encomendas de e-commerce para redes de farmácias, laboratórios, clínicas e lojas virtuais em 10 estados do Brasil.',
  urlRastreio: 'https://rastreio.connectexpresslog.com.br/',
} as const;

export const contatos = {
  comercial: {
    rotulo: 'Comercial',
    telefone: '(11) 95595-4684',
    telefoneLink: '+5511955954684',
    whatsapp: '5511955954684',
    email: 'comercial@connectexpresslog.com.br',
  },
  sac: {
    rotulo: 'SAC',
    telefone: '(11) 5028-0388',
    telefoneLink: '+551150280388',
    email: 'sac@connectexpresslog.com.br',
  },
  vagas: { email: 'vagas@connectexpresslog.com.br' },
} as const;

export const MENSAGEM_WHATSAPP = 'Olá! Vim pelo site e quero uma cotação.';

export const linkWhatsApp = `https://wa.me/${contatos.comercial.whatsapp}?text=${encodeURIComponent(MENSAGEM_WHATSAPP)}`;

export const enderecos = [
  {
    tipo: 'Matriz',
    rua: 'R. Gilvan Fernandes, 188, Galpão 07',
    bairro: 'Recreio Ipitanga',
    cidade: 'Lauro de Freitas',
    uf: 'BA',
    cep: '42700-530',
  },
  {
    tipo: 'Filial',
    rua: 'Av. Itaberaba, 4688',
    bairro: 'Itaberaba',
    cidade: 'São Paulo',
    uf: 'SP',
    cep: '02739-000',
  },
] as const;

export const redes = [
  { nome: 'LinkedIn', url: 'https://www.linkedin.com/in/connect-expresslog/' },
  { nome: 'Instagram', url: 'https://www.instagram.com/connectexpresslog/' },
] as const;

// A apresentação do cliente fala em 10 estados; o site antigo nomeia nove.
// O décimo é a pergunta em aberto Q-008 da especificação. Ao confirmar,
// acrescentar aqui e nada mais precisa mudar.
export const TOTAL_ESTADOS = 10;

export const estados = [
  { uf: 'BA', nome: 'Bahia' },
  { uf: 'SP', nome: 'São Paulo' },
  { uf: 'RJ', nome: 'Rio de Janeiro' },
  { uf: 'ES', nome: 'Espírito Santo' },
  { uf: 'DF', nome: 'Distrito Federal' },
  { uf: 'MT', nome: 'Mato Grosso' },
  { uf: 'PR', nome: 'Paraná' },
  { uf: 'MG', nome: 'Minas Gerais' },
  { uf: 'PE', nome: 'Pernambuco' },
] as const;

export const centrosDeDistribuicao = ['São Paulo', 'Rio de Janeiro'] as const;

export const numeros = [
  { valor: 100, prefixo: '+', sufixo: '', legenda: 'farmácias atendidas' },
  { valor: 450, prefixo: '', sufixo: '', legenda: 'motoboys na operação' },
  { valor: TOTAL_ESTADOS, prefixo: '', sufixo: '', legenda: 'estados com operação' },
  { valor: 3, prefixo: '', sufixo: 'h', legenda: 'para a entrega expressa' },
  { valor: 15, prefixo: '+', sufixo: '', legenda: 'anos de logística' },
] as const;

export const clientes = [
  'Drogaria São Paulo',
  'Drogaria Pacheco',
  'Pague Menos',
  'Extrafarma',
  'Drogaria Rosário',
  'Magazine Luiza',
  'Decathlon',
  'Salvador Medical',
] as const;

export const navegacao = [
  { rotulo: 'Início', href: '/' },
  { rotulo: 'Quem Somos', href: '/#sobre' },
  { rotulo: 'Soluções', href: '/#servicos' },
  { rotulo: 'Cobertura', href: '/#cobertura' },
  { rotulo: 'Contato', href: '/#contato' },
] as const;
