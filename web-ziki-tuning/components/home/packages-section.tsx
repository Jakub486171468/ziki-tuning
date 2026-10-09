import { Check, TriangleAlert } from 'lucide-react'
import { formatPLN, packages } from '@/lib/data'
import { cn } from '@/lib/utils'
import { CtaLink, SectionHeading } from '@/components/ziki/primitives'

export function PackagesSection() {
  return (
    <section id="balicky" className="relative overflow-hidden border-y border-border carbon py-24 md:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-0 h-96 w-[60rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-4 md:px-8">
        <SectionHeading
          align="center"
          eyebrow="Balíčky tuningu"
          title={
            <>
              Vyber si úroveň <span className="text-primary">šílenství</span>
            </>
          }
          description="Tři balíčky. Tři stupně ztráty kontaktu s realitou. Ceny pochopitelně v polských zlotých."
        />
        <div className="mt-16 grid items-stretch gap-6 lg:grid-cols-3">
          {packages.map((pkg) => (
            <article
              key={pkg.slug}
              className={cn(
                'group relative flex flex-col border bg-card p-8 transition-all duration-300 hover:-translate-y-2',
                pkg.featured
                  ? 'border-primary shadow-[0_0_60px_-20px_var(--primary)] lg:-my-4 lg:py-12'
                  : pkg.warning
                    ? 'border-destructive/60 hover:shadow-[0_0_60px_-20px_var(--destructive)]'
                    : 'border-border hover:border-accent',
              )}
            >
              {pkg.featured ? (
                <span className="absolute -top-3 left-8 bg-primary px-3 py-1 font-display text-xs uppercase tracking-widest text-primary-foreground">
                  Nejprodávanější
                </span>
              ) : null}
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Balíček</p>
              <h3 className="mt-2 font-display text-3xl uppercase leading-tight">{`„${pkg.name}“`}</h3>
              <p className="mt-6 flex items-baseline gap-2">
                <span
                  className={cn(
                    'font-display text-5xl tabular-nums',
                    pkg.featured ? 'text-primary text-glow' : pkg.warning ? 'text-destructive' : 'text-accent',
                  )}
                >
                  {formatPLN(pkg.price)}
                </span>
              </p>
              <p className="mt-4 text-pretty text-muted-foreground">{pkg.tagline}</p>
              <ul className="mt-8 flex flex-1 flex-col gap-3">
                {pkg.features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <Check className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              {pkg.warning ? (
                <p className="mt-8 flex items-start gap-3 border border-destructive/40 bg-destructive/10 p-4 text-sm">
                  <TriangleAlert className="mt-0.5 size-5 shrink-0 text-destructive" aria-hidden="true" />
                  <span>
                    <strong className="font-semibold">Upozornění: </strong>
                    {`„${pkg.warning}“`}
                  </span>
                </p>
              ) : null}
              <CtaLink
                href={`/kontakt?uprava=${pkg.slug}`}
                variant={pkg.featured ? 'primary' : pkg.warning ? 'danger' : 'outline'}
                className="mt-8 w-full"
              >
                Chci tento balíček
              </CtaLink>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
