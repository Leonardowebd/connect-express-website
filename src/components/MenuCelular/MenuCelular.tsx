'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import styles from './MenuCelular.module.css';

type Item = { rotulo: string; href: string; externo?: boolean };

type Props = { itens: Item[]; atalhos: Item[]; cotacao: string; whatsapp: string; marca: string };

/** Menu do celular: painel verde em tela cheia, com fechar próprio, Esc e foco devolvido ao botão. */
export function MenuCelular({ itens, atalhos, cotacao, whatsapp, marca }: Props) {
  const [aberto, setAberto] = useState(false);
  const abrir = useRef<HTMLButtonElement>(null);
  const fechar = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!aberto) return;
    const sair = () => setAberto(false);
    const aoTeclar = (e: KeyboardEvent) => e.key === 'Escape' && sair();
    const desktop = window.matchMedia('(min-width: 1024px)');
    const botao = abrir.current;
    document.addEventListener('keydown', aoTeclar);
    desktop.addEventListener('change', sair);
    document.body.style.overflow = 'hidden';
    fechar.current?.focus();
    return () => {
      document.removeEventListener('keydown', aoTeclar);
      desktop.removeEventListener('change', sair);
      document.body.style.overflow = '';
      botao?.focus();
    };
  }, [aberto]);

  const link = (item: Item) => (
    <a
      href={item.href}
      onClick={() => setAberto(false)}
      {...(item.externo ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {item.rotulo}
    </a>
  );

  return (
    <>
      <button
        ref={abrir}
        type="button"
        className={styles.botaoMenu}
        aria-expanded={aberto}
        aria-controls="menu-celular"
        aria-label="Abrir menu"
        onClick={() => setAberto(true)}
      >
        <span className={styles.barras} aria-hidden="true" />
      </button>

      <div id="menu-celular" className={styles.painel} data-aberto={aberto} inert={!aberto}>
        <div className={styles.topo}>
          <Image src="/logos/logo-connect-express-log.png" alt={marca} width={900} height={486} sizes="120px" />
          <button ref={fechar} type="button" className={styles.botaoFechar} aria-label="Fechar menu" onClick={() => setAberto(false)}>
            <span aria-hidden="true" />
          </button>
        </div>

        <nav aria-label="Menu principal">
          <ul className={styles.lista}>
            {itens.map((item) => (
              <li key={item.rotulo}>{link(item)}</li>
            ))}
          </ul>
        </nav>

        <ul className={styles.atalhos}>
          {atalhos.map((item) => (
            <li key={item.rotulo}>{link(item)}</li>
          ))}
        </ul>

        <div className={styles.acoes}>
          <a className="botao botao-acao" href={cotacao} onClick={() => setAberto(false)}>
            Pedir cotação
          </a>
          <a className="botao botao-contorno" href={whatsapp} target="_blank" rel="noopener noreferrer">
            Falar no WhatsApp
          </a>
        </div>
      </div>
    </>
  );
}
