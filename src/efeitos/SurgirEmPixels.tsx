import type { ReactNode } from 'react';
import styles from './efeitos.module.css';

// Surgir em pixels: abertura do site. Uma tela branca com a marca ao centro
// cobre a página; a marca some e a tela se desfaz em blocos, em ordem
// aleatória, mostrando o herói. Adaptado do PixelSwap do React Bits (padrão
// "random", com fade e escala de 0,35), reduzido a CSS: é componente de
// servidor, sem JavaScript no navegador. A página por baixo já está pintada
// e a tela não recebe cliques, então nada fica bloqueado.

type Props = {
  /** A marca, centralizada sobre a tela. */
  children?: ReactNode;
  /** Quantidade de blocos. A grade (5 por 16 no celular, 10 por 8 no computador) está no CSS. */
  blocos?: number;
  /** Tempo com a marca à vista antes de a tela começar a se desfazer, em ms. */
  espera?: number;
  /** Tempo entre o primeiro e o último bloco começarem a sumir, em ms. */
  duracao?: number;
  /** Tempo de cada bloco, em ms. */
  duracaoDoBloco?: number;
};

/** Ordem embaralhada, mas igual em todo build (sem Math.random, para o HTML ser estável). */
function ordem(i: number, total: number) {
  return ((i * 37 + 11) % total) / total;
}

export function SurgirEmPixels({ children, blocos: total = 80, espera = 900, duracao = 800, duracaoDoBloco = 450 }: Props) {
  return (
    <div className={styles.surgir} data-efeito="surgir-em-pixels" aria-hidden="true">
      <div className={styles.surgirGrade}>
        {Array.from({ length: total }, (_, i) => (
          <i
            key={i}
            style={{
              animationDelay: `${espera + Math.round(ordem(i, total) * duracao)}ms`,
              animationDuration: `${duracaoDoBloco}ms`,
            }}
          />
        ))}
      </div>
      {children ? (
        <div className={styles.surgirMarca} style={{ animationDelay: `${espera - 250}ms` }}>
          {children}
        </div>
      ) : null}
    </div>
  );
}
