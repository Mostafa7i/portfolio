'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FiChevronLeft, FiChevronRight, FiMaximize2, FiX, FiCamera } from 'react-icons/fi'
import { useDict } from '@/context/DictionaryContext'

/* ─── 38 Codax session images ─────────────────────────────────────────────── */
const IMAGES = [
  '/كوداكس/IMG_٢٠٢٣١٢٠٧_٠٠٤٦٣٤.jpg',
  '/كوداكس/IMG_٢٠٢٣١٢٠٧_٠٠٤٧١١.jpg',
  '/كوداكس/IMG_٢٠٢٣١٢٠٧_٠٠٤٩١٣.jpg',
  '/كوداكس/IMG_٢٠٢٣١٢٠٧_٠٠٤٩٣١.jpg',
  '/كوداكس/IMG_٢٠٢٣١٢٠٧_٠٠٥٠٢٠.jpg',
  '/كوداكس/IMG_٢٠٢٣١٢٠٧_٠١٣٧٢٧.jpg',
  '/كوداكس/IMG_٢٠٢٥١٢١٦_٢٢٣٨٠٣.jpg',
  '/كوداكس/IMG_٢٠٢٦٠٢٠٩_١٦٤٦٥٤.jpg',
  '/كوداكس/IMG_٢٠٢٦٠٧١٩_١٩٣٧٣٣.jpg',
  '/كوداكس/IMG_٢٠٢٦٠٧١٩_١٩٣٧٥٢.jpg',
  '/كوداكس/IMG_٢٠٢٦٠٧١٩_١٩٣٨٢٧.jpg',
  '/كوداكس/IMG_٢٠٢٦٠٧١٩_١٩٣٨٤٥.jpg',
  '/كوداكس/IMG_٢٠٢٦٠٧١٩_١٩٣٩٠١.jpg',
  '/كوداكس/IMG_٢٠٢٦٠٧١٩_١٩٣٩١٥.jpg',
  '/كوداكس/Screenshot_٢٠٢٣-١٢-٠٧-٠١-١٥-٣٣-٨٢_6012fa4d4ddec268fc5c7112cbb265e7.jpg',
  '/كوداكس/Screenshot_٢٠٢٣-١٢-٠٧-٠١-١٥-٥٢-٠٥_6012fa4d4ddec268fc5c7112cbb265e7.jpg',
  '/كوداكس/Screenshot_٢٠٢٣-١٢-٠٧-١٧-٠٣-٥٥-٢٣_6012fa4d4ddec268fc5c7112cbb265e7.jpg',
  '/كوداكس/Screenshot_٢٠٢٥-٠٩-١٣-٢٢-٤٢-٢٣-١٢_b783bf344239542886fee7b48fa4b892.jpg',
  '/كوداكس/Screenshot_٢٠٢٥-١٢-١٦-٢١-٣٨-١٤-٤٤_40deb401b9ffe8e1df2f1cc5ba480b12.jpg',
  '/كوداكس/Screenshot_٢٠٢٥-١٢-١٦-٢١-٥٥-٥١-٤٥_6012fa4d4ddec268fc5c7112cbb265e7.jpg',
  '/كوداكس/Screenshot_٢٠٢٥-١٢-١٦-٢٣-٠٦-٠٦-٥٢_6012fa4d4ddec268fc5c7112cbb265e7.jpg',
  '/كوداكس/Screenshot_٢٠٢٥-١٢-١٦-٢٣-٠٨-٢٠-٩٩_6012fa4d4ddec268fc5c7112cbb265e7.jpg',
  '/كوداكس/Screenshot_٢٠٢٥-١٢-١٦-٢٣-١١-٤١-٩٤_6012fa4d4ddec268fc5c7112cbb265e7.jpg',
  '/كوداكس/Screenshot_٢٠٢٥-١٢-١٦-٢٣-٢٥-٣٩-٧٧_6012fa4d4ddec268fc5c7112cbb265e7.jpg',
  '/كوداكس/Screenshot_٢٠٢٥-١٢-١٦-٢٣-٥٣-٠٦-٥٨_6012fa4d4ddec268fc5c7112cbb265e7.jpg',
  '/كوداكس/Screenshot_٢٠٢٥-١٢-١٧-٠٠-١٥-٠٩-١٥_6012fa4d4ddec268fc5c7112cbb265e7.jpg',
  '/كوداكس/Screenshot_٢٠٢٥-١٢-١٧-٠٠-١٨-٣٦-٦٢_6012fa4d4ddec268fc5c7112cbb265e7.jpg',
  '/كوداكس/Screenshot_٢٠٢٥-١٢-١٧-٠١-٠٣-٢٣-٥١_6012fa4d4ddec268fc5c7112cbb265e7.jpg',
  '/كوداكس/Screenshot_٢٠٢٥-١٢-١٧-٠١-٠٥-٣٠-٣٤_6012fa4d4ddec268fc5c7112cbb265e7.jpg',
  '/كوداكس/Screenshot_٢٠٢٥-١٢-١٧-١٣-٥٦-٤٩-٥١_6012fa4d4ddec268fc5c7112cbb265e7.jpg',
  '/كوداكس/Screenshot_٢٠٢٥-١٢-١٧-١٣-٥٩-١٤-٣٢_6012fa4d4ddec268fc5c7112cbb265e7.jpg',
  '/كوداكس/Screenshot_٢٠٢٥-١٢-١٧-١٧-٣٩-١٤-٦٩_6012fa4d4ddec268fc5c7112cbb265e7.jpg',
  '/كوداكس/Screenshot_٢٠٢٥-١٢-١٧-١٧-٤٠-١٨-٤٩_6012fa4d4ddec268fc5c7112cbb265e7.jpg',
  '/كوداكس/Screenshot_٢٠٢٥-١٢-١٧-١٧-٤٣-١٤-٨٤_6012fa4d4ddec268fc5c7112cbb265e7.jpg',
  '/كوداكس/Screenshot_٢٠٢٥-١٢-١٧-٢٠-٢٧-٠٢-٨٣_6012fa4d4ddec268fc5c7112cbb265e7.jpg',
  '/كوداكس/Screenshot_٢٠٢٥-١٢-١٧-٢٣-٥٨-٥٥-١٧_6012fa4d4ddec268fc5c7112cbb265e7.jpg',
  '/كوداكس/Screenshot_٢٠٢٦-٠٥-٠١-٠٠-٥٥-٥١-٥٣_6012fa4d4ddec268fc5c7112cbb265e7.jpg',
  '/كوداكس/Screenshot_٢٠٢٦-٠٧-٠٢-١٦-١٨-٥٥-٩٤_6012fa4d4ddec268fc5c7112cbb265e7.jpg',
]

