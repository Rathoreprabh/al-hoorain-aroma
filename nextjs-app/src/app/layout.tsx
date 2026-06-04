import type { Metadata } from 'next'
import { Cormorant_Garamond, Poppins } from 'next/font/google'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Al Hoorain Aroma — Premium Luxury Fragrances',
  description:
    'Discover the pinnacle of olfactory luxury. Arabian royal heritage meets Italian craftsmanship in every bottle. Premium luxury perfumes crafted by master perfumers.',
  keywords: ['luxury perfume', 'Arabic fragrance', 'oud perfume', 'Italian perfumery', 'Al Hoorain Aroma'],
  openGraph: {
    title: 'Al Hoorain Aroma — Premium Luxury Fragrances',
    description: 'Arabian luxury meets Italian craftsmanship. Discover our world-class fragrance collection.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${poppins.variable}`}
      style={{ fontFamily: 'var(--font-poppins, Poppins, sans-serif)' }}
    >
      <body>{children}</body>
    </html>
  )
}
