import type { Metadata } from 'next';
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import ThemeProvider from '@/components/providers/ThemeProvider';
import SmoothScroll from '@/components/providers/SmoothScroll';
import { SiteProvider } from '@/lib/site';
import { identity } from '@/lib/data';

const display = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});
const sans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});
const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '600'],
  display: 'swap',
});

const title = 'Sonu Kachhap | Full-Stack Developer – React, Next.js and Django';
const description =
  'Full-Stack Web Developer specializing in React, Next.js, TypeScript, Django, SaaS dashboards, REST API integration, responsive development, SEO, and website performance optimization.';

export const metadata: Metadata = {
  metadataBase: new URL(identity.siteUrl),
  title,
  description,
  alternates: { canonical: '/' },
  openGraph: {
    title,
    description,
    url: identity.siteUrl,
    siteName: 'Sonu Kachhap — Portfolio',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
  keywords: [
    'Full-Stack Developer', 'React Developer', 'Next.js Developer',
    'Django Developer', 'SaaS Dashboard Development', 'API Integration',
    'SEO Optimization', 'Freelance Web Developer India',
  ],
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      name: identity.name,
      jobTitle: 'Full-Stack Web Developer',
      url: identity.siteUrl,
      email: identity.email,
      sameAs: [identity.github, identity.linkedin],
      address: { '@type': 'PostalAddress', addressCountry: 'IN' },
      knowsAbout: [
        'React', 'Next.js', 'TypeScript', 'Django', 'REST APIs',
        'SaaS Development', 'SEO Optimization',
      ],
    },
    {
      '@type': 'ProfessionalService',
      name: 'Sonu Kachhap — Web Development Services',
      url: identity.siteUrl,
      areaServed: 'Worldwide',
      description:
        'Frontend development, full-stack web development, SaaS dashboards, API integration, performance and SEO optimization.',
      provider: { '@type': 'Person', name: identity.name },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${display.variable} ${sans.variable} ${mono.variable} dark`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ThemeProvider>
          <SiteProvider>
            <SmoothScroll>{children}</SmoothScroll>
          </SiteProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
