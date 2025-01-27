'use client';

import Link from 'next/link';
import Image from 'next/image';
import styles from './navbar.module.css';
import { useRef } from 'react';
import {
  FaBars,
  FaTimes,
  FaInstagram,
  FaLinkedin,
  FaEnvelope,
} from 'react-icons/fa';
import classnames from 'classnames';
import { Contact } from '../../app/layout';

interface NavbarProps {
  logoNavbar: string;
  logoNavbarMobile: string;
  contact: Contact;
}

const Navbar: React.FC<NavbarProps> = ({
  logoNavbar,
  logoNavbarMobile,
  contact,
}) => {
  const navRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLButtonElement>(null);

  const toggleNavbar = () => {
    if (navRef.current) {
      navRef.current.classList.toggle(styles.responsiveNav);
    }
    if (logoRef.current) {
      logoRef.current.classList.toggle(styles.responsiveLogo);
    }
  };

  return (
    <>
      <header className={styles.cabecalho}>
        <Link href='/' className={styles.logo}>
          <Image
            src={logoNavbar}
            width={-1}
            height={45}
            className={styles.logo}
            alt='Logo'
          />
        </Link>
        <nav className={styles.navbar} ref={navRef}>
          <button
            className={classnames(styles.navBtn, styles.navRelabBtn)}
            ref={logoRef}
          >
            <Link href='/' className={styles.droplogo}>
              <Image
                src={logoNavbarMobile}
                width={45}
                height={45}
                className={styles.logo}
                alt='Logo'
              />
            </Link>
          </button>

          <h3 className={styles.anchorStuff} onClick={toggleNavbar}>
            <Link href='/about'>SOBRE</Link>
          </h3>
          <h3 className={styles.anchorStuff} onClick={toggleNavbar}>
            <Link href='/services'>SERVIÇOS</Link>
          </h3>
          <h3 className={styles.anchorStuff} onClick={toggleNavbar}>
            <Link href='/projects'>PROJETOS</Link>
          </h3>
          <h3 className={styles.anchorStuff} onClick={toggleNavbar}>
            <Link href='/contact'>CONTATO</Link>
          </h3>

          <button
            className={classnames(styles.navBtn, styles.navCloseBtn)}
            onClick={toggleNavbar}
          >
            <FaTimes />
          </button>
          <div className={styles.links}>
            <button className={styles.navBtn} onClick={toggleNavbar}>
              <a
                href={contact.linkedin}
                target='_blank'
                rel='noopener noreferrer'
              >
                <FaLinkedin className={styles.socialNetworks} />
              </a>
            </button>
            <button className={styles.navBtn} onClick={toggleNavbar}>
              <a
                href={`mailto:${contact.email}`}
                target='_blank'
                rel='noopener noreferrer'
              >
                <FaEnvelope className={styles.socialNetworks} />
              </a>
            </button>
            <button className={styles.navBtn} onClick={toggleNavbar}>
              <a
                href={contact.instagram}
                target='_blank'
                rel='noopener noreferrer'
              >
                <FaInstagram className={styles.socialNetworks} />
              </a>
            </button>
          </div>
        </nav>
        <button className={styles.navBtn} onClick={toggleNavbar}>
          <FaBars />
        </button>
      </header>
    </>
  );
};

export default Navbar;
