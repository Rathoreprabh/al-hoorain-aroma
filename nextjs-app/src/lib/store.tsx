'use client'

import { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import { Product } from '@/lib/products'

export interface CartItem extends Product { quantity: number }

export interface Toast {
  id: number
  message: string
  type: 'success' | 'error' | 'info'
}

interface StoreCtx {
  /* Cart */
  cart: CartItem[]
  addToCart:      (product: Product, qty?: number) => void
  removeFromCart: (id: number) => void
  updateQty:      (id: number, qty: number) => void
  clearCart:      () => void
  cartTotal:      number
  cartCount:      number
  isInCart:       (id: number) => boolean
  /* Wishlist */
  wishlist:          Product[]
  toggleWishlist:    (product: Product) => void
  isInWishlist:      (id: number) => boolean
  wishlistCount:     number
  moveToCart:        (product: Product) => void
  /* Drawers / Modals */
  cartOpen:       boolean
  setCartOpen:    (v: boolean) => void
  wishOpen:       boolean
  setWishOpen:    (v: boolean) => void
  searchOpen:     boolean
  setSearchOpen:  (v: boolean) => void
  checkoutOpen:   boolean
  setCheckoutOpen:(v: boolean) => void
  quickViewProduct: Product | null
  setQuickView:   (p: Product | null) => void
  /* Toasts */
  toasts:     Toast[]
  addToast:   (msg: string, type?: Toast['type']) => void
  removeToast:(id: number) => void
}

const Ctx = createContext<StoreCtx | null>(null)

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart,     setCart]     = useState<CartItem[]>([])
  const [wishlist, setWishlist] = useState<Product[]>([])
  const [toasts,   setToasts]   = useState<Toast[]>([])

  const [cartOpen,      setCartOpen]      = useState(false)
  const [wishOpen,      setWishOpen]      = useState(false)
  const [searchOpen,    setSearchOpen]    = useState(false)
  const [checkoutOpen,  setCheckoutOpen]  = useState(false)
  const [quickViewProduct, setQuickView] = useState<Product | null>(null)

  /* ── Toasts ── */
  const addToast = useCallback((message: string, type: Toast['type'] = 'success') => {
    const id = Date.now()
    setToasts(p => [...p, { id, message, type }])
    setTimeout(() => setToasts(p => p.filter(t => t.id !== id)), 3200)
  }, [])
  const removeToast = useCallback((id: number) => setToasts(p => p.filter(t => t.id !== id)), [])

  /* ── Cart ── */
  const addToCart = useCallback((product: Product, qty = 1) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id)
      if (existing) return prev.map(i => i.id === product.id ? { ...i, quantity: i.quantity + qty } : i)
      return [...prev, { ...product, quantity: qty }]
    })
    addToast(`✓ ${product.name} added to cart`)
  }, [addToast])

  const removeFromCart = useCallback((id: number) => {
    setCart(prev => prev.filter(i => i.id !== id))
    addToast('Removed from cart', 'info')
  }, [addToast])

  const updateQty = useCallback((id: number, qty: number) => {
    if (qty < 1) return
    setCart(prev => prev.map(i => i.id === id ? { ...i, quantity: qty } : i))
  }, [])

  const clearCart = useCallback(() => setCart([]), [])

  const isInCart = useCallback((id: number) => cart.some(i => i.id === id), [cart])

  const cartCount = cart.reduce((s, i) => s + i.quantity, 0)
  const cartTotal = cart.reduce((s, i) => s + i.price * i.quantity, 0)

  /* ── Wishlist ── */
  const toggleWishlist = useCallback((product: Product) => {
    setWishlist(prev => {
      const exists = prev.some(p => p.id === product.id)
      if (exists) {
        addToast('Removed from wishlist', 'info')
        return prev.filter(p => p.id !== product.id)
      }
      addToast(`♡ ${product.name} saved to wishlist`)
      return [...prev, product]
    })
  }, [addToast])

  const isInWishlist = useCallback((id: number) => wishlist.some(p => p.id === id), [wishlist])

  const moveToCart = useCallback((product: Product) => {
    addToCart(product)
    setWishlist(prev => prev.filter(p => p.id !== product.id))
  }, [addToCart])

  const wishlistCount = wishlist.length

  return (
    <Ctx.Provider value={{
      cart, addToCart, removeFromCart, updateQty, clearCart, cartTotal, cartCount, isInCart,
      wishlist, toggleWishlist, isInWishlist, wishlistCount, moveToCart,
      cartOpen, setCartOpen, wishOpen, setWishOpen,
      searchOpen, setSearchOpen, checkoutOpen, setCheckoutOpen,
      quickViewProduct, setQuickView,
      toasts, addToast, removeToast,
    }}>
      {children}
    </Ctx.Provider>
  )
}

export function useStore() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useStore must be used inside StoreProvider')
  return ctx
}
