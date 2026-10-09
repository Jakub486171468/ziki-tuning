'use client'

import { useId, useMemo, useRef, useState, type ReactNode } from 'react'
import { RotateCcw } from 'lucide-react'
import {
  calculate,
  camOptions,
  carOptions,
  defaultConfig,
  exhaustOptions,
  HP_MAX,
  HP_MIN,
  TURBO_COUNTS,
  turboOptions,
  verdict,
  type Config,
  type Option,
} from '@/lib/configurator'
import { DISCLAIMER, formatNumber, formatPLN } from '@/lib/data'
import { cn } from '@/lib/utils'
import { CtaLink, ctaClasses, Disclaimer } from '@/components/ziki/primitives'
import { Flame, Tachometer, TurboIcon } from '@/components/ziki/graphics'

export function Configurator() {
  const [config, setConfig] = useState<Config>(defaultConfig)
  const [result, setResult] = useState<{ total: number; hp: number; insanity: number } | null>(null)
  const resultRef = useRef<HTMLDivElement>(null)
  const calc = useMemo(() => calculate(config), [config])

  const update = <K extends keyof Config>(key: K, value: Config[K]) => {
    setConfig((c) => ({ ...c, [key]: value }))
    setResult(null)
  }

  const noTurbo = config.turbo === 'zadne'

  function handleCalculate() {
    setResult({ total: calc.total, hp: calc.finalHp, insanity: config.insanity })
    requestAnimationFrame(() => resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }))
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_24rem]">
      <div className="flex flex-col gap-10 lg:col-start-1">
        <Step n={1} title="Typ auta">
          <OptionGrid name="car" options={carOptions} value={config.car} onChange={(v) => update('car', v)} showHp />
        </Step>
        <Step n={2} title="Velikost turba">
          <OptionGrid name="turbo" options={turboOptions} value={config.turbo} onChange={(v) => update('turbo', v)} />
        </Step>
        <Step n={3} title="Počet turbodmychadel">
          <div role="radiogroup" aria-label="Počet turbodmychadel" className={cn('grid grid-cols-4 gap-3', noTurbo && 'opacity-40')}>
            {TURBO_COUNTS.map((n) => {
              const selected = config.turboCount === n
              return (
                <button
                  key={n}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  disabled={noTurbo}
                  onClick={() => update('turboCount', n)}
                  className={cn(
                    'flex flex-col items-center gap-2 border p-4 transition-all disabled:cursor-not-allowed',
                    selected ? 'border-primary bg-primary/10 text-primary' : 'border-border hover:border-primary/60',
                  )}
                >
                  <span className="flex -space-x-2" aria-hidden="true">
                    {Array.from({ length: n }).map((_, i) => (
                      <TurboIcon key={i} spinning={selected && !noTurbo} className="size-6 rounded-full bg-background" />
                    ))}
                  </span>
                  <span className="font-display text-xl">{`${n}×`}</span>
                </button>
              )
            })}
          </div>
          {noTurbo ? <p className="mt-3 text-sm text-muted-foreground">Bez turba není co násobit. Smutné.</p> : null}
        </Step>
        <Step n={4} title="Agresivita vačkové hřídele">
          <OptionGrid name="cam" options={camOptions} value={config.cam} onChange={(v) => update('cam', v)} />
        </Step>
        <Step n={5} title="Typ výfuku">
          <OptionGrid name="exhaust" options={exhaustOptions} value={config.exhaust} onChange={(v) => update('exhaust', v)} />
        </Step>
        <Step n={6} title="Úroveň šílenství">
          <RangeField
            label="Úroveň šílenství"
            min={1}
            max={10}
            value={config.insanity}
            onChange={(v) => update('insanity', v)}
            display={`${config.insanity}/10`}
            hint={`Každý stupeň nad 1 = +1 499 zł a +6 % výkonu`}
            danger={config.insanity >= 8}
          />
        </Step>
        <Step n={7} title="Požadovaný výkon">
          <RangeField
            label="Požadovaný výkon v koních"
            min={HP_MIN}
            max={HP_MAX}
            step={50}
            value={config.targetHp}
            onChange={(v) => update('targetHp', v)}
            display={`${formatNumber(config.targetHp)} k`}
            hint={
              calc.missingHp > 0
                ? `Sestava dává ${formatNumber(calc.builtHp)} k – chybějících ${formatNumber(calc.missingHp)} k doladíme za 15 zł/k.`
                : `Sestava dává ${formatNumber(calc.builtHp)} k – požadavek splněn bez příplatku.`
            }
          />
        </Step>
      </div>

      <aside className="lg:sticky lg:top-24 lg:col-start-2 lg:row-span-3 lg:row-start-1 lg:self-start">
        <div className="flex flex-col gap-5 border border-border bg-card p-6 lg:max-h-[calc(100svh-7rem)] lg:overflow-y-auto">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-xl uppercase">Shrnutí sestavy</h2>
            <button
              type="button"
              onClick={() => {
                setConfig(defaultConfig)
                setResult(null)
              }}
              className="inline-flex items-center gap-1 text-xs uppercase tracking-wider text-muted-foreground hover:text-primary"
            >
              <RotateCcw className="size-3.5" aria-hidden="true" />
              Reset
            </button>
          </div>
          <div className="mx-auto w-36 xl:w-44">
            <Tachometer value={calc.finalHp / HP_MAX} label="MAX 2000 K" />
          </div>
          <ul className="flex flex-col gap-3 text-sm">
            {calc.lines.map((l) => (
              <li key={l.label} className="flex items-start justify-between gap-4 border-b border-dashed border-border pb-3">
                <span>
                  <span className="block font-semibold">{l.label}</span>
                  <span className="text-xs text-muted-foreground">{l.detail}</span>
                </span>
                <span className="shrink-0 tabular-nums">{formatPLN(l.price)}</span>
              </li>
            ))}
          </ul>
          <dl className="grid grid-cols-2 gap-px border border-border bg-border">
            <div className="bg-background p-3">
              <dt className="text-[10px] uppercase tracking-widest text-muted-foreground">Fiktivní výkon</dt>
              <dd className="font-display text-2xl tabular-nums text-primary">{`${formatNumber(calc.finalHp)} k`}</dd>
            </div>
            <div className="bg-background p-3">
              <dt className="text-[10px] uppercase tracking-widest text-muted-foreground">Nárůst</dt>
              <dd className="font-display text-2xl tabular-nums text-accent">
                {`+${formatNumber(Math.max(0, calc.finalHp - calc.stockHp))} k`}
              </dd>
            </div>
          </dl>
          <div className="flex items-end justify-between" aria-live="polite">
            <span className="text-xs uppercase tracking-widest text-muted-foreground">Celkem</span>
            <span className="font-display text-4xl tabular-nums text-accent">{formatPLN(calc.total)}</span>
          </div>
          <button type="button" onClick={handleCalculate} className={ctaClasses('primary', 'w-full py-4 text-base')}>
            Spočítat moje monstrum
          </button>
        </div>
      </aside>

      {result ? (
        <div
          ref={resultRef}
          role="status"
          className="relative overflow-hidden border-2 border-primary bg-card p-8 animate-in fade-in zoom-in-95 duration-500 lg:col-start-1 md:p-12"
        >
          <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-20 size-80 rounded-full bg-primary/20 blur-3xl" />
          <div className="relative grid items-center gap-8 md:grid-cols-[auto_1fr]">
            <div className="relative mx-auto w-48 md:w-56">
              <Tachometer value={result.hp / HP_MAX} label="MAX 2000 K" />
              <Flame className="absolute -bottom-2 -right-16 h-10 w-28" />
            </div>
            <div className="flex flex-col gap-4">
              <p className="font-display text-xs uppercase tracking-[0.3em] text-primary">Vaše monstrum je spočítáno</p>
              <p className="font-display text-5xl uppercase leading-none md:text-7xl">
                <span className="text-primary text-glow">{`${formatNumber(result.hp)} k`}</span>
              </p>
              <p className="font-display text-3xl tabular-nums text-accent md:text-4xl">{formatPLN(result.total)}</p>
              <p className="text-lg text-foreground/85">{verdict(result.hp, result.insanity)}</p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <CtaLink href="/kontakt">Objednat stavbu</CtaLink>
                <CtaLink href="/galerie" variant="outline">
                  Inspirace v galerii
                </CtaLink>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <Disclaimer className="lg:col-start-1">{`${DISCLAIMER} Konfigurátor slouží pro zábavu, cena ani výkon nejsou závaznou nabídkou.`}</Disclaimer>
    </div>
  )
}

