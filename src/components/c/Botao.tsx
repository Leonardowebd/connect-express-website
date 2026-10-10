import Link from 'next/link';
import type { ReactNode } from 'react';
import styles from './c.module.css';

type Props = { href: string; children: ReactNode; tipo?: 'acao' | 'claro' | 'contorno'; externo?: boolean };

/** Botão da versão C: canto médio e seta à direita. */
export function Botao({ href, children, tipo = 'acao', externo = false }: Props) {
  const classe = `${styles.btn} ${styles[`btn-${tipo}`]}`;
  const conteudo = (
    <>
      <span>{children}</span>
      <span aria-hidden="true">→</span>
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
