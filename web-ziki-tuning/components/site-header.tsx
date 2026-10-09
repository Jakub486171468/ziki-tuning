'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { navLinks } from '@/lib/data'
import { cn } from '@/lib/utils'
import { TurboIcon } from '@/components/ziki/graphics'
import { CtaLink } from '@/components/ziki/primitives'

export function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled || open
          ? 'border-b border-border bg-background/90 backdrop-blur-md'
          : 'bg-gradient-to-b from-background/80 to-transparent',
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 md:h-20 md:px-8">
        <Link href="/" className="group flex items-center gap-2" aria-label="ZIKI-TUNING – domů">
          <TurboIcon className="size-9 transition-transform duration-500 group-hover:rotate-180" spinning={false} />
          <span className="font-display text-xl tracking-tight md:text-2xl">
            ZIKI<span className="text-primary">-</span>TUNING
          </span>
        </Link>

        <nav aria-label="Hlavní navigace" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navLinks.map((link) => {
              const active = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href)
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'relative px-3 py-2 text-sm font-semibold uppercase tracking-wider transition-colors hover:text-primary',
                      active ? 'text-primary' : 'text-foreground/80',
                    )}
                  >
                    {link.label}
                    <span
                      aria-hidden="true"
                      className={cn(
                        'absolute inset-x-3 -bottom-0.5 h-0.5 origin-left bg-primary transition-transform',
                        active ? 'scale-x-100' : 'scale-x-0',
                      )}
                    />
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <CtaLink href="/konfigurator" className="hidden px-4 py-2 text-xs sm:inline-flex">
            Nakopnout motor
          </CtaLink>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center border border-border lg:hidden"
            aria-expanded={open}
            aria-controls="mobilni-menu"
            aria-label={open ? 'Zavřít menu' : 'Otevřít menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <nav
          id="mobilni-menu"
          aria-label="Mobilní navigace"
          className="h-[calc(100dvh-4rem)] overflow-y-auto border-t border-border carbon lg:hidden"
        >
          <ul className="flex flex-col px-4 py-6">
            {navLinks.map((link, i) => {
              const active = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href)
              return (
                <li
                  key={link.href}
                  className="animate-in fade-in slide-in-from-left-4 fill-mode-both"
                  style={{ animationDelay: `${i * 40}ms` }}
                >
                  <Link
                    href={link.href}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'flex items-center justify-between border-b border-border py-4 font-display text-3xl uppercase',
                      active ? 'text-primary' : 'text-foreground',
                    )}
                  >
                    {link.label}
                    <span aria-hidden="true" className="text-sm text-muted-foreground">
                      0{i + 1}
                    </span>
                  </Link>
                </li>
              )
            })}
          </ul>
          <div className="px-4 pb-10">
            <CtaLink href="/konfigurator" className="w-full">
              Nakopnout motor
            </CtaLink>
          </div>
        </nav>
      ) : null}
    </header>
  )
}
