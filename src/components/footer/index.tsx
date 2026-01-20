import Image from 'next/image';
import Link from 'next/link';
import styles from './footer.module.css';
import { FaInstagram, FaLinkedin } from 'react-icons/fa';
import { Contact } from '../../app/layout';

interface FooterProps {
  logo: string;
  copy: string;
  contact: Contact;
}

const Footer: React.FC<FooterProps> = ({ logo, copy, contact }) => {
  return (
    <>
      <div className={styles.container_footer_1}>
        <div className={`${styles.container_footer_2} ${styles.top_footer}`}>
          <div className={styles.box_footer_logo}>
            <Image
              src={logo}
              width={150}
              height={150}
              alt='Logo'
              className={styles.logo}
            />
          </div>
          <div className={styles.box_footer}>
            <p className={styles.footer_label}>{contact.name}</p>
            <div>
              <Link
                href={contact.linkedin}
                target='_blank'
                title='Esse link leva ao meu perfil no Linkedin'
              >
                <FaLinkedin size={30} />
              </Link>
              <Link
                href={contact.instagram}
                target='_blank'
                title='Esse link leva ao meu perfil no instagram'
              >
                <FaInstagram size={30} />
              </Link>
            </div>
          </div>
          <div className={styles.endereco}>
            <p>Endereço:</p>
            <p>{contact.address}</p>
          </div>
        </div>
        <div className={`${styles.container_footer_2} ${styles.bottom_footer}`}>
          <p className={styles.footer_text}>{copy}</p>
        </div>
      </div>
    </>
  );
};

export default Footer;
