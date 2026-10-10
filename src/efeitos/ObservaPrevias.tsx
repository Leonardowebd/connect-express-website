'use client';

// Marca cada prévia de imagem quando ela entra na tela.
// Em telas de toque não existe "passar o mouse": a imagem de cada solução
// fica na própria linha e aparece com a rolagem. O espaço já está reservado,
// então nada pula de lugar.

import { useEffect, useRef, type ReactNode } from 'react';

export function ObservaPrevias({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const previas = el.querySelectorAll<HTMLElement>('[data-previa]');
    el.dataset.pronto = '';
    const observador = new IntersectionObserver(
      (entradas) => {
        for (const entrada of entradas) {
          if (!entrada.isIntersecting) continue;
          (entrada.target as HTMLElement).dataset.visivel = '';
          observador.unobserve(entrada.target);
        }
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.2 },
    );
    previas.forEach((p) => observador.observe(p));
    return () => {
      observador.disconnect();
      delete el.dataset.pronto;
    };
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
