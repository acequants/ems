import { ClerkProvider } from '@clerk/nextjs';
import { ReactNode } from 'react';
import { Inter } from 'next/font/google';

import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'E M S',
  description:
    'Error Management System (EMS) to log errors, allocate logged errors to users, update error state and delete errors',
};

export default function AuthenticationLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang='en'>
        <head>
          <link href='/css/icons.min.css' rel='stylesheet' type='text/css' />
          <link
            href='/css/app.min.css'
            rel='stylesheet'
            type='text/css'
            id='light-style'
          />
        </head>

        <body className={`authentication-bg ${inter.className}`}>
          <div className='account-pages'>
            <div className='container'>
              <div className='row justify-content-center'>
                <div className='col-xxl-4 col-lg-5'>{children}</div>
              </div>
            </div>
          </div>

          <footer className='footer footer-alt'>
            {new Date().getFullYear()} © Johnmark
          </footer>

          <Script src='/js/vendor.min.js' strategy='beforeInteractive' />
          <Script src='/js/app.min.js' strategy='beforeInteractive' />
        </body>
      </html>
    </ClerkProvider>
  );
}
