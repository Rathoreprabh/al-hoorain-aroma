'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'

const blocks = [
  {
    icon: '🌍',
    title: 'Arabian Royal Heritage',
    body: 'Fall in love with the luxury of Arabian perfumes. Arabic perfumes carry strong and aromatic fragrances while having the base of conventional Jasmine, Amber, Musk and Oud. Where oud is recognised as the fragrance of wood that is used on the skin or also to burn to spread the smoke in the ambience.',
  },
  {
    icon: '🏛️',
    title: 'Italian Craftsmanship',
    body: 'Trained under master perfumers of Grasse — the perfume capital of the world — our artisans bring centuries of Italian formulation craft to every Al Hoorain creation. The result is a perfect harmony of East and West.',
  },
  {
    icon: '🌿',
    title: 'Ethically Sourced Ingredients',
    body: 'We travel to 40+ countries to handpick the rarest ingredients at their peak quality. Our oud comes from sustainable agarwood forests, our roses from the valleys of Damascus, and our vanilla from Madagascar.',
  },
  {
    icon: '✦',
    title: 'Our Promise to You',
    body: 'Every bottle of Al Hoorain Aroma is numbered, dated, and signed by the perfumer who created it. You are not buying a product — you are acquiring a piece of living art that will never be identically replicated.',
  },
]

function Block({ icon, title, body, i }: { icon: string; title: string; body: string; i: number }) {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
      style={{
        padding: '3.5rem 0',
        borderBottom: i < blocks.length - 1 ? '1px solid #e8dfd0' : 'none',
      }}
    >
      <div style={{ display: 'flex', gap: '1.4rem', alignItems: 'flex-start' }}>
        <div style={{
          width: 52, height: 52, borderRadius: '12px', flexShrink: 0,
          background: 'linear-gradient(135deg, rgba(184,146,14,0.12), rgba(184,146,14,0.06))',
          border: '1px solid rgba(184,146,14,0.20)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1.5rem',
        }}>{icon}</div>

        <div>
          <h3 style={{
            fontFamily: 'var(--font-head)',
            fontSize: '1.7rem', fontWeight: 700,
            color: '#1a1208', letterSpacing: '2px',
            marginBottom: '0.9rem', lineHeight: 1.1,
          }}>{title}</h3>
          <p style={{ fontSize: '0.95rem', color: '#5a4a30', lineHeight: 1.9, fontWeight: 500 }}>{body}</p>
        </div>
      </div>
    </motion.div>
  )
}

export default function StickyScrollSection() {
  return (
    <section
      style={{
        position: 'relative',
        zIndex: 1,
        background: '#faf7f2',
        borderTop: '1px solid #e8dfd0',
        borderBottom: '1px solid #e8dfd0',
      }}
    >
      <div
        style={{
          maxWidth: 1400,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
        }}
      >
        {/* ── LEFT: sticky perfume bottle image ──────────────── */}
        <div
          style={{
            position: 'sticky',
            top: 104,              /* ticker(34) + nav(70) */
            height: 'calc(100vh - 104px)',
            overflow: 'hidden',
          }}
        >
          <Image
            src="/perfume-bottle.png"
            alt="Al Hoorain Oud Ultimate luxury perfume"
            fill
            sizes="50vw"
            style={{ objectFit: 'cover', objectPosition: 'center' }}
            priority
          />

          {/* Subtle right-side fade to blend with content panel */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to right, rgba(0,0,0,0.10) 0%, rgba(0,0,0,0.04) 65%, rgba(250,247,242,0.55) 100%)',
          }} />

          {/* Brand label overlaid on image */}
          <div style={{
            position: 'absolute',
            bottom: '3rem', left: '3rem',
          }}>
            <p style={{ fontSize: '0.55rem', letterSpacing: '5px', color: 'rgba(212,175,55,0.95)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '0.5rem', textShadow: '0 1px 6px rgba(0,0,0,0.6)' }}>
              EST. 2014
            </p>
            <h2 style={{
              fontFamily: 'var(--font-head)',
              fontSize: 'clamp(1.8rem, 3vw, 2.8rem)',
              fontWeight: 700, color: '#FAEBD7',
              letterSpacing: '4px', lineHeight: 1,
              textShadow: '0 2px 12px rgba(0,0,0,0.7)',
            }}>
              AL HOORAIN<br />
              <span style={{ background: 'linear-gradient(135deg, #b8920e, #d4af37)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', fontStyle: 'italic', fontWeight: 300 }}>AROMA</span>
            </h2>
          </div>
        </div>

        {/* ── RIGHT: scrolling content ─────────────────────── */}
        <div style={{ padding: '4rem 4rem 4rem 5rem', background: '#faf7f2' }}>
          <div style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
            <p style={{ fontSize: '0.6rem', letterSpacing: '5px', color: '#b8920e', textTransform: 'uppercase', fontWeight: 700, marginBottom: '1rem' }}>
              About Our Brand
            </p>
            <h2 style={{
              fontFamily: 'var(--font-head)',
              fontSize: 'clamp(2.4rem, 4vw, 3.8rem)',
              fontWeight: 700, color: '#1a1208',
              letterSpacing: '3px', lineHeight: 1,
              marginBottom: '0.5rem',
            }}>
              ARABIC PERFUMES<br />
              <span style={{ background: 'linear-gradient(135deg, #b8920e, #d4af37)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', fontStyle: 'italic', fontWeight: 300, letterSpacing: '5px' }}>AND BAKHOOR</span>
            </h2>
            <div style={{ width: 60, height: 2, background: 'linear-gradient(90deg, #b8920e, #d4af37)', borderRadius: 1, marginTop: '1.4rem' }} />
          </div>

          {blocks.map((b, i) => (
            <Block key={b.title} {...b} i={i} />
          ))}

          <div style={{ paddingTop: '3rem' }}>
            <button
              onClick={() => document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' })}
              style={{
                background: 'linear-gradient(135deg, #b8920e, #d4af37)',
                color: '#fff', border: 'none',
                padding: '1rem 2.8rem', borderRadius: '4px',
                fontWeight: 700, fontSize: '0.78rem',
                letterSpacing: '3px', cursor: 'pointer',
                textTransform: 'uppercase',
                fontFamily: 'var(--font-body)',
                boxShadow: '0 8px 30px rgba(184,146,14,0.28)',
              }}
            >
              SHOP NOW
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
