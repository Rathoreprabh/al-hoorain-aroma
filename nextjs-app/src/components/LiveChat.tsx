'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

interface Message {
  id: number
  from: 'user' | 'agent'
  text: string
  time: string
}

const AGENT = { name: 'Layla', title: 'Fragrance Consultant', avatar: '/logo.png' }

const AUTO_REPLIES: string[] = [
  "Thank you for reaching out to Al Hoorain Aroma! How can I assist you today?",
  "I'd be happy to help you find the perfect fragrance. Could you tell me what scent family you prefer — Woody, Floral, Oriental, or Fresh?",
  "Excellent choice! Our Oud fragrances are sourced directly from Southeast Asia. Would you like to know more about a specific collection?",
  "Absolutely! We offer free shipping on all orders over $300, and every purchase comes with complimentary luxury gift packaging.",
  "Our fragrances are 100% authentic and crafted by master perfumers. Each bottle is numbered and signed. Is there anything else I can help you with?",
  "Feel free to browse our collection and add your favourites to the cart. I'm here if you have any questions! 😊",
]

function now() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

export default function LiveChat() {
  const [open, setOpen]       = useState(false)
  const [input, setInput]     = useState('')
  const [messages, setMessages] = useState<Message[]>([
    { id: 0, from: 'agent', text: "Hello! Welcome to Al Hoorain Aroma. I'm Layla, your personal fragrance consultant. How can I help you today? ✨", time: now() },
  ])
  const [replyIdx, setReplyIdx]   = useState(0)
  const [typing, setTyping]       = useState(false)
  const [unread, setUnread]       = useState(1)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef  = useRef<HTMLInputElement>(null)

  /* Scroll to bottom on new message */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  /* Focus input when opened */
  useEffect(() => {
    if (open) { setUnread(0); setTimeout(() => inputRef.current?.focus(), 150) }
  }, [open])

  const sendMessage = () => {
    const text = input.trim()
    if (!text) return

    const userMsg: Message = { id: Date.now(), from: 'user', text, time: now() }
    setMessages(p => [...p, userMsg])
    setInput('')
    setTyping(true)

    /* Simulate agent typing delay */
    setTimeout(() => {
      setTyping(false)
      const reply = AUTO_REPLIES[replyIdx % AUTO_REPLIES.length]
      setReplyIdx(i => i + 1)
      const agentMsg: Message = { id: Date.now() + 1, from: 'agent', text: reply, time: now() }
      setMessages(p => [...p, agentMsg])
      if (!open) setUnread(u => u + 1)
    }, 1200 + Math.random() * 800)
  }

  const handleKey = (e: React.KeyboardEvent) => { if (e.key === 'Enter') sendMessage() }

  return (
    <>
      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            style={{
              position: 'fixed',
              bottom: '7rem', right: '2rem',
              width: 360, maxWidth: 'calc(100vw - 2rem)',
              background: '#fff',
              borderRadius: '16px',
              boxShadow: '0 20px 70px rgba(0,0,0,0.22)',
              zIndex: 850,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              border: '1px solid #e8dfd0',
            }}
          >
            {/* Header */}
            <div style={{
              background: 'linear-gradient(135deg, #1a1208, #3a2510)',
              padding: '1rem 1.2rem',
              display: 'flex', alignItems: 'center', gap: '0.8rem',
            }}>
              <div style={{ position: 'relative', flexShrink: 0 }}>
                <Image src="/logo.png" alt="Agent" width={40} height={40} style={{ borderRadius: '50%', border: '2px solid rgba(212,175,55,0.5)' }} />
                <span style={{ position: 'absolute', bottom: 1, right: 1, width: 10, height: 10, background: '#22c55e', borderRadius: '50%', border: '2px solid #1a1208' }} />
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '1rem', color: '#FAEBD7', letterSpacing: '1px' }}>{AGENT.name}</p>
                <p style={{ fontSize: '0.65rem', color: 'rgba(212,175,55,0.8)', fontWeight: 500 }}>{AGENT.title} · Online</p>
              </div>
              <button
                onClick={() => setOpen(false)}
                style={{ background: 'rgba(255,255,255,0.12)', border: 'none', width: 30, height: 30, borderRadius: '50%', color: '#fff', cursor: 'pointer', fontSize: '1rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >×</button>
            </div>

            {/* Promo bar */}
            <div style={{ background: 'linear-gradient(90deg, #b8920e, #d4af37)', padding: '0.45rem 1.2rem', textAlign: 'center' }}>
              <p style={{ fontSize: '0.62rem', fontWeight: 700, color: '#fff', letterSpacing: '1.5px' }}>✦ FREE SHIPPING ON ORDERS OVER $300 ✦</p>
            </div>

            {/* Messages */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '1rem 1.2rem', display: 'flex', flexDirection: 'column', gap: '0.8rem', maxHeight: 320, background: '#faf7f2' }}>
              {messages.map(msg => (
                <div
                  key={msg.id}
                  style={{
                    display: 'flex',
                    flexDirection: msg.from === 'user' ? 'row-reverse' : 'row',
                    gap: '0.5rem',
                    alignItems: 'flex-end',
                  }}
                >
                  {msg.from === 'agent' && (
                    <Image src="/logo.png" alt="Agent" width={26} height={26} style={{ borderRadius: '50%', flexShrink: 0, marginBottom: 2 }} />
                  )}
                  <div>
                    <div style={{
                      background: msg.from === 'agent' ? '#fff' : 'linear-gradient(135deg, #b8920e, #d4af37)',
                      color: msg.from === 'agent' ? '#1a1208' : '#fff',
                      padding: '0.6rem 0.9rem',
                      borderRadius: msg.from === 'agent' ? '12px 12px 12px 4px' : '12px 12px 4px 12px',
                      fontSize: '0.82rem',
                      lineHeight: 1.6,
                      fontWeight: 500,
                      maxWidth: 240,
                      boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                      border: msg.from === 'agent' ? '1px solid #e8dfd0' : 'none',
                    }}>
                      {msg.text}
                    </div>
                    <p style={{ fontSize: '0.6rem', color: '#8a7a60', marginTop: '3px', textAlign: msg.from === 'user' ? 'right' : 'left', paddingLeft: msg.from === 'agent' ? '4px' : 0 }}>
                      {msg.time}
                    </p>
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              <AnimatePresence>
                {typing && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                  >
                    <Image src="/logo.png" alt="Agent" width={26} height={26} style={{ borderRadius: '50%', flexShrink: 0 }} />
                    <div style={{ background: '#fff', border: '1px solid #e8dfd0', padding: '0.6rem 1rem', borderRadius: '12px 12px 12px 4px', display: 'flex', gap: '4px', alignItems: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                      {[0, 0.18, 0.36].map(d => (
                        <motion.span
                          key={d}
                          animate={{ y: [0, -5, 0] }}
                          transition={{ repeat: Infinity, duration: 0.7, delay: d }}
                          style={{ display: 'block', width: 6, height: 6, borderRadius: '50%', background: '#b8920e' }}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div style={{ padding: '0.8rem 1rem', borderTop: '1px solid #e8dfd0', display: 'flex', gap: '0.5rem', background: '#fff' }}>
              <input
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Type your message..."
                style={{
                  flex: 1,
                  border: '1.5px solid #d8ccb4',
                  borderRadius: '8px',
                  padding: '0.6rem 0.9rem',
                  fontSize: '0.82rem',
                  outline: 'none',
                  fontFamily: 'var(--font-body)',
                  fontWeight: 500,
                  color: '#1a1208',
                  background: '#faf7f2',
                  transition: 'border-color 0.2s',
                }}
                onFocus={e => e.target.style.borderColor = '#b8920e'}
                onBlur={e => e.target.style.borderColor = '#d8ccb4'}
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim()}
                style={{
                  width: 40, height: 40,
                  borderRadius: '8px',
                  background: input.trim() ? 'linear-gradient(135deg, #b8920e, #d4af37)' : '#e8dfd0',
                  border: 'none',
                  cursor: input.trim() ? 'pointer' : 'default',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'background 0.25s',
                  flexShrink: 0,
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={input.trim() ? '#fff' : '#8a7a60'} strokeWidth="2.2">
                  <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                </svg>
              </button>
            </div>

            {/* Footer */}
            <div style={{ padding: '0.5rem', textAlign: 'center', background: '#fff', borderTop: '1px solid #f2ece0' }}>
              <p style={{ fontSize: '0.58rem', color: '#8a7a60', letterSpacing: '0.5px' }}>Powered by Al Hoorain Aroma Support</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat toggle button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.5, type: 'spring', stiffness: 300, damping: 22 }}
        onClick={() => setOpen(o => !o)}
        style={{
          position: 'fixed',
          bottom: '2rem', right: '2rem',
          zIndex: 850,
          background: open ? '#1a1208' : 'linear-gradient(135deg, #1a1208, #3a2510)',
          border: '2px solid rgba(212,175,55,0.5)',
          borderRadius: '50px',
          padding: '0 1.2rem',
          height: 52,
          display: 'flex',
          alignItems: 'center',
          gap: '0.6rem',
          cursor: 'pointer',
          boxShadow: '0 8px 30px rgba(0,0,0,0.25)',
          transition: 'background 0.3s',
          color: '#FAEBD7',
        }}
        whileHover={{ scale: 1.04, boxShadow: '0 12px 40px rgba(0,0,0,0.30)' }}
        whileTap={{ scale: 0.96 }}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} style={{ fontSize: '1.1rem', fontWeight: 700 }}>×</motion.span>
          ) : (
            <motion.span key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#d4af37" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
            </motion.span>
          )}
        </AnimatePresence>

        <span style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#d4af37' }}>
          {open ? 'Close' : "Let's Chat"}
        </span>

        {/* Unread badge */}
        <AnimatePresence>
          {!open && unread > 0 && (
            <motion.span
              initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
              style={{
                position: 'absolute', top: -6, right: -4,
                width: 20, height: 20,
                background: '#dc2626', color: '#fff',
                borderRadius: '50%', fontSize: '0.6rem',
                fontWeight: 800, display: 'flex',
                alignItems: 'center', justifyContent: 'center',
                border: '2px solid #fff',
              }}
            >
              {unread}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  )
}
