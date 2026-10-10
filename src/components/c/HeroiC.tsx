import Image from 'next/image';
import Link from 'next/link';
import { MenuCelular } from '@/components/Cabecalho/MenuCelular';
import { Imagem } from '@/components/Imagem/Imagem';
import { empresa } from '@/data/empresa';
import { heroi } from '@/data/inicio';
import { Botao } from './Botao';
import styles from './c.module.css';

// Na versão C o cabeçalho mora dentro do cartão do herói.
const itens = [
  { rotulo: 'Início', href: '/c/' },
  { rotulo: 'Quem Somos', href: '/#sobre' },
  { rotulo: 'Soluções', href: '/c/#servicos' },
  { rotulo: 'Cobertura', href: '/c/#cobertura' },
  { rotulo: 'Contato', href: '/c/#contato' },
];

const atalhos = [
  { rotulo: 'Rastreie seu pedido', href: empresa.urlRastreio, externo: true },
  { rotulo: 'Trabalhe conosco', href: '/trabalhe-conosco/' },
];

export function HeroiC() {
  return (
    <div className={styles.moldura}>
      <div className={`${styles.heroi} sobre-escuro`}>
        <Imagem id="heroi-inicio" tom="escuro" preencher sizes="100vw" />

        <header className={styles.topo}>
          <Link href="/c/" className={styles.topoLogo} aria-label={`${empresa.nome}, página inicial`}>
            <Image
              src="/logos/logo-connect-express-log-claro.png"
              alt={empresa.nome}
              width={900}
              height={486}
              sizes="120px"
              priority
            />
          </Link>
          <nav className={styles.topoNav} aria-label="Principal">
            <ul>
              {itens.map((item) => (
                <li key={item.rotulo}>
                  <Link href={item.href}>{item.rotulo}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <ul className={styles.topoAcoes}>
            {atalhos.map((item) => (
              <li key={item.href}>
                <a href={item.href} {...(item.externo ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                  {item.rotulo}
                </a>
              </li>
            ))}
            <li>
              <Botao href="/c/#contato" tipo="claro">
                Pedir cotação
              </Botao>
            </li>
          </ul>
          <div className={styles.topoMenu}>
            <MenuCelular itens={[...itens, ...atalhos]} cotacao="/c/#contato" />
          </div>
        </header>

        <section className={styles.heroiTexto} aria-labelledby="titulo-heroi-c">
          <h1 id="titulo-heroi-c">{heroi.titulo.join(' ')}</h1>
          <p>
            {heroi.texto.map((parte, i) =>
              parte.destaque ? (
                <strong key={i} className="destaque">
                  {parte.t}
                </strong>
              ) : (
                parte.t
              ),
            )}
          </p>
          <div className={styles.heroiBotoes}>
            <Botao href="/c/#contato">Pedir cotação</Botao>
            <Botao href="/c/#servicos" tipo="claro">
              Conhecer as soluções
            </Botao>
          </div>
        </section>

        <p className={styles.letreiroHeroi} aria-hidden="true">
          Connect
        </p>
      </div>
    </div>
  );
}
