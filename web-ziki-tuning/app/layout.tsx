import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Barlow, Russo_One } from 'next/font/google'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import './globals.css'

const barlow = Barlow({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-barlow',
  display: 'swap',
})

const russo = Russo_One({
  subsets: ['latin', 'latin-ext'],
  weight: '400',
  variable: '--font-russo',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'ZIKI-TUNING – extrémní tuning bez rozumu',
    template: '%s | ZIKI-TUNING',
  },
  description:
    'ZIKI-TUNING – nejšílenější (fiktivní) tuningová dílna ve střední Evropě. Turba z letadel, vačky smrti, nitro pro kombíky a ceny v polských zlotých.',
  keywords: ['tuning', 'turbo', 'chiptuning', 'ZIKI-TUNING', 'závodní úpravy', 'humor'],
  generator: 'v0.app',
  openGraph: {
    title: 'ZIKI-TUNING – když sériový výkon nestačí ani na traktor',
    description: 'Fiktivní tuningová dílna s absurdním humorem a cenami v PLN.',
    images: ['/images/hero.png'],
    locale: 'cs_CZ',
    type: 'website',
  },
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0d0e12',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="cs" className={`${barlow.variable} ${russo.variable} bg-background`}>
      <body className="antialiased">
        <a
          href="#obsah"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
        >
          Přeskočit na obsah
        </a>
        <SiteHeader />
        <main id="obsah">{children}</main>
        <SiteFooter />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
