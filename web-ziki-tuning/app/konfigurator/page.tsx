import type { Metadata } from 'next'
import { PageHero } from '@/components/ziki/primitives'
import { Configurator } from '@/components/configurator/configurator'

export const metadata: Metadata = {
  title: 'Konfigurátor vlastního monstra',
  description: 'Interaktivní konfigurátor ZIKI-TUNING: vyber auto, turbo, vačku, výfuk a úroveň šílenství. Cena v PLN se přepočítá okamžitě.',
}

export default function ConfiguratorPage() {
  return (
    <>
      <PageHero
        eyebrow="Konfigurátor vlastního monstra"
        title={
          <>
            Postav si <span className="text-primary">monstrum</span>
          </>
        }
        description="Každá volba má pevnou cenu v PLN. Součet se přepočítává okamžitě – výkon je pochopitelně fiktivní."
      />
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
        <Configurator />
      </section>
    </>
  )
}
