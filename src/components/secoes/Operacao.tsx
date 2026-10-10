import Link from 'next/link';
import { Revelar } from '@/animacoes/Revelar';
import { operacao } from '@/data/inicio';
import styles from './secoes.module.css';

export function Operacao() {
  return (
    <section className="secao" aria-labelledby="titulo-operacao">
      <div className={`conteudo ${styles.operacao}`}>
        <div className={styles.operacaoCabeca}>
          <p className="rotulo">{operacao.rotulo}</p>
          <h2 id="titulo-operacao" className="titulo">
            Uma operação feita para a <span className="destaque">última milha</span> da saúde
          </h2>
          <Link href="/#contato" className="botao botao-acao">
            Pedir cotação
          </Link>
        </div>
        <Revelar emSequencia className={styles.escada}>
          {operacao.itens.map((item, i) => (
            <article key={item.titulo} className={styles.degrau}>
              <p className={styles.degrauNumero} aria-hidden="true">
                0{i + 1}
              </p>
              <h3 className={styles.itemTitulo}>{item.titulo}</h3>
              <p className="texto-suave">{item.texto}</p>
            </article>
          ))}
        </Revelar>
      </div>
    </section>
  );
}