function Step({ n, title, children }: { n: number; title: string; children: ReactNode }) {
  return (
    <fieldset className="flex flex-col gap-4">
      <legend className="mb-4 flex items-center gap-3">
        <span className="flex size-9 items-center justify-center bg-primary font-display text-primary-foreground">{n}</span>
        <span className="font-display text-xl uppercase md:text-2xl">{title}</span>
      </legend>
      {children}
    </fieldset>
  )
}

function OptionGrid({
  name,
  options,
  value,
  onChange,
  showHp = false,
}: {
  name: string
  options: Option[]
  value: string
  onChange: (id: string) => void
  showHp?: boolean
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
      {options.map((o) => {
        const selected = o.id === value
        return (
          <label
            key={o.id}
            className={cn(
              'group relative flex cursor-pointer flex-col gap-2 border p-4 transition-all has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-primary',
              selected ? 'border-primary bg-primary/10' : 'border-border bg-card hover:-translate-y-0.5 hover:border-primary/60',
            )}
          >
            <input
              type="radio"
              name={name}
              value={o.id}
              checked={selected}
              onChange={() => onChange(o.id)}
              className="sr-only"
            />
            <span className="flex items-start justify-between gap-3">
              <span className="font-display text-base uppercase leading-tight">{o.label}</span>
              <span
                aria-hidden="true"
                className={cn('mt-1 size-3 shrink-0 rotate-45 border', selected ? 'border-primary bg-primary' : 'border-muted-foreground')}
              />
            </span>
            <span className="text-sm text-muted-foreground">{o.note}</span>
            <span className="mt-auto flex items-center justify-between pt-2 text-sm">
              <span className="font-semibold tabular-nums text-accent">{o.price === 0 ? 'v ceně' : `+${formatPLN(o.price)}`}</span>
              <span className="tabular-nums text-primary">{showHp ? `${o.hp} k` : o.hp ? `+${o.hp} k` : '±0 k'}</span>
            </span>
          </label>
        )
      })}
    </div>
  )
}

