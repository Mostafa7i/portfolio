'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FiBriefcase, FiCheck } from 'react-icons/fi'
import { useDict } from '@/context/DictionaryContext'

const containerV = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.12 } } }
const itemV = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }

export default function ExperienceSection() {
  const { dict } = useDict()
  const d = (k, fb) => dict[k] || fb
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.08 })

  const responsibilities = [
    d('exp.r1', 'Delivered training for numerous student groups across Frontend and Full Stack tracks'),
    d('exp.r2', 'Designed and implemented comprehensive JavaScript, React, and Node.js curricula'),
    d('exp.r3', 'Mentored students from beginner to job-ready level with personal code reviews'),
    d('exp.r4', 'Created practical, real-world project assignments and assessments'),
    d('exp.r5', 'Supervised student graduation projects end-to-end'),
    d('exp.r6', 'Built CodaX platform to manage training operations efficiently'),
    d('exp.r7', 'Trained 500+ students with a 95%+ satisfaction rate'),
  ]

  const achievements = [d('exp.a1', '500+ students trained'), d('exp.a2', '15+ graduation projects supervised'), d('exp.a3', '95% satisfaction rate')]

  return (
    <section id="experience" className="section-wrapper" style={{ position: 'relative' }}>
      <div className="grid-pattern" style={{ position: 'absolute', inset: 0, opacity: 0.22, pointerEvents: 'none' }} aria-hidden="true" />
      <div className="container" style={{ position: 'relative' }}>
        <motion.div ref={ref} variants={containerV} initial="hidden" animate={inView ? 'visible' : 'hidden'}>

          <motion.div variants={itemV} style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span className="section-label">{d('exp.label', 'Experience')}</span>
            <h2 className="section-title">{d('exp.title', 'Professional')} <span className="gradient-text">{d('exp.title.accent', 'Journey')}</span></h2>
            <div className="section-divider" />
          </motion.div>

          <div style={{ maxWidth: 720, margin: '0 auto', position: 'relative', paddingInlineStart: '2.5rem' }}>
            <div className="timeline-line" />
            <motion.div variants={itemV} style={{ position: 'relative' }}>
              <div className="timeline-dot" />
              <div className="card" style={{ padding: '2rem' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
                      <div style={{ width: 36, height: 36, borderRadius: '0.65rem', background: 'rgba(37,99,235,0.15)', border: '1px solid rgba(37,99,235,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <FiBriefcase color="#60a5fa" size={16} />
                      </div>
                      <span style={{ fontSize: '0.72rem', fontWeight: 600, padding: '3px 10px', borderRadius: 999, background: 'rgba(20,184,166,0.1)', border: '1px solid rgba(20,184,166,0.25)', color: '#2dd4bf' }}>
                        {d('exp.type', 'Full-time')}
                      </span>
                    </div>
                    <h3 style={{ color: '#f1f5f9', fontWeight: 800, fontSize: '1.15rem', marginBottom: '0.3rem' }}>{d('exp.role', 'JavaScript Instructor & Technical Trainer')}</h3>
                    <p style={{ color: '#60a5fa', fontWeight: 500, fontSize: '0.88rem' }}>{d('exp.company', 'Independent Training')}</p>
                  </div>
                  <span className="glass" style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 500, padding: '0.4rem 0.9rem', borderRadius: '0.65rem', whiteSpace: 'nowrap' }}>
                    {d('exp.period', '2023 — Present')}
                  </span>
                </div>

                <ul style={{ marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  {responsibilities.map((r) => (
                    <li key={r} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', color: '#94a3b8', fontSize: '0.88rem', lineHeight: 1.6 }}>
                      <FiCheck color="#2dd4bf" size={14} style={{ marginTop: 3, flexShrink: 0 }} />
                      {r}
                    </li>
                  ))}
                </ul>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {achievements.map((a) => (
                    <span key={a} style={{ padding: '0.35rem 0.85rem', borderRadius: '0.6rem', background: 'rgba(37,99,235,0.1)', border: '1px solid rgba(37,99,235,0.2)', color: '#93c5fd', fontSize: '0.78rem', fontWeight: 500 }}>🏆 {a}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
