'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useStore } from '@/lib/store'

export default function FloatingCart() {
  const { cartCount, cartTotal, cart, setCartOpen } = useStore()
  const prevCount   = useRef(cartCount)
  const [pulse, setPulse]     = useState(false)
  const [preview, setPreview] = useState(false)

  /* Trigger pulse animation whenever an item is added */
  useEffect(() => {
    if (cartCount > prevCount.current) {
      setPulse(true)
      setTimeout(() => setPulse(false), 700)
    }
    prevCount.current = cartCount
  }, [cartCount])

  if (cartCount === 0) return null

  const lastItem = cart[cart.length - 1]

  return (
    <div style={{ position: 'fixed', bottom: '5.5rem', right: '2rem', zIndex: 800, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.6rem' }}>

      {/* Mini preview popup — shows on hover */}
      <AnimatePresence>
        {preview && lastItem && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.94 }}
            transition={{ duration: 0.2 }}
            style={{
              background: '#fff',
              border: '1px solid #d8ccb4',
              borderRadius: '12px',
              padding: '1rem 1.2rem',
              boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
              minWidth: 240,
              maxWidth: 280,
            }}
          >
            <p style={{ fontSize: '0.6rem', letterSpacing: '2px', color: '#b8920e', textTransform: 'uppercase', fontWeight: 700, marginBottom: '0.6rem' }}>
              YOUR CART · {cartCount} ITEM{cartCount !== 1 ? 'S' : ''}
            </p>
            <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center', marginBottom: '0.8rem' }}>
              <div style={{ width: 44, height: 44, background: 'radial-gradient(ellipse at 50% 60%, rgba(184,146,14,0.14), #f2ece0)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', flexShrink: 0 }}>
                {lastItem.emoji}
              </div>
              <div>
                <p style={{ fontSize: '0.8rem', fontWeight: 700, color: '#1a1208' }}>{lastItem.name}</p>
                <p style={{ fontSize: '0.72rem', color: '#8a7a60', fontWeight: 500 }}>${lastItem.price} × {lastItem.quantity}</p>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.6rem', borderTop: '1px solid #e8dfd0' }}>
              <span style={{ fontSize: '0.75rem', color: '#5a4a30', fontWeight: 600 }}>Subtotal</span>
              <span style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '1.1rem', color: '#b8920e' }}>${cartTotal}</span>
            </div>
            <button
              onClick={() => { setPreview(false); setCartOpen(true) }}
              style={{ width: '100%', marginTop: '0.8rem', background: 'linear-gradient(135deg, #b8920e, #d4af37)', color: '#fff', border: 'none', padding: '0.65rem', borderRadius: '6px', fontWeight: 700, fontSize: '0.68rem', letterSpacing: '2px', cursor: 'pointer', textTransform: 'uppercase' }}
            >
              VIEW CART →
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* The FAB itself */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.93 }}
        onClick={() => setCartOpen(true)}
        onMouseEnter={() => setPreview(true)}
        onMouseLeave={() => setPreview(false)}
        style={{
          width: 58, height: 58,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #b8920e, #d4af37)',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 30px rgba(184,146,14,0.40)',
          position: 'relative',
        }}
        title={`Cart (${cartCount} items)`}
      >
        {/* Pulse ring on item-added */}
        <AnimatePresence>
          {pulse && (
            <motion.div
              initial={{ scale: 1, opacity: 0.7 }}
              animate={{ scale: 2.2, opacity: 0 }}
              exit={{}}
              transition={{ duration: 0.65, ease: 'easeOut' }}
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '50%',
                background: 'rgba(212,175,55,0.5)',
                pointerEvents: 'none',
              }}
            />
          )}
        </AnimatePresence>

        {/* Cart icon */}
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2">
          <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
          <line x1="3" y1="6" x2="21" y2="6"/>
          <path d="M16 10a4 4 0 0 1-8 0"/>
        </svg>

        {/* Count badge */}
        <motion.span
          key={cartCount}
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          style={{
            position: 'absolute',
            top: -4, right: -4,
            width: 22, height: 22,
            borderRadius: '50%',
            background: '#1a1208',
            color: '#d4af37',
            fontSize: '0.65rem',
            fontWeight: 800,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px solid #fff',
          }}
        >
          {cartCount > 9 ? '9+' : cartCount}
        </motion.span>
      </motion.button>
    </div>
  )
}
