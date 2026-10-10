import { Revelar } from '@/animacoes/Revelar';
import { clientes } from '@/data/empresa';
import styles from './c.module.css';

export function ClientesC() {
  return (
    <section className="secao" aria-labelledby="titulo-clientes-c">
      <div className="conteudo">
        <div className={styles.cabeca}>
          <h2 id="titulo-clientes-c" className={styles.titulo}>
            A confiança das maiores redes do país
          </h2>
        </div>
        <Revelar emSequencia>
          <ul className={styles.clientes} data-clientes="">
            {clientes.map((nome) => (
              <li key={nome}>{nome}</li>
            ))}
          </ul>
        </Revelar>
      </div>
    </section>
  );
}
