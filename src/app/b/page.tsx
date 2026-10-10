import type { Metadata } from 'next';
import { ChamadaB } from '@/components/b/ChamadaB';
import { CoberturaB } from '@/components/b/CoberturaB';
import { FatosB } from '@/components/b/FatosB';
import { HeroiB } from '@/components/b/HeroiB';
import { OperacaoB } from '@/components/b/OperacaoB';
import { SolucoesB } from '@/components/b/SolucoesB';
import { Contato } from '@/components/secoes/Contato';
import { Perguntas } from '@/components/secoes/Perguntas';
import { metaInicio, perguntasGerais } from '@/data/inicio';

// Versão B da página inicial, para comparar com a versão A.
// Mesmo conteúdo, outro layout. Fica fora dos buscadores e aponta a versão A como oficial.
export const metadata: Metadata = {
  title: `Versão B: ${metaInicio.titulo}`.slice(0, 60),
  description: metaInicio.descricao,
  alternates: { canonical: '/' },
  robots: { index: false, follow: false },
};

export default function InicioB() {
  return (
    <>
      <HeroiB />
      <FatosB />
      <SolucoesB />
      <OperacaoB />
      <CoberturaB />
      <ChamadaB />
      <Perguntas perguntas={perguntasGerais} />
      <Contato />
    </>
  );
}
