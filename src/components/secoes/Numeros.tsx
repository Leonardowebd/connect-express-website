import { Contador } from '@/animacoes/Contador';
import { Revelar } from '@/animacoes/Revelar';
import { numeros } from '@/data/empresa';
import styles from './secoes.module.css';

export function Numeros() {
  return (
    <section className="secao" aria-labelledby="titulo-numeros">
      <div className="conteudo">
        <div className="cabeca">
          <p className="rotulo">Em números</p>
          <h2 id="titulo-numeros" className="titulo">
            Uma operação <span className="destaque">maior</span> do que parece
          </h2>
        </div>
        <Revelar emSequencia>
          <dl className={styles.numeros} data-numeros="">
            {numeros.map((n) => (
              <div key={n.legenda} className={styles.numero} data-indicador="">
                <dt className={styles.numeroLegenda}>{n.legenda}</dt>
                <dd className={styles.numeroValor}>
                  <Contador valor={n.valor} prefixo={n.prefixo} sufixo={n.sufixo} />
                </dd>
              </div>
            ))}
          </dl>
        </Revelar>
      </div>
    </section>
  );
}
