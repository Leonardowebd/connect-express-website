'use client';

// Texto que ganha nitidez palavra a palavra conforme a rolagem.
// Adaptado de ScrollReveal, do React Bits (reactbits.dev).
// Mudanças: um gatilho de rolagem para opacidade e desfoque juntos, limpeza
// restrita a este componente, sem desfoque em telas de toque e nada de
// animação quando o visitante pede movimento reduzido.

import { useMemo, useRef } from 'react';
import { gsap, useGSAP } from '@/animacoes/gsap';
import styles from './efeitos.module.css';

type Props = {
  children: string;
  opacidadeInicial?: number;
  desfoque?: boolean;
  forcaDoDesfoque?: number;
  rotacaoInicial?: number;
  className?: string;
};

// Acima disso, desfocar palavra por palavra pesa demais na GPU.
const LIMITE_DE_PALAVRAS_COM_DESFOQUE = 40;

export function TextoRevelado({
  children,
  opacidadeInicial = 0.15,
  desfoque = true,
  forcaDoDesfoque = 4,
  rotacaoInicial = 2,
  className = '',
}: Props) {
  const ref = useRef<HTMLParagraphElement>(null);

  const partes = useMemo(
    () =>
      children.split(/(\s+)/).map((parte, i) =>
        /^\s+$/.test(parte) ? (
          parte
        ) : (
          <span key={i} data-palavra="" className={styles.palavra}>
            {parte}
          </span>
        ),
      ),
    [children],
  );

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(
        { movimento: '(prefers-reduced-motion: no-preference)', toque: '(pointer: coarse)' },
        (contexto) => {
          const { movimento, toque } = contexto.conditions as { movimento: boolean; toque: boolean };
          if (!movimento) return;
          const palavras = el.querySelectorAll('[data-palavra]');
          const comDesfoque = desfoque && !toque && palavras.length <= LIMITE_DE_PALAVRAS_COM_DESFOQUE;

          gsap.fromTo(
            el,
            { transformOrigin: '0% 50%', rotate: rotacaoInicial },
            { rotate: 0, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'top 55%', scrub: true } },
          );
          gsap.fromTo(
            palavras,
            { opacity: opacidadeInicial, ...(comDesfoque ? { filter: `blur(${forcaDoDesfoque}px)` } : {}) },
            {
              opacity: 1,
              ...(comDesfoque ? { filter: 'blur(0px)' } : {}),
              ease: 'none',
              stagger: 0.05,
              scrollTrigger: { trigger: el, start: 'top 88%', end: 'bottom 62%', scrub: true },
            },
          );
        },
      );
    },
    { scope: ref },
  );

  return (
    <p ref={ref} data-efeito="texto-revelado" className={`${styles.textoRevelado} ${className}`.trim()}>
      {partes}
    </p>
  );
}
