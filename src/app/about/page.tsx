import type { Metadata } from 'next';
import Image from 'next/image';
import styles from './sobre.module.css';
import { handleJSONfile } from '../../utils/jsonHandler';

export const metadata: Metadata = {
  title: 'Sobre | Juliana Pasquetti - Arquiteta',
  description: 'Conheça a trajetória e formação da arquiteta Juliana Pasquetti.',
};

interface About {
  title: string;
  image: string;
  text: string;
}

async function getData(): Promise<{ about: About }> {
  const about = await handleJSONfile<About>('./content/pages/about.json');
  return { about };
}

export default async function Sobre() {
  const { about } = await getData();

  return (
    <>
      <h2 className='subtitle'>{about.title}</h2>
      <div className='container_content'>
        <div className={styles.container}>
          <div className={styles.container_img}>
            <Image
              src={about.image}
              fill
              style={{ objectFit: 'cover' }}
              alt={about.title}
            />
          </div>
          <div className={styles.box_sobre}>
            <p className={styles.p_sobre}>{about.text}</p>
          </div>
        </div>
      </div>
    </>
  );
}
