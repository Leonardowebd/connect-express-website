'use client';

// Moldura com mídia que se abre até ocupar a tela conforme a rolagem.
// Adaptado de ScrollExpand, do React Bits (reactbits.dev).
// Mudanças: a mídia e o título entram como nós do React (para usar o
// componente Imagem e um título de verdade), só a rolagem da página é usada,
// o estado sem JavaScript já é o final (conteúdo e botão visíveis), a moldura
// começa maior no celular e nada é preso na tela com movimento reduzido.

import { useEffect, useRef, type ReactNode } from 'react';
import styles from './efeitos.module.css';

type Props = {
  midia: ReactNode;
  titulo?: ReactNode;
  children?: ReactNode;
  larguraInicial?: number;
  alturaInicial?: number;
  larguraInicialNoCelular?: number;
  alturaInicialNoCelular?: number;
  raioInicial?: number;
  raioFinal?: number;
  zoom?: number;
  /** Rolagem da expansão, em múltiplos da altura da tela. */
  distancia?: number;
  /** Rolagem extra com a mídia já aberta, antes de soltar. */
  retencao?: number;
  suavizacao?: number;
  veu?: number;
  className?: string;
};

const limitar = (v: number, a: number, b: number) => (v < a ? a : v > b ? b : v);

const degrau = (inicio: number, fim: number, x: number) => {
  const t = limitar((x - inicio) / (fim - inicio || 1e-6), 0, 1);
  return t * t * (3 - 2 * t);
};

