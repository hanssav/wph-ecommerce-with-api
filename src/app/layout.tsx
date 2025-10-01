import './globals.css';
import AppProviders from '@/providers/AppProviders';
import { sfProDisplay } from '@/constants';
import Header from '@/components/pages/user/header';
import Footer from '@/components/pages/user/footer';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${sfProDisplay.variable} antialiased`}>
        <AppProviders>
          <Header />
          {children}
          <Footer />
        </AppProviders>
      </body>
    </html>
  );
}
