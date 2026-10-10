// Faixa de desfoque que cresce em direção a uma borda.
// Adaptado de GradualBlur, do React Bits (reactbits.dev).
// Mudanças: é componente de servidor, sem JavaScript no navegador. As camadas
// são calculadas no build. Em telas pequenas só as três primeiras camadas
// aparecem, e a faixa some para quem pede menos transparência.

import type { CSSProperties } from 'react';
import styles from './efeitos.module.css';

type Posicao = 'top' | 'bottom' | 'left' | 'right';
type Curva = 'linear' | 'suave' | 'entrada' | 'saida';

type Props = {
  posicao?: Posicao;
  /** Altura da faixa (ou largura, quando fica na lateral). */
  tamanho?: string;
  forca?: number;
  camadas?: number;
  exponencial?: boolean;
  curva?: Curva;
  opacidade?: number;
  className?: string;
};

const CURVAS: Record<Curva, (p: number) => number> = {
  linear: (p) => p,
  suave: (p) => p * p * (3 - 2 * p),
  entrada: (p) => p * p,
  saida: (p) => 1 - (1 - p) ** 2,
};

const arredondar = (n: number) => Math.round(n * 10) / 10;

export function DesfoqueGradual({
  posicao = 'bottom',
  tamanho = '6rem',
  forca = 2,
  camadas = 5,
  exponencial = false,
  curva = 'suave',
  opacidade = 1,
  className = '',
}: Props) {
  const passo = 100 / camadas;
  const vertical = posicao === 'top' || posicao === 'bottom';

  const caixa: CSSProperties = vertical
    ? { [posicao]: 0, left: 0, right: 0, height: tamanho }
    : { [posicao]: 0, top: 0, bottom: 0, width: tamanho };

  const itens = Array.from({ length: camadas }, (_, indice) => {
    const i = indice + 1;
    const progresso = CURVAS[curva](i / camadas);
    const desfoque = exponencial ? 2 ** (progresso * 4) * 0.0625 * forca : 0.0625 * (progresso * camadas + 1) * forca;

    const p1 = arredondar(passo * i - passo);
    const p2 = arredondar(passo * i);
    const p3 = arredondar(passo * i + passo);
    const p4 = arredondar(passo * i + passo * 2);
    let faixa = `transparent ${p1}%, black ${p2}%`;
    if (p3 <= 100) faixa += `, black ${p3}%`;
    if (p4 <= 100) faixa += `, transparent ${p4}%`;
    const mascara = `linear-gradient(to ${posicao}, ${faixa})`;
    const filtro = `blur(${desfoque.toFixed(3)}rem)`;

    return (
      <div
        key={i}
        className={styles.camadaDeDesfoque}
        style={{ maskImage: mascara, WebkitMaskImage: mascara, backdropFilter: filtro, WebkitBackdropFilter: filtro, opacity: opacidade }}
      />
    );
  });

  return (
    <div aria-hidden="true" data-efeito="desfoque-gradual" className={`${styles.desfoqueGradual} ${className}`.trim()} style={caixa}>
      {itens}
    </div>
  );
}
