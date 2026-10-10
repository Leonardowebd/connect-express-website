import { Imagem } from '@/components/Imagem/Imagem';
import { TOTAL_ESTADOS, centrosDeDistribuicao, enderecos, estados } from '@/data/empresa';
import { publicos } from '@/data/inicio';
import styles from './c.module.css';

export function SetoresC() {
  return (
    <section id="cobertura" className={styles.moldura} aria-labelledby="titulo-setores-c">
      <div className={`${styles.setores} sobre-escuro`}>
        <Imagem id="setores" tom="escuro" preencher sizes="100vw" />
        <div className={styles.setoresTexto}>
          <h2 id="titulo-setores-c" className={styles.titulo}>
            A saúde atendida em {TOTAL_ESTADOS} estados
          </h2>
          <p>
            Matriz em {enderecos[0].cidade} ({enderecos[0].uf}), filial em {enderecos[1].cidade} ({enderecos[1].uf}) e
            centros de distribuição em {centrosDeDistribuicao.join(' e ')}.
          </p>
          <ul className={styles.setoresLista}>
            {publicos.map((p) => (
              <li key={p}>
                <span>{p}</span>
                <span aria-hidden="true">›</span>
              </li>
            ))}
          </ul>
          <ul className={styles.estados} data-estados="" aria-label="Estados atendidos">
            {estados.map((e) => (
              <li key={e.uf}>
                <abbr title={e.nome}>{e.uf}</abbr>
                <span className="so-leitor"> {e.nome}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
