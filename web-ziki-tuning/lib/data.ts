export function formatPLN(value: number) {
  return `${new Intl.NumberFormat('cs-CZ', { maximumFractionDigits: 0 }).format(value).replace(/\s/g, '\u00A0')}\u00A0zł`
}

export function formatNumber(value: number) {
  return new Intl.NumberFormat('cs-CZ', { maximumFractionDigits: 0 }).format(value)
}

export type Category =
  | 'turbo'
  | 'motor'
  | 'chlazeni'
  | 'vyfuk'
  | 'nitro'
  | 'vzhled'
  | 'prestavby'
  | 'balicky'

export const categoryLabels: Record<Category, string> = {
  turbo: 'Turba',
  motor: 'Motor & ECU',
  chlazeni: 'Chlazení',
  vyfuk: 'Výfuky',
  nitro: 'Nitro',
  vzhled: 'Vzhled & interiér',
  prestavby: 'Kompletní přestavby',
  balicky: 'Balíčky',
}

export type Service = {
  slug: string
  name: string
  description: string
  effect: string
  price: number
  category: Category
  accent: 'green' | 'orange' | 'red'
}

export const services: Service[] = [
  {
    slug: 'turbo-z-letadla',
    name: 'Turbo z dopravního letadla',
    description:
      'Turbo původně určené pro letadlo. Vaše auto možná zrychlí rychleji, než se stihne načíst rychloměr.',
    effect: '+850 koní',
    price: 24999,
    category: 'turbo',
    accent: 'orange',
  },
  {
    slug: 'vacka-smrti',
    name: 'Ostrá vačka smrti',
    description:
      'Vačkový hřídel tak ostrý, že motor na volnoběh zní jako rozzuřený šicí stroj.',
    effect: '+220 koní',
    price: 8499,
    category: 'motor',
    accent: 'red',
  },
  {
    slug: 'ziki-ecu',
    name: 'Palivové mapy ZIKI ECU',
    description:
      'Palivové mapy naladěné člověkem, který považuje červené pole otáčkoměru za doporučení.',
    effect: '+180 koní',
    price: 5999,
    category: 'motor',
    accent: 'green',
  },
  {
    slug: 'zavodni-sahara',
    name: 'Závodní Sahara',
    description:
      'Chladicí systém, který má za úkol udržet motor naživu i v situaci, kdy se asfalt začne tavit.',
    effect: 'stabilnější teploty při vysokém zatížení',
    price: 3499,
    category: 'chlazeni',
    accent: 'green',
  },
  {
    slug: 'vyfukovy-komin',
    name: 'Čtyřmetrový výfukový komín',
    description:
      'Zvuk tak výrazný, že navigace automaticky přepne na nouzovou trasu.',
    effect: '+0 až 12 koní podle konfigurace',
    price: 4299,
    category: 'vyfuk',
    accent: 'orange',
  },
  {
    slug: 'nitro-kombik',
    name: 'Nitro pro rodinný kombík',
    description: 'Protože předjet kamion normálně je příliš obyčejné.',
    effect: '+300 koní po aktivaci',
    price: 12999,
    category: 'nitro',
    accent: 'red',
  },
  {
    slug: 'twin-turbo-xxl',
    name: 'Twin Turbo XXL',
    description: 'Když jedno turbo nestačí a dvě turba jsou teprve začátek.',
    effect: '+500 koní',
    price: 18999,
    category: 'turbo',
    accent: 'orange',
  },
  {
    slug: 'stage-9000',
    name: 'Stage 9000 – absolutní nesmysl',
    description:
      'Kompletní přestavba na monstrum, které by se mělo řídit pouze na uzavřeném okruhu. Sousedé o vás budou vědět ještě před nákupem.',
    effect: 'absurdních 2 000 koní – čistě fiktivní',
    price: 99999,
    category: 'prestavby',
    accent: 'red',
  },
]

export type TuningPackage = {
  slug: string
  name: string
  price: number
  features: string[]
  tagline: string
  warning?: string
  featured?: boolean
}

