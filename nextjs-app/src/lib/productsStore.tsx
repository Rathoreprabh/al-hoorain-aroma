'use client'

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react'
import { products as BASE_PRODUCTS, Product } from '@/lib/products'

/* ────────────────────────────────────────────────────────────
   Live, admin-editable product catalog.

   Persistence is client-side (localStorage) so the demo works
   without a backend — exactly like the cart/auth layers. The
   surface (CRUD methods) is intentionally backend-shaped so it
   can later be swapped for an API with minimal component churn.
   ──────────────────────────────────────────────────────────── */

const CATALOG_KEY = 'ah_catalog_v1'

/** All displayable images for a product: cover first, then gallery. */
export function productImages(p: Product): string[] {
  const all = [p.image, ...(p.gallery ?? [])].filter((x): x is string => !!x)
  return Array.from(new Set(all))
}

interface ProductsCtx {
  products: Product[]
  ready: boolean
  getProduct: (id: number) => Product | undefined
  updateProduct: (id: number, patch: Partial<Product>) => void
  deleteProduct: (id: number) => void
  addProduct: (partial?: Partial<Product>) => number
  addPhoto: (id: number, url: string) => void
  removePhoto: (id: number, url: string) => void
  setCover: (id: number, url: string) => void
  resetCatalog: () => void
}

const Ctx = createContext<ProductsCtx | null>(null)

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(BASE_PRODUCTS)
  const [ready, setReady] = useState(false)

  /* Hydrate from localStorage once on the client */
  useEffect(() => {
    try {
      const raw = localStorage.getItem(CATALOG_KEY)
      if (raw) {
        const parsed = JSON.parse(raw) as Product[]
        if (Array.isArray(parsed) && parsed.length) setProducts(parsed)
      }
    } catch { /* corrupt storage — fall back to base catalog */ }
    setReady(true)
  }, [])

  /* Persist on every change (after hydration so we never clobber stored data) */
  const persist = useCallback((next: Product[]) => {
    setProducts(next)
    try { localStorage.setItem(CATALOG_KEY, JSON.stringify(next)) } catch { /* quota / private mode */ }
  }, [])

  const getProduct = useCallback((id: number) => products.find(p => p.id === id), [products])

  const updateProduct = useCallback((id: number, patch: Partial<Product>) => {
    setProducts(prev => {
      const next = prev.map(p => p.id === id ? { ...p, ...patch } : p)
      try { localStorage.setItem(CATALOG_KEY, JSON.stringify(next)) } catch {}
      return next
    })
  }, [])

  const deleteProduct = useCallback((id: number) => {
    setProducts(prev => {
      const next = prev.filter(p => p.id !== id)
      try { localStorage.setItem(CATALOG_KEY, JSON.stringify(next)) } catch {}
      return next
    })
  }, [])

  const addProduct = useCallback((partial: Partial<Product> = {}) => {
    let newId = 0
    setProducts(prev => {
      newId = (prev.reduce((m, p) => Math.max(m, p.id), 0) || 0) + 1
      const fresh: Product = {
        id: newId,
        name: partial.name ?? 'New Fragrance',
        description: partial.description ?? '',
        price: partial.price ?? 0,
        emoji: partial.emoji ?? '🧴',
        image: partial.image ?? '',
        gallery: partial.gallery ?? [],
        category: partial.category ?? 'Uncategorized',
        mood: partial.mood ?? [],
        notes: partial.notes ?? [],
        rating: partial.rating ?? 5,
        badge: partial.badge,
      }
      const next = [fresh, ...prev]
      try { localStorage.setItem(CATALOG_KEY, JSON.stringify(next)) } catch {}
      return next
    })
    return newId
  }, [])

  const addPhoto = useCallback((id: number, url: string) => {
    url = url.trim()
    if (!url) return
    setProducts(prev => {
      const next = prev.map(p => {
        if (p.id !== id) return p
        if (!p.image) return { ...p, image: url }           // first photo becomes the cover
        if (p.image === url || (p.gallery ?? []).includes(url)) return p // de-dupe
        return { ...p, gallery: [...(p.gallery ?? []), url] }
      })
      try { localStorage.setItem(CATALOG_KEY, JSON.stringify(next)) } catch {}
      return next
    })
  }, [])

  const removePhoto = useCallback((id: number, url: string) => {
    setProducts(prev => {
      const next = prev.map(p => {
        if (p.id !== id) return p
        const gallery = (p.gallery ?? []).filter(g => g !== url)
        if (p.image === url) {
          // promote the next gallery image to cover
          const [newCover, ...rest] = gallery
          return { ...p, image: newCover ?? '', gallery: rest }
        }
        return { ...p, gallery }
      })
      try { localStorage.setItem(CATALOG_KEY, JSON.stringify(next)) } catch {}
      return next
    })
  }, [])

  const setCover = useCallback((id: number, url: string) => {
    setProducts(prev => {
      const next = prev.map(p => {
        if (p.id !== id) return p
        const others = productImages(p).filter(u => u !== url)
        return { ...p, image: url, gallery: others }
      })
      try { localStorage.setItem(CATALOG_KEY, JSON.stringify(next)) } catch {}
      return next
    })
  }, [])

  const resetCatalog = useCallback(() => {
    try { localStorage.removeItem(CATALOG_KEY) } catch {}
    setProducts(BASE_PRODUCTS)
  }, [])

  return (
    <Ctx.Provider value={{ products, ready, getProduct, updateProduct, deleteProduct, addProduct, addPhoto, removePhoto, setCover, resetCatalog }}>
      {children}
    </Ctx.Provider>
  )
}

export function useProducts() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useProducts must be used inside ProductsProvider')
  return ctx
}
