'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

/* A full-width strip with the video as a fixed-position background.
   As the user scrolls, the video stays still while this panel slides over it.
   This is the classic "scroll reveals fixed bg" parallax effect.          */
export default function ParallaxBanner() {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <div
      ref={ref}
      style={{
        position: 'relative',
        height: '60vh',
        minHeight: 360,
        overflow: 'hidden',
        zIndex: 1,
      }}
    >
      {/* Fixed video layer — stays put while page scrolls */}
      <video
        autoPlay muted loop playsInline
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover',
          objectPosition: 'center 30%',
        }}
        src="/al_hoorain.mp4"
      />

      {/* Dark overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(135deg, rgba(10,6,3,0.75) 0%, rgba(20,14,6,0.65) 100%)',
      }} />

      {/* Content over video */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '0 2rem',
      }}>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
          style={{ fontSize: '0.62rem', letterSpacing: '6px', color: 'rgba(212,175,55,0.9)', textTransform: 'uppercase', fontWeight: 600, marginBottom: '1.2rem' }}
        >
          The Experience
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
          style={{
            fontFamily: 'var(--font-head)',
            fontSize: 'clamp(2.2rem, 6vw, 5rem)',
            fontWeight: 700,
            color: '#FAEBD7',
            letterSpacing: '6px',
            lineHeight: 1,
            marginBottom: '1.5rem',
          }}
        >
          BEYOND THE<br />
          <span style={{
            background: 'linear-gradient(135deg, #b8920e, #d4af37, #e8c84c)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            fontStyle: 'italic',
            fontWeight: 300,
            letterSpacing: '10px',
          }}>ORDINARY</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.22, duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
          style={{ fontSize: '0.92rem', color: 'rgba(250,235,215,0.65)', maxWidth: 540, lineHeight: 1.9, fontWeight: 500, marginBottom: '2rem' }}
        >
          Every bottle tells a story that begins in the ancient souks of Arabia and ends on the catwalks of Milan.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.34, duration: 0.6 }}
          whileHover={{ scale: 1.04, y: -2 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' })}
          style={{
            background: 'linear-gradient(135deg, #b8920e, #d4af37)',
            color: '#fff',
            border: 'none',
            padding: '0.9rem 2.6rem',
            borderRadius: '4px',
            fontWeight: 700,
            fontSize: '0.72rem',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            cursor: 'pointer',
            fontFamily: 'var(--font-body)',
          }}
        >
          SHOP THE COLLECTION
        </motion.button>
      </div>
    </div>
  )
}
