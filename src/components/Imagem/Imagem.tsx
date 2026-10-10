import fs from 'node:fs';
import path from 'node:path';
import Image from 'next/image';
import { buscarImagem } from '@/data/imagens';
import styles from './Imagem.module.css';

type Props = {
  id: string;
  sizes?: string;
  className?: string;
  tom?: 'claro' | 'escuro';
  /** Preenche o elemento pai em vez de usar a proporção do manifesto. */
  preencher?: boolean;
  /** 90 para fotos de tela cheia; o padrão é 75. */
  qualidade?: 75 | 90;
};

const PASTA = path.join(process.cwd(), 'public', 'imagens');

/**
 * Mostra a imagem final quando o arquivo do manifesto existe em public/imagens.
 * Enquanto não existe, mostra um substituto da marca na mesma proporção.
 */
export function Imagem({ id, sizes = '100vw', className, tom = 'claro', preencher = false, qualidade = 75 }: Props) {
  const imagem = buscarImagem(id);
  const existe = fs.existsSync(path.join(PASTA, imagem.arquivo));
  const classes = [styles.base, preencher ? styles.preencher : '', className ?? ''].filter(Boolean).join(' ');

  if (existe) {
    return (
      <Image
        src={`/imagens/${imagem.arquivo}`}
        width={imagem.largura}
        height={imagem.altura}
        alt={imagem.alt}
        sizes={sizes}
        quality={qualidade}
        priority={imagem.prioridade}
        data-espaco={imagem.id}
        className={`${classes} ${styles.foto}`}
      />
    );
  }

  return (
    <div
      role="img"
      aria-label={imagem.alt}
      data-espaco={imagem.id}
      data-substituto=""
      className={`${classes} ${styles.substituto} ${tom === 'escuro' ? styles.escuro : ''}`}
      style={preencher ? undefined : { aspectRatio: `${imagem.largura} / ${imagem.altura}` }}
    />
  );
}
