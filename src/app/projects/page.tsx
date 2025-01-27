import GridProjetos from '../../components/projectsGrid';
import { handleJSONfiles } from '../../utils/jsonHandler';
import { handleJSONfile } from '../../utils/jsonHandler';

export interface Project {
  fileName: string;
  title: string;
  description: string;
  mainImage: string;
  projectImages: { image: string }[];
}

interface ProjectsPage {
  title: string;
}

async function getData(): Promise<{
  projects_page: ProjectsPage;
  projects: Project[];
}> {
  const projects_page = await handleJSONfile<ProjectsPage>(
    './content/pages/projects.json',
  );
  const projects = await handleJSONfiles<Project>('./content/projects');
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
