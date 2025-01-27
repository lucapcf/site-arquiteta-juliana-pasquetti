import Image from 'next/image';
import styles from './servicesGrid.module.css';
import { Service } from '../../app/services/page';

interface ServiceGridProps {
  services: Service[];
}

function ServiceL({ service }: { service: Service }) {
  const id = service.title.replace(/ /g, '_');

  return (
    <>
      <div id={id}></div>
      <div className={styles.serviceContainer}>
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
      </div>
    </>
  );
}

function ServiceR({ service }: { service: Service }) {
  const id = service.title.replace(/ /g, '_');

  return (
    <>
      <div id={id}></div>
      <div className={styles.serviceContainer}>
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
      </div>
    </>
  );
}

const ServiceGrid: React.FC<ServiceGridProps> = ({ services }) => {
  return (
    <>
      <ul className={styles.mainContainer}>
        {services &&
          services.map((service, i) => (
            <div key={i}>
              {i % 2 === 0 ? (
                <ServiceL service={service} />
              ) : (
                <ServiceR service={service} />
              )}
            </div>
          ))}
      </ul>
    </>
  );
};

export default ServiceGrid;
