import type { Metadata } from 'next';
import './globals.css';
import Navigation from '@/components/Navigation';

export const metadata: Metadata = {
  title: 'GEP Supply Chain Risk Intelligence',
  description: 'Agentic AI-powered supply chain risk analysis — GEP Worldwide',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50">
        <Navigation />
        <main>{children}</main>
      </body>
    </html>
  );
}
