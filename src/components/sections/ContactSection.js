'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FiMail, FiGithub, FiLinkedin, FiSend, FiCheck, FiAlertCircle } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'
import { useDict } from '@/context/DictionaryContext'

const socials = [
  { icon: FiGithub,   href: 'https://github.com/Mostafa7i',                       label: 'GitHub',    color: '#e2e8f0' },
  { icon: FiLinkedin, href: 'https://linkedin.com/in/mostafa',         label: 'LinkedIn',  color: '#60a5fa' },
  { icon: FaWhatsapp, href: 'https://wa.me/201551440272',                          label: 'WhatsApp',  color: '#4ade80' },
  { icon: FiMail,     href: 'mailto:mostafa.mahmouud7i@gmail.com',                 label: 'Email',     color: '#fbbf24' },
]

const inputStyle = {
  width: '100%',
  padding: '0.75rem 1rem',
  borderRadius: '0.75rem',
  background: 'rgba(15, 23, 42, 0.6)',
  border: '1px solid rgba(51, 65, 85, 0.6)',
  color: '#e2e8f0',
  fontSize: '0.88rem',
  transition: 'border-color 0.2s, box-shadow 0.2s',
  outline: 'none',
  fontFamily: 'inherit',
}

const labelStyle = {
  display: 'block',
  color: '#94a3b8',
  fontSize: '0.82rem',
  marginBottom: '0.45rem',
  fontWeight: 500,
}

const containerV = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.12 } } }
const itemV      = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }

