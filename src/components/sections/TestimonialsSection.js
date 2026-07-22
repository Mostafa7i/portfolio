'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FiChevronLeft, FiChevronRight, FiMaximize2, FiX } from 'react-icons/fi'
import { useDict } from '@/context/DictionaryContext'


const screenshots = [
  { id: 1, url: '/feedback1.png', name: 'WhatsApp Feedback 1' },
  { id: 2, url: '/feedback2.png', name: 'LinkedIn Feedback' },
]

const containerV = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } }
const itemV = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }

export default function TestimonialsSection() {
  const { dict, lang } = useDict()
  const d = (k, fb) => dict[k] || fb
  const [cur, setCur] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.08 })

  const prevSlide = () => {
    setCur((c) => (c - 1 + screenshots.length) % screenshots.length)
  }

  const nextSlide = () => {
    setCur((c) => (c + 1) % screenshots.length)
  }

  const activeImage = screenshots[cur]

  return (
    <section id="testimonials" className="section-wrapper" style={{ position: 'relative' }}>
      <div style={{ background: 'linear-gradient(180deg, transparent, rgba(30,41,59,0.14), transparent)', position: 'absolute', inset: 0 }} aria-hidden="true" />

      <div className="container" style={{ position: 'relative' }}>
        <motion.div ref={ref} variants={containerV} initial="hidden" animate={inView ? 'visible' : 'hidden'}>

          {/* Header */}
          <motion.div variants={itemV} style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="section-label">{d('testimonials.label', 'Student Feedback')}</span>
            <h2 className="section-title">
              {d('testimonials.title', 'What')}{' '}
              <span className="gradient-text">{d('testimonials.title.accent', 'Students Say')}</span>
            </h2>
            <div className="section-divider" />
          </motion.div>

          {/* Centered Screenshot Slider */}
          <motion.div variants={itemV} style={{ maxWidth: 500, margin: '0 auto', position: 'relative' }}>
            <AnimatePresence mode="wait">
              {activeImage && (
                <motion.div
                  key={activeImage.id}
                  className="card"
                  style={{
                    padding: '1rem',
                    position: 'relative',
                    overflow: 'hidden',
                    borderRadius: '1.25rem',
                    background: 'rgba(30, 41, 59, 0.25)',
                    border: '1px solid rgba(51, 65, 85, 0.5)',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  initial={{ opacity: 0, x: lang === 'ar' ? -40 : 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: lang === 'ar' ? 40 : -40 }}
                  transition={{ duration: 0.35, ease: 'easeInOut' }}
                  onClick={() => setLightboxOpen(true)}
                  whileHover={{ scale: 1.01 }}
                >
                  {/* Image Display */}
                  <div style={{ position: 'relative', width: '100%', aspectRatio: '3/4', borderRadius: '0.85rem', overflow: 'hidden' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={activeImage.url}
                      alt={activeImage.name}
                      style={{ width: '100%', height: '100%', objectFit: 'contain', background: '#0a0f1d' }}
                    />
                    
                    {/* Zoom Icon Hint on Hover */}
                    <div
                      className="zoom-hover-overlay"
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'rgba(15,23,42,0.4)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        opacity: 0,
                        transition: 'opacity 0.2s ease',
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.opacity = 1}
                      onMouseLeave={(e) => e.currentTarget.style.opacity = 0}
                    >
                      <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', border: '1px solid rgba(255,255,255,0.2)', backdropFilter: 'blur(4px)' }}>
                        <FiMaximize2 size={20} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Slider Controls */}
            {screenshots.length > 1 && (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.25rem', marginTop: '1.75rem' }}>
                <button
                  onClick={prevSlide}
                  aria-label="Previous screenshot"
                  className="glass"
                  style={{
                    width: 44, height: 44, borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#94a3b8', cursor: 'pointer',
                    border: '1px solid rgba(51,65,85,0.5)',
                    background: 'rgba(30,41,59,0.4)',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = '#2563EB' }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = '#94a3b8'; e.currentTarget.style.borderColor = 'rgba(51,65,85,0.5)' }}
                >
                  <FiChevronLeft size={20} />
                </button>

                {/* Dot Indicators */}
                <div style={{ display: 'flex', gap: '0.45rem' }}>
                  {screenshots.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCur(i)}
                      aria-label={`Go to screenshot ${i + 1}`}
                      style={{
                        height: 8,
                        borderRadius: 9999,
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        width: i === cur ? 28 : 8,
                        background: i === cur ? '#2563EB' : '#334155'
                      }}
                    />
                  ))}
                </div>

                <button
                  onClick={nextSlide}
                  aria-label="Next screenshot"
                  className="glass"
                  style={{
                    width: 44, height: 44, borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#94a3b8', cursor: 'pointer',
                    border: '1px solid rgba(51,65,85,0.5)',
                    background: 'rgba(30,41,59,0.4)',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = '#2563EB' }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = '#94a3b8'; e.currentTarget.style.borderColor = 'rgba(51,65,85,0.5)' }}
                >
                  <FiChevronRight size={20} />
                </button>
              </div>
            )}
          </motion.div>

        </motion.div>
      </div>

      {/* Full Screen Lightbox Overlay */}
      <AnimatePresence>
        {lightboxOpen && activeImage && (
          <motion.div
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 999,
              background: 'rgba(15,23,42,0.96)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '2rem',
              backdropFilter: 'blur(12px)'
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxOpen(false)}
          >
            {/* Close button */}
            <button
              onClick={() => setLightboxOpen(false)}
              aria-label="Close Lightbox"
              style={{
                position: 'absolute', top: 20, right: 20,
                width: 44, height: 44, borderRadius: '50%',
                background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
                color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', zIndex: 10
              }}
            >
              <FiX size={20} />
            </button>

            {/* Navigation buttons inside Lightbox */}
            {screenshots.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    prevSlide()
                  }}
                  aria-label="Previous image"
                  style={{
                    position: 'absolute', left: 20,
                    width: 44, height: 44, borderRadius: '50%',
                    background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
                    color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', zIndex: 10
                  }}
                >
                  <FiChevronLeft size={20} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    nextSlide()
                  }}
                  aria-label="Next image"
                  style={{
                    position: 'absolute', right: 20,
                    width: 44, height: 44, borderRadius: '50%',
                    background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
                    color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', zIndex: 10
                  }}
                >
                  <FiChevronRight size={20} />
                </button>
              </>
            )}

            {/* Image Container */}
            <motion.div
              style={{
                position: 'relative',
                maxWidth: '90%',
                maxHeight: '85vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={activeImage.url}
                alt={activeImage.name}
                style={{
                  maxWidth: '100%',
                  maxHeight: '85vh',
                  objectFit: 'contain',
                  borderRadius: '0.75rem',
                  boxShadow: '0 25px 50px -12px rgba(0,0,0,0.6)'
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
