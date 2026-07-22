'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useDict } from '@/context/DictionaryContext'

function Counter({ target, suffix, inView }) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!inView) return
    let n = 0
    const step = target / (1800 / 16)
    const id = setInterval(() => {
      n += step
      if (n >= target) { setCount(target); clearInterval(id) }
      else setCount(Math.floor(n))
    }, 16)
    return () => clearInterval(id)
  }, [inView, target])
  return <>{count}{suffix}</>
}

const containerV = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }
const cardV = { hidden: { opacity: 0, scale: 0.88, y: 20 }, visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5 } } }

export default function StatsSection() {
  const { dict } = useDict()
  const d = (k, fb) => dict[k] || fb
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  const stats = [
    { value: 4,   label: d('stats.experience', 'Years of Experience'),             suffix: '+', icon: '⚡', from: '#2563EB', to: '#60a5fa' },
    { value: 1000, label: d('stats.students',   'Students Taught'),                 suffix: '+', icon: '🎓', from: '#14B8A6', to: '#5eead4' },
    { value: 20,  label: d('stats.projects',   'Projects Built'),                  suffix: '+', icon: '🚀', from: '#F59E0B', to: '#fcd34d' },
    { value: 30,  label: d('stats.technologies','Technologies Used'),              suffix: '+', icon: '🛠️', from: '#8b5cf6', to: '#c4b5fd' },
    { value: 15,  label: d('stats.graduation', 'Graduation Projects Supervised'),  suffix: '+', icon: '🏆', from: '#ef4444', to: '#fca5a5' },
  ]

  return (
    <section style={{ position: 'relative', paddingTop: '4rem', paddingBottom: '4rem', overflow: 'hidden' }}>
      <div style={{ background: 'linear-gradient(180deg, transparent, rgba(30,41,59,0.18), transparent)', position: 'absolute', inset: 0 }} aria-hidden="true" />
      <div className="container" style={{ position: 'relative' }}>
        <motion.div
          ref={ref}
          variants={containerV}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem' }}
        >
          {stats.map((s) => (
            <motion.div key={s.label} variants={cardV} className="card" style={{ padding: '1.75rem 1rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${s.from}, ${s.to})` }} />
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{s.icon}</div>
              <div style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 800, marginBottom: '0.4rem', background: `linear-gradient(135deg, ${s.from}, ${s.to})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                <Counter target={s.value} suffix={s.suffix} inView={inView} />
              </div>
              <p style={{ color: '#64748b', fontSize: '0.75rem', lineHeight: 1.4 }}>{s.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
