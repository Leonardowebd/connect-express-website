import Link from 'next/link';
import { Imagem } from '@/components/Imagem/Imagem';
import { clientes } from '@/data/empresa';
import { heroi } from '@/data/inicio';
import styles from './secoes.module.css';

export function Heroi() {
  return (
    <section className={`${styles.heroi} sobre-escuro`} aria-labelledby="titulo-heroi">
      <Imagem id="heroi-inicio" tom="escuro" preencher sizes="100vw" />
      <div className={styles.heroiVeu} aria-hidden="true" />
      <div className={`conteudo ${styles.heroiGrade}`}>
        <h1 id="titulo-heroi" className={styles.heroiTitulo}>
          {heroi.titulo.map((linha) => (
            <span key={linha}>{linha} </span>
          ))}
        </h1>

        <div className={styles.heroiLado}>
          <p className={styles.heroiTexto}>
            {heroi.texto.map((parte, i) =>
              parte.destaque ? (
                <strong key={i} className="destaque">
                  {parte.t}
                </strong>
              ) : (
                parte.t
              ),
            )}
          </p>
          <div className="botoes">
            <Link href="/#contato" className="botao botao-acao">
              Pedir cotação
            </Link>
            <Link href="/#servicos" className="botao botao-contorno">
              Conhecer as soluções
            </Link>
          </div>
        </div>

        <div className={styles.heroiClientes}>
          <p className={styles.heroiRotulo}>Quem já entrega com a Connect</p>
          <ul>
            {clientes.slice(0, 6).map((nome) => (
              <li key={nome}>{nome}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
