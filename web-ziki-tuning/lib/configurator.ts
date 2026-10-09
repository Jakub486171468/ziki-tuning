import { formatPLN } from '@/lib/data'

export type Option = { id: string; label: string; price: number; hp: number; note: string }

export const carOptions: Option[] = [
  { id: 'hatchback', label: 'Hatchback', price: 0, hp: 100, note: 'Klasika. Za týden to nebude klasika.' },
  { id: 'kombik', label: 'Rodinný kombík', price: 800, hp: 140, note: 'Ideální sleeper. Kufr zůstává, respekt přibývá.' },
  { id: 'sedan', label: 'Sedan', price: 500, hp: 120, note: 'Elegance, která umí rozbít ticho.' },
  { id: 'kupe', label: 'Kupé', price: 1500, hp: 180, note: 'Dvoje dveře, nula soucitu.' },
  { id: 'multipla', label: 'Fiat Multipla', price: 1999, hp: 105, note: 'Aerodynamický experiment. Příplatek za odvahu.' },
  { id: 'trabant', label: 'Trabant', price: 2999, hp: 26, note: 'Duroplast se příplatkem nezpevní, ale zkusíme to.' },
]

export const turboOptions: Option[] = [
  { id: 'zadne', label: 'Bez turba', price: 0, hp: 0, note: 'Atmosféra. Jak roztomilé.' },
  { id: 'fen', label: 'Turbo „Fén“', price: 4999, hp: 120, note: 'Vstupní droga do světa přetlaku.' },
  { id: 'sud', label: 'Turbo „Sud od piva“', price: 9999, hp: 300, note: 'Velikost i zvuk odpovídá názvu.' },
  { id: 'letadlo', label: 'Turbo z dopravního letadla', price: 24999, hp: 850, note: 'Rychloměr se nestíhá načíst.' },
]

export const camOptions: Option[] = [
  { id: 'seriova', label: 'Sériová', price: 0, hp: 0, note: 'Volnoběh jako šepot.' },
  { id: 'ostra', label: 'Ostrá', price: 3499, hp: 80, note: 'Volnoběh jako hádka.' },
  { id: 'smrt', label: 'Vačka smrti', price: 8499, hp: 220, note: 'Volnoběh jako rozzuřený šicí stroj.' },
]

export const exhaustOptions: Option[] = [
  { id: 'seriovy', label: 'Sériový', price: 0, hp: 0, note: 'Tiché, nudné, legální.' },
  { id: 'ohnostroj', label: 'Přímý průchod „Ohňostroj“', price: 2999, hp: 8, note: 'Plameny v ceně, hasicí přístroj zvlášť.' },
  { id: 'komin', label: 'Čtyřmetrový výfukový komín', price: 4299, hp: 12, note: 'Navigace přepne na nouzovou trasu.' },
]

export const TURBO_COUNTS = [1, 2, 3, 4] as const
export const INSANITY_FEE = 1499
export const INSANITY_HP_BONUS = 0.06
export const EXTRA_HP_FEE = 15
export const HP_MIN = 100
export const HP_MAX = 2000

export type Config = {
  car: string
  turbo: string
  turboCount: number
  cam: string
  exhaust: string
  insanity: number
  targetHp: number
}

export const defaultConfig: Config = {
  car: 'kombik',
  turbo: 'sud',
  turboCount: 2,
  cam: 'ostra',
  exhaust: 'ohnostroj',
  insanity: 5,
  targetHp: 600,
}

function pick(list: Option[], id: string) {
  return list.find((o) => o.id === id) ?? list[0]
}

export type LineItem = { label: string; detail: string; price: number }

export function calculate(config: Config) {
  const car = pick(carOptions, config.car)
  const turbo = pick(turboOptions, config.turbo)
  const cam = pick(camOptions, config.cam)
  const exhaust = pick(exhaustOptions, config.exhaust)
  const turboCount = turbo.id === 'zadne' ? 0 : config.turboCount
  const insanitySteps = config.insanity - 1

  const lines: LineItem[] = [
    { label: 'Základ: ' + car.label, detail: `${car.hp} k sériově`, price: car.price },
    {
      label: turboCount ? `${turbo.label} ×${turboCount}` : 'Bez turba',
      detail: turboCount ? `${turboCount} × ${formatPLN(turbo.price)}` : '—',
      price: turbo.price * turboCount,
    },
    { label: `Vačka: ${cam.label}`, detail: `+${cam.hp} k`, price: cam.price },
    { label: `Výfuk: ${exhaust.label}`, detail: `+${exhaust.hp} k`, price: exhaust.price },
    {
      label: `Příplatek za šílenství ${config.insanity}/10`,
      detail: `${insanitySteps} × ${formatPLN(INSANITY_FEE)}`,
      price: insanitySteps * INSANITY_FEE,
    },
  ]

  const hardwareHp = car.hp + turbo.hp * turboCount + cam.hp + exhaust.hp
  const builtHp = Math.round(hardwareHp * (1 + insanitySteps * INSANITY_HP_BONUS))
  const missingHp = Math.max(0, config.targetHp - builtHp)

  if (missingHp > 0) {
    lines.push({
      label: 'Doladění na požadovaný výkon',
      detail: `${missingHp} k × ${formatPLN(EXTRA_HP_FEE)}`,
      price: missingHp * EXTRA_HP_FEE,
    })
  }

  const total = lines.reduce((sum, l) => sum + l.price, 0)
  const finalHp = builtHp + missingHp

  return { lines, total, builtHp, finalHp, missingHp, stockHp: car.hp }
}

export function verdict(hp: number, insanity: number) {
  if (hp >= 1500 || insanity >= 9) return 'Klasifikováno jako přírodní katastrofa. Sousedé už balí.'
  if (hp >= 900) return 'Tohle auto potřebuje vlastní letový plán.'
  if (hp >= 500) return 'Semafory se vás začnou bát.'
  if (hp >= 250) return 'Slušný začátek. Ale jen začátek.'
  return 'Roztomilé. Opravdu nechcete aspoň jedno turbo?'
}
