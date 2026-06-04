'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const features = [
  'Hand-selected rare ingredients from 40+ countries',
  'Master perfumers with decades of classical training',
  'Sustainable and ethical sourcing practices',
  'Each bottle aged for a minimum of 6 months',
]

export default function StorySection() {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const ease = [0.22, 1, 0.36, 1] as const
  const leftV = {
    hidden: { opacity: 0, x: -60 },
    show:   { opacity: 1, x: 0, transition: { duration: 0.9, ease } },
  }
  const rightV = {
    hidden: { opacity: 0, x: 60 },
    show:   { opacity: 1, x: 0, transition: { duration: 0.9, delay: 0.15, ease } },
  }

  return (
    <section className="story-section" id="story" ref={ref}>
      {/* Text */}
      <motion.div
        variants={leftV}
        initial="hidden"
        animate={inView ? 'show' : 'hidden'}
      >
        <span className="story-eyebrow">Our Heritage</span>
        <h2 className="story-title">
          THE ART<br />OF FRAGRANCE
        </h2>
        <p className="story-body">
          Al Hoorain Aroma was born from an obsession — the relentless pursuit of perfection in olfactory art. Founded by master perfumers trained in the ancient traditions of Arabian attar-making and refined by years of study in Grasse, France.
        </p>
        <p className="story-body">
          We believe that fragrance is not just a scent — it is a language of the soul. An emotion crystallized. A memory sealed in a bottle that will outlive the moment it was worn.
        </p>

        <div className="story-features">
          {features.map((f, i) => (
            <motion.div
              key={i}
              className="story-feat"
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.5 + i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="story-feat-dot">✦</div>
              <span>{f}</span>
            </motion.div>
          ))}
        </div>

        <motion.button
          className="btn-gold"
          whileHover={{ scale: 1.03, y: -2 }}
          whileTap={{ scale: 0.97 }}
        >
          EXPLORE OUR STORY
        </motion.button>
      </motion.div>

      {/* Visual */}
      <motion.div
        className="story-visual"
        variants={rightV}
        initial="hidden"
        animate={inView ? 'show' : 'hidden'}
      >
        <div className="story-visual-ring sv-r1" />
        <div className="story-visual-ring sv-r2" />
        <div className="story-visual-ring sv-r3" />
        <span className="story-visual-emoji">🫧</span>

        {/* Ambient light effects */}
        <div style={{
          position: 'absolute',
          top: '10%', right: '10%',
          width: 120, height: 120,
          background: 'radial-gradient(circle, rgba(212,175,55,0.12), transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(10px)',
        }} />
        <div style={{
          position: 'absolute',
          bottom: '15%', left: '15%',
          width: 80, height: 80,
          background: 'radial-gradient(circle, rgba(100,60,200,0.08), transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(8px)',
        }} />
      </motion.div>
    </section>
  )
}
