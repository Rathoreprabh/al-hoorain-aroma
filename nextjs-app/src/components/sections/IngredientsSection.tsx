'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const ingredients = [
  { icon: '🌳', name: 'OUD', origin: 'Southeast Asia', desc: 'The rarest and most precious aromatic wood in the world, harvested from centuries-old agarwood trees. The black gold of perfumery.' },
  { icon: '🔸', name: 'AMBER', origin: 'Arabian Peninsula', desc: 'Warm, resinous, and deeply sensual. Fossilized tree resin that captures the warmth of the desert sun in every drop.' },
  { icon: '🌹', name: 'ROSE', origin: 'Damascus, Syria', desc: 'The queen of flowers. Damascene roses handpicked at dawn, capturing the most ephemeral and breathtaking floral accord.' },
  { icon: '🌫️', name: 'MUSK', origin: 'Kashmir, India', desc: 'A soft, clean, animalic depth that anchors the fragrance to the skin and lets it bloom uniquely for every wearer.' },
  { icon: '🌿', name: 'SAFFRON', origin: 'Persia & Kashmir', desc: 'More precious than gold by weight. Its warm, slightly spiced, honeyed character adds opulence to every creation.' },
  { icon: '🌰', name: 'VANILLA', origin: 'Madagascar', desc: 'Bourbon vanilla from Madagascar lends a creamy, warm sweetness that whispers comfort, elegance, and desire.' },
]

export default function IngredientsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="ingredients-section" id="ingredients" ref={ref}>
      <div className="ingredients-inner">
        <motion.div
          className="ingredients-header"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="section-eyebrow">The Soul of Our Fragrance</span>
          <h2 className="section-heading">
            LIQUID<br /><span>ALCHEMY</span>
          </h2>
          <div className="section-rule" />
          <p style={{ color: 'var(--white-60)', fontSize: '0.9rem', maxWidth: 560, margin: '0 auto', lineHeight: 1.9 }}>
            Every fragrance is a poem written in rare essences. We source only the finest ingredients from their most sacred origins on earth.
          </p>
        </motion.div>

        <div className="ingredients-grid">
          {ingredients.map((ing, i) => (
            <motion.div
              key={ing.name}
              className="ingredient-card"
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="ingredient-glow" />
              <span className="ingredient-icon">{ing.icon}</span>
              <span className="ingredient-name">{ing.name}</span>
              <span className="ingredient-origin">Origin: {ing.origin}</span>
              <p className="ingredient-desc">{ing.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
