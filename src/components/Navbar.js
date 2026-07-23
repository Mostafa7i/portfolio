'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMenu, FiX, FiCode } from 'react-icons/fi'
import { useDict } from '@/context/DictionaryContext'
import LanguageSwitcher from '@/components/LanguageSwitcher'

const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

export default function Navbar() {
  const { dict, lang } = useDict()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')

  const navLinks = [
    { href: 'about', label: dict['nav.about'] || 'About' },
    { href: 'skills', label: dict['nav.skills'] || 'Skills' },
    { href: 'projects', label: dict['nav.projects'] || 'Projects' },
    { href: 'experience', label: dict['nav.experience'] || 'Experience' },
    { href: 'contact', label: dict['nav.contact'] || 'Contact' },
  ]

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24)
      const reversed = [...navLinks].reverse()
      for (const { href } of reversed) {
        const el = document.getElementById(href)
        if (el && el.getBoundingClientRect().top <= 110) { setActive(href); return }
      }
      setActive('')
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [lang])

  const handleNav = (id) => { setOpen(false); scrollTo(id) }

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        transition: 'background 0.3s, border-color 0.3s, box-shadow 0.3s',
        background: scrolled ? 'rgba(15,23,42,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(18px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(18px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(51,65,85,0.45)' : '1px solid transparent',
        boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.25)' : 'none',
      }}
    >
      <nav
        style={{
          maxWidth: '80rem', margin: '0 auto',
          padding: '0 1.25rem',
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', height: 66,
        }}
      >
        {/* Logo */}
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
        >
          <div style={{ width: 36, height: 36, borderRadius: '0.6rem', background: 'linear-gradient(135deg,#2563EB,#14B8A6)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 18px rgba(37,99,235,0.35)' }}>
            <FiCode color="#fff" size={17} />
          </div>
          <span style={{ fontWeight: 800, fontSize: '1.1rem', color: '#f1f5f9' }}>
            Mostafa<span className="gradient-text">.</span>
          </span>
        </motion.button>

        {/* Desktop nav */}
        <div className="desktop-nav" style={{ display: 'none', alignItems: 'center', gap: '0.15rem' }}>
          {navLinks.map(({ href, label }) => {
            const isActive = active === href
            return (
              <motion.button
                key={href}
                onClick={() => handleNav(href)}
                style={{
                  position: 'relative', padding: '0.45rem 0.85rem',
                  borderRadius: '0.5rem', border: 'none', cursor: 'pointer',
                  background: isActive ? 'rgba(37,99,235,0.1)' : 'transparent',
                  color: isActive ? '#60a5fa' : '#94a3b8',
                  fontSize: '0.87rem', fontWeight: 500,
                  transition: 'color 0.2s, background 0.2s',
                  outline: isActive ? '1px solid rgba(37,99,235,0.22)' : '1px solid transparent',
                }}
                whileHover={{ color: '#e2e8f0', scale: 1.04 }}
                whileTap={{ scale: 0.95 }}
              >
                {label}
              </motion.button>
            )
          })}

          {/* Separator */}
          <div style={{ width: 1, height: 20, background: 'rgba(51,65,85,0.5)', margin: '0 0.5rem' }} />

          {/* Language Switcher */}
          <LanguageSwitcher />

          {/* ⚠️ Place your CV at /public/resume.pdf to enable this button */}
          <motion.a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{ marginInlineStart: '0.65rem', padding: '0.5rem 1.15rem', fontSize: '0.85rem', textDecoration: 'none' }}
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          >
            {dict['nav.resume'] || 'Resume'}
          </motion.a>
        </div>

        {/* Mobile toggle */}
        <motion.button
          onClick={() => setOpen(!open)}
          className="mobile-nav-btn"
          style={{ display: 'none', width: 40, height: 40, borderRadius: '0.6rem', border: '1px solid rgba(51,65,85,0.5)', background: 'rgba(30,41,59,0.5)', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#94a3b8' }}
          whileTap={{ scale: 0.9 }}
        >
          {open ? <FiX size={20} /> : <FiMenu size={20} />}
        </motion.button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28 }}
            style={{ overflow: 'hidden', background: 'rgba(15,23,42,0.96)', backdropFilter: 'blur(20px)', borderTop: '1px solid rgba(51,65,85,0.4)' }}
          >
            <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              {navLinks.map(({ href, label }, i) => (
                <motion.button
                  key={href}
                  initial={{ opacity: 0, x: lang === 'ar' ? 16 : -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  onClick={() => handleNav(href)}
                  style={{
                    textAlign: lang === 'ar' ? 'right' : 'left',
                    padding: '0.75rem 1rem', borderRadius: '0.65rem',
                    border: active === href ? '1px solid rgba(37,99,235,0.3)' : '1px solid transparent',
                    background: active === href ? 'rgba(37,99,235,0.1)' : 'transparent',
                    color: active === href ? '#60a5fa' : '#94a3b8',
                    fontSize: '0.9rem', fontWeight: 500, cursor: 'pointer',
                  }}
                >
                  {label}
                </motion.button>
              ))}

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.5rem', paddingTop: '0.75rem', borderTop: '1px solid rgba(51,65,85,0.3)' }}>
                <LanguageSwitcher mobile />
                <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ fontSize: '0.83rem', textDecoration: 'none' }}>
                  {dict['nav.resume'] || 'Resume'}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (min-width: 768px) {
          .desktop-nav { display: flex !important; }
          .mobile-nav-btn { display: none !important; }
        }
        @media (max-width: 767px) {
          .desktop-nav { display: none !important; }
          .mobile-nav-btn { display: flex !important; }
        }
      `}</style>
    </motion.header>
  )
}
