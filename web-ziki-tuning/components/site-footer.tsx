import Link from 'next/link'
import { DISCLAIMER, navLinks, services } from '@/lib/data'
import { TurboIcon } from '@/components/ziki/graphics'

export function SiteFooter() {
  return (
    <footer className="relative border-t border-border carbon">
      <div aria-hidden="true" className="h-2 hazard" />
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 md:grid-cols-2 md:px-8 lg:grid-cols-4">
        <div className="flex flex-col gap-4">
          <Link href="/" className="flex items-center gap-2">
            <TurboIcon className="size-10" />
            <span className="font-display text-2xl">
              ZIKI<span className="text-primary">-</span>TUNING
            </span>
          </Link>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Nejšílenější fiktivní tuningová dílna ve střední Evropě. Výkon měříme v koních, hluk v
            Richterově stupnici.
          </p>
        </div>

        <nav aria-label="Patičková navigace">
          <h2 className="mb-4 font-display text-sm uppercase tracking-widest text-primary">Stránky</h2>
          <ul className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-foreground/80 transition-colors hover:text-primary">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="mb-4 font-display text-sm uppercase tracking-widest text-primary">Top úpravy</h2>
          <ul className="flex flex-col gap-2">
            {services.slice(0, 5).map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/kontakt?uprava=${s.slug}`}
                  className="text-foreground/80 transition-colors hover:text-primary"
                >
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="mb-4 font-display text-sm uppercase tracking-widest text-primary">Dílna</h2>
          <address className="flex flex-col gap-2 not-italic text-foreground/80">
            <span>Ulice Plného Plynu 9000</span>
            <span>Průmyslová zóna „Za Humny“</span>
            <span>Otevřeno: dokud nevyjde soused</span>
            <a href="mailto:ahoj@ziki-tuning.example" className="text-primary hover:underline">
              ahoj@ziki-tuning.example
            </a>
          </address>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between md:px-8">
          <p>{'© 2026 ZIKI-TUNING. Fiktivní humoristický koncept – nejde o skutečnou nabídku.'}</p>
          <p>{DISCLAIMER} Všechny ceny v PLN.</p>
        </div>
      </div>
    </footer>
  )
}
