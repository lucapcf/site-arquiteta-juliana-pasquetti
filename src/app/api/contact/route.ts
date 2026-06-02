import { mailOptions, transporter } from '@/utils/nodemailer';
import { ContactFormData } from '@/types';

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export async function POST(req: Request) {
  const data: ContactFormData = await req.json();

  if (
    !data.name ||
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
        `Nome: ${data.name}\n` +
        `E-mail: ${data.email}\n` +
        `Celular: ${data.cellphone}\n` +
        `───────────────────────────────────\n` +
        `${data.message}`,
      html: `<p>Nome: ${escapeHtml(data.name)}</p>
             <p>E-mail: ${escapeHtml(data.email)}</p>
             <p>Celular: ${escapeHtml(data.cellphone)}</p>
             <hr/>
             <p>${escapeHtml(data.message)}</p>`,
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
