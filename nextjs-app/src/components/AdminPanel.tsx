'use client'

import { useState, useEffect, useMemo } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useStore } from '@/lib/store'
import { useProducts, productImages } from '@/lib/productsStore'
import { Product } from '@/lib/products'
import { useScrollLock } from '@/hooks/useScrollLock'

/* Local editing draft — notes/mood are edited as comma text, split on save */
interface Draft {
  product: Product
  notesText: string
  moodText: string
}

const toDraft = (p: Product): Draft => ({
  product: { ...p, gallery: [...(p.gallery ?? [])] },
  notesText: (p.notes ?? []).join(', '),
  moodText:  (p.mood  ?? []).join(', '),
})

export default function AdminPanel() {
  const { adminOpen, setAdminOpen, isAdmin, addToast } = useStore()
  const { products, updateProduct, deleteProduct, addProduct, resetCatalog } = useProducts()

  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [draft, setDraft] = useState<Draft | null>(null)
  const [search, setSearch] = useState('')
  const [newPhoto, setNewPhoto] = useState('')
  const [confirmDelete, setConfirmDelete] = useState(false)

  useScrollLock(adminOpen)

  /* Pick the first product when the panel opens with nothing selected */
  useEffect(() => {
    if (adminOpen && selectedId == null && products.length) setSelectedId(products[0].id)
  }, [adminOpen, products, selectedId])

  /* Load the draft whenever the selection changes */
  useEffect(() => {
    const p = products.find(x => x.id === selectedId)
    setDraft(p ? toDraft(p) : null)
    setConfirmDelete(false)
    setNewPhoto('')
  }, [selectedId, products])

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return products
    return products.filter(p => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q))
  }, [products, search])

  if (!isAdmin) return null

  const setField = <K extends keyof Product>(key: K, value: Product[K]) =>
    setDraft(d => d ? { ...d, product: { ...d.product, [key]: value } } : d)

  const photos = draft ? productImages(draft.product) : []

  const setCoverLocal = (url: string) => setDraft(d => {
    if (!d) return d
    const others = productImages(d.product).filter(u => u !== url)
    return { ...d, product: { ...d.product, image: url, gallery: others } }
  })
  const removePhotoLocal = (url: string) => setDraft(d => {
    if (!d) return d
    const remaining = productImages(d.product).filter(u => u !== url)
    const [cover, ...rest] = remaining
    return { ...d, product: { ...d.product, image: cover ?? '', gallery: rest } }
  })
  const addPhotoLocal = () => {
    const url = newPhoto.trim()
    if (!url) return
    setDraft(d => {
      if (!d) return d
      if (productImages(d.product).includes(url)) return d
      if (!d.product.image) return { ...d, product: { ...d.product, image: url } }
      return { ...d, product: { ...d.product, gallery: [...(d.product.gallery ?? []), url] } }
    })
    setNewPhoto('')
  }

  const save = () => {
    if (!draft) return
    const notes = draft.notesText.split(',').map(s => s.trim()).filter(Boolean)
    const mood  = draft.moodText.split(',').map(s => s.trim()).filter(Boolean)
    updateProduct(draft.product.id, { ...draft.product, notes, mood })
    addToast('✓ Product saved')
  }

  const remove = () => {
    if (!draft) return
    deleteProduct(draft.product.id)
    addToast('Product deleted', 'info')
    setSelectedId(null)
    setConfirmDelete(false)
  }

  const create = () => {
    const id = addProduct({ name: 'New Fragrance', category: 'Uncategorized' })
    setSelectedId(id)
    addToast('✓ New product created — edit and save')
  }

  /* shared styles */
  const label: React.CSSProperties = { display: 'block', fontSize: '0.62rem', fontWeight: 700, letterSpacing: '1.5px', color: '#8a7a60', textTransform: 'uppercase', marginBottom: '0.35rem' }
  const input: React.CSSProperties = { width: '100%', border: '1.5px solid #d8ccb4', borderRadius: '6px', padding: '0.6rem 0.8rem', fontSize: '0.85rem', fontFamily: 'var(--font-body)', fontWeight: 500, color: '#1a1208', background: '#fff', outline: 'none' }
  const ghostBtn: React.CSSProperties = { background: '#fff', border: '1.5px solid #d8ccb4', color: '#5a4a30', padding: '0.55rem 0.9rem', borderRadius: '6px', fontWeight: 700, fontSize: '0.72rem', letterSpacing: '1px', cursor: 'pointer', textTransform: 'uppercase' }
  const goldBtn: React.CSSProperties = { background: 'linear-gradient(135deg, #b8920e, #d4af37)', color: '#fff', border: 'none', padding: '0.7rem 1.2rem', borderRadius: '6px', fontWeight: 700, fontSize: '0.75rem', letterSpacing: '1.5px', cursor: 'pointer', textTransform: 'uppercase' }

  return (
    <AnimatePresence>
      {adminOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setAdminOpen(false)}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)', zIndex: 9400, backdropFilter: 'blur(4px)' }}
          />
          <div style={{ position: 'fixed', inset: 0, zIndex: 9401, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', pointerEvents: 'none' }}>
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              style={{ width: '100%', maxWidth: 1120, height: '90vh', background: '#faf7f2', borderRadius: '16px', boxShadow: '0 40px 100px rgba(0,0,0,0.4)', pointerEvents: 'auto', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
            >
              {/* Header */}
              <div style={{ background: 'linear-gradient(135deg, #1a1208, #2a1f0e)', padding: '1.3rem 1.8rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
                <div>
                  <span style={{ fontFamily: 'var(--font-head)', fontSize: '1.35rem', fontWeight: 700, color: '#d4af37', letterSpacing: '3px' }}>ADMIN DASHBOARD</span>
                  <p style={{ fontSize: '0.6rem', letterSpacing: '3px', color: 'rgba(212,175,55,0.55)', textTransform: 'uppercase', marginTop: '2px' }}>{products.length} products · changes saved to this browser</p>
                </div>
                <button onClick={() => setAdminOpen(false)} aria-label="Close" style={{ background: 'rgba(255,255,255,0.1)', border: 'none', width: 36, height: 36, borderRadius: '50%', cursor: 'pointer', color: '#fff', fontSize: '1.2rem', fontWeight: 700 }}>×</button>
              </div>

              {/* Body */}
              <div className="admin-body" style={{ flex: 1, display: 'grid', gridTemplateColumns: '300px 1fr', minHeight: 0 }}>

                {/* ── Product list ── */}
                <div style={{ borderRight: '1px solid #e8dfd0', display: 'flex', flexDirection: 'column', minHeight: 0, background: '#fff' }}>
                  <div style={{ padding: '1rem', borderBottom: '1px solid #e8dfd0', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                    <button onClick={create} style={{ ...goldBtn, width: '100%' }}>+ ADD PRODUCT</button>
                    <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products…" style={input} />
                  </div>
                  <div style={{ overflowY: 'auto', flex: 1 }}>
                    {filtered.map(p => {
                      const cover = productImages(p)[0]
                      const active = p.id === selectedId
                      return (
                        <button
                          key={p.id}
                          onClick={() => setSelectedId(p.id)}
                          style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '0.7rem', padding: '0.6rem 1rem', background: active ? '#f6efe0' : 'transparent', border: 'none', borderLeft: `3px solid ${active ? '#b8920e' : 'transparent'}`, cursor: 'pointer', textAlign: 'left' }}
                        >
                          <div style={{ width: 38, height: 38, borderRadius: '6px', background: '#f2ece0', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', fontSize: '1.1rem' }}>
                            {cover ? <img src={cover} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} /> : p.emoji}
                          </div>
                          <div style={{ minWidth: 0, flex: 1 }}>
                            <p style={{ fontSize: '0.8rem', fontWeight: 700, color: '#1a1208', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.name}</p>
                            <p style={{ fontSize: '0.66rem', color: '#8a7a60' }}>{p.price > 0 ? `$${p.price}` : 'Inquire'} · {productImages(p).length} photo{productImages(p).length === 1 ? '' : 's'}</p>
                          </div>
                        </button>
                      )
                    })}
                    {filtered.length === 0 && <p style={{ padding: '1.5rem', textAlign: 'center', fontSize: '0.8rem', color: '#8a7a60' }}>No products match.</p>}
                  </div>
                  <div style={{ padding: '0.8rem 1rem', borderTop: '1px solid #e8dfd0' }}>
                    <button onClick={() => { if (confirm('Reset the entire catalog to defaults? This discards all admin changes in this browser.')) { resetCatalog(); setSelectedId(null); addToast('Catalog reset to defaults', 'info') } }} style={{ ...ghostBtn, width: '100%', color: '#a3261b', borderColor: '#e7c3bf' }}>RESET CATALOG</button>
                  </div>
                </div>

                {/* ── Editor ── */}
                <div style={{ overflowY: 'auto', padding: '1.6rem 1.8rem', minHeight: 0 }}>
                  {!draft ? (
                    <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8a7a60', fontSize: '0.9rem' }}>Select a product, or add a new one.</div>
                  ) : (
                    <>
                      {/* Photos */}
                      <p style={label}>Photos — first is the cover (shown on the card)</p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.7rem', marginBottom: '0.8rem' }}>
                        {photos.map((url, i) => (
                          <div key={url} style={{ position: 'relative', width: 92, height: 110, border: `2px solid ${i === 0 ? '#b8920e' : '#e8dfd0'}`, borderRadius: '8px', overflow: 'hidden', background: '#fff' }}>
                            <img src={url} alt={`photo ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 6 }} />
                            {i === 0 && <span style={{ position: 'absolute', top: 4, left: 4, background: '#b8920e', color: '#fff', fontSize: '0.5rem', fontWeight: 700, letterSpacing: '0.5px', padding: '1px 5px', borderRadius: '3px' }}>COVER</span>}
                            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, display: 'flex', background: 'rgba(26,18,8,0.78)' }}>
                              {i !== 0 && <button onClick={() => setCoverLocal(url)} title="Set as cover" style={{ flex: 1, background: 'none', border: 'none', color: '#d4af37', fontSize: '0.6rem', fontWeight: 700, padding: '3px 0', cursor: 'pointer' }}>COVER</button>}
                              <button onClick={() => removePhotoLocal(url)} title="Remove photo" style={{ flex: 1, background: 'none', border: 'none', color: '#f0a8a0', fontSize: '0.6rem', fontWeight: 700, padding: '3px 0', cursor: 'pointer' }}>✕</button>
                            </div>
                          </div>
                        ))}
                        {photos.length === 0 && <div style={{ width: 92, height: 110, border: '2px dashed #d8ccb4', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem' }}>{draft.product.emoji}</div>}
                      </div>
                      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.6rem' }}>
                        <input value={newPhoto} onChange={e => setNewPhoto(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') addPhotoLocal() }} placeholder="Image URL or /products/file.jpg" style={{ ...input, flex: 1 }} />
                        <button onClick={addPhotoLocal} style={ghostBtn}>ADD PHOTO</button>
                      </div>

                      {/* Fields */}
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                        <div>
                          <label style={label}>Product Name</label>
                          <input value={draft.product.name} onChange={e => setField('name', e.target.value)} style={input} />
                        </div>
                        <div>
                          <label style={label}>Category</label>
                          <input value={draft.product.category} onChange={e => setField('category', e.target.value)} style={input} />
                        </div>
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                        <div>
                          <label style={label}>Price ($, 0 = Inquire)</label>
                          <input type="number" min={0} value={draft.product.price} onChange={e => setField('price', Number(e.target.value) || 0)} style={input} />
                        </div>
                        <div>
                          <label style={label}>Rating (0–5)</label>
                          <input type="number" min={0} max={5} step={0.1} value={draft.product.rating} onChange={e => setField('rating', Number(e.target.value) || 0)} style={input} />
                        </div>
                        <div>
                          <label style={label}>Badge (optional)</label>
                          <input value={draft.product.badge ?? ''} onChange={e => setField('badge', e.target.value || undefined)} placeholder="BESTSELLER" style={input} />
                        </div>
                      </div>
                      <div style={{ marginBottom: '1rem' }}>
                        <label style={label}>Description</label>
                        <textarea value={draft.product.description} onChange={e => setField('description', e.target.value)} rows={3} style={{ ...input, resize: 'vertical', lineHeight: 1.6 }} />
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                        <div>
                          <label style={label}>Fragrance Notes (comma-separated)</label>
                          <input value={draft.notesText} onChange={e => setDraft(d => d ? { ...d, notesText: e.target.value } : d)} placeholder="Rose, Oud, Musk" style={input} />
                        </div>
                        <div>
                          <label style={label}>Mood Tags (comma-separated)</label>
                          <input value={draft.moodText} onChange={e => setDraft(d => d ? { ...d, moodText: e.target.value } : d)} placeholder="floral, oriental" style={input} />
                        </div>
                      </div>
                      <div style={{ marginBottom: '1.6rem' }}>
                        <label style={label}>Emoji (fallback when no photo)</label>
                        <input value={draft.product.emoji} onChange={e => setField('emoji', e.target.value)} style={{ ...input, width: 80, textAlign: 'center', fontSize: '1.1rem' }} />
                      </div>

                      {/* Actions */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', borderTop: '1px solid #e8dfd0', paddingTop: '1.2rem' }}>
                        <button onClick={save} style={goldBtn}>SAVE CHANGES</button>
                        {!confirmDelete
                          ? <button onClick={() => setConfirmDelete(true)} style={{ ...ghostBtn, color: '#a3261b', borderColor: '#e7c3bf' }}>DELETE</button>
                          : <span style={{ display: 'inline-flex', gap: '0.5rem', alignItems: 'center' }}>
                              <span style={{ fontSize: '0.75rem', color: '#a3261b', fontWeight: 600 }}>Sure?</span>
                              <button onClick={remove} style={{ ...goldBtn, background: '#a3261b', padding: '0.55rem 0.9rem' }}>YES, DELETE</button>
                              <button onClick={() => setConfirmDelete(false)} style={ghostBtn}>CANCEL</button>
                            </span>}
                        <span style={{ marginLeft: 'auto', fontSize: '0.66rem', color: '#a89a7e' }}>ID #{draft.product.id}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
