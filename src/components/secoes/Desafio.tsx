import { Revelar } from '@/animacoes/Revelar';
import { Imagem } from '@/components/Imagem/Imagem';
import { desafio } from '@/data/inicio';
import styles from './secoes.module.css';

export function Desafio() {
  return (
    <section className="secao secao-alt" aria-labelledby="titulo-desafio">
      <div className="conteudo">
        <div className="cabeca">
          <p className="rotulo">{desafio.rotulo}</p>
          <h2 id="titulo-desafio" className="titulo">
            {desafio.titulo}
          </h2>
        </div>
        <Revelar emSequencia className={styles.desafio}>
          {desafio.itens.map((item) => (
            <article key={item.titulo} className={styles.desafioItem}>
              <Imagem id={item.imagem} sizes="(min-width: 1024px) 22vw, (min-width: 768px) 45vw, 100vw" />
              <h3 className={styles.itemTitulo}>{item.titulo}</h3>
              <p className="texto-suave">{item.texto}</p>
            </article>
          ))}
        </Revelar>
      </div>
    </section>
  );
}
