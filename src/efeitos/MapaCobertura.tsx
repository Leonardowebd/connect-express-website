'use client';

// Mapa interativo de cobertura, dentro do painel da seção. Dois modos, que o
// visitante alterna: "globo" (globo fixo sobre o Brasil, visto em ângulo) e
// "plano" (Brasil em bloco inclinado).
// O canvas é decorativo para leitores de tela: a lista de botões dos estados
// e o cartão dão o mesmo conteúdo em texto, com teclado e com toque.
// Os contornos só são baixados quando o mapa chega perto da tela.

import { useEffect, useRef, useState } from 'react';
import { NOMES_UF, basesDoMapa, pontosDosEstados, rotasDoMapa } from '@/data/mapa';
import {
  criarCaminhoes,
  desenharBase,
  desenharVivo,
  estadoNoPonto,
  montarCena,
  type Anel,
  type Caminhao,
  type Cena,
  type Cores,
  type Modo,
} from './mapa/motor';
import styles from './mapa/mapa.module.css';

type Props = {
  modoInicial?: Modo;
  estados: { uf: string; nome: string }[];
  total: number;
  className?: string;
};

type Dados = { ufs: Record<string, Anel[]>; terra: Anel[] };

const TOKENS: Record<keyof Cores, string> = {
  fundo: '--mapa-fundo',
  oceano: '--mapa-oceano',
  oceanoLuz: '--mapa-oceano-luz',
  terra: '--mapa-terra',
  terraLado: '--mapa-terra-lado',
  uf: '--mapa-uf',
  atendido: '--mapa-atendido',
  atendidoLado: '--mapa-atendido-lado',
  ativo: '--mapa-ativo',
  realce: '--mapa-realce',
  linha: '--mapa-linha',
};

const MODOS: { modo: Modo; rotulo: string }[] = [
  { modo: 'globo', rotulo: 'Globo' },
  { modo: 'plano', rotulo: 'Mapa' },
];