function RangeField({
  label,
  min,
  max,
  step = 1,
  value,
  onChange,
  display,
  hint,
  danger = false,
}: {
  label: string
  min: number
  max: number
  step?: number
  value: number
  onChange: (v: number) => void
  display: string
  hint: string
  danger?: boolean
}) {
  const id = useId()
  const pct = ((value - min) / (max - min)) * 100
  return (
    <div className="flex flex-col gap-3 border border-border bg-card p-5">
      <div className="flex items-end justify-between">
        <label htmlFor={id} className="text-sm font-semibold uppercase tracking-wider">
          {label}
        </label>
        <output htmlFor={id} className={cn('font-display text-3xl tabular-nums', danger ? 'text-destructive' : 'text-primary')}>
          {display}
        </output>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-3 w-full cursor-pointer appearance-none bg-muted accent-primary [&::-moz-range-thumb]:size-6 [&::-moz-range-thumb]:rounded-none [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-foreground [&::-webkit-slider-thumb]:size-6 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:bg-foreground [&::-webkit-slider-thumb]:shadow-[0_0_12px_var(--primary)]"
        style={{
          background: `linear-gradient(to right, var(--primary) 0%, var(--accent) ${pct * 0.7}%, var(--destructive) ${pct}%, var(--muted) ${pct}%)`,
        }}
      />
      <p className="text-sm text-muted-foreground">{hint}</p>
    </div>
  )
}
