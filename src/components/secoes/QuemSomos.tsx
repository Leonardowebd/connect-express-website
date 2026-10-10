import Link from 'next/link';
import { Revelar } from '@/animacoes/Revelar';
import { Imagem } from '@/components/Imagem/Imagem';
import { quemSomos } from '@/data/inicio';
import styles from './secoes.module.css';

export function QuemSomos() {
  return (
    <section id="sobre" className={`secao ${styles.comLinha}`} aria-labelledby="titulo-sobre">
      <div className="conteudo">
        <div className="cabeca">
          <p className="rotulo">{quemSomos.rotulo}</p>
          <h2 id="titulo-sobre" className="titulo">
            {quemSomos.titulo}
          </h2>
        </div>
        <Revelar className={styles.sobre}>
          <div className={styles.sobreDetalhe}>
            <Imagem id="quem-somos-detalhe" sizes="(min-width: 1024px) 25vw, 60vw" />
          </div>
          <div className={styles.sobreTexto}>
            <Imagem id="quem-somos" sizes="(min-width: 1024px) 40vw, 100vw" />
            <p className="subtitulo">{quemSomos.chamada}</p>
            <div className="prosa texto-suave">
              {quemSomos.paragrafos.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <p>
              <Link href="/#servicos" className="link">
                Conhecer as soluções
              </Link>
            </p>
          </div>
        </Revelar>
      </div>
    </section>
  );
}
