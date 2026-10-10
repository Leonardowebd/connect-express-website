import Link from 'next/link';
import { Cabecalho } from '@/components/secoes/Cabecalho';
import { Rodape } from '@/components/secoes/Rodape';
import styles from './(site)/paginas.module.css';

export const metadata = { title: 'Página não encontrada | Connect Express Log' };

export default function NaoEncontrada() {
  return (
    <>
      <Cabecalho />
      <main id="conteudo">
    <section className="secao" aria-labelledby="titulo-404">
      <div className={`conteudo ${styles.vazio}`}>
        <p className="rotulo">Erro 404</p>
        <h1 id="titulo-404" className="titulo">
          Esta página não existe
        </h1>
        <p className="texto-g texto-suave">O endereço pode ter mudado. Estes caminhos levam ao que você procura:</p>
        <div className="botoes">
          <Link href="/" className="botao botao-acao">
            Ir para o início
          </Link>
          <Link href="/#servicos" className="botao botao-contorno">
            Ver soluções
          </Link>
          <Link href="/#contato" className="botao botao-contorno">
            Falar com o comercial
          </Link>
        </div>
      </div>
    </section>
      </main>
      <Rodape />
    </>
  );
}
