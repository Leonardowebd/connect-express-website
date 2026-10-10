// Manifesto dos espaços de imagem.
// As fotos finais ainda não existem. Para trocar um substituto pela foto,
// salve o arquivo com o nome indicado em public/imagens e gere o site de novo.
// "pedido" descreve o que a foto precisa mostrar, para quem for produzir.

export type EspacoDeImagem = {
  id: string;
  arquivo: string;
  largura: number;
  altura: number;
  alt: string;
  pedido: string;
  prioridade?: boolean;
};

export const imagens: EspacoDeImagem[] = [
  {
    id: 'heroi-inicio',
    arquivo: 'heroi-inicio.webp',
    largura: 2400,
    altura: 1350,
    alt: 'Motoboy da Connect Express Log em entrega, com baú identificado',
    pedido: 'Foto horizontal, escura o bastante para texto branco por cima. Motoboy com baú da marca em rua de cidade. Área livre à esquerda para o título.',
    prioridade: true,
  },
  {
    id: 'quem-somos',
    arquivo: 'quem-somos.webp',
    largura: 1200,
    altura: 800,
    alt: 'Equipe da Connect Express Log na base de operação',
    pedido: 'Foto horizontal da equipe ou da base, com uniforme da marca.',
  },
  {
    id: 'quem-somos-detalhe',
    arquivo: 'quem-somos-detalhe.webp',
    largura: 800,
    altura: 1200,
    alt: 'Baú térmico usado nas entregas de medicamentos',
    pedido: 'Foto vertical de detalhe: baú, embalagem térmica ou conferência de pedido.',
  },
  {
    id: 'desafio-prazo',
    arquivo: 'desafio-prazo.webp',
    largura: 1000,
    altura: 1000,
    alt: 'Entrega de medicamento na porta do cliente',
    pedido: 'Foto quadrada do momento da entrega ao cliente final.',
  },
  {
    id: 'desafio-cuidado',
    arquivo: 'desafio-cuidado.webp',
    largura: 1000,
    altura: 1000,
    alt: 'Medicamentos acondicionados em embalagem térmica',
    pedido: 'Foto quadrada de medicamentos em embalagem térmica ou caixa de transporte.',
  },
  {
    id: 'desafio-norma',
    arquivo: 'desafio-norma.webp',
    largura: 1000,
    altura: 1000,
    alt: 'Conferência de documentos de uma coleta',
    pedido: 'Foto quadrada de conferência: prancheta, etiqueta ou leitura de código.',
  },
  {
    id: 'desafio-volume',
    arquivo: 'desafio-volume.webp',
    largura: 1000,
    altura: 1000,
    alt: 'Motoboys da Connect Express Log prontos para sair em rota',
    pedido: 'Foto quadrada com vários motoboys ou motos alinhadas, mostrando escala.',
  },
  {
    id: 'cobertura',
    arquivo: 'cobertura.webp',
    largura: 1200,
    altura: 1200,
    alt: 'Mapa do Brasil com os estados atendidos pela Connect Express Log',
    pedido: 'Mapa do Brasil em traço simples com os estados atendidos marcados em laranja. Sem texto dentro da imagem.',
  },
  {
    id: 'solucao-medicamentos',
    arquivo: 'solucao-medicamentos.webp',
    largura: 1600,
    altura: 1000,
    alt: 'Entregador retirando medicamentos em uma farmácia',
    pedido: 'Foto horizontal de coleta em farmácia.',
  },
  {
    id: 'solucao-biologicos',
    arquivo: 'solucao-biologicos.webp',
    largura: 1600,
    altura: 1000,
    alt: 'Caixa de transporte de amostras biológicas',
    pedido: 'Foto horizontal de caixa térmica de amostras, com identificação de risco biológico.',
  },
  {
    id: 'solucao-motoboy',
    arquivo: 'solucao-motoboy.webp',
    largura: 1600,
    altura: 1000,
    alt: 'Motoboy uniformizado da Connect Express Log',
    pedido: 'Foto horizontal de motoboy uniformizado, com a moto e o baú.',
  },
  {
    id: 'solucao-ecommerce',
    arquivo: 'solucao-ecommerce.webp',
    largura: 1600,
    altura: 1000,
    alt: 'Pacotes de e-commerce em triagem no centro de distribuição',
    pedido: 'Foto horizontal de triagem de pacotes no centro de distribuição.',
  },
];

export const buscarImagem = (id: string) => {
  const imagem = imagens.find((i) => i.id === id);
  if (!imagem) throw new Error(`Espaço de imagem "${id}" não está no manifesto.`);
  return imagem;
};
