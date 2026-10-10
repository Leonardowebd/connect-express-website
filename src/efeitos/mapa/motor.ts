// Motor de desenho dos mapas de cobertura, em canvas 2D.
// Dois modos com os mesmos dados: "plano" (Brasil em bloco inclinado) e
// "globo" (projeção ortográfica fixa sobre o Brasil).
// Sem dependências. Regras de uso: .claude/skills/connect-smart-effects.

export type Ponto = [number, number];
export type Anel = Ponto[];
export type Modo = 'plano' | 'globo';

export type Cores = {
  fundo: string;
  oceano: string;
  oceanoLuz: string;
  terra: string;
  terraLado: string;
  uf: string;
  atendido: string;
  atendidoLado: string;
  ativo: string;
  realce: string;
  linha: string;
};

export type Entrada = {
  modo: Modo;
  largura: number;
  altura: number;
  ufs: Record<string, Anel[]>;
  terra: Anel[];
  pontos: Record<string, Ponto>;
  bases: { uf: string; ll: Ponto; principal?: boolean }[];
  rotas: [string, string, number][];
};

type Rota = { pts: Ponto[]; acumulado: number[]; comprimento: number };

export type Cena = {
  modo: Modo;
  largura: number;
  altura: number;
  ufs: Record<string, Anel[]>;
  terra: Anel[];
  reticula: Ponto[][];
  rotas: Rota[];
  chegadas: Ponto[];
  bases: { ponto: Ponto; principal: boolean }[];
  centros: Record<string, Ponto>;
  profundidade: number;
  centro: Ponto;
  raio: number;
  escala: number;
};

export type Caminhao = { rota: number; s: number; sentido: 1 | -1; ritmo: number };

const RAD = Math.PI / 180;
const GIRO = -12 * RAD;
const INCLINACAO = 0.72;
// O globo é visto em ângulo: o olhar parte do sul, com uma leve rotação,
// de modo que o Brasil aparece em perspectiva e o horizonte curva no alto.
const CENTRO_DO_GLOBO: Ponto = [-51, -31];
const ROLO = -9 * RAD;

const mercator = ([lon, lat]: Ponto): Ponto => [lon * RAD, -Math.log(Math.tan(Math.PI / 4 + (lat * RAD) / 2))];

function inclinar([x, y]: Ponto): Ponto {
  return [x * Math.cos(GIRO) - y * Math.sin(GIRO), (x * Math.sin(GIRO) + y * Math.cos(GIRO)) * INCLINACAO];
}

/** Projeção ortográfica. Pontos atrás do globo são levados para a borda. */
function ortografica([lon, lat]: Ponto): [number, number, boolean] {
  const l = (lon - CENTRO_DO_GLOBO[0]) * RAD;
  const f = lat * RAD;
  const f0 = CENTRO_DO_GLOBO[1] * RAD;
  let x = Math.cos(f) * Math.sin(l);
  let y = Math.cos(f0) * Math.sin(f) - Math.sin(f0) * Math.cos(f) * Math.cos(l);
  const z = Math.sin(f0) * Math.sin(f) + Math.cos(f0) * Math.cos(f) * Math.cos(l);
  if (z < 0) {
    const n = Math.hypot(x, y) || 1;
    x /= n;
    y /= n;
  }
  const sy = -y;
  return [x * Math.cos(ROLO) - sy * Math.sin(ROLO), x * Math.sin(ROLO) + sy * Math.cos(ROLO), z >= 0];
}

function centroide(anel: Anel): Ponto {
  let a = 0;
  let x = 0;
  let y = 0;
  for (let i = 0; i < anel.length; i += 1) {
    const p = anel[i];
    const q = anel[(i + 1) % anel.length];
    const f = p[0] * q[1] - q[0] * p[1];
    a += f;
    x += (p[0] + q[0]) * f;
    y += (p[1] + q[1]) * f;
  }
  return a ? [x / (3 * a), y / (3 * a)] : anel[0];
}

