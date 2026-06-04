'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useStore } from '@/lib/store'

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const { cartCount, wishlistCount, setCartOpen, setWishOpen, setSearchOpen } = useStore()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      {/* Ticker band */}
      <div className="ticker-wrap" aria-hidden="true">
        <div className="ticker-track">
          {[
            '✦ FREE SHIPPING OVER $300',
            '✦ AUTHENTIC LUXURY FRAGRANCES',
            '✦ COMPLIMENTARY GIFT PACKAGING',
            '✦ NEW ARRIVALS WEEKLY',
            '✦ WORLDWIDE DELIVERY',
            '✦ MASTER PERFUMERS SINCE 2014',
            '✦ FREE SHIPPING OVER $300',
            '✦ AUTHENTIC LUXURY FRAGRANCES',
            '✦ COMPLIMENTARY GIFT PACKAGING',
            '✦ NEW ARRIVALS WEEKLY',
            '✦ WORLDWIDE DELIVERY',
            '✦ MASTER PERFUMERS SINCE 2014',
          ].map((t, i) => (
            <span key={i} className="ticker-item">{t}</span>
          ))}
        </div>
      </div>

      {/* Main nav */}
      <motion.nav
        className={`luxury-nav${scrolled ? ' scrolled' : ''}`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
      >
        <div className="nav-inner">
          <a href="#" className="nav-logo" style={{ flexDirection: 'row', alignItems: 'center', gap: '0.7rem' }}>
            <Image
              src="/logo.png"
              alt="Al Hoorain Aroma logo"
              width={48}
              height={48}
              style={{ borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }}
              priority
            />
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
              <span className="nav-logo-main">AL HOORAIN</span>
              <span className="nav-logo-sub">AROMA</span>
            </div>
          </a>

          <ul className="nav-links">
            {[
              { label: 'Home',        href: '#' },
              { label: 'Collection',  href: '#collection' },
              { label: 'Story',       href: '#story' },
              { label: 'Ingredients', href: '#ingredients' },
            ].map(({ label, href }) => (
              <li key={label}><a href={href}>{label}</a></li>
            ))}
          </ul>

          <div className="nav-actions">
            {/* Search */}
            <button
              className="nav-icon-btn"
              title="Search fragrances"
              onClick={() => setSearchOpen(true)}
              style={{ cursor: 'pointer' }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            </button>

            {/* Wishlist */}
            <button
              className="nav-icon-btn"
              title="Wishlist"
              onClick={() => setWishOpen(true)}
              style={{ cursor: 'pointer', position: 'relative' }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill={wishlistCount > 0 ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
              {wishlistCount > 0 && (
                <span className="nav-badge">{wishlistCount}</span>
              )}
            </button>

            {/* Cart */}
            <button
              className="nav-icon-btn"
              title="Shopping cart"
              onClick={() => setCartOpen(true)}
              style={{ cursor: 'pointer', position: 'relative' }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
              {cartCount > 0 && (
                <span className="nav-badge">{cartCount}</span>
              )}
            </button>
          </div>
        </div>
      </motion.nav>
    </>
  )
}
