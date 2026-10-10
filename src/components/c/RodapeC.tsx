import Image from 'next/image';
import Link from 'next/link';
import { contatos, empresa, enderecos, redes } from '@/data/empresa';
import { servicos } from '@/data/servicos';
import styles from './c.module.css';

export function RodapeC() {
  return (
    <footer className={styles.moldura}>
      <div className={`${styles.rodape} secao-escura`}>
        <div className={styles.rodapeGrade}>
          <div className={styles.rodapeMarca}>
            <Image
              src="/logos/logo-connect-express-log-claro.png"
              alt={empresa.nome}
              width={900}
              height={486}
              sizes="140px"
            />
            <p className="texto-suave">{empresa.resumo}</p>
            <ul>
              <li>
                <a href={`tel:${contatos.comercial.telefoneLink}`}>{contatos.comercial.telefone}</a>
              </li>
              <li>
                <a href={`mailto:${contatos.comercial.email}`}>{contatos.comercial.email}</a>
              </li>
              <li className={styles.rodapeLinha}>
                {enderecos[0].rua}, {enderecos[0].cidade} ({enderecos[0].uf})
              </li>
            </ul>
          </div>

          <div>
            <h2>Soluções</h2>
            <ul>
              {servicos.map((s) => (
                <li key={s.slug}>
                  <Link href={`/servicos/${s.slug}/`}>{s.nomeCurto}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2>Empresa</h2>
            <ul>
              <li>
                <Link href="/#sobre">Quem Somos</Link>
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
            <h2>Atendimento</h2>
            <ul>
              <li>
                <a href={empresa.urlRastreio} target="_blank" rel="noopener noreferrer">
                  Rastreie seu pedido
                </a>
              </li>
              <li>
                <Link href="/c/#contato">Pedir cotação</Link>
              </li>
              <li>
                <a href={`tel:${contatos.sac.telefoneLink}`}>SAC: {contatos.sac.telefone}</a>
              </li>
              <li>
                <a href={`mailto:${contatos.sac.email}`}>{contatos.sac.email}</a>
              </li>
            </ul>
          </div>
        </div>
        <p className={styles.letreiro} aria-hidden="true">
          Connect Express
        </p>
        <p className={styles.legal}>
          © {new Date().getFullYear()} {empresa.nome}. CNPJ {empresa.cnpj} ({empresa.razaoSocial}).
        </p>
      </div>
    </footer>
  );
}