export function montarCena(e: Entrada): Cena {
  const { modo, largura, altura } = e;
  let projetar: (p: Ponto) => Ponto;
  let visivel: (p: Ponto) => boolean = () => true;
  let profundidade = 0;
  let centro: Ponto = [largura / 2, altura / 2];
  let raio = 0;
  let escala = 1;

  if (modo === 'plano') {
    const brutos = Object.values(e.ufs).flat(2).map((p) => inclinar(mercator(p)));
    const xs = brutos.map((p) => p[0]);
    const ys = brutos.map((p) => p[1]);
    const [x0, x1, y0, y1] = [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)];
    profundidade = Math.max(8, Math.min(largura, altura) * 0.035);
    const margem = Math.max(14, Math.min(largura, altura) * 0.05);
    escala = Math.min((largura - 2 * margem) / (x1 - x0), (altura - 2 * margem - profundidade * 1.6) / (y1 - y0));
    const dx = (largura - (x1 - x0) * escala) / 2 - x0 * escala;
    const dy = (altura - profundidade * 1.6 - (y1 - y0) * escala) / 2 - y0 * escala;
    projetar = (p) => {
      const [x, y] = inclinar(mercator(p));
      return [x * escala + dx, y * escala + dy];
    };
  } else {
    // Encaixe: o Brasil ocupa a parte de baixo do painel e sobra espaço no
    // alto para o horizonte do globo aparecer.
    const unidade = Object.values(e.ufs).flat(2).map((p) => ortografica(p));
    const xs = unidade.map((p) => p[0]);
    const ys = unidade.map((p) => p[1]);
    const [x0, x1, y0, y1] = [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)];
    raio = Math.min((altura * 0.66) / (y1 - y0), (largura * 0.9) / (x1 - x0));
    centro = [largura / 2 - ((x0 + x1) / 2) * raio, altura * 0.95 - y1 * raio];
    escala = raio;
    projetar = (p) => {
      const [x, y] = ortografica(p);
      return [centro[0] + x * raio, centro[1] + y * raio];
    };
    visivel = (p) => ortografica(p)[2];
  }

  const aneis = (lista: Anel[]) => lista.filter((a) => a.some(visivel)).map((a) => a.map(projetar));
  const ufs: Record<string, Anel[]> = {};
  const centros: Record<string, Ponto> = {};
  for (const [uf, lista] of Object.entries(e.ufs)) {
    ufs[uf] = aneis(lista);
    if (ufs[uf][0]) centros[uf] = centroide(ufs[uf][0]);
  }

  const nos: Record<string, Ponto> = { ...e.pontos };
  for (const b of e.bases) nos[b.uf] = b.ll;

  const rotas: Rota[] = e.rotas.map(([de, para, curva]) => {
    const a = nos[de];
    const b = nos[para];
    const controle: Ponto = [(a[0] + b[0]) / 2 - (b[1] - a[1]) * curva, (a[1] + b[1]) / 2 + (b[0] - a[0]) * curva];
    const pts: Ponto[] = [];
    for (let i = 0; i <= 40; i += 1) {
      const t = i / 40;
      const u = 1 - t;
      pts.push(projetar([u * u * a[0] + 2 * u * t * controle[0] + t * t * b[0], u * u * a[1] + 2 * u * t * controle[1] + t * t * b[1]]));
    }
    const acumulado = [0];
    for (let i = 1; i < pts.length; i += 1) {
      acumulado.push(acumulado[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
    }
    return { pts, acumulado, comprimento: acumulado[acumulado.length - 1] };
  });

  const reticula: Ponto[][] = [];
  if (modo === 'globo') {
    for (let lon = -180; lon < 180; lon += 15) {
      const linha: Ponto[] = [];
      for (let lat = -80; lat <= 80; lat += 5) if (visivel([lon, lat])) linha.push(projetar([lon, lat]));
      if (linha.length > 1) reticula.push(linha);
    }
    for (let lat = -75; lat <= 75; lat += 15) {
      const linha: Ponto[] = [];
      for (let lon = -180; lon <= 180; lon += 5) if (visivel([lon, lat])) linha.push(projetar([lon, lat]));
      if (linha.length > 1) reticula.push(linha);
    }
  }

  const comBase = new Set(e.bases.map((b) => b.uf));
  return {
    modo,
    largura,
    altura,
    ufs,
    terra: modo === 'globo' ? aneis(e.terra) : [],
    reticula,
    rotas,
    chegadas: Object.entries(e.pontos).filter(([uf]) => !comBase.has(uf)).map(([, p]) => projetar(p)),
    bases: e.bases.map((b) => ({ ponto: projetar(b.ll), principal: Boolean(b.principal) })),
    centros,
    profundidade,
    centro,
    raio,
    escala,
  };
}

function tracar(ctx: CanvasRenderingContext2D, aneis: Anel[]) {
  for (const anel of aneis) {
    ctx.moveTo(anel[0][0], anel[0][1]);
    for (let i = 1; i < anel.length; i += 1) ctx.lineTo(anel[i][0], anel[i][1]);
    ctx.closePath();
  }
}

function preencher(ctx: CanvasRenderingContext2D, aneis: Anel[], cor: string) {
  ctx.beginPath();
  tracar(ctx, aneis);
  ctx.fillStyle = cor;
  ctx.fill();
}

/** Camada parada: terra, estados e relevo. Redesenhada só ao redimensionar ou trocar o estado em foco. */
export function desenharBase(
  ctx: CanvasRenderingContext2D,
  cena: Cena,
  cores: Cores,
  atendidos: Set<string>,
  ativo: string | null,
  fonte: string,
) {
  const { largura, altura } = cena;
  ctx.clearRect(0, 0, largura, altura);
  const lista = Object.entries(cena.ufs);
  // Só estado atendido ganha o verde vivo; os demais são realçados pelo contorno.
  const corDe = (uf: string) => (atendidos.has(uf) ? (uf === ativo ? cores.ativo : cores.atendido) : cores.uf);

  if (cena.modo === 'plano') {
    const d = cena.profundidade;
    // Sombra do bloco
    ctx.save();
    ctx.shadowColor = cores.terraLado;
    ctx.shadowBlur = d * 1.6;
    ctx.shadowOffsetY = d * 1.5;
    ctx.globalAlpha = 0.9;
    preencher(ctx, lista.flatMap(([, a]) => a), cores.terraLado);
    ctx.restore();
    // Laterais empilhadas
    const passos = Math.max(4, Math.round(d / 2));
    for (let s = passos; s >= 1; s -= 1) {
      ctx.save();
      ctx.translate(0, (d * s) / passos);
      for (const [uf, aneis] of lista) preencher(ctx, aneis, atendidos.has(uf) ? cores.atendidoLado : cores.terraLado);
      ctx.restore();
    }
  } else {
    const [cx, cy] = cena.centro;
    const r = cena.raio;
    // Atmosfera
    const halo = ctx.createRadialGradient(cx, cy, r * 0.96, cx, cy, r * 1.12);
    halo.addColorStop(0, cores.atendido);
    halo.addColorStop(1, 'transparent');
    ctx.save();
    ctx.globalAlpha = 0.22;
    ctx.fillStyle = halo;
    ctx.fillRect(0, 0, largura, altura);
    ctx.restore();
    // Oceano
    const mar = ctx.createRadialGradient(cx - r * 0.35, cy - r * 0.4, r * 0.1, cx, cy, r);
    mar.addColorStop(0, cores.oceanoLuz);
    mar.addColorStop(1, cores.oceano);
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fillStyle = mar;
    ctx.fill();
    ctx.save();
    ctx.clip();
    ctx.strokeStyle = cores.linha;
    ctx.globalAlpha = 0.06;
    ctx.lineWidth = 1;
    for (const linha of cena.reticula) {
      ctx.beginPath();
      linha.forEach((p, i) => (i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])));
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
    preencher(ctx, cena.terra, cores.terra);
  }

  // Topo dos estados
  for (const [uf, aneis] of lista) preencher(ctx, aneis, corDe(uf));
  ctx.lineJoin = 'round';
  ctx.lineWidth = 1;
  ctx.strokeStyle = cores.linha;
  for (const [uf, aneis] of lista) {
    ctx.globalAlpha = uf === ativo ? 0.9 : atendidos.has(uf) ? 0.28 : 0.1;
    ctx.beginPath();
    tracar(ctx, aneis);
    ctx.stroke();
  }
  ctx.globalAlpha = 1;

  if (cena.modo === 'globo') {
    // Sombra na borda do globo, para dar volume
    const [cx, cy] = cena.centro;
    const borda = ctx.createRadialGradient(cx, cy, cena.raio * 0.55, cx, cy, cena.raio);
    borda.addColorStop(0, 'transparent');
    borda.addColorStop(1, cores.fundo);
    ctx.globalAlpha = 0.85;
    ctx.fillStyle = borda;
    ctx.fillRect(0, 0, largura, altura);
    ctx.globalAlpha = 1;
    ctx.restore();
  }

  // Siglas dos estados atendidos, quando há espaço
  if (largura >= 520) {
    ctx.font = `600 ${Math.round(Math.max(11, Math.min(15, largura / 60)))}px ${fonte}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = cores.fundo;
    for (const uf of atendidos) {
      const c = cena.centros[uf];
      if (!c || ['DF', 'RJ', 'ES'].includes(uf)) continue;
      ctx.globalAlpha = 0.72;
      ctx.fillText(uf, c[0], c[1]);
    }
    ctx.globalAlpha = 1;
  }
}

function pontoNaRota(rota: Rota, s: number): { p: Ponto; angulo: number } {
  const c = rota.acumulado;
  let a = 0;
  let b = c.length - 1;
  while (b - a > 1) {
    const m = (a + b) >> 1;
    if (c[m] < s) a = m;
    else b = m;
  }
  const t = (s - c[a]) / (c[b] - c[a] || 1);
  const p0 = rota.pts[a];
  const p1 = rota.pts[b];
  return { p: [p0[0] + (p1[0] - p0[0]) * t, p0[1] + (p1[1] - p0[1]) * t], angulo: Math.atan2(p1[1] - p0[1], p1[0] - p0[0]) };
}

export function criarCaminhoes(cena: Cena): Caminhao[] {
  const lista: Caminhao[] = [];
  cena.rotas.forEach((r, i) => {
    const quantos = cena.modo === 'globo' ? 1 : Math.max(1, Math.min(2, Math.round(r.comprimento / 160)));
    for (let k = 0; k < quantos; k += 1) {
      lista.push({ rota: i, s: (((k / quantos + i * 0.13) % 1) * r.comprimento) || 0, sentido: k % 2 ? -1 : 1, ritmo: 0.85 + ((i + k) % 4) * 0.08 });
    }
  });
  return lista;
}

/** Camada viva: rotas tracejadas, caminhões e marcadores. Desenhada a cada quadro. */
export function desenharVivo(ctx: CanvasRenderingContext2D, cena: Cena, cores: Cores, caminhoes: Caminhao[], tempo: number, dt: number) {
  const globo = cena.modo === 'globo';
  const u = Math.max(0.8, Math.min(1.5, cena.largura / 640));

  // Rotas
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.strokeStyle = cores.linha;
  ctx.lineWidth = 1.6 * u;
  ctx.setLineDash([5 * u, 6 * u]);
  ctx.lineDashOffset = -tempo * 14;
  ctx.globalAlpha = globo ? 0.5 : 0.75;
  for (const r of cena.rotas) {
    ctx.beginPath();
    r.pts.forEach((p, i) => (i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])));
    ctx.stroke();
  }
  ctx.setLineDash([]);
  ctx.globalAlpha = 1;

  // Chegadas
  for (const p of cena.chegadas) {
    ctx.beginPath();
    ctx.arc(p[0], p[1], 3.4 * u, 0, Math.PI * 2);
    ctx.fillStyle = cores.linha;
    ctx.fill();
    ctx.lineWidth = 1.5 * u;
    ctx.strokeStyle = cores.realce;
    ctx.stroke();
  }

  // Caminhões
  const velocidade = (globo ? 26 : 46) * u;
  for (const c of caminhoes) {
    const r = cena.rotas[c.rota];
    if (!r || r.comprimento < 4) continue;
    c.s += dt * velocidade * c.ritmo * c.sentido;
    if (c.s > r.comprimento) c.s -= r.comprimento;
    if (c.s < 0) c.s += r.comprimento;
    const { p, angulo } = pontoNaRota(r, c.s);
    const sumir = Math.min(1, Math.min(c.s, r.comprimento - c.s) / (12 * u));
    if (globo) {
      // Discreto: um ponto de luz com rastro curto
      for (let k = 4; k >= 0; k -= 1) {
        const q = pontoNaRota(r, Math.max(0, Math.min(r.comprimento, c.s - c.sentido * k * 5 * u))).p;
        ctx.globalAlpha = sumir * (k ? 0.14 * (5 - k) : 1);
        ctx.beginPath();
        ctx.arc(q[0], q[1], (k ? 1.6 : 2.6) * u, 0, Math.PI * 2);
        ctx.fillStyle = k ? cores.linha : cores.realce;
        ctx.fill();
      }
    } else {
      ctx.save();
      ctx.globalAlpha = sumir;
      ctx.translate(p[0], p[1]);
      ctx.rotate(c.sentido > 0 ? angulo : angulo + Math.PI);
      ctx.fillStyle = cores.terraLado;
      ctx.globalAlpha = sumir * 0.45;
      ctx.fillRect(-7 * u, -1.6 * u, 14 * u, 5.4 * u);
      ctx.globalAlpha = sumir;
      ctx.fillStyle = cores.linha;
      ctx.fillRect(-7 * u, -2.6 * u, 9.4 * u, 5.2 * u);
      ctx.fillStyle = cores.realce;
      ctx.fillRect(3 * u, -2.4 * u, 4 * u, 4.8 * u);
      ctx.restore();
    }
  }
  ctx.globalAlpha = 1;

  // Bases, com pulso
  cena.bases.forEach((b, i) => {
    const [x, y] = b.ponto;
    const fase = (tempo * 0.4 + i * 0.33) % 1;
    ctx.beginPath();
    ctx.arc(x, y, (5 + fase * 16) * u, 0, Math.PI * 2);
    ctx.strokeStyle = cores.realce;
    ctx.lineWidth = 1.5 * u;
    ctx.globalAlpha = 0.8 * (1 - fase);
    ctx.stroke();
    ctx.globalAlpha = 1;
    ctx.beginPath();
    ctx.arc(x, y, (b.principal ? 6.5 : 5.5) * u, 0, Math.PI * 2);
    ctx.fillStyle = b.principal ? cores.realce : cores.linha;
    ctx.fill();
    ctx.lineWidth = 2.2 * u;
    ctx.strokeStyle = b.principal ? cores.linha : cores.atendidoLado;
    ctx.stroke();
  });
}

function dentro(anel: Anel, x: number, y: number) {
  let sim = false;
  for (let i = 0, j = anel.length - 1; i < anel.length; j = i, i += 1) {
    const [xi, yi] = anel[i];
    const [xj, yj] = anel[j];
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) sim = !sim;
  }
  return sim;
}

/** Sigla do estado sob o ponto, ou null. */
export function estadoNoPonto(cena: Cena, x: number, y: number): string | null {
  if (cena.modo === 'globo' && Math.hypot(x - cena.centro[0], y - cena.centro[1]) > cena.raio) return null;
  for (const [uf, aneis] of Object.entries(cena.ufs)) if (aneis.some((a) => dentro(a, x, y))) return uf;
  return null;
}
