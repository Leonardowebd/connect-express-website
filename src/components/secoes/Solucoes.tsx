import { Flask, Motorcycle, Package, Pill } from '@phosphor-icons/react/dist/ssr';
import { Revelar } from '@/animacoes/Revelar';
import { Imagem } from '@/components/Imagem/Imagem';
import { solucoes } from '@/data/inicio';
import { servicos } from '@/data/servicos';
import { ObservaPrevias } from '@/efeitos/ObservaPrevias';
import { Pilula } from './Pilula';
import styles from './secoes.module.css';

const ICONES: Record<string, typeof Pill> = {
  'entrega-expressa-de-medicamentos': Pill,
  'transporte-de-materiais-biologicos': Flask,
  'entregas-rapidas-com-motoboy': Motorcycle,
  'transporte-e-logistica-para-e-commerce': Package,
};

/**
 * Cada solução tem uma imagem de prévia.
 * Com mouse, ela surge inclinada sobre a linha ao passar o cursor ou focar.
 * Em tela de toque, fica dentro da linha e aparece com a rolagem.
 */
export function Solucoes() {
  return (
    <section id="servicos" className="secao" aria-labelledby="titulo-solucoes">
      <div className="conteudo">
        <div className={styles.cabeca}>
          <p className={styles.rotulo}>{solucoes.rotulo}</p>
          <h2 id="titulo-solucoes" className={styles.titulo}>
            {solucoes.titulo}
          </h2>
        </div>
        <ObservaPrevias>
          <Revelar emSequencia className={styles.linhas}>
            {servicos.map((s) => {
              const Icone = ICONES[s.slug] ?? Package;
              return (
              <article key={s.slug} className={styles.linha} data-solucao={s.slug}>
                <div className={styles.linhaTexto}>
                  <Icone aria-hidden="true" weight="duotone" size={36} className={styles.icone} />
                  <h3>{s.nome}</h3>
                  <p className="texto-suave">{s.resumo}</p>
                </div>
                <div className={styles.previa} data-previa="" aria-hidden="true">
                  <Imagem id={s.imagem} sizes="(min-width: 1024px) 18rem, 100vw" />
                </div>
                <Pilula href={`/servicos/${s.slug}/`}>
                  Ver solução<span className="so-leitor">: {s.nome}</span>
                </Pilula>
              </article>
              );
            })}
          </Revelar>
        </ObservaPrevias>
      </div>
    </section>
  );
}
