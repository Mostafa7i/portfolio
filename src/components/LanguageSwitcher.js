'use client'

import { usePathname, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useTransition } from 'react'
import { useDict } from '@/context/DictionaryContext'

const LANGS = [
  { code: 'en', label: 'English', short: 'EN', flag: '🇺🇸' },
  { code: 'ar', label: 'العربية', short: 'AR', flag: '🇸🇦' },
]

export default function LanguageSwitcher({ mobile = false }) {
  const { lang } = useDict()
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [isPending, startTransition] = useTransition()

  const current = LANGS.find((l) => l.code === lang) || LANGS[0]

  function switchLang(code) {
    if (code === lang) { setOpen(false); return }
    // Replace current locale prefix in pathname
    const segments = pathname.split('/')
    segments[1] = code
    const newPath = segments.join('/')
    setOpen(false)
    // Set cookie so proxy persists the choice
    document.cookie = `NEXT_LOCALE=${code}; path=/; max-age=${60 * 60 * 24 * 365}`
    startTransition(() => router.push(newPath))
  }

  if (mobile) {
    return (
      <div style={{ display: 'flex', gap: '0.4rem' }}>
        {LANGS.map(({ code, short }) => (
          <button
            key={code}
            onClick={() => switchLang(code)}
            aria-label={`Switch to ${code}`}
            style={{
              padding: '0.35rem 0.7rem', borderRadius: '0.5rem', fontSize: '0.78rem',
              fontWeight: 600, cursor: 'pointer', border: 'none',
              background: lang === code ? 'rgba(37,99,235,0.2)' : 'rgba(30,41,59,0.5)',
              color: lang === code ? '#60a5fa' : '#64748b',
              outline: lang === code ? '1px solid rgba(37,99,235,0.3)' : '1px solid rgba(51,65,85,0.4)',
              transition: 'all 0.2s',
            }}
          >
            {short}
          </button>
        ))}
      </div>
    )
  }

  return (
    <div style={{ position: 'relative' }}>
      <motion.button
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Switch language"
        className="glass"
        style={{
          display: 'flex', alignItems: 'center', gap: '0.4rem',
          padding: '0.4rem 0.75rem', borderRadius: '0.65rem',
          fontSize: '0.83rem', fontWeight: 500, color: '#cbd5e1',
          border: '1px solid rgba(51,65,85,0.5)', cursor: 'pointer',
          transition: 'border-color 0.2s',
          opacity: isPending ? 0.6 : 1,
        }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.96 }}
      >
        <span>{current.flag}</span>
        <span>{current.label}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          style={{ fontSize: '0.65rem', opacity: 0.6 }}
        >
          ▼
        </motion.span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <div
              style={{ position: 'fixed', inset: 0, zIndex: 40 }}
              onClick={() => setOpen(false)}
            />
            <motion.ul
              role="listbox"
              initial={{ opacity: 0, y: -6, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.96 }}
              transition={{ duration: 0.18 }}
              className="glass"
              style={{
                position: 'absolute', top: 'calc(100% + 6px)',
                right: 0, zIndex: 50,
                borderRadius: '0.85rem', minWidth: 160,
                overflow: 'hidden', listStyle: 'none',
                border: '1px solid rgba(51,65,85,0.5)',
                boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
              }}
            >
              {LANGS.map(({ code, label, flag }) => {
                const isActive = lang === code
                return (
                  <li key={code}>
                    <button
                      role="option"
                      aria-selected={isActive}
                      onClick={() => switchLang(code)}
                      style={{
                        width: '100%', textAlign: 'start',
                        display: 'flex', alignItems: 'center', gap: '0.65rem',
                        padding: '0.7rem 1rem', fontSize: '0.88rem', fontWeight: 500,
                        background: isActive ? 'rgba(37,99,235,0.12)' : 'transparent',
                        color: isActive ? '#60a5fa' : '#94a3b8',
                        border: 'none', cursor: 'pointer', transition: 'background 0.15s',
                      }}
                      onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.background = 'rgba(30,41,59,0.7)' }}
                      onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.background = 'transparent' }}
                    >
                      <span style={{ fontSize: '1.1rem' }}>{flag}</span>
                      {label}
                      {isActive && (
                        <span style={{ marginInlineStart: 'auto', fontSize: '0.7rem', color: '#60a5fa' }}>✓</span>
                      )}
                    </button>
                  </li>
                )
              })}
            </motion.ul>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
