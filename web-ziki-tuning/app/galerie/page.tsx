import type { Metadata } from 'next'
import { DISCLAIMER, projects } from '@/lib/data'
import { CtaLink, Disclaimer, PageHero } from '@/components/ziki/primitives'
import { ProjectCard } from '@/components/ziki/project-card'

export const metadata: Metadata = {
  title: 'Galerie extrémních projektů',
  description: 'Golf IV, BMW E46, Octavia sleeper, Civic, Multipla i Trabant – fiktivní extrémní projekty dílny ZIKI-TUNING.',
}

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Galerie extrémních projektů"
        title={
          <>
            Šest aut. <span className="text-accent">Nula výmluv.</span>
          </>
        }
        description="Každý projekt začal větou „jen trochu víc výkonu“. Takhle to dopadlo."
      />
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <ProjectCard key={p.slug} project={p} priority={i < 3} />
          ))}
        </div>
        <Disclaimer className="mt-10">{`${DISCLAIMER} Fotografie jsou ilustrační.`}</Disclaimer>
        <div className="mt-12 flex flex-col items-center gap-4 text-center">
          <p className="font-display text-2xl uppercase">Chcete být v galerii taky?</p>
          <CtaLink href="/konfigurator">Postavit vlastní monstrum</CtaLink>
        </div>
      </section>
    </>
  )
}
