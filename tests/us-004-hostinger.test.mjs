// US-004 na Hostinger: o pedido é registrado por e-mail e segue para o WhatsApp.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';

const RAIZ = path.resolve(import.meta.dirname, '..');
const ler = (arquivo) => fs.readFileSync(path.join(RAIZ, arquivo), 'utf8');

test('@spec:AC-051 o pedido fica registrado por e-mail e segue para o WhatsApp', async () => {
  // E-mail: os scripts PHP da Hostinger
  const envio = ler('hostinger/api/enviar.php');
  assert.match(envio, /mail\(/, 'o script envia e-mail');
  assert.match(envio, /Reply-To: /, 'a resposta vai para o e-mail de quem escreveu');
  assert.match(envio, /mesma_origem\(\)/, 'só aceita envio vindo do próprio site');
  assert.match(envio, /excedeu_limite\(/, 'limita envios por endereço');
  assert.match(envio, /armadilha/, 'descarta robôs pelo campo armadilha');
  for (const formulario of ['contato', 'vagas']) {
    assert.match(ler(`hostinger/api/${formulario}.php`), new RegExp(`receber\\('${formulario}'\\)`), `ponto de entrada de ${formulario}`);
  }
  const config = ler('hostinger/api/config.php');
  const { contatos } = await import('../src/data/empresa.ts');
  assert.ok(config.includes(`'contato' => '${contatos.comercial.email}'`), 'contato vai para a caixa comercial');
  assert.ok(config.includes(`'vagas' => '${contatos.vagas.email}'`), 'candidaturas vão para a caixa de vagas');

  // O servidor atende os mesmos endereços que o formulário usa e protege a configuração
  const htaccess = ler('hostinger/.htaccess');
  assert.match(htaccess, /RewriteRule \^api\/\(contato\|vagas\)\/\?\$ api\/\$1\.php/, 'endereços dos formulários');
  assert.match(ler('hostinger/api/.htaccess'), /config\|enviar[\s\S]*Require all denied/, 'configuração fora do alcance do navegador');
  assert.match(ler('next.config.mjs'), /output: 'export'/, 'modo de site estático para a Hostinger');
  const pacote = ler('scripts/empacotar-hostinger.mjs');
  assert.match(pacote, /cabecalhosDeSeguranca/, 'cabeçalhos de segurança vão para o .htaccess');
  assert.match(pacote, /campos\.json/, 'os campos do PHP saem da mesma validação do site');

  // WhatsApp: depois do envio, com os dados já escritos
  const formulario = ler('src/components/Formulario/Formulario.tsx');
  assert.match(formulario, /https:\/\/wa\.me\/\$\{seguirNoWhatsApp\.numero\}\?text=/, 'abre o WhatsApp com o pedido');
  assert.match(formulario, /Abrir o WhatsApp/, 'há um link para abrir à mão');
  assert.match(ler('src/components/secoes/Contato.tsx'), /seguirNoWhatsApp=\{\{ numero: contatos\.comercial\.whatsapp/, 'o contato usa o WhatsApp comercial');
});
