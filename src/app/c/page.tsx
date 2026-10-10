import type { Metadata } from 'next';
import { ChamadaC } from '@/components/c/ChamadaC';
import { ClientesC } from '@/components/c/ClientesC';
import { DestaqueC } from '@/components/c/DestaqueC';
import { HeroiC } from '@/components/c/HeroiC';
import { NumerosC } from '@/components/c/NumerosC';
import { SetoresC } from '@/components/c/SetoresC';
import { SobMedidaC } from '@/components/c/SobMedidaC';
import { SolucoesC } from '@/components/c/SolucoesC';
import { Contato } from '@/components/secoes/Contato';
import { Perguntas } from '@/components/secoes/Perguntas';
import { metaInicio, perguntasGerais } from '@/data/inicio';

// Versão C da página inicial, para comparar com as versões A e B.
// Mesmo conteúdo, outro layout. Fica fora dos buscadores e aponta a versão A como oficial.
export const metadata: Metadata = {
  title: `Versão C: ${metaInicio.titulo}`.slice(0, 60),
  description: metaInicio.descricao,
  alternates: { canonical: '/' },
  robots: { index: false, follow: false },
};

export default function InicioC() {
  return (
    <>
      <HeroiC />
      <NumerosC />
      <DestaqueC />
      <SobMedidaC />
      <SolucoesC />
      <SetoresC />
      <ClientesC />
      <ChamadaC />
      <Perguntas perguntas={perguntasGerais} />
      <Contato />
    </>
  );
}
