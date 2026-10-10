import { Revelar } from '@/animacoes/Revelar';
import { Imagem } from '@/components/Imagem/Imagem';
import { operacao, quemSomos } from '@/data/inicio';
import { Botao } from './Botao';
import styles from './c.module.css';

export function SobMedidaC() {
  return (
    <section className={styles.moldura} aria-labelledby="titulo-medida-c">
      <div className={styles.painel}>
        <div className={styles.painelTexto}>
          <h2 id="titulo-medida-c" className={styles.titulo}>
            Uma operação feita para a última milha da saúde
          </h2>
          <p className="texto-suave">{quemSomos.paragrafos[1]}</p>
          <Revelar emSequencia className={styles.mini}>
            {operacao.itens.map((item, i) => (
              <article key={item.titulo} className={styles.miniCartao}>
                <p className={styles.miniSelo} aria-hidden="true">
                  {i + 1}
                </p>
                <div>
                  <h3>{item.titulo}</h3>
                  <p className="texto-suave">{item.texto}</p>
                </div>
              </article>
            ))}
          </Revelar>
          <Botao href="/c/#contato">Pedir cotação</Botao>
        </div>
        <div className={styles.colagem}>
          <Imagem id="quem-somos" sizes="(min-width: 1024px) 40vw, 100vw" className={`${styles.arredondada} ${styles.colagemGrande}`} />
          <Imagem id="desafio-volume" sizes="(min-width: 1024px) 20vw, 50vw" className={styles.arredondada} />
          <div className={styles.metrica}>
            <p className={styles.metricaValor}>3h</p>
            <p>da farmácia à casa do paciente, na entrega expressa</p>
          </div>
        </div>
      </div>
    </section>
  );
}
