'use client';

import { useRef } from 'react';
import { gsap, useGSAP } from './gsap';
import { CURVA, INICIO, SEM_REDUCAO } from './constantes';

type Props = { valor: number; prefixo?: string; sufixo?: string; className?: string };

/** Número que conta até o valor final. O valor final já está no HTML. */
export function Contador({ valor, prefixo = '', sufixo = '', className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const texto = (n: number) => `${prefixo}${Math.round(n)}${sufixo}`;

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(SEM_REDUCAO, () => {
        const estado = { n: 0 };
        gsap.to(estado, {
          n: valor,
          duration: 1.4,
          ease: CURVA,
          scrollTrigger: { trigger: el, start: INICIO, once: true },
          onStart: () => {
            el.textContent = texto(0);
          },
          onUpdate: () => {
            el.textContent = texto(estado.n);
          },
          onComplete: () => {
            el.textContent = texto(valor);
          },
        });
      });
    },
    { scope: ref },
  );

  return (
    <span ref={ref} className={className}>
      {texto(valor)}
    </span>
  );
}
