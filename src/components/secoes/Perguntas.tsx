import { JsonLd } from '@/components/JsonLd';
import { contatos } from '@/data/empresa';
import type { Pergunta } from '@/data/servicos';
import { perguntasFrequentes } from '@/lib/jsonld';
import styles from './secoes.module.css';

type Props = { perguntas: Pergunta[]; titulo?: string };

/** Perguntas frequentes visíveis e, com o mesmo texto, em JSON-LD FAQPage. */
export function Perguntas({ perguntas, titulo = 'Respostas rápidas para as dúvidas mais comuns' }: Props) {
  return (
    <section className="secao" aria-labelledby="titulo-perguntas" data-perguntas="">
      <div className={`conteudo ${styles.perguntas}`}>
        <div className={styles.perguntasCabeca}>
          <p className="rotulo">Perguntas frequentes</p>
          <h2 id="titulo-perguntas" className="titulo">
            {titulo}
          </h2>
          <p className="texto-suave">
            Não achou o que procurava? Escreva para{' '}
            <a className="link" href={`mailto:${contatos.comercial.email}`}>
              {contatos.comercial.email}
            </a>
            .
          </p>
        </div>
        <div className={styles.perguntasLista}>
          {perguntas.map((p) => (
            <details key={p.pergunta} className={styles.pergunta}>
              <summary>
                <h3>{p.pergunta}</h3>
              </summary>
              <p className="texto-suave">{p.resposta}</p>
            </details>
          ))}
        </div>
      </div>
      <JsonLd dados={perguntasFrequentes(perguntas)} />
    </section>
  );
}
