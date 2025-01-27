import Image from 'next/image';
import styles from './sobre.module.css';
import { handleJSONfile } from '../../utils/jsonHandler';

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
              layout='fill'
              style={{ objectFit: 'cover' }}
              alt='foto projeto de interiores'
            />
          </div>
          <div className={styles.box_sobre}>
            <p className={styles.p_sobre}>{about.text}</p>
          </div>
        </div>
      </div>
    </>
  );
};
