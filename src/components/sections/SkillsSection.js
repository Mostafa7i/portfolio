'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FiMonitor, FiServer, FiDatabase, FiTool, FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { useDict } from '@/context/DictionaryContext'

const categories = [
  {
    id: 'frontend', icon: FiMonitor, color: '#2563EB', light: '#60a5fa',
    skills: [
      { name: 'HTML5', level: 95 }, { name: 'CSS3', level: 90 }, { name: 'JavaScript', level: 92 },
      { name: 'TypeScript', level: 78 }, { name: 'React', level: 90 }, { name: 'Next.js', level: 82 },
      { name: 'Tailwind CSS', level: 88 }, { name: 'Bootstrap', level: 85 },
    ],
  },
  {
    id: 'backend', icon: FiServer, color: '#14B8A6', light: '#5eead4',
    skills: [
      { name: 'Node.js', level: 88 }, { name: 'Express.js', level: 86 }, { name: 'REST APIs', level: 90 },
      { name: 'JWT Auth', level: 85 }, { name: 'RBAC', level: 80 },
    ],
  },
  {
    id: 'database', icon: FiDatabase, color: '#F59E0B', light: '#fcd34d',
    skills: [{ name: 'MongoDB', level: 88 }, { name: 'Mongoose', level: 85 }, { name: 'Firebase', level: 72 }],
  },
  {
    id: 'tools', icon: FiTool, color: '#8b5cf6', light: '#c4b5fd',
    skills: [
      { name: 'Git & GitHub', level: 90 }, { name: 'Vercel', level: 85 }, { name: 'Cloudinary', level: 80 },
      { name: 'Postman', level: 88 }, { name: 'Figma', level: 70 }, { name: 'Docker (Learning)', level: 45 },
    ],
  },
]

function CircularSkill({ name, level, color, light, inView, delay }) {
  const radius = 40
  const strokeWidth = 6
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (level / 100) * circumference

  return (
    <div
      className="flex flex-col items-center justify-center p-6 rounded-2xl glass relative overflow-hidden group hover:border-blue-500/30 transition-all duration-300 w-full min-h-[200px]"
    >
      {/* Background radial glow */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none" 
        style={{
          background: `radial-gradient(circle, ${color} 0%, transparent 70%)`
        }} 
      />

      {/* SVG Circle Progress */}
      <div className="relative w-28 h-28 flex items-center justify-center mb-3">
        {/* Track circle */}
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="56"
            cy="56"
            r={radius}
            className="stroke-slate-800/80"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Animated progress circle */}
          <motion.circle
            cx="56"
            cy="56"
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={inView ? { strokeDashoffset } : { strokeDashoffset: circumference }}
            transition={{ duration: 1.2, delay, ease: 'easeOut' }}
            strokeLinecap="round"
            style={{
              filter: `drop-shadow(0 0 4px ${color}55)`
            }}
          />
        </svg>

        {/* Text inside the circle */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xl font-bold text-white tracking-tight">
            {level}%
          </span>
        </div>
      </div>

      {/* Skill Name */}
      <span className="text-slate-300 font-semibold text-center text-sm tracking-wide mt-2">
        {name}
      </span>
    </div>
  )
}

const containerV = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } }
const itemV = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }

