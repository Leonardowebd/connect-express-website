// Dados do mapa de cobertura. Coordenadas em [longitude, latitude].
// As rotas são ilustrativas: ligam as bases aos estados atendidos para dar
// ideia de movimento, e não representam o trajeto real das cargas.

export const NOMES_UF: Record<string, string> = {
  AC: 'Acre', AL: 'Alagoas', AM: 'Amazonas', AP: 'Amapá', BA: 'Bahia', CE: 'Ceará', DF: 'Distrito Federal',
  ES: 'Espírito Santo', GO: 'Goiás', MA: 'Maranhão', MG: 'Minas Gerais', MS: 'Mato Grosso do Sul',
  MT: 'Mato Grosso', PA: 'Pará', PB: 'Paraíba', PE: 'Pernambuco', PI: 'Piauí', PR: 'Paraná',
  RJ: 'Rio de Janeiro', RN: 'Rio Grande do Norte', RO: 'Rondônia', RR: 'Roraima', RS: 'Rio Grande do Sul',
  SC: 'Santa Catarina', SE: 'Sergipe', SP: 'São Paulo', TO: 'Tocantins',
};

export type BaseDoMapa = { uf: string; cidade: string; tipo: string; ll: [number, number]; principal?: boolean };

export const basesDoMapa: BaseDoMapa[] = [
  { uf: 'BA', cidade: 'Lauro de Freitas', tipo: 'Matriz', ll: [-38.32, -12.89], principal: true },
  { uf: 'SP', cidade: 'São Paulo', tipo: 'Filial e centro de distribuição', ll: [-46.66, -23.5] },
  { uf: 'RJ', cidade: 'Rio de Janeiro', tipo: 'Centro de distribuição', ll: [-43.2, -22.91] },
];

// Ponto de chegada em cada estado atendido (a capital).
export const pontosDosEstados: Record<string, [number, number]> = {
  BA: [-38.5, -12.97], PE: [-34.88, -8.05], ES: [-40.31, -20.32], MG: [-43.94, -19.92], RJ: [-43.2, -22.91],
  SP: [-46.63, -23.55], PR: [-49.27, -25.43], DF: [-47.88, -15.79], MT: [-56.1, -15.6],
};

// [de, para, curvatura]
export const rotasDoMapa: [string, string, number][] = [
  ['BA', 'SP', 0.1], ['SP', 'RJ', -0.18], ['BA', 'PE', 0.12], ['RJ', 'ES', 0.18], ['RJ', 'MG', -0.2],
  ['SP', 'PR', -0.2], ['SP', 'DF', 0.14], ['SP', 'MT', -0.12], ['BA', 'DF', -0.08],
];
