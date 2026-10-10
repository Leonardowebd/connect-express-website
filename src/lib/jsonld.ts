// Dados estruturados gerados dos mesmos dados que alimentam o texto visível.
import { URL_SITE, contatos, empresa, enderecos, estados, redes } from '@/data/empresa';
import type { Pergunta, Servico } from '@/data/servicos';

const ID_ORGANIZACAO = `${URL_SITE}/#organizacao`;

export function organizacao() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ID_ORGANIZACAO,
    name: empresa.nome,
    legalName: empresa.razaoSocial,
    taxID: empresa.cnpj,
    description: empresa.resumo,
    url: `${URL_SITE}/`,
    logo: `${URL_SITE}/logos/logo-connect-express-log.png`,
    telephone: contatos.comercial.telefoneLink,
    email: contatos.comercial.email,
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'sales',
        telephone: contatos.comercial.telefoneLink,
        email: contatos.comercial.email,
        availableLanguage: 'pt-BR',
      },
      {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        telephone: contatos.sac.telefoneLink,
        email: contatos.sac.email,
        availableLanguage: 'pt-BR',
      },
    ],
    address: enderecos.map((e) => ({
      '@type': 'PostalAddress',
      name: e.tipo,
      streetAddress: `${e.rua}, ${e.bairro}`,
      addressLocality: e.cidade,
      addressRegion: e.uf,
      postalCode: e.cep,
      addressCountry: 'BR',
    })),
    areaServed: estados.map((e) => ({ '@type': 'State', name: e.nome })),
    sameAs: redes.map((r) => r.url),
  };
}

export function site() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: empresa.nome,
    url: `${URL_SITE}/`,
    inLanguage: 'pt-BR',
    publisher: { '@id': ID_ORGANIZACAO },
  };
}

export function perguntasFrequentes(perguntas: Pergunta[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: perguntas.map((p) => ({
      '@type': 'Question',
      name: p.pergunta,
      acceptedAnswer: { '@type': 'Answer', text: p.resposta },
    })),
  };
}

export function servico(s: Servico) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: s.nome,
    serviceType: s.tipo,
    description: s.definicao,
    url: `${URL_SITE}/servicos/${s.slug}/`,
    provider: { '@type': 'Organization', '@id': ID_ORGANIZACAO, name: empresa.nome },
    areaServed: estados.map((e) => ({ '@type': 'State', name: e.nome })),
  };
}

export function trilha(s: Servico) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Início', item: `${URL_SITE}/` },
      { '@type': 'ListItem', position: 2, name: 'Soluções', item: `${URL_SITE}/#servicos` },
      { '@type': 'ListItem', position: 3, name: s.nome, item: `${URL_SITE}/servicos/${s.slug}/` },
    ],
  };
}
