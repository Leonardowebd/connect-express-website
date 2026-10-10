// Manifesto dos espaços de imagem.
// Para trocar uma foto, salve o novo arquivo com o mesmo nome em public/imagens
// (WebP, na largura indicada) e gere o site de novo. Se o arquivo não existir,
// o site mostra um substituto da marca na mesma proporção.
// "origem" registra de qual arquivo de Dados/Imagens Novo site a foto veio.
// Com seis fotos para dez espaços, quatro se repetem: ver "pedido".

export type EspacoDeImagem = {
  id: string;
  arquivo: string;
  largura: number;
  altura: number;
  alt: string;
  origem: string;
  pedido: string;
  prioridade?: boolean;
};

export const imagens: EspacoDeImagem[] = [
  {
    id: 'heroi-inicio',
    arquivo: 'heroi-inicio.webp',
    largura: 1672,
    altura: 941,
    alt: 'Frota da Connect Express Log, com caminhões refrigerados e motos, em pátio ao entardecer',
    origem: 'Frota compacta em pátio ao entardecer.png',
    pedido: 'Foto horizontal, escura o bastante para texto branco por cima, com área livre embaixo à esquerda.',
    prioridade: true,
  },
  {
    id: 'quem-somos',
    arquivo: 'quem-somos.webp',
    largura: 1280,
    altura: 720,
    alt: 'Profissional de uniforme verde da Connect Express Log calçando luvas, com caminhões da frota ao fundo',
    origem: 'Cuidado no preparo da carga biológica-3.png',
    pedido: 'Ideal: foto da equipe ou da base, com uniforme da marca.',
  },
  {
    id: 'sobre-palco',
    arquivo: 'sobre-palco.webp',
    largura: 1672,
    altura: 941,
    alt: 'Carreta verde da Connect Express Log na estrada',
    origem: 'Caminhão verde da Connect ExpressLog.png',
    pedido: 'Foto horizontal em tela cheia, que aceite texto branco por cima. Ideal: a base ou a equipe em operação.',
  },
  {
    id: 'solucao-medicamentos',
    arquivo: 'solucao-medicamentos.webp',
    largura: 1280,
    altura: 721,
    alt: 'Caminhão refrigerado da Connect Express Log em pátio ao entardecer',
    origem: 'Caminhão compacto no pátio ao entardecer-2.png',
    pedido: 'Ideal: coleta ou entrega de medicamentos em farmácia.',
  },
  {
    id: 'solucao-biologicos',
    arquivo: 'solucao-biologicos.webp',
    largura: 1280,
    altura: 721,
    alt: 'Profissional de uniforme verde calçando luvas antes de manusear a carga',
    origem: 'Cuidado no preparo da carga biológica-3.png',
    pedido: 'Preparo de carga biológica, com luvas e caixa térmica.',
  },
  {
    id: 'solucao-motoboy',
    arquivo: 'solucao-motoboy.webp',
    largura: 1280,
    altura: 721,
    alt: 'Motoboy da Connect Express Log em movimento na cidade',
    origem: 'Motoboy verde em movimento urbano-1.png',
    pedido: 'Motoboy uniformizado, com a moto e o baú da marca.',
  },
  {
    id: 'solucao-ecommerce',
    arquivo: 'solucao-ecommerce.webp',
    largura: 1280,
    altura: 721,
    alt: 'Profissional de luvas fechando uma caixa com fita da marca',
    origem: 'Lacre verde para transporte biológico-4.png',
    pedido: 'Ideal: triagem de pacotes de e-commerce no centro de distribuição.',
  },
  {
    id: 'chamada-final',
    arquivo: 'chamada-final.webp',
    largura: 1672,
    altura: 941,
    alt: 'Caminhão refrigerado da Connect Express Log ao pôr do sol',
    origem: 'Caminhão compacto no pátio ao entardecer-2.png',
    pedido: 'Repetida da solução de medicamentos. Ideal: foto panorâmica própria, da frota ou da base em atividade.',
  },
  {
    id: 'operacao',
    arquivo: 'operacao.webp',
    largura: 1280,
    altura: 721,
    alt: 'Motoboy da Connect Express Log com baú da marca em avenida',
    origem: 'Motoboy verde em movimento urbano-1.png',
    pedido: 'Repetida da solução de motoboy. Ideal: base em atividade, com separação ou conferência de pedidos.',
  },
  {
    id: 'operacao-detalhe',
    arquivo: 'operacao-detalhe.webp',
    largura: 800,
    altura: 800,
    alt: 'Caixa sendo lacrada com fita verde da marca',
    origem: 'Lacre verde para transporte biológico-4.png (recorte quadrado)',
    pedido: 'Recorte da foto de e-commerce. Ideal: detalhe próprio, como rastreio no celular ou leitura de código.',
  },
];

export const buscarImagem = (id: string) => {
  const imagem = imagens.find((i) => i.id === id);
  if (!imagem) throw new Error(`Espaço de imagem "${id}" não está no manifesto.`);
  return imagem;
};
