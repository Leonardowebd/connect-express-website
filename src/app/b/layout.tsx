import { CabecalhoB } from '@/components/b/CabecalhoB';
import { RodapeB } from '@/components/b/RodapeB';

// Versão B do site: referência Cargomaxis (nó 1-10 do Figma).
export default function LayoutB({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CabecalhoB />
      <main id="conteudo">{children}</main>
      <RodapeB />
    </>
  );
}
