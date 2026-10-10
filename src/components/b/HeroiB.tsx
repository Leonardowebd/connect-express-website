import { Imagem } from '@/components/Imagem/Imagem';
import { heroi } from '@/data/inicio';
import { Pilula } from './Pilula';
import styles from './b.module.css';

export function HeroiB() {
  return (
    <section className={styles.moldura} aria-labelledby="titulo-heroi-b">
      <div className={`${styles.heroi} sobre-escuro`}>
        <Imagem id="heroi-inicio" tom="escuro" preencher sizes="100vw" />
        <div className={styles.heroiCaixa}>
          <h1 id="titulo-heroi-b" className={styles.heroiTitulo}>
            {heroi.titulo.join(' ')}
          </h1>
          <p>
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
            <Pilula href="/b/#contato">Pedir cotação</Pilula>
            <Pilula href="/b/#servicos" clara>
              Conhecer as soluções
            </Pilula>
          </div>
        </div>
      </div>
    </section>
  );
}
