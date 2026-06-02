import Image from 'next/image';
import styles from './servicesGrid.module.css';
import { Service } from '@/types';

interface ServicesGridProps {
  services: Service[];
}

function ServiceL({ service }: { service: Service }) {
  const id = service.title.replace(/ /g, '_');

  return (
    <li id={id} className={styles.serviceContainer}>
      <div className={styles.imageLeftContainer}>
        <Image
          src={service.image}
          style={{ objectFit: 'cover' }}
          fill
          alt={service.title}
        />
      </div>
      <div className={styles.textContainer}>
        <h3 className={styles.titleContainer}>{service.title}</h3>
        <div className={styles.underBar}></div>
        <p className={styles.descriptionContainer}>{service.description}</p>
      </div>
    </li>
  );
}

function ServiceR({ service }: { service: Service }) {
  const id = service.title.replace(/ /g, '_');

  return (
    <li id={id} className={styles.serviceContainer}>
      <div className={styles.imageMobileContainer}>
        <Image
          src={service.image}
          style={{ objectFit: 'cover' }}
          fill
          alt={service.title}
        />
      </div>
      <div className={styles.textContainer}>
        <h3 className={styles.titleContainer}>{service.title}</h3>
        <div className={styles.underBar}></div>
        <p className={styles.descriptionContainer}>{service.description}</p>
      </div>
      <div className={styles.imageRightContainer}>
        <Image
          src={service.image}
          style={{ objectFit: 'cover' }}
          fill
          alt={service.title}
        />
      </div>
    </li>
  );
}

const ServicesGrid: React.FC<ServicesGridProps> = ({ services }) => {
  return (
    <ul className={styles.mainContainer}>
      {services &&
        services.map((service, i) =>
          i % 2 === 0 ? (
            <ServiceL key={i} service={service} />
          ) : (
            <ServiceR key={i} service={service} />
          ),
        )}
    </ul>
  );
};

export default ServicesGrid;
