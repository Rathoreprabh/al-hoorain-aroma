# Al Hoorain Aroma — Luxury Perfume E-Commerce

A world-class luxury fragrance e-commerce experience built with Next.js 16, React 19, TypeScript, Framer Motion, GSAP, and Lenis smooth scroll.

## Features

- 🎬 **Cinematic hero** — full-screen video background with animated text reveal
- 🛍️ **Full e-commerce** — cart, wishlist, quick view, 4-step checkout
- 💬 **Live chat widget** — real-time fragrance consultant chat
- 📧 **Order confirmation emails** — via EmailJS
- 🖼️ **Sticky scroll section** — image stays fixed while content scrolls (CSS sticky)
- ✨ **Premium animations** — Framer Motion + GSAP ScrollTrigger + Lenis
- 🔒 **Scroll lock** — body scroll locks when any modal is open
- 🌐 **Fully responsive** — mobile, tablet, desktop

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI Library | React 19 + TypeScript |
| Animations | Framer Motion + GSAP + Lenis |
| Styling | Tailwind CSS v4 + CSS Modules |
| Email | EmailJS |
| State | React Context (cart + wishlist) |

## Getting Started

```bash
cd nextjs-app
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Email Setup (Order Confirmations)

1. Sign up at [emailjs.com](https://www.emailjs.com) (free)
2. Create a service (Gmail / Outlook)
3. Create a template using: `{{to_name}}`, `{{to_email}}`, `{{order_number}}`, `{{items_list}}`, `{{grand_total}}`, `{{address}}`
4. Create `nextjs-app/.env.local`:

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

## Project Structure

```
nextjs-app/
├── src/
│   ├── app/           # Next.js App Router pages
│   ├── components/    # Reusable components
│   │   └── sections/  # Page sections
│   ├── hooks/         # Custom React hooks
│   └── lib/           # Store context + product data
└── public/            # Static assets (images, logo)
```

---

**Al Hoorain Aroma** — Premium luxury fragrances. Arabian royal heritage meets Italian craftsmanship.
