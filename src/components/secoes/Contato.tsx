import { Formulario } from '@/components/Formulario/Formulario';
import { contatos, empresa, enderecos, linkWhatsApp } from '@/data/empresa';
import { contatoSecao } from '@/data/inicio';
import { camposContato } from '@/lib/validacao';
import { Pilula } from './Pilula';
import styles from './secoes.module.css';

/** Cotação: cartão verde com os contatos diretos ao lado do formulário. */
export function Contato() {
  return (
    <section id="contato" className={styles.moldura} aria-labelledby="titulo-contato">
      <div className={styles.contato}>
        <div className={`${styles.contatoCartao} secao-escura`}>
          <div className={styles.contatoTopo}>
            <p className={styles.rotulo}>{contatoSecao.rotulo}</p>
            <h2 id="titulo-contato" className={styles.titulo}>
              {contatoSecao.titulo}
            </h2>
            <p className="texto-suave">{contatoSecao.texto}</p>
          </div>

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

          <Pilula href={linkWhatsApp} externo clara>
            Falar no WhatsApp
          </Pilula>

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
          <p className={styles.contatoLegal}>
            {empresa.nome}, CNPJ {empresa.cnpj}
          </p>
        </div>

        <div className={styles.contatoForm}>
          <h3 className={styles.contatoFormTitulo}>Conte sobre a sua operação</h3>
          <p className="texto-suave">Campos sem a palavra opcional são obrigatórios.</p>
          <Formulario
            campos={camposContato}
            destino="/api/contato/"
            textoBotao="Pedir cotação"
            sucesso="Recebemos sua mensagem. O comercial vai entrar em contato."
            alternativa={{ whatsapp: linkWhatsApp, email: contatos.comercial.email }}
          />
        </div>
      </div>
    </section>
  );
}
