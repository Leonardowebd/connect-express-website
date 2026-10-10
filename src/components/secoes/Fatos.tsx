import Image from 'next/image';
import { Contador } from '@/animacoes/Contador';
import { Revelar } from '@/animacoes/Revelar';
import { clientes, numeros } from '@/data/empresa';
import { quemSomos } from '@/data/inicio';
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
          <ul data-clientes="">
            {clientes.map((c) => (
              <li key={c.nome}>
                <Image src={c.logo} alt={c.nome} width={500} height={500} sizes="112px" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