export default function ContactSection() {
  const { dict } = useDict()
  const d = (k, fb) => dict[k] || fb
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.06 })
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState('idle')

  const onChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }))

  const FORMSPREE_ID = 'https://formspree.io/f/mdknbgol'

  const onSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch(FORMSPREE_ID, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          subject: form.subject,
          message: form.message,
        }),
      })
      if (res.ok) {
        setStatus('success')
        setForm({ name: '', email: '', subject: '', message: '' })
        setTimeout(() => setStatus('idle'), 5000)
      } else {
        setStatus('error')
        setTimeout(() => setStatus('idle'), 4000)
      }
    } catch {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 4000)
    }
  }

  return (
    <section id="contact" className="section-wrapper" style={{ position: 'relative' }}>
      <div style={{ background: 'linear-gradient(180deg, transparent, rgba(30,41,59,0.18), transparent)', position: 'absolute', inset: 0 }} aria-hidden="true" />
      <div className="grid-pattern" style={{ position: 'absolute', inset: 0, opacity: 0.18, pointerEvents: 'none' }} aria-hidden="true" />

      <div className="container" style={{ position: 'relative' }}>
        <motion.div ref={ref} variants={containerV} initial="hidden" animate={inView ? 'visible' : 'hidden'}>

          {/* Header */}
          <motion.div variants={itemV} style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span className="section-label">{d('contact.label', 'Contact')}</span>
            <h2 className="section-title">
              {d('contact.title', "Let's")}{' '}
              <span className="gradient-text">{d('contact.title.accent', 'Work Together')}</span>
            </h2>
            <p style={{ color: '#64748b', maxWidth: 460, margin: '0 auto 1.25rem', fontSize: '0.93rem', lineHeight: 1.65 }}>
              {d('contact.subtitle', 'Whether you have a project, a training need, or just want to say hi — my inbox is always open.')}
            </p>
            <div className="section-divider" />
          </motion.div>

          {/* Two-column layout */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', alignItems: 'start' }}>

            {/* Left: Info */}
            <motion.div variants={itemV} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

              {/* Contact details */}
              <div className="card" style={{ padding: '1.75rem' }}>
                <h3 style={{ color: '#f1f5f9', fontWeight: 700, fontSize: '1rem', marginBottom: '1.25rem' }}>{d('contact.info.title', 'Get In Touch')}</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {[
                    { icon: FiMail,     label: d('contact.email.label', 'Email'),     val: 'mostafa.mahmouud7i@gmail.com',  href: 'mailto:mostafa.mahmouud7i@gmail.com', iconColor: '#60a5fa', iconBg: 'rgba(37,99,235,0.12)', iconBorder: 'rgba(37,99,235,0.22)' },
                    { icon: FaWhatsapp, label: d('contact.whatsapp.label', 'WhatsApp'), val: d('contact.whatsapp.val', 'Available for quick chat'), href: 'https://wa.me/201551440272', iconColor: '#4ade80', iconBg: 'rgba(74,222,128,0.1)', iconBorder: 'rgba(74,222,128,0.2)' },
                  ].map(({ icon: Icon, label, val, href, iconColor, iconBg, iconBorder }) => (
                    <div key={label} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.8rem' }}>
                      <div style={{ width: 36, height: 36, borderRadius: '0.65rem', background: iconBg, border: `1px solid ${iconBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Icon color={iconColor} size={16} />
                      </div>
                      <div>
                        <p style={{ color: '#475569', fontSize: '0.72rem', marginBottom: 2 }}>{label}</p>
                        <a href={href} style={{ color: '#e2e8f0', fontSize: '0.85rem', textDecoration: 'none', transition: 'color 0.2s' }}
                          onMouseEnter={(e) => e.currentTarget.style.color = iconColor}
                          onMouseLeave={(e) => e.currentTarget.style.color = '#e2e8f0'}>
                          {val}
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social links */}
              <div className="card" style={{ padding: '1.75rem' }}>
                <h3 style={{ color: '#94a3b8', fontWeight: 600, fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1rem' }}>{d('contact.social.title', 'Find Me Online')}</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem' }}>
                  {socials.map(({ icon: Icon, href, label, color }) => (
                    <motion.a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="glass"
                      style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.7rem 0.9rem', borderRadius: '0.65rem', color: '#64748b', textDecoration: 'none', fontSize: '0.83rem', fontWeight: 500, transition: 'color 0.2s, border-color 0.2s' }}
                      whileHover={{ scale: 1.03, color }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <Icon size={17} />
                      {label}
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Availability indicator */}
              <div style={{ padding: '1.25rem 1.5rem', borderRadius: '0.9rem', background: 'rgba(20,184,166,0.06)', border: '1px solid rgba(20,184,166,0.2)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                  <span className="pulse-dot" style={{ width: 9, height: 9, borderRadius: '50%', background: '#4ade80', display: 'inline-block' }} />
                  <span style={{ color: '#2dd4bf', fontWeight: 600, fontSize: '0.85rem' }}>{d('contact.available', 'Currently Available')}</span>
                </div>
                <p style={{ color: '#475569', fontSize: '0.78rem', lineHeight: 1.6 }}>
                  {d('contact.available.desc', 'Open to freelance projects, full-time roles, and training partnerships in Saudi Arabia and the Gulf region.')}
                </p>
              </div>
            </motion.div>

            {/* Right: Form */}
            <motion.div variants={itemV}>
              <form onSubmit={onSubmit} className="card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                <h3 style={{ color: '#f1f5f9', fontWeight: 700, fontSize: '1rem', marginBottom: '0.25rem' }}>{d('contact.form.title', 'Send a Message')}</h3>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label htmlFor="c-name" style={labelStyle}>{d('contact.form.name', 'Your Name')} *</label>
                    <input id="c-name" name="name" type="text" required placeholder={d('contact.form.name.placeholder', 'Mustafa Mahmoud')} value={form.name} onChange={onChange} style={inputStyle}
                      onFocus={(e) => { e.target.style.borderColor = 'rgba(37,99,235,0.6)'; e.target.style.boxShadow = '0 0 0 3px rgba(37,99,235,0.1)' }}
                      onBlur={(e) => { e.target.style.borderColor = 'rgba(51,65,85,0.6)'; e.target.style.boxShadow = 'none' }}
                    />
                  </div>
                  <div>
                    <label htmlFor="c-email" style={labelStyle}>{d('contact.form.email', 'Email Address')} *</label>
                    <input id="c-email" name="email" type="email" required placeholder={d('contact.form.email.placeholder', 'you@example.com')} value={form.email} onChange={onChange} style={inputStyle}
                      onFocus={(e) => { e.target.style.borderColor = 'rgba(37,99,235,0.6)'; e.target.style.boxShadow = '0 0 0 3px rgba(37,99,235,0.1)' }}
                      onBlur={(e) => { e.target.style.borderColor = 'rgba(51,65,85,0.6)'; e.target.style.boxShadow = 'none' }}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="c-subject" style={labelStyle}>{d('contact.form.subject', 'Subject')}</label>
                  <input id="c-subject" name="subject" type="text" placeholder={d('contact.form.subject.placeholder', 'Project inquiry / Training partnership...')} value={form.subject} onChange={onChange} style={inputStyle}
                    onFocus={(e) => { e.target.style.borderColor = 'rgba(37,99,235,0.6)'; e.target.style.boxShadow = '0 0 0 3px rgba(37,99,235,0.1)' }}
                    onBlur={(e) => { e.target.style.borderColor = 'rgba(51,65,85,0.6)'; e.target.style.boxShadow = 'none' }}
                  />
                </div>

                <div>
                  <label htmlFor="c-message" style={labelStyle}>{d('contact.form.message', 'Message')} *</label>
                  <textarea id="c-message" name="message" required rows={5} placeholder={d('contact.form.message.placeholder', 'Tell me about your project or how I can help...')} value={form.message} onChange={onChange} style={{ ...inputStyle, resize: 'none' }}
                    onFocus={(e) => { e.target.style.borderColor = 'rgba(37,99,235,0.6)'; e.target.style.boxShadow = '0 0 0 3px rgba(37,99,235,0.1)' }}
                    onBlur={(e) => { e.target.style.borderColor = 'rgba(51,65,85,0.6)'; e.target.style.boxShadow = 'none' }}
                  />
                </div>

                {/* Status */}
                {status === 'success' && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1rem', borderRadius: '0.7rem', background: 'rgba(20,184,166,0.1)', border: '1px solid rgba(20,184,166,0.3)', color: '#2dd4bf', fontSize: '0.85rem' }}>
                    <FiCheck size={16} /> {d('contact.form.success', "Message sent! I'll get back to you soon.")}
                  </div>
                )}
                {status === 'error' && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1rem', borderRadius: '0.7rem', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#f87171', fontSize: '0.85rem' }}>
                    <FiAlertCircle size={16} /> {d('contact.form.error', 'Something went wrong. Please try again.')}
                  </div>
                )}

                <motion.button
                  type="submit"
                  disabled={status === 'loading' || status === 'success'}
                  className="btn-primary glow-blue"
                  style={{ justifyContent: 'center', width: '100%', opacity: (status === 'loading' || status === 'success') ? 0.65 : 1, cursor: (status === 'loading' || status === 'success') ? 'not-allowed' : 'pointer' }}
                  whileHover={status === 'idle' ? { scale: 1.02 } : {}}
                  whileTap={status === 'idle' ? { scale: 0.98 } : {}}
                >
                  {status === 'loading' ? (
                    <>
                      <div style={{ width: 16, height: 16, border: '2px solid rgba(255,255,255,0.25)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
                      {d('contact.form.sending', 'Sending...')}
                    </>
                  ) : (
                    <><FiSend size={17} /> {d('contact.form.send', 'Send Message')}</>
                  )}
                </motion.button>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