/* ─── Slide animation variants ─────────────────────────────────────────────── */
const slideVariants = {
  enter: (dir) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
  center: { x: 0, opacity: 1, transition: { duration: 0.3, ease: 'easeOut' } },
  exit: (dir) => ({ x: dir > 0 ? -80 : 80, opacity: 0, transition: { duration: 0.2, ease: 'easeIn' } }),
}

/* ─── Fullscreen Overlay ───────────────────────────────────────────────────── */
function FullscreenOverlay({ src, onClose }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'rgba(5,10,20,0.97)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
        padding: '1.5rem',
        cursor: 'zoom-out',
      }}
    >
      <button
        onClick={onClose}
        aria-label="Close"
        style={{
          position: 'absolute', top: 18, right: 18, zIndex: 10,
          width: 44, height: 44, borderRadius: '50%',
          background: 'rgba(255,255,255,0.09)',
          border: '1px solid rgba(255,255,255,0.18)',
          color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer',
        }}
      >
        <FiX size={20} />
      </button>
      <motion.div
        initial={{ scale: 0.92 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.92 }}
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '92vw', maxHeight: '90vh', cursor: 'default' }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt="Full size session photo"
          style={{
            maxWidth: '100%', maxHeight: '90vh',
            objectFit: 'contain', display: 'block',
            borderRadius: '0.75rem',
            boxShadow: '0 40px 100px rgba(0,0,0,0.8)',
          }}
        />
      </motion.div>
    </motion.div>
  )
}

