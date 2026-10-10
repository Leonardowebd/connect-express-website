'use client';

import { useId, useRef, useState, type FormEvent } from 'react';
import { CAMPO_ARMADILHA, validar, type Campo, type Erros } from '@/lib/validacao';
import styles from './Formulario.module.css';

type Props = {
  campos: Campo[];
  destino: string;
  textoBotao: string;
  sucesso: string;
  /** Mostrado quando o envio falha ou ainda não está configurado. */
  alternativa: { whatsapp: string; email: string };
};

type Estado = 'parado' | 'enviando' | 'enviado' | 'falhou';

export function Formulario({ campos, destino, textoBotao, sucesso, alternativa }: Props) {
  const id = useId();
  const form = useRef<HTMLFormElement>(null);
  const [erros, setErros] = useState<Erros>({});
  const [estado, setEstado] = useState<Estado>('parado');

  const ler = () => Object.fromEntries(new FormData(form.current ?? undefined).entries()) as Record<string, string>;

  function conferirCampo(nome: string) {
    const campo = campos.find((c) => c.nome === nome);
    if (!campo) return;
    const erro = validar([campo], ler())[nome];
    setErros((atuais) => {
      const proximos = { ...atuais };
      if (erro) proximos[nome] = erro;
      else delete proximos[nome];
      return proximos;
    });
  }

  async function enviar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    const valores = ler();
    const encontrados = validar(campos, valores);
    setErros(encontrados);
    const primeiro = Object.keys(encontrados)[0];
    if (primeiro) {
      form.current?.querySelector<HTMLElement>(`[name="${primeiro}"]`)?.focus();
      return;
    }
    setEstado('enviando');
    try {
      const resposta = await fetch(destino, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(valores),
      });
      if (resposta.status === 422) {
        const corpo = (await resposta.json()) as { erros?: Erros };
        setErros(corpo.erros ?? {});
        setEstado('parado');
        return;
      }
      setEstado(resposta.ok ? 'enviado' : 'falhou');
    } catch {
      setEstado('falhou');
    }
  }

  if (estado === 'enviado') {
    return (
      <p className={styles.sucesso} role="status">
        {sucesso}
      </p>
    );
  }

  return (
    <form ref={form} className={styles.form} onSubmit={enviar} noValidate method="post" action={destino}>
      {campos.map((campo) => {
        const idCampo = `${id}-${campo.nome}`;
        const idErro = `${idCampo}-erro`;
        const erro = erros[campo.nome];
        const comuns = {
          id: idCampo,
          name: campo.nome,
          required: campo.obrigatorio,
          maxLength: campo.maximo,
          autoComplete: campo.autocomplete,
          'aria-describedby': idErro,
          'aria-invalid': erro ? true : undefined,
          onBlur: () => conferirCampo(campo.nome),
          className: styles.controle,
        };
        return (
          <div key={campo.nome} className={`${styles.campo} ${campo.tipo === 'textarea' ? styles.largo : ''}`}>
            <label htmlFor={idCampo} className={styles.rotulo}>
              {campo.rotulo}
              {!campo.obrigatorio && <span className={styles.opcional}> (opcional)</span>}
            </label>
            {campo.tipo === 'textarea' ? (
              <textarea {...comuns} rows={5} />
            ) : campo.tipo === 'select' ? (
              <select {...comuns} defaultValue="">
                <option value="" disabled>
                  Escolha
                </option>
                {campo.opcoes?.map((opcao) => (
                  <option key={opcao} value={opcao}>
                    {opcao}
                  </option>
                ))}
              </select>
            ) : (
              <input {...comuns} type={campo.tipo} inputMode={campo.tipo === 'tel' ? 'tel' : undefined} />
            )}
            <p id={idErro} className={styles.erro} aria-live="polite">
              {erro}
            </p>
          </div>
        );
      })}

      {/* Campo armadilha: invisível para pessoas, preenchido por robôs. */}
      <div className={styles.armadilha} aria-hidden="true">
        <label htmlFor={`${id}-${CAMPO_ARMADILHA}`}>Não preencha este campo</label>
        <input id={`${id}-${CAMPO_ARMADILHA}`} name={CAMPO_ARMADILHA} type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className={styles.rodape}>
        <button type="submit" className={styles.enviar} disabled={estado === 'enviando'}>
          {estado === 'enviando' ? 'Enviando...' : textoBotao}
        </button>
        <p className={styles.aviso}>
          Usamos seus dados só para responder a este contato. Veja a{' '}
          <a className="link" href="/politica-de-privacidade/">
            Política de Privacidade
          </a>
          .
        </p>
      </div>

      <p className={styles.falha} role="alert">
        {estado === 'falhou' && (
          <>
            Não foi possível enviar agora. Fale com a gente pelo{' '}
            <a className="link" href={alternativa.whatsapp} target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>{' '}
            ou pelo e-mail{' '}
            <a className="link" href={`mailto:${alternativa.email}`}>
              {alternativa.email}
            </a>
            .
          </>
        )}
      </p>
    </form>
  );
}
