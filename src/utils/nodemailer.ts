import nodemailer from 'nodemailer';

function getEnvOrThrow(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Environment variable ${name} must be set`);
  }
  return value;
}

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: getEnvOrThrow('EMAIL'),
    pass: getEnvOrThrow('APP_PASSWORD'),
  },
});

export const mailOptions: nodemailer.SendMailOptions = {
  from: process.env.EMAIL,
  to: process.env.EMAIL,
};
