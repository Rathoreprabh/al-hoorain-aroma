'use client'

import { useState, FormEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useStore } from '@/lib/store'
import { useScrollLock } from '@/hooks/useScrollLock'

type Step = 'info' | 'shipping' | 'payment' | 'confirmed'

const SHIPPING = [
  { id: 'standard', name: 'Standard Delivery', desc: '5–7 business days', price: 0 },
  { id: 'express',  name: 'Express Delivery',  desc: '2–3 business days', price: 25 },
  { id: 'overnight',name: 'Overnight Delivery',desc: 'Next business day',  price: 50 },
]

const STEPS: { key: Step; label: string }[] = [
  { key: 'info',      label: 'Information' },
  { key: 'shipping',  label: 'Shipping' },
  { key: 'payment',   label: 'Payment' },
  { key: 'confirmed', label: 'Confirmed' },
]

interface InfoForm { name: string; email: string; phone: string; address: string; city: string; country: string; zip: string }
interface CardForm { number: string; holder: string; expiry: string; cvv: string }

export default function CheckoutModal() {
  const { checkoutOpen, setCheckoutOpen, cart, cartTotal, clearCart, addToast } = useStore()
  const [step, setStep]         = useState<Step>('info')
  const [shipping, setShipping] = useState('standard')
  const [orderNo, setOrderNo]   = useState('')
  const [sending, setSending]   = useState(false)
  const [info, setInfo] = useState<InfoForm>({ name: '', email: '', phone: '', address: '', city: '', country: '', zip: '' })
  const [card, setCard] = useState<CardForm>({ number: '', holder: '', expiry: '', cvv: '' })

  useScrollLock(checkoutOpen)

  const shippingCost = SHIPPING.find(s => s.id === shipping)?.price ?? 0
  const total = cartTotal + shippingCost

  const fmtCard   = (v: string) => v.replace(/\D/g,'').slice(0,16).replace(/(.{4})/g,'$1 ').trim()
  const fmtExpiry = (v: string) => { const d = v.replace(/\D/g,'').slice(0,4); return d.length > 2 ? `${d.slice(0,2)}/${d.slice(2)}` : d }

  const stepIdx = STEPS.findIndex(s => s.key === step)

  const handleInfoSubmit = (e: FormEvent) => { e.preventDefault(); setStep('shipping') }

  const handlePaySubmit = async (e: FormEvent) => {
    e.preventDefault()
    setSending(true)

    const no = 'AH' + Math.random().toString(36).slice(2,8).toUpperCase()
    setOrderNo(no)

    /* ── Send confirmation email via EmailJS ── */
    try {
      const emailjs = (await import('@emailjs/browser')).default
      const itemsList = cart.map(i => `${i.name} × ${i.quantity} — $${i.price * i.quantity}`).join('\n')
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID  || 'YOUR_SERVICE_ID',
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID',
        {
          to_name:     info.name,
          to_email:    info.email,
          order_number:no,
          items_list:  itemsList,
          subtotal:    `$${cartTotal}`,
          shipping_method: SHIPPING.find(s => s.id === shipping)?.name ?? 'Standard',
          shipping_cost:   shippingCost === 0 ? 'FREE' : `$${shippingCost}`,
          grand_total: `$${total}`,
          address:     `${info.address}, ${info.city}, ${info.country} ${info.zip}`,
          reply_to:    'orders@alhoorain.com',
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY  || 'YOUR_PUBLIC_KEY',
      )
      addToast('✉️ Confirmation email sent!')
    } catch {
      /* Email failed silently — order still confirmed */
    }

    setStep('confirmed')
    clearCart()
    setSending(false)
    addToast('✓ Order placed successfully!')
  }

  const handleClose = () => {
    setCheckoutOpen(false)
    setTimeout(() => { setStep('info'); setInfo({ name:'',email:'',phone:'',address:'',city:'',country:'',zip:'' }); setCard({ number:'',holder:'',expiry:'',cvv:'' }) }, 400)
  }

  const iLabel: React.CSSProperties = { display: 'block', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '1.5px', color: '#5a4a30', textTransform: 'uppercase', marginBottom: '0.4rem' }
  const iInput: React.CSSProperties = { width: '100%', border: '1.5px solid #d8ccb4', borderRadius: '6px', padding: '0.75rem 1rem', fontSize: '0.9rem', fontFamily: 'var(--font-body)', fontWeight: 500, color: '#1a1208', background: '#fff', outline: 'none', transition: 'border-color 0.2s' }

  return (
    <AnimatePresence>
      {checkoutOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={step !== 'confirmed' ? handleClose : undefined}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 9300, backdropFilter: 'blur(4px)' }}
          />
          {/* Centering wrapper — separate from animated div so framer y doesn't fight CSS transform */}
          <div style={{ position: 'fixed', inset: 0, zIndex: 9301, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', pointerEvents: 'none' }}>
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            style={{ width: '100%', maxWidth: 840, maxHeight: '90vh', overflowY: 'auto', background: '#faf7f2', borderRadius: '16px', boxShadow: '0 40px 100px rgba(0,0,0,0.35)', pointerEvents: 'auto' }}
          >
            {/* Header */}
            <div style={{ background: 'linear-gradient(135deg, #1a1208, #2a1f0e)', padding: '1.6rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <span style={{ fontFamily: 'var(--font-head)', fontSize: '1.5rem', fontWeight: 700, color: '#d4af37', letterSpacing: '4px' }}>AL HOORAIN</span>
                <p style={{ fontSize: '0.6rem', letterSpacing: '4px', color: 'rgba(212,175,55,0.55)', textTransform: 'uppercase', marginTop: '2px' }}>SECURE CHECKOUT</p>
              </div>
              {step !== 'confirmed' && (
                <button onClick={handleClose} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', width: 36, height: 36, borderRadius: '50%', cursor: 'pointer', color: '#fff', fontSize: '1.2rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>×</button>
              )}
            </div>

            {/* Progress steps */}
            {step !== 'confirmed' && (
              <div style={{ display: 'flex', padding: '1.2rem 2rem', background: '#fff', borderBottom: '1px solid #e8dfd0', gap: '0' }}>
                {STEPS.filter(s => s.key !== 'confirmed').map((s, i) => (
                  <div key={s.key} style={{ display: 'flex', alignItems: 'center', flex: i < 2 ? 1 : 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <div style={{
                        width: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontWeight: 700, fontSize: '0.78rem',
                        background: stepIdx > i ? 'linear-gradient(135deg, #b8920e, #d4af37)' : stepIdx === i ? 'linear-gradient(135deg, #b8920e, #d4af37)' : '#e8dfd0',
                        color: stepIdx >= i ? '#fff' : '#8a7a60',
                      }}>
                        {stepIdx > i ? '✓' : i + 1}
                      </div>
                      <span style={{ fontSize: '0.72rem', fontWeight: 700, color: stepIdx >= i ? '#1a1208' : '#8a7a60', letterSpacing: '0.5px' }}>{s.label}</span>
                    </div>
                    {i < 2 && <div style={{ flex: 1, height: 1, background: stepIdx > i ? '#d4af37' : '#e8dfd0', margin: '0 0.8rem' }} />}
                  </div>
                ))}
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: step === 'confirmed' ? '1fr' : '1fr 300px', minHeight: 400 }}>
              {/* Main form area */}
              <div style={{ padding: '2rem' }}>

                {/* ── STEP: INFO ── */}
                {step === 'info' && (
                  <form onSubmit={handleInfoSubmit}>
                    <h3 style={{ fontFamily: 'var(--font-head)', fontSize: '1.6rem', fontWeight: 700, color: '#1a1208', letterSpacing: '2px', marginBottom: '1.5rem' }}>Shipping Information</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                      <div>
                        <label style={iLabel}>Full Name *</label>
                        <input required style={iInput} value={info.name} onChange={e => setInfo(p => ({...p, name: e.target.value}))} placeholder="Your full name"
                          onFocus={e => e.target.style.borderColor='#b8920e'} onBlur={e => e.target.style.borderColor='#d8ccb4'} />
                      </div>
                      <div>
                        <label style={iLabel}>Email Address *</label>
                        <input required type="email" style={iInput} value={info.email} onChange={e => setInfo(p => ({...p, email: e.target.value}))} placeholder="you@example.com"
                          onFocus={e => e.target.style.borderColor='#b8920e'} onBlur={e => e.target.style.borderColor='#d8ccb4'} />
                      </div>
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                      <label style={iLabel}>Phone Number</label>
                      <input style={iInput} value={info.phone} onChange={e => setInfo(p => ({...p, phone: e.target.value}))} placeholder="+1 234 567 8900"
                        onFocus={e => e.target.style.borderColor='#b8920e'} onBlur={e => e.target.style.borderColor='#d8ccb4'} />
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                      <label style={iLabel}>Street Address *</label>
                      <input required style={iInput} value={info.address} onChange={e => setInfo(p => ({...p, address: e.target.value}))} placeholder="123 Main Street, Apt 4B"
                        onFocus={e => e.target.style.borderColor='#b8920e'} onBlur={e => e.target.style.borderColor='#d8ccb4'} />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1.8rem' }}>
                      <div>
                        <label style={iLabel}>City *</label>
                        <input required style={iInput} value={info.city} onChange={e => setInfo(p => ({...p, city: e.target.value}))} placeholder="Dubai"
                          onFocus={e => e.target.style.borderColor='#b8920e'} onBlur={e => e.target.style.borderColor='#d8ccb4'} />
                      </div>
                      <div>
                        <label style={iLabel}>Country *</label>
                        <input required style={iInput} value={info.country} onChange={e => setInfo(p => ({...p, country: e.target.value}))} placeholder="UAE"
                          onFocus={e => e.target.style.borderColor='#b8920e'} onBlur={e => e.target.style.borderColor='#d8ccb4'} />
                      </div>
                      <div>
                        <label style={iLabel}>Zip / Postal *</label>
                        <input required style={iInput} value={info.zip} onChange={e => setInfo(p => ({...p, zip: e.target.value}))} placeholder="00000"
                          onFocus={e => e.target.style.borderColor='#b8920e'} onBlur={e => e.target.style.borderColor='#d8ccb4'} />
                      </div>
                    </div>
                    <button type="submit" style={{ width: '100%', background: 'linear-gradient(135deg, #b8920e, #d4af37)', color: '#fff', border: 'none', padding: '1rem', borderRadius: '8px', fontWeight: 700, fontSize: '0.82rem', letterSpacing: '2.5px', cursor: 'pointer', textTransform: 'uppercase' }}>
                      CONTINUE TO SHIPPING →
                    </button>
                  </form>
                )}

                {/* ── STEP: SHIPPING ── */}
                {step === 'shipping' && (
                  <div>
                    <h3 style={{ fontFamily: 'var(--font-head)', fontSize: '1.6rem', fontWeight: 700, color: '#1a1208', letterSpacing: '2px', marginBottom: '1.5rem' }}>Shipping Method</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                      {SHIPPING.map(s => (
                        <label key={s.id} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.2rem 1.4rem', background: '#fff', border: `2px solid ${shipping === s.id ? '#b8920e' : '#e8dfd0'}`, borderRadius: '10px', cursor: 'pointer', transition: 'border-color 0.2s' }}>
                          <input type="radio" name="shipping" value={s.id} checked={shipping === s.id} onChange={() => setShipping(s.id)} style={{ accentColor: '#b8920e', width: 18, height: 18 }} />
                          <div style={{ flex: 1 }}>
                            <p style={{ fontWeight: 700, fontSize: '0.9rem', color: '#1a1208', marginBottom: '2px' }}>{s.name}</p>
                            <p style={{ fontSize: '0.78rem', color: '#8a7a60' }}>{s.desc}</p>
                          </div>
                          <span style={{ fontWeight: 700, fontSize: '0.95rem', color: s.price === 0 ? '#16a34a' : '#1a1208' }}>
                            {s.price === 0 ? 'FREE' : `$${s.price}`}
                          </span>
                        </label>
                      ))}
                    </div>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                      <button onClick={() => setStep('info')} style={{ flex: 1, background: '#fff', border: '1.5px solid #d8ccb4', color: '#5a4a30', padding: '1rem', borderRadius: '8px', fontWeight: 700, fontSize: '0.78rem', letterSpacing: '1.5px', cursor: 'pointer' }}>← BACK</button>
                      <button onClick={() => setStep('payment')} style={{ flex: 2, background: 'linear-gradient(135deg, #b8920e, #d4af37)', color: '#fff', border: 'none', padding: '1rem', borderRadius: '8px', fontWeight: 700, fontSize: '0.82rem', letterSpacing: '2.5px', cursor: 'pointer', textTransform: 'uppercase' }}>CONTINUE TO PAYMENT →</button>
                    </div>
                  </div>
                )}

                {/* ── STEP: PAYMENT ── */}
                {step === 'payment' && (
                  <form onSubmit={handlePaySubmit}>
                    <h3 style={{ fontFamily: 'var(--font-head)', fontSize: '1.6rem', fontWeight: 700, color: '#1a1208', letterSpacing: '2px', marginBottom: '0.5rem' }}>Payment Details</h3>
                    <p style={{ fontSize: '0.75rem', color: '#8a7a60', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <span>🔒</span> Your payment information is secure and encrypted
                    </p>

                    {/* Card visual */}
                    <div style={{ background: 'linear-gradient(135deg, #1a1208, #3a2a0e)', borderRadius: '14px', padding: '1.6rem', marginBottom: '1.5rem', color: '#fff', position: 'relative', overflow: 'hidden' }}>
                      <div style={{ position: 'absolute', top: -30, right: -30, width: 120, height: 120, borderRadius: '50%', background: 'rgba(212,175,55,0.12)' }} />
                      <div style={{ position: 'absolute', bottom: -20, left: -20, width: 80, height: 80, borderRadius: '50%', background: 'rgba(212,175,55,0.08)' }} />
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                        <span style={{ fontFamily: 'var(--font-head)', fontSize: '1.1rem', color: '#d4af37', fontWeight: 700, letterSpacing: '3px' }}>AL HOORAIN</span>
                        <span style={{ fontSize: '1.6rem' }}>💳</span>
                      </div>
                      <p style={{ fontFamily: 'monospace', fontSize: '1.1rem', letterSpacing: '4px', marginBottom: '1.2rem', color: 'rgba(255,255,255,0.9)' }}>
                        {card.number || '•••• •••• •••• ••••'}
                      </p>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                          <p style={{ fontSize: '0.55rem', color: 'rgba(255,255,255,0.5)', letterSpacing: '1.5px', marginBottom: '2px' }}>CARD HOLDER</p>
                          <p style={{ fontSize: '0.85rem', fontWeight: 600 }}>{card.holder || 'YOUR NAME'}</p>
                        </div>
                        <div>
                          <p style={{ fontSize: '0.55rem', color: 'rgba(255,255,255,0.5)', letterSpacing: '1.5px', marginBottom: '2px' }}>EXPIRES</p>
                          <p style={{ fontSize: '0.85rem', fontWeight: 600 }}>{card.expiry || 'MM/YY'}</p>
                        </div>
                      </div>
                    </div>

                    <div style={{ marginBottom: '1rem' }}>
                      <label style={iLabel}>Card Number *</label>
                      <input required maxLength={19} style={{ ...iInput, fontFamily: 'monospace', letterSpacing: '2px' }} value={card.number} onChange={e => setCard(p => ({...p, number: fmtCard(e.target.value)}))} placeholder="1234 5678 9012 3456"
                        onFocus={e => e.target.style.borderColor='#b8920e'} onBlur={e => e.target.style.borderColor='#d8ccb4'} />
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                      <label style={iLabel}>Name on Card *</label>
                      <input required style={iInput} value={card.holder} onChange={e => setCard(p => ({...p, holder: e.target.value}))} placeholder="John Smith"
                        onFocus={e => e.target.style.borderColor='#b8920e'} onBlur={e => e.target.style.borderColor='#d8ccb4'} />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.8rem' }}>
                      <div>
                        <label style={iLabel}>Expiry Date *</label>
                        <input required maxLength={5} style={iInput} value={card.expiry} onChange={e => setCard(p => ({...p, expiry: fmtExpiry(e.target.value)}))} placeholder="MM/YY"
                          onFocus={e => e.target.style.borderColor='#b8920e'} onBlur={e => e.target.style.borderColor='#d8ccb4'} />
                      </div>
                      <div>
                        <label style={iLabel}>CVV *</label>
                        <input required maxLength={4} type="password" style={iInput} value={card.cvv} onChange={e => setCard(p => ({...p, cvv: e.target.value.replace(/\D/g,'').slice(0,4)}))} placeholder="•••"
                          onFocus={e => e.target.style.borderColor='#b8920e'} onBlur={e => e.target.style.borderColor='#d8ccb4'} />
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                      <button type="button" onClick={() => setStep('shipping')} style={{ flex: 1, background: '#fff', border: '1.5px solid #d8ccb4', color: '#5a4a30', padding: '1rem', borderRadius: '8px', fontWeight: 700, fontSize: '0.78rem', letterSpacing: '1.5px', cursor: 'pointer' }}>← BACK</button>
                      <button type="submit" disabled={sending} style={{ flex: 2, background: sending ? '#8a7a60' : 'linear-gradient(135deg, #b8920e, #d4af37)', color: '#fff', border: 'none', padding: '1rem', borderRadius: '8px', fontWeight: 700, fontSize: '0.82rem', letterSpacing: '2.5px', cursor: sending ? 'wait' : 'pointer', textTransform: 'uppercase', transition: 'background 0.3s' }}>
                        {sending ? '⏳ PROCESSING...' : `🔒 PLACE ORDER · $${total.toFixed(0)}`}
                      </button>
                    </div>
                  </form>
                )}

                {/* ── STEP: CONFIRMED ── */}
                {step === 'confirmed' && (
                  <div style={{ textAlign: 'center', padding: '3rem 2rem' }}>
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      style={{ width: 80, height: 80, borderRadius: '50%', background: 'linear-gradient(135deg, #b8920e, #d4af37)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', fontSize: '2rem' }}>
                      ✓
                    </motion.div>
                    <h2 style={{ fontFamily: 'var(--font-head)', fontSize: '2.4rem', fontWeight: 700, color: '#1a1208', letterSpacing: '3px', marginBottom: '0.5rem' }}>ORDER PLACED!</h2>
                    <p style={{ fontSize: '0.88rem', color: '#5a4a30', marginBottom: '1rem', fontWeight: 500 }}>Thank you, {info.name.split(' ')[0] || 'valued customer'}. Your fragrance journey begins now.</p>
                    <div style={{ background: '#fff', border: '1px solid #e8dfd0', borderRadius: '10px', padding: '1.2rem', marginBottom: '2rem', display: 'inline-block' }}>
                      <p style={{ fontSize: '0.62rem', letterSpacing: '2px', color: '#8a7a60', textTransform: 'uppercase', fontWeight: 600, marginBottom: '0.3rem' }}>ORDER NUMBER</p>
                      <p style={{ fontFamily: 'monospace', fontWeight: 700, fontSize: '1.4rem', color: '#b8920e', letterSpacing: '3px' }}>{orderNo}</p>
                    </div>
                    <p style={{ fontSize: '0.8rem', color: '#8a7a60', marginBottom: '2rem', fontWeight: 500 }}>A confirmation email will be sent to <strong>{info.email}</strong></p>
                    <button onClick={handleClose} style={{ background: 'linear-gradient(135deg, #b8920e, #d4af37)', color: '#fff', border: 'none', padding: '1rem 3rem', borderRadius: '8px', fontWeight: 700, fontSize: '0.82rem', letterSpacing: '2.5px', cursor: 'pointer', textTransform: 'uppercase' }}>
                      CONTINUE SHOPPING
                    </button>
                  </div>
                )}
              </div>

              {/* Order Summary sidebar */}
              {step !== 'confirmed' && (
                <div style={{ background: '#fff', borderLeft: '1px solid #e8dfd0', padding: '2rem 1.5rem' }}>
                  <h4 style={{ fontFamily: 'var(--font-head)', fontSize: '1.2rem', fontWeight: 700, color: '#1a1208', letterSpacing: '2px', marginBottom: '1.2rem' }}>ORDER SUMMARY</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginBottom: '1.2rem' }}>
                    {cart.map(item => (
                      <div key={item.id} style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
                        <div style={{ position: 'relative', flexShrink: 0 }}>
                          <div style={{ width: 46, height: 46, background: '#f2ece0', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem' }}>{item.emoji}</div>
                          <span style={{ position: 'absolute', top: -6, right: -6, width: 18, height: 18, background: '#1a1208', color: '#fff', borderRadius: '50%', fontSize: '0.6rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{item.quantity}</span>
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <p style={{ fontSize: '0.75rem', fontWeight: 700, color: '#1a1208', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.name}</p>
                        </div>
                        <span style={{ fontWeight: 700, fontSize: '0.85rem', color: '#b8920e', flexShrink: 0 }}>${item.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ borderTop: '1px solid #e8dfd0', paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#5a4a30', fontWeight: 600 }}>
                      <span>Subtotal</span><span>${cartTotal.toFixed(0)}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#5a4a30', fontWeight: 600 }}>
                      <span>Shipping</span><span style={{ color: shippingCost === 0 ? '#16a34a' : '#1a1208' }}>{shippingCost === 0 ? 'FREE' : `$${shippingCost}`}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '0.6rem', borderTop: '1px solid #e8dfd0', fontWeight: 700, fontSize: '1rem', color: '#1a1208' }}>
                      <span>Total</span>
                      <span style={{ fontFamily: 'var(--font-head)', fontSize: '1.3rem', color: '#b8920e' }}>${total.toFixed(0)}</span>
                    </div>
                  </div>
                  <div style={{ marginTop: '1.5rem', padding: '0.8rem', background: '#f2ece0', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span>🔒</span>
                    <p style={{ fontSize: '0.68rem', color: '#5a4a30', fontWeight: 500, lineHeight: 1.5 }}>Secure 256-bit SSL encryption. Your data is safe.</p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
          </div>{/* /centering wrapper */}
        </>
      )}
    </AnimatePresence>
  )
}
