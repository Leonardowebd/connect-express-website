import { RodapeC } from '@/components/c/RodapeC';

// Versão C do site: referência SwiftMove (nó 1-8 do Figma).
// O cabeçalho fica dentro do cartão do herói, por isso não aparece aqui.
export default function LayoutC({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main id="conteudo">{children}</main>
      <RodapeC />
    </>
  );
}
