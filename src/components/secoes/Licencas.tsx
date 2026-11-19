import { SealCheck } from '@phosphor-icons/react/dist/ssr';
import { Revelar } from '@/animacoes/Revelar';
import { Imagem } from '@/components/Imagem/Imagem';
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
        <p className={`texto-suave ${styles.licencasTexto}`}>{licencasSecao.texto}</p>
        <div className={styles.comFoto}>
          <div className={styles.fotoLateral}>
            <Imagem id="licencas" preencher sizes="(min-width: 1024px) 34vw, 100vw" />
          </div>
          <Revelar emSequencia className={styles.licencasGrade}>
          {licencas.map((l) => (
            <article key={l} className={`${styles.cartao} ${styles.licenca}`}>
              <SealCheck aria-hidden="true" weight="duotone" size={28} className={styles.icone} />
              <h3>{l}</h3>
            </article>
          ))}
          </Revelar>
        </div>
      </div>
    </section>
  );
}
