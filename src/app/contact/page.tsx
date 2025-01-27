import Form from '../../components/form';
import { handleJSONfile } from '../../utils/jsonHandler';

export interface Form {
  title: string;
}

async function getData(): Promise<{ form: Form }> {
  const form = await handleJSONfile<Form>('./content/form/form.json');
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
