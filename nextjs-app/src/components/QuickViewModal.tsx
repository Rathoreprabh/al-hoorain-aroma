'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useStore } from '@/lib/store'
import { useScrollLock } from '@/hooks/useScrollLock'

export default function QuickViewModal() {
  const { quickViewProduct, setQuickView, addToCart, toggleWishlist, isInWishlist } = useStore()
  const [qty, setQty] = useState(1)
  useScrollLock(!!quickViewProduct)

  const p = quickViewProduct
  if (!p) return null

  const inWish = isInWishlist(p.id)

  return (
    <AnimatePresence>
      {p && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setQuickView(null)}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 9200, backdropFilter: 'blur(4px)' }}
          />
          {/* Centering wrapper — separate from the animated div so framer's
              transform (scale/y) doesn't clobber a CSS translate centering. */}
          <div style={{ position: 'fixed', inset: 0, zIndex: 9201, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', pointerEvents: 'none' }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            className="quickview-card"
            style={{
              position: 'relative',
              width: '100%', maxWidth: 780,
              maxHeight: '90vh',
              background: '#fff',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 40px 100px rgba(0,0,0,0.25)',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              pointerEvents: 'auto',
            }}
          >
            {/* Left — image */}
            <div style={{ background: 'radial-gradient(ellipse at 50% 65%, rgba(184,146,14,0.14), #f2ece0)', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 360, position: 'relative' }}>
              {p.badge && (
                <span style={{ position: 'absolute', top: '1.2rem', left: '1.2rem', background: 'linear-gradient(135deg, #b8920e, #d4af37)', color: '#fff', fontSize: '0.58rem', letterSpacing: '2px', fontWeight: 700, padding: '0.25rem 0.8rem', borderRadius: '2px', textTransform: 'uppercase' }}>{p.badge}</span>
              )}
              {p.image
                ? <img src={p.image} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }} />
                : <span style={{ fontSize: '7rem', filter: 'drop-shadow(0 16px 40px rgba(184,146,14,0.22))' }}>{p.emoji}</span>}
            </div>

            {/* Right — info */}
            <div style={{ padding: '2.2rem', display: 'flex', flexDirection: 'column', overflowY: 'auto', maxHeight: '85vh' }}>
              {/* Close */}
              <button onClick={() => setQuickView(null)} style={{ position: 'absolute', top: '1rem', right: '1rem', background: '#f2ece0', border: 'none', width: 36, height: 36, borderRadius: '50%', cursor: 'pointer', fontSize: '1.1rem', fontWeight: 700, color: '#1a1208', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1 }}>×</button>

              <p style={{ fontSize: '0.6rem', letterSpacing: '3px', color: '#b8920e', textTransform: 'uppercase', fontWeight: 600, marginBottom: '0.6rem' }}>{p.category}</p>
              <h2 style={{ fontFamily: 'var(--font-head)', fontSize: '2rem', fontWeight: 700, color: '#1a1208', letterSpacing: '2px', marginBottom: '0.5rem', lineHeight: 1.1 }}>{p.name}</h2>

              {/* Stars */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <span style={{ color: '#d4af37', fontSize: '0.85rem', letterSpacing: '2px' }}>{'★'.repeat(Math.floor(p.rating))}</span>
                <span style={{ fontSize: '0.75rem', color: '#8a7a60', fontWeight: 600 }}>{p.rating} / 5.0</span>
              </div>

              <p style={{ fontSize: '0.88rem', color: '#5a4a30', lineHeight: 1.8, marginBottom: '1.2rem', fontWeight: 500 }}>{p.description}</p>

              {/* Notes */}
              <div style={{ marginBottom: '1.4rem' }}>
                <p style={{ fontSize: '0.62rem', letterSpacing: '2.5px', color: '#8a7a60', textTransform: 'uppercase', fontWeight: 600, marginBottom: '0.6rem' }}>FRAGRANCE NOTES</p>
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                  {p.notes.map(n => (
                    <span key={n} style={{ padding: '0.3rem 0.8rem', border: '1px solid rgba(184,146,14,0.25)', borderRadius: '20px', fontSize: '0.72rem', color: '#b8920e', background: 'rgba(184,146,14,0.06)', fontWeight: 600 }}>{n}</span>
                  ))}
                </div>
              </div>

              {/* Price */}
              <p style={{ fontFamily: 'var(--font-head)', fontSize: '2.2rem', fontWeight: 700, color: '#b8920e', marginBottom: '1.4rem' }}>{p.price > 0 ? `$${p.price}` : 'Inquire'}</p>

              {/* Qty + Add */}
              <div style={{ display: 'flex', gap: '0.8rem', marginBottom: '0.8rem', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #d8ccb4', borderRadius: '6px', overflow: 'hidden' }}>
                  <button onClick={() => setQty(q => Math.max(1, q - 1))} style={{ width: 36, height: 44, background: '#f2ece0', border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: '1.1rem', color: '#1a1208' }}>−</button>
                  <span style={{ width: 40, textAlign: 'center', fontWeight: 700, fontSize: '0.95rem', color: '#1a1208' }}>{qty}</span>
                  <button onClick={() => setQty(q => q + 1)} style={{ width: 36, height: 44, background: '#f2ece0', border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: '1.1rem', color: '#1a1208' }}>+</button>
                </div>
                <button
                  onClick={() => { addToCart(p, qty); setQty(1) }}
                  style={{ flex: 1, background: 'linear-gradient(135deg, #b8920e, #d4af37)', color: '#fff', border: 'none', padding: '0.85rem', borderRadius: '6px', fontWeight: 700, fontSize: '0.75rem', letterSpacing: '2px', cursor: 'pointer', textTransform: 'uppercase' }}
                >ADD TO CART</button>
              </div>
              <button
                onClick={() => toggleWishlist(p)}
                style={{ width: '100%', background: 'none', border: `1px solid ${inWish ? '#dc2626' : '#d8ccb4'}`, color: inWish ? '#dc2626' : '#5a4a30', padding: '0.75rem', borderRadius: '6px', fontWeight: 600, fontSize: '0.75rem', cursor: 'pointer', letterSpacing: '1.5px', textTransform: 'uppercase', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
              >
                {inWish ? '♥ SAVED TO WISHLIST' : '♡ ADD TO WISHLIST'}
              </button>
            </div>
          </motion.div>
          </div>{/* /centering wrapper */}
        </>
      )}
    </AnimatePresence>
  )
}
