import type { Metadata } from 'next'
import { DISCLAIMER } from '@/lib/data'
import { Disclaimer, PageHero } from '@/components/ziki/primitives'
import { PriceListExplorer } from '@/components/pricing/price-list-explorer'

export const metadata: Metadata = {
  title: 'Kompletní ceník',
  description: 'Kompletní ceník fiktivních tuningových úprav ZIKI-TUNING v polských zlotých – s filtry podle kategorií a řazením podle ceny.',
}

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Ceník · výhradně v PLN"
        title={
          <>
            Kompletní <span className="text-primary">ceník</span> šílenství
          </>
        }
        description="Žádné koruny, žádná eura. Jen poctivé polské zloté a nepoctivě velká turba."
      />
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
        <PriceListExplorer />
        <Disclaimer className="mt-10">{`${DISCLAIMER} Ceny jsou orientační a stejně fiktivní jako výkon.`}</Disclaimer>
      </section>
    </>
  )
}
