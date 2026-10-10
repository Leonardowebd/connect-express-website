import { Buildings, Warehouse } from '@phosphor-icons/react/dist/ssr';
import { Revelar } from '@/animacoes/Revelar';
import { TOTAL_ESTADOS, centrosDeDistribuicao, enderecos, estados } from '@/data/empresa';
import { cobertura } from '@/data/inicio';
import { MapaCobertura } from '@/efeitos/MapaCobertura';
import styles from './secoes.module.css';

export function Cobertura() {
  return (
    <section id="cobertura" className="secao" aria-labelledby="titulo-cobertura">
      <div className="conteudo">
        <div className={styles.cabecaDupla}>
          <div>
            <p className={styles.rotulo}>{cobertura.rotulo}</p>
            <h2 id="titulo-cobertura" className={styles.titulo}>
              {cobertura.titulo}
            </h2>
          </div>
          <p className="texto-g">{cobertura.texto}</p>
        </div>

        <MapaCobertura estados={[...estados]} total={TOTAL_ESTADOS} />

        <Revelar emSequencia className={styles.basesGrade}>
          {enderecos.map((e) => (
            <article key={e.tipo} className={styles.cartao}>
              <Buildings aria-hidden="true" weight="duotone" size={32} className={styles.icone} />
              <h3>{e.tipo}</h3>
              <address>
                {e.rua}
                <br />
                {e.bairro}, {e.cidade} ({e.uf})
                <br />
                CEP {e.cep}
              </address>
            </article>
          ))}
          <article className={styles.cartao}>
            <Warehouse aria-hidden="true" weight="duotone" size={32} className={styles.icone} />
            <h3>Centros de distribuição</h3>
            <p>{centrosDeDistribuicao.join(' e ')}</p>
          </article>
        </Revelar>
      </div>
    </section>
  );
}
