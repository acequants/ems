import type { Metadata } from 'next';
import { ClerkProvider } from '@clerk/nextjs';
import { Inter } from 'next/font/google';

import Script from 'next/script';
import Navigation from '@/components/shared/Navigation';
import TopBar from '@/components/shared/TopBar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'E M S',
  description:
    'Error management system (EMS) for logging system errors, error assignment, error state update and error log deletion',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
        <body
          className={inter.className}
          data-layout-config='{"leftSideBarTheme":"default","layoutBoxed":false, "leftSidebarCondensed":false, "leftSidebarScrollable":false,"darkMode":false, "showRightSidebarOnStart": true}'
        >
          <div className='wrapper'>
            <div className='leftside-menu'>
              <a href='/' className='logo text-center logo-light'>
                <span className='logo-lg'>
                  <span className='text-white h3'>JM EMS</span>
                </span>
                <span className='logo-sm'>
                  <span className='text-white h3'>JME</span>
                </span>
              </a>
              <a href='/' className='logo text-center logo-dark'>
                <span className='logo-lg'>
                  <span className='text-white h3'>JM EMS</span>
                </span>
                <span className='logo-sm'>
                  <span className='text-white h3'>JME</span>
                </span>
              </a>

              <div className='h-100' id='leftside-menu-container'>
                <Navigation />
              </div>
            </div>

            <div className='content-page'>
              <div className='content'>
                <div className='navbar-custom'>
                  <TopBar />

                  <button className='button-menu-mobile open-left'>
                    <i className='mdi mdi-menu'></i>
                  </button>
                </div>
                <div className='container-fluid'>
                  <div className='row'>
                    <div className='col-12'>
                      <div className='page-title-box'>{children}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Script src='/js/vendor.min.js' strategy='beforeInteractive' />
          <Script src='/js/app.min.js' strategy='beforeInteractive' />
        </body>
      </html>
    </ClerkProvider>
  );
}
