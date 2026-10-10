import type { Metadata } from 'next';
import { Contato } from '@/components/secoes/Contato';
import { CoberturaImersiva } from '@/components/secoes/CoberturaImersiva';

// Segunda versão do mapa de cobertura, para comparar com a da página inicial:
// globo fixo sobre o Brasil, em seção inteira. Fica fora dos buscadores.
export const metadata: Metadata = {
  title: 'Cobertura em globo (prévia) | Connect Express Log',
  description: 'Prévia da seção de cobertura em formato de globo, com os estados atendidos pela Connect Express Log.',
  alternates: { canonical: '/' },
  robots: { index: false, follow: false },
};

export default function PreviaDoGlobo() {
  return (
    <>
      <CoberturaImersiva nivelDoTitulo={1} />
      <Contato />
    </>
  );
}
