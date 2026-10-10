import Image from 'next/image';
import Link from 'next/link';
import { empresa, navegacao } from '@/data/empresa';
import { MenuCelular } from './MenuCelular';
import styles from './Cabecalho.module.css';

const atalhos = [
  { rotulo: 'Rastreie seu pedido', href: empresa.urlRastreio, externo: true },
  { rotulo: 'Trabalhe conosco', href: '/trabalhe-conosco/' },
];

export function Cabecalho() {
  return (
    <header className={styles.cabecalho}>
      <div className={`conteudo ${styles.linha}`}>
        <Link href="/" className={styles.logo} aria-label={`${empresa.nome}, página inicial`}>
          <Image
            src="/logos/logo-connect-express-log.png"
            alt={empresa.nome}
            width={900}
            height={486}
            sizes="120px"
            priority
          />
        </Link>

        <nav className={styles.nav} aria-label="Principal">
          <ul className={styles.lista}>
            {navegacao.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.rotulo}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <ul className={styles.atalhos}>
          {atalhos.map((item) => (
            <li key={item.href}>
              <a href={item.href} {...(item.externo ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                {item.rotulo}
              </a>
            </li>
          ))}
          <li>
            <Link href="/#contato" className="botao botao-acao">
              Pedir cotação
            </Link>
          </li>
        </ul>

        <MenuCelular itens={[...navegacao, ...atalhos]} cotacao="/#contato" />
      </div>
    </header>
  );
}
