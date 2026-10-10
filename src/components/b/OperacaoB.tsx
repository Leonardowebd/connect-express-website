import { Revelar } from '@/animacoes/Revelar';
import { operacao } from '@/data/inicio';
import styles from './b.module.css';

export function OperacaoB() {
  return (
    <section className={styles.moldura} aria-labelledby="titulo-operacao-b">
      <div className={`${styles.bloco} secao-escura`}>
        <p className={styles.rotulo}>{operacao.rotulo}</p>
        <h2 id="titulo-operacao-b" className={styles.titulo}>
          {operacao.titulo}
        </h2>
        <Revelar emSequencia className={styles.pilares}>
          {operacao.itens.map((item, i) => (
            <article key={item.titulo} className={styles.pilar}>
              <p className={styles.selo} aria-hidden="true">
                0{i + 1}
              </p>
              <h3>{item.titulo}</h3>
              <p className="texto-suave">{item.texto}</p>
            </article>
          ))}
        </Revelar>
      </div>
    </section>
  );
}
