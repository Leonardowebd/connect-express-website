import Link from 'next/link';
import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr';
import { Imagem } from '@/components/Imagem/Imagem';
import { contatos, linkWhatsApp } from '@/data/empresa';
import { contatoSecao } from '@/data/inicio';
import { servicos } from '@/data/servicos';
import { Pilula } from './Pilula';
import styles from './secoes.module.css';

/** Chamada final: cartão com a foto ao fundo, o convite e um atalho para cada solução. */
export function Chamada() {
  return (
    <section className={styles.moldura} aria-labelledby="titulo-chamada">
      <div className={`${styles.chamada} sobre-escuro`}>
        <Imagem id="chamada-final" tom="escuro" preencher qualidade={90} sizes="(max-width: 767px) 240vw, 100vw" />
        <div className={styles.chamadaSombra} aria-hidden="true" />
        <div className={styles.chamadaCorpo}>
          <h2 id="titulo-chamada" className={styles.chamadaTitulo}>
            Pronto para entregar mais rápido?
          </h2>
          <p className={styles.chamadaTexto}>{contatoSecao.texto}</p>
          <ul className={styles.chamadaLista} data-atalhos="">
            {servicos.map((s) => (
              <li key={s.slug}>
                <Link href={`/servicos/${s.slug}/`}>
                  {s.nome}
                  <ArrowUpRight aria-hidden="true" size={18} />
                </Link>
              </li>
            ))}
          </ul>
          <div className="botoes">
            <Pilula href="/#contato">Pedir cotação</Pilula>
            <Pilula href={linkWhatsApp} externo clara>
              Falar no WhatsApp
            </Pilula>
          </div>
          <p className={styles.chamadaContato}>
            Comercial: {contatos.comercial.telefone} · {contatos.comercial.email}
          </p>
        </div>
      </div>
    </section>
  );
}
