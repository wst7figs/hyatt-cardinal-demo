/*
 * All demo content lives here.
 *
 * PLACEHOLDERS: every phone number, email, address, hour, price and review in
 * this file is invented for the demo. Swap the `shop` object below and the
 * prices in `products` when the real details are ready. Nothing else in the
 * codebase hardcodes contact information.
 */

export const shop = {
  name: 'Hyatt Cardinal Print & Press',
  shortName: 'Hyatt Cardinal',
  tagline: 'Screen printing, embroidery, and direct to garment.',
  hoursShort: 'Open Monday to Friday from 8:30am',
  phone: '(905) 555-0142',
  phoneHref: 'tel:+19055550142',
  email: 'hello@hyattcardinalpress.com',
  addressLine1: '1420 Barton Street East, Unit 6',
  addressLine2: 'Hamilton, ON  L8H 2W1',
  hours: [
    { day: 'Monday to Thursday', time: '8:30am to 5:30pm' },
    { day: 'Friday', time: '8:30am to 4:00pm' },
    { day: 'Saturday', time: 'By appointment' },
    { day: 'Sunday', time: 'Closed' },
  ],
  socials: [
    { label: 'Instagram', handle: '@hyattcardinal' },
    { label: 'Facebook', handle: 'Hyatt Cardinal Print & Press' },
    { label: 'TikTok', handle: '@hyattcardinal' },
  ],
}

/* ---- Informational site ------------------------------------------------ */

export const services = [
  { id: 'screen', name: 'Screen Printing', min: '24 piece minimum', garment: 'tee', color: '#1e1c1c', print: 'HC', image: null },
  { id: 'embroidery', name: 'Embroidery', min: '12 piece minimum', garment: 'polo', color: '#2b3a55', image: null },
  { id: 'dtg', name: 'Direct to Garment', min: 'No minimum', garment: 'tee', color: '#8f2733', print: 'DTG', image: null },
  { id: 'headwear', name: 'Headwear', min: '12 piece minimum', garment: 'cap', color: '#2f4f43', image: null },
  { id: 'finishing', name: 'Private Label', min: 'Tags, bagging and folding', garment: 'crew', color: '#4a4f57', image: null },
  { id: 'contract', name: 'Uniform Programs', min: 'Scheduled staff reorders', garment: 'jacket', color: '#1e1c1c', image: null },
]

export const processSteps = [
  {
    n: '01',
    title: 'Send your artwork',
    body: 'Upload a file or describe what you have in mind. Vector files print best, but we redraw raster art at no charge on orders over 50 pieces.',
  },
  {
    n: '02',
    title: 'Approve a proof',
    body: 'You get a digital mockup showing ink colours, print size, and placement on the actual garment. Nothing goes on press until you reply yes.',
  },
  {
    n: '03',
    title: 'We print and check',
    body: 'Every run gets a press check on the first pull and a count at the end. Misprints are pulled before packing, not after you open the box.',
  },
  {
    n: '04',
    title: 'Pick up or ship',
    body: 'Most orders finish in 7 to 10 business days. Local pickup at the shop, or flat rate shipping anywhere in Canada.',
  },
]

export const workSamples = [
  { title: 'Steel City FC', type: 'Supporter tees', garment: 'tee', color: '#c8342f', method: 'Screen print, 3 colour', image: '/media/tee-white.jpg' },
  { title: 'Bramble Coffee', type: 'Staff hoodies', garment: 'hoodie', color: '#2f4f43', method: 'Embroidery, left chest', image: '/media/hoodie-white.jpg' },
  { title: 'North End Skate', type: 'Winter drop', garment: 'crew', color: '#2b3a55', method: 'Screen print, 5 colour', image: '/media/stack.jpg' },
  { title: 'Harbour Trades Co', type: 'Crew uniforms', garment: 'polo', color: '#1f1f1f', method: 'Embroidery and hem tag', image: '/media/hangers.jpg' },
  { title: 'Lakeshore Records', type: 'Tour merch run', garment: 'longsleeve', color: '#141414', method: 'Screen print, discharge', image: '/media/tee-black.jpg' },
  { title: 'Cardinal Classic', type: 'Retail restock', garment: 'hoodie', color: '#7a1f2b', method: 'Screen print, 2 colour', image: '/media/hoodie-rack.jpg' },
]

