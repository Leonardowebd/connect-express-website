import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Revelar } from '@/animacoes/Revelar';
import { Imagem } from '@/components/Imagem/Imagem';
import { JsonLd } from '@/components/JsonLd';
import { Perguntas } from '@/components/secoes/Perguntas';
import { TOTAL_ESTADOS, contatos, estados, linkWhatsApp } from '@/data/empresa';
import { buscarServico, servicos } from '@/data/servicos';
import { servico as servicoJsonLd, trilha } from '@/lib/jsonld';
import { metadados } from '@/lib/metadados';
import styles from './pagina.module.css';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export const generateStaticParams = () => servicos.map((s) => ({ slug: s.slug }));

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const s = buscarServico(slug);
  if (!s) return {};
  return metadados({ titulo: s.tituloPagina, descricao: s.descricaoPagina, caminho: `/servicos/${s.slug}/` });
}

export default async function PaginaDeSolucao({ params }: Props) {
  const { slug } = await params;
  const s = buscarServico(slug);
  if (!s) notFound();
  const outras = servicos.filter((o) => o.slug !== s.slug);

  return (
    <>
      <section className={`secao ${styles.topo}`} aria-labelledby="titulo-solucao">
        <div className="conteudo">
          <nav aria-label="Você está em" className={styles.trilha}>
            <ol>
              <li>
                <Link href="/">Início</Link>
              </li>
              <li>
                <Link href="/#servicos">Soluções</Link>
              </li>
              <li aria-current="page">{s.nomeCurto}</li>
            </ol>
          </nav>
          <div className={styles.topoGrade}>
            <div className={styles.topoTexto}>
              <p className="rotulo">{s.tipo}</p>
              <h1 id="titulo-solucao" className={styles.h1}>
                {s.nome}
              </h1>
              <p className="texto-g" data-definicao="">
                {s.definicao}
              </p>
              <div className="botoes">
                <Link href="/#contato" className="botao botao-acao">
                  Pedir cotação
                </Link>
                <a href={linkWhatsApp} className="botao botao-contorno" target="_blank" rel="noopener noreferrer">
                  Falar no WhatsApp
                </a>
              </div>
            </div>
            <Imagem id={s.imagem} sizes="(min-width: 1024px) 45vw, 100vw" />
          </div>
        </div>
      </section>

      <section className="secao secao-alt" aria-labelledby="titulo-inclui">
        <div className="conteudo">
          <div className="cabeca">
            <p className="rotulo">O que está incluído</p>
            <h2 id="titulo-inclui" className="titulo">
              O que a sua operação recebe
            </h2>
          </div>
          <Revelar className={styles.duas}>
            <ul className={styles.inclui} data-inclui="">
              {s.inclui.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className={styles.paraQuem}>
              <h3 className={styles.h3}>Para quem é</h3>
              <ul>
                {s.paraQuem.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>
          </Revelar>
        </div>
      </section>

      <section className="secao secao-escura" aria-labelledby="titulo-motivos">
        <div className="conteudo">
          <div className="cabeca">
            <p className="rotulo">Por que a Connect</p>
            <h2 id="titulo-motivos" className="titulo">
              Motivos para contratar
            </h2>
          </div>
          <Revelar emSequencia className={styles.motivos}>
            {s.motivos.map((m, i) => (
              <article key={m.titulo} className={styles.motivo} data-motivo="">
                <p className={styles.motivoNumero} aria-hidden="true">
                  0{i + 1}
                </p>
                <h3 className={styles.h3}>{m.titulo}</h3>
                <p className="texto-suave">{m.texto}</p>
              </article>
            ))}
          </Revelar>
        </div>
      </section>

      <section className="secao" aria-labelledby="titulo-onde">
        <div className="conteudo">
          <div className="cabeca">
            <p className="rotulo">Onde atuamos</p>
            <h2 id="titulo-onde" className="titulo">
              Operação em {TOTAL_ESTADOS} estados
            </h2>
          </div>
          <ul className={styles.estados} data-estados="">
            {estados.map((e) => (
              <li key={e.uf}>
                <abbr title={e.nome}>{e.uf}</abbr> {e.nome}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Perguntas perguntas={s.perguntas} titulo={`Dúvidas sobre ${s.nome.toLowerCase()}`} />

      <section className={`secao ${styles.final}`} aria-labelledby="titulo-final">
        <div className={`conteudo ${styles.finalGrade}`}>
          <h2 id="titulo-final" className="titulo">
            Vamos montar a operação da sua empresa?
          </h2>
          <div className={styles.finalLado}>
            <p className="texto-g">
              Fale com o comercial pelo telefone{' '}
              <a className="link" href={`tel:${contatos.comercial.telefoneLink}`}>
                {contatos.comercial.telefone}
              </a>{' '}
              ou peça uma cotação pelo formulário.
            </p>
            <Link href="/#contato" className="botao botao-acao">
              Pedir cotação
            </Link>
          </div>
          <div className={styles.outras}>
            <h3 className={styles.h3}>Outras soluções</h3>
            <ul>
              {outras.map((o) => (
                <li key={o.slug}>
                  <Link href={`/servicos/${o.slug}/`}>{o.nome}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <JsonLd dados={servicoJsonLd(s)} />
      <JsonLd dados={trilha(s)} />
    </>
  );
}
