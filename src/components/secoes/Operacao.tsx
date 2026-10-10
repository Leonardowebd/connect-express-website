import { Lightning, MapPinArea, Pill, UsersThree } from '@phosphor-icons/react/dist/ssr';
import { Revelar } from '@/animacoes/Revelar';
import { Imagem } from '@/components/Imagem/Imagem';
import { operacao, quemSomos } from '@/data/inicio';
import { Pilula } from './Pilula';
import styles from './secoes.module.css';

const ICONES = [Pill, MapPinArea, Lightning, UsersThree];

/** Por que a Connect: painel claro com os tópicos em cartões numerados e uma colagem com a métrica. */
export function Operacao() {
  return (
    <section className={styles.moldura} aria-labelledby="titulo-operacao">
      <div className={styles.painelClaro}>
        <div className={styles.painelTexto}>
          <p className={styles.rotulo}>{operacao.rotulo}</p>
          <h2 id="titulo-operacao" className={styles.titulo}>
            {operacao.titulo}
          </h2>
          <p className="texto-suave">{quemSomos.paragrafos[1]}</p>
          <Revelar emSequencia className={styles.topicos}>
            {operacao.itens.map((item, i) => {
              const Icone = ICONES[i % ICONES.length];
              return (
                <article key={item.titulo} className={styles.topico} data-topico="">
                  <p className={styles.topicoSelo}>
                    <Icone aria-hidden="true" weight="duotone" size={20} />
                  </p>
                <div>
                  <h3>{item.titulo}</h3>
                  <p className="texto-suave">{item.texto}</p>
                </div>
                </article>
              );
            })}
          </Revelar>
          <Pilula href="/#contato">Pedir cotação</Pilula>
        </div>
        <div className={styles.colagem}>
          <div className={styles.colagemGrande}>
            <Imagem id="operacao" sizes="(min-width: 1024px) 42vw, 100vw" />
          </div>
          <Imagem id="operacao-detalhe" sizes="(min-width: 1024px) 20vw, 50vw" />
          <div className={styles.metrica}>
            <p className={styles.metricaValor}>3h</p>
            <p>da farmácia à casa do paciente, na entrega expressa</p>
          </div>
        </div>
      </div>
    </section>
  );
}
