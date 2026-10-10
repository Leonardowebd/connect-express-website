import Image from 'next/image';
import Link from 'next/link';
import { contatos, empresa, enderecos, redes } from '@/data/empresa';
import { servicos } from '@/data/servicos';
import styles from './b.module.css';

export function RodapeB() {
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
            <p className="texto-suave">
              © {new Date().getFullYear()} {empresa.nome}. CNPJ {empresa.cnpj}.
            </p>
          </div>

          <div>
            <h2>Soluções</h2>
            <ul>
              {servicos.map((s) => (
                <li key={s.slug}>
                  <Link href={`/servicos/${s.slug}/`}>{s.nome}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2>Links úteis</h2>
            <ul>
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
            <h2>Fale conosco</h2>
            <ul>
              {[contatos.comercial, contatos.sac].map((c) => (
                <li key={c.rotulo}>
                  <a href={`tel:${c.telefoneLink}`}>
                    {c.rotulo}: {c.telefone}
                  </a>
                </li>
              ))}
              <li>
                <a href={`mailto:${contatos.comercial.email}`}>{contatos.comercial.email}</a>
              </li>
              {enderecos.map((e) => (
                <li key={e.tipo} className={styles.rodapeEndereco}>
                  {e.tipo}: {e.cidade} ({e.uf})
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className={styles.letreiro} aria-hidden="true">
          Connect Express
        </p>
      </div>
    </footer>
  );
}
