import { Revelar } from '@/animacoes/Revelar';
import { solucoes } from '@/data/inicio';
import { servicos } from '@/data/servicos';
import { Botao } from './Botao';
import styles from './c.module.css';

export function SolucoesC() {
  return (
    <section id="servicos" className="secao" aria-labelledby="titulo-solucoes-c">
      <div className="conteudo">
        <div className={styles.cabeca}>
          <h2 id="titulo-solucoes-c" className={styles.titulo}>
            {solucoes.titulo}
          </h2>
          <Botao href="/c/#contato">Pedir cotação</Botao>
        </div>
        <Revelar emSequencia className={styles.grade}>
          {servicos.map((s, i) => (
            <article key={s.slug} className={styles.cartao} data-solucao={s.slug}>
              <div className={styles.cartaoTopo}>
                <p className={styles.cartaoSelo} aria-hidden="true">
                  0{i + 1}
                </p>
                <p className={styles.etiqueta}>{s.etiqueta}</p>
              </div>
              <h3>{s.nome}</h3>
              <p className="texto-suave">{s.resumo}</p>
              <Botao href={`/servicos/${s.slug}/`} tipo={i === 0 ? 'acao' : 'contorno'}>
                Ver solução<span className="so-leitor">: {s.nome}</span>
              </Botao>
            </article>
          ))}
        </Revelar>
      </div>
    </section>
  );
}
