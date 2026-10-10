import Link from 'next/link';
import { Revelar } from '@/animacoes/Revelar';
import { solucoes } from '@/data/inicio';
import { servicos } from '@/data/servicos';
import styles from './secoes.module.css';

export function Solucoes() {
  return (
    <section id="servicos" className="secao secao-escura" aria-labelledby="titulo-solucoes">
      <div className="conteudo">
        <Revelar emSequencia className={styles.mosaico}>
          <div className={`${styles.ladrilho} ${styles.ladrilhoAcao}`}>
            <p className={styles.ladrilhoRotulo}>{solucoes.rotulo}</p>
            <h2 id="titulo-solucoes" className={styles.ladrilhoTitulo}>
              {solucoes.titulo}
            </h2>
          </div>

          {servicos.map((s) => (
            <article key={s.slug} className={styles.ladrilho} data-solucao={s.slug}>
              <p className={styles.etiqueta}>{s.etiqueta}</p>
              <h3 className={styles.ladrilhoNome}>{s.nome}</h3>
              <p className={styles.ladrilhoTexto}>{s.resumo}</p>
              <Link href={`/servicos/${s.slug}/`} className={styles.ladrilhoLink}>
                Ver solução<span className="so-leitor">: {s.nome}</span>
                <span aria-hidden="true"> ↗</span>
              </Link>
            </article>
          ))}

          <Link href="/#contato" className={`${styles.ladrilho} ${styles.ladrilhoAcao} ${styles.ladrilhoChamada}`}>
            <span className={styles.ladrilhoTitulo}>{solucoes.chamada}</span>
            <span aria-hidden="true" className={styles.seta}>
              ↗
            </span>
          </Link>
        </Revelar>
      </div>
    </section>
  );
}