/* ─── Main Component ───────────────────────────────────────────────────────── */
export default function TestimonialsSection() {
  const { dict } = useDict()
  const d = (k, fb) => dict[k] || fb

  const { ref: sectionRef, inView } = useInView({ triggerOnce: true, threshold: 0.04 })

  const [cur, setCur]           = useState(0)
  const [direction, setDir]     = useState(1)
  const [fullscreen, setFull]   = useState(false)
  const [thumbHover, setHover]  = useState(null)

  const thumbsRef      = useRef(null)
  const activeThumbRef = useRef(null)

  /* Auto-scroll thumbnail strip to keep active thumb centred */
  useEffect(() => {
    if (activeThumbRef.current) {
      activeThumbRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
    }
  }, [cur])

  const goTo = useCallback((i) => {
    setDir(i > cur ? 1 : -1)
    setCur(i)
  }, [cur])

  const prev = useCallback(() => {
    setDir(-1)
    setCur((c) => (c - 1 + IMAGES.length) % IMAGES.length)
  }, [])

  const next = useCallback(() => {
    setDir(1)
    setCur((c) => (c + 1) % IMAGES.length)
  }, [])

  /* Keyboard navigation */
  useEffect(() => {
    const onKey = (e) => {
      if (fullscreen) return
      if (e.key === 'ArrowLeft')  prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [prev, next, fullscreen])

  /* ─── NavButton helper ─── */
  const NavBtn = ({ onClick, ariaLabel, children, side }) => {
    const [h, setH] = useState(false)
    return (
      <button
        onClick={onClick}
        aria-label={ariaLabel}
        onMouseEnter={() => setH(true)}
        onMouseLeave={() => setH(false)}
        style={{
          position: 'absolute',
          top: '50%', transform: 'translateY(-50%)',
          [side]: 14,
          zIndex: 6,
          width: 46, height: 46,
          borderRadius: '50%',
          background: h ? 'rgba(37,99,235,0.85)' : 'rgba(10,16,30,0.65)',
          border: '1px solid rgba(255,255,255,0.18)',
          color: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer',
          backdropFilter: 'blur(8px)',
          boxShadow: h ? '0 0 20px rgba(37,99,235,0.4)' : '0 4px 16px rgba(0,0,0,0.4)',
          transition: 'all 0.2s',
        }}
      >
        {children}
      </button>
    )
  }

  return (
    <section id="testimonials" className="section-wrapper" style={{ position: 'relative' }}>

      {/* Subtle background glow */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(37,99,235,0.07) 0%, transparent 70%)',
      }} />

      <div className="container" style={{ position: 'relative' }}>
        <motion.div
          ref={sectionRef}
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
        >

          {/* ── Section Header ── */}
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span className="section-label">{d('testimonials.label', 'Student Gallery')}</span>
            <h2 className="section-title">
              {d('testimonials.title', 'What')}{' '}
              <span className="gradient-text">{d('testimonials.title.accent', 'Students Say')}</span>
            </h2>
            <p style={{ color: '#64748b', maxWidth: 500, margin: '0 auto 1rem', fontSize: '0.91rem', lineHeight: 1.7 }}>
              {d('testimonials.subtitle', 'Real moments from Codax Academy training sessions — where developers are made.')}
            </p>
            <div className="section-divider" />
          </div>

          {/* ── Stats badges ── */}
          <div style={{
            display: 'flex', flexWrap: 'wrap', justifyContent: 'center',
            gap: '0.55rem', marginBottom: '2.5rem',
          }}>
            {[
              { emoji: '🎓', text: d('testimonials.badge1', '1000+ Students Trained') },
              { emoji: '⭐', text: d('testimonials.badge2', '95% Satisfaction Rate') },
              { emoji: '📸', text: d('testimonials.badge3', 'Real Session Photos') },
            ].map((b) => (
              <span key={b.text} style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                padding: '0.38rem 1rem', borderRadius: 9999,
                background: 'rgba(37,99,235,0.09)',
                border: '1px solid rgba(37,99,235,0.22)',
                color: '#93c5fd', fontSize: '0.79rem', fontWeight: 600,
              }}>
                {b.emoji} {b.text}
              </span>
            ))}
          </div>

          {/* ══════════════════════════════════════════════════
              GOOGLE PHOTOS-STYLE VIEWER
          ══════════════════════════════════════════════════ */}
          <div style={{
            borderRadius: '1.25rem',
            overflow: 'hidden',
            border: '1px solid rgba(51,65,85,0.55)',
            boxShadow: '0 30px 70px rgba(0,0,0,0.45)',
            background: '#07101e',
          }}>

            {/* ─ Top bar: counter + fullscreen ─ */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '0.65rem 1.1rem',
              background: 'rgba(10,16,30,0.95)',
              borderBottom: '1px solid rgba(51,65,85,0.35)',
            }}>
              {/* Progress pills */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <FiCamera size={14} color="#60a5fa" />
                <span style={{ color: '#94a3b8', fontSize: '0.82rem', fontWeight: 500 }}>
                  <span style={{ color: '#e2e8f0', fontWeight: 700 }}>{cur + 1}</span>
                  {' '}/ {IMAGES.length}
                </span>
              </div>

              {/* Progress bar */}
              <div style={{
                flex: 1, maxWidth: 200, height: 3,
                background: 'rgba(51,65,85,0.6)',
                borderRadius: 9999, margin: '0 1rem',
                overflow: 'hidden',
              }}>
                <div style={{
                  height: '100%',
                  width: `${((cur + 1) / IMAGES.length) * 100}%`,
                  background: 'linear-gradient(90deg, #2563EB, #14B8A6)',
                  borderRadius: 9999,
                  transition: 'width 0.3s ease',
                }} />
              </div>

              {/* Fullscreen button */}
              <button
                onClick={() => setFull(true)}
                aria-label="View fullscreen"
                title="View fullscreen"
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.35rem',
                  padding: '0.3rem 0.75rem',
                  borderRadius: '0.5rem',
                  background: 'rgba(37,99,235,0.12)',
                  border: '1px solid rgba(37,99,235,0.3)',
                  color: '#60a5fa', fontSize: '0.75rem', fontWeight: 600,
                  cursor: 'pointer', transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(37,99,235,0.25)' }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(37,99,235,0.12)' }}
              >
                <FiMaximize2 size={13} />
                <span style={{ display: 'inline' }}>Fullscreen</span>
              </button>
            </div>

            {/* ─ Main image stage ─ */}
            <div style={{
              position: 'relative',
              background: '#05090f',
              height: 'clamp(260px, 55vh, 540px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              overflow: 'hidden',
              cursor: 'pointer',
            }}
              onClick={() => setFull(true)}
            >
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={cur}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    width: '100%', height: '100%',
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={IMAGES[cur]}
                    alt={`Codax Academy session photo ${cur + 1}`}
                    style={{
                      maxWidth: '100%',
                      maxHeight: '100%',
                      objectFit: 'contain',
                      display: 'block',
                      userSelect: 'none',
                      pointerEvents: 'none',
                    }}
                  />
                </motion.div>
              </AnimatePresence>

              {/* Prev / Next */}
              <NavBtn onClick={(e) => { e.stopPropagation(); prev() }} ariaLabel="Previous photo" side="left">
                <FiChevronLeft size={22} />
              </NavBtn>
              <NavBtn onClick={(e) => { e.stopPropagation(); next() }} ariaLabel="Next photo" side="right">
                <FiChevronRight size={22} />
              </NavBtn>

              {/* Keyboard hint — fades after 4s */}
              <div style={{
                position: 'absolute', bottom: 12, left: '50%', transform: 'translateX(-50%)',
                color: 'rgba(255,255,255,0.3)', fontSize: '0.7rem',
                display: 'flex', gap: '0.4rem', alignItems: 'center',
                pointerEvents: 'none', userSelect: 'none',
              }}>
                <kbd style={{ padding: '1px 5px', borderRadius: 4, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', fontFamily: 'inherit' }}>←</kbd>
                <kbd style={{ padding: '1px 5px', borderRadius: 4, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', fontFamily: 'inherit' }}>→</kbd>
                <span>navigate</span>
              </div>
            </div>

            {/* ─ Thumbnail strip ─ */}
            <div
              ref={thumbsRef}
              style={{
                display: 'flex',
                gap: '0.45rem',
                overflowX: 'auto',
                padding: '0.75rem 0.85rem',
                background: 'rgba(8,14,26,0.98)',
                borderTop: '1px solid rgba(51,65,85,0.4)',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
              }}
            >
              {IMAGES.map((src, i) => {
                const isActive = i === cur
                return (
                  <button
                    key={i}
                    ref={isActive ? activeThumbRef : null}
                    onClick={() => goTo(i)}
                    onMouseEnter={() => setHover(i)}
                    onMouseLeave={() => setHover(null)}
                    aria-label={`Go to photo ${i + 1}`}
                    aria-current={isActive ? 'true' : undefined}
                    style={{
                      flexShrink: 0,
                      width: 68, height: 68,
                      borderRadius: '0.5rem',
                      overflow: 'hidden',
                      padding: 0,
                      cursor: 'pointer',
                      border: isActive
                        ? '2.5px solid #2563EB'
                        : thumbHover === i
                          ? '2px solid rgba(37,99,235,0.45)'
                          : '2px solid rgba(51,65,85,0.35)',
                      opacity: isActive ? 1 : thumbHover === i ? 0.85 : 0.5,
                      transform: isActive ? 'scale(1.07)' : thumbHover === i ? 'scale(1.03)' : 'scale(1)',
                      transition: 'all 0.18s ease',
                      boxShadow: isActive ? '0 0 14px rgba(37,99,235,0.55)' : 'none',
                      background: '#0a1220',
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={src}
                      alt=""
                      aria-hidden="true"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', pointerEvents: 'none' }}
                    />
                  </button>
                )
              })}
            </div>

          </div>{/* end viewer card */}

          {/* ── Hint ── */}
          <p style={{
            textAlign: 'center', marginTop: '1.25rem',
            color: '#475569', fontSize: '0.78rem',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem',
          }}>
            <FiCamera size={13} />
            {d('testimonials.hint', 'Click any photo to view full screen')}
          </p>

        </motion.div>
      </div>

      {/* ── Fullscreen overlay ── */}
      <AnimatePresence>
        {fullscreen && (
          <FullscreenOverlay src={IMAGES[cur]} onClose={() => setFull(false)} />
        )}
      </AnimatePresence>
    </section>
  )
}
