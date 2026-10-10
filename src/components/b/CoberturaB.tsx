import { Revelar } from '@/animacoes/Revelar';
import { Imagem } from '@/components/Imagem/Imagem';
import { centrosDeDistribuicao, enderecos, estados } from '@/data/empresa';
import { cobertura } from '@/data/inicio';
import styles from './b.module.css';

export function CoberturaB() {
  return (
    <section id="cobertura" className="secao" aria-labelledby="titulo-cobertura-b">
      <div className="conteudo">
        <div className={styles.cabecaDupla}>
          <div>
            <p className={styles.rotulo}>{cobertura.rotulo}</p>
            <h2 id="titulo-cobertura-b" className={styles.titulo}>
              {cobertura.titulo}
            </h2>
          </div>
          <p className="texto-g">{cobertura.texto}</p>
        </div>
        <Revelar className={styles.mural}>
          <div className={styles.muralFoto}>
            <Imagem id="cobertura" sizes="(min-width: 1024px) 30vw, 100vw" />
          </div>
          <div className={styles.cartoes}>
            {enderecos.map((e) => (
              <article key={e.tipo} className={styles.cartao}>
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
              <h3>Centros de distribuição</h3>
              <p>{centrosDeDistribuicao.join(' e ')}</p>
            </article>
            <article className={styles.cartao}>
              <h3>Estados atendidos</h3>
              <ul className={styles.estados} data-estados="">
                {estados.map((e) => (
                  <li key={e.uf}>
                    <abbr title={e.nome}>{e.uf}</abbr>
                    <span className="so-leitor"> {e.nome}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </Revelar>
      </div>
    </section>
  );
}
