import { Contador } from '@/animacoes/Contador';
import { Revelar } from '@/animacoes/Revelar';
import { numeros } from '@/data/empresa';
import styles from './c.module.css';

export function NumerosC() {
  return (
    <section className={styles.numeros} aria-labelledby="titulo-numeros-c">
      <div className="conteudo">
        <h2 id="titulo-numeros-c" className={styles.sobrelinha}>
          A operação da Connect Express Log em números
        </h2>
        <Revelar emSequencia>
          <dl className={styles.numerosLista} data-numeros="">
            {numeros.map((n) => (
              <div key={n.legenda} data-indicador="">
                <dt>{n.legenda}</dt>
                <dd>
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
