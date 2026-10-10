import type { Metadata } from 'next';
import { URL_SITE, empresa } from '@/data/empresa';

type Entrada = { titulo: string; descricao: string; caminho: string; indexar?: boolean };

export const IMAGEM_COMPARTILHAMENTO = {
  url: '/logos/logo-connect-express-log.png',
  width: 900,
  height: 486,
  alt: empresa.nome,
};

/** Metadados de uma página: título, descrição, canônico e prévia de compartilhamento. */
export function metadados({ titulo, descricao, caminho, indexar = true }: Entrada): Metadata {
  return {
    title: titulo,
    description: descricao,
    alternates: { canonical: caminho },
    robots: indexar ? undefined : { index: false, follow: true },
    openGraph: {
      title: titulo,
      description: descricao,
      url: caminho,
      siteName: empresa.nome,
      locale: 'pt_BR',
      type: 'website',
      images: [IMAGEM_COMPARTILHAMENTO],
    },
    twitter: { card: 'summary_large_image', title: titulo, description: descricao, images: [IMAGEM_COMPARTILHAMENTO.url] },
  };
}

export const metadataBase = new URL(URL_SITE);
