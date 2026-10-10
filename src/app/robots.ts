import type { MetadataRoute } from 'next';
import { URL_SITE } from '@/data/empresa';

// Robôs de busca e de assistentes de IA liberados: o objetivo é ser citado.
const ROBOS_DE_IA = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-SearchBot',
  'PerplexityBot',
  'Google-Extended',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: '/api/' },
      { userAgent: ROBOS_DE_IA, allow: '/' },
    ],
    sitemap: `${URL_SITE}/sitemap.xml`,
    host: URL_SITE,
  };
}
