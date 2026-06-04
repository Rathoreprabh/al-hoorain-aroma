'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useStore } from '@/lib/store'
import { useScrollLock } from '@/hooks/useScrollLock'

export default function WishlistDrawer() {
  const { wishlist, wishOpen, setWishOpen, toggleWishlist, moveToCart } = useStore()
  useScrollLock(wishOpen)

  return (
    <AnimatePresence>
      {wishOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setWishOpen(false)}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', zIndex: 9000, backdropFilter: 'blur(3px)' }}
          />
          <motion.div
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 34 }}
            style={{ position: 'fixed', top: 0, right: 0, bottom: 0, width: '100%', maxWidth: 420, background: '#fff', zIndex: 9001, display: 'flex', flexDirection: 'column', boxShadow: '-20px 0 60px rgba(0,0,0,0.18)' }}
          >
            {/* Header */}
            <div style={{ padding: '1.5rem 1.8rem', borderBottom: '1px solid #e8dfd0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#faf7f2' }}>
              <div>
                <h2 style={{ fontFamily: 'var(--font-head)', fontSize: '1.6rem', fontWeight: 700, color: '#1a1208', letterSpacing: '2px' }}>WISHLIST</h2>
                <p style={{ fontSize: '0.75rem', color: '#8a7a60', marginTop: '2px' }}>{wishlist.length} saved item{wishlist.length !== 1 ? 's' : ''}</p>
              </div>
              <button onClick={() => setWishOpen(false)} style={{ background: '#f2ece0', border: 'none', width: 40, height: 40, borderRadius: '50%', fontSize: '1.2rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1a1208', fontWeight: 700 }}>×</button>
            </div>

            {/* Items */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '1.2rem 1.8rem' }}>
              {wishlist.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
                  <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>♡</div>
                  <p style={{ fontFamily: 'var(--font-head)', fontSize: '1.4rem', color: '#1a1208', marginBottom: '0.5rem', fontWeight: 700 }}>No saved items yet</p>
                  <p style={{ fontSize: '0.82rem', color: '#8a7a60' }}>Click the heart icon on any product to save it here.</p>
                  <button onClick={() => setWishOpen(false)} style={{ marginTop: '1.5rem', background: 'linear-gradient(135deg, #b8920e, #d4af37)', color: '#fff', border: 'none', padding: '0.8rem 2rem', borderRadius: '4px', fontWeight: 700, fontSize: '0.75rem', letterSpacing: '2px', cursor: 'pointer', textTransform: 'uppercase' }}>SHOP NOW</button>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {wishlist.map(item => (
                    <div key={item.id} style={{ display: 'flex', gap: '1rem', padding: '1rem', background: '#faf7f2', borderRadius: '10px', border: '1px solid #e8dfd0' }}>
                      <div style={{ width: 68, height: 68, background: 'radial-gradient(ellipse at 50% 60%, rgba(184,146,14,0.12), #f2ece0)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', flexShrink: 0 }}>
                        {item.emoji}
                      </div>
                      <div style={{ flex: 1 }}>
                        <p style={{ fontSize: '0.62rem', letterSpacing: '2px', color: '#b8920e', textTransform: 'uppercase', fontWeight: 600, marginBottom: '2px' }}>{item.category}</p>
                        <p style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '1rem', color: '#1a1208', marginBottom: '0.3rem', letterSpacing: '1px' }}>{item.name}</p>
                        <p style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '1.05rem', color: '#b8920e', marginBottom: '0.6rem' }}>${item.price}</p>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <button
                            onClick={() => moveToCart(item)}
                            style={{ flex: 1, background: 'linear-gradient(135deg, #b8920e, #d4af37)', color: '#fff', border: 'none', padding: '0.5rem', borderRadius: '4px', fontWeight: 700, fontSize: '0.65rem', letterSpacing: '1.5px', cursor: 'pointer', textTransform: 'uppercase' }}
                          >ADD TO CART</button>
                          <button
                            onClick={() => toggleWishlist(item)}
                            style={{ width: 36, height: 36, background: '#fff', border: '1px solid #d8ccb4', borderRadius: '4px', cursor: 'pointer', color: '#dc2626', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                          >×</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
