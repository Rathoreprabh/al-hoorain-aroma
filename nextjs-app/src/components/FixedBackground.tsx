'use client'

/* Decorative fixed layer that sits behind all content.
   Content sections scroll over it, creating a natural depth effect. */
export default function FixedBackground() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      {/* ── Soft ambient cream gradient ── */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background:
          'radial-gradient(ellipse 80% 60% at 20% 30%, rgba(232,223,208,0.55) 0%, transparent 60%),' +
          'radial-gradient(ellipse 60% 50% at 80% 70%, rgba(220,210,190,0.45) 0%, transparent 55%),' +
          'linear-gradient(160deg, #faf7f2 0%, #f5efe4 50%, #f0e8d8 100%)',
      }} />

      {/* ── Central ornamental ring ── */}
      <svg
        viewBox="0 0 900 900"
        style={{
          position: 'absolute',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '90vmin', height: '90vmin',
          opacity: 0.042,
        }}
      >
        {/* Outer ring */}
        <circle cx="450" cy="450" r="420" fill="none" stroke="#b8920e" strokeWidth="1" />
        {/* Inner ring */}
        <circle cx="450" cy="450" r="340" fill="none" stroke="#b8920e" strokeWidth="0.6" />
        {/* Mid ring */}
        <circle cx="450" cy="450" r="260" fill="none" stroke="#b8920e" strokeWidth="0.8" />
        {/* Small ring */}
        <circle cx="450" cy="450" r="160" fill="none" stroke="#b8920e" strokeWidth="0.6" />
        {/* Innermost */}
        <circle cx="450" cy="450" r="80" fill="none" stroke="#b8920e" strokeWidth="0.5" />

        {/* 8-point star / cross lines */}
        {[0, 45, 90, 135].map(deg => (
          <line
            key={deg}
            x1="450" y1="30" x2="450" y2="870"
            stroke="#b8920e" strokeWidth="0.5"
            transform={`rotate(${deg} 450 450)`}
          />
        ))}

        {/* Petals / diamond points at each axis */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
          <ellipse
            key={i}
            cx="450" cy="170"
            rx="14" ry="50"
            fill="none" stroke="#b8920e" strokeWidth="0.6"
            transform={`rotate(${deg} 450 450)`}
          />
        ))}

        {/* Centre dot */}
        <circle cx="450" cy="450" r="6" fill="#b8920e" opacity="0.5" />

        {/* Decorative dots on outer ring (every 30°) */}
        {Array.from({ length: 12 }, (_, i) => {
          const angle = (i * 30 * Math.PI) / 180
          const x = 450 + 420 * Math.sin(angle)
          const y = 450 - 420 * Math.cos(angle)
          return <circle key={i} cx={x} cy={y} r="4" fill="#b8920e" opacity="0.6" />
        })}
      </svg>

      {/* ── Corner gold ornaments ── */}
      {/* Top-left */}
      <svg viewBox="0 0 200 200" style={{ position: 'absolute', top: -20, left: -20, width: 180, height: 180, opacity: 0.055 }}>
        <path d="M200,0 Q100,100 0,200" fill="none" stroke="#b8920e" strokeWidth="1" />
        <path d="M160,0 Q80,80 0,160"  fill="none" stroke="#b8920e" strokeWidth="0.7" />
        <path d="M120,0 Q60,60 0,120"  fill="none" stroke="#b8920e" strokeWidth="0.5" />
        <circle cx="0" cy="0" r="6" fill="#b8920e" />
      </svg>

      {/* Top-right */}
      <svg viewBox="0 0 200 200" style={{ position: 'absolute', top: -20, right: -20, width: 180, height: 180, opacity: 0.055, transform: 'scaleX(-1)' }}>
        <path d="M200,0 Q100,100 0,200" fill="none" stroke="#b8920e" strokeWidth="1" />
        <path d="M160,0 Q80,80 0,160"  fill="none" stroke="#b8920e" strokeWidth="0.7" />
        <path d="M120,0 Q60,60 0,120"  fill="none" stroke="#b8920e" strokeWidth="0.5" />
        <circle cx="0" cy="0" r="6" fill="#b8920e" />
      </svg>

      {/* Bottom-left */}
      <svg viewBox="0 0 200 200" style={{ position: 'absolute', bottom: -20, left: -20, width: 180, height: 180, opacity: 0.055, transform: 'scaleY(-1)' }}>
        <path d="M200,0 Q100,100 0,200" fill="none" stroke="#b8920e" strokeWidth="1" />
        <path d="M160,0 Q80,80 0,160"  fill="none" stroke="#b8920e" strokeWidth="0.7" />
        <path d="M120,0 Q60,60 0,120"  fill="none" stroke="#b8920e" strokeWidth="0.5" />
        <circle cx="0" cy="0" r="6" fill="#b8920e" />
      </svg>

      {/* Bottom-right */}
      <svg viewBox="0 0 200 200" style={{ position: 'absolute', bottom: -20, right: -20, width: 180, height: 180, opacity: 0.055, transform: 'scale(-1,-1)' }}>
        <path d="M200,0 Q100,100 0,200" fill="none" stroke="#b8920e" strokeWidth="1" />
        <path d="M160,0 Q80,80 0,160"  fill="none" stroke="#b8920e" strokeWidth="0.7" />
        <path d="M120,0 Q60,60 0,120"  fill="none" stroke="#b8920e" strokeWidth="0.5" />
        <circle cx="0" cy="0" r="6" fill="#b8920e" />
      </svg>

      {/* ── Right-side perfume bottle silhouette ── */}
      <svg
        viewBox="0 0 120 340"
        style={{
          position: 'absolute',
          right: '6%', top: '50%',
          transform: 'translateY(-50%)',
          height: '55vh', width: 'auto',
          opacity: 0.035,
        }}
      >
        {/* Cap */}
        <rect x="42" y="0" width="36" height="28" rx="4" fill="#b8920e" />
        {/* Neck */}
        <rect x="48" y="28" width="24" height="52" rx="2" fill="#b8920e" />
        {/* Shoulder */}
        <path d="M36,80 L84,80 L92,108 L28,108 Z" fill="#b8920e" />
        {/* Body */}
        <rect x="24" y="108" width="72" height="192" rx="8" fill="#b8920e" />
        {/* Label area */}
        <rect x="32" y="150" width="56" height="80" rx="3" fill="none" stroke="#b8920e" strokeWidth="1.5" />
        {/* Base */}
        <rect x="18" y="300" width="84" height="18" rx="4" fill="#b8920e" />
        {/* Shine */}
        <rect x="32" y="115" width="8" height="120" rx="4" fill="#fff" opacity="0.4" />
      </svg>
    </div>
  )
}
