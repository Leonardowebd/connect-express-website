import Image from 'next/image';
import Link from 'next/link';
import { MenuCelular } from '@/components/MenuCelular/MenuCelular';
import { empresa } from '@/data/empresa';
import { Pilula } from './Pilula';
import styles from './secoes.module.css';

// Navegação em pílulas. Na página inicial fica sobre a foto do herói;
// nas páginas internas, sobre fundo claro.
const itens = [
  { rotulo: 'Início', href: '/' },
  { rotulo: 'Quem Somos', href: '/#sobre' },
  { rotulo: 'Soluções', href: '/#servicos' },
  { rotulo: 'Cobertura', href: '/#cobertura' },
  { rotulo: 'Contato', href: '/#contato' },
];

const atalhos = [
  { rotulo: 'Rastreie seu pedido', href: empresa.urlRastreio, externo: true },
  { rotulo: 'Trabalhe conosco', href: '/trabalhe-conosco/' },
];

export function Cabecalho({ sobreFoto = false }: { sobreFoto?: boolean }) {
  const logo = sobreFoto ? '/logos/logo-connect-express-log-claro.png' : '/logos/logo-connect-express-log.png';
  return (
    <header className={sobreFoto ? `${styles.topo} sobre-escuro` : `${styles.topo} ${styles.topoSolido}`}>
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

      <Link href="/" className={styles.topoLogo} aria-label={`${empresa.nome}, página inicial`}>
        <Image
          src={logo}
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
          <Pilula href="/#contato">Pedir cotação</Pilula>
        </li>
      </ul>

      <div className={styles.topoMenu}>
        <MenuCelular itens={[...itens, ...atalhos]} cotacao="/#contato" />
      </div>
    </header>
  );
}
