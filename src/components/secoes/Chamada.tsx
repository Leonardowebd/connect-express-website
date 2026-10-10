import { Imagem } from '@/components/Imagem/Imagem';
import { contatoSecao } from '@/data/inicio';
import { Pilula } from './Pilula';
import styles from './secoes.module.css';

export function Chamada() {
  return (
    <section className={styles.moldura} aria-labelledby="titulo-chamada">
      <div className={`${styles.chamada} sobre-escuro`}>
        <Imagem id="chamada-final" tom="escuro" preencher sizes="100vw" />
        <div className={styles.chamadaTexto}>
          <h2 id="titulo-chamada" className={styles.titulo}>
            Pronto para entregar mais rápido?
          </h2>
          <p>{contatoSecao.texto}</p>
          <Pilula href="/#contato">Pedir cotação</Pilula>
        </div>
      </div>
    </section>
  );
}
