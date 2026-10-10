import { Imagem } from '@/components/Imagem/Imagem';
import { contatoSecao } from '@/data/inicio';
import { ExpansaoNaRolagem } from '@/efeitos/ExpansaoNaRolagem';
import { Pilula } from './Pilula';
import styles from './secoes.module.css';

/** Chamada final: a foto se abre até ocupar a tela conforme a rolagem. */
export function Chamada() {
  return (
    <section aria-labelledby="titulo-chamada" className="sobre-escuro">
      <ExpansaoNaRolagem
        midia={<Imagem id="chamada-final" tom="escuro" preencher sizes="100vw" />}
        titulo={
          <h2 id="titulo-chamada" className={styles.chamadaTitulo}>
            Pronto para entregar mais rápido?
          </h2>
        }
      >
        <p className={styles.chamadaTexto}>{contatoSecao.texto}</p>
        <Pilula href="/#contato">Pedir cotação</Pilula>
      </ExpansaoNaRolagem>
    </section>
  );
}
