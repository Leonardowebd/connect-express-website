// Validação dos formulários. Roda no navegador e, de novo, no servidor.
// Sem importações, para poder ser testada direto pelo node.

export type Campo = {
  nome: string;
  rotulo: string;
  tipo: 'text' | 'email' | 'tel' | 'textarea' | 'select';
  obrigatorio: boolean;
  maximo: number;
  autocomplete?: string;
  opcoes?: string[];
};

export type Erros = Record<string, string>;

const RE_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const RE_TELEFONE = /^[\d\s()+-]{8,20}$/;

export const CAMPO_ARMADILHA = 'site';

export const camposContato: Campo[] = [
  { nome: 'nome', rotulo: 'Nome', tipo: 'text', obrigatorio: true, maximo: 120, autocomplete: 'name' },
  { nome: 'empresa', rotulo: 'Empresa', tipo: 'text', obrigatorio: false, maximo: 120, autocomplete: 'organization' },
  { nome: 'email', rotulo: 'E-mail', tipo: 'email', obrigatorio: true, maximo: 160, autocomplete: 'email' },
  { nome: 'telefone', rotulo: 'Telefone', tipo: 'tel', obrigatorio: false, maximo: 20, autocomplete: 'tel' },
  { nome: 'mensagem', rotulo: 'Mensagem', tipo: 'textarea', obrigatorio: true, maximo: 2000 },
];

export const camposVagas: Campo[] = [
  { nome: 'nome', rotulo: 'Nome', tipo: 'text', obrigatorio: true, maximo: 120, autocomplete: 'name' },
  { nome: 'cidade', rotulo: 'Cidade', tipo: 'text', obrigatorio: true, maximo: 120, autocomplete: 'address-level2' },
  { nome: 'email', rotulo: 'E-mail', tipo: 'email', obrigatorio: true, maximo: 160, autocomplete: 'email' },
  {
    nome: 'area',
    rotulo: 'Área de atuação',
    tipo: 'select',
    obrigatorio: true,
    maximo: 40,
    opcoes: ['Entregas', 'Transporte', 'Logística', 'Administrativo'],
  },
  { nome: 'telefone', rotulo: 'Telefone', tipo: 'tel', obrigatorio: true, maximo: 20, autocomplete: 'tel' },
];

/** Devolve um erro por campo com problema. Objeto vazio significa que pode enviar. */
export function validar(campos: Campo[], valores: Record<string, unknown>): Erros {
  const erros: Erros = {};
  for (const campo of campos) {
    const bruto = valores[campo.nome];
    const valor = typeof bruto === 'string' ? bruto.trim() : '';
    if (!valor) {
      if (campo.obrigatorio) erros[campo.nome] = `Preencha o campo ${campo.rotulo.toLowerCase()}.`;
      continue;
    }
    if (valor.length > campo.maximo) {
      erros[campo.nome] = `Use até ${campo.maximo} caracteres.`;
    } else if (campo.tipo === 'email' && !RE_EMAIL.test(valor)) {
      erros[campo.nome] = 'Informe um e-mail válido, como nome@empresa.com.br.';
    } else if (campo.tipo === 'tel' && !RE_TELEFONE.test(valor)) {
      erros[campo.nome] = 'Informe um telefone com DDD, como (11) 99999-0000.';
    } else if (campo.tipo === 'select' && campo.opcoes && !campo.opcoes.includes(valor)) {
      erros[campo.nome] = 'Escolha uma das opções.';
    }
  }
  return erros;
}

/** Remove quebras de linha e caracteres de controle de campos de uma linha só. */
export function limpar(campos: Campo[], valores: Record<string, unknown>): Record<string, string> {
  const saida: Record<string, string> = {};
  for (const campo of campos) {
    const bruto = valores[campo.nome];
    const texto = typeof bruto === 'string' ? bruto.trim().slice(0, campo.maximo) : '';
    saida[campo.nome] = campo.tipo === 'textarea' ? texto.replace(/[\u0000-\u0008\u000b-\u001f]/g, '') : texto.replace(/[\u0000-\u001f]/g, ' ');
  }
  return saida;
}
