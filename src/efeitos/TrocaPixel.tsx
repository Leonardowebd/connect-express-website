'use client';

// Troca entre dois conteúdos com uma transição em mosaico de pixels.
// Adaptado de PixelSwap, do React Bits (reactbits.dev).
// Mudanças: tipos, teto de pixels menor (e menor ainda em telas de toque,
// porque cada pixel carrega uma cópia do conteúdo), estado anunciado a
// leitores de tela e nome acessível para o botão.

import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import styles from './efeitos.module.css';

type Padrao =
  | 'aleatorio'
  | 'centro'
  | 'bordas'
  | 'esquerda-direita'
  | 'direita-esquerda'
  | 'cima-baixo'
  | 'baixo-cima'
  | 'diagonal'
  | 'espiral';

type Props = {
  primeiro: ReactNode;
  segundo: ReactNode;
  /** Nome do botão para leitores de tela. */
  rotulo: string;
  tamanhoDoPixel?: number;
  intervalo?: number;
  raioDoPixel?: number;
  giro?: number;
  escalaInicial?: number;
  esmaecer?: boolean;
  duracao?: number;
  duracaoDoPixel?: number;
  padrao?: Padrao;
  aleatoriedade?: number;
  curva?: string;
  gatilho?: 'hover' | 'clique';
  proporcao?: string;
  className?: string;
  style?: CSSProperties;
};

type Pixel = { id: number; left: number; top: number; atraso: number };
type Grade = { pixels: Pixel[]; lado: number; intervalo: number; largura: number; altura: number };

const MAXIMO_DE_PIXELS = 96;
const MAXIMO_DE_PIXELS_NO_TOQUE = 40;
const PASSOS = 14;

const PADROES: Record<Padrao, (x: number, y: number) => number | null> = {
  aleatorio: () => null,
  centro: (x, y) => Math.hypot(x - 0.5, y - 0.5) / Math.SQRT1_2,
  bordas: (x, y) => Math.min(x, 1 - x, y, 1 - y) * 2,
  'esquerda-direita': (x) => x,
  'direita-esquerda': (x) => 1 - x,
  'cima-baixo': (_x, y) => y,
  'baixo-cima': (_x, y) => 1 - y,
  diagonal: (x, y) => (x + y) / 2,
  espiral: (x, y) => {
    const angulo = (Math.atan2(y - 0.5, x - 0.5) + Math.PI) / (Math.PI * 2);
    const raio = Math.hypot(x - 0.5, y - 0.5) / Math.SQRT1_2;
    return (angulo + raio) % 1;
  },
};

const CURVAS: Record<string, number[]> = {
  linear: [0, 0, 1, 1],
  ease: [0.25, 0.1, 0.25, 1],
  'ease-in': [0.42, 0, 1, 1],
  'ease-out': [0, 0, 0.58, 1],
  'ease-in-out': [0.42, 0, 0.58, 1],
};

const limitar = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);

const ruido = (semente: number) => {
  const v = Math.sin(semente * 127.1 + 311.7) * 43758.5453;
  return v - Math.floor(v);
};

function criarCurva(valor: string): (p: number) => number {
  const achado = /cubic-bezier\(([^)]+)\)/.exec(valor);
  const pontos = achado ? achado[1].split(',').map(Number) : CURVAS[valor];
  if (!pontos || pontos.length !== 4 || pontos.some(Number.isNaN)) return criarCurva('ease');

  const [x1, y1, x2, y2] = pontos;
  if (x1 === y1 && x2 === y2) return (p) => p;

  const cx = 3 * x1;
  const bx = 3 * (x2 - x1) - cx;
  const ax = 1 - cx - bx;
  const cy = 3 * y1;
  const by = 3 * (y2 - y1) - cy;
  const ay = 1 - cy - by;

  return (progresso) => {
    let t = progresso;
    for (let i = 0; i < 5; i += 1) {
      const inclinacao = (3 * ax * t + 2 * bx) * t + cx;
      if (!inclinacao) break;
      t -= (((ax * t + bx) * t + cx) * t - progresso) / inclinacao;
    }
    t = limitar(t, 0, 1);
    return ((ay * t + by) * t + cy) * t;
  };
}

// Cada pixel cresce um pouco além da própria caixa, para fechar intervalos
// e cantos arredondados no fim. A sobra não aparece: todos mostram o mesmo conteúdo.
const escalaDeCobertura = (lado: number, intervalo: number, raio: number) => {
  const p = limitar(raio, 0, 50) / 100;
  const canto = Math.SQRT1_2 / (Math.SQRT2 * (0.5 - p) + p);
  return ((lado + intervalo) / lado) * Math.max(1, canto);
};

