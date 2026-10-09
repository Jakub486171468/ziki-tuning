import Image from 'next/image'
import { ParallaxLayer } from '@/components/home/parallax-layer'
import { CtaLink } from '@/components/ziki/primitives'
import { Flame, Tachometer } from '@/components/ziki/graphics'

export function Hero() {
  return (
    <section className="relative isolate flex min-h-[100svh] items-end overflow-hidden pb-24 pt-28 md:items-center md:pb-16">
      <ParallaxLayer className="absolute inset-0 -z-20" speed={0.35}>
        <Image
          src="/images/hero.png"
          alt="Extrémně upravený sportovní vůz s obřím turbem, kouřem a plameny z výfuku"
          fill
          priority
          sizes="100vw"
          className="scale-110 object-cover object-center"
        />
      </ParallaxLayer>
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-t from-background via-background/70 to-background/20 md:bg-gradient-to-r md:from-background md:via-background/75 md:to-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-background to-transparent"
      />

      <div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-4 md:px-8 lg:grid-cols-[1fr_auto]">
        <div className="flex max-w-3xl flex-col gap-6">
          <p className="inline-flex w-fit items-center gap-2 border border-primary/40 bg-primary/10 px-3 py-1 font-display text-xs uppercase tracking-[0.25em] text-primary">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-primary" />
            </span>
            Dílna otevřena · motory běží
          </p>
          <h1 className="text-balance font-display text-5xl uppercase leading-[0.9] sm:text-6xl md:text-7xl xl:text-8xl">
            <span className="text-primary text-glow">ZIKI-TUNING</span>
            <span className="block text-2xl leading-tight text-foreground sm:text-3xl md:text-4xl xl:text-5xl">
              {'– když sériový výkon nestačí ani na traktor.'}
            </span>
          </h1>
          <p className="max-w-2xl text-pretty text-lg leading-relaxed text-foreground/85 md:text-xl">
            {
              '„Tvoje auto má 100 koní? My nevíme, co to znamená. Stavíme stroje, které odporují fyzice, zdravému rozumu a sousedskému soužití.“'
            }
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <CtaLink href="/konfigurator" className="px-8 py-4 text-base">
              Nakopnout motor
              <span aria-hidden="true" className="transition-transform group-hover/cta:translate-x-1">
                {'→'}
              </span>
            </CtaLink>
            <CtaLink href="/cenik" variant="outline" className="px-8 py-4 text-base">
              Prohlédnout ceník
            </CtaLink>
          </div>
        </div>

        <div className="relative hidden lg:block">
          <div className="relative size-72 rounded-full border border-border bg-background/40 p-3 backdrop-blur xl:size-80">
            <Tachometer animated className="size-full" />
          </div>
          <div className="absolute -bottom-6 -left-24 flex items-center">
            <div className="h-4 w-14 rounded-sm bg-gradient-to-r from-zinc-400 to-zinc-700" />
            <Flame className="h-10 w-32" />
          </div>
        </div>
      </div>
    </section>
  )
}
