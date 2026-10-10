import { Formulario } from '@/components/Formulario/Formulario';
import { contatos, empresa, linkWhatsApp } from '@/data/empresa';
import { metaVagas, requisitos, vantagens } from '@/data/vagas';
import { metadados } from '@/lib/metadados';
import { camposVagas } from '@/lib/validacao';
import styles from '../paginas.module.css';

export const metadata = metadados({ titulo: metaVagas.titulo, descricao: metaVagas.descricao, caminho: '/trabalhe-conosco/' });

export default function TrabalheConosco() {
  return (
    <>
      <section className="secao" aria-labelledby="titulo-vagas">
        <div className="conteudo">
          <div className="cabeca">
            <p className="rotulo">Trabalhe conosco</p>
            <h1 id="titulo-vagas" className="titulo">
              Entregue com a {empresa.nome}
            </h1>
          </div>
          <p className={`texto-g ${styles.abertura}`}>
            A {empresa.nome} recebe candidaturas para entregas, transporte, logística e administrativo. São mais de 15
            anos de operação e cerca de 450 motoboys entregando todos os dias.
          </p>
        </div>
      </section>

      <section className="secao secao-alt" aria-labelledby="titulo-vantagens">
        <div className="conteudo">
          <div className="cabeca">
            <p className="rotulo">Vantagens</p>
            <h2 id="titulo-vantagens" className="titulo">
              Por que entregar com a Connect
            </h2>
          </div>
          <ul className={styles.tres} data-vantagens="">
            {vantagens.map((v) => (
              <li key={v.titulo} className={styles.cartao}>
                <h3 className={styles.h3}>{v.titulo}</h3>
                <p className="texto-suave">{v.texto}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="secao" aria-labelledby="titulo-requisitos">
        <div className={`conteudo ${styles.duas}`}>
          <div className={styles.coluna}>
            <p className="rotulo">Requisitos</p>
            <h2 id="titulo-requisitos" className="titulo">
              O que você precisa para ser entregador
            </h2>
            <ol className={styles.requisitos} data-requisitos="">
              {requisitos.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ol>
            <p className="texto-suave">
              Para outras áreas, preencha o formulário e, se quiser, envie seu currículo para{' '}
              <a className="link" href={`mailto:${contatos.vagas.email}`}>
                {contatos.vagas.email}
              </a>
              .
            </p>
          </div>
          <div className={styles.painel}>
            <h2 className={styles.h3}>Preencha seus dados</h2>
            <Formulario
              campos={camposVagas}
              destino="/api/vagas/"
              textoBotao="Enviar cadastro"
              sucesso="Recebemos seu cadastro. A equipe vai entrar em contato."
              alternativa={{ whatsapp: linkWhatsApp, email: contatos.vagas.email }}
            />
          </div>
        </div>
      </section>
    </>
  );
}
