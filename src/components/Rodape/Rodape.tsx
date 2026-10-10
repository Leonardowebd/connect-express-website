import Image from 'next/image';
import Link from 'next/link';
import { contatos, empresa, enderecos, linkWhatsApp, navegacao, redes } from '@/data/empresa';
import { servicos } from '@/data/servicos';
import styles from './Rodape.module.css';

export function Rodape() {
  return (
    <footer className={styles.rodape}>
      <div className={`conteudo ${styles.grade}`}>
        <div className={`${styles.cartao} sobre-escuro`}>
          <Image
            src="/logos/logo-connect-express-log-claro.png"
            alt={empresa.nome}
            width={900}
            height={486}
            sizes="140px"
            className={styles.logo}
          />
          <p className={styles.cartaoTitulo}>Sua rede precisa entregar mais rápido?</p>
          <p className={styles.cartaoTexto}>Conte como é a sua operação e receba uma proposta.</p>
          <div className="botoes">
            <Link href="/#contato" className="botao botao-acao">
              Pedir cotação
            </Link>
            <a href={linkWhatsApp} className="botao botao-contorno" target="_blank" rel="noopener noreferrer">
              Falar no WhatsApp
            </a>
          </div>
        </div>

        <div className={styles.corpo}>
          <nav aria-label="Rodapé">
            <ul className={styles.nav}>
              {navegacao.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.rotulo}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.colunas}>
            <div>
              <h2 className={styles.titulo}>Soluções</h2>
              <ul className={styles.listaLinks}>
                {servicos.map((s) => (
                  <li key={s.slug}>
                    <Link href={`/servicos/${s.slug}/`}>{s.nome}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className={styles.titulo}>Links úteis</h2>
              <ul className={styles.listaLinks}>
                <li>
                  <a href={empresa.urlRastreio} target="_blank" rel="noopener noreferrer">
                    Rastreie seu pedido
                  </a>
                </li>
                <li>
                  <Link href="/trabalhe-conosco/">Trabalhe conosco</Link>
                </li>
                <li>
                  <Link href="/politica-de-privacidade/">Política de Privacidade</Link>
                </li>
                {redes.map((r) => (
                  <li key={r.url}>
                    <a href={r.url} target="_blank" rel="noopener noreferrer">
                      {r.nome}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className={styles.titulo}>Fale conosco</h2>
              <dl className={styles.contatos}>
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
            </div>

            <div>
              <h2 className={styles.titulo}>Onde estamos</h2>
              <ul className={styles.enderecos}>
                {enderecos.map((e) => (
                  <li key={e.tipo}>
                    <address>
                      <strong>{e.tipo}</strong>
                      <br />
                      {e.rua}
                      <br />
                      {e.bairro}, {e.cidade}, {e.uf}
                      <br />
                      CEP {e.cep}
                    </address>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className={styles.legal}>
            © {new Date().getFullYear()} {empresa.nome}. CNPJ {empresa.cnpj} ({empresa.razaoSocial}).
          </p>
        </div>
      </div>
    </footer>
  );
}
