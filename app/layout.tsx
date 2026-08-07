import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'LatinRed Apps | Suite de Aplicaciones Negocios y Deportes',
  description: 'Ecosistema de soluciones tecnológicas: QRifas, QFutbol, QCajas y aplicaciones especializadas.',
  keywords: ['LatinRed', 'QRifas', 'QFutbol', 'QCajas', 'LatinRed Apps', 'Sorteos en vivo', 'Campeonatos de fútbol', 'Cajas de ahorro'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="dark">
      <body className="antialiased selection:bg-rose-500 selection:text-white bg-slate-950 text-slate-100">
        {children}
      </body>
    </html>
  );
}
