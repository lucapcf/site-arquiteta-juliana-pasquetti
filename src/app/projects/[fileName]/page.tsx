import type { Metadata } from 'next';
import Image from 'next/image';
import { handleJSONfile, handleJSONfiles } from '../../../utils/jsonHandler';
import { Project } from '@/types';
import styles from './projectPage.module.css';

interface ProjectPageProps {
  params: Promise<{ fileName: string }>;
}

async function getProjectData(fileName: string): Promise<Project> {
  return await handleJSONfile<Project>(`projects/${fileName}.json`);
}

export async function generateStaticParams() {
  const projetos = await handleJSONfiles('projects');

  return projetos.map((projeto) => ({
    fileName: projeto.fileName,
  }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { fileName } = await params;
  const project = await getProjectData(fileName);
  return {
    title: `${project.title} | Juliana Pasquetti - Arquiteta`,
    description: project.description,
  };
}

const ProjectPage = async ({ params }: ProjectPageProps) => {
  const resolvedParams = await params;
  const { fileName } = resolvedParams;

  const project = await getProjectData(fileName);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{project.title}</h1>
      <div className={styles.mainImageWrapper}>
        <Image
          src={project.mainImage}
          alt={project.title}
          width={800}
          height={500}
          className={styles.mainImage}
        />
      </div>
      <p className={styles.description}>{project.description}</p>
      <hr />
      <div className={styles.grid}>
        {project.projectImages.map((image, index) => (
          <div key={index} className={styles.gridItem}>
            <Image
              src={image.image}
              alt={`Project Image ${index + 1}`}
              width={500}
              height={300}
              className={styles.image}
            />
            <div className={styles.overlay}></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectPage;
