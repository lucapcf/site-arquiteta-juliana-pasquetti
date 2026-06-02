import type { Metadata } from 'next';
import ServicesGrid from '../../components/servicesGrid';
import { handleJSONfile, handleJSONfiles } from '../../utils/jsonHandler';
import { Service } from '@/types';

export const metadata: Metadata = {
  title: 'Serviços | Juliana Pasquetti - Arquiteta',
  description: 'Serviços de arquitetura oferecidos por Juliana Pasquetti: consultoria, coordenação de obras e mais.',
};

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

