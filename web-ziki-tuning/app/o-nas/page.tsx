import type { Metadata } from 'next'
import Image from 'next/image'
import { DISCLAIMER } from '@/lib/data'
import { CtaLink, Disclaimer, PageHero, SectionHeading } from '@/components/ziki/primitives'
import { Tachometer } from '@/components/ziki/graphics'

export const metadata: Metadata = {
  title: 'O nás',
  description: 'Absurdní příběh dílny ZIKI-TUNING – od sekačky na trávu s turbem až po nejšílenější tuningovou firmu ve střední Evropě.',
}

const timeline = [
  { year: '2009', title: 'Sekačka s turbem', text: 'Zakladatel Ziki namontoval turbo na sekačku. Trávník byl posečen za 4 sekundy. Plot souseda za 5.' },
  { year: '2012', title: 'První garáž', text: 'Pronajali jsme garáž. Po týdnu měla o jednu zeď méně a o jeden výfukový komín více.' },
  { year: '2016', title: 'Polské zloté', text: 'Rozhodli jsme se účtovat v PLN. Proč? Protože to zní jako zvuk blow-off ventilu: „zł-ššš“.' },
  { year: '2020', title: 'Válcová zkušebna', text: 'Postavili jsme vlastní zkušebnu. Stupnice končí na 2 000 koních, protože víc se nevešlo na displej.' },
  { year: '2026', title: 'Střední Evropa', text: 'Dnes jsme nejšílenější (fiktivní) tuningová dílna ve střední Evropě. Sousedé se odstěhovali a my jsme se rozšířili.' },
]

const crew = [
  { name: 'Ziki', role: 'Zakladatel & hlavní šílenec', fact: 'Slyší rozdíl 50 otáček na kilometr daleko.' },
  { name: 'Mirek „Vačka“', role: 'Mechanik motorů', fact: 'Nikdy neviděl motor, který by nešel rozebrat. Složit je jiná věc.' },
  { name: 'Bożena', role: 'Ladička ECU', fact: 'Považuje červené pole otáčkoměru za osobní urážku.' },
  { name: 'Pepa', role: 'Hasič na plný úvazek', fact: 'Nejvytíženější člen týmu.' },
]

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="O nás"
        title={
          <>
            Začalo to <span className="text-primary">sekačkou</span>. Skončilo to raketou.
          </>
        }
        description="Absurdní, nepravděpodobný a zcela fiktivní příběh dílny ZIKI-TUNING."
      />

      <section className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 md:px-8 md:py-24 lg:grid-cols-2">
        <div className="relative aspect-[4/3] overflow-hidden border border-border clip-card">
          <Image
            src="/images/workshop.png"
            alt="Tmavá tuningová dílna ZIKI-TUNING s rozebraným motorem a neonovým osvětlením"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
          <div className="absolute bottom-4 right-4 size-28 rounded-full border border-border bg-background/70 p-1 backdrop-blur md:size-36">
            <Tachometer animated className="size-full" />
          </div>
        </div>
        <div className="flex flex-col gap-6 text-lg leading-relaxed text-foreground/85">
          <SectionHeading eyebrow="Naše mise" title="Zdravý rozum je jen doporučení" />
          <p>
            ZIKI-TUNING vznikl ve chvíli, kdy si jeden člověk položil otázku: „Co kdyby…?“ a nikdo v okolí
            nebyl dost rychlý, aby ho zastavil.
          </p>
          <p>
            Od té doby stavíme stroje, které odporují fyzice, zdravému rozumu a sousedskému soužití. Naše
            dílna nemá otevírací dobu – má otevírací hlučnost.
          </p>
          <p className="font-display text-xl uppercase text-primary">
            {'„Pokud to jde zabudovat, jde to i přeplňovat.“'}
          </p>
        </div>
      </section>

      <section className="border-y border-border carbon py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <SectionHeading eyebrow="Historie" title="Časová osa ztráty kontroly" />
          <ol className="relative mt-14 flex flex-col gap-10 border-l-2 border-primary/40 pl-8 md:pl-12">
            {timeline.map((t) => (
              <li key={t.year} className="relative">
                <span aria-hidden="true" className="absolute -left-[41px] top-1 size-4 rotate-45 border-2 border-primary bg-background md:-left-[57px]" />
                <p className="font-display text-4xl text-accent">{t.year}</p>
                <h3 className="mt-1 font-display text-xl uppercase">{t.title}</h3>
                <p className="mt-2 max-w-2xl text-muted-foreground">{t.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
        <SectionHeading eyebrow="Posádka" title="Lidé za hlukem" />
        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {crew.map((c) => (
            <li key={c.name} className="group border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-accent">
              <span aria-hidden="true" className="flex size-14 items-center justify-center bg-accent font-display text-2xl text-accent-foreground transition-transform group-hover:rotate-6">
                {c.name.charAt(0)}
              </span>
              <h3 className="mt-5 font-display text-xl uppercase">{c.name}</h3>
              <p className="text-sm text-primary">{c.role}</p>
              <p className="mt-3 text-sm text-muted-foreground">{c.fact}</p>
            </li>
          ))}
        </ul>
        <Disclaimer className="mt-10">{`Všechny osoby a události jsou smyšlené. ${DISCLAIMER}`}</Disclaimer>
        <div className="mt-10">
          <CtaLink href="/kontakt">Napsat posádce</CtaLink>
        </div>
      </section>
    </>
  )
}
