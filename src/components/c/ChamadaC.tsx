import { Imagem } from '@/components/Imagem/Imagem';
import { contatoSecao } from '@/data/inicio';
import { Botao } from './Botao';
import styles from './c.module.css';

export function ChamadaC() {
  return (
    <section className={styles.moldura} aria-labelledby="titulo-chamada-c">
      <div className={`${styles.chamada} sobre-escuro`}>
        <Imagem id="chamada-final" tom="escuro" preencher sizes="(min-width: 1024px) 60vw, 100vw" />
        <div className={styles.chamadaTexto}>
          <h2 id="titulo-chamada-c" className={styles.titulo}>
            Pronto para entregar mais rápido?
          </h2>
          <p>{contatoSecao.texto}</p>
          <Botao href="/c/#contato">Pedir cotação</Botao>
        </div>
      </div>
    </section>
  );
}