export default function SkillsSection() {
  const { dict, dir } = useDict()
  const d = (k, fb) => dict[k] || fb
  const [active, setActive] = useState('frontend')
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.08 })

  const [currentIndex, setCurrentIndex] = useState(0)
  const [visibleCount, setVisibleCount] = useState(4)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleCount(1)
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2)
      } else {
        setVisibleCount(4)
      }
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    setCurrentIndex(0)
  }, [active])

  const tabLabels = {
    frontend: d('skills.tab.frontend', 'Frontend'),
    backend:  d('skills.tab.backend',  'Backend'),
    database: d('skills.tab.database', 'Database'),
    tools:    d('skills.tab.tools',    'Tools & DevOps'),
  }

  const cat = categories.find((c) => c.id === active)
  const totalSkills = cat ? cat.skills.length : 0
  const maxIndex = Math.max(0, totalSkills - visibleCount)

  const nextSlide = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0))
  }

  const shouldCenter = totalSkills < visibleCount
  const translation = dir === 'rtl' 
    ? currentIndex * (100 / visibleCount) 
    : -currentIndex * (100 / visibleCount)

  return (
    <section id="skills" className="section-wrapper" style={{ position: 'relative' }}>
      <div className="grid-pattern" style={{ position: 'absolute', inset: 0, opacity: 0.22, pointerEvents: 'none' }} aria-hidden="true" />
      <div className="container" style={{ position: 'relative' }}>
        <motion.div ref={ref} variants={containerV} initial="hidden" animate={inView ? 'visible' : 'hidden'}>

          <motion.div variants={itemV} style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="section-label">{d('skills.label', 'Skills')}</span>
            <h2 className="section-title">{d('skills.title', 'Technical')} <span className="gradient-text">{d('skills.title.accent', 'Expertise')}</span></h2>
            <div className="section-divider" />
          </motion.div>

          <motion.div variants={itemV} style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.6rem', marginBottom: '2.5rem' }}>
            {categories.map(({ id, icon: Icon, color }) => {
              const isActive = active === id
              return (
                <button key={id} onClick={() => setActive(id)} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.55rem 1.1rem', borderRadius: '0.75rem', fontSize: '0.85rem', fontWeight: 500, cursor: 'pointer', transition: 'all 0.2s ease', background: isActive ? `${color}22` : 'rgba(30,41,59,0.5)', border: `1px solid ${isActive ? color + '55' : 'rgba(51,65,85,0.5)'}`, color: isActive ? color : '#94a3b8', backdropFilter: 'blur(10px)' }}>
                  <Icon size={15} />
                  {tabLabels[id]}
                </button>
              )
            })}
          </motion.div>

          <motion.div key={active} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="relative w-full max-w-5xl mx-auto px-4 md:px-12">
            {/* Left navigation arrow */}
            {!shouldCenter && currentIndex > 0 && (
              <button
                onClick={prevSlide}
                className="absolute -left-2 md:left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full glass hover:bg-blue-600/20 border border-slate-700/50 flex items-center justify-center cursor-pointer text-white hover:text-blue-400 transition-all duration-300"
              >
                {dir === 'rtl' ? <FiChevronLeft size={20} /> : <FiChevronRight size={20} />}
              </button>
            )}

            {/* Right navigation arrow */}
            {!shouldCenter && currentIndex < maxIndex && (
              <button
                onClick={nextSlide}
                className="absolute -right-2 md:right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full glass hover:bg-blue-600/20 border border-slate-700/50 flex items-center justify-center cursor-pointer text-white hover:text-blue-400 transition-all duration-300"
              >
                {dir === 'rtl' ? <FiChevronRight size={20} /> : <FiChevronLeft size={20} />}
              </button>
            )}

            {/* Carousel overflow container */}
            <div className="overflow-hidden w-full py-4">
              <motion.div
                className={`flex ${shouldCenter ? 'justify-center' : ''}`}
                animate={{ x: shouldCenter ? '0%' : `${translation}%` }}
                transition={{ type: 'spring', damping: 25, stiffness: 120 }}
              >
                {cat && cat.skills.map((s, i) => (
                  <div
                    key={s.name}
                    className="w-full sm:w-1/2 lg:w-1/4 shrink-0 px-3"
                  >
                    <CircularSkill
                      name={s.name}
                      level={s.level}
                      color={cat.color}
                      light={cat.light}
                      inView={inView}
                      delay={i * 0.05}
                    />
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Pagination Indicators (Dots) */}
            {!shouldCenter && maxIndex > 0 && (
              <div className="flex justify-center gap-2 mt-6">
                {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
                  <button
                    dir='ltr'
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                      currentIndex === idx ? 'w-6 bg-blue-500' : 'w-2 bg-slate-700'
                    }`}
                  />
                ))}
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