export const testimonials = [
  {
    quote:
      'We moved four years of uniform work over after one order. The proofs come back the same day and the sizing has never been wrong.',
    name: 'Danielle Reyes',
    role: 'Operations, Harbour Trades Co',
  },
  {
    quote:
      'I sent a sketch on a napkin. They redrew it, showed me two ink options, and the hoodies sold out at our first market.',
    name: 'Marcus Oyelaran',
    role: 'Owner, Bramble Coffee',
  },
  {
    quote:
      'Two hundred shirts in five days during playoffs. They called me before printing because one colour was going to muddy on the navy.',
    name: 'Steph Kowalczyk',
    role: 'Club Manager, Steel City FC',
  },
]

export const faqs = [
  {
    q: 'What is the minimum order?',
    a: 'Screen printing starts at 24 pieces per design. Embroidery starts at 12. Direct to garment has no minimum, so single samples are fine.',
  },
  {
    q: 'How long does an order take?',
    a: 'Standard turnaround is 7 to 10 business days from proof approval. Rush service can bring that to 3 business days for an added fee, subject to press availability.',
  },
  {
    q: 'What file format should I send?',
    a: 'Vector artwork in AI, EPS, PDF or SVG gives the cleanest result. We also accept PNG and PSD at 300dpi. If all you have is a photo of a sketch, send it and we will quote the redraw.',
  },
  {
    q: 'Can I supply my own garments?',
    a: 'Yes. Customer supplied goods are printed at a reduced rate, though we cannot replace a garment we did not sell if a misprint happens. We recommend adding ten percent spares.',
  },
  {
    q: 'Do you price match?',
    a: 'Send us a written quote from another shop for the same garment, ink count, and quantity. If it is an equal comparison we will match it or tell you plainly why we cannot.',
  },
  {
    q: 'How does pricing work?',
    a: 'Price per piece depends on garment cost, quantity, number of ink colours, and print locations. Quantity is the biggest lever. Going from 24 to 72 pieces often drops the unit price by a third.',
  },
]

/* Real photos go in public/media. Set a path here, for example
   infoHero: '/media/hero.jpg', and it replaces the illustration.

   The current photos are free-licence placeholders from Pexels, to be swapped
   for photography of real Hyatt Cardinal orders:
     tee-white   Marina Podrez      hoodie-white  MART PRODUCTION
     tee-black   Rachel Claire      hoodie-rack   Ron Lach
     stack       Ron Lach           hangers       Nataliya Vaitkevich
     tote        Artem Podrez       press         James Collington */
export const photos = {
  infoHero: '/media/stack.jpg',
  artwork: '/media/press.jpg',
  storeHero: '/media/hoodie-rack.jpg',
  bulk: '/media/hangers.jpg',
}

export const reviewSummary = { rating: 4.9, source: 'Google' }

/* Placeholder pricing model behind the hero estimate. Blank prices come from
   the store products below; these are decoration costs per piece. */
