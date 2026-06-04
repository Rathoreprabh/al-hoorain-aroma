export interface Product {
  id: number
  name: string
  description: string
  price: number
  emoji: string
  category: string
  mood: string[]
  notes: string[]
  rating: number
  badge?: string
}

export const products: Product[] = [
  {
    id: 1,
    name: 'MIDNIGHT ESSENCE',
    description: 'Deep, hypnotic woody fragrance with rare black oud and aged sandalwood from mystic forests',
    price: 250,
    emoji: '🌙',
    category: 'Woody · Oriental',
    mood: ['woody', 'oriental'],
    notes: ['Black Oud', 'Sandalwood', 'Dark Musk'],
    rating: 4.8,
    badge: 'BESTSELLER',
  },
  {
    id: 2,
    name: 'FLORAL SYMPHONY',
    description: 'An opulent bouquet of Bulgarian rose, Grasse jasmine, and rare white peony',
    price: 220,
    emoji: '🌸',
    category: 'Floral',
    mood: ['floral'],
    notes: ['Bulgarian Rose', 'Jasmine', 'White Peony'],
    rating: 4.9,
  },
  {
    id: 3,
    name: 'CITRUS BREEZE',
    description: 'A crystalline morning fragrance with Sicilian bergamot and sun-kissed Amalfi lemon',
    price: 180,
    emoji: '🍋',
    category: 'Fresh · Citrus',
    mood: ['fresh'],
    notes: ['Bergamot', 'Amalfi Lemon', 'White Musk'],
    rating: 4.7,
  },
  {
    id: 4,
    name: 'GOLDEN HOUR',
    description: 'Liquid gold in a bottle — warm Omani amber, Bourbon vanilla, and exotic saffron',
    price: 240,
    emoji: '✨',
    category: 'Oriental',
    mood: ['oriental', 'woody'],
    notes: ['Omani Amber', 'Vanilla', 'Saffron'],
    rating: 4.8,
    badge: 'NEW',
  },
  {
    id: 5,
    name: 'OCEAN WHISPER',
    description: 'The serenity of the Mediterranean coast captured in crystal-clear marine notes',
    price: 200,
    emoji: '🌊',
    category: 'Fresh · Aquatic',
    mood: ['fresh'],
    notes: ['Sea Salt', 'Aquatic', 'Driftwood'],
    rating: 4.6,
  },
  {
    id: 6,
    name: 'ROSE GARDEN',
    description: 'A timeless classic of Damascene rose in full bloom — romantic, eternal, divine',
    price: 210,
    emoji: '🌹',
    category: 'Floral · Classic',
    mood: ['floral'],
    notes: ['Damask Rose', 'Musk', 'Sandalwood'],
    rating: 4.9,
    badge: 'ICONIC',
  },
  {
    id: 7,
    name: 'SPICE MARKET',
    description: 'The vibrant soul of an Arabian bazaar — warm cardamom, clove, and resinous myrrh',
    price: 260,
    emoji: '🌶️',
    category: 'Oriental · Spicy',
    mood: ['oriental'],
    notes: ['Cardamom', 'Clove', 'Myrrh'],
    rating: 4.7,
  },
  {
    id: 8,
    name: 'FOREST MIST',
    description: 'Ancient cedar forests after rain — a meditation of pine, vetiver, and mossy earth',
    price: 230,
    emoji: '🌲',
    category: 'Woody · Green',
    mood: ['woody'],
    notes: ['Cedar', 'Pine', 'Vetiver'],
    rating: 4.8,
  },
]
