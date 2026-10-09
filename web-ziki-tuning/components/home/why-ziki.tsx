import { Brain, Sparkles, Crown, Coins, BookOpen } from 'lucide-react'
import { DISCLAIMER } from '@/lib/data'
import { Disclaimer, SectionHeading } from '@/components/ziki/primitives'

const reasons = [
  { icon: Brain, stat: '0 %', label: 'zdravého rozumu', text: 'Rozum jsme vyměnili za větší turbo. Nelitujeme.', color: 'text-destructive' },
  { icon: Sparkles, stat: '200 %', label: 'závodního vzhledu', text: 'I zaparkované auto vypadá, že jede 300.', color: 'text-primary' },
  { icon: Crown, stat: '999 %', label: 'sebevědomí', text: 'Nikdy jsme neprohráli. Většinou proto, že závod neproběhl.', color: 'text-accent' },
  { icon: Coins, stat: 'PLN', label: 'ceny v PLN, sny bez hranic', text: 'Zloté jsou jediná věc, kterou u nás neřešíme turbem.', color: 'text-primary' },
  { icon: BookOpen, stat: '1:1', label: 'každý projekt má vlastní příběh', text: 'A většina z nich začíná větou „Jen trochu víc výkonu“.', color: 'text-accent' },
]

export function WhyZiki() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 md:px-8 md:py-32">
      <SectionHeading
        eyebrow="Proč právě ZIKI-TUNING?"
        title={
          <>
            Čísla, která <span className="text-primary">nedávají smysl</span>
          </>
        }
      />
      <ul className="mt-14 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-5">
        {reasons.map(({ icon: Icon, stat, label, text, color }) => (
          <li key={label} className="group flex flex-col gap-4 bg-background p-8 transition-colors hover:bg-card">
            <Icon className={`size-12 transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110 ${color}`} aria-hidden="true" />
            <p className={`font-display text-5xl tabular-nums ${color}`}>{stat}</p>
            <h3 className="font-display text-lg uppercase leading-tight">{label}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{text}</p>
          </li>
        ))}
      </ul>
      <Disclaimer className="mt-8 text-base font-semibold">{DISCLAIMER}</Disclaimer>
    </section>
  )
}