export const estimator = {
  garments: [
    { id: 'tee', label: 'T-shirt', formLabel: 'T-shirts', productId: 'hc-tee-heavy', garment: 'tee', color: '#1e1c1c' },
    { id: 'hoodie', label: 'Hoodie', formLabel: 'Hoodies', productId: 'hc-hoodie-mid', garment: 'hoodie', color: '#2f4f43' },
    { id: 'crew', label: 'Crewneck', formLabel: 'Crewnecks', productId: 'hc-crew', garment: 'crew', color: '#4a4f57' },
    { id: 'cap', label: 'Cap', formLabel: 'Hats', productId: 'hc-cap-6panel', garment: 'cap', color: '#8f2733' },
  ],
  methods: [
    {
      id: 'screen',
      label: 'Screen print',
      service: 'Screen Printing',
      minimum: 24,
      perColour: true,
      tiers: [{ min: 24, price: 2.2 }, { min: 72, price: 1.5 }, { min: 144, price: 1.1 }],
    },
    {
      id: 'embroidery',
      label: 'Embroidery',
      service: 'Embroidery',
      minimum: 12,
      perColour: false,
      tiers: [{ min: 12, price: 7.5 }, { min: 48, price: 6 }, { min: 144, price: 5 }],
    },
    {
      id: 'dtg',
      label: 'DTG',
      service: 'Direct to Garment',
      minimum: 1,
      perColour: false,
      tiers: [{ min: 1, price: 9 }, { min: 24, price: 7.5 }, { min: 72, price: 6.5 }],
    },
  ],
}

export const trustStats = [
  { value: '18 yrs', label: 'Printing in Hamilton' },
  { value: '2.4M+', label: 'Pieces printed' },
  { value: '1 day', label: 'Quote turnaround' },
]

export const clients = [
  'Steel City FC',
  'Bramble Coffee',
  'North End Skate',
  'Harbour Trades Co',
  'Cardinal Classic',
  'Lakeshore Records',
]

/* ---- Store site -------------------------------------------------------- */

export const categories = [
  { id: 'tees', name: 'T-Shirts', garment: 'tee', color: '#d8d4cc' },
  { id: 'fleece', name: 'Hoodies & Fleece', garment: 'hoodie', color: '#4a4f57' },
  { id: 'headwear', name: 'Headwear', garment: 'cap', color: '#2b3a55' },
  { id: 'outerwear', name: 'Outerwear', garment: 'jacket', color: '#2f3a33' },
  { id: 'bags', name: 'Bags & Accessories', garment: 'tote', color: '#b8a888' },
]

const standardTeeSizes = ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL']
const fleeceSizes = ['S', 'M', 'L', 'XL', '2XL', '3XL']
const oneSize = ['One size']

