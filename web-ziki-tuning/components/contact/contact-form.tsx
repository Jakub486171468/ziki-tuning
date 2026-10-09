'use client'

import { useState, type FormEvent } from 'react'
import { CheckCircle2, Info } from 'lucide-react'
import { categoryLabels, formatPLN, priceList, type Category } from '@/lib/data'
import { cn } from '@/lib/utils'
import { ctaClasses } from '@/components/ziki/primitives'

const carTypes = ['Hatchback', 'Sedan', 'Kombík', 'Kupé', 'SUV', 'MPV / Multipla', 'Trabant', 'Jiné (překvapte nás)']

type Fields = { jmeno: string; email: string; auto: string; uprava: string; zprava: string }
type Errors = Partial<Record<keyof Fields, string>>

function validate(f: Fields): Errors {
  const errors: Errors = {}
  if (f.jmeno.trim().length < 2) errors.jmeno = 'Zadejte jméno (alespoň 2 znaky).'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim())) errors.email = 'Zadejte platný e-mail.'
  if (!f.auto) errors.auto = 'Vyberte typ auta.'
  if (!f.uprava) errors.uprava = 'Vyberte požadovanou úpravu.'
  return errors
}

const grouped = (Object.keys(categoryLabels) as Category[]).map((c) => ({
  category: c,
  items: priceList.filter((i) => i.category === c),
}))

export function ContactForm({ defaultUprava = '' }: { defaultUprava?: string }) {
  const [errors, setErrors] = useState<Errors>({})
  const [submitted, setSubmitted] = useState<Fields | null>(null)

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const fields: Fields = {
      jmeno: String(data.get('jmeno') ?? ''),
      email: String(data.get('email') ?? ''),
      auto: String(data.get('auto') ?? ''),
      uprava: String(data.get('uprava') ?? ''),
      zprava: String(data.get('zprava') ?? ''),
    }
    const found = validate(fields)
    setErrors(found)
    if (Object.keys(found).length > 0) {
      const first = Object.keys(found)[0]
      e.currentTarget.querySelector<HTMLElement>(`[name="${first}"]`)?.focus()
      return
    }
    setSubmitted(fields)
  }

  if (submitted) {
    const item = priceList.find((i) => i.slug === submitted.uprava)
    return (
      <div role="status" className="flex flex-col gap-6 border border-primary bg-primary/5 p-8 animate-in fade-in zoom-in-95">
        <CheckCircle2 className="size-14 text-primary" aria-hidden="true" />
        <h2 className="font-display text-3xl uppercase">{`Díky, ${submitted.jmeno.trim()}! Motor nastartován.`}</h2>
        <p className="text-muted-foreground">
          Toto je <strong className="text-foreground">demonstrační formulář</strong> – nic se ve skutečnosti
          neodeslalo a nikdo vám nezavolá. Ale kdyby ano, vypadalo by to takto:
        </p>
        <dl className="grid gap-px border border-border bg-border sm:grid-cols-2">
          {[
            ['Jméno', submitted.jmeno],
            ['E-mail', submitted.email],
            ['Typ auta', submitted.auto],
            ['Požadovaná úprava', item ? `${item.name} – ${formatPLN(item.price)}` : submitted.uprava],
          ].map(([k, v]) => (
            <div key={k} className="bg-background p-4">
              <dt className="text-xs uppercase tracking-widest text-muted-foreground">{k}</dt>
              <dd className="mt-1 break-words font-semibold">{v}</dd>
            </div>
          ))}
        </dl>
        <button type="button" onClick={() => setSubmitted(null)} className={ctaClasses('outline', 'w-fit')}>
          Odeslat další šílenost
        </button>
      </div>
    )
  }

  return (
    <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-6 border border-border bg-card p-6 md:p-8">
      <p className="flex items-start gap-3 border border-accent/40 bg-accent/10 p-4 text-sm">
        <Info className="mt-0.5 size-5 shrink-0 text-accent" aria-hidden="true" />
        <span>
          <strong>Demonstrační formulář:</strong> není napojený na žádný backend. Data se nikam neodesílají a
          zůstávají jen ve vašem prohlížeči.
        </span>
      </p>
      <div className="grid gap-6 md:grid-cols-2">
        <Field label="Jméno" name="jmeno" error={errors.jmeno}>
          <input id="jmeno" name="jmeno" autoComplete="name" placeholder="Jan Plnoplyn" className={inputClass(!!errors.jmeno)} {...errAttrs('jmeno', errors.jmeno)} />
        </Field>
        <Field label="E-mail" name="email" error={errors.email}>
          <input id="email" name="email" type="email" autoComplete="email" placeholder="jan@turbo.example" className={inputClass(!!errors.email)} {...errAttrs('email', errors.email)} />
        </Field>
        <Field label="Typ auta" name="auto" error={errors.auto}>
          <select id="auto" name="auto" defaultValue="" className={inputClass(!!errors.auto)} {...errAttrs('auto', errors.auto)}>
            <option value="" disabled>
              Vyberte typ auta
            </option>
            {carTypes.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Požadovaná úprava" name="uprava" error={errors.uprava}>
          <select id="uprava" name="uprava" defaultValue={defaultUprava} className={inputClass(!!errors.uprava)} {...errAttrs('uprava', errors.uprava)}>
            <option value="" disabled>
              Vyberte úpravu
            </option>
            {grouped.map((g) => (
              <optgroup key={g.category} label={categoryLabels[g.category]}>
                {g.items.map((i) => (
                  <option key={i.slug} value={i.slug}>
                    {`${i.name} – ${formatPLN(i.price)}`}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </Field>
      </div>
      <Field label="Zpráva (nepovinné)" name="zprava">
        <textarea id="zprava" name="zprava" rows={5} placeholder="Popište své auto a míru zoufalství…" className={cn(inputClass(false), 'h-auto py-3')} />
      </Field>
      <button type="submit" className={ctaClasses('primary', 'w-full py-4 text-base sm:w-fit')}>
        Odeslat poptávku
      </button>
    </form>
  )
}

function errAttrs(name: string, error?: string) {
  return { 'aria-invalid': error ? true : undefined, 'aria-describedby': error ? `${name}-error` : undefined }
}

function inputClass(hasError: boolean) {
  return cn(
    'h-12 w-full border bg-background px-3 text-base outline-none transition-colors placeholder:text-muted-foreground focus:border-primary',
    hasError ? 'border-destructive' : 'border-input',
  )
}

function Field({ label, name, error, children }: { label: string; name: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="text-sm font-semibold uppercase tracking-wider">
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${name}-error`} className="text-sm text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  )
}
