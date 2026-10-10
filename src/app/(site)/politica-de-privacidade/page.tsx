import { contatos, empresa, enderecos } from '@/data/empresa';
import { metadados } from '@/lib/metadados';
import styles from '../paginas.module.css';

export const metadata = metadados({
  titulo: 'Política de Privacidade | Connect Express Log',
  descricao:
    'Saiba quais dados pessoais a Connect Express Log coleta pelos formulários do site, para que usa, por quanto tempo guarda e como exercer seus direitos.',
  caminho: '/politica-de-privacidade/',
});

// Texto-base para revisão do cliente ou do jurídico dele antes da publicação
// (pergunta em aberto Q-006 da especificação).
export default function PoliticaDePrivacidade() {
  const matriz = enderecos[0];
  return (
    <section className="secao" aria-labelledby="titulo-politica">
      <div className="conteudo">
        <div className="cabeca">
          <p className="rotulo">Privacidade</p>
          <h1 id="titulo-politica" className="titulo">
            Política de Privacidade
          </h1>
        </div>
        <div className={styles.documento}>
          <div>
            <h2>Quem é responsável pelos seus dados</h2>
            <p>
              O site é mantido por {empresa.razaoSocial}, que usa a marca {empresa.nome}, CNPJ {empresa.cnpj}, com sede
              em {matriz.rua}, {matriz.bairro}, {matriz.cidade}, {matriz.uf}, CEP {matriz.cep}.
            </p>
          </div>
          <div>
            <h2>Quais dados coletamos</h2>
            <p>Coletamos apenas os dados que você informa nos formulários do site:</p>
            <ul>
              <li>Formulário de contato: nome, empresa, e-mail, telefone e a mensagem que você escrever.</li>
              <li>Formulário de vagas: nome, cidade, e-mail, área de atuação e telefone.</li>
            </ul>
            <p>O site não usa cookies de medição nem de publicidade.</p>
          </div>
          <div>
            <h2>Para que usamos</h2>
            <p>
              Usamos os dados do formulário de contato para responder ao seu pedido de cotação ou à sua dúvida. Usamos os
              dados do formulário de vagas para avaliar sua candidatura e entrar em contato sobre ela.
            </p>
          </div>
          <div>
            <h2>Com quem compartilhamos</h2>
            <p>
              Os dados são acessados pela equipe da {empresa.nome} e por fornecedores de tecnologia que hospedam o site e
              entregam as mensagens, apenas para essa finalidade. Não vendemos dados pessoais.
            </p>
          </div>
          <div>
            <h2>Por quanto tempo guardamos</h2>
            <p>
              Guardamos os dados pelo tempo necessário para atender ao seu pedido e cumprir obrigações legais. Depois
              disso, eles são eliminados.
            </p>
          </div>
          <div>
            <h2>Seus direitos</h2>
            <p>
              A Lei Geral de Proteção de Dados (Lei 13.709/2018) garante a você o direito de confirmar se tratamos seus
              dados, acessar, corrigir, pedir a eliminação e revogar o consentimento.
            </p>
            <p>
              Para exercer esses direitos, escreva para{' '}
              <a className="link" href={`mailto:${contatos.sac.email}`}>
                {contatos.sac.email}
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
