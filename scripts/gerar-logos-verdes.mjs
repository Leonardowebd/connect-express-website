// Gera a versão em verde de cada logotipo de cliente (tinta verde da marca, fundo transparente).
// A versão original, colorida, volta quando o visitante passa o mouse.
// Uso: node scripts/gerar-logos-verdes.mjs   (precisa do ffmpeg)
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const ORIGEM = 'public/clientes';
const DESTINO = 'public/clientes/verde';
const VERDE = '0x2f7a0e';

fs.mkdirSync(DESTINO, { recursive: true });
for (const arquivo of fs.readdirSync(ORIGEM).filter((f) => f.endsWith('.png'))) {
  // Achata sobre branco, vira escala de cinza e usa o escuro como opacidade da tinta verde.
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
    '-f', 'lavfi', '-i', `color=c=${VERDE}:s=500x500`,
    '-filter_complex', filtro,
    '-frames:v', '1',
    path.join(DESTINO, arquivo),
  ]);
}
console.log('logos verdes:', fs.readdirSync(DESTINO).length);
