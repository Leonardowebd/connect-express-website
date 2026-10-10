import { JsonLd } from '@/components/JsonLd';
import { Chamada } from '@/components/secoes/Chamada';
import { Cobertura } from '@/components/secoes/Cobertura';
import { Contato } from '@/components/secoes/Contato';
import { Fatos } from '@/components/secoes/Fatos';
import { Heroi } from '@/components/secoes/Heroi';
import { Operacao } from '@/components/secoes/Operacao';
import { Perguntas } from '@/components/secoes/Perguntas';
import { Sobre } from '@/components/secoes/Sobre';
import { Solucoes } from '@/components/secoes/Solucoes';
import { metaInicio, perguntasGerais } from '@/data/inicio';
import { site } from '@/lib/jsonld';
import { metadados } from '@/lib/metadados';

export const metadata = metadados({ titulo: metaInicio.titulo, descricao: metaInicio.descricao, caminho: '/' });

// Ordem das seções: .claude/skills/connect-design-concept.
export default function Inicio() {
  return (
    <>
      <Heroi />
      <Fatos />
      <Solucoes />
      <Operacao />
      <Sobre />
      <Cobertura />
      <Chamada />
      <Perguntas perguntas={perguntasGerais} />
      <Contato />
      <JsonLd dados={site()} />
    </>
  );
}
