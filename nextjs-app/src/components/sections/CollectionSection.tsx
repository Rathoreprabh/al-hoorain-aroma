'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { products } from '@/lib/products'
import { useStore } from '@/lib/store'

function ProductCard({ product, index }: { product: typeof products[0]; index: number }) {
  const { addToCart, toggleWishlist, isInWishlist, setQuickView } = useStore()
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [hovering, setHovering] = useState(false)
  const inWish = isInWishlist(product.id)

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width  - 0.5
    const py = (e.clientY - rect.top)  / rect.height - 0.5
    setTilt({ x: py * -10, y: px * 10 })
  }

  return (
    <motion.div
      className="product-card"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: hovering ? 'transform 0.1s linear' : 'transform 0.5s ease',
      }}
      onMouseMove={onMove}
      onMouseLeave={() => { setTilt({ x: 0, y: 0 }); setHovering(false) }}
      onMouseEnter={() => setHovering(true)}
    >
      {/* Image */}
      <div className="product-img-wrap">
        {product.badge && (
          <div className="product-badge-wrap">
            <span className="product-badge">{product.badge}</span>
          </div>
        )}

        {/* Wishlist heart */}
        <button
          onClick={(e) => { e.stopPropagation(); toggleWishlist(product) }}
          style={{
            position: 'absolute', top: '0.8rem', right: '0.8rem',
            width: 34, height: 34, borderRadius: '50%',
            background: 'rgba(255,255,255,0.92)',
            border: '1px solid #d8ccb4',
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.1rem',
            color: inWish ? '#dc2626' : '#8a7a60',
            transition: 'all 0.2s',
            zIndex: 4,
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          }}
          title={inWish ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          {inWish ? '♥' : '♡'}
        </button>

        <span className="product-emoji">{product.emoji}</span>

        {/* Quick View overlay */}
        <div className="product-hover-overlay">
          <button className="quick-view-btn" onClick={() => setQuickView(product)}>
            QUICK VIEW
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="product-info">
        <span className="product-cat">{product.category}</span>
        <h3 className="product-name">{product.name}</h3>
        <p className="product-desc">{product.description}</p>

        <div className="product-notes">
          {product.notes.map(n => <span key={n} className="note-pill">{n}</span>)}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: '0.4rem 0' }}>
          <span style={{ color: '#d4af37', fontSize: '0.82rem', letterSpacing: '2px' }}>{'★'.repeat(Math.floor(product.rating))}</span>
          <span style={{ fontSize: '0.75rem', color: '#8a7a60', fontWeight: 600 }}>{product.rating}</span>
        </div>

        <div className="product-bottom">
          <span className="product-price">${product.price}</span>
          <motion.button
            className="add-cart-btn"
            onClick={() => addToCart(product)}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.95 }}
            style={{ cursor: 'pointer' }}
          >
            ADD TO CART
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

export default function CollectionSection() {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section className="collection-section" id="collection" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
        style={{ marginBottom: '4rem', textAlign: 'center' }}
      >
        <span className="section-eyebrow">Our Finest Selection</span>
        <h2 className="section-heading">
          FEATURED<br /><span>COLLECTION</span>
        </h2>
        <div className="section-rule" />
        <p style={{ color: '#5a4a30', fontSize: '0.92rem', maxWidth: 520, margin: '0 auto', lineHeight: 1.8, fontWeight: 500 }}>
          Each fragrance is a masterwork crafted by our master perfumers from the rarest ingredients on earth. Click any product to explore it, or add directly to your cart.
        </p>
      </motion.div>

      {inView && (
        <div className="product-grid">
          {products.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      )}
    </section>
  )
}