function montarGrade(e: {
  largura: number;
  altura: number;
  tamanho: number;
  intervalo: number;
  padrao: Padrao;
  aleatoriedade: number;
  maximo: number;
}): Grade {
  let lado = e.tamanho;
  let colunas = Math.max(1, Math.ceil((e.largura + e.intervalo) / (lado + e.intervalo)));
  let linhas = Math.max(1, Math.ceil((e.altura + e.intervalo) / (lado + e.intervalo)));

  if (colunas * linhas > e.maximo) {
    lado = Math.ceil(lado * Math.sqrt((colunas * linhas) / e.maximo));
    colunas = Math.max(1, Math.ceil((e.largura + e.intervalo) / (lado + e.intervalo)));
    linhas = Math.max(1, Math.ceil((e.altura + e.intervalo) / (lado + e.intervalo)));
  }

  const passo = lado + e.intervalo;
  const origemX = (e.largura - (colunas * passo - e.intervalo)) / 2;
  const origemY = (e.altura - (linhas * passo - e.intervalo)) / 2;
  const ordem = PADROES[e.padrao] ?? PADROES.aleatorio;
  const mistura = limitar(e.aleatoriedade, 0, 1);
  const pixels: Pixel[] = [];

  for (let linha = 0; linha < linhas; linha += 1) {
    for (let coluna = 0; coluna < colunas; coluna += 1) {
      const indice = linha * colunas + coluna;
      const x = colunas <= 1 ? 0.5 : coluna / (colunas - 1);
      const y = linhas <= 1 ? 0.5 : linha / (linhas - 1);
      const base = ordem(x, y);
      const sorte = ruido(indice + 1);
      pixels.push({
        id: indice,
        left: origemX + coluna * passo,
        top: origemY + linha * passo,
        atraso: base === null ? sorte : base * (1 - mistura) + sorte * mistura,
      });
    }
  }

  return { pixels, lado, intervalo: e.intervalo, largura: e.largura, altura: e.altura };
}

// Um par de listas de quadros para a grade inteira: a transformação da janela
// e o inverso exato, para o conteúdo revelado nunca escorregar nem mudar de tamanho.
function montarQuadros(e: { curva: (p: number) => number; inicio: number; fim: number; giro: number; esmaecer: boolean }) {
  const janela: Keyframe[] = [];
  const conteudo: Keyframe[] = [];
  for (let passo = 0; passo <= PASSOS; passo += 1) {
    const progresso = passo / PASSOS;
    const suave = e.curva(progresso);
    const escala = e.inicio + (e.fim - e.inicio) * suave;
    const angulo = e.giro * (1 - suave);
    janela.push({
      offset: progresso,
      opacity: e.esmaecer ? Math.min(1, suave * 1.6) : 1,
      transform: `rotate(${angulo}deg) scale(${escala})`,
    });
    conteudo.push({ offset: progresso, transform: `scale(${1 / escala}) rotate(${-angulo}deg)` });
  }
  return { janela, conteudo };
}

