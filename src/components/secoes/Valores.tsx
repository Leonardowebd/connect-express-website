import { Revelar } from '@/animacoes/Revelar';
import { valores } from '@/data/inicio';
import styles from './secoes.module.css';

export function Valores() {
  return (
    <section className="secao" aria-labelledby="titulo-valores">
      <div className="conteudo">
        <div className="cabeca">
          <p className="rotulo">{valores.rotulo}</p>
          <h2 id="titulo-valores" className="titulo">
            {valores.titulo}
          </h2>
        </div>
        <Revelar emSequencia className={styles.valores}>
          {valores.itens.map((v) => (
            <article key={v.titulo} className={styles.valor} data-valor="">
              <h3 className={styles.itemTitulo}>{v.titulo}</h3>
              <p className="texto-suave">{v.texto}</p>
            </article>
          ))}
        </Revelar>
      </div>
    </section>
  );
}
