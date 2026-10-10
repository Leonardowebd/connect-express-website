import { JsonLd } from '@/components/JsonLd';
import { Clientes } from '@/components/secoes/Clientes';
import { Cobertura } from '@/components/secoes/Cobertura';
import { Contato } from '@/components/secoes/Contato';
import { Desafio } from '@/components/secoes/Desafio';
import { Heroi } from '@/components/secoes/Heroi';
import { Numeros } from '@/components/secoes/Numeros';
import { Operacao } from '@/components/secoes/Operacao';
import { Perguntas } from '@/components/secoes/Perguntas';
import { QuemSomos } from '@/components/secoes/QuemSomos';
import { Solucoes } from '@/components/secoes/Solucoes';
import { Valores } from '@/components/secoes/Valores';
import { metaInicio, perguntasGerais } from '@/data/inicio';
import { site } from '@/lib/jsonld';
import { metadados } from '@/lib/metadados';

export const metadata = metadados({ titulo: metaInicio.titulo, descricao: metaInicio.descricao, caminho: '/' });

// Ordem das seções: .claude/skills/connect-design-concept.
export default function Inicio() {
  return (
    <>
      <Heroi />
      <Numeros />
      <QuemSomos />
      <Desafio />
      <Solucoes />
      <Operacao />
      <Cobertura />
      <Valores />
      <Clientes />
      <Perguntas perguntas={perguntasGerais} />
      <Contato />
      <JsonLd dados={site()} />
    </>
  );
}
