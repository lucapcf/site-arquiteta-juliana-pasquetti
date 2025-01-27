import ServicesGrid from '../../components/servicesGrid';
import { handleJSONfile } from '../../utils/jsonHandler';
import { handleJSONfiles } from '../../utils/jsonHandler';

export interface Service {
  title: string;
  image: string;
  description: string;
}

interface ServicesPage {
  title: string;
}

async function getData(): Promise<{
  services_page: ServicesPage;
  services: Service[];
}> {
  const services_page = await handleJSONfile<ServicesPage>(
    './content/pages/services.json',
  );
  const services = await handleJSONfiles<Service>('./content/services');
  return { services_page, services };
}

export default async function Services() {
  const { services_page, services } = await getData();

  return (
    <>
      <h2 className='subtitle'>{services_page.title}</h2>
      <div className='container_content'>
        <ServicesGrid services={services} />
      </div>
    </>
  );
};

