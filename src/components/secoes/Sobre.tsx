import { Revelar } from '@/animacoes/Revelar';
import { Imagem } from '@/components/Imagem/Imagem';
import { quemSomos, valores } from '@/data/inicio';
import styles from './secoes.module.css';

export function Sobre() {
  return (
    <section id="sobre" className="secao" aria-labelledby="titulo-sobre">
      <div className="conteudo">
        <div className={styles.cabecaDupla}>
          <div>
            <p className={styles.rotulo}>{quemSomos.rotulo}</p>
            <h2 id="titulo-sobre" className={styles.titulo}>
              {quemSomos.titulo}
            </h2>
          </div>
          <p className="texto-g">{quemSomos.chamada}</p>
        </div>
        <Revelar className={styles.sobre}>
          <Imagem id="quem-somos" sizes="(min-width: 1024px) 45vw, 100vw" />
          <div className="prosa texto-suave">
            {quemSomos.paragrafos.slice(1).map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </Revelar>

        <h3 className={styles.subtituloSecao}>{valores.titulo}</h3>
        <Revelar emSequencia className={styles.valores}>
          {valores.itens.map((v) => (
            <article key={v.titulo} className={styles.cartao} data-valor="">
              <h4>{v.titulo}</h4>
              <p>{v.texto}</p>
            </article>
          ))}
        </Revelar>
      </div>
    </section>
  );
}
