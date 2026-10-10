// Gera a versão clara de cada logotipo de cliente (tinta branca, fundo transparente),
// para a faixa escura de clientes.
// Uso: node scripts/gerar-logos-claros.mjs   (precisa do ffmpeg)
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const ORIGEM = 'public/clientes';
const DESTINO = 'public/clientes/claro';
const TINTA = 'white';

fs.mkdirSync(DESTINO, { recursive: true });
for (const arquivo of fs.readdirSync(ORIGEM).filter((f) => f.endsWith('.png'))) {
  // Achata sobre branco, vira escala de cinza e usa o escuro como opacidade da tinta.
    // O corte em 0,12 elimina a névoa de fundos que não eram branco puro.
  const filtro = [
    '[0:v]format=rgba,scale=500:500[a]',
    "[1:v][a]overlay=format=auto,format=rgb24,negate,curves=all='0/0 0.12/0 0.38/0.75 1/1',format=gray[t]",
    '[2:v]format=rgba[g]',
    '[g][t]alphamerge',
  ].join(';');
  execFileSync('ffmpeg', [
    '-loglevel', 'error', '-y',
    '-i', path.join(ORIGEM, arquivo),
    '-f', 'lavfi', '-i', 'color=c=white:s=500x500',
    '-f', 'lavfi', '-i', `color=c=${TINTA}:s=500x500`,
    '-filter_complex', filtro,
    '-frames:v', '1',
    path.join(DESTINO, arquivo),
  ]);
}
console.log('logos claros:', fs.readdirSync(DESTINO).length);
