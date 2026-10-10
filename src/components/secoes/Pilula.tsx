import Link from 'next/link';
import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr';
import type { ReactNode } from 'react';
import styles from './secoes.module.css';

type Props = { href: string; children: ReactNode; externo?: boolean; clara?: boolean };

/** Botão em pílula com seta em círculo, marca da versão B. */
export function Pilula({ href, children, externo = false, clara = false }: Props) {
  const classe = `${styles.pilula} ${clara ? styles.pilulaClara : ''}`;
  const conteudo = (
    <>
      <span>{children}</span>
      <span className={styles.pilulaSeta}>
        <ArrowUpRight aria-hidden="true" weight="bold" size={16} />
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
