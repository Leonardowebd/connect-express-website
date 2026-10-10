import Link from 'next/link';
import { Revelar } from '@/animacoes/Revelar';
import { Imagem } from '@/components/Imagem/Imagem';
import { servicos } from '@/data/servicos';
import { Botao } from './Botao';
import styles from './c.module.css';

/** Solução principal em destaque, com as outras três em blocos de foto. */
export function DestaqueC() {
  const [principal, ...outras] = servicos;
  return (
    <section className="secao" aria-labelledby="titulo-destaque-c">
      <div className="conteudo">
        <div className={styles.cabeca}>
          <h2 id="titulo-destaque-c" className={styles.titulo}>
            Tudo pronto para a entrega de saúde
          </h2>
          <Botao href="/c/#servicos" tipo="contorno">
            Todas as soluções
          </Botao>
        </div>
        <ul className={styles.fichas} aria-label="Modelos de entrega">
          <li>Expressa em até 3 horas</li>
          <li>D-1</li>
          <li>D1 e D2 para e-commerce</li>
        </ul>

        <Revelar className={styles.destaque}>
          <Imagem id={principal.imagem} sizes="(min-width: 1024px) 50vw, 100vw" className={styles.arredondada} />
          <div className={styles.destaqueCartao}>
            <h3>{principal.nome}</h3>
            <p className="texto-suave">{principal.resumo}</p>
            <ul className={styles.marcadores}>
              {principal.inclui.slice(0, 4).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <Botao href={`/servicos/${principal.slug}/`}>
              Ver solução<span className="so-leitor">: {principal.nome}</span>
            </Botao>
          </div>
        </Revelar>

        <Revelar emSequencia className={styles.trio}>
          {outras.map((s) => (
            <Link key={s.slug} href={`/servicos/${s.slug}/`} className={`${styles.trioItem} sobre-escuro`}>
              <Imagem id={s.imagem} tom="escuro" preencher sizes="(min-width: 768px) 33vw, 100vw" />
              <span className={styles.trioRotulo}>{s.nome}</span>
            </Link>
          ))}
        </Revelar>
      </div>
    </section>
  );
}
