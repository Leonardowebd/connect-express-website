import styles from './efeitos.module.css';

// Surgir em pixels: uma grade de blocos escuros cobre a mídia e se desfaz em
// ordem aleatória quando a página abre. Adaptado do PixelSwap do React Bits
// (padrão "random", com fade e escala de 0,35), reduzido a CSS: é componente
// de servidor, sem JavaScript no navegador. A mídia por baixo já está pintada,
// então o efeito não atrasa o carregamento da foto.

type Props = {
  celulas?: number;
  /** Tempo total até o último bloco começar a sumir, em ms. */
  duracao?: number;
  /** Tempo de cada bloco, em ms. */
  duracaoDoBloco?: number;
};

/** Ordem embaralhada, mas igual em todo build (sem Math.random, para o HTML ser estável). */
function atraso(i: number, total: number) {
  return ((i * 37 + 11) % total) / total;
}

export function SurgirEmPixels({ celulas = 80, duracao = 950, duracaoDoBloco = 450 }: Props) {
  return (
    <div className={styles.surgir} data-efeito="surgir-em-pixels" aria-hidden="true">
      {Array.from({ length: celulas }, (_, i) => (
        <i
          key={i}
          style={{
            animationDelay: `${Math.round(atraso(i, celulas) * duracao)}ms`,
            animationDuration: `${duracaoDoBloco}ms`,
          }}
        />
      ))}
    </div>
  );
}
