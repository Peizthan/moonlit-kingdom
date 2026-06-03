import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Moonlit Kingdom — Visión y Plan de Producción de la Boda',
  description:
    'Una boda en el bosque celestial. Constanza & Ivan · 21 de agosto de 2027 · Salón Veteranos, Club Centenario, Buenos Aires.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full antialiased">
      <body
        className="min-h-full flex flex-col"
        style={{ background: '#10261D', color: '#F3EBDD' }}
      >
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
