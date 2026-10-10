// Gera os contornos usados pelos mapas de cobertura, já simplificados.
// Fontes: malha de estados do IBGE e contorno dos países do Natural Earth (world-atlas).
// A terra é guardada país a país, para o globo poder riscar as fronteiras.
// Uso: node scripts/gerar-mapas.mjs
import fs from 'node:fs';

const IBGE = 'https://servicodados.ibge.gov.br/api/v3/malhas/paises/BR?formato=application/vnd.geo%2Bjson&qualidade=minima&intrarregiao=UF';
const TERRA = 'https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/countries-110m.json';
const CENTRO = [-54, -15];

const UF_POR_CODIGO = {
  11: 'RO', 12: 'AC', 13: 'AM', 14: 'RR', 15: 'PA', 16: 'AP', 17: 'TO', 21: 'MA', 22: 'PI', 23: 'CE', 24: 'RN',
  25: 'PB', 26: 'PE', 27: 'AL', 28: 'SE', 29: 'BA', 31: 'MG', 32: 'ES', 33: 'RJ', 35: 'SP', 41: 'PR', 42: 'SC',
  43: 'RS', 50: 'MS', 51: 'MT', 52: 'GO', 53: 'DF',
};

const area = (r) => Math.abs(r.reduce((s, p, i) => s + p[0] * r[(i + 1) % r.length][1] - r[(i + 1) % r.length][0] * p[1], 0) / 2);

// Anel fechado: o primeiro e o último ponto coincidem, então a simplificação
// é feita em duas metades, cortando no ponto mais distante do início.
function simplificar(anel, tol) {
  if (anel.length < 6) return anel;
  let longe = 0;
  let indice = 0;
  anel.forEach(([x, y], i) => {
    const d = Math.hypot(x - anel[0][0], y - anel[0][1]);
    if (d > longe) {
      longe = d;
      indice = i;
    }
  });
  const ida = reduzir(anel.slice(0, indice + 1), tol);
  const volta = reduzir(anel.slice(indice), tol);
  return [...ida, ...volta.slice(1)];
}

// Douglas-Peucker
function reduzir(pts, tol) {
  if (pts.length < 3) return pts;
  const manter = new Uint8Array(pts.length);
  manter[0] = manter[pts.length - 1] = 1;
  const pilha = [[0, pts.length - 1]];
  while (pilha.length) {
    const [a, b] = pilha.pop();
    let maior = 0;
    let indice = -1;
    const [ax, ay] = pts[a];
    const [bx, by] = pts[b];
    const dx = bx - ax;
    const dy = by - ay;
    const comp = Math.hypot(dx, dy) || 1e-9;
    for (let i = a + 1; i < b; i += 1) {
      const d = Math.abs(dy * pts[i][0] - dx * pts[i][1] + bx * ay - by * ax) / comp;
      if (d > maior) {
        maior = d;
        indice = i;
      }
    }
    if (maior > tol && indice > 0) {
      manter[indice] = 1;
      pilha.push([a, indice], [indice, b]);
    }
  }
  return pts.filter((_, i) => manter[i]);
}

const arredondar = (r, casas) => r.map(([x, y]) => [Number(x.toFixed(casas)), Number(y.toFixed(casas))]);

async function estados() {
  const geo = await (await fetch(IBGE)).json();
  const saida = {};
  for (const f of geo.features) {
    const uf = UF_POR_CODIGO[Number(String(f.properties.codarea).slice(0, 2))];
    const poligonos = f.geometry.type === 'Polygon' ? [f.geometry.coordinates] : f.geometry.coordinates;
    const aneis = poligonos
      .map((p) => p[0])
      .filter((r) => area(r) > 0.03)
      .map((r) => arredondar(simplificar(r, 0.045), 2))
      .filter((r) => r.length > 3);
    saida[uf] = aneis;
  }
  return saida;
}

async function terra() {
  const topo = await (await fetch(TERRA)).json();
  const { scale, translate } = topo.transform;
  const arcos = topo.arcs.map((arco) => {
    let x = 0;
    let y = 0;
    return arco.map(([dx, dy]) => {
      x += dx;
      y += dy;
      return [x * scale[0] + translate[0], y * scale[1] + translate[1]];
    });
  });
  const anel = (indices) =>
    indices.flatMap((i, n) => {
      const pts = i < 0 ? [...arcos[~i]].reverse() : arcos[i];
      return n ? pts.slice(1) : pts;
    });
  const RAD = Math.PI / 180;
  const perto = ([lon, lat]) =>
    Math.sin(CENTRO[1] * RAD) * Math.sin(lat * RAD) +
      Math.cos(CENTRO[1] * RAD) * Math.cos(lat * RAD) * Math.cos((lon - CENTRO[0]) * RAD) >
    -0.15;
  const aneis = [];
  for (const g of topo.objects.countries.geometries) {
    const poligonos = g.type === 'Polygon' ? [g.arcs] : g.arcs;
    for (const p of poligonos) {
      const r = anel(p[0]);
      if (area(r) < 0.8 || !r.some(perto)) continue;
      aneis.push(arredondar(simplificar(r, 0.25), 1));
    }
  }
  return aneis;
}

const [ufs, continentes] = await Promise.all([estados(), terra()]);
fs.writeFileSync('public/dados/brasil-ufs.json', JSON.stringify(ufs));
fs.writeFileSync('public/dados/terra.json', JSON.stringify(continentes));
const pontos = (o) => Object.values(o).flat(2).length;
console.log('estados:', Object.keys(ufs).length, 'pontos:', pontos(ufs), '| terra: aneis', continentes.length, 'pontos:', continentes.flat().length);
