import { Contador } from '@/animacoes/Contador';
import { Revelar } from '@/animacoes/Revelar';
import { clientes, numeros } from '@/data/empresa';
import { quemSomos } from '@/data/inicio';
import styles from './b.module.css';

export function FatosB() {
  return (
    <section className="secao" aria-labelledby="titulo-fatos-b">
      <div className="conteudo">
        <div className={styles.fatos}>
          <div className={styles.fatosTexto}>
            <p className={styles.rotulo}>Fatos rápidos</p>
            <h2 id="titulo-fatos-b" className={styles.titulo}>
              A confiança de mais de 100 farmácias, todos os dias
            </h2>
            <p className="texto-suave">{quemSomos.paragrafos[0]}</p>
          </div>
          <Revelar emSequencia>
            <dl className={styles.fatosNumeros} data-numeros="">
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

        <div className={styles.faixa}>
          <p className="so-leitor">Clientes atendidos</p>
          <ul data-clientes="">
            {clientes.map((nome) => (
              <li key={nome}>{nome}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
