import type { Metadata } from 'next';
import { Cormorant_Garamond, Cormorant_SC } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

const display = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
});

const smallCaps = Cormorant_SC({
  subsets: ['latin'],
  weight: ['500', '600'],
  variable: '--font-small-caps',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Moonlit Kingdom — Una noche fuera del tiempo',
  description:
    'Visión, atmósfera y experiencia de nuestra boda. Constanza & Ivan · 28 de agosto de 2027 · Salón de Honor Óscar Pérez Uribe, Club Centenario, Asunción, Paraguay.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${display.variable} ${smallCaps.variable} h-full antialiased`}>
      <body className="mk-page mk-tone-paper min-h-full flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