export const products = [
  {
    id: 'hc-tee-heavy',
    name: 'Heavyweight Cotton Tee',
    category: 'tees',
    garment: 'tee',
    price: 28,
    compareAt: 34,
    rating: 4.8,
    reviews: 214,
    badge: 'Best seller',
    blurb:
      '6.5oz ringspun cotton with a boxy fit and double needle hems. Holds a print without the ink cracking after a season of wash.',
    colors: [
      { name: 'Bone', hex: '#e8e4dc' },
      { name: 'Black', hex: '#1a1a1a' },
      { name: 'Cardinal', hex: '#8f2733' },
      { name: 'Forest', hex: '#2f4f43' },
    ],
    sizes: standardTeeSizes,
    bulk: [
      { qty: '24+', price: 24 },
      { qty: '72+', price: 19 },
      { qty: '144+', price: 16 },
    ],
  },
  {
    id: 'hc-tee-vintage',
    name: 'Vintage Wash Tee',
    category: 'tees',
    garment: 'tee',
    price: 34,
    rating: 4.7,
    reviews: 96,
    badge: 'New',
    blurb:
      'Garment dyed and pre shrunk so it arrives already broken in. Slight colour variation between pieces is part of the process.',
    colors: [
      { name: 'Faded Rust', hex: '#a8623f' },
      { name: 'Washed Navy', hex: '#3c4a61' },
      { name: 'Pepper', hex: '#514c48' },
    ],
    sizes: standardTeeSizes,
    bulk: [
      { qty: '24+', price: 30 },
      { qty: '72+', price: 26 },
    ],
  },
  {
    id: 'hc-tee-long',
    name: 'Longsleeve Tee',
    category: 'tees',
    garment: 'longsleeve',
    price: 38,
    rating: 4.6,
    reviews: 71,
    blurb:
      '5.3oz cotton with ribbed cuffs. Popular for sleeve prints and back hits where you need more real estate than a short sleeve gives.',
    colors: [
      { name: 'Black', hex: '#1a1a1a' },
      { name: 'Bone', hex: '#e8e4dc' },
      { name: 'Slate', hex: '#4a4f57' },
    ],
    sizes: standardTeeSizes,
    bulk: [
      { qty: '24+', price: 33 },
      { qty: '72+', price: 28 },
    ],
  },
  {
    id: 'hc-tee-youth',
    name: 'Youth Tee',
    category: 'tees',
    garment: 'tee',
    price: 22,
    rating: 4.9,
    reviews: 143,
    blurb:
      'Same 6.5oz cotton body as the adult heavyweight, cut for ages 4 through 14. Sold in size runs for teams and camps.',
    colors: [
      { name: 'Bone', hex: '#e8e4dc' },
      { name: 'Cardinal', hex: '#8f2733' },
      { name: 'Royal', hex: '#2b4d8f' },
    ],
    sizes: ['YXS', 'YS', 'YM', 'YL', 'YXL'],
    bulk: [
      { qty: '24+', price: 18 },
      { qty: '72+', price: 15 },
    ],
  },
  {
    id: 'hc-hoodie-mid',
    name: 'Midweight Pullover Hoodie',
    category: 'fleece',
    garment: 'hoodie',
    price: 68,
    compareAt: 79,
    rating: 4.9,
    reviews: 308,
    badge: 'Best seller',
    blurb:
      '380gsm brushed fleece, two panel hood, and a kangaroo pocket that keeps its shape. The workhorse for staff and retail drops.',
    colors: [
      { name: 'Black', hex: '#1a1a1a' },
      { name: 'Heather Grey', hex: '#8d8a86' },
      { name: 'Forest', hex: '#2f4f43' },
      { name: 'Sand', hex: '#c9b99e' },
    ],
    sizes: fleeceSizes,
    bulk: [
      { qty: '24+', price: 58 },
      { qty: '72+', price: 51 },
      { qty: '144+', price: 46 },
    ],
  },
  {
    id: 'hc-crew',
    name: 'Crewneck Sweatshirt',
    category: 'fleece',
    garment: 'crew',
    price: 58,
    rating: 4.7,
    reviews: 152,
    blurb:
      '340gsm fleece with set in sleeves and a ribbed collar that does not stretch out. Prints flat, so it suits detailed chest artwork.',
    colors: [
      { name: 'Heather Grey', hex: '#8d8a86' },
      { name: 'Black', hex: '#1a1a1a' },
      { name: 'Navy', hex: '#2b3a55' },
    ],
    sizes: fleeceSizes,
    bulk: [
      { qty: '24+', price: 49 },
      { qty: '72+', price: 43 },
    ],
  },
  {
    id: 'hc-zip',
    name: 'Full Zip Hoodie',
    category: 'fleece',
    garment: 'zip',
    price: 78,
    rating: 4.6,
    reviews: 88,
    blurb:
      'Same 380gsm fleece as the pullover with a YKK zip and split pockets. Left chest embroidery is the usual call on this one.',
    colors: [
      { name: 'Black', hex: '#1a1a1a' },
      { name: 'Charcoal', hex: '#3f3f42' },
      { name: 'Heather Grey', hex: '#8d8a86' },
    ],
    sizes: fleeceSizes,
    bulk: [
      { qty: '24+', price: 68 },
      { qty: '72+', price: 61 },
    ],
  },
  {
    id: 'hc-cap-6panel',
    name: 'Structured Six Panel Cap',
    category: 'headwear',
    garment: 'cap',
    price: 32,
    rating: 4.8,
    reviews: 127,
    badge: 'Best seller',
    blurb:
      'Mid profile with a buckram front panel that keeps embroidery crisp. Curved brim, brass slide adjuster.',
    colors: [
      { name: 'Black', hex: '#1a1a1a' },
      { name: 'Navy', hex: '#2b3a55' },
      { name: 'Khaki', hex: '#b8a888' },
      { name: 'Cardinal', hex: '#8f2733' },
    ],
    sizes: oneSize,
    bulk: [
      { qty: '24+', price: 27 },
      { qty: '72+', price: 23 },
    ],
  },
  {
    id: 'hc-cap-dad',
    name: 'Unstructured Dad Hat',
    category: 'headwear',
    garment: 'cap',
    price: 28,
    rating: 4.5,
    reviews: 64,
    blurb:
      'Soft front, low profile, garment washed cotton twill. Best with flat embroidery or a small woven patch.',
    colors: [
      { name: 'Bone', hex: '#e8e4dc' },
      { name: 'Washed Black', hex: '#2e2b2b' },
      { name: 'Olive', hex: '#5e6046' },
    ],
    sizes: oneSize,
    bulk: [
      { qty: '24+', price: 24 },
      { qty: '72+', price: 20 },
    ],
  },
  {
    id: 'hc-beanie',
    name: 'Cuffed Knit Beanie',
    category: 'headwear',
    garment: 'beanie',
    price: 24,
    rating: 4.7,
    reviews: 95,
    blurb:
      'Double layer acrylic knit with a deep cuff. Takes a woven label or flat embroidery on the fold.',
    colors: [
      { name: 'Black', hex: '#1a1a1a' },
      { name: 'Heather Grey', hex: '#8d8a86' },
      { name: 'Cardinal', hex: '#8f2733' },
    ],
    sizes: oneSize,
    bulk: [
      { qty: '24+', price: 20 },
      { qty: '72+', price: 17 },
    ],
  },
  {
    id: 'hc-coach',
    name: 'Lined Coach Jacket',
    category: 'outerwear',
    garment: 'jacket',
    price: 92,
    rating: 4.8,
    reviews: 52,
    badge: 'New',
    blurb:
      'Water resistant shell with a flannel body lining and snap front. Big flat back panel, so it is the one people put full size prints on.',
    colors: [
      { name: 'Black', hex: '#1a1a1a' },
      { name: 'Forest', hex: '#2f4f43' },
    ],
    sizes: fleeceSizes,
    bulk: [
      { qty: '24+', price: 82 },
      { qty: '72+', price: 74 },
    ],
  },
  {
    id: 'hc-tote',
    name: 'Heavy Canvas Tote',
    category: 'bags',
    garment: 'tote',
    price: 18,
    rating: 4.6,
    reviews: 178,
    blurb:
      '12oz cotton canvas with reinforced 24 inch handles and a flat bottom gusset. A cheap way to move leftover ink into a sellable item.',
    colors: [
      { name: 'Natural', hex: '#d8cdb4' },
      { name: 'Black', hex: '#1a1a1a' },
    ],
    sizes: oneSize,
    bulk: [
      { qty: '24+', price: 15 },
      { qty: '72+', price: 12 },
    ],
  },
]

