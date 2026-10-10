import { TOTAL_ESTADOS, URL_SITE, contatos, empresa, enderecos, estados, numeros } from '@/data/empresa';
import { servicos } from '@/data/servicos';

export const dynamic = 'force-static';

// Resumo do site para assistentes de IA, gerado dos mesmos dados das páginas.
export function GET() {
  const linhas = [
    `# ${empresa.nome}`,
    '',
    `> ${empresa.resumo}`,
    '',
    '## Soluções',
    ...servicos.map((s) => `- [${s.nome}](${URL_SITE}/servicos/${s.slug}/): ${s.resumo}`),
    '',
    '## Números da operação',
    ...numeros.map((n) => `- ${n.prefixo}${n.valor}${n.sufixo} ${n.legenda}`),
    '',
    '## Cobertura',
    `Operação em ${TOTAL_ESTADOS} estados, entre eles: ${estados.map((e) => `${e.nome} (${e.uf})`).join(', ')}.`,
    ...enderecos.map((e) => `- ${e.tipo}: ${e.rua}, ${e.bairro}, ${e.cidade}, ${e.uf}, CEP ${e.cep}`),
    '',
    '## Contato',
    `- Comercial: ${contatos.comercial.telefone}, ${contatos.comercial.email}`,
    `- SAC: ${contatos.sac.telefone}, ${contatos.sac.email}`,
    `- Rastreio de pedidos: ${empresa.urlRastreio}`,
    `- CNPJ: ${empresa.cnpj} (${empresa.razaoSocial})`,
    '',
  ];
  return new Response(linhas.join('\n'), { headers: { 'content-type': 'text/plain; charset=utf-8' } });
}
