// Gera o pacote do site para a Hostinger (hospedagem compartilhada, sem Node).
// Uso: npm run hostinger
//
// O que faz:
// 1. Gera o site como arquivos estáticos (HOSPEDAGEM=hostinger em next.config.mjs).
//    As rotas de API em Node saem do caminho durante o build: na Hostinger
//    quem recebe os formulários são os scripts PHP de hostinger/api.
// 2. Copia .htaccess e os scripts PHP para dentro de out/.
// 3. Escreve os cabeçalhos de segurança no .htaccess e a lista de campos dos
//    formulários em api/campos.json, a partir das mesmas fontes do site.
// 4. Compacta tudo em hostinger/site-hostinger.zip, pronto para public_html.

import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const API = 'src/app/api';
const API_GUARDADA = '.api-fora-do-build';
const SAIDA = 'out';
const ZIP = path.resolve('hostinger/site-hostinger.zip');

if (fs.existsSync(API_GUARDADA)) {
  // Sobra de uma execução interrompida: devolve antes de começar.
  if (!fs.existsSync(API)) fs.renameSync(API_GUARDADA, API);
  else throw new Error(`${API_GUARDADA} e ${API} existem ao mesmo tempo: confira à mão.`);
}

fs.renameSync(API, API_GUARDADA);
let build;
try {
  build = spawnSync('npx', ['next', 'build'], { stdio: 'inherit', env: { ...process.env, HOSPEDAGEM: 'hostinger' } });
} finally {
  fs.renameSync(API_GUARDADA, API);
}
if (build.status !== 0) process.exit(build.status ?? 1);

// Scripts PHP e configuração do servidor
fs.cpSync('hostinger/api', path.join(SAIDA, 'api'), { recursive: true });

const { cabecalhosDeSeguranca } = await import('../next.config.mjs');
const linhas = cabecalhosDeSeguranca.map((c) => `  Header always set ${c.key} "${c.value.replaceAll('"', '\\"')}"`);
const htaccess =
  fs.readFileSync('hostinger/.htaccess', 'utf8') +
  ['', '# Cabeçalhos de segurança (gerados de next.config.mjs)', '<IfModule mod_headers.c>', ...linhas, '</IfModule>', ''].join('\n');
fs.writeFileSync(path.join(SAIDA, '.htaccess'), htaccess);

const { CAMPO_ARMADILHA, camposContato, camposVagas } = await import('../src/lib/validacao.ts');
fs.writeFileSync(
  path.join(SAIDA, 'api/campos.json'),
  JSON.stringify({ armadilha: CAMPO_ARMADILHA, formularios: { contato: camposContato, vagas: camposVagas } }),
);

fs.rmSync(ZIP, { force: true });
const zip = spawnSync('zip', ['-rqX', ZIP, '.', '-x', '*.DS_Store'], { cwd: SAIDA, stdio: 'inherit' });
if (zip.status !== 0) process.exit(zip.status ?? 1);

const paginas = fs.readdirSync(SAIDA, { recursive: true }).filter((f) => String(f).endsWith('index.html')).length;
console.log(`\nPacote pronto: ${path.relative('.', ZIP)} (${(fs.statSync(ZIP).size / 1e6).toFixed(1)} MB, ${paginas} páginas)`);
console.log('Envie o conteúdo do zip para public_html. Passo a passo: README.md, seção "Publicar na Hostinger".');
