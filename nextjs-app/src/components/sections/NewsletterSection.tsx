'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

export default function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) { setSubmitted(true); setEmail('') }
  }

  return (
    <section className="newsletter-section" ref={ref}>
      <div className="newsletter-inner">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="section-eyebrow">Exclusive Access</span>
          <h2 className="section-heading" style={{ marginBottom: '1rem' }}>
            JOIN THE<br /><span>INNER CIRCLE</span>
          </h2>
          <p style={{ color: 'var(--white-60)', fontSize: '0.88rem', lineHeight: 1.9, marginBottom: 0 }}>
            Be the first to discover new fragrances, seasonal collections, and exclusive members-only offers. Your privacy is sacred to us.
          </p>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{
                marginTop: '2.5rem',
                padding: '1.5rem',
                border: '1px solid var(--gold-20)',
                borderRadius: '4px',
                background: 'rgba(212,175,55,0.05)',
                color: 'var(--gold)',
                fontSize: '0.82rem',
                letterSpacing: '1px',
              }}
            >
              ✦ Welcome to the Inner Circle. You&apos;ll hear from us soon.
            </motion.div>
          ) : (
            <form className="newsletter-form" onSubmit={handleSubmit}>
              <input
                type="email"
                className="newsletter-input"
                placeholder="Enter your email address..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <motion.button
                type="submit"
                className="newsletter-submit"
                whileHover={{ opacity: 0.88 }}
                whileTap={{ scale: 0.97 }}
              >
                SUBSCRIBE
              </motion.button>
            </form>
          )}

          <p style={{ fontSize: '0.6rem', letterSpacing: '1px', color: 'var(--white-30)', marginTop: '1.2rem' }}>
            No spam. Unsubscribe at any time. Your data is never shared.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
