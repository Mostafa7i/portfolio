'use client'

import { motion } from 'framer-motion'
import { FiGithub, FiLinkedin, FiMail, FiCode } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'
import { useDict } from '@/context/DictionaryContext'

const socials = [
  { icon: FiGithub,   href: 'https://github.com/Mostafa7i',                   label: 'GitHub' },
  { icon: FiLinkedin, href: 'https://linkedin.com/in/mostafa',     label: 'LinkedIn' },
  { icon: FaWhatsapp, href: 'https://wa.me/201551440272',                      label: 'WhatsApp' },
  { icon: FiMail,     href: 'mailto:mostafa.mahmouud7i@gmail.com',             label: 'Email' },
]

export default function Footer() {
  const { dict, lang } = useDict()
  const d = (k, fb) => dict[k] || fb

  const links = [
    { href: '#about',      label: d('nav.about', 'About') },
    { href: '#skills',     label: d('nav.skills', 'Skills') },
    { href: '#projects',   label: d('nav.projects', 'Projects') },
    { href: '#experience', label: d('nav.experience', 'Experience') },
    { href: '#contact',    label: d('nav.contact', 'Contact') },
  ]

  return (
    <footer style={{ position: 'relative', borderTop: '1px solid rgba(51,65,85,0.5)', background: '#0a1020' }}>
      <div className="container" style={{ paddingTop: '4rem', paddingBottom: '2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2.5rem', marginBottom: '3rem' }}>

          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <div style={{ width: 34, height: 34, borderRadius: '0.55rem', background: 'linear-gradient(135deg,#2563EB,#14B8A6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FiCode color="#fff" size={15} />
              </div>
              <span style={{ fontWeight: 800, fontSize: '1rem', color: '#f1f5f9' }}>Mostafa<span className="gradient-text">.</span></span>
            </div>
            <p style={{ color: '#475569', fontSize: '0.83rem', lineHeight: 1.7, maxWidth: 240 }}>
              {d('footer.tagline', 'Full Stack Developer specializing in MERN Stack.')}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 style={{ color: '#94a3b8', fontWeight: 600, fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1rem' }}>
              {d('footer.nav', 'Navigation')}
            </h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
              {links.map(({ href, label }) => (
                <li key={href}>
                  <a href={href} style={{ color: '#475569', fontSize: '0.87rem', textDecoration: 'none', transition: 'color 0.2s' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#60a5fa'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#475569'}>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 style={{ color: '#94a3b8', fontWeight: 600, fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1rem' }}>
              {d('footer.connect', 'Connect')}
            </h3>
            <div style={{ display: 'flex', gap: '0.6rem', marginBottom: '1rem' }}>
              {socials.map(({ icon: Icon, href, label }) => (
                <motion.a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                  className="glass"
                  style={{ width: 38, height: 38, borderRadius: '0.6rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b', textDecoration: 'none' }}
                  whileHover={{ scale: 1.12, y: -2, color: '#e2e8f0' }} whileTap={{ scale: 0.9 }}>
                  <Icon size={17} />
                </motion.a>
              ))}
            </div>
            <p style={{ color: '#475569', fontSize: '0.82rem' }}>mostafa.mahmouud7i@gmail.com</p>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid rgba(51,65,85,0.4)', paddingTop: '1.5rem', display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center', justifyContent: 'space-between' }}>
          <p style={{ color: '#334155', fontSize: '0.8rem' }}>
            © {new Date().getFullYear()} Mostafa Mahmoud. {d('footer.rights', 'All rights reserved.')}
          </p>
          <p style={{ color: '#334155', fontSize: '0.8rem' }}>
            {d('footer.built', 'Designed & Developed by')}{' '}
            <span className="gradient-text" style={{ fontWeight: 600 }}>Mostafa Mahmoud</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
