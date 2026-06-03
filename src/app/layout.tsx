import React, { ReactNode } from 'react';
import { Montserrat } from 'next/font/google';
import '../styles/global.css';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import { handleJSONfile } from '@/utils/jsonHandler';
import { Contact } from '@/types';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-montserrat',
});

export const metadata = {
  title: 'Juliana Pasquetti - Arquiteta',
  description:
    'Portfólio da arquiteta Juliana Pasquetti, especializada em projetos residenciais e comerciais.',

  metadataBase: new URL('https://arquitetajulianapasquetti.com.br'),
  openGraph: {
    title: 'Juliana Pasquetti - Arquiteta',
    description: 'Portfólio da arquiteta Juliana Pasquetti.',
    url: 'https://www.arquitetajulianapasquetti.com.br',
    siteName: 'Arquiteta Juliana Pasquetti',
    images: [
      {
        url: 'https://www.arquitetajulianapasquetti.com.br/uploads/logo.png',
        width: 1200,
        height: 630,
        alt: 'Capa do site Juliana Pasquetti',
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Juliana Pasquetti - Arquiteta',
    description: 'Portfólio da arquiteta Juliana Pasquetti.',
    images: ['https://www.arquitetajulianapasquetti.com.br/uploads/logo.png'],
  },
};

interface NavFooter {
  logoNavbar: string;
  logoNavbarMobile: string;
  logoFooter: string;
  copy: string;
}

async function getData(): Promise<{ navFooter: NavFooter; contact: Contact }> {
  const navFooter = await handleJSONfile<NavFooter>(
    'navFooter/navFooter.json',
  );
  const contact = await handleJSONfile<Contact>(
    'contact/contact.json',
  );
  return { navFooter, contact };
}

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { navFooter, contact } = await getData();

  return (
    <html lang='pt-BR'>
      <head>
        <script
          async
          src='https://identity.netlify.com/v1/netlify-identity-widget.js'
        />
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="icon" href="/favicon.svg" sizes="any" type="image/svg+xml" />
      </head>
      <body className={montserrat.variable}>
        <Navbar
          logoNavbar={navFooter.logoNavbar}
          logoNavbarMobile={navFooter.logoNavbarMobile}
          contact={contact}
        />
        {children}
        <Footer
          logo={navFooter.logoFooter}
          copy={navFooter.copy}
          contact={contact}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (window.netlifyIdentity) {
                window.netlifyIdentity.on("init", (user) => {
                  if (!user) {
                    window.netlifyIdentity.on("login", () => {
                      document.location.href = "/admin/";
                    });
                  }
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
