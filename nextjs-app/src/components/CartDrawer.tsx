'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useStore } from '@/lib/store'
import { useScrollLock } from '@/hooks/useScrollLock'

export default function CartDrawer() {
  const { cart, cartOpen, setCartOpen, removeFromCart, updateQty, cartTotal, cartCount, setCheckoutOpen } = useStore()
  useScrollLock(cartOpen)

  const handleCheckout = () => {
    setCartOpen(false)
    setTimeout(() => setCheckoutOpen(true), 200)
  }

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setCartOpen(false)}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', zIndex: 9000, backdropFilter: 'blur(3px)' }}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 34 }}
            style={{
              position: 'fixed', top: 0, right: 0, bottom: 0,
              width: '100%', maxWidth: 440,
              background: '#fff',
              zIndex: 9001,
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '-20px 0 60px rgba(0,0,0,0.18)',
            }}
          >
            {/* Header */}
            <div style={{ padding: '1.5rem 1.8rem', borderBottom: '1px solid #e8dfd0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#faf7f2' }}>
              <div>
                <h2 style={{ fontFamily: 'var(--font-head)', fontSize: '1.6rem', fontWeight: 700, color: '#1a1208', letterSpacing: '2px' }}>
                  YOUR CART
                </h2>
                <p style={{ fontSize: '0.75rem', color: '#8a7a60', marginTop: '2px' }}>{cartCount} item{cartCount !== 1 ? 's' : ''}</p>
              </div>
              <button
                onClick={() => setCartOpen(false)}
                style={{ background: '#f2ece0', border: 'none', width: 40, height: 40, borderRadius: '50%', fontSize: '1.2rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1a1208', fontWeight: 700 }}
              >×</button>
            </div>

            {/* Items */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '1.2rem 1.8rem' }}>
              {cart.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
                  <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🛍️</div>
                  <p style={{ fontFamily: 'var(--font-head)', fontSize: '1.4rem', color: '#1a1208', marginBottom: '0.5rem', fontWeight: 700 }}>Your cart is empty</p>
                  <p style={{ fontSize: '0.82rem', color: '#8a7a60' }}>Discover our luxury fragrances and add them to your cart.</p>
                  <button
                    onClick={() => setCartOpen(false)}
                    style={{ marginTop: '1.5rem', background: 'linear-gradient(135deg, #b8920e, #d4af37)', color: '#fff', border: 'none', padding: '0.8rem 2rem', borderRadius: '4px', fontWeight: 700, fontSize: '0.75rem', letterSpacing: '2px', cursor: 'pointer', textTransform: 'uppercase' }}
                  >
                    SHOP NOW
                  </button>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                  {cart.map(item => (
                    <div key={item.id} style={{ display: 'flex', gap: '1rem', padding: '1rem', background: '#faf7f2', borderRadius: '10px', border: '1px solid #e8dfd0' }}>
                      {/* Emoji */}
                      <div style={{ width: 72, height: 72, background: 'radial-gradient(ellipse at 50% 60%, rgba(184,146,14,0.12), #f2ece0)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.2rem', flexShrink: 0 }}>
                        {item.emoji}
                      </div>

                      {/* Info */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontSize: '0.65rem', letterSpacing: '2px', color: '#b8920e', textTransform: 'uppercase', fontWeight: 600, marginBottom: '3px' }}>{item.category}</p>
                        <p style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '1.05rem', color: '#1a1208', marginBottom: '0.5rem', letterSpacing: '1px' }}>{item.name}</p>
                        <p style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '1.1rem', color: '#b8920e' }}>${item.price}</p>

                        {/* Qty */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginTop: '0.6rem' }}>
                          <button
                            onClick={() => updateQty(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            style={{ width: 28, height: 28, borderRadius: '50%', border: '1px solid #d8ccb4', background: '#fff', cursor: 'pointer', fontWeight: 700, fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1a1208', opacity: item.quantity <= 1 ? 0.4 : 1 }}
                          >−</button>
                          <span style={{ fontWeight: 700, fontSize: '0.9rem', color: '#1a1208', minWidth: 20, textAlign: 'center' }}>{item.quantity}</span>
                          <button
                            onClick={() => updateQty(item.id, item.quantity + 1)}
                            style={{ width: 28, height: 28, borderRadius: '50%', border: '1px solid #d8ccb4', background: '#fff', cursor: 'pointer', fontWeight: 700, fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1a1208' }}
                          >+</button>

                          <button
                            onClick={() => removeFromCart(item.id)}
                            style={{ marginLeft: 'auto', background: 'none', border: 'none', color: '#dc2626', cursor: 'pointer', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '1px', textDecoration: 'underline' }}
                          >Remove</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div style={{ padding: '1.4rem 1.8rem', borderTop: '1px solid #e8dfd0', background: '#faf7f2' }}>
                {/* Free shipping bar */}
                {cartTotal < 300 && (
                  <div style={{ marginBottom: '1rem', padding: '0.7rem 1rem', background: '#fff', borderRadius: '8px', border: '1px solid #e8dfd0' }}>
                    <p style={{ fontSize: '0.72rem', color: '#5a4a30', fontWeight: 600, marginBottom: '0.4rem' }}>
                      Add ${(300 - cartTotal).toFixed(0)} more for FREE shipping
                    </p>
                    <div style={{ height: 4, background: '#e8dfd0', borderRadius: 2, overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${(cartTotal / 300) * 100}%`, background: 'linear-gradient(90deg, #b8920e, #d4af37)', borderRadius: 2, transition: 'width 0.4s' }} />
                    </div>
                  </div>
                )}
                {cartTotal >= 300 && (
                  <p style={{ fontSize: '0.72rem', color: '#16a34a', fontWeight: 600, marginBottom: '0.8rem', textAlign: 'center' }}>✓ You qualify for FREE shipping!</p>
                )}

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <span style={{ fontWeight: 600, color: '#5a4a30', fontSize: '0.85rem' }}>Subtotal</span>
                  <span style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '1.4rem', color: '#b8920e' }}>${cartTotal.toFixed(0)}</span>
                </div>

                <button
                  onClick={handleCheckout}
                  style={{ width: '100%', background: 'linear-gradient(135deg, #b8920e, #d4af37)', color: '#fff', border: 'none', padding: '1rem', borderRadius: '6px', fontWeight: 700, fontSize: '0.82rem', letterSpacing: '2.5px', cursor: 'pointer', textTransform: 'uppercase', marginBottom: '0.6rem', transition: 'opacity 0.2s' }}
                  onMouseOver={e => (e.currentTarget.style.opacity = '0.88')}
                  onMouseOut={e => (e.currentTarget.style.opacity = '1')}
                >
                  PROCEED TO CHECKOUT
                </button>
                <button
                  onClick={() => setCartOpen(false)}
                  style={{ width: '100%', background: 'none', border: '1px solid #d8ccb4', color: '#5a4a30', padding: '0.75rem', borderRadius: '6px', fontWeight: 600, fontSize: '0.75rem', cursor: 'pointer', letterSpacing: '1.5px' }}
                >
                  CONTINUE SHOPPING
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
