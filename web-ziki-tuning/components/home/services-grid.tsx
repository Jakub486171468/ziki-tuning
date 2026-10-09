import Link from 'next/link'
import { Flame as FlameIcon, Gauge, Snowflake, Wind, Zap, Cog, Rocket, Skull } from 'lucide-react'
import { DISCLAIMER, formatPLN, services, type Service } from '@/lib/data'
import { cn } from '@/lib/utils'
import { ctaClasses, Disclaimer, SectionHeading } from '@/components/ziki/primitives'

const icons: Record<string, typeof Gauge> = {
  'turbo-z-letadla': Rocket,
  'vacka-smrti': Cog,
  'ziki-ecu': Gauge,
  'zavodni-sahara': Snowflake,
  'vyfukovy-komin': Wind,
  'nitro-kombik': Zap,
  'twin-turbo-xxl': FlameIcon,
  'stage-9000': Skull,
}

const accentMap = {
  green: { text: 'text-primary', border: 'hover:border-primary', glow: 'group-hover:bg-primary/20', bar: 'bg-primary' },
  orange: { text: 'text-accent', border: 'hover:border-accent', glow: 'group-hover:bg-accent/20', bar: 'bg-accent' },
  red: { text: 'text-destructive', border: 'hover:border-destructive', glow: 'group-hover:bg-destructive/20', bar: 'bg-destructive' },
}

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const Icon = icons[service.slug] ?? Gauge
  const accent = accentMap[service.accent]
  const isMonster = service.slug === 'stage-9000'
  return (
    <article
      className={cn(
        'group relative flex flex-col overflow-hidden border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 clip-card',
        accent.border,
        isMonster && 'border-destructive/60 bg-gradient-to-br from-destructive/15 to-card',
      )}
    >
      <div
        aria-hidden="true"
        className={cn(
          'pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-transparent blur-3xl transition-colors duration-500',
          accent.glow,
        )}
      />
      <div aria-hidden="true" className={cn('absolute left-0 top-0 h-1 w-0 transition-all duration-500 group-hover:w-full', accent.bar)} />
      <div className="relative flex items-start justify-between gap-4">
        <span className={cn('flex size-12 items-center justify-center border border-border bg-background', accent.text)}>
          <Icon className="size-6 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110" aria-hidden="true" />
        </span>
        <span className="font-display text-xs text-muted-foreground">{String(index + 1).padStart(2, '0')}</span>
      </div>
      <h3 className="relative mt-6 font-display text-2xl uppercase leading-tight">{service.name}</h3>
      <p className="relative mt-3 flex-1 text-pretty leading-relaxed text-muted-foreground">
        {`„${service.description}“`}
      </p>
      <dl className="relative mt-6 border-t border-dashed border-border pt-4">
        <dt className="text-xs uppercase tracking-widest text-muted-foreground">Deklarovaný efekt*</dt>
        <dd className={cn('mt-1 font-display text-lg uppercase', accent.text)}>{service.effect}</dd>
      </dl>
      <div className="relative mt-6 flex items-end justify-between gap-4">
        <p className="font-display text-3xl tabular-nums">{formatPLN(service.price)}</p>
        <Link
          href={`/kontakt?uprava=${service.slug}`}
          className={ctaClasses(service.accent === 'green' ? 'primary' : service.accent === 'orange' ? 'accent' : 'danger', 'px-4 py-2 text-xs')}
          aria-label={`Chci to: ${service.name}`}
        >
          Chci to
        </Link>
      </div>
    </article>
  )
}

export function ServicesGrid() {
  return (
    <section id="sluzby" className="mx-auto max-w-7xl px-4 py-24 md:px-8 md:py-32">
      <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <SectionHeading
          eyebrow="Nabídka absurdních úprav"
          title={
            <>
              Úpravy, které by <span className="text-accent">neměly existovat</span>
            </>
          }
          description="Každá položka prošla přísným testem: když se inženýr zasmál, šla do nabídky."
        />
        <Link href="/cenik" className="shrink-0 font-display text-sm uppercase tracking-wider text-primary hover:underline">
          {'Kompletní ceník →'}
        </Link>
      </div>
      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {services.map((service, i) => (
          <ServiceCard key={service.slug} service={service} index={i} />
        ))}
      </div>
      <Disclaimer className="mt-10">
        {`* Všechny výkony, reklamní sliby a technické kombinace jsou humoristickou, fiktivní nabídkou – nejde o ověřené výsledky skutečných úprav. ${DISCLAIMER}`}
      </Disclaimer>
    </section>
  )
}
