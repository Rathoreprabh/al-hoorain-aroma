'use client'

import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react'
import { Product } from '@/lib/products'

export interface CartItem extends Product { quantity: number }

export interface Toast {
  id: number
  message: string
  type: 'success' | 'error' | 'info'
}

/** Public, session-safe view of an account (never carries the password). */
export interface AuthUser { name: string; email: string }

/** Result returned by auth actions so the UI can show inline errors. */
export interface AuthResult { ok: boolean; error?: string }

const USERS_KEY   = 'ah_users'    // registered accounts (demo: stored client-side)
const SESSION_KEY = 'ah_session'  // currently signed-in email

interface StoredUser { name: string; email: string; password: string }

const readUsers = (): StoredUser[] => {
  try { return JSON.parse(localStorage.getItem(USERS_KEY) || '[]') } catch { return [] }
}
const writeUsers = (u: StoredUser[]) => localStorage.setItem(USERS_KEY, JSON.stringify(u))

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
  /* Account / Auth */
  user:           AuthUser | null
  accountOpen:    boolean
  setAccountOpen: (v: boolean) => void
  signup:         (name: string, email: string, password: string) => AuthResult
  login:          (email: string, password: string) => AuthResult
  logout:         () => void
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

  const [user,        setUser]        = useState<AuthUser | null>(null)
  const [accountOpen, setAccountOpen] = useState(false)

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

  /* ── Account / Auth (client-side demo; not a secure backend) ── */
  /* Restore session on first load */
  useEffect(() => {
    try {
      const email = localStorage.getItem(SESSION_KEY)
      if (email) {
        const found = readUsers().find(u => u.email === email)
        if (found) setUser({ name: found.name, email: found.email })
      }
    } catch { /* ignore storage errors */ }
  }, [])

  const signup = useCallback((name: string, email: string, password: string): AuthResult => {
    name = name.trim(); email = email.trim().toLowerCase()
    if (!name || !email || !password) return { ok: false, error: 'Please fill in every field.' }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { ok: false, error: 'Enter a valid email address.' }
    if (password.length < 6) return { ok: false, error: 'Password must be at least 6 characters.' }
    const users = readUsers()
    if (users.some(u => u.email === email)) return { ok: false, error: 'An account with this email already exists.' }
    users.push({ name, email, password })
    writeUsers(users)
    localStorage.setItem(SESSION_KEY, email)
    setUser({ name, email })
    addToast(`✓ Welcome, ${name.split(' ')[0]}! Your account is ready.`)
    return { ok: true }
  }, [addToast])

  const login = useCallback((email: string, password: string): AuthResult => {
    email = email.trim().toLowerCase()
    if (!email || !password) return { ok: false, error: 'Enter your email and password.' }
    const found = readUsers().find(u => u.email === email)
    if (!found || found.password !== password) return { ok: false, error: 'Incorrect email or password.' }
    localStorage.setItem(SESSION_KEY, email)
    setUser({ name: found.name, email: found.email })
    addToast(`✓ Welcome back, ${found.name.split(' ')[0]}!`)
    return { ok: true }
  }, [addToast])

  const logout = useCallback(() => {
    localStorage.removeItem(SESSION_KEY)
    setUser(null)
    addToast('You have been signed out.', 'info')
  }, [addToast])

  return (
    <Ctx.Provider value={{
      cart, addToCart, removeFromCart, updateQty, clearCart, cartTotal, cartCount, isInCart,
      wishlist, toggleWishlist, isInWishlist, wishlistCount, moveToCart,
      cartOpen, setCartOpen, wishOpen, setWishOpen,
      searchOpen, setSearchOpen, checkoutOpen, setCheckoutOpen,
      quickViewProduct, setQuickView,
      toasts, addToast, removeToast,
      user, accountOpen, setAccountOpen, signup, login, logout,
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
