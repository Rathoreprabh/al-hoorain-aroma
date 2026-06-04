'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const stats = [
  { target: 5000, suffix: '+', label: 'Happy Customers' },
  { target: 50,   suffix: '+', label: 'Unique Fragrances' },
  { target: 25,   suffix: '+', label: 'Countries Shipped' },
  { target: 10,   suffix: '+', label: 'Years of Excellence' },
]

function AnimatedNumber({ target, suffix }: { target: number; suffix: string }) {
  const [value, setValue] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  useEffect(() => {
    if (!inView) return
    const duration = 2000
    const start = performance.now()
    const step = (now: number) => {
      const progress = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(eased * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [inView, target])

  return (
    <span className="stat-val" ref={ref}>
      <span>{value.toLocaleString()}</span>
      <span style={{ fontSize: '2rem', color: 'var(--gold)' }}>{suffix}</span>
    </span>
  )
}

export default function StatsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="stats-section" ref={ref}>
      <div className="stats-grid">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{ textAlign: 'center', padding: '1rem' }}
          >
            <AnimatedNumber target={s.target} suffix={s.suffix} />
            <p className="stat-lbl">{s.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
