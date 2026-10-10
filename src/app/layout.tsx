import type { Metadata, Viewport } from 'next';
import { Geologica, Poppins } from 'next/font/google';
import { BotaoWhatsApp } from '@/components/BotaoWhatsApp';
import { JsonLd } from '@/components/JsonLd';
import { empresa } from '@/data/empresa';
import { organizacao } from '@/lib/jsonld';
import { metadataBase } from '@/lib/metadados';
import './globals.css';

// Fontes da identidade (Figma). O next/font baixa os arquivos no build e
// serve pelo próprio domínio.
const geologica = Geologica({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--fonte-geologica',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--fonte-poppins',
  preload: false,
});

export const metadata: Metadata = {
  metadataBase,
  applicationName: empresa.nome,
  icons: { icon: '/logos/logo-connect-express-log.png' },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${geologica.variable} ${poppins.variable}`}>
      <body>
        <a className="pular" href="#conteudo">
          Pular para o conteúdo
        </a>
        {children}
        <BotaoWhatsApp />
        <JsonLd dados={organizacao()} />
      </body>
    </html>
  );
}
