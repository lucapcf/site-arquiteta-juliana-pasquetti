import type { Metadata } from 'next';
import Form from '../../components/form';
import { handleJSONfile } from '../../utils/jsonHandler';

export const metadata: Metadata = {
  title: 'Contato | Juliana Pasquetti - Arquiteta',
  description: 'Entre em contato com a arquiteta Juliana Pasquetti.',
};

export interface FormData {
  title: string;
}

async function getData(): Promise<{ form: FormData }> {
  const form = await handleJSONfile<FormData>('./content/form/form.json');
  return { form };
}

export default async function Contact() {
  const { form } = await getData();

  return (
    <>
      <h2 className='subtitle'>Contato</h2>
      <div className='container_content'>
        <Form title={form.title} />
      </div>
    </>
  );
};
