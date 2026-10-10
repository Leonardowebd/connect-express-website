import { Revelar } from '@/animacoes/Revelar';
import { Imagem } from '@/components/Imagem/Imagem';
import { centrosDeDistribuicao, enderecos, estados } from '@/data/empresa';
import { cobertura } from '@/data/inicio';
import styles from './secoes.module.css';

export function Cobertura() {
  return (
    <section id="cobertura" className="secao secao-alt" aria-labelledby="titulo-cobertura">
      <div className="conteudo">
        <div className="cabeca">
          <p className="rotulo">{cobertura.rotulo}</p>
          <h2 id="titulo-cobertura" className="titulo">
            {cobertura.titulo}
          </h2>
        </div>
        <Revelar className={styles.cobertura}>
          <div className={styles.coberturaTexto}>
            <p className="texto-g">{cobertura.texto}</p>
            <h3 className={styles.itemTitulo}>Estados atendidos</h3>
            <ul className={styles.estados} data-estados="">
              {estados.map((e) => (
                <li key={e.uf}>
                  <abbr title={e.nome}>{e.uf}</abbr>
                  <span>{e.nome}</span>
                </li>
              ))}
            </ul>
            <h3 className={styles.itemTitulo}>Bases</h3>
            <ul className={styles.bases}>
              {enderecos.map((e) => (
                <li key={e.tipo}>
                  <strong>{e.tipo}:</strong> {e.cidade} ({e.uf})
                </li>
              ))}
              <li>
                <strong>Centros de distribuição:</strong> {centrosDeDistribuicao.join(' e ')}
              </li>
            </ul>
          </div>
          <Imagem id="cobertura" sizes="(min-width: 1024px) 40vw, 100vw" />
        </Revelar>
      </div>
    </section>
  );
}
