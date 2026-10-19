import type { Metadata } from 'next';
import { Playfair_Display, Plus_Jakarta_Sans, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CustomCursor from '@/components/ui/CustomCursor';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
});

const mono = IBM_Plex_Mono({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://momssecretspices.com'),
  title: "Mom's Secret Spices | Crafted by Akshaya Foods",
  description:
    'Authentic artisanal Indian spice blends freshly stone-ground and curated for everyday culinary magic. Crafted by Akshaya Foods, Bengaluru, Karnataka.',
  keywords: [
    'Indian spices',
    'stone-ground masala',
    'Akshaya Foods',
    'Bisi Bele Bath powder',
    'Mysore Rasam',
    'artisanal spices',
    'pure turmeric',
    'Guntur chilli powder',
  ],
  openGraph: {
    title: "Mom's Secret Spices — Authentic Stone-Ground Blends",
    description: 'Every spice has a story. Rooted in Indian kitchens, crafted with care by Akshaya Foods, Bengaluru.',
    url: 'https://momssecretspices.com',
    siteName: "Mom's Secret Spices | Akshaya Foods",
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Akshaya Foods — Mom’s Secret Spices Logo & Heritage',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Mom's Secret Spices | Crafted by Akshaya Foods",
    description: 'Authentic stone-ground Indian spice blends from Bengaluru.',
    images: ['/og-image.jpg'],
  },
  icons: {
    icon: [
      { url: '/apple-icon.jpg' },
      { url: '/favicon.ico' },
    ],
    shortcut: '/apple-icon.jpg',
    apple: '/apple-icon.jpg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${jakarta.variable} ${mono.variable} antialiased`}>
      <body className="min-h-screen flex flex-col bg-[#FFF8EE] text-[#39251E] selection:bg-[#E8A33A] selection:text-[#39251E]">
        <CustomCursor />
        <Header />
        <main className="flex-1 w-full">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
