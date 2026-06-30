'use client'

import { useState } from 'react'

import { StoreProvider }    from '@/lib/store'
import LoadingScreen        from '@/components/LoadingScreen'
import SmoothScrollProvider from '@/components/SmoothScrollProvider'
import FixedBackground      from '@/components/FixedBackground'
import Navigation           from '@/components/Navigation'
import ToastContainer       from '@/components/Toast'
import CartDrawer           from '@/components/CartDrawer'
import WishlistDrawer       from '@/components/WishlistDrawer'
import SearchModal          from '@/components/SearchModal'
import CheckoutModal        from '@/components/CheckoutModal'
import QuickViewModal       from '@/components/QuickViewModal'
import AccountModal         from '@/components/AccountModal'
import FloatingCart         from '@/components/FloatingCart'
import LiveChat             from '@/components/LiveChat'

import HeroSection          from '@/components/sections/HeroSection'
import StatsSection         from '@/components/sections/StatsSection'
import CollectionSection    from '@/components/sections/CollectionSection'
import StickyScrollSection  from '@/components/sections/StickyScrollSection'
import MidnightSection      from '@/components/sections/MidnightSection'
import IngredientsSection   from '@/components/sections/IngredientsSection'
import StorySection         from '@/components/sections/StorySection'
import TestimonialsSection  from '@/components/sections/TestimonialsSection'
import NewsletterSection    from '@/components/sections/NewsletterSection'
import FooterSection        from '@/components/sections/FooterSection'

function App() {
  const [loaded, setLoaded] = useState(false)

  return (
    <>
      <LoadingScreen onComplete={() => setLoaded(true)} />

      {loaded && (
        <SmoothScrollProvider>
          {/* Fixed ornamental background */}
          <FixedBackground />

          {/* Global UI */}
          <Navigation />
          <ToastContainer />
          <FloatingCart />
          <LiveChat />
          <CartDrawer />
          <WishlistDrawer />
          <SearchModal />
          <CheckoutModal />
          <QuickViewModal />
          <AccountModal />

          <main>
            <HeroSection />
            <StatsSection />
            <CollectionSection />
            {/* Sticky image + scrolling text — exactly like reference */}
            <StickyScrollSection />
            <MidnightSection />
            <IngredientsSection />
            <StorySection />
            <TestimonialsSection />
            <NewsletterSection />
          </main>

          <FooterSection />
        </SmoothScrollProvider>
      )}
    </>
  )
}

export default function HomePage() {
  return (
    <StoreProvider>
      <App />
    </StoreProvider>
  )
}
