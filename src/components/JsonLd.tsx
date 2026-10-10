/** Dados estruturados em JSON-LD. O conteúdo vem de src/lib/jsonld.ts, nunca do visitante. */
export function JsonLd({ dados }: { dados: object }) {
  const json = JSON.stringify(dados).replace(/</g, '\\u003c');
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
