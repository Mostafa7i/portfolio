'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FiCode, FiUsers, FiBookOpen, FiAward, FiZap } from 'react-icons/fi'
import { useDict } from '@/context/DictionaryContext'
import Lightfall from '../Lightfall'

const stack = ['React', 'Next.js', 'Node.js', 'Express.js', 'MongoDB', 'Firebase', 'TypeScript', 'Tailwind CSS', 'JWT', 'REST APIs', 'AI Integration']

const containerV = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.12 } } }
const itemV = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }

export default function AboutSection() {
  const { dict } = useDict()
  const d = (k, fb) => dict[k] || fb
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.08 })

  const highlights = [
    { icon: FiCode, title: d('about.highlight1.title', 'Full Stack Developer'), desc: d('about.highlight1.desc', 'Specializing in MERN Stack') },
    { icon: FiBookOpen, title: d('about.highlight2.title', 'JavaScript Instructor'), desc: d('about.highlight2.desc', 'Technical Trainer since 2023') },
    { icon: FiZap, title: d('about.highlight3.title', 'AI Integration'), desc: d('about.highlight3.desc', 'Integrating AI into modern web') },
    { icon: FiUsers, title: d('about.highlight4.title', 'Mentor & Coach'), desc: d('about.highlight4.desc', 'Mentoring developers') },
  ]

  return (
    <section id="about" className="section-wrapper" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Lightfall absolute background */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <Lightfall
          colors={['#A6C8FF', '#5227FF', '#FF9FFC']}
          backgroundColor="#0A29FF"
          speed={0.5}
          streakCount={2}
          streakWidth={1}
          streakLength={1}
          glow={1}
          density={0.6}
          twinkle={1}
          zoom={3}
          backgroundGlow={0.5}
          opacity={1}
          mouseInteraction
          mouseStrength={0.5}
          mouseRadius={1}
          color1="#A6C8FF"
          color2="#5227FF"
          color3="#FF9FFC"
        />
        {/* Top smooth fade to blend with Hero section */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '160px',
          background: 'linear-gradient(to bottom, #0F172A 0%, rgba(15, 23, 42, 0.8) 30%, transparent 100%)',
          zIndex: 1
        }} />
        {/* Bottom smooth fade to blend with Stats section */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '160px',
          background: 'linear-gradient(to top, #0F172A 0%, rgba(15, 23, 42, 0.8) 30%, transparent 100%)',
          zIndex: 1
        }} />
      </div>

      <div className="grid-pattern" style={{ position: 'absolute', inset: 0, opacity: 0.25, pointerEvents: 'none', zIndex: 1 }} aria-hidden="true" />
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <motion.div ref={ref} variants={containerV} initial="hidden" animate={inView ? 'visible' : 'hidden'}>

          <motion.div
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.7 }}

            variants={itemV} style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span className="section-label">{d('about.label', 'About Me')}</span>
            <h2 className="section-title">
              {d('about.title', 'Who is')}{' '}
              <span className="gradient-text">{d('about.title.name', 'Mustafa Mahmoud')}</span>?
            </h2>
            <div className="section-divider" />
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'start' }}>
            {/* Story */}
            <motion.div variants={itemV} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div className="card" style={{ padding: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                  <div style={{ width: 40, height: 40, borderRadius: '0.75rem', flexShrink: 0, background: 'linear-gradient(135deg,#2563EB,#14B8A6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <FiAward color="#fff" size={18} />
                  </div>
                  <h3 style={{ color: '#f1f5f9', fontWeight: 700, fontSize: '1.05rem' }}>{d('about.story.title', 'My Story')}</h3>
                </div>
                <p style={{ color: '#94a3b8', lineHeight: 1.8, marginBottom: '0.9rem', fontSize: '0.93rem' }}>{d('about.story.p1', '')}</p>
                <p style={{ color: '#94a3b8', lineHeight: 1.8, marginBottom: '0.9rem', fontSize: '0.93rem' }}>{d('about.story.p2', '')}</p>
                <p style={{ color: '#94a3b8', lineHeight: 1.8, fontSize: '0.93rem' }}>{d('about.story.p3', '')}</p>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {stack.map((t) => <span key={t} className="tech-badge">{t}</span>)}
              </div>
            </motion.div>

            {/* Highlight cards */}
            <motion.div variants={containerV} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {highlights.map(({ icon: Icon, title, desc }) => (
                <motion.div key={title} variants={itemV} className="card" style={{ padding: '1.5rem' }}>
                  <div style={{ width: 44, height: 44, borderRadius: '0.75rem', marginBottom: '1rem', background: 'rgba(37,99,235,0.12)', border: '1px solid rgba(37,99,235,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon color="#60a5fa" size={20} />
                  </div>
                  <h4 style={{ color: '#e2e8f0', fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.4rem' }}>{title}</h4>
                  <p style={{ color: '#64748b', fontSize: '0.78rem', lineHeight: 1.6 }}>{desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
