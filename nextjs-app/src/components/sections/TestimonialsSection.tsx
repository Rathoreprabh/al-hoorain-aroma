'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const testimonials = [
  {
    stars: 5,
    text: '"Midnight Essence is absolutely divine. The oud note is perfectly balanced — deep, dark, mysterious. I\'ve received countless compliments and it lasts magnificently."',
    name: 'Sarah Al-Rashid',
    loc: 'Verified Customer · Dubai, UAE',
    avatar: 'S',
  },
  {
    stars: 5,
    text: '"The Floral Symphony collection is extraordinary. Every bottle feels like wearing a piece of art. Al Hoorain truly understands what luxury fragrance should be."',
    name: 'Mohammed Khalid',
    loc: 'Verified Customer · London, UK',
    avatar: 'M',
  },
  {
    stars: 5,
    text: '"Golden Hour exceeded every expectation I had. The packaging alone is stunning, and the fragrance itself is intoxicating. Will absolutely be ordering again."',
    name: 'Amira Hassan',
    loc: 'Verified Customer · Paris, France',
    avatar: 'A',
  },
]

export default function TestimonialsSection() {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="testimonials-section" ref={ref}>
      <div className="testimonials-inner">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: '5rem' }}
        >
          <span className="section-eyebrow">Customer Voices</span>
          <h2 className="section-heading">
            WHAT THEY<br /><span>SAY</span>
          </h2>
          <div className="section-rule" />
        </motion.div>

        <div className="testimonials-grid">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              className="testimonial-card"
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6 }}
            >
              <div className="t-stars">
                {'★'.repeat(t.stars)}
              </div>
              <p className="t-text">{t.text}</p>
              <div className="t-author">
                <div className="t-avatar">{t.avatar}</div>
                <div>
                  <span className="t-name">{t.name}</span>
                  <span className="t-loc">{t.loc}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
