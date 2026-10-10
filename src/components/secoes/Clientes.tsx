import Link from 'next/link';
import { clientes } from '@/data/empresa';
import { clientesSecao } from '@/data/inicio';
import styles from './secoes.module.css';

export function Clientes() {
  return (
    <section className="secao secao-alt" aria-labelledby="titulo-clientes">
      <div className={`conteudo ${styles.clientes}`}>
        <p className="rotulo">{clientesSecao.rotulo}</p>
        <h2 id="titulo-clientes" className="titulo">
          {clientesSecao.titulo}
        </h2>
        <Link href="/#contato" className="botao botao-acao">
          Pedir cotação
        </Link>
        <ul className={styles.clientesGrade} data-clientes="">
          {clientes.map((nome) => (
            <li key={nome}>{nome}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
