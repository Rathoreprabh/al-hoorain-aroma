export interface Product {
  id: number
  name: string
  description: string
  price: number
  emoji: string
  /** Primary/cover image. Drop files in /public/products and set e.g. '/products/yara.jpg'. Empty = emoji fallback. */
  image?: string
  /** Extra gallery shots (excluding the cover). Card cycles through [image, ...gallery] on hover. */
  gallery?: string[]
  category: string
  mood: string[]
  notes: string[]
  rating: number
  badge?: string
}

export const products: Product[] = [
  // ───────── Original showcase fragrances ─────────
  {
    id: 1,
    name: 'MIDNIGHT ESSENCE',
    description: 'Deep, hypnotic woody fragrance with rare black oud and aged sandalwood from mystic forests',
    price: 250,
    emoji: '🌙',
    image: '',
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
    image: '',
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
    image: '',
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
    image: '',
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
    image: '',
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
    image: '',
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
    image: '',
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
    image: '',
    category: 'Woody · Green',
    mood: ['woody'],
    notes: ['Cedar', 'Pine', 'Vetiver'],
    rating: 4.8,
  },

  // ───────── Kenzie collection ─────────
  { id: 9,  name: 'Kenzie Watermelon',     description: 'A juicy burst of fresh watermelon wrapped in soft sugar and clean musk.', price: 0, emoji: '🍉', image: '/products/kenzie-watermelon.jpg', category: 'Fruity · Fresh', mood: ['fruity', 'fresh'], notes: ['Watermelon', 'Sugar', 'White Musk'], rating: 4.6 },
  { id: 10, name: 'Kenzie Apple Crush',    description: 'Crisp green apple drizzled with caramel and a warm vanilla finish.', price: 0, emoji: '🍎', image: '/products/kenzie-apple.jpg', category: 'Fruity · Sweet', mood: ['fruity', 'sweet'], notes: ['Green Apple', 'Caramel', 'Vanilla'], rating: 4.6 },
  { id: 11, name: 'Kenzie Summer Bottled', description: 'A bright summer breeze of pear, freesia and warm amberwood.', price: 0, emoji: '🌞', image: '/products/kenzie-summer.jpg', category: 'Fresh · Fruity', mood: ['fresh', 'fruity'], notes: ['Pear', 'Freesia', 'Amberwood'], rating: 4.5 },
  { id: 12, name: 'Kenzie Silk Serenity',  description: 'Silky white florals veiled in powdery iris and clean musk.', price: 0, emoji: '🤍', image: '/products/kenzie-silk.jpg', category: 'Floral · Musky', mood: ['floral'], notes: ['White Flowers', 'Iris', 'Musk'], rating: 4.6 },
  { id: 13, name: 'Kenzie Marshmallow',    description: 'A pillowy gourmand of toasted marshmallow, vanilla and tonka.', price: 0, emoji: '🍡', image: '/products/kenzie-marshmallow.jpg', category: 'Sweet · Gourmand', mood: ['sweet'], notes: ['Marshmallow', 'Vanilla', 'Tonka Bean'], rating: 4.7 },
  { id: 14, name: 'Kenzie Candid Vanilla', description: 'Smooth Bourbon vanilla layered with caramel and creamy tonka.', price: 0, emoji: '🍦', image: '/products/kenzie-vanilla.jpg', category: 'Sweet · Gourmand', mood: ['sweet'], notes: ['Vanilla', 'Caramel', 'Tonka Bean'], rating: 4.7 },
  { id: 15, name: 'Kenzie Mystique Fleur', description: 'A mysterious floral heart of peony and rose over soft musk.', price: 0, emoji: '🌸', image: '/products/kenzie-mystique.jpg', category: 'Floral', mood: ['floral'], notes: ['Peony', 'Rose', 'Musk'], rating: 4.6 },
  { id: 16, name: 'Kenzie Amber Lychee',   description: 'Exotic lychee sweetened with warm amber and a rose whisper.', price: 0, emoji: '🟠', image: '/products/kenzie-lychee.jpg', category: 'Fruity · Oriental', mood: ['fruity', 'oriental'], notes: ['Lychee', 'Amber', 'Rose'], rating: 4.6 },
  { id: 17, name: 'Kenzie Oud Blend',      description: 'A refined oud signature with saffron and glowing amber.', price: 0, emoji: '🪵', image: '', category: 'Woody · Oriental', mood: ['woody', 'oriental'], notes: ['Oud', 'Saffron', 'Amber'], rating: 4.7 },
  { id: 18, name: 'Kenzie Lemon Spark',    description: 'A zesty spark of lemon and bergamot grounded in vetiver.', price: 0, emoji: '🍋', image: '', category: 'Fresh · Citrus', mood: ['fresh'], notes: ['Lemon', 'Bergamot', 'Vetiver'], rating: 4.5 },

  // ───────── Blend / Esta / others ─────────
  { id: 19, name: 'Blend Luxe',            description: 'A luxurious blend of amber, vanilla and smooth woods.', price: 0, emoji: '✨', image: '/products/blend-luxe.jpg', category: 'Oriental', mood: ['oriental', 'woody'], notes: ['Amber', 'Vanilla', 'Woods'], rating: 4.6 },
  { id: 20, name: 'Esta Oro',              description: 'Golden opulence of saffron, amber and deep oud.', price: 0, emoji: '🟡', image: '/products/esta-oro.jpg', category: 'Oriental', mood: ['oriental', 'woody'], notes: ['Saffron', 'Amber', 'Oud'], rating: 4.7 },
  { id: 21, name: 'Esta Fleur',            description: 'An elegant floral of jasmine and rose on a musky base.', price: 0, emoji: '🌷', image: '/products/esta-fleur.jpg', category: 'Floral', mood: ['floral'], notes: ['Jasmine', 'Rose', 'Musk'], rating: 4.6 },
  { id: 22, name: 'Twilight Ultra Male',   description: 'A bold sweet-fresh signature of lavender, bergamot and vanilla.', price: 0, emoji: '🔵', image: '', category: 'Fresh · Sweet', mood: ['fresh', 'sweet'], notes: ['Lavender', 'Bergamot', 'Vanilla'], rating: 4.7 },
  { id: 23, name: 'Valeria Divine',        description: 'A divine floral-oriental of bergamot, rose and warm vanilla.', price: 0, emoji: '🌹', image: '/products/valeria.jpg', category: 'Floral · Oriental', mood: ['floral', 'oriental'], notes: ['Bergamot', 'Rose', 'Vanilla'], rating: 4.6 },
  { id: 24, name: 'Kenzie Set',            description: 'A curated gift set of Kenzie signature fragrances.', price: 0, emoji: '🎁', image: '', category: 'Gift Set', mood: ['sweet', 'fresh'], notes: ['Assorted', 'Travel Size', 'Gift Ready'], rating: 4.7, badge: 'GIFT SET' },
  { id: 25, name: 'Esta Perfume Set',      description: 'An Esta collection gift set of layered signatures.', price: 0, emoji: '🎁', image: '', category: 'Gift Set', mood: ['oriental', 'floral'], notes: ['Assorted', 'Travel Size', 'Gift Ready'], rating: 4.7, badge: 'GIFT SET' },
  { id: 26, name: 'Esta Puro Set',         description: 'The Esta Puro gift set — pure, refined fragrance trio.', price: 0, emoji: '🎁', image: '/products/esta-puro.jpg', category: 'Gift Set', mood: ['oriental', 'woody'], notes: ['Assorted', 'Travel Size', 'Gift Ready'], rating: 4.7, badge: 'GIFT SET' },
  { id: 27, name: 'Fakhar Platinum',       description: 'A crisp aromatic of bergamot, geranium and earthy patchouli.', price: 0, emoji: '💎', image: '/products/fakhar-platinum.png', gallery: ['/products/fakhar-platinum-2.png', '/products/fakhar-platinum-3.png'], category: 'Aromatic · Fresh', mood: ['fresh', 'woody'], notes: ['Bergamot', 'Geranium', 'Patchouli'], rating: 4.7 },
  { id: 28, name: 'Jasoor',                description: 'A spicy woody composition of oud, spice and warm amber.', price: 0, emoji: '🪵', image: '/products/jasoor.png', gallery: ['/products/jasoor-2.png', '/products/jasoor-3.png'], category: 'Woody · Oriental', mood: ['woody', 'oriental'], notes: ['Oud', 'Spice', 'Amber'], rating: 4.6 },

  // ───────── Ana Abiyedh line ─────────
  { id: 29, name: 'Ana Abiyedh Coral',     description: 'A fresh fruity-floral of apple, soft blossoms and clean musk.', price: 0, emoji: '🪸', image: '/products/ana-abiyedh-coral.png', gallery: ['/products/ana-abiyedh-coral-2.png', '/products/ana-abiyedh-coral-3.png'], category: 'Fruity · Floral', mood: ['fruity', 'floral'], notes: ['Apple', 'Floral', 'Musk'], rating: 4.6 },
  { id: 30, name: 'Ana Abiyedh Leather',   description: 'Supple leather wrapped in spice and smooth woods.', price: 0, emoji: '🤎', image: '/products/ana-abiyedh-leather.png', gallery: ['/products/ana-abiyedh-leather-2.png', '/products/ana-abiyedh-leather-3.png'], category: 'Leather · Woody', mood: ['woody', 'oriental'], notes: ['Leather', 'Spice', 'Woods'], rating: 4.6 },
  { id: 31, name: 'Ana Abiyedh Rouge',     description: 'An addictive sweet-amber glow of saffron, amberwood and cedar.', price: 0, emoji: '❤️', image: '/products/ana-abiyedh-rouge.png', gallery: ['/products/ana-abiyedh-rouge-2.png', '/products/ana-abiyedh-rouge-3.png'], category: 'Sweet · Oriental', mood: ['sweet', 'oriental'], notes: ['Saffron', 'Amberwood', 'Cedar'], rating: 4.8, badge: 'POPULAR' },
  { id: 32, name: 'Ana Abiyedh Scarlet',   description: 'Ripe berries and rose softened by creamy vanilla.', price: 0, emoji: '🍓', image: '/products/ana-abiyedh-scarlet.png', gallery: ['/products/ana-abiyedh-scarlet-2.png', '/products/ana-abiyedh-scarlet-3.png'], category: 'Fruity · Floral', mood: ['fruity', 'floral'], notes: ['Berries', 'Rose', 'Vanilla'], rating: 4.6 },

  // ───────── Mayar / Bint Hoorain / misc ─────────
  { id: 33, name: 'Mayar',                 description: 'A radiant floral of bergamot, rose and soft vanilla.', price: 0, emoji: '💗', image: '/products/mayar.png', gallery: ['/products/mayar-2.png', '/products/mayar-3.png'], category: 'Floral · Fruity', mood: ['floral', 'fruity'], notes: ['Bergamot', 'Rose', 'Vanilla'], rating: 4.7 },
  { id: 34, name: 'Mayar Cherry',          description: 'Juicy cherry and almond folded into warm vanilla.', price: 0, emoji: '🍒', image: '/products/mayar-cherry.png', gallery: ['/products/mayar-cherry-2.png', '/products/mayar-cherry-3.png'], category: 'Fruity · Sweet', mood: ['fruity', 'sweet'], notes: ['Cherry', 'Almond', 'Vanilla'], rating: 4.7 },
  { id: 35, name: 'Bint Hoorain',          description: 'A regal floral-oriental of rose, oud and musk.', price: 0, emoji: '🌸', image: '/products/bint-hoorain.jpg', category: 'Floral · Oriental', mood: ['floral', 'oriental'], notes: ['Rose', 'Oud', 'Musk'], rating: 4.7 },
  { id: 36, name: 'Bint Hoorain Rose',     description: 'A velvety rose lifted by saffron over soft musk.', price: 0, emoji: '🌹', image: '/products/bint-hoorain-rose.jpg', category: 'Floral · Rose', mood: ['floral'], notes: ['Rose', 'Saffron', 'Musk'], rating: 4.7 },
  { id: 37, name: 'Layaan',                description: 'A soft delicate floral with a powdery musky drydown.', price: 0, emoji: '🌼', image: '/products/layaan.png', gallery: ['/products/layaan-2.png', '/products/layaan-3.png'], category: 'Floral', mood: ['floral'], notes: ['White Flowers', 'Powder', 'Musk'], rating: 4.5 },
  { id: 38, name: 'Petra',                 description: 'A warm oriental of amber, spice and resinous woods.', price: 0, emoji: '🏜️', image: '/products/petra.png', gallery: ['/products/petra-2.png', '/products/petra-3.png'], category: 'Oriental', mood: ['oriental', 'woody'], notes: ['Amber', 'Spice', 'Woods'], rating: 4.6 },

  // ───────── 9PM / Liquid Brun / Vulcan ─────────
  { id: 39, name: '9PM Rebel',             description: 'A sweet-spicy night signature of apple, cinnamon and vanilla.', price: 0, emoji: '🌃', image: '/products/9pm-rebel.png', category: 'Oriental · Sweet', mood: ['oriental', 'sweet'], notes: ['Apple', 'Cinnamon', 'Vanilla'], rating: 4.7 },
  { id: 40, name: '9PM Night Out',         description: 'A fresh-sweet evening blend made for the after dark.', price: 0, emoji: '🌙', image: '/products/9pm-night-out.png', category: 'Fresh · Sweet', mood: ['fresh', 'sweet'], notes: ['Bergamot', 'Lavender', 'Vanilla'], rating: 4.6 },
  { id: 41, name: 'Liquid Brun',           description: 'A magnetic aromatic of lavender, sage and amberwood.', price: 0, emoji: '🤎', image: '/products/liquid-brun.png', category: 'Aromatic · Woody', mood: ['fresh', 'woody'], notes: ['Lavender', 'Sage', 'Amberwood'], rating: 4.6 },
  { id: 42, name: 'Vulcan Feu',            description: 'A fiery blend of pineapple, smoky birch and vanilla.', price: 0, emoji: '🔥', image: '/products/vulcan-feu.png', category: 'Woody · Spicy', mood: ['woody', 'oriental'], notes: ['Pineapple', 'Birch', 'Vanilla'], rating: 4.6 },

  // ───────── Hawas line ─────────
  { id: 43, name: 'Hawas Diva',            description: 'A flirtatious fruity-floral of lychee, rose and musk.', price: 0, emoji: '💃', image: '/products/hawas-diva.png', category: 'Fruity · Floral', mood: ['fruity', 'floral'], notes: ['Lychee', 'Rose', 'Musk'], rating: 4.7 },
  { id: 44, name: 'Hawas London',          description: 'A fresh aquatic of bergamot, apple and ambergris.', price: 0, emoji: '🌊', image: '/products/hawas-london.png', category: 'Fresh · Aquatic', mood: ['fresh'], notes: ['Bergamot', 'Apple', 'Ambergris'], rating: 4.7 },
  { id: 45, name: 'Hawas Kobra',           description: 'A bold woody-spicy trail of spice, amber and woods.', price: 0, emoji: '🐍', image: '/products/hawas-kobra.png', category: 'Woody · Spicy', mood: ['woody', 'oriental'], notes: ['Spice', 'Amber', 'Woods'], rating: 4.6 },
  { id: 46, name: 'Hawas Verde',           description: 'A crisp green-fresh of citrus, green notes and musk.', price: 0, emoji: '🟢', image: '/products/hawas-verde.png', category: 'Fresh · Green', mood: ['fresh'], notes: ['Citrus', 'Green Notes', 'Musk'], rating: 4.6 },

  // ───────── Gourmand / sweet ─────────
  { id: 47, name: 'Yum Yum',               description: 'A playful gourmand of caramel, vanilla and spun sugar.', price: 0, emoji: '🍭', image: '', category: 'Sweet · Gourmand', mood: ['sweet'], notes: ['Caramel', 'Vanilla', 'Sugar'], rating: 4.6 },
  { id: 48, name: 'Bon Bon',               description: 'A candied delight of caramel, mandarin and juicy peach.', price: 0, emoji: '🍬', image: '/products/bon-bon.jpg', category: 'Sweet · Fruity', mood: ['sweet', 'fruity'], notes: ['Caramel', 'Mandarin', 'Peach'], rating: 4.6 },
  { id: 49, name: 'Precivux Gold',         description: 'An opulent oriental of amber, oud and rich vanilla.', price: 0, emoji: '🟡', image: '', category: 'Oriental', mood: ['oriental', 'woody'], notes: ['Amber', 'Oud', 'Vanilla'], rating: 4.6 },
  { id: 50, name: 'Nylaa Black',           description: 'A seductive sweet-woody of plum, vanilla and patchouli.', price: 0, emoji: '🖤', image: '', category: 'Sweet · Woody', mood: ['sweet', 'woody'], notes: ['Plum', 'Vanilla', 'Patchouli'], rating: 4.7 },
  { id: 51, name: 'Nylaa Gold',            description: 'A golden oriental-sweet of amber, fruit and vanilla.', price: 0, emoji: '🟡', image: '', category: 'Sweet · Oriental', mood: ['sweet', 'oriental'], notes: ['Amber', 'Fruits', 'Vanilla'], rating: 4.6 },

  // ───────── 50ml signatures ─────────
  { id: 52, name: 'Yara 50ml',             description: 'A creamy floral of orchid, heliotrope and vanilla sandalwood.', price: 0, emoji: '💜', image: '/products/yara.png', gallery: ['/products/yara-2.png', '/products/yara-3.png'], category: 'Floral · Sweet', mood: ['floral', 'sweet'], notes: ['Orchid', 'Heliotrope', 'Vanilla'], rating: 4.8, badge: 'BESTSELLER' },
  { id: 53, name: 'Qaed Fursan 50ml',      description: 'A fresh fruity-amber of pineapple, bergamot and amber.', price: 0, emoji: '🐎', image: '/products/qaed-al-fursan.png', gallery: ['/products/qaed-al-fursan-2.png', '/products/qaed-al-fursan-3.png'], category: 'Fresh · Fruity', mood: ['fresh', 'fruity'], notes: ['Pineapple', 'Bergamot', 'Amber'], rating: 4.7 },
  { id: 54, name: 'Hayati 50ml',           description: 'A sweet fruity-floral of apple, rose and vanilla.', price: 0, emoji: '💛', image: '/products/hayati.png', category: 'Fruity · Floral', mood: ['fruity', 'floral'], notes: ['Apple', 'Rose', 'Vanilla'], rating: 4.6 },
  { id: 55, name: 'Ameerat 50ml',          description: 'A regal floral with fruity facets and a musky base.', price: 0, emoji: '👑', image: '/products/ameerat.png', gallery: ['/products/ameerat-2.png', '/products/ameerat-3.png'], category: 'Floral', mood: ['floral', 'fruity'], notes: ['Floral', 'Fruits', 'Musk'], rating: 4.6 },
  { id: 56, name: 'Shams Al Emarat 50ml',  description: 'A radiant floral-oriental of rose, oud and vanilla.', price: 0, emoji: '☀️', image: '/products/shams-al-emarat.jpg', category: 'Floral · Oriental', mood: ['floral', 'oriental'], notes: ['Rose', 'Oud', 'Vanilla'], rating: 4.7 },
  { id: 57, name: 'Dirham 50ml',           description: 'A spicy-fresh of apple, cinnamon and warm tobacco.', price: 0, emoji: '🪙', image: '/products/dirham.jpg', category: 'Spicy · Fresh', mood: ['oriental', 'fresh'], notes: ['Apple', 'Cinnamon', 'Tobacco'], rating: 4.7 },
  { id: 58, name: 'Mousuf 50ml',           description: 'A deep woody-oud of oud, musk and amber.', price: 0, emoji: '🪵', image: '/products/mousuf.jpg', category: 'Woody · Oud', mood: ['woody', 'oriental'], notes: ['Oud', 'Musk', 'Amber'], rating: 4.6 },
  { id: 59, name: 'Mousuf Wardi 50ml',     description: 'A rosy oud of Damask rose, oud and soft musk.', price: 0, emoji: '🌹', image: '/products/mousuf-wardi.jpg', category: 'Rose · Oud', mood: ['floral', 'woody'], notes: ['Rose', 'Oud', 'Musk'], rating: 4.6 },
  { id: 60, name: 'Al Dirgham 50ml',       description: 'A commanding woody-leather of leather, spice and woods.', price: 0, emoji: '🦁', image: '/products/al-dirgham.jpg', category: 'Leather · Woody', mood: ['woody', 'oriental'], notes: ['Leather', 'Spice', 'Woods'], rating: 4.6 },
  { id: 61, name: 'Ana Abiyedh 50ml',      description: 'A clean fresh-white of apple, white florals and musk.', price: 0, emoji: '🤍', image: '/products/ana-abiyedh.png', gallery: ['/products/ana-abiyedh-2.png'], category: 'Fresh · Floral', mood: ['fresh', 'floral'], notes: ['Apple', 'White Flowers', 'Musk'], rating: 4.6 },
  { id: 62, name: 'Heibah 50ml',           description: 'A dignified oriental of amber, spice and warm woods.', price: 0, emoji: '✨', image: '/products/heibah.jpg', category: 'Oriental', mood: ['oriental', 'woody'], notes: ['Amber', 'Spice', 'Woods'], rating: 4.6 },
  { id: 63, name: 'Oud 24 50ml',           description: 'A round-the-clock oud of oud, saffron and rose.', price: 0, emoji: '🪵', image: '/products/oud-24.jpg', category: 'Woody · Oud', mood: ['woody', 'oriental'], notes: ['Oud', 'Saffron', 'Rose'], rating: 4.7 },
  { id: 64, name: 'Hareem Sultan 50ml',    description: 'A royal floral-oriental of rose, vanilla and musk.', price: 0, emoji: '👑', image: '/products/hareem-sultan.jpg', category: 'Floral · Oriental', mood: ['floral', 'oriental'], notes: ['Rose', 'Vanilla', 'Musk'], rating: 4.7 },
  { id: 65, name: 'Saheb 50ml',            description: 'A refined oriental-woody of amber, oud and spice.', price: 0, emoji: '🤝', image: '/products/saheb.jpg', category: 'Oriental · Woody', mood: ['oriental', 'woody'], notes: ['Amber', 'Oud', 'Spice'], rating: 4.6 },
  { id: 66, name: 'Taj Al Malik 50ml',     description: 'A crown of amber, oud and warm spice.', price: 0, emoji: '👑', image: '/products/taj-al-malik.png', category: 'Oriental', mood: ['oriental', 'woody'], notes: ['Amber', 'Oud', 'Spice'], rating: 4.7 },
  { id: 67, name: 'Oud Mood 50ml',         description: 'A smoky mood of oud, rose and saffron.', price: 0, emoji: '🪵', image: '/products/oud-mood.png', gallery: ['/products/oud-mood-2.png', '/products/oud-mood-3.png'], category: 'Woody · Oud', mood: ['woody', 'oriental'], notes: ['Oud', 'Rose', 'Saffron'], rating: 4.7 },
  { id: 68, name: 'Rose Paris 50ml',       description: 'A Parisian rose of rose, peony and clean musk.', price: 0, emoji: '🌹', image: '', category: 'Floral · Rose', mood: ['floral'], notes: ['Rose', 'Peony', 'Musk'], rating: 4.6 },

  // ───────── 10ml travel sizes ─────────
  { id: 69, name: 'Yara 10ml',             description: 'Travel size of the creamy orchid-vanilla bestseller.', price: 0, emoji: '💜', image: '/products/yara.png', gallery: ['/products/yara-2.png', '/products/yara-3.png'], category: 'Floral · Sweet · Travel', mood: ['floral', 'sweet'], notes: ['Orchid', 'Heliotrope', 'Vanilla'], rating: 4.7 },
  { id: 70, name: 'Mousuf Wardi 10ml',     description: 'Travel size rosy oud of rose, oud and musk.', price: 0, emoji: '🌹', image: '/products/mousuf-wardi.jpg', category: 'Rose · Oud · Travel', mood: ['floral', 'woody'], notes: ['Rose', 'Oud', 'Musk'], rating: 4.5 },
  { id: 71, name: 'Dirham 10ml',           description: 'Travel size spicy-fresh of apple, cinnamon and tobacco.', price: 0, emoji: '🪙', image: '/products/dirham.jpg', category: 'Spicy · Fresh · Travel', mood: ['oriental', 'fresh'], notes: ['Apple', 'Cinnamon', 'Tobacco'], rating: 4.6 },
  { id: 72, name: 'Taj Al Malik 10ml',     description: 'Travel size crown of amber, oud and spice.', price: 0, emoji: '👑', image: '/products/taj-al-malik.png', category: 'Oriental · Travel', mood: ['oriental', 'woody'], notes: ['Amber', 'Oud', 'Spice'], rating: 4.6 },
  { id: 73, name: 'Saheb 10ml',            description: 'Travel size oriental-woody of amber, oud and spice.', price: 0, emoji: '🤝', image: '/products/saheb.jpg', category: 'Oriental · Woody · Travel', mood: ['oriental', 'woody'], notes: ['Amber', 'Oud', 'Spice'], rating: 4.5 },
  { id: 74, name: 'Sultan Al Shabab 10ml', description: 'Travel size fresh-spicy youthful signature.', price: 0, emoji: '🧑', image: '', category: 'Fresh · Spicy · Travel', mood: ['fresh', 'oriental'], notes: ['Bergamot', 'Spice', 'Amber'], rating: 4.5 },
  { id: 75, name: 'Rose Paris 10ml',       description: 'Travel size Parisian rose of rose, peony and musk.', price: 0, emoji: '🌹', image: '', category: 'Floral · Rose · Travel', mood: ['floral'], notes: ['Rose', 'Peony', 'Musk'], rating: 4.5 },
  { id: 76, name: 'Oud 24 10ml',           description: 'Travel size oud of oud, saffron and rose.', price: 0, emoji: '🪵', image: '/products/oud-24.jpg', category: 'Woody · Oud · Travel', mood: ['woody', 'oriental'], notes: ['Oud', 'Saffron', 'Rose'], rating: 4.6 },
  { id: 77, name: 'Ahlam Al Arab 10ml',    description: 'Travel size oriental of amber, oud and spice.', price: 0, emoji: '🌙', image: '', category: 'Oriental · Travel', mood: ['oriental', 'woody'], notes: ['Amber', 'Oud', 'Spice'], rating: 4.5 },
  { id: 78, name: 'Oud Romancea 10ml',     description: 'Travel size romantic oud of oud, rose and amber.', price: 0, emoji: '🪵', image: '/products/oud-romancea.jpg', category: 'Woody · Oud · Travel', mood: ['woody', 'floral'], notes: ['Oud', 'Rose', 'Amber'], rating: 4.5 },
  { id: 79, name: 'Shams Al Emarat 10ml',  description: 'Travel size floral-oriental of rose, oud and vanilla.', price: 0, emoji: '☀️', image: '/products/shams-al-emarat.jpg', category: 'Floral · Oriental · Travel', mood: ['floral', 'oriental'], notes: ['Rose', 'Oud', 'Vanilla'], rating: 4.6 },
  { id: 80, name: 'Hareem Sultan 10ml',    description: 'Travel size royal floral of rose, vanilla and musk.', price: 0, emoji: '👑', image: '/products/hareem-sultan.jpg', category: 'Floral · Oriental · Travel', mood: ['floral', 'oriental'], notes: ['Rose', 'Vanilla', 'Musk'], rating: 4.6 },
  { id: 81, name: 'Bint Hoorain 10ml',     description: 'Travel size floral-oriental of rose, oud and musk.', price: 0, emoji: '🌸', image: '/products/bint-hoorain.jpg', category: 'Floral · Oriental · Travel', mood: ['floral', 'oriental'], notes: ['Rose', 'Oud', 'Musk'], rating: 4.6 },

  // ───────── Attar (concentrated oils) ─────────
  { id: 82, name: 'Attar Mousuf',          description: 'A concentrated oud attar of oud, musk and amber.', price: 0, emoji: '🧴', image: '/products/mousuf.jpg', category: 'Attar · Oud', mood: ['woody', 'oriental'], notes: ['Oud', 'Musk', 'Amber'], rating: 4.7 },
  { id: 83, name: 'Attar Oud Romancea',    description: 'A romantic oud attar of oud, rose and amber.', price: 0, emoji: '🧴', image: '/products/oud-romancea.jpg', category: 'Attar · Oud', mood: ['woody', 'floral'], notes: ['Oud', 'Rose', 'Amber'], rating: 4.7 },
  { id: 84, name: 'Attar Bint Hoorain',    description: 'A floral-oud attar of rose, oud and musk.', price: 0, emoji: '🧴', image: '/products/bint-hoorain.jpg', category: 'Attar · Floral', mood: ['floral', 'woody'], notes: ['Rose', 'Oud', 'Musk'], rating: 4.7 },
  { id: 85, name: 'Attar Dar Al Hae',      description: 'A rich oriental attar of amber, oud and spice.', price: 0, emoji: '🧴', image: '', category: 'Attar · Oriental', mood: ['oriental', 'woody'], notes: ['Amber', 'Oud', 'Spice'], rating: 4.6 },
  { id: 86, name: 'Attar Hayati',          description: 'A sweet attar of apple, rose and vanilla.', price: 0, emoji: '🧴', image: '/products/hayati.png', category: 'Attar · Fruity', mood: ['fruity', 'floral'], notes: ['Apple', 'Rose', 'Vanilla'], rating: 4.6 },
  { id: 87, name: 'Attar Dirham Wardi',    description: 'A rosy attar of rose, spice and warm amber.', price: 0, emoji: '🧴', image: '/products/dirham-wardi.jpg', category: 'Attar · Rose', mood: ['floral', 'oriental'], notes: ['Rose', 'Spice', 'Amber'], rating: 4.6 },
  { id: 88, name: 'Attar Dirham',          description: 'A spicy-fresh attar of apple, cinnamon and tobacco.', price: 0, emoji: '🧴', image: '/products/dirham.jpg', category: 'Attar · Spicy', mood: ['oriental', 'fresh'], notes: ['Apple', 'Cinnamon', 'Tobacco'], rating: 4.6 },

  // ───────── Lattafa & friends (from order list) ─────────
  { id: 89,  name: 'Yara Candy',          description: 'A candied twist on Yara — sweet sugar, fruit and vanilla.', price: 0, emoji: '🍬', image: '/products/yara-candy.png', gallery: ['/products/yara-candy-2.png', '/products/yara-candy-3.png'], category: 'Sweet · Fruity', mood: ['sweet', 'fruity'], notes: ['Candy', 'Fruits', 'Vanilla'], rating: 4.7 },
  { id: 90,  name: 'Asad',               description: 'A bold masculine of pineapple, blackcurrant and tobacco.', price: 0, emoji: '🦁', image: '/products/asad.png', gallery: ['/products/asad-2.png'], category: 'Woody · Spicy', mood: ['woody', 'oriental'], notes: ['Pineapple', 'Blackcurrant', 'Tobacco'], rating: 4.7, badge: 'POPULAR' },
  { id: 91,  name: 'Qaeed Fursan Brown', description: 'A warm woody-amber of spice, amber and tobacco.', price: 0, emoji: '🤎', image: '', category: 'Woody · Oriental', mood: ['woody', 'oriental'], notes: ['Spice', 'Amber', 'Tobacco'], rating: 4.6 },
  { id: 92,  name: 'Badee Oud Sublime',  description: 'A sublime oud of oud, saffron and sweet vanilla.', price: 0, emoji: '🪵', image: '/products/badee-oud-sublime.png', gallery: ['/products/badee-oud-sublime-2.png', '/products/badee-oud-sublime-3.png'], category: 'Woody · Oud', mood: ['woody', 'oriental'], notes: ['Oud', 'Saffron', 'Vanilla'], rating: 4.7 },
  { id: 93,  name: 'Badee Oud Noble',    description: 'A noble oud of oud, rose and warm amber.', price: 0, emoji: '🪵', image: '/products/badee-oud-noble.png', gallery: ['/products/badee-oud-noble-2.png', '/products/badee-oud-noble-3.png'], category: 'Woody · Oud', mood: ['woody', 'oriental'], notes: ['Oud', 'Rose', 'Amber'], rating: 4.7 },
  { id: 94,  name: 'Fakhar Man',         description: 'A fresh aromatic fougère of bergamot, lavender and woods.', price: 0, emoji: '🧔', image: '/products/fakhar-man.png', gallery: ['/products/fakhar-man-2.png', '/products/fakhar-man-3.png'], category: 'Aromatic · Fresh', mood: ['fresh', 'woody'], notes: ['Bergamot', 'Lavender', 'Woods'], rating: 4.6 },
  { id: 95,  name: 'Fakhar Women',       description: 'A graceful floral of jasmine, rose and musk.', price: 0, emoji: '👩', image: '/products/fakhar-women.png', gallery: ['/products/fakhar-women-2.png', '/products/fakhar-women-3.png'], category: 'Floral', mood: ['floral'], notes: ['Jasmine', 'Rose', 'Musk'], rating: 4.6 },
  { id: 96,  name: 'Eclaire',            description: 'A decadent gourmand of caramel, vanilla and tonka.', price: 0, emoji: '🍫', image: '/products/eclaire.png', gallery: ['/products/eclaire-2.png', '/products/eclaire-3.png'], category: 'Sweet · Gourmand', mood: ['sweet'], notes: ['Caramel', 'Vanilla', 'Tonka Bean'], rating: 4.7 },
  { id: 97,  name: 'Eclaire Biscoff',    description: 'A cookie-butter gourmand of biscuit, caramel and vanilla.', price: 0, emoji: '🍪', image: '/products/eclaire-biscoff.png', gallery: ['/products/eclaire-biscoff-2.png', '/products/eclaire-biscoff-3.png'], category: 'Sweet · Gourmand', mood: ['sweet'], notes: ['Biscuit', 'Caramel', 'Vanilla'], rating: 4.7 },
  { id: 98,  name: 'Eclaire Pistachio',  description: 'A creamy gourmand of pistachio, cream and vanilla.', price: 0, emoji: '🥧', image: '/products/eclaire-pistachio.png', gallery: ['/products/eclaire-pistachio-2.png', '/products/eclaire-pistachio-3.png'], category: 'Sweet · Gourmand', mood: ['sweet'], notes: ['Pistachio', 'Cream', 'Vanilla'], rating: 4.7 },
  { id: 99,  name: 'Khamrah Qahwa',      description: 'A coffee gourmand of cardamom coffee, dates and vanilla.', price: 0, emoji: '☕', image: '/products/khamrah-qahwa.png', gallery: ['/products/khamrah-qahwa-2.png', '/products/khamrah-qahwa-3.png'], category: 'Sweet · Spicy', mood: ['sweet', 'oriental'], notes: ['Coffee', 'Cardamom', 'Vanilla'], rating: 4.8, badge: 'BESTSELLER' },
  { id: 100, name: 'Khamrah',            description: 'A warm spicy-gourmand of cinnamon, dates and vanilla.', price: 0, emoji: '🤎', image: '/products/khamrah.png', gallery: ['/products/khamrah-2.png', '/products/khamrah-3.png'], category: 'Sweet · Spicy', mood: ['sweet', 'oriental'], notes: ['Cinnamon', 'Dates', 'Vanilla'], rating: 4.8 },
  { id: 101, name: 'Angham',             description: 'A melodic floral-fruity of bergamot, jasmine and vanilla.', price: 0, emoji: '🎶', image: '/products/angham.png', gallery: ['/products/angham-2.png', '/products/angham-3.png'], category: 'Floral · Fruity', mood: ['floral', 'fruity'], notes: ['Bergamot', 'Jasmine', 'Vanilla'], rating: 4.6 },
  { id: 102, name: 'Habik Red',          description: 'A warm oriental of saffron, amber and woods.', price: 0, emoji: '❤️', image: '/products/habik-red.png', gallery: ['/products/habik-red-2.png', '/products/habik-red-3.png'], category: 'Oriental', mood: ['oriental', 'woody'], notes: ['Saffron', 'Amber', 'Woods'], rating: 4.6 },
  { id: 103, name: 'Habik Purple',       description: 'A sweet oriental of plum, amber and vanilla.', price: 0, emoji: '💜', image: '/products/habik-purple.png', category: 'Sweet · Oriental', mood: ['sweet', 'oriental'], notes: ['Plum', 'Amber', 'Vanilla'], rating: 4.6 },
  { id: 104, name: 'Habik for Women',    description: 'A feminine floral of rose, peony and soft musk.', price: 0, emoji: '💗', image: '/products/habik-women.png', gallery: ['/products/habik-women-2.png', '/products/habik-women-3.png'], category: 'Floral', mood: ['floral'], notes: ['Rose', 'Peony', 'Musk'], rating: 4.6 },
  { id: 105, name: 'Vintage Radio',      description: 'A nostalgic aromatic of lavender, cinnamon and vanilla.', price: 0, emoji: '📻', image: '/products/vintage-radio.png', gallery: ['/products/vintage-radio-2.png', '/products/vintage-radio-3.png'], category: 'Aromatic · Woody', mood: ['woody', 'fresh'], notes: ['Lavender', 'Cinnamon', 'Vanilla'], rating: 4.6 },
  { id: 106, name: 'Nebras Elixir',      description: 'A glowing sweet elixir of amber, fruit and vanilla.', price: 0, emoji: '✨', image: '/products/nebras-elixir.png', gallery: ['/products/nebras-elixir-2.png', '/products/nebras-elixir-3.png'], category: 'Sweet · Oriental', mood: ['sweet', 'oriental'], notes: ['Amber', 'Fruits', 'Vanilla'], rating: 4.6 },
  { id: 107, name: 'Hawas Ice',          description: 'An icy fresh-aquatic of bergamot, apple and ambergris.', price: 0, emoji: '🧊', image: '/products/hawas-ice.png', category: 'Fresh · Aquatic', mood: ['fresh'], notes: ['Bergamot', 'Apple', 'Ambergris'], rating: 4.7 },
  { id: 108, name: 'Yara Elixir',        description: 'A richer Yara elixir of orchid, fruit and vanilla.', price: 0, emoji: '💜', image: '/products/yara-elixir.png', gallery: ['/products/yara-elixir-2.png', '/products/yara-elixir-3.png'], category: 'Floral · Sweet', mood: ['floral', 'sweet'], notes: ['Orchid', 'Fruits', 'Vanilla'], rating: 4.7 },
  { id: 109, name: 'Rayhaan Kiss',       description: 'A flirty floral of berries, rose and vanilla.', price: 0, emoji: '💋', image: '/products/rayhaan-kiss.png', category: 'Floral · Fruity', mood: ['floral', 'fruity'], notes: ['Berries', 'Rose', 'Vanilla'], rating: 4.5 },
  { id: 110, name: 'Rayhaan Giza',       description: 'A warm woody-oriental of amber, spice and woods.', price: 0, emoji: '🏜️', image: '/products/rayhaan-giza.png', category: 'Woody · Oriental', mood: ['woody', 'oriental'], notes: ['Amber', 'Spice', 'Woods'], rating: 4.5 },
  { id: 111, name: 'Rayhaan Paraha',     description: 'A breezy fresh of citrus, green notes and musk.', price: 0, emoji: '🌬️', image: '', category: 'Fresh', mood: ['fresh'], notes: ['Citrus', 'Green Notes', 'Musk'], rating: 4.5 },
  { id: 112, name: 'Nylaa White',        description: 'A soft sweet-floral of white flowers, fruit and vanilla.', price: 0, emoji: '🤍', image: '', category: 'Floral · Sweet', mood: ['floral', 'sweet'], notes: ['White Flowers', 'Fruits', 'Vanilla'], rating: 4.6 },
  { id: 113, name: 'Island Dream',       description: 'A tropical aquatic of coconut, marine notes and musk.', price: 0, emoji: '🏝️', image: '', category: 'Fresh · Aquatic', mood: ['fresh'], notes: ['Coconut', 'Marine', 'Musk'], rating: 4.6 },
]
