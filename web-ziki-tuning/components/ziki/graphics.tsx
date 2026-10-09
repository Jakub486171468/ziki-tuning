import { cn } from '@/lib/utils'

function polar(angleDeg: number, r: number) {
  const a = (angleDeg * Math.PI) / 180
  return { x: 100 + Math.sin(a) * r, y: 100 - Math.cos(a) * r }
}

function arcPath(fromDeg: number, toDeg: number, r: number) {
  const start = polar(fromDeg, r)
  const end = polar(toDeg, r)
  const large = toDeg - fromDeg > 180 ? 1 : 0
  return `M ${start.x.toFixed(2)} ${start.y.toFixed(2)} A ${r} ${r} 0 ${large} 1 ${end.x.toFixed(2)} ${end.y.toFixed(2)}`
}

export function TurboIcon({ className, spinning = true }: { className?: string; spinning?: boolean }) {
  const blades = Array.from({ length: 11 })
  return (
    <svg viewBox="0 0 100 100" className={cn('text-primary', className)} aria-hidden="true">
      <circle cx="50" cy="50" r="47" fill="none" stroke="currentColor" strokeWidth="3" />
      <circle cx="50" cy="50" r="41" fill="none" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1" />
      <g className={cn('origin-center', spinning && 'animate-spin-fast')} style={{ transformBox: 'fill-box' }}>
        {blades.map((_, i) => (
          <path
            key={i}
            d="M50 50 C 56 40, 62 22, 52 10 L 47 11 C 53 24, 49 38, 50 50 Z"
            fill="currentColor"
            fillOpacity={i % 2 === 0 ? 0.95 : 0.7}
            transform={`rotate(${(360 / blades.length) * i} 50 50)`}
          />
        ))}
        <circle cx="50" cy="50" r="7" fill="var(--background)" stroke="currentColor" strokeWidth="2" />
      </g>
    </svg>
  )
}

export function Tachometer({
  className,
  value,
  animated = false,
  label = 'RPM ×1000',
}: {
  className?: string
  value?: number
  animated?: boolean
  label?: string
}) {
  const ticks = Array.from({ length: 10 })
  const angle = -120 + Math.min(Math.max(value ?? 0, 0), 1) * 240
  return (
    <svg viewBox="0 0 200 200" className={cn('text-foreground', className)} aria-hidden="true">
      <circle cx="100" cy="100" r="94" fill="oklch(0.11 0.005 260)" stroke="currentColor" strokeOpacity="0.15" strokeWidth="2" />
      <path d={arcPath(93, 120, 84)} fill="none" stroke="var(--destructive)" strokeWidth="7" />
      {ticks.map((_, i) => {
        const a = ((-120 + (240 / 9) * i - 90) * Math.PI) / 180
        const x1 = 100 + Math.cos(a) * 78
        const y1 = 100 + Math.sin(a) * 78
        const x2 = 100 + Math.cos(a) * 66
        const y2 = 100 + Math.sin(a) * 66
        const tx = 100 + Math.cos(a) * 54
        const ty = 100 + Math.sin(a) * 54
        return (
          <g key={i}>
            <line
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={i >= 8 ? 'var(--destructive)' : 'currentColor'}
              strokeWidth="3"
            />
            <text
              x={tx}
              y={ty + 4}
              textAnchor="middle"
              fontSize="12"
              fill={i >= 8 ? 'var(--destructive)' : 'currentColor'}
              fontFamily="var(--font-display)"
            >
              {i}
            </text>
          </g>
        )
      })}
      <text x="100" y="140" textAnchor="middle" fontSize="9" fill="currentColor" fillOpacity="0.5" letterSpacing="2">
        {label}
      </text>
      <g
        className={cn(animated && 'animate-needle')}
        style={{
          transformOrigin: '100px 100px',
          transform: animated ? undefined : `rotate(${angle}deg)`,
          transition: 'transform 0.6s cubic-bezier(0.3, 1.4, 0.5, 1)',
        }}
      >
        <path d="M 97 100 L 100 24 L 103 100 Z" fill="var(--accent)" />
      </g>
      <circle cx="100" cy="100" r="9" fill="var(--accent)" />
      <circle cx="100" cy="100" r="4" fill="oklch(0.11 0.005 260)" />
    </svg>
  )
}

export function Flame({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 40" className={cn('origin-left animate-flame', className)} aria-hidden="true">
      <defs>
        <linearGradient id="flame-grad" x1="0" x2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.2" stopColor="#7dd3fc" />
          <stop offset="0.45" stopColor="var(--accent)" />
          <stop offset="1" stopColor="var(--destructive)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d="M0 20 C 30 4, 70 6, 120 18 C 70 30, 30 36, 0 20 Z" fill="url(#flame-grad)" />
    </svg>
  )
}
