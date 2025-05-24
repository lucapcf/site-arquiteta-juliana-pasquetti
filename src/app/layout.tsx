import React, { ReactNode } from 'react';
import '../styles/global.css';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import { handleJSONfile } from '@/utils/jsonHandler';

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

export interface Contact {
  name: string;
  linkedin: string;
  email: string;
  instagram: string;
  facebook: string;
  cellphone: string;
  address: string;
}

async function getData(): Promise<{ navFooter: NavFooter; contact: Contact }> {
  const navFooter = await handleJSONfile<NavFooter>(
    './content/navFooter/navFooter.json',
  );
  const contact = await handleJSONfile<Contact>(
    './content/contact/contact.json',
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
    <html lang='en'>
      <head>
        <script
          async
          src='https://identity.netlify.com/v1/netlify-identity-widget.js'
        />
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="icon" href="/favicon.svg" sizes="any" type="image/svg+xml" />
      </head>
      <body>
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
