import { Imagem } from '@/components/Imagem/Imagem';
import { contatos, linkWhatsApp } from '@/data/empresa';
import { contatoSecao, quemSomos } from '@/data/inicio';
import { ExpansaoNaRolagem } from '@/efeitos/ExpansaoNaRolagem';
import { Pilula } from './Pilula';
import styles from './secoes.module.css';

/**
 * Chamada final: a foto se abre até ocupar a tela conforme a rolagem e,
 * aberta, mostra os números da operação, o convite e os dois caminhos de contato.
 */
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
        <dl className={styles.chamadaFatos} data-fatos="">
          {quemSomos.fatos.map((f) => (
            <div key={f.legenda}>
              <dt>{f.legenda}</dt>
              <dd>{f.valor}</dd>
            </div>
          ))}
        </dl>
        <p className={styles.chamadaSubtitulo}>{quemSomos.declaracao}</p>
        <p className={styles.chamadaTexto}>{contatoSecao.texto}</p>
        <div className="botoes">
          <Pilula href="/#contato">Pedir cotação</Pilula>
          <Pilula href={linkWhatsApp} externo clara>
            Falar no WhatsApp
          </Pilula>
        </div>
        <p className={styles.chamadaContato}>
          Comercial: {contatos.comercial.telefone} · {contatos.comercial.email}
        </p>
      </ExpansaoNaRolagem>
    </section>
  );
}
