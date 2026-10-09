const items = [
  'Výkon měříme v koních, hluk v Richterově stupnici a spotřebu v ceně menší ojetiny.',
  'Ceny v PLN, sny bez hranic',
  'Červené pole otáčkoměru je jen doporučení',
  'Sousedé o vás budou vědět ještě před nákupem',
]

export function Ticker() {
  const row = [...items, ...items]
  return (
    <div className="relative -rotate-1 overflow-hidden border-y-2 border-primary bg-primary py-3 text-primary-foreground">
      <p className="sr-only">{items[0]}</p>
      <div aria-hidden="true" className="flex w-max animate-marquee gap-10 whitespace-nowrap hover:[animation-play-state:paused]">
        {row.map((text, i) => (
          <span key={i} className="flex items-center gap-10 font-display text-sm uppercase tracking-wider md:text-base">
            {text}
            <span className="text-primary-foreground/50">{'///'}</span>
          </span>
        ))}
      </div>
    </div>
  )
}