export const storePromos = [
  {
    icon: 'Truck',
    title: 'Free shipping over $150',
    body: 'Flat $14 rate under that, anywhere in Canada.',
  },
  {
    icon: 'PenTool',
    title: 'Free digital proof',
    body: 'See your art on the garment before you pay.',
  },
  {
    icon: 'PackageCheck',
    title: 'Blank samples at cost',
    body: 'Try the fit before you commit to a run.',
  },
  {
    icon: 'ShieldCheck',
    title: 'Reprint guarantee',
    body: 'A misprint from us gets replaced, no argument.',
  },
]

export const storeReviews = [
  {
    quote: 'Ordered 60 hoodies for our staff. Fit runs true and the embroidery is clean on every single one.',
    name: 'Priya N.',
    product: 'Midweight Pullover Hoodie',
    rating: 5,
  },
  {
    quote: 'The vintage wash tee is the only blank my customers ask for by name now.',
    name: 'Curtis A.',
    product: 'Vintage Wash Tee',
    rating: 5,
  },
  {
    quote: 'Caps arrived in four days. One had a loose thread and they shipped a replacement without me asking twice.',
    name: 'Dominique L.',
    product: 'Structured Six Panel Cap',
    rating: 4,
  },
]

export const FREE_SHIPPING_THRESHOLD = 150
