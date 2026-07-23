'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { FiArrowDown, FiDownload, FiMail, FiGithub, FiLinkedin } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'
import { useDict } from '@/context/DictionaryContext'
import BlurText from "../BlurText";
const rolesEn = ['Full Stack Developer', 'MERN Stack Engineer', 'JavaScript Instructor', 'Technical Trainer']
const rolesAr = ['مطور Full Stack', 'مهندس MERN Stack', 'مدرّس JavaScript', 'مدرّب تقني']

/* ── Particle Canvas ─────────────────────────────────────────── */
function ParticleField() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.4 + 0.3,
      dx: (Math.random() - 0.5) * 0.35,
      dy: (Math.random() - 0.5) * 0.35,
      alpha: Math.random() * 0.45 + 0.1,
    }))

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach((p) => {
        p.x += p.dx; p.y += p.dy
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(99,155,255,${p.alpha})`
        ctx.fill()
      })
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const ddx = particles[i].x - particles[j].x
          const ddy = particles[i].y - particles[j].y
          const dist = Math.sqrt(ddx * ddx + ddy * ddy)
          if (dist < 110) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(99,155,255,${0.07 * (1 - dist / 110)})`
            ctx.lineWidth = 0.6
            ctx.stroke()
          }
        }
      }
      animId = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize) }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'absolute', inset: 0,
        width: '100%', height: '100%',
        pointerEvents: 'none', zIndex: 0,
      }}
    />
  )
}

/* ── Typing Animation ────────────────────────────────────────── */
function TypingText({ lang }) {
  const roles = lang === 'ar' ? rolesAr : rolesEn
  const [idx, setIdx] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)

  // Reset when language changes
  useEffect(() => { setText(''); setIdx(0); setDeleting(false) }, [lang])

  useEffect(() => {
    const current = roles[idx]
    let t
    if (!deleting && text.length < current.length) {
      t = setTimeout(() => setText(current.slice(0, text.length + 1)), 75)
    } else if (!deleting && text.length === current.length) {
      t = setTimeout(() => setDeleting(true), 2200)
    } else if (deleting && text.length > 0) {
      t = setTimeout(() => setText(text.slice(0, -1)), 38)
    } else {
      setDeleting(false)
      setIdx((i) => (i + 1) % roles.length)
    }
    return () => clearTimeout(t)
  }, [text, deleting, idx, lang])

  return (
    <span className="gradient-text" style={{ fontWeight: 700 }}>
      {text}
      <span className="cursor-blink" style={{ color: '#60a5fa', marginInlineStart: 2 }}>|</span>
    </span>
  )
}

/* ── Social links data ───────────────────────────────────────── */
const socials = [
  { icon: FiGithub, href: 'https://github.com/Mostafa7i', label: 'GitHub' },
  { icon: FiLinkedin, href: 'https://linkedin.com/in/mostafa', label: 'LinkedIn' },
  { icon: FaWhatsapp, href: 'https://wa.me/201551440272', label: 'WhatsApp' },
  { icon: FiMail, href: 'mailto:mostafa.mahmouud7i@gmail.com', label: 'Email' },
]

