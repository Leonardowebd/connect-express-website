'use client';

import { useRef, type ReactNode } from 'react';
import { gsap, useGSAP } from './gsap';
import { CURVA, DESLOCAMENTO, DURACAO, INICIO, INTERVALO, SEM_REDUCAO } from './constantes';

type Props = {
  children: ReactNode;
  className?: string;
  /** Anima os filhos diretos em sequência, em vez do bloco inteiro. */
  emSequencia?: boolean;
};

/**
 * Entrada discreta ao rolar. O conteúdo nasce visível no HTML: a animação
 * parte de um estado deslocado só depois que o script carrega, e não roda
 * quando o visitante pede movimento reduzido.
 */
export function Revelar({ children, className, emSequencia = false }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(SEM_REDUCAO, () => {
        gsap.from(emSequencia ? Array.from(el.children) : el, {
          y: DESLOCAMENTO,
          opacity: 0,
          duration: DURACAO,
          ease: CURVA,
          stagger: emSequencia ? INTERVALO : 0,
          scrollTrigger: { trigger: el, start: INICIO, once: true },
        });
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
