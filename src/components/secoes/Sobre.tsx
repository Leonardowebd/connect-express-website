import { Cpu, HandHeart, Handshake, Heartbeat, ShieldCheck, Timer } from '@phosphor-icons/react/dist/ssr';
import { Revelar } from '@/animacoes/Revelar';
import { Imagem } from '@/components/Imagem/Imagem';
import { quemSomos, valores } from '@/data/inicio';
import { TextoRevelado } from '@/efeitos/TextoRevelado';
import { TrocaPixel } from '@/efeitos/TrocaPixel';
import styles from './secoes.module.css';

const ICONES_DOS_VALORES = [Heartbeat, ShieldCheck, Timer, Cpu, Handshake, HandHeart];

export function Sobre() {
  return (
    <section id="sobre" className="secao" aria-labelledby="titulo-sobre">
      <div className="conteudo">
        <div className={styles.cabecaDupla}>
          <div>
            <p className={styles.rotulo}>{quemSomos.rotulo}</p>
            <h2 id="titulo-sobre" className={styles.titulo}>
              {quemSomos.titulo}
            </h2>
          </div>
        </div>

        <TextoRevelado className={styles.declaracao}>{quemSomos.declaracao}</TextoRevelado>

        <Revelar className={styles.sobre}>
          <div className={styles.sobreTroca}>
            <TrocaPixel
              rotulo="Alternar entre a foto da equipe e os números da operação"
              proporcao="3 / 2"
              padrao="diagonal"
              aleatoriedade={0.35}
              primeiro={<Imagem id="quem-somos" preencher sizes="(min-width: 1024px) 45vw, 100vw" />}
              segundo={
                <dl className={styles.sobreFatos}>
                  {quemSomos.fatos.map((f) => (
                    <div key={f.legenda}>
                      <dt>{f.legenda}</dt>
                      <dd>{f.valor}</dd>
                    </div>
                  ))}
                </dl>
              }
            />
            <p className={styles.dica}>Toque na imagem para ver os números.</p>
          </div>
          <div className="prosa texto-suave">
            {quemSomos.paragrafos.slice(0, 1).map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </Revelar>

        <h3 className={styles.subtituloSecao}>{valores.titulo}</h3>
        <Revelar emSequencia className={styles.valores}>
          {valores.itens.map((v, i) => {
            const Icone = ICONES_DOS_VALORES[i % ICONES_DOS_VALORES.length];
            return (
              <article key={v.titulo} className={styles.cartao} data-valor="">
                <Icone aria-hidden="true" weight="duotone" size={32} className={styles.icone} />
                <h4>{v.titulo}</h4>
                <p>{v.texto}</p>
              </article>
            );
          })}
        </Revelar>
      </div>
    </section>
  );
}
