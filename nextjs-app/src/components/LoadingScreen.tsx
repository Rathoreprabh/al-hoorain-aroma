'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

interface Props { onComplete: () => void }

const LETTERS_MAIN = 'AL HOORAIN'.split('')
const LETTERS_SUB  = 'AROMA'.split('')

export default function LoadingScreen({ onComplete }: Props) {
  const [visible, setVisible] = useState(true)
  const [progress, setProgress] = useState(0)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  /* Canvas particle effect */
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width  = window.innerWidth
    canvas.height = window.innerHeight

    const particles: { x: number; y: number; vx: number; vy: number; size: number; opacity: number; life: number; maxLife: number }[] = []

    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -Math.random() * 0.6 - 0.1,
        size: Math.random() * 2 + 0.5,
        opacity: 0,
        life: Math.random() * 180,
        maxLife: 180 + Math.random() * 120,
      })
    }

    let raf = 0
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach((p) => {
        p.life++
        if (p.life > p.maxLife) {
          p.life = 0
          p.x = Math.random() * canvas.width
          p.y = canvas.height + 10
          p.vy = -Math.random() * 0.6 - 0.1
        }
        const ratio = p.life / p.maxLife
        p.opacity = ratio < 0.15
          ? ratio / 0.15
          : ratio > 0.75
          ? (1 - ratio) / 0.25
          : 1
        p.x += p.vx
        p.y += p.vy

        ctx.save()
        ctx.globalAlpha = p.opacity * 0.75
        ctx.fillStyle = '#D4AF37'
        ctx.shadowColor = '#D4AF37'
        ctx.shadowBlur = 6
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      })
      raf = requestAnimationFrame(draw)
    }
    draw()

    return () => cancelAnimationFrame(raf)
  }, [])

  /* Progress bar */
  useEffect(() => {
    const start = performance.now()
    const duration = 2400
    const step = (now: number) => {
      const pct = Math.min(100, ((now - start) / duration) * 100)
      setProgress(pct)
      if (pct < 100) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)

    const t = setTimeout(() => {
      setVisible(false)
      setTimeout(onComplete, 800)
    }, 2800)

    return () => clearTimeout(t)
  }, [onComplete])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          style={{ position: 'fixed', inset: 0, background: '#030206', zIndex: 100000, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}
        >
          <canvas
            ref={canvasRef}
            style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
          />

          <div style={{ position: 'relative', textAlign: 'center', zIndex: 1 }}>
            {/* Logo mark */}
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
              style={{
                width: 90, height: 90, borderRadius: '50%',
                margin: '0 auto 2rem',
                boxShadow: '0 0 50px rgba(212,175,55,0.25)',
                overflow: 'hidden',
              }}
            >
              <Image src="/logo.png" alt="Al Hoorain Aroma" width={90} height={90} style={{ borderRadius: '50%' }} priority />
            </motion.div>

            {/* Main letters */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '2px', marginBottom: '0.4rem' }}>
              {LETTERS_MAIN.map((ch, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.06, duration: 0.5, ease: 'easeOut' }}
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: ch === ' ' ? '0.8rem' : '2rem',
                    letterSpacing: '6px',
                    color: '#D4AF37',
                    fontWeight: 700,
                    display: 'inline-block',
                    minWidth: ch === ' ' ? '12px' : undefined,
                    textShadow: '0 0 30px rgba(212,175,55,0.4)',
                  }}
                >
                  {ch}
                </motion.span>
              ))}
            </div>

            {/* Sub letters */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '2px', marginBottom: '3rem' }}>
              {LETTERS_SUB.map((ch, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + i * 0.08, duration: 0.4, ease: 'easeOut' }}
                  style={{
                    fontSize: '0.6rem',
                    letterSpacing: '8px',
                    color: 'rgba(250,235,215,0.4)',
                    fontWeight: 500,
                    textTransform: 'uppercase',
                    display: 'inline-block',
                  }}
                >
                  {ch}
                </motion.span>
              ))}
            </div>

            {/* Loading bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.4 }}
              style={{ width: 200, height: 1, background: 'rgba(212,175,55,0.12)', margin: '0 auto', borderRadius: 1, overflow: 'hidden' }}
            >
              <div
                style={{
                  height: '100%',
                  width: `${progress}%`,
                  background: 'linear-gradient(90deg, #8B6914, #D4AF37, #F0C84C)',
                  borderRadius: 1,
                  boxShadow: '0 0 8px rgba(212,175,55,0.6)',
                  transition: 'width 0.08s linear',
                }}
              />
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.4 }}
              style={{ fontSize: '0.52rem', letterSpacing: '4px', color: 'rgba(250,235,215,0.25)', marginTop: '1rem', textTransform: 'uppercase' }}
            >
              CRAFTING YOUR EXPERIENCE
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
