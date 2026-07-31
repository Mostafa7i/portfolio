'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiChevronLeft, FiChevronRight, FiX, FiCamera } from 'react-icons/fi'
import { useDict } from '@/context/DictionaryContext'

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
  '/كوداكس/Screenshot_٢٠٢٣-١٢-٠٧-٠١-١٥-٣٣-٨٢_6012fa4d4ddec268fc5c7112cbb265e7.jpg',
  '/كوداكس/Screenshot_٢٠٢٥-١٢-١٦-٢١-٣٨-١٤-٤٤_40deb401b9ffe8e1df2f1cc5ba480b12.jpg',
  '/كوداكس/Screenshot_٢٠٢٥-١٢-١٦-٢٣-٠٦-٠٦-٥٢_6012fa4d4ddec268fc5c7112cbb265e7.jpg',
  '/كوداكس/Screenshot_٢٠٢٥-١٢-١٧-٠٠-١٥-٠٩-١٥_6012fa4d4ddec268fc5c7112cbb265e7.jpg',
]

const slideVariants = {
  enter: (dir) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
  center: { x: 0, opacity: 1, transition: { duration: 0.28, ease: 'easeOut' } },
  exit: (dir) => ({ x: dir > 0 ? -60 : 60, opacity: 0, transition: { duration: 0.18, ease: 'easeIn' } }),
}

export default function TestimonialsPopup() {
  const { dict } = useDict()
  const d = (k, fb) => dict[k] || fb

  const [isOpen, setIsOpen] = useState(false)
  const [cur, setCur] = useState(0)
  const [direction, setDir] = useState(1)

  useEffect(() => {
    // Open modal automatically on page mount
    const timer = setTimeout(() => setIsOpen(true), 300)
    return () => clearTimeout(timer)
  }, [])

  const closePopup = useCallback(() => {
    setIsOpen(false)
  }, [])

  const prev = useCallback(() => {
    setDir(-1)
    setCur((c) => (c - 1 + IMAGES.length) % IMAGES.length)
  }, [])

  const next = useCallback(() => {
    setDir(1)
    setCur((c) => (c + 1) % IMAGES.length)
  }, [])

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e) => {
      if (e.key === 'Escape') closePopup()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, closePopup, prev, next])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[999] flex items-center justify-center p-3 sm:p-5"
          style={{
            background: 'rgba(11, 17, 32, 0.82)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
          }}
          onClick={closePopup}
        >
          <motion.div
            initial={{ scale: 0.9, y: 25, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 280 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto glass-dark rounded-2xl border border-slate-700/60 p-4 sm:p-6 shadow-2xl"
          >
            {/* Close Button */}
            <button
              onClick={closePopup}
              aria-label="Close popup"
              className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 w-9 h-9 rounded-full bg-slate-800/80 hover:bg-red-500/20 border border-slate-700 hover:border-red-500/40 text-slate-300 hover:text-red-400 flex items-center justify-center transition-all cursor-pointer"
            >
              <FiX size={19} />
            </button>

            {/* Header */}
            <div className="text-center mb-4 pr-6 pl-2 sm:pr-0">
              <span className="section-label text-xs sm:text-sm">{d('testimonials.label', 'Student Gallery')}</span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white">
                {d('testimonials.title', 'What')}{' '}
                <span className="gradient-text">{d('testimonials.title.accent', 'Students Say')}</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-md mx-auto">
                {d('testimonials.subtitle', 'Real moments from Codax Academy training sessions.')}
              </p>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/25 text-blue-300 text-xs font-medium">
                🎓 {d('testimonials.badge1', '1000+ Students Trained')}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/25 text-teal-300 text-xs font-medium">
                ⭐ {d('testimonials.badge2', '95% Satisfaction Rate')}
              </span>
            </div>

            {/* Viewer Stage */}
            <div className="relative rounded-xl overflow-hidden bg-slate-950 border border-slate-800 h-[220px] sm:h-[340px] flex items-center justify-center">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={cur}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="w-full h-full flex items-center justify-center"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={IMAGES[cur]}
                    alt={`Student testimonial photo ${cur + 1}`}
                    className="max-w-full max-h-full object-contain pointer-events-none select-none"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Prev / Next controls */}
              <button
                onClick={prev}
                aria-label="Previous"
                className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/40 hover:bg-blue-600/30 border border-white/10 text-white flex items-center justify-center transition-all cursor-pointer"
              >
                <FiChevronLeft size={20} />
              </button>
              <button
                onClick={next}
                aria-label="Next"
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/40 hover:bg-blue-600/30 border border-white/10 text-white flex items-center justify-center transition-all cursor-pointer"
              >
                <FiChevronRight size={20} />
              </button>

              {/* Counter badge */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-md bg-black/60 border border-white/10 text-[11px] text-slate-300">
                <FiCamera className="inline mr-1 text-blue-400" size={12} />
                <span>{cur + 1} / {IMAGES.length}</span>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
              <p className="text-xs text-slate-400 text-center sm:text-left">
                {d('testimonials.hint', 'Click next or navigate using arrow keys')}
              </p>
              <button
                onClick={closePopup}
                className="btn-primary w-full sm:w-auto px-6 py-2 text-sm justify-center"
              >
                {d('popup.continue', 'Continue to Portfolio')} →
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
