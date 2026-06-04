'use client'

import { useState, useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useStore } from '@/lib/store'
import { products } from '@/lib/products'
import { useScrollLock } from '@/hooks/useScrollLock'

export default function SearchModal() {
  const { searchOpen, setSearchOpen, addToCart, setQuickView } = useStore()
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  useScrollLock(searchOpen)

  const results = query.trim().length > 0
    ? products.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase()) ||
        p.notes.some(n => n.toLowerCase().includes(query.toLowerCase())) ||
        p.description.toLowerCase().includes(query.toLowerCase())
      )
    : products

  useEffect(() => {
    if (searchOpen) { setQuery(''); setTimeout(() => inputRef.current?.focus(), 80) }
  }, [searchOpen])

  useEffect(() => {
    const esc = (e: KeyboardEvent) => { if (e.key === 'Escape') setSearchOpen(false) }
    window.addEventListener('keydown', esc)
    return () => window.removeEventListener('keydown', esc)
  }, [setSearchOpen])

  return (
    <AnimatePresence>
      {searchOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          style={{ position: 'fixed', inset: 0, background: 'rgba(250,247,242,0.97)', backdropFilter: 'blur(12px)', zIndex: 9500, display: 'flex', flexDirection: 'column', padding: '3rem 2rem 2rem' }}
        >
          {/* Close */}
          <button
            onClick={() => setSearchOpen(false)}
            style={{ position: 'absolute', top: '1.2rem', right: '1.5rem', background: '#f2ece0', border: 'none', width: 44, height: 44, borderRadius: '50%', fontSize: '1.4rem', cursor: 'pointer', fontWeight: 700, color: '#1a1208', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >×</button>

          {/* Search input */}
          <div style={{ maxWidth: 680, margin: '0 auto', width: '100%' }}>
            <p style={{ fontSize: '0.6rem', letterSpacing: '5px', color: '#b8920e', textTransform: 'uppercase', fontWeight: 600, marginBottom: '1rem', textAlign: 'center' }}>SEARCH FRAGRANCES</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', borderBottom: '2px solid #d8ccb4', paddingBottom: '1rem', marginBottom: '2rem' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#b8920e" strokeWidth="2" style={{ flexShrink: 0 }}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search by name, notes, or category..."
                style={{ flex: 1, border: 'none', background: 'transparent', fontSize: '1.4rem', fontFamily: 'var(--font-head)', fontWeight: 600, color: '#1a1208', outline: 'none', letterSpacing: '1px' }}
              />
              {query && (
                <button onClick={() => setQuery('')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem', color: '#8a7a60' }}>×</button>
              )}
            </div>

            <p style={{ fontSize: '0.68rem', color: '#8a7a60', marginBottom: '1.5rem', fontWeight: 500 }}>
              {query ? `${results.length} result${results.length !== 1 ? 's' : ''} for "${query}"` : `All ${results.length} fragrances`}
            </p>

            {/* Results */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', maxHeight: '60vh', overflowY: 'auto' }}>
              {results.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '3rem' }}>
                  <p style={{ fontFamily: 'var(--font-head)', fontSize: '1.5rem', color: '#1a1208', fontWeight: 700, marginBottom: '0.5rem' }}>No results found</p>
                  <p style={{ fontSize: '0.82rem', color: '#8a7a60' }}>Try searching by fragrance name, note, or category.</p>
                </div>
              ) : (
                results.map(p => (
                  <motion.div
                    key={p.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', padding: '0.9rem 1rem', background: '#fff', borderRadius: '10px', border: '1px solid #e8dfd0', cursor: 'pointer', transition: 'all 0.2s' }}
                    onMouseOver={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(184,146,14,0.4)'; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)' }}
                    onMouseOut={e  => { (e.currentTarget as HTMLDivElement).style.borderColor = '#e8dfd0';               (e.currentTarget as HTMLDivElement).style.boxShadow = 'none' }}
                    onClick={() => { setSearchOpen(false); setQuickView(p) }}
                  >
                    <div style={{ width: 56, height: 56, background: 'radial-gradient(ellipse at 50% 60%, rgba(184,146,14,0.14), #f2ece0)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', flexShrink: 0 }}>{p.emoji}</div>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: '0.62rem', letterSpacing: '2px', color: '#b8920e', textTransform: 'uppercase', fontWeight: 600, marginBottom: '2px' }}>{p.category}</p>
                      <p style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '1.05rem', color: '#1a1208', letterSpacing: '1px' }}>{p.name}</p>
                      <p style={{ fontSize: '0.75rem', color: '#8a7a60', marginTop: '2px' }}>{p.notes.join(' · ')}</p>
                    </div>
                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                      <p style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '1.2rem', color: '#b8920e' }}>${p.price}</p>
                      <button
                        onClick={e => { e.stopPropagation(); addToCart(p); }}
                        style={{ marginTop: '0.3rem', background: 'linear-gradient(135deg, #b8920e, #d4af37)', color: '#fff', border: 'none', padding: '0.4rem 0.9rem', borderRadius: '4px', fontWeight: 700, fontSize: '0.6rem', letterSpacing: '1.5px', cursor: 'pointer', textTransform: 'uppercase' }}
                      >ADD</button>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
