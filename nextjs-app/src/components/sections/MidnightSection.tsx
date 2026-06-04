'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const spotlights = [
  { id: 1, emoji: '🌙', name: 'MIDNIGHT ESSENCE', price: '$250', featured: false },
  { id: 4, emoji: '✨', name: 'GOLDEN HOUR',      price: '$240', featured: true, badge: 'BESTSELLER' },
  { id: 7, emoji: '🌶️', name: 'SPICE MARKET',     price: '$260', featured: false },
]

export default function MidnightSection() {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="midnight-section" ref={ref}>
      <div className="midnight-bg-glow" />
      <div style={{
        position: 'absolute', width: 500, height: 500, borderRadius: '50%',
        right: -200, top: '50%', transform: 'translateY(-50%)',
        background: 'radial-gradient(circle, rgba(212,175,55,0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="midnight-inner">
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="midnight-eyebrow">Signature Collection</span>
          <h2 className="midnight-title">
            THE MIDNIGHT<br />
            <em>COLLECTION</em>
          </h2>
          <p className="midnight-desc">
            Where darkness meets desire. Our most enigmatic fragrances, born from the mystery of the night and the ageless warmth of ancient oud.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
            <motion.button
              className="btn-gold"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              SHOP COLLECTION
            </motion.button>
            <span style={{ fontSize: '0.65rem', letterSpacing: '2px', color: 'var(--white-30)', textTransform: 'uppercase' }}>
              8 exclusive fragrances
            </span>
          </div>
        </motion.div>

        {/* Cards */}
        <motion.div
          className="midnight-cards"
          initial={{ opacity: 0, x: 60 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          {spotlights.map((s, i) => (
            <motion.div
              key={s.id}
              className={`midnight-card${s.featured ? ' featured' : ''}`}
              whileHover={{
                y: s.featured ? -26 : -8,
                scale: s.featured ? 1.06 : 1.02,
                borderColor: 'rgba(212,175,55,0.4)',
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              {s.badge && <span className="mc-badge">{s.badge}</span>}
              <span className="mc-emoji">{s.emoji}</span>
              <span className="mc-name">{s.name}</span>
              <span className="mc-price">{s.price}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
