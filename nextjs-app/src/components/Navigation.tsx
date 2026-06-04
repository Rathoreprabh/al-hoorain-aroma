'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useStore } from '@/lib/store'

const NAV_LINKS = [
  { label: 'Home',        href: '#' },
  { label: 'Collection',  href: '#collection' },
  { label: 'Story',       href: '#story' },
  { label: 'Ingredients', href: '#ingredients' },
]

export default function Navigation() {
  const [scrolled,     setScrolled]     = useState(false)
  const [menuOpen,     setMenuOpen]     = useState(false)
  const { cartCount, wishlistCount, setCartOpen, setWishOpen, setSearchOpen } = useStore()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* Lock body scroll when mobile menu is open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      {/* ── Ticker band ─────────────────────────────────── */}
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
          ].map((t, i) => <span key={i} className="ticker-item">{t}</span>)}
        </div>
      </div>

      {/* ── Main nav ────────────────────────────────────── */}
      <motion.nav
        className={`luxury-nav${scrolled ? ' scrolled' : ''}`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
      >
        <div className="nav-inner">

          {/* Logo */}
          <a href="#" className="nav-logo" style={{ flexDirection: 'row', alignItems: 'center', gap: '0.6rem' }} onClick={closeMenu}>
            <Image
              src="/logo.png"
              alt="Al Hoorain Aroma logo"
              width={44}
              height={44}
              style={{ borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }}
              priority
            />
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
              <span className="nav-logo-main">AL HOORAIN</span>
              <span className="nav-logo-sub">AROMA</span>
            </div>
          </a>

          {/* Desktop links */}
          <ul className="nav-links nav-links-desktop">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={label}><a href={href}>{label}</a></li>
            ))}
          </ul>

          {/* Right actions */}
          <div className="nav-actions">
            {/* Search */}
            <button className="nav-icon-btn" title="Search" onClick={() => { setSearchOpen(true); closeMenu() }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            </button>

            {/* Wishlist */}
            <button className="nav-icon-btn" title="Wishlist" onClick={() => { setWishOpen(true); closeMenu() }} style={{ position: 'relative' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill={wishlistCount > 0 ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
              {wishlistCount > 0 && <span className="nav-badge">{wishlistCount}</span>}
            </button>

            {/* Cart */}
            <button className="nav-icon-btn" title="Cart" onClick={() => { setCartOpen(true); closeMenu() }} style={{ position: 'relative' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
              {cartCount > 0 && <span className="nav-badge">{cartCount}</span>}
            </button>

            {/* Hamburger — mobile only */}
            <button
              className="nav-icon-btn hamburger-btn"
              onClick={() => setMenuOpen(o => !o)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              style={{ flexDirection: 'column', gap: '5px', width: 44, height: 44 }}
            >
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.25 }}
                style={{ display: 'block', width: 20, height: 2, background: 'currentColor', borderRadius: 2, transformOrigin: 'center' }}
              />
              <motion.span
                animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.2 }}
                style={{ display: 'block', width: 20, height: 2, background: 'currentColor', borderRadius: 2 }}
              />
              <motion.span
                animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.25 }}
                style={{ display: 'block', width: 20, height: 2, background: 'currentColor', borderRadius: 2, transformOrigin: 'center' }}
              />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* ── Mobile menu overlay ──────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={closeMenu}
              style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', zIndex: 790, backdropFilter: 'blur(3px)' }}
            />

            {/* Slide-down panel */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 320, damping: 32 }}
              style={{
                position: 'fixed',
                top: 104,   /* ticker + nav */
                left: 0, right: 0,
                background: 'rgba(250,247,242,0.98)',
                backdropFilter: 'blur(20px)',
                zIndex: 795,
                borderBottom: '1px solid #d8ccb4',
                boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
                padding: '1.5rem 2rem 2rem',
              }}
            >
              {/* Nav links */}
              <nav>
                {NAV_LINKS.map(({ label, href }, i) => (
                  <motion.a
                    key={label}
                    href={href}
                    onClick={closeMenu}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07, duration: 0.3 }}
                    style={{
                      display: 'block',
                      padding: '1rem 0',
                      borderBottom: '1px solid #e8dfd0',
                      fontFamily: 'var(--font-head)',
                      fontSize: '1.5rem',
                      fontWeight: 700,
                      color: '#1a1208',
                      textDecoration: 'none',
                      letterSpacing: '2px',
                    }}
                  >
                    {label}
                  </motion.a>
                ))}
              </nav>

              {/* Quick actions */}
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                <button
                  onClick={() => { setCartOpen(true); closeMenu() }}
                  style={{ flex: 1, background: 'linear-gradient(135deg, #b8920e, #d4af37)', color: '#fff', border: 'none', padding: '0.9rem', borderRadius: '8px', fontWeight: 700, fontSize: '0.75rem', letterSpacing: '2px', cursor: 'pointer', textTransform: 'uppercase', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                  CART {cartCount > 0 && `(${cartCount})`}
                </button>
                <button
                  onClick={() => { setWishOpen(true); closeMenu() }}
                  style={{ flex: 1, background: '#fff', border: '1px solid #d8ccb4', color: '#1a1208', padding: '0.9rem', borderRadius: '8px', fontWeight: 700, fontSize: '0.75rem', letterSpacing: '2px', cursor: 'pointer', textTransform: 'uppercase', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill={wishlistCount > 0 ? '#b8920e' : 'none'} stroke={wishlistCount > 0 ? '#b8920e' : 'currentColor'} strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                  SAVED {wishlistCount > 0 && `(${wishlistCount})`}
                </button>
              </div>

              <p style={{ fontSize: '0.62rem', color: '#8a7a60', textAlign: 'center', marginTop: '1.2rem', letterSpacing: '1px' }}>
                ✦ FREE SHIPPING ON ORDERS OVER $300 ✦
              </p>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
