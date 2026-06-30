'use client'

import { useState, FormEvent, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useStore } from '@/lib/store'
import { useScrollLock } from '@/hooks/useScrollLock'

type Tab = 'login' | 'register' | 'forgot'

export default function AccountModal() {
  const {
    accountOpen, setAccountOpen, user, isAdmin,
    login, signup, logout,
    setWishOpen, setCartOpen, setAdminOpen,
  } = useStore()

  const [tab, setTab]       = useState<Tab>('login')
  const [error, setError]   = useState('')
  const [notice, setNotice] = useState('')
  const [busy, setBusy]     = useState(false)

  /* form fields */
  const [lEmail, setLEmail] = useState('')
  const [lPass,  setLPass]  = useState('')
  const [rName,  setRName]  = useState('')
  const [rEmail, setREmail] = useState('')
  const [rPass,  setRPass]  = useState('')
  const [fEmail, setFEmail] = useState('')

  useScrollLock(accountOpen)

  /* Reset transient UI whenever the modal is opened/closed */
  useEffect(() => {
    if (accountOpen) { setError(''); setNotice(''); setTab('login') }
  }, [accountOpen])

  const close = () => setAccountOpen(false)

  const handleLogin = (e: FormEvent) => {
    e.preventDefault(); setError(''); setBusy(true)
    const res = login(lEmail, lPass)
    setBusy(false)
    if (res.ok) { setLEmail(''); setLPass(''); close() }
    else setError(res.error || 'Unable to sign in.')
  }

  const handleRegister = (e: FormEvent) => {
    e.preventDefault(); setError(''); setBusy(true)
    const res = signup(rName, rEmail, rPass)
    setBusy(false)
    if (res.ok) { setRName(''); setREmail(''); setRPass(''); close() }
    else setError(res.error || 'Unable to create account.')
  }

  const handleForgot = (e: FormEvent) => {
    e.preventDefault(); setError('')
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fEmail.trim())) { setError('Enter a valid email address.'); return }
    /* No mail backend in this demo — confirm the request the way WooCommerce does. */
    setNotice(`If an account exists for ${fEmail.trim()}, a password reset link has been sent.`)
    setFEmail('')
  }

  /* ── shared styles (match CheckoutModal) ── */
  const iLabel: React.CSSProperties = { display: 'block', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '1.5px', color: '#5a4a30', textTransform: 'uppercase', marginBottom: '0.4rem' }
  const iInput: React.CSSProperties = { width: '100%', border: '1.5px solid #d8ccb4', borderRadius: '6px', padding: '0.75rem 1rem', fontSize: '0.9rem', fontFamily: 'var(--font-body)', fontWeight: 500, color: '#1a1208', background: '#fff', outline: 'none', transition: 'border-color 0.2s' }
  const focus = (e: React.FocusEvent<HTMLInputElement>) => { e.target.style.borderColor = '#b8920e' }
  const blur  = (e: React.FocusEvent<HTMLInputElement>) => { e.target.style.borderColor = '#d8ccb4' }
  const btn: React.CSSProperties = { width: '100%', background: 'linear-gradient(135deg, #b8920e, #d4af37)', color: '#fff', border: 'none', padding: '1rem', borderRadius: '8px', fontWeight: 700, fontSize: '0.82rem', letterSpacing: '2.5px', cursor: 'pointer', textTransform: 'uppercase' }

  const tabBtn = (t: Tab, label: string): React.CSSProperties => ({
    flex: 1, padding: '0.9rem', background: 'none', border: 'none', cursor: 'pointer',
    fontFamily: 'var(--font-head)', fontSize: '0.95rem', fontWeight: 700, letterSpacing: '2px',
    color: tab === t ? '#1a1208' : '#a89a7e',
    borderBottom: `2px solid ${tab === t ? '#b8920e' : 'transparent'}`,
    transition: 'color 0.2s, border-color 0.2s',
  })

  return (
    <AnimatePresence>
      {accountOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={close}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 9300, backdropFilter: 'blur(4px)' }}
          />
          <div style={{ position: 'fixed', inset: 0, zIndex: 9301, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', pointerEvents: 'none' }}>
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              style={{ width: '100%', maxWidth: 440, maxHeight: '90vh', overflowY: 'auto', background: '#faf7f2', borderRadius: '16px', boxShadow: '0 40px 100px rgba(0,0,0,0.35)', pointerEvents: 'auto' }}
            >
              {/* Header */}
              <div style={{ background: 'linear-gradient(135deg, #1a1208, #2a1f0e)', padding: '1.6rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <span style={{ fontFamily: 'var(--font-head)', fontSize: '1.5rem', fontWeight: 700, color: '#d4af37', letterSpacing: '4px' }}>AL HOORAIN</span>
                  <p style={{ fontSize: '0.6rem', letterSpacing: '4px', color: 'rgba(212,175,55,0.55)', textTransform: 'uppercase', marginTop: '2px' }}>
                    {user ? 'MY ACCOUNT' : 'ACCOUNT ACCESS'}
                  </p>
                </div>
                <button onClick={close} aria-label="Close" style={{ background: 'rgba(255,255,255,0.1)', border: 'none', width: 36, height: 36, borderRadius: '50%', cursor: 'pointer', color: '#fff', fontSize: '1.2rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>×</button>
              </div>

              {/* ───────── Signed-in dashboard ───────── */}
              {user ? (
                <div style={{ padding: '2rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.6rem' }}>
                    <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'linear-gradient(135deg, #b8920e, #d4af37)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-head)', fontSize: '1.5rem', fontWeight: 700, flexShrink: 0 }}>
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <p style={{ fontFamily: 'var(--font-head)', fontSize: '1.3rem', fontWeight: 700, color: '#1a1208', letterSpacing: '1px' }}>{user.name}</p>
                      <p style={{ fontSize: '0.8rem', color: '#8a7a60', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.email}</p>
                    </div>
                  </div>

                  {isAdmin && (
                    <button onClick={() => { close(); setAdminOpen(true) }} style={{ width: '100%', marginBottom: '1.2rem', background: 'linear-gradient(135deg, #1a1208, #2a1f0e)', color: '#d4af37', border: '1px solid #d4af37', padding: '0.95rem', borderRadius: '10px', cursor: 'pointer', fontWeight: 700, fontSize: '0.8rem', letterSpacing: '1.5px', textTransform: 'uppercase', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                      ⚙ Open Admin Dashboard
                    </button>
                  )}

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem', marginBottom: '1.6rem' }}>
                    <button onClick={() => { close(); setCartOpen(true) }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.95rem 1.1rem', background: '#fff', border: '1px solid #e8dfd0', borderRadius: '10px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600, color: '#1a1208' }}>
                      <span>🛍️ My Bag</span><span style={{ color: '#b8920e' }}>→</span>
                    </button>
                    <button onClick={() => { close(); setWishOpen(true) }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.95rem 1.1rem', background: '#fff', border: '1px solid #e8dfd0', borderRadius: '10px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600, color: '#1a1208' }}>
                      <span>♡ My Wishlist</span><span style={{ color: '#b8920e' }}>→</span>
                    </button>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.95rem 1.1rem', background: '#fff', border: '1px solid #e8dfd0', borderRadius: '10px', fontSize: '0.85rem', fontWeight: 600, color: '#8a7a60' }}>
                      <span>📦 Orders</span><span style={{ fontSize: '0.7rem' }}>No orders yet</span>
                    </div>
                  </div>

                  <button onClick={() => { logout() }} style={{ ...btn, background: '#fff', color: '#5a4a30', border: '1.5px solid #d8ccb4' }}>
                    SIGN OUT
                  </button>
                </div>
              ) : (
                /* ───────── Auth forms ───────── */
                <div>
                  {/* Tabs (hidden on the forgot-password view) */}
                  {tab !== 'forgot' && (
                    <div style={{ display: 'flex', borderBottom: '1px solid #e8dfd0', background: '#fff' }}>
                      <button onClick={() => { setTab('login'); setError('') }} style={tabBtn('login', 'Sign In')}>SIGN IN</button>
                      <button onClick={() => { setTab('register'); setError('') }} style={tabBtn('register', 'Register')}>REGISTER</button>
                    </div>
                  )}

                  <div style={{ padding: '2rem' }}>
                    {error && (
                      <div style={{ background: '#fdecea', border: '1px solid #f5c6c2', color: '#a3261b', borderRadius: '8px', padding: '0.7rem 0.9rem', fontSize: '0.78rem', fontWeight: 600, marginBottom: '1.2rem' }}>
                        {error}
                      </div>
                    )}
                    {notice && (
                      <div style={{ background: '#eef7ee', border: '1px solid #c6e2c6', color: '#1f7a36', borderRadius: '8px', padding: '0.7rem 0.9rem', fontSize: '0.78rem', fontWeight: 600, marginBottom: '1.2rem' }}>
                        {notice}
                      </div>
                    )}

                    {/* LOGIN */}
                    {tab === 'login' && (
                      <form onSubmit={handleLogin}>
                        <div style={{ marginBottom: '1rem' }}>
                          <label style={iLabel}>Email Address</label>
                          <input required type="email" style={iInput} value={lEmail} onChange={e => setLEmail(e.target.value)} placeholder="you@example.com" onFocus={focus} onBlur={blur} />
                        </div>
                        <div style={{ marginBottom: '0.6rem' }}>
                          <label style={iLabel}>Password</label>
                          <input required type="password" style={iInput} value={lPass} onChange={e => setLPass(e.target.value)} placeholder="••••••••" onFocus={focus} onBlur={blur} />
                        </div>
                        <div style={{ textAlign: 'right', marginBottom: '1.4rem' }}>
                          <button type="button" onClick={() => { setTab('forgot'); setError(''); setNotice('') }} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.74rem', fontWeight: 600, color: '#b8920e', letterSpacing: '0.5px' }}>
                            Lost your password?
                          </button>
                        </div>
                        <button type="submit" disabled={busy} style={{ ...btn, opacity: busy ? 0.7 : 1, cursor: busy ? 'wait' : 'pointer' }}>
                          {busy ? 'SIGNING IN…' : 'SIGN IN'}
                        </button>
                        <p style={{ textAlign: 'center', fontSize: '0.78rem', color: '#8a7a60', marginTop: '1.2rem' }}>
                          New here?{' '}
                          <button type="button" onClick={() => { setTab('register'); setError('') }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#b8920e', fontWeight: 700 }}>Create an account</button>
                        </p>
                      </form>
                    )}

                    {/* REGISTER */}
                    {tab === 'register' && (
                      <form onSubmit={handleRegister}>
                        <div style={{ marginBottom: '1rem' }}>
                          <label style={iLabel}>Full Name</label>
                          <input required style={iInput} value={rName} onChange={e => setRName(e.target.value)} placeholder="Your full name" onFocus={focus} onBlur={blur} />
                        </div>
                        <div style={{ marginBottom: '1rem' }}>
                          <label style={iLabel}>Email Address</label>
                          <input required type="email" style={iInput} value={rEmail} onChange={e => setREmail(e.target.value)} placeholder="you@example.com" onFocus={focus} onBlur={blur} />
                        </div>
                        <div style={{ marginBottom: '1.4rem' }}>
                          <label style={iLabel}>Password</label>
                          <input required type="password" style={iInput} value={rPass} onChange={e => setRPass(e.target.value)} placeholder="At least 6 characters" onFocus={focus} onBlur={blur} />
                        </div>
                        <button type="submit" disabled={busy} style={{ ...btn, opacity: busy ? 0.7 : 1, cursor: busy ? 'wait' : 'pointer' }}>
                          {busy ? 'CREATING…' : 'CREATE ACCOUNT'}
                        </button>
                        <p style={{ textAlign: 'center', fontSize: '0.7rem', color: '#a89a7e', marginTop: '1rem', lineHeight: 1.5 }}>
                          By registering you agree to our Terms & Privacy Policy.
                        </p>
                      </form>
                    )}

                    {/* FORGOT PASSWORD */}
                    {tab === 'forgot' && (
                      <form onSubmit={handleForgot}>
                        <h3 style={{ fontFamily: 'var(--font-head)', fontSize: '1.3rem', fontWeight: 700, color: '#1a1208', letterSpacing: '1px', marginBottom: '0.5rem' }}>Reset Password</h3>
                        <p style={{ fontSize: '0.8rem', color: '#8a7a60', marginBottom: '1.4rem', lineHeight: 1.6 }}>
                          Enter your email and we&apos;ll send you a link to reset your password.
                        </p>
                        <div style={{ marginBottom: '1.4rem' }}>
                          <label style={iLabel}>Email Address</label>
                          <input required type="email" style={iInput} value={fEmail} onChange={e => setFEmail(e.target.value)} placeholder="you@example.com" onFocus={focus} onBlur={blur} />
                        </div>
                        <button type="submit" style={btn}>SEND RESET LINK</button>
                        <p style={{ textAlign: 'center', fontSize: '0.78rem', color: '#8a7a60', marginTop: '1.2rem' }}>
                          <button type="button" onClick={() => { setTab('login'); setError(''); setNotice('') }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#b8920e', fontWeight: 700 }}>← Back to sign in</button>
                        </p>
                      </form>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
