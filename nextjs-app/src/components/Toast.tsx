'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useStore } from '@/lib/store'

export default function ToastContainer() {
  const { toasts, removeToast } = useStore()

  return (
    <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 99999, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
      <AnimatePresence>
        {toasts.map(t => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, x: 60, scale: 0.92 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 60, scale: 0.92 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{
              background: t.type === 'error' ? '#dc2626' : t.type === 'info' ? '#fff' : 'linear-gradient(135deg, #b8920e, #d4af37)',
              color: t.type === 'info' ? '#1a1208' : '#fff',
              border: t.type === 'info' ? '1px solid #d8ccb4' : 'none',
              padding: '0.85rem 1.4rem',
              borderRadius: '8px',
              fontWeight: 600,
              fontSize: '0.82rem',
              letterSpacing: '0.3px',
              boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.8rem',
              minWidth: 260,
              maxWidth: 340,
              cursor: 'pointer',
            }}
            onClick={() => removeToast(t.id)}
          >
            <span style={{ flex: 1 }}>{t.message}</span>
            <span style={{ opacity: 0.7, fontSize: '1rem' }}>×</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
