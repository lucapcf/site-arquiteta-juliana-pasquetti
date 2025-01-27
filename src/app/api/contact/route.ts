import { mailOptions, transporter } from '@/utils/nodemailer';

interface ContactFormData {
  nome: string;
  email: string;
  cellphone: string;
  subject: string;
  message: string;
}

export async function POST(req: Request) {
  const data: ContactFormData = await req.json();

  if (
    !data.nome ||
    !data.email ||
    !data.cellphone ||
    !data.subject ||
    !data.message
  ) {
    return new Response(
      JSON.stringify({ message: 'Campo(s) obrigatório(s) não preenchido(s).' }),
      { status: 400 },
    );
  }

  try {
    await transporter.sendMail({
      ...mailOptions,
      subject: data.subject,
      text:
        `Nome: ${data.nome}\n` +
        `E-mail: ${data.email}\n` +
        `Celular: ${data.cellphone}\n` +
        `_______________________________________________________________________________________________________________________________________\n` +
        `${data.message}`,
      html: `<p>Nome: ${data.nome}</p>
             <p>E-mail: ${data.email}</p>
             <p>Celular: ${data.cellphone}</p>
             <hr/>
             <p>${data.message}</p>`,
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({
        message: error instanceof Error ? error.message : 'An error occurred',
      }),
      { status: 400 },
    );
  }
}

export async function OPTIONS() {
  return new Response(null, { status: 200 });
}
