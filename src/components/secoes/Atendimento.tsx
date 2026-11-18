import { EnvelopeSimple, Headset, Phone, WhatsappLogo } from '@phosphor-icons/react/dist/ssr';
import { Revelar } from '@/animacoes/Revelar';
import { canaisSac, contatos, conversaWhatsApp, linkWhatsApp } from '@/data/empresa';
import { atendimentoSecao } from '@/data/inicio';
import styles from './secoes.module.css';

/** Canais do Comercial e do SAC, cada um com o seu WhatsApp. */
export function Atendimento() {
  const { comercial, sac } = contatos;
  return (
    <section className="secao" aria-labelledby="titulo-atendimento">
      <div className="conteudo">
        <p className={styles.rotulo}>{atendimentoSecao.rotulo}</p>
        <h2 id="titulo-atendimento" className={styles.titulo}>
          {atendimentoSecao.titulo}
        </h2>

        <Revelar emSequencia className={styles.atendimento}>
          <article className={styles.cartao}>
            <Phone aria-hidden="true" weight="duotone" size={32} className={styles.icone} />
            <h3>Comercial</h3>
            <p>{atendimentoSecao.comercial}</p>
            <ul className={styles.canais}>
              <li>
                <span>Telefone</span>
                <a href={`tel:${comercial.telefoneLink}`}>{comercial.telefone}</a>
              </li>
              <li>
                <span>WhatsApp</span>
                <a href={linkWhatsApp} target="_blank" rel="noopener noreferrer">
                  <WhatsappLogo aria-hidden="true" size={18} /> {comercial.whatsappExibido}
                </a>
              </li>
              <li>
                <span>E-mail</span>
                <a href={`mailto:${comercial.email}`}>
                  <EnvelopeSimple aria-hidden="true" size={18} /> {comercial.email}
                </a>
              </li>
            </ul>
          </article>

          <article className={styles.cartao}>
            <Headset aria-hidden="true" weight="duotone" size={32} className={styles.icone} />
            <h3>Central de Atendimento ao Cliente (SAC)</h3>
            <p>{atendimentoSecao.sac}</p>
            <ul className={styles.canais}>
              {canaisSac.map((c) => (
                <li key={c.whatsapp}>
                  <span>
                    {c.rotulo} · {c.horario}
                  </span>
                  <a href={conversaWhatsApp(c.whatsapp)} target="_blank" rel="noopener noreferrer">
                    <WhatsappLogo aria-hidden="true" size={18} /> {c.exibido}
                  </a>
                </li>
              ))}
              <li>
                <span>E-mail</span>
                <a href={`mailto:${sac.email}`}>
                  <EnvelopeSimple aria-hidden="true" size={18} /> {sac.email}
                </a>
              </li>
            </ul>
          </article>
        </Revelar>
      </div>
    </section>
  );
}
