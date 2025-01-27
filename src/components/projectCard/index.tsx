import Link from 'next/link';
import Image from 'next/image';
import styles from './projectCard.module.css';

interface ProjectCardtProps {
  project: {
    fileName: string;
    title: string;
    mainImage: string;
    description: string;
  };
}

const ProjectCard: React.FC<ProjectCardtProps> = ({ project }) => {
  return (
    <>
      <Link href={`/projects/${project.fileName}`} className={styles.link}>
        <div className={styles.card}>
          <div className={styles.imgWrapper}>
            <Image
              src={project.mainImage}
              layout='fill'
              objectFit='cover'
              alt={project.title}
              className={styles.image}
            />
            <div className={styles.overlay}>
              <h3 className={styles.title}>{project.title}</h3>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};
export default ProjectCard;