export const packages: TuningPackage[] = [
  {
    slug: 'soused-uz-nespi',
    name: 'Soused už nespí',
    price: 6999,
    features: ['Sportovní vzhled', 'Zvukový styling', 'Základní tuningový balíček'],
    tagline: 'Pro lidi, kteří chtějí být slyšet ještě před příjezdem.',
  },
  {
    slug: 'polsky-vesmirny-program',
    name: 'Polský vesmírný program',
    price: 29999,
    features: ['Extrémní turbo styling', 'Závodní vzhled', 'Dramatické vizuální efekty'],
    tagline: 'Pro auta, která se tváří, že startují na oběžnou dráhu.',
    featured: true,
  },
  {
    slug: 'ziki-apokalypsa',
    name: 'ZIKI Apokalypsa',
    price: 149999,
    features: [
      'Nejextrémnější fiktivní přestavba',
      'Obří turbo',
      'Agresivní bodykit',
      'Závodní interiér',
      'Digitální dashboard',
    ],
    tagline: 'Konec zdravého rozumu v jednom balíčku.',
    warning: 'Tento balíček je určen pro lidi, kterým už nestačí ani zdravý rozum.',
  },
]

export type PriceItem = {
  slug: string
  name: string
  description: string
  price: number
  category: Category
}

const extraItems: PriceItem[] = [
  {
    slug: 'karbonova-kapota',
    name: 'Karbonová kapota s otvorem pro turbo',
    description: 'Lehčí o 8 kg, těžší na vysvětlování na STK.',
    price: 2499,
    category: 'vzhled',
  },
  {
    slug: 'agresivni-bodykit',
    name: 'Agresivní bodykit „Žralok“',
    description: 'Spoiler tak nízko, že sbírá drobné z asfaltu.',
    price: 7999,
    category: 'vzhled',
  },
  {
    slug: 'zavodni-sedacky',
    name: 'Závodní skořepinové sedačky',
    description: 'Drží vás pevněji než splátkový kalendář.',
    price: 3299,
    category: 'vzhled',
  },
  {
    slug: 'digitalni-dashboard',
    name: 'Digitální dashboard ZIKI-OS',
    description: 'Ukazuje otáčky, teploty a počet naštvaných sousedů v okolí.',
    price: 4499,
    category: 'vzhled',
  },
  {
    slug: 'intercooler-xxl',
    name: 'Intercooler velikosti dveří',
    description: 'Chladí vzduch, motor i vaše vztahy s okolím.',
    price: 2899,
    category: 'chlazeni',
  },
  {
    slug: 'single-turbo-fen',
    name: 'Single turbo „Fén“',
    description: 'Vstupní droga do světa přetlaku.',
    price: 4999,
    category: 'turbo',
  },
  {
    slug: 'vystrelovaci-vyfuk',
    name: 'Přímý průchod „Ohňostroj“',
    description: 'Plameny při podřazení v ceně, hasicí přístroj zvlášť.',
    price: 2999,
    category: 'vyfuk',
  },
  {
    slug: 'nitro-dvojity',
    name: 'Dvojité nitro „Startovní rampa“',
    description: 'Jedna láhev na předjíždění, druhá na zážitek.',
    price: 19999,
    category: 'nitro',
  },
  {
    slug: 'mereni-valce',
    name: 'Měření na válcové zkušebně',
    description: 'Zjistíme, kolik koní máte. Pak zjistíme, kolik jich chcete.',
    price: 499,
    category: 'motor',
  },
  {
    slug: 'kovane-pisty',
    name: 'Kované písty a ojnice',
    description: 'Vnitřnosti motoru, které se nebojí ničeho kromě účtenky.',
    price: 11999,
    category: 'motor',
  },
]

export const priceList: PriceItem[] = [
  ...services.map(({ slug, name, description, price, category }) => ({
    slug,
    name,
    description,
    price,
    category,
  })),
  ...extraItems,
  ...packages.map(({ slug, name, price, tagline }) => ({
    slug,
    name: `Balíček „${name}“`,
    description: tagline,
    price,
    category: 'balicky' as Category,
  })),
]

export type Project = {
  slug: string
  car: string
  title: string
  image: string
  story: string
  specs: { label: string; value: string }[]
}