export function ExpansaoNaRolagem({
  midia,
  titulo,
  children,
  larguraInicial = 42,
  alturaInicial = 58,
  larguraInicialNoCelular = 84,
  alturaInicialNoCelular = 52,
  raioInicial = 28,
  raioFinal = 0,
  zoom = 1.25,
  distancia = 0.8,
  retencao = 0.15,
  suavizacao = 0.1,
  veu = 1,
  className = '',
}: Props) {
  const raiz = useRef<HTMLDivElement>(null);
  const trilho = useRef<HTMLDivElement>(null);
  const palco = useRef<HTMLDivElement>(null);
  const moldura = useRef<HTMLDivElement>(null);
  const midiaRef = useRef<HTMLDivElement>(null);
  const tituloRef = useRef<HTMLDivElement>(null);
  const conteudo = useRef<HTMLDivElement>(null);
  const veuRef = useRef<HTMLDivElement>(null);

  const config = useRef({ larguraInicial, alturaInicial, larguraInicialNoCelular, alturaInicialNoCelular, raioInicial, raioFinal, zoom, distancia, retencao, suavizacao, veu });
  config.current = { larguraInicial, alturaInicial, larguraInicialNoCelular, alturaInicialNoCelular, raioInicial, raioFinal, zoom, distancia, retencao, suavizacao, veu };

  useEffect(() => {
    const elRaiz = raiz.current;
    const elTrilho = trilho.current;
    const elPalco = palco.current;
    if (!elRaiz || !elTrilho || !elPalco) return;
    // Movimento reduzido: fica o estado final, sem prender a tela.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const toque = window.matchMedia('(pointer: coarse)').matches;
    let quadro = 0;
    let atual = 0;
    let alvo = 0;
    let alturaDoPalco = 0;
    let larguraMedida = 0;
    let rodando = false;

    const aplicar = (p: number) => {
      const c = config.current;
      const estreito = larguraMedida < 640;
      const l0 = estreito ? Math.max(c.larguraInicial, c.larguraInicialNoCelular) : c.larguraInicial;
      const a0 = estreito ? Math.min(c.alturaInicial, c.alturaInicialNoCelular) : c.alturaInicial;
      const e = degrau(0, 1, p);
      const largura = l0 + (100 - l0) * e;
      const altura = a0 + (100 - a0) * e;
      const ix = Math.max(0, (100 - largura) / 2);
      const iy = Math.max(0, (100 - altura) / 2);
      const raio = c.raioInicial + (c.raioFinal - c.raioInicial) * e;
      if (moldura.current) moldura.current.style.clipPath = `inset(${iy}% ${ix}% ${iy}% ${ix}% round ${raio}px)`;
      if (midiaRef.current) midiaRef.current.style.transform = `scale(${c.zoom + (1 - c.zoom) * e})`;
      if (veuRef.current) veuRef.current.style.opacity = `${c.veu * e}`;
      if (tituloRef.current) {
        const sai = degrau(0.4, 0.88, p);
        tituloRef.current.style.opacity = `${1 - sai}`;
        tituloRef.current.style.transform = `translate3d(0, ${-28 * sai}px, 0) scale(${1 + 0.06 * sai})`;
      }
      if (conteudo.current) {
        const entra = degrau(0.68, 1, p);
        conteudo.current.style.opacity = `${entra}`;
        conteudo.current.style.transform = `translate3d(0, ${18 * (1 - entra)}px, 0)`;
        // Invisível também para o teclado e para leitores de tela.
        conteudo.current.style.visibility = entra > 0.02 ? 'visible' : 'hidden';
      }
    };

    const medir = () => {
      const c = config.current;
      alturaDoPalco = window.innerHeight;
      larguraMedida = elRaiz.clientWidth;
      elPalco.style.height = `${alturaDoPalco}px`;
      elTrilho.style.height = `${alturaDoPalco * (1 + Math.max(0, c.distancia) + Math.max(0, c.retencao))}px`;
    };

    const lerProgresso = () => {
      const vao = alturaDoPalco * Math.max(0.01, config.current.distancia);
      return limitar(-elTrilho.getBoundingClientRect().top / vao, 0, 1);
    };

    const passo = () => {
      const s = config.current.suavizacao;
      const k = s <= 0 ? 1 : 1 - Math.exp(-1 / (60 * s));
      atual += (alvo - atual) * k;
      if (Math.abs(alvo - atual) < 0.0004) {
        atual = alvo;
        rodando = false;
      }
      aplicar(atual);
      quadro = rodando ? requestAnimationFrame(passo) : 0;
    };

    const aoRolar = () => {
      alvo = lerProgresso();
      if (config.current.suavizacao <= 0) {
        atual = alvo;
        aplicar(atual);
        return;
      }
      if (!rodando) {
        rodando = true;
        if (!quadro) quadro = requestAnimationFrame(passo);
      }
    };

    const aoRedimensionar = () => {
      // No celular, a barra do navegador muda a altura a cada rolagem:
      // só remede quando a largura muda, para a moldura não pular.
      if (toque && elRaiz.clientWidth === larguraMedida) return;
      medir();
      alvo = atual = lerProgresso();
      aplicar(atual);
    };

    elRaiz.dataset.pronto = '';
    medir();
    alvo = atual = lerProgresso();
    aplicar(atual);

    // Só escuta a rolagem enquanto a seção está perto da tela.
    let ouvindo = false;
    const observador = new IntersectionObserver(
      ([entrada]) => {
        if (entrada.isIntersecting && !ouvindo) {
          window.addEventListener('scroll', aoRolar, { passive: true });
          ouvindo = true;
          aoRolar();
        } else if (!entrada.isIntersecting && ouvindo) {
          window.removeEventListener('scroll', aoRolar);
          ouvindo = false;
        }
      },
      { rootMargin: '25% 0px' },
    );
    observador.observe(elTrilho);
    window.addEventListener('resize', aoRedimensionar);

    return () => {
      if (quadro) cancelAnimationFrame(quadro);
      observador.disconnect();
      window.removeEventListener('scroll', aoRolar);
      window.removeEventListener('resize', aoRedimensionar);
      delete elRaiz.dataset.pronto;
    };
  }, []);

  return (
    <div ref={raiz} data-efeito="expansao-na-rolagem" className={`${styles.expansao} ${className}`.trim()}>
      <div ref={trilho} className={styles.expansaoTrilho}>
        <div ref={palco} className={styles.expansaoPalco}>
          <div ref={moldura} className={styles.expansaoMoldura}>
            <div ref={midiaRef} className={styles.expansaoMidia}>
              {midia}
            </div>
            <div ref={veuRef} className={styles.expansaoVeu} />
            {children ? (
              <div ref={conteudo} className={styles.expansaoConteudo}>
                {children}
              </div>
            ) : null}
          </div>
          {titulo ? (
            <div ref={tituloRef} className={styles.expansaoTitulo}>
              {titulo}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
