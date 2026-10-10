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
  {
    id: 'chamada-final',
    arquivo: 'chamada-final.webp',
    largura: 2400,
    altura: 900,
    alt: 'Motos da Connect Express Log saindo para rota ao amanhecer',
    pedido: 'Foto panorâmica, escura o bastante para texto branco por cima, com a frota ou a base em atividade.',
  },
];

export const buscarImagem = (id: string) => {
  const imagem = imagens.find((i) => i.id === id);
  if (!imagem) throw new Error(`Espaço de imagem "${id}" não está no manifesto.`);
  return imagem;
};
