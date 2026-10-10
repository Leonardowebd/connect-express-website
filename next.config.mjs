// Cabeçalhos de segurança, cache e formatos de imagem.
// Regras e justificativas: .claude/skills/connect-security e connect-performance.

// O site só fica visível para buscadores depois do lançamento no domínio
// oficial: defina SITE_NO_AR=sim na Vercel quando o cliente aprovar.
const noAr = process.env.VERCEL_ENV === 'production' && process.env.SITE_NO_AR === 'sim';

// O App Router embute scripts de hidratação no HTML. Páginas estáticas não
// podem usar nonce, então script-src aceita 'unsafe-inline'. style-src aceita
// 'unsafe-inline' porque o GSAP anima por estilo embutido no elemento.
export const politicaDeConteudo = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "connect-src 'self'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  'upgrade-insecure-requests',
].join('; ');

export const cabecalhosDeSeguranca = [
  { key: 'Content-Security-Policy', value: politicaDeConteudo },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=()' },
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
];

// Na Hostinger (hospedagem compartilhada, sem Node) o site vai como arquivos
// estáticos: "npm run hostinger" liga este modo. Lá não existe otimização de
// imagem sob demanda, e os cabeçalhos de segurança vão pelo .htaccess.
const hostinger = process.env.HOSPEDAGEM === 'hostinger';

/** @type {import('next').NextConfig} */
const nextConfig = hostinger
  ? { output: 'export', trailingSlash: true, poweredByHeader: false, images: { unoptimized: true } }
  : {
  trailingSlash: true,
  poweredByHeader: false,
  images: { formats: ['image/avif', 'image/webp'], qualities: [75, 90] },
  async headers() {
    const cabecalhos = [...cabecalhosDeSeguranca];
    // Pré-visualizações e o endereço vercel.app, antes do lançamento, não podem ser indexados.
    if (!noAr) cabecalhos.push({ key: 'X-Robots-Tag', value: 'noindex, nofollow' });
    return [{ source: '/:path*', headers: cabecalhos }];
  },
};

export default nextConfig;
