import { TOTAL_ESTADOS, estados } from '@/data/empresa';
import { cobertura } from '@/data/inicio';
import { MapaCobertura } from '@/efeitos/MapaCobertura';
import styles from './secoes.module.css';

/** Cobertura em seção inteira: globo fixo sobre o Brasil, com as rotas em movimento discreto. */
export function CoberturaImersiva({ nivelDoTitulo = 2 }: { nivelDoTitulo?: 1 | 2 }) {
  const Titulo = nivelDoTitulo === 1 ? 'h1' : 'h2';
  return (
    <section id="cobertura" aria-labelledby="titulo-cobertura" className="sobre-escuro">
      <MapaCobertura modo="globo" estados={[...estados]} total={TOTAL_ESTADOS}>
        <p className={styles.rotulo}>{cobertura.rotulo}</p>
        <Titulo id="titulo-cobertura" className={styles.titulo}>
          {cobertura.titulo}
        </Titulo>
        <p>{cobertura.texto}</p>
      </MapaCobertura>
    </section>
  );
}
