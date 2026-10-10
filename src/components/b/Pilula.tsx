import Link from 'next/link';
import type { ReactNode } from 'react';
import styles from './b.module.css';

type Props = { href: string; children: ReactNode; externo?: boolean; clara?: boolean };

/** Botão em pílula com seta em círculo, marca da versão B. */
export function Pilula({ href, children, externo = false, clara = false }: Props) {
  const classe = `${styles.pilula} ${clara ? styles.pilulaClara : ''}`;
  const conteudo = (
    <>
      <span>{children}</span>
      <span className={styles.pilulaSeta} aria-hidden="true">
        ↗
      </span>
    </>
  );
  return externo ? (
    <a href={href} className={classe} target="_blank" rel="noopener noreferrer">
      {conteudo}
    </a>
  ) : (
    <Link href={href} className={classe}>
      {conteudo}
    </Link>
  );
}
