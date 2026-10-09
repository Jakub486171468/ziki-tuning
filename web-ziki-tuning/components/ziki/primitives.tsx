import Link from 'next/link'
import type { ComponentProps, ReactNode } from 'react'
import { cn } from '@/lib/utils'

type Variant = 'primary' | 'accent' | 'outline' | 'danger'

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-primary text-primary-foreground hover:shadow-[0_0_28px_-4px_var(--primary)] hover:brightness-110',
  accent:
    'bg-accent text-accent-foreground hover:shadow-[0_0_28px_-4px_var(--accent)] hover:brightness-110',
  danger:
    'bg-destructive text-white hover:shadow-[0_0_28px_-4px_var(--destructive)] hover:brightness-110',
  outline:
    'border border-foreground/30 bg-background/40 text-foreground backdrop-blur hover:border-primary hover:text-primary',
}

export function ctaClasses(variant: Variant = 'primary', className?: string) {
  return cn(
    'group/cta relative inline-flex items-center justify-center gap-2 px-6 py-3 font-display text-sm uppercase tracking-wider transition-all duration-200 clip-slant active:translate-y-px focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary disabled:pointer-events-none disabled:opacity-50',
    variantClasses[variant],
    className,
  )
}

export function CtaLink({
  variant = 'primary',
  className,
  ...props
}: ComponentProps<typeof Link> & { variant?: Variant }) {
  return <Link className={ctaClasses(variant, className)} {...props} />
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  as: Tag = 'h2',
}: {
  eyebrow: string
  title: ReactNode
  description?: ReactNode
  align?: 'left' | 'center'
  as?: 'h1' | 'h2'
}) {
  return (
    <div className={cn('flex flex-col gap-4', align === 'center' && 'items-center text-center')}>
      <p className="flex items-center gap-3 font-display text-xs uppercase tracking-[0.3em] text-primary">
        <span aria-hidden="true" className="h-px w-8 bg-primary" />
        {eyebrow}
      </p>
      <Tag className="text-balance font-display text-4xl uppercase leading-[0.95] md:text-6xl">
        {title}
      </Tag>
      {description ? (
        <p className="max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
          {description}
        </p>
      ) : null}
    </div>
  )
}

export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string
  title: ReactNode
  description?: ReactNode
}) {
  return (
    <section className="relative overflow-hidden border-b border-border carbon">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-32 size-96 rounded-full bg-primary/15 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 left-10 size-96 rounded-full bg-accent/10 blur-3xl"
      />
      <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-32 md:px-8 md:pb-20 md:pt-40">
        <SectionHeading as="h1" eyebrow={eyebrow} title={title} description={description} />
      </div>
      <div aria-hidden="true" className="h-2 hazard opacity-80" />
    </section>
  )
}

export function Disclaimer({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <p
      role="note"
      className={cn(
        'flex items-start gap-3 border-l-4 border-accent bg-accent/10 px-4 py-3 text-sm text-foreground/90',
        className,
      )}
    >
      <span aria-hidden="true" className="font-display text-accent">
        !
      </span>
      <span>{children}</span>
    </p>
  )
}
