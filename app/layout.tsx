import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Inter } from 'next/font/google';
import './globals.css';
import { wedding } from '@/config/wedding';

const display = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const body = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(wedding.siteUrl),
  title: wedding.seo.title,
  description: wedding.seo.description,
  openGraph: {
    title: wedding.seo.title,
    description: wedding.seo.description,
    url: wedding.siteUrl,
    siteName: wedding.seo.siteName,
    images: [
      {
        url: wedding.images.socialPreview,
        width: 1200,
        height: 630,
        alt: wedding.seo.socialImageAlt,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: wedding.seo.title,
    description: wedding.seo.description,
    images: [wedding.images.socialPreview],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#080807',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}
