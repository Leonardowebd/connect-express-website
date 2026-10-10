import { Cabecalho } from '@/components/Cabecalho/Cabecalho';
import { Rodape } from '@/components/Rodape/Rodape';

// Versão A do site: cabeçalho fixo e rodapé com cartão de cotação.
export default function LayoutDoSite({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Cabecalho />
      <main id="conteudo">{children}</main>
      <Rodape />
    </>
  );
}
