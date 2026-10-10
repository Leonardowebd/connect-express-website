import 'server-only';
import { NextResponse } from 'next/server';
import { CAMPO_ARMADILHA, limpar, validar, type Campo } from './validacao';

// O destino dos formulários ainda não foi definido pelo cliente (pergunta em
// aberto Q-002). Enquanto FORMULARIO_WEBHOOK_URL não existe, o envio responde
// "indisponível" e o formulário mostra os contatos diretos.
const DESTINO = process.env.FORMULARIO_WEBHOOK_URL;
const LIMITE_POR_JANELA = 5;
const JANELA_MS = 10 * 60 * 1000;
const TAMANHO_MAXIMO = 10_000;

const envios = new Map<string, number[]>();

function excedeuLimite(ip: string) {
  const agora = Date.now();
  const recentes = (envios.get(ip) ?? []).filter((t) => agora - t < JANELA_MS);
  recentes.push(agora);
  envios.set(ip, recentes);
  return recentes.length > LIMITE_POR_JANELA;
}

function mesmaOrigem(req: Request) {
  const origem = req.headers.get('origin');
  if (!origem) return false;
  try {
    return new URL(origem).host === req.headers.get('host');
  } catch {
    return false;
  }
}

const resposta = (status: number, corpo: object) => NextResponse.json(corpo, { status });

/** Recebe um formulário: confere origem, limite, armadilha e campos, e encaminha ao destino. */
export async function receber(req: Request, formulario: string, campos: Campo[]) {
  if (!mesmaOrigem(req)) return resposta(403, { ok: false, codigo: 'origem' });

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'desconhecido';
  if (excedeuLimite(ip)) return resposta(429, { ok: false, codigo: 'limite' });

  const texto = await req.text();
  if (texto.length > TAMANHO_MAXIMO) return resposta(413, { ok: false, codigo: 'tamanho' });

  let valores: Record<string, unknown>;
  try {
    const lido: unknown = JSON.parse(texto);
    if (typeof lido !== 'object' || lido === null) throw new Error('formato');
    valores = lido as Record<string, unknown>;
  } catch {
    return resposta(400, { ok: false, codigo: 'formato' });
  }

  // Campo armadilha preenchido: é robô. Responde sucesso para não dar pista.
  if (typeof valores[CAMPO_ARMADILHA] === 'string' && valores[CAMPO_ARMADILHA] !== '') {
    return resposta(200, { ok: true });
  }

  const erros = validar(campos, valores);
  if (Object.keys(erros).length > 0) return resposta(422, { ok: false, codigo: 'campos', erros });

  if (!DESTINO) return resposta(503, { ok: false, codigo: 'indisponivel' });

  try {
    const envio = await fetch(DESTINO, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ formulario, dados: limpar(campos, valores), recebidoEm: new Date().toISOString() }),
    });
    if (!envio.ok) throw new Error(`destino respondeu ${envio.status}`);
  } catch (erro) {
    console.error(`[formulario:${formulario}] falha no envio`, erro instanceof Error ? erro.message : erro);
    return resposta(502, { ok: false, codigo: 'envio' });
  }

  return resposta(200, { ok: true });
}
