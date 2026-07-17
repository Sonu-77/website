import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Compass } from 'lucide-react';
import Background from '@/components/Background';
import { identity } from '@/lib/data';
import logo from '@/public/assets/logo.png';

export const metadata: Metadata = {
  title: `Page Not Found | ${identity.name}`,
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-5 py-24">
      <Background />

      <div className="glass w-full max-w-lg rounded-2xl p-8 text-center sm:p-12">
        <Link
          href="/"
          className="mx-auto flex w-fit shrink-0 items-center justify-center rounded-lg transition-transform duration-200 hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan/60"
          aria-label="Go to home page"
        >
          <Image
            src={logo}
            alt={identity.name}
            priority
            className="h-9 w-auto object-contain"
          />
        </Link>

        <p className="eyebrow mt-8">Error 404</p>

        <h1 className="font-display text-gradient mt-3 text-7xl font-bold leading-none sm:text-8xl">
          404
        </h1>

        <h2 className="mt-4 font-display text-xl font-semibold text-ink sm:text-2xl">
          This page took a wrong turn
        </h2>

        <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-ink-2">
          The page you&rsquo;re looking for doesn&rsquo;t exist, may have been
          moved, or the link is broken. Let&rsquo;s get you back on track.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link href="/" className="btn-primary">
            <ArrowLeft size={16} />
            Back to Home
          </Link>
          <Link href="/#contact" className="btn-ghost">
            <Compass size={16} />
            Contact Me
          </Link>
        </div>
      </div>
    </main>
  );
}
