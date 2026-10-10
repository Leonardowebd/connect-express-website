import { Formulario } from '@/components/Formulario/Formulario';
import { contatos, empresa, enderecos, linkWhatsApp } from '@/data/empresa';
import { contatoSecao } from '@/data/inicio';
import { camposContato } from '@/lib/validacao';
import styles from './secoes.module.css';

export function Contato() {
  return (
    <section id="contato" className={`secao ${styles.comLinha}`} aria-labelledby="titulo-contato">
      <div className="conteudo">
        <div className="cabeca">
          <p className="rotulo">{contatoSecao.rotulo}</p>
          <h2 id="titulo-contato" className="titulo">
            {contatoSecao.titulo}
          </h2>
        </div>
        <div className={styles.contato}>
          <div className={styles.contatoDados}>
            <p className="texto-g">{contatoSecao.texto}</p>
            <dl className={styles.contatoLista}>
              {[contatos.comercial, contatos.sac].map((c) => (
                <div key={c.rotulo}>
                  <dt>{c.rotulo}</dt>
                  <dd>
                    <a href={`tel:${c.telefoneLink}`}>{c.telefone}</a>
                  </dd>
                  <dd>
                    <a href={`mailto:${c.email}`}>{c.email}</a>
                  </dd>
                </div>
              ))}
            </dl>
            <p>
              <a href={linkWhatsApp} className="botao botao-contorno" target="_blank" rel="noopener noreferrer">
                Falar no WhatsApp
              </a>
            </p>
            <ul className={styles.contatoEnderecos}>
              {enderecos.map((e) => (
                <li key={e.tipo}>
                  <address>
                    <strong>{e.tipo}</strong>
                    <br />
                    {e.rua}, {e.bairro}
                    <br />
                    {e.cidade}, {e.uf}, CEP {e.cep}
                  </address>
                </li>
              ))}
            </ul>
            <p className="texto-suave">
              {empresa.nome}, CNPJ {empresa.cnpj}
            </p>
          </div>
          <div className={styles.contatoForm}>
            <Formulario
              campos={camposContato}
              destino="/api/contato/"
              textoBotao="Pedir cotação"
              sucesso="Recebemos sua mensagem. O comercial vai entrar em contato."
              alternativa={{ whatsapp: linkWhatsApp, email: contatos.comercial.email }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
