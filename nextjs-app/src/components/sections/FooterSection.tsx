'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

export default function FooterSection() {
  const [showTop, setShowTop] = useState(false)
  const scrollRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <footer className="site-footer">
        <div className="footer-inner">
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.8rem' }}>
              <Image src="/logo.png" alt="Al Hoorain Aroma" width={52} height={52} style={{ borderRadius: '50%' }} />
              <div>
                <span className="footer-brand-name" style={{ marginBottom: 0 }}>AL HOORAIN</span>
                <span className="footer-brand-tag" style={{ marginBottom: 0 }}>AROMA</span>
              </div>
            </div>
            <p className="footer-brand-desc">
              Premium luxury fragrances crafted for the discerning individual who believes that scent is the most intimate form of self-expression.
            </p>
            <div className="social-row">
              {[
                { label: 'Instagram', icon: '📷' },
                { label: 'Facebook',  icon: '📘' },
                { label: 'Twitter',   icon: '𝕏' },
                { label: 'Pinterest', icon: '📌' },
              ].map(({ label, icon }) => (
                <a key={label} href="#" className="social-btn" title={label} aria-label={label}>
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="footer-col-title">Shop</h4>
            <ul className="footer-links">
              {['All Fragrances', 'New Arrivals', 'Best Sellers', 'Collections', 'Gift Sets'].map((t) => (
                <li key={t}><a href="#">{t}</a></li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="footer-col-title">Company</h4>
            <ul className="footer-links">
              {['Our Story', 'Sustainability', 'Press', 'Careers', 'Stockists'].map((t) => (
                <li key={t}><a href="#">{t}</a></li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="footer-col-title">Support</h4>
            <ul className="footer-links">
              {['Contact Us', 'FAQ', 'Shipping Info', 'Returns', 'Track Order'].map((t) => (
                <li key={t}><a href="#">{t}</a></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2024 Al Hoorain Aroma. All rights reserved.</span>
          <span>Privacy Policy · Terms of Service</span>
        </div>
      </footer>

      {/* Back to top */}
      <motion.button
        ref={scrollRef}
        className="back-top"
        style={{ opacity: showTop ? 1 : 0, pointerEvents: showTop ? 'auto' : 'none' }}
        animate={{ opacity: showTop ? 1 : 0, y: showTop ? 0 : 20 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
      >
        ↑
      </motion.button>
    </>
  )
}
