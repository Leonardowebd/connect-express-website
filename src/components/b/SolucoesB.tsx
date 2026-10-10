import { Revelar } from '@/animacoes/Revelar';
import { solucoes } from '@/data/inicio';
import { servicos } from '@/data/servicos';
import { Pilula } from './Pilula';
import styles from './b.module.css';

export function SolucoesB() {
  return (
    <section id="servicos" className="secao" aria-labelledby="titulo-solucoes-b">
      <div className="conteudo">
        <div className={styles.cabeca}>
          <p className={styles.rotulo}>{solucoes.rotulo}</p>
          <h2 id="titulo-solucoes-b" className={styles.titulo}>
            {solucoes.titulo}
          </h2>
        </div>
        <Revelar emSequencia className={styles.linhas}>
          {servicos.map((s) => (
            <article key={s.slug} className={styles.linha} data-solucao={s.slug}>
              <div>
                <h3>{s.nome}</h3>
                <p className="texto-suave">{s.resumo}</p>
              </div>
              <Pilula href={`/servicos/${s.slug}/`}>
                Ver solução<span className="so-leitor">: {s.nome}</span>
              </Pilula>
            </article>
          ))}
        </Revelar>
      </div>
    </section>
  );
}