export function MapaCobertura({ modoInicial = 'globo', estados, total, className = '' }: Props) {
  const [modo, setModo] = useState<Modo>(modoInicial);
  const raiz = useRef<HTMLDivElement>(null);
  const tela = useRef<HTMLCanvasElement>(null);
  const [apontado, setApontado] = useState<string | null>(null);
  const [fixado, setFixado] = useState<string | null>(null);
  const ativo = apontado ?? fixado;
  const ativoRef = useRef<string | null>(null);
  const redesenhar = useRef<() => void>(() => {});
  const atendidos = useRef(new Set(estados.map((e) => e.uf)));

  useEffect(() => {
    ativoRef.current = ativo;
    redesenhar.current();
  }, [ativo]);

  useEffect(() => {
    const elRaiz = raiz.current;
    const canvas = tela.current;
    if (!elRaiz || !canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const semMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const estilo = getComputedStyle(elRaiz);
    const cores = Object.fromEntries(
      Object.entries(TOKENS).map(([chave, token]) => [chave, estilo.getPropertyValue(token).trim()]),
    ) as Cores;
    const fonte = estilo.fontFamily;
    const base = document.createElement('canvas');
    const ctxBase = base.getContext('2d');

    let dados: Dados | null = null;
    let cena: Cena | null = null;
    let caminhoes: Caminhao[] = [];
    let quadro = 0;
    let anterior = 0;
    let tempo = 0;
    let naTela = false;
    let cancelado = false;
    let densidade = 1;

    const pintarBase = () => {
      if (!cena || !ctxBase) return;
      ctxBase.setTransform(densidade, 0, 0, densidade, 0, 0);
      desenharBase(ctxBase, cena, cores, atendidos.current, ativoRef.current, fonte);
    };

    const pintar = (dt: number) => {
      if (!cena) return;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(base, 0, 0);
      ctx.setTransform(densidade, 0, 0, densidade, 0, 0);
      desenharVivo(ctx, cena, cores, caminhoes, tempo, dt);
    };

    const medir = () => {
      if (!dados) return;
      const largura = canvas.clientWidth;
      const altura = canvas.clientHeight;
      if (!largura || !altura) return;
      densidade = Math.min(window.devicePixelRatio || 1, 2);
      for (const c of [canvas, base]) {
        c.width = Math.round(largura * densidade);
        c.height = Math.round(altura * densidade);
      }
      cena = montarCena({
        modo,
        largura,
        altura,
        ufs: dados.ufs,
        terra: dados.terra,
        pontos: pontosDosEstados,
        bases: basesDoMapa,
        rotas: rotasDoMapa,
      });
      caminhoes = criarCaminhoes(cena);
      pintarBase();
      pintar(0);
    };

    redesenhar.current = () => {
      pintarBase();
      if (!quadro) pintar(0);
    };

    const passo = (agora: number) => {
      if (!naTela || document.hidden) {
        quadro = 0;
        return;
      }
      const dt = Math.min(0.05, (agora - (anterior || agora)) / 1000);
      anterior = agora;
      tempo += dt;
      pintar(dt);
      quadro = requestAnimationFrame(passo);
    };

    const ligar = () => {
      if (semMovimento || quadro || !naTela || document.hidden || !cena) return;
      anterior = 0;
      quadro = requestAnimationFrame(passo);
    };

    async function carregar() {
      if (dados) return;
      try {
        const [ufs, terra] = await Promise.all([
          fetch('/dados/brasil-ufs.json').then((r) => r.json() as Promise<Dados['ufs']>),
          modo === 'globo' ? fetch('/dados/terra.json').then((r) => r.json() as Promise<Anel[]>) : Promise.resolve([]),
        ]);
        if (cancelado) return;
        dados = { ufs, terra };
        elRaiz!.dataset.pronto = '';
        medir();
        ligar();
      } catch {
        // Sem os contornos, ficam a lista de estados e o cartão, que já dizem tudo.
        elRaiz!.dataset.falhou = '';
      }
    }

    const perto = new IntersectionObserver(([e]) => e.isIntersecting && carregar(), { rootMargin: '400px 0px' });
    const visivel = new IntersectionObserver(([e]) => {
      naTela = e.isIntersecting;
      ligar();
    });
    perto.observe(elRaiz);
    visivel.observe(canvas);

    let larguraAnterior = 0;
    const tamanho = new ResizeObserver(() => {
      // No celular a altura oscila com a barra do navegador: só remede se a largura mudar.
      if (canvas.clientWidth === larguraAnterior && cena) return;
      larguraAnterior = canvas.clientWidth;
      medir();
    });
    tamanho.observe(canvas);
    document.addEventListener('visibilitychange', ligar);

    const estadoEm = (evento: PointerEvent) => {
      if (!cena) return null;
      const r = canvas.getBoundingClientRect();
      return estadoNoPonto(cena, evento.clientX - r.left, evento.clientY - r.top);
    };
    let esperando = false;
    const aoMover = (evento: PointerEvent) => {
      if (evento.pointerType !== 'mouse' || esperando) return;
      esperando = true;
      requestAnimationFrame(() => {
        esperando = false;
        const uf = estadoEm(evento);
        canvas.style.cursor = uf ? 'pointer' : '';
        setApontado(uf);
      });
    };
    const aoSair = () => setApontado(null);
    const aoTocar = (evento: PointerEvent) => {
      const uf = estadoEm(evento);
      setFixado((atual) => (uf === atual ? null : uf));
    };
    canvas.addEventListener('pointermove', aoMover);
    canvas.addEventListener('pointerleave', aoSair);
    canvas.addEventListener('pointerup', aoTocar);

    return () => {
      cancelado = true;
      if (quadro) cancelAnimationFrame(quadro);
      perto.disconnect();
      visivel.disconnect();
      tamanho.disconnect();
      document.removeEventListener('visibilitychange', ligar);
      canvas.removeEventListener('pointermove', aoMover);
      canvas.removeEventListener('pointerleave', aoSair);
      canvas.removeEventListener('pointerup', aoTocar);
      redesenhar.current = () => {};
    };
  }, [modo]);

  const base = ativo ? basesDoMapa.find((b) => b.uf === ativo) : undefined;
  const ehAtendido = ativo ? atendidos.current.has(ativo) : false;
  const descricao = `Mapa do Brasil com os estados atendidos pela Connect Express Log em destaque: ${estados
    .map((e) => e.nome)
    .join(', ')}. Rotas ilustrativas ligam as bases aos estados.`;

  return (
    <div ref={raiz} data-efeito={`mapa-${modo}`} className={`${styles.mapa} ${className}`.trim()}>
      <canvas ref={tela} className={styles.tela} role="img" aria-label={descricao} />

      <div className={styles.painel}>
        <div className={styles.modos} role="group" aria-label="Forma de ver a cobertura">
          {MODOS.map((m) => (
            <button key={m.modo} type="button" aria-pressed={modo === m.modo} onClick={() => setModo(m.modo)}>
              {m.rotulo}
            </button>
          ))}
        </div>

        <div className={styles.cartao} aria-live="polite">
          {ativo ? (
            <>
              <p className={styles.cartaoRotulo}>{ehAtendido ? 'Estado atendido' : 'Fora da cobertura atual'}</p>
              <p className={styles.cartaoNome}>{NOMES_UF[ativo] ?? ativo}</p>
              {base ? (
                <p className={styles.cartaoTexto}>
                  {base.tipo} em {base.cidade}
                </p>
              ) : null}
              {!ehAtendido ? <p className={styles.cartaoTexto}>Fale com o comercial sobre esta região.</p> : null}
            </>
          ) : (
            <>
              <p className={styles.cartaoRotulo}>Cobertura</p>
              <p className={styles.cartaoNumero}>{total}</p>
              <p className={styles.cartaoTexto}>estados atendidos</p>
              <p className={styles.cartaoDica}>Passe o mouse ou toque em um estado.</p>
            </>
          )}
        </div>

        <ul className={styles.estados} data-estados="" aria-label="Estados atendidos">
          {estados.map((e) => (
            <li key={e.uf}>
              <button
                type="button"
                aria-pressed={fixado === e.uf}
                data-ativo={ativo === e.uf || undefined}
                onClick={() => setFixado((atual) => (atual === e.uf ? null : e.uf))}
                onPointerEnter={(evento) => evento.pointerType === 'mouse' && setApontado(e.uf)}
                onPointerLeave={() => setApontado(null)}
                onFocus={() => setApontado(e.uf)}
                onBlur={() => setApontado(null)}
              >
                <abbr title={e.nome}>{e.uf}</abbr>
                <span className="so-leitor"> {e.nome}</span>
              </button>
            </li>
          ))}
        </ul>

        <ul className={styles.legenda} aria-hidden="true">
          <li>
            <i className={styles.marcaMatriz} />
            Matriz
          </li>
          <li>
            <i className={styles.marcaBase} />
            Filial e centros
          </li>
          <li>
            <i className={styles.marcaRota} />
            Rotas ilustrativas
          </li>
        </ul>
      </div>
    </div>
  );
}
