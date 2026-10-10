import { WhatsappLogo } from '@phosphor-icons/react/dist/ssr';
import { linkWhatsApp } from '@/data/empresa';
import styles from './BotaoWhatsApp.module.css';

/** Atalho fixo para o WhatsApp: pílula clara com o ícone em círculo verde, como os botões do site. */
export function BotaoWhatsApp() {
  return (
    <a
      href={linkWhatsApp}
      className={styles.botao}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar com o comercial no WhatsApp"
    >
      <span className={styles.icone}>
        <WhatsappLogo aria-hidden="true" weight="fill" size={22} />
      </span>
      <span className={styles.texto}>WhatsApp</span>
    </a>
  );
}
