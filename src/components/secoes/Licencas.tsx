import { SealCheck } from '@phosphor-icons/react/dist/ssr';
import { Revelar } from '@/animacoes/Revelar';
import { licencas } from '@/data/empresa';
import { licencasSecao } from '@/data/inicio';
import styles from './secoes.module.css';

export function Licencas() {
  return (
    <section id="licencas" className="secao" aria-labelledby="titulo-licencas">
      <div className="conteudo">
        <p className={styles.rotulo}>{licencasSecao.rotulo}</p>
        <h2 id="titulo-licencas" className={styles.titulo}>
          {licencasSecao.titulo}
        </h2>
        <p className="texto-suave">{licencasSecao.texto}</p>
        <Revelar emSequencia className={`${styles.valores} ${styles.licencasGrade}`}>
          {licencas.map((l) => (
            <article key={l} className={`${styles.cartao} ${styles.licenca}`}>
              <SealCheck aria-hidden="true" weight="duotone" size={28} className={styles.icone} />
              <h3>{l}</h3>
            </article>
          ))}
        </Revelar>
      </div>
    </section>
  );
}
