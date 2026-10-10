import { Cabecalho } from '@/components/secoes/Cabecalho';
import { Rodape } from '@/components/secoes/Rodape';

// Páginas internas: mesmo cabeçalho, sobre fundo claro.
export default function LayoutDoSite({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Cabecalho />
      <main id="conteudo">{children}</main>
      <Rodape />
    </>
  );
}
