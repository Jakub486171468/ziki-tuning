import Link from 'next/link'
import { projects } from '@/lib/data'
import { Hero } from '@/components/home/hero'
import { Ticker } from '@/components/home/ticker'
import { ServicesGrid } from '@/components/home/services-grid'
import { PackagesSection } from '@/components/home/packages-section'
import { WhyZiki } from '@/components/home/why-ziki'
import { ProjectCard } from '@/components/ziki/project-card'
import { CtaLink, SectionHeading } from '@/components/ziki/primitives'
import { TurboIcon } from '@/components/ziki/graphics'

export default function HomePage() {
  return (
    <>
      <Hero />
      <Ticker />
      <ServicesGrid />
      <PackagesSection />

      <section className="mx-auto max-w-7xl px-4 py-24 md:px-8 md:py-32">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Galerie extrémních projektů"
            title={
              <>
                Auta, která <span className="text-accent">jsme zachránili</span> před normálností
              </>
            }
          />
          <Link href="/galerie" className="shrink-0 font-display text-sm uppercase tracking-wider text-primary hover:underline">
            {'Celá galerie →'}
          </Link>
        </div>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.slice(0, 3).map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </section>

      <WhyZiki />

      <section className="relative overflow-hidden border-t border-border bg-primary text-primary-foreground">
        <TurboIcon className="pointer-events-none absolute -right-24 -top-24 size-96 text-primary-foreground/10" />
        <div className="relative mx-auto flex max-w-7xl flex-col items-start gap-8 px-4 py-20 md:flex-row md:items-center md:justify-between md:px-8">
          <div className="max-w-2xl">
            <h2 className="text-balance font-display text-4xl uppercase leading-none md:text-6xl">
              Postav si vlastní monstrum
            </h2>
            <p className="mt-4 text-lg font-medium">
              Vyber turbo, vačku, výfuk a úroveň šílenství. Konfigurátor spočítá cenu v PLN i fiktivní výkon.
            </p>
          </div>
          <CtaLink
            href="/konfigurator"
            className="bg-background px-8 py-4 text-base text-foreground hover:text-primary hover:shadow-[0_0_30px_-4px_var(--background)]"
          >
            Spustit konfigurátor
          </CtaLink>
        </div>
      </section>
    </>
  )
}
