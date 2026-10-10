import { Imagem } from '@/components/Imagem/Imagem';
import { DesfoqueGradual } from '@/efeitos/DesfoqueGradual';
import { heroi } from '@/data/inicio';
import { Pilula } from './Pilula';
import styles from './secoes.module.css';

export function Heroi() {
  return (
    <section className={styles.moldura} aria-labelledby="titulo-heroi">
      <div className={`${styles.heroi} sobre-escuro`}>
        <Imagem id="heroi-inicio" tom="escuro" preencher sizes="100vw" />
        <DesfoqueGradual posicao="bottom" tamanho="9rem" forca={2} camadas={5} exponencial />
        <div className={styles.heroiCaixa}>
          <h1 id="titulo-heroi" className={styles.heroiTitulo}>
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
            <Pilula href="/#contato">Pedir cotação</Pilula>
            <Pilula href="/#servicos" clara>
              Conhecer as soluções
            </Pilula>
          </div>
        </div>
      </div>
    </section>
  );
}
