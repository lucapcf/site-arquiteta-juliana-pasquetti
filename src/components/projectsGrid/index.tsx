import CardProjeto from '../projectCard';
import styles from './projectsGrid.module.css';
import { Project } from '../../app/projects/page';

interface ProjectsGridProps {
  projects: Project[];
}

const ProjectsGrid: React.FC<ProjectsGridProps> = ({ projects }) => {
  return (
    <div className={styles.grid}>
      {projects &&
        projects.map((project, i) => (
          <div key={i} className={styles.gridItem}>
            <CardProjeto project={project} />
          </div>
        ))}
    </div>
  );
};
export default ProjectsGrid;
