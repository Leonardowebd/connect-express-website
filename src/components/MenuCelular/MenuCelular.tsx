'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './MenuCelular.module.css';

type Item = { rotulo: string; href: string; externo?: boolean };

export function MenuCelular({ itens, cotacao }: { itens: Item[]; cotacao: string }) {
  const [aberto, setAberto] = useState(false);
  const botao = useRef<HTMLButtonElement>(null);
  const painel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!aberto) return;
    const fechar = () => setAberto(false);
    const aoTeclar = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        fechar();
        botao.current?.focus();
      }
    };
    const desktop = window.matchMedia('(min-width: 1024px)');
    document.addEventListener('keydown', aoTeclar);
    desktop.addEventListener('change', fechar);
    document.body.style.overflow = 'hidden';
    painel.current?.querySelector<HTMLElement>('a')?.focus();
    return () => {
      document.removeEventListener('keydown', aoTeclar);
      desktop.removeEventListener('change', fechar);
      document.body.style.overflow = '';
    };
  }, [aberto]);

  return (
    <div className={styles.celular}>
      <button
        ref={botao}
        type="button"
        className={styles.botaoMenu}
        aria-expanded={aberto}
        aria-controls="menu-celular"
        aria-label={aberto ? 'Fechar menu' : 'Abrir menu'}
        onClick={() => setAberto((a) => !a)}
      >
        <span className={styles.barras} data-aberto={aberto} aria-hidden="true" />
      </button>
      <div ref={painel} id="menu-celular" className={styles.painel} hidden={!aberto}>
        <nav aria-label="Menu principal">
          <ul className={styles.listaPainel}>
            {itens.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setAberto(false)}
                  {...(item.externo ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  {item.rotulo}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <a className="botao botao-acao" href={cotacao} onClick={() => setAberto(false)}>
          Pedir cotação
        </a>
      </div>
    </div>
  );
}