export function TrocaPixel({
  primeiro,
  segundo,
  rotulo,
  tamanhoDoPixel = 56,
  intervalo = 0,
  raioDoPixel = 0,
  giro = 0,
  escalaInicial = 0.35,
  esmaecer = true,
  duracao = 1000,
  duracaoDoPixel = 380,
  padrao = 'aleatorio',
  aleatoriedade = 0,
  curva = 'cubic-bezier(0.22, 1, 0.36, 1)',
  gatilho = 'clique',
  proporcao = '16 / 10',
  className = '',
  style,
}: Props) {
  const [pedido, setPedido] = useState(false);
  const [mostrado, setMostrado] = useState(false);
  const [transicao, setTransicao] = useState<{ para: boolean; grade: Grade } | null>(null);
  const [caixa, setCaixa] = useState({ largura: 0, altura: 0 });
  const [maximo, setMaximo] = useState(MAXIMO_DE_PIXELS);

  const recipiente = useRef<HTMLDivElement>(null);
  const camadas = useRef<(HTMLDivElement | null)[]>([]);
  const pixelsRef = useRef<(HTMLDivElement | null)[]>([]);
  const animacoes = useRef<Animation[]>([]);
  const temporizador = useRef(0);

  const indiceQueEntra = transicao?.para ? 1 : 0;

  const grade = useMemo(
    () =>
      montarGrade({
        largura: caixa.largura,
        altura: caixa.altura,
        tamanho: Math.max(8, Math.round(tamanhoDoPixel)),
        intervalo: Math.max(0, Math.round(intervalo)),
        padrao,
        aleatoriedade,
        maximo,
      }),
    [caixa.largura, caixa.altura, tamanhoDoPixel, intervalo, padrao, aleatoriedade, maximo],
  );

  // Fotografa as entradas da animação, para uma transição em andamento
  // nunca ser refeita pela metade.
  const ajustes = { duracao, duracaoDoPixel, giro, escalaInicial, raioDoPixel, esmaecer, curva };
  const ajustesRef = useRef(ajustes);
  const gradeRef = useRef(grade);
  ajustesRef.current = ajustes;
  gradeRef.current = grade;

  useEffect(() => {
    const el = recipiente.current;
    if (!el) return;
    if (window.matchMedia('(pointer: coarse)').matches) setMaximo(MAXIMO_DE_PIXELS_NO_TOQUE);

    const medir = () => {
      const largura = el.clientWidth;
      const altura = el.clientHeight;
      if (!largura || !altura) return;
      setCaixa((atual) => (atual.largura === largura && atual.altura === altura ? atual : { largura, altura }));
    };
    medir();
    const observador = new ResizeObserver(medir);
    observador.observe(el);
    return () => observador.disconnect();
  }, []);

  const pararAnimacoes = useCallback(() => {
    animacoes.current.forEach((a) => a.cancel());
    animacoes.current = [];
    pixelsRef.current.forEach((p) => p?.replaceChildren());
    if (temporizador.current) window.clearTimeout(temporizador.current);
    temporizador.current = 0;
  }, []);

  useEffect(() => pararAnimacoes, [pararAnimacoes]);

  useEffect(() => {
    if (transicao || pedido === mostrado) return;
    setTransicao({ para: pedido, grade: gradeRef.current });
  }, [pedido, mostrado, transicao]);

  useEffect(() => {
    if (!transicao) return;
    const a = ajustesRef.current;
    const { grade: gradeFixa, para } = transicao;

    const concluir = () => {
      pararAnimacoes();
      setMostrado(para);
      setTransicao(null);
    };

    const origem = camadas.current[para ? 1 : 0];
    if (!origem || !gradeFixa.pixels.length || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      concluir();
      return;
    }

    const total = Math.max(200, a.duracao);
    const tempoDoPixel = limitar(a.duracaoDoPixel, 60, total);
    const espalhamento = Math.max(0, total - tempoDoPixel);
    const fim = escalaDeCobertura(gradeFixa.lado, gradeFixa.intervalo, a.raioDoPixel);
    const quadros = montarQuadros({
      curva: criarCurva(a.curva),
      inicio: limitar(a.escalaInicial, 0.05, 1) * fim,
      fim,
      giro: a.giro,
      esmaecer: a.esmaecer,
    });

    gradeFixa.pixels.forEach((pixel, indice) => {
      const elPixel = pixelsRef.current[indice];
      if (!elPixel) return;

      // Clona a camada já renderizada em vez de renderizar o conteúdo pelo
      // React uma vez por pixel: mesmo resultado, uma fração do custo.
      const conteudo = document.createElement('div');
      conteudo.className = styles.trocaConteudoDoPixel;
      conteudo.style.left = `${-pixel.left}px`;
      conteudo.style.top = `${-pixel.top}px`;
      conteudo.style.width = `${gradeFixa.largura}px`;
      conteudo.style.height = `${gradeFixa.altura}px`;
      conteudo.style.transformOrigin = `${pixel.left + gradeFixa.lado / 2}px ${pixel.top + gradeFixa.lado / 2}px`;

      const copia = origem.cloneNode(true) as HTMLElement;
      copia.dataset.visivel = 'true';
      copia.removeAttribute('aria-hidden');
      conteudo.appendChild(copia);
      elPixel.replaceChildren(conteudo);

      const tempo: KeyframeAnimationOptions = {
        duration: tempoDoPixel,
        delay: pixel.atraso * espalhamento,
        easing: 'linear',
        fill: 'both',
      };
      animacoes.current.push(elPixel.animate(quadros.janela, tempo), conteudo.animate(quadros.conteudo, tempo));
    });

    temporizador.current = window.setTimeout(concluir, total);
    return pararAnimacoes;
  }, [pararAnimacoes, transicao]);

  const interacao =
    gatilho === 'hover'
      ? {
          onMouseEnter: () => setPedido(true),
          onMouseLeave: () => setPedido(false),
          onFocus: () => setPedido(true),
          onBlur: () => setPedido(false),
        }
      : { onClick: () => setPedido((p) => !p) };

  const camada = (conteudo: ReactNode, indice: number) => {
    const ativa = indice === (mostrado ? 1 : 0);
    return (
      <div
        key={indice}
        ref={(el) => {
          camadas.current[indice] = el;
        }}
        className={styles.trocaCamada}
        data-visivel={ativa && !(transicao && indice === indiceQueEntra)}
        style={{ zIndex: ativa ? 2 : 1 }}
        aria-hidden={!ativa}
      >
        {conteudo}
      </div>
    );
  };

  return (
    <button
      type="button"
      data-efeito="troca-pixel"
      aria-label={rotulo}
      aria-pressed={pedido}
      className={`${styles.troca} ${className}`.trim()}
      style={{ aspectRatio: proporcao, ...style }}
      {...interacao}
    >
      <div ref={recipiente} className={styles.trocaPalco}>
        {camada(primeiro, 0)}
        {camada(segundo, 1)}

        {transicao && (
          <div className={styles.trocaGrade} aria-hidden="true">
            {transicao.grade.pixels.map((pixel, indice) => (
              <div
                key={pixel.id}
                ref={(el) => {
                  pixelsRef.current[indice] = el;
                }}
                className={styles.trocaPixel}
                style={{
                  left: pixel.left,
                  top: pixel.top,
                  width: transicao.grade.lado,
                  height: transicao.grade.lado,
                  borderRadius: `${limitar(raioDoPixel, 0, 50)}%`,
                }}
              />
            ))}
          </div>
        )}
      </div>
    </button>
  );
}
