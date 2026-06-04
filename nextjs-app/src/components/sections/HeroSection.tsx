'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

/* ── Split Text helper ──────────────────────────────────────────────── */
function SplitText({ text, delay = 0, className }: { text: string; delay?: number; className?: string }) {
  return (
    <span className={className}>
      {text.split('').map((ch, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 40, rotateX: -40 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{
            delay: delay + i * 0.04,
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
          }}
          style={{ display: 'inline-block', transformOrigin: 'bottom' }}
        >
          {ch === ' ' ? ' ' : ch}
        </motion.span>
      ))}
    </span>
  )
}

/* ── Scroll progress bar ─────────────────────────────────────────────── */
function ScrollProgressBar() {
  const barRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const onScroll = () => {
      const max = document.body.scrollHeight - window.innerHeight
      const pct = max > 0 ? (window.scrollY / max) * 100 : 0
      if (barRef.current) barRef.current.style.width = `${pct}%`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return <div ref={barRef} className="scroll-progress-bar" />
}

/* ── Hero Section ───────────────────────────────────────────────────── */
export default function HeroSection() {
  const [ready, setReady] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 100)
    return () => clearTimeout(t)
  }, [])

  /* Try to autoplay; most browsers allow muted autoplay */
  useEffect(() => {
    const vid = videoRef.current
    if (!vid) return
    vid.muted = true
    vid.play().catch(() => {/* silently fail if blocked */})
  }, [])

  const ease = [0.22, 1, 0.36, 1] as const
  const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12 } },
  }
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show:   { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
  }

  return (
    <section className="hero-section">
      <ScrollProgressBar />

      {/* ── Video background ── */}
      <video
        ref={videoRef}
        className="hero-video"
        src="/al_hoorain.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />

      {/* Dark + gold overlay */}
      <div className="hero-overlay" />
      <div className="hero-overlay-gold" />

      {/* ── Content ── */}
      <div className="hero-inner">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={ready ? 'show' : 'hidden'}
          style={{ maxWidth: 700 }}
        >
          <motion.span className="hero-eyebrow" variants={fadeUp}>
            Premium Luxury Fragrances
          </motion.span>

          <h1 className="hero-title">
            <span className="line">
              {ready && <SplitText text="ESSENCE" delay={0.2} />}
            </span>
            <span className="line">
              {ready && (
                <>
                  <SplitText text="OF" delay={0.5} />
                  {' '}
                  <SplitText text="LUXURY" delay={0.62} className="line-gold" />
                </>
              )}
            </span>
          </h1>

          <motion.p className="hero-subtitle" variants={fadeUp}>
            Discover the art of fragrance. Where Arabian royal heritage meets Italian craftsmanship in every drop.
          </motion.p>

          <motion.div className="hero-actions" variants={fadeUp}>
            <button
              className="btn-gold"
              onClick={() => document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' })}
            >
              EXPLORE COLLECTION
            </button>
            <button
              className="btn-outline"
              onClick={() => document.getElementById('story')?.scrollIntoView({ behavior: 'smooth' })}
            >
              OUR STORY
            </button>
          </motion.div>

          <motion.div className="hero-stats" variants={fadeUp}>
            {[
              { num: '50+', lbl: 'Fragrances' },
              { num: '5K+', lbl: 'Customers' },
              { num: '25+', lbl: 'Countries' },
            ].map(({ num, lbl }, i) => (
              <div key={lbl} style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                {i > 0 && <div className="hero-stat-div" />}
                <div>
                  <span className="hero-stat-num">{num}</span>
                  <span className="hero-stat-lbl">{lbl}</span>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="scroll-ind"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
      >
        <div className="scroll-ind-line" />
        <span>SCROLL</span>
      </motion.div>
    </section>
  )
}
