import Image from 'next/image';
import Link from 'next/link';
import { MenuCelular } from '@/components/Cabecalho/MenuCelular';
import { empresa } from '@/data/empresa';
import { Pilula } from './Pilula';
import styles from './b.module.css';

// Na versão B a navegação fica sobre a foto do herói, em pílulas.
const itens = [
  { rotulo: 'Início', href: '/b/' },
  { rotulo: 'Quem Somos', href: '/#sobre' },
  { rotulo: 'Soluções', href: '/b/#servicos' },
  { rotulo: 'Cobertura', href: '/b/#cobertura' },
  { rotulo: 'Contato', href: '/b/#contato' },
];

const atalhos = [
  { rotulo: 'Rastreie seu pedido', href: empresa.urlRastreio, externo: true },
  { rotulo: 'Trabalhe conosco', href: '/trabalhe-conosco/' },
];

export function CabecalhoB() {
  return (
    <header className={`${styles.topo} sobre-escuro`}>
      <nav className={styles.topoNav} aria-label="Principal">
        <ul>
          {itens.map((item) => (
            <li key={item.rotulo}>
              <Link href={item.href} className={styles.vidro}>
                {item.rotulo}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <Link href="/b/" className={styles.topoLogo} aria-label={`${empresa.nome}, página inicial`}>
        <Image
          src="/logos/logo-connect-express-log-claro.png"
          alt={empresa.nome}
          width={900}
          height={486}
          sizes="120px"
          priority
        />
      </Link>

      <ul className={styles.topoAcoes}>
        {atalhos.map((item) => (
          <li key={item.href}>
            <a
              href={item.href}
              className={styles.vidro}
              {...(item.externo ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              {item.rotulo}
            </a>
          </li>
        ))}
        <li>
          <Pilula href="/b/#contato">Pedir cotação</Pilula>
        </li>
      </ul>

      <div className={styles.topoMenu}>
        <MenuCelular itens={[...itens, ...atalhos]} cotacao="/b/#contato" />
      </div>
    </header>
  );
}
