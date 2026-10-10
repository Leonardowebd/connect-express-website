import { Imagem } from '@/components/Imagem/Imagem';
import { contatoSecao } from '@/data/inicio';
import { Pilula } from './Pilula';
import styles from './b.module.css';

export function ChamadaB() {
  return (
    <section className={styles.moldura} aria-labelledby="titulo-chamada-b">
      <div className={`${styles.chamada} sobre-escuro`}>
        <Imagem id="chamada-final" tom="escuro" preencher sizes="100vw" />
        <div className={styles.chamadaTexto}>
          <h2 id="titulo-chamada-b" className={styles.titulo}>
            Pronto para entregar mais rápido?
          </h2>
          <p>{contatoSecao.texto}</p>
          <Pilula href="/b/#contato">Pedir cotação</Pilula>
        </div>
      </div>
    </section>
  );
}
