import type { Metadata } from 'next';
import GridProjetos from '../../components/projectsGrid';
import { handleJSONfiles, handleJSONfile } from '../../utils/jsonHandler';
import { Project } from '@/types';

export const metadata: Metadata = {
  title: 'Projetos | Juliana Pasquetti - Arquiteta',
  description: 'Conheça os projetos residenciais e comerciais da arquiteta Juliana Pasquetti.',
};

interface ProjectsPage {
  title: string;
}

async function getData(): Promise<{
  projects_page: ProjectsPage;
  projects: Project[];
}> {
  const projects_page = await handleJSONfile<ProjectsPage>(
    'pages/projects.json',
  );
  const projects = await handleJSONfiles<Project>('projects');
  return { projects_page, projects };
}

export default async function Projects(){
  const { projects_page, projects } = await getData();

  return (
    <>
      <h2 className='subtitle'>{projects_page.title}</h2>
      <div className='container_content'>
        <GridProjetos projects={projects} />
      </div>
    </>
  );
};
