import type { Metadata } from 'next'
import { Clock, Mail, MapPin } from 'lucide-react'
import { priceList } from '@/lib/data'
import { PageHero } from '@/components/ziki/primitives'
import { ContactForm } from '@/components/contact/contact-form'

export const metadata: Metadata = {
  title: 'Kontakt',
  description: 'Napište dílně ZIKI-TUNING – demonstrační formulář pro poptávku fiktivní tuningové úpravy.',
}

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ uprava?: string | string[] }>
}) {
  const { uprava } = await searchParams
  const requested = typeof uprava === 'string' && priceList.some((i) => i.slug === uprava) ? uprava : ''

  return (
    <>
      <PageHero
        eyebrow="Kontakt"
        title={
          <>
            Napiš nám, než <span className="text-primary">rozum zvítězí</span>
          </>
        }
        description="Vyplň formulář a my se ozveme dřív, než se stihne zahřát olej."
      />
      <section className="mx-auto grid max-w-7xl gap-12 px-4 py-16 md:px-8 md:py-24 lg:grid-cols-[1fr_22rem]">
        <ContactForm key={requested} defaultUprava={requested} />
        <aside className="flex flex-col gap-4">
          {[
            { icon: MapPin, title: 'Adresa dílny', text: 'Ulice Plného Plynu 9000, Průmyslová zóna „Za Humny“' },
            { icon: Clock, title: 'Otevírací doba', text: 'Dokud nevyjde soused s hrnkem kávy a výrazem v obličeji.' },
            { icon: Mail, title: 'E-mail', text: 'ahoj@ziki-tuning.example' },
          ].map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex gap-4 border border-border bg-card p-5">
              <Icon className="mt-0.5 size-6 shrink-0 text-primary" aria-hidden="true" />
              <div>
                <h2 className="font-display text-sm uppercase tracking-widest">{title}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{text}</p>
              </div>
            </div>
          ))}
        </aside>
      </section>
    </>
  )
}
