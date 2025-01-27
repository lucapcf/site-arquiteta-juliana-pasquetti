import nodemailer from 'nodemailer';

const email: string | undefined = process.env.EMAIL;
const password: string | undefined = process.env.APP_PASSWORD;

if (!email || !password) {
  throw new Error(
    'Environment variables EMAIL and APP_PASSWORD must be set',
  );
}

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: email,
    pass: password,
  },
});

export const mailOptions: nodemailer.SendMailOptions = {
  from: email,
  to: email,
};