export const projects: Project[] = [
  {
    slug: 'golf-iv',
    car: 'Golf IV',
    title: 'Polský stíhací program',
    image: '/images/golf.png',
    story:
      'Majitel chtěl „jen trochu víc výkonu“. Po třech měsících a jednom intercooleru velikosti garážových vrat jezdí Golf, který v radaru vypadá jako stíhačka.',
    specs: [
      { label: 'Výkon', value: '740 k' },
      { label: '0–100', value: '3,1 s' },
      { label: 'Turbo', value: 'Garrett „Hangár“' },
      { label: 'Hluk', value: '6,2 Richtera' },
    ],
  },
  {
    slug: 'bmw-e46',
    car: 'BMW E46',
    title: 'Turbo větší než kufr',
    image: '/images/bmw.png',
    story:
      'Kufr jsme museli zrušit, protože se tam nevešlo turbo. Nákupy se teď vozí na střeše, ale zato se dovezou za polovinu času.',
    specs: [
      { label: 'Výkon', value: '980 k' },
      { label: '0–100', value: '2,8 s' },
      { label: 'Turbo', value: '1× XXL 102 mm' },
      { label: 'Zavazadla', value: '0 l' },
    ],
  },
  {
    slug: 'octavia',
    car: 'Škoda Octavia',
    title: 'Rodinný sleeper 1500 HP',
    image: '/images/octavia.png',
    story:
      'Zvenku nenápadný kombík s dětskými sedačkami. Uvnitř 1 500 fiktivních koní. Na semaforu nikdo nečeká, že tatínek s nákupem vyhraje.',
    specs: [
      { label: 'Výkon', value: '1 500 k' },
      { label: '0–100', value: '2,4 s' },
      { label: 'Turbo', value: 'Twin XXL' },
      { label: 'Kufr', value: 'Stále 610 l' },
    ],
  },
  {
    slug: 'civic',
    car: 'Honda Civic',
    title: 'Otáčky až do jiné dimenze',
    image: '/images/civic.png',
    story:
      'Omezovač jsme nastavili na 13 000 otáček. Pak jsme ho vypnuli. Motor teď zpívá ve frekvencích, které slyší jen psi a fyzici.',
    specs: [
      { label: 'Výkon', value: '520 k' },
      { label: 'Otáčky', value: '13 000+' },
      { label: 'VTEC', value: 'Neustále' },
      { label: 'Křídlo', value: '1,9 m' },
    ],
  },
  {
    slug: 'multipla',
    car: 'Fiat Multipla',
    title: 'Aerodynamický experiment',
    image: '/images/multipla.png',
    story:
      'Aerodynamika Multiply byla vždy záhadou. My jsme ji vyřešili obřím křídlem, splitterem a dávkou odvahy. Odpor vzduchu se teď bojí jí.',
    specs: [
      { label: 'Výkon', value: '610 k' },
      { label: 'Přítlak', value: '420 kg' },
      { label: 'Sedadla', value: '6 závodních' },
      { label: 'Krása', value: 'Subjektivní' },
    ],
  },
  {
    slug: 'trabant',
    car: 'Trabant',
    title: 'Dvoutaktní apokalypsa',
    image: '/images/trabant.png',
    story:
      'Duroplast, dva válce a turbo, které váží víc než zbytek auta. Modrý kouř viditelný z oběžné dráhy je zahrnut v ceně.',
    specs: [
      { label: 'Výkon', value: '260 k' },
      { label: 'Původně', value: '26 k' },
      { label: 'Kouř', value: 'Modrý, hodně' },
      { label: 'Karoserie', value: 'Duroplast+' },
    ],
  },
]

export const navLinks = [
  { href: '/', label: 'Domů' },
  { href: '/cenik', label: 'Ceník' },
  { href: '/konfigurator', label: 'Konfigurátor' },
  { href: '/galerie', label: 'Galerie' },
  { href: '/o-nas', label: 'O nás' },
  { href: '/kontakt', label: 'Kontakt' },
]

export const DISCLAIMER =
  'Údaje o výkonu jsou součástí fiktivního humoristického konceptu.'
