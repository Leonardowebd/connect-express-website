import type { MetadataRoute } from 'next';
import { URL_SITE } from '@/data/empresa';
import { servicos } from '@/data/servicos';

export default function sitemap(): MetadataRoute.Sitemap {
  const caminhos = ['/', ...servicos.map((s) => `/servicos/${s.slug}/`), '/trabalhe-conosco/', '/politica-de-privacidade/'];
  return caminhos.map((caminho) => ({
    url: `${URL_SITE}${caminho}`,
    changeFrequency: 'monthly',
    priority: caminho === '/' ? 1 : 0.8,
  }));
}

// Necessário para gerar o arquivo no modo de site estático (Hostinger).
export const dynamic = 'force-static';
