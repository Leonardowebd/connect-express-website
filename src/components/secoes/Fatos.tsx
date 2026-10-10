import Image from 'next/image';
import { Contador } from '@/animacoes/Contador';
import { Revelar } from '@/animacoes/Revelar';
import { clientes, numeros } from '@/data/empresa';
import { quemSomos } from '@/data/inicio';
import { DesfoqueGradual } from '@/efeitos/DesfoqueGradual';
import styles from './secoes.module.css';

export function Fatos() {
  return (
    <section className="secao" aria-labelledby="titulo-fatos">
      <div className="conteudo">
        <div className={styles.fatos}>
          <div className={styles.fatosTexto}>
            <p className={styles.rotulo}>Fatos rápidos</p>
            <h2 id="titulo-fatos" className={styles.titulo}>
              A confiança de mais de 100 farmácias, todos os dias
            </h2>
            <p className="texto-suave">{quemSomos.chamada}</p>
          </div>
          <Revelar emSequencia>
            <dl className={styles.fatosNumeros} data-numeros="">
              {numeros.map((n) => (
                <div key={n.legenda} data-indicador="">
                  <dt>{n.legenda}</dt>
                  <dd>
                    <Contador valor={n.valor} prefixo={n.prefixo} sufixo={n.sufixo} />
                  </dd>
                </div>
              ))}
            </dl>
          </Revelar>
        </div>

        <div className={styles.faixa}>
          <h3 className="so-leitor">Clientes atendidos</h3>
          {/* Uma linha só, em movimento contínuo. A segunda lista é cópia, só para o laço não ter emenda. */}
          <div className={styles.faixaTrilho}>
            <ul data-clientes="">
              {clientes.map((c) => (
                <li key={c.nome}>
                  <Image src={c.logo} alt={c.nome} width={500} height={500} sizes="144px" />
                </li>
              ))}
            </ul>
            <ul aria-hidden="true">
              {clientes.map((c) => (
                <li key={c.nome}>
                  <Image src={c.logo} alt="" width={500} height={500} sizes="144px" />
                </li>
              ))}
            </ul>
          </div>
          <DesfoqueGradual posicao="left" tamanho="4.5rem" forca={1.4} camadas={4} />
          <DesfoqueGradual posicao="right" tamanho="4.5rem" forca={1.4} camadas={4} />
        </div>
      </div>
    </section>
  );
}
