import { Imagem } from '@/components/Imagem/Imagem';
import { DesfoqueGradual } from '@/efeitos/DesfoqueGradual';
import { heroi } from '@/data/inicio';
import { Pilula } from './Pilula';
import styles from './secoes.module.css';

export function Heroi() {
  return (
    <section className={styles.moldura} aria-labelledby="titulo-heroi">
      <div className={`${styles.heroi} sobre-escuro`}>
        {/* No celular a foto é cortada em pé e fica mais larga que a tela: "sizes" avisa o navegador. */}
        <Imagem id="heroi-inicio" tom="escuro" preencher qualidade={90} sizes="(max-width: 767px) 240vw, 100vw" />
        <div className={styles.heroiSombra} aria-hidden="true" />
        <DesfoqueGradual posicao="top" tamanho="8rem" forca={1.6} camadas={4} />
        <DesfoqueGradual posicao="bottom" tamanho="9rem" forca={2} camadas={5} exponencial />
        <div className={styles.grao} aria-hidden="true" />
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
