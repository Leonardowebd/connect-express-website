import { Cabecalho } from '@/components/secoes/Cabecalho';
import { Rodape } from '@/components/secoes/Rodape';

// Página inicial: o cabeçalho fica sobre a foto do herói.
export default function LayoutDoInicio({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Cabecalho sobreFoto />
      <main id="conteudo">{children}</main>
      <Rodape />
    </>
  );
}