/* ── Main Component ──────────────────────────────────────────── */
export default function HeroSection() {
  const { dict, lang } = useDict()
  const d = (k, fb) => dict[k] || fb
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section
      id="hero"
      className="hero-section grid-pattern"
      aria-label="Hero section"
    >
      {/* Ambient orbs */}
      <div className="hero-orb-1" aria-hidden="true" />
      <div className="hero-orb-2" aria-hidden="true" />
      <div className="hero-orb-3" aria-hidden="true" />

      {/* Particle network */}
      <ParticleField />

      {/* Content */}
      <div
        className="container"
        style={{ position: 'relative', zIndex: 10, paddingTop: '7rem', paddingBottom: '5rem' }}
      >
        <div className='flex md:px-20 flex-col md:flex-row justify-between items-center gap-10'>
          {/* ── Text block ── */}
          <motion.div
            className='w-full md:w-4/5'
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            {/* Availability badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              style={{ display: 'inline-flex', marginBottom: '1.5rem' }}
            >
              <span
                className="glass"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                  padding: '0.4rem 1rem', borderRadius: '9999px',
                  fontSize: '0.8rem', color: '#93c5fd',
                  border: '1px solid rgba(37,99,235,0.25)',
                }}
              >
                <span
                  className="pulse-dot"
                  style={{ width: 8, height: 8, borderRadius: '50%', background: '#4ade80', display: 'inline-block' }}
                />
                {d('hero.available', 'Available for opportunities')}
              </span>
            </motion.div>

            {/* Main headline with BlurText effect */}
            <h1
              style={{
                fontSize: 'clamp(2.2rem, 5vw, 4rem)',
                fontWeight: 800,
                color: '#f1f5f9',
                lineHeight: 1.25,
                marginBottom: '1rem',
              }}
            >
              <BlurText
                text={d('hero.headline1', 'Building Scalable')}
                delay={50}
                animateBy="words"
                direction="top"
                as="span"
              />{' '}
              <BlurText
                text={d('hero.headline2', 'Web Apps')}
                delay={50}
                animateBy="words"
                direction="top"
                as="span"
                className="gradient-text"
              />
              <br />
              <BlurText
                text={d('hero.headline3', '& Empowering')}
                delay={50}
                animateBy="words"
                direction="top"
                as="span"
              />{' '}
              <BlurText
                text={d('hero.headline4', 'Developers')}
                delay={50}
                animateBy="words"
                direction="top"
                as="span"
                style={{ color: '#2dd4bf' }}
              />
            </h1>

            {/* Typing role */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              style={{ fontSize: '1.2rem', color: '#cbd5e1', marginBottom: '1rem', minHeight: '1.8rem' }}
            >
              <TypingText lang={lang} />
            </motion.div>

            {/* Bio */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.5 }}
              style={{ color: '#94a3b8', fontSize: '1rem', lineHeight: 1.8, marginBottom: '2rem', maxWidth: '520px', margin: '0 auto 2rem' }}
            >
              <span dangerouslySetInnerHTML={{ __html: d('hero.bio', "Hi, I'm <strong style='color:#e2e8f0'>Mustafa Mahmoud</strong> — Full Stack Developer & Instructor.") }} />
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.5 }}
              style={{ display: 'flex', flexWrap: 'wrap', gap: '0.85rem', justifyContent: 'center', marginBottom: '1.75rem' }}
            >
              <motion.button
                id="hero-view-projects"
                onClick={() => scrollTo('projects')}
                className="btn-primary glow-blue"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
              >
                {d('hero.cta.projects', 'View Projects')}
              </motion.button>
              <motion.a
                id="hero-download-resume"
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
              >
                <FiDownload size={17} /> {d('hero.cta.resume', 'Download Resume')}
              </motion.a>
              <motion.button
                id="hero-contact-me"
                onClick={() => scrollTo('contact')}
                className="btn-teal"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
              >
                <FiMail size={17} /> {d('hero.cta.contact', 'Contact Me')}
              </motion.button>
            </motion.div>

            {/* Socials */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.65 }}
              style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}
            >
              {socials.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="glass"
                  style={{
                    width: 44, height: 44, borderRadius: '0.7rem',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#94a3b8', transition: 'color 0.2s',
                  }}
                  whileHover={{ scale: 1.12, y: -3, color: '#e2e8f0' }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon size={19} />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Avatar ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className='relative shrink-0'
          >
            <div className='relative w-[280px] h-[280px] md:w-[350px] md:h-[350px]'>
              {/* Spinning rings */}
              <div
                className="avatar-ring-outer"
                style={{
                  position: 'absolute', inset: 0,
                  borderRadius: '40%',
                  border: '1.5px solid rgba(37,99,235,0.25)',
                }}
              />
              <div
                className="avatar-ring-inner"
                style={{
                  position: 'absolute', inset: 10,
                  borderRadius: '35%',
                  border: '1px solid rgba(20,184,166,0.2)',
                }}
              />

              {/* Avatar circle */}
              <div
                className="glass glow-blue"
                style={{
                  position: 'absolute', inset: 20,
                  borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  overflow: 'hidden',
                  background: 'linear-gradient(135deg, #1e3a5f 0%, #0f172a 60%, #1a1040 100%)',
                  border: '1px solid rgba(37,99,235,0.4)',
                }}
              >
                <span
                  className="gradient-text text-6xl font-bold select-none"
                >
                  <motion.img
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.9, duration: 0.7 }}
                    src='/me.png' className="rounded-full hover:scale-105 hover:transition-all w-60 h-60 md:w-80 md:h-80 object-cover" />
                </span>
              </div>

              {/* Floating tags */}
              {[
                { labelKey: 'hero.tag.mern', label: '⚡ MERN Stack', top: 16, right: 16, animY: -8 },
                { labelKey: 'hero.tag.instructor', label: '🎓 Instructor', top: 150, left: 6, animY: 8 },
                { labelKey: 'hero.tag.ai', label: '🚀 AI-Ready', top: '50%', right: -52, animX: 6 },
              ].map(({ labelKey, label, animY = 0, animX = 0, ...pos }) => (
                <motion.div
                  key={label}
                  className="glass"
                  style={{
                    position: 'absolute', ...pos,
                    padding: '6px 12px', borderRadius: '0.6rem',
                    fontSize: '0.72rem', color: '#cbd5e1', fontWeight: 500,
                    whiteSpace: 'nowrap',
                    border: '1px solid rgba(51,65,85,0.6)',
                  }}
                  animate={{ y: animY ? [0, animY, 0] : 0, x: animX ? [0, animX, 0] : 0 }}
                  transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
                >
                  {d(labelKey, label)}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.button
          aria-label="Scroll to about section"
          onClick={() => scrollTo('about')}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 8, 0] }}
          transition={{ delay: 1, y: { repeat: Infinity, duration: 2.2, ease: 'easeInOut' } }}
          style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
            color: '#475569', fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase',
            margin: '4rem auto 0', cursor: 'pointer', background: 'none', border: 'none',
          }}
        >
          {d('hero.scroll', 'Scroll')}
          <FiArrowDown size={17} />
        </motion.button>
      </div>
    </section>
  )
}
