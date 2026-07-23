'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FiExternalLink, FiGithub, FiX, FiCheck } from 'react-icons/fi'
import { useDict } from '@/context/DictionaryContext'

const projects = [
  {
    id: 1,
    titleKey: 'Student & Training Platform',
    titleArKey: 'منصة الطلاب والتدريب',
    categoryKey: 'Full Stack',
    categoryArKey: 'مطور كامل',
    descKey: 'A comprehensive multi-role platform for managing students, training opportunities, and educational workflows with AI capabilities.',
    descArKey: 'منصة شاملة لإدارة الطلاب، فرص التدريب، والعمليات التعليمية المتكاملة مع ميزات الذكاء الاصطناعي.',
    longDescKey: 'Built a production-ready platform with multi-role access control (Admin, Instructor, Student), secure authentication, AI-powered filtering and chatbot integration, and full training management.',
    longDescArKey: 'تم بناء منصة جاهزة للإنتاج بنظام صلاحيات متعدد الأدوار (مدير، مدرب، طالب)، مصادقة آمنة، تصفية محتوى مدعومة بالذكاء الاصطناعي مع شات بوت ذكي، وإدارة كاملة للتدريب.',
    gradient: 'linear-gradient(135deg, #2563EB, #4f46e5)',
    emoji: '🎓',
    tags: ['React', 'Node.js', 'MongoDB', 'Express', 'JWT', 'AI/ML'],
    featuresKeys: ['Multi-role system (Admin, Instructor, Student)', 'JWT Authentication & RBAC', 'Interactive dashboards', 'AI-powered content filtering', 'AI chatbot assistant', 'Training opportunities management'],
    featuresArKeys: ['نظام متعدد الأدوار (مدير، مدرب، طالب)', 'مصادقة JWT وصلاحيات RBAC', 'لوحات بيانات تفاعلية', 'تصفية المحتوى بالذكاء الاصطناعي', 'مساعد ذكاء اصطناعي للدردشة', 'إدارة فرص التدريب'],
    challengeKey: 'Designing a scalable RBAC system that accommodates multiple user types with different permission levels while maintaining clean architecture.',
    challengeArKey: 'تصميم نظام RBAC قابل للتوسع يستوعب أنواعاً متعددة من المستخدمين بمستويات صلاحيات مختلفة مع الحفاظ على هندسة نظيفة.',
    metrics: ['+500 مستخدم / 500+ users', '3 أدوار / 3 Roles', 'AI مدمج / AI Integrated'],
    
    githubUrl: 'https://github.com/Mostafa7i/codax',
    demoUrl: 'https://github.com/Mostafa7i/codax'
  },
  {
    id: 2,
    titleKey: 'Tower Map — Telecom Monitor',
    titleArKey: 'خريطة الأبراج — مراقب الاتصالات',
    categoryKey: 'AI + Mapping',
    categoryArKey: 'ذكاء اصطناعي + خرائط',
    descKey: 'Real-time telecom tower monitoring system with AI-based fault prediction, interactive maps, and a smart ticketing system.',
    descArKey: 'نظام مراقبة أبراج الاتصالات في الوقت الفعلي مع التنبؤ بالأعطال بالذكاء الاصطناعي، خرائط تفاعلية، ونظام تذاكر ذكي.',
    longDescKey: 'Enterprise-grade telecom management system featuring real-time fault detection, AI predictive analytics, interactive Leaflet.js maps, automated alerts, ticketing workflow, and a tower simulator.',
    longDescArKey: 'نظام إدارة اتصالات بمستوى المؤسسات يتميز بكشف الأعطال الفوري، تحليلات تنبؤية بالذكاء الاصطناعي، خرائط تفاعلية باستخدام Leaflet.js، تنبيهات تلقائية، وسيناريوهات محاكاة الأبراج.',
    gradient: 'linear-gradient(135deg, #14B8A6, #0891b2)',
    emoji: '📡',
    tags: ['React', 'Node.js', 'MongoDB', 'Leaflet.js', 'AI Prediction', 'WebSocket'],
    featuresKeys: ['Telecom tower monitoring', 'Real-time fault detection', 'AI prediction & recommendations', 'Interactive maps with Leaflet.js', 'Real-time notifications', 'Ticketing system'],
    featuresArKeys: ['مراقبة أبراج الاتصالات', 'كشف الأعطال في الوقت الفعلي', 'توقعات وتوصيات الذكاء الاصطناعي', 'خرائط تفاعلية مع Leaflet.js', 'إشعارات فورية', 'نظام تذاكر'],
    challengeKey: 'Implementing real-time data streams from multiple tower sources and building a reliable AI prediction model for proactive fault detection.',
    challengeArKey: 'تنفيذ تدفقات بيانات في الوقت الفعلي من مصادر أبراج متعددة وبناء نموذج تنبؤ موثوق للذكاء الاصطناعي.',
    metrics: ['تنبيهات فورية / Alerts', 'توقعات AI / Prediction', 'خرائط تفاعلية / Maps'],
    
    githubUrl: 'https://github.com/Mostafa7i',
    demoUrl: 'https://github.com/Mostafa7i'
  },
  {
    id: 3,
    titleKey: 'CodaX Learning Platform',
    titleArKey: 'منصة CodaX التعليمية',
    categoryKey: 'EdTech',
    categoryArKey: 'تقنيات التعليم',
    descKey: 'A feature-rich educational platform for managing student groups, assignments, attendance, rankings, and performance tracking.',
    descArKey: 'منصة تعليمية متكاملة لإدارة المجموعات الطلابية، تسليم المهام، الحضور والغياب، لوحة المتصدرين، وتتبع الأداء.',
    longDescKey: 'Comprehensive EdTech platform used for my own training groups. Features complete student lifecycle management, task submission, quiz engine, attendance tracking, points/rewards system.',
    longDescArKey: 'منصة تعليمية شاملة مستخدمة لإدارة مجموعاتي التدريبية الخاصة. تتميز بإدارة كاملة لدورة حياة الطالب، تسليم المهام، نظام اختبارات، تتبع الحضور، ونظام نقاط ومكافآت.',
    gradient: 'linear-gradient(135deg, #F59E0B, #ea580c)',
    emoji: '💻',
    tags: ['React', 'Firebase', 'JavaScript', 'Tailwind CSS'],
    featuresKeys: ['Group management', 'Student rankings & leaderboard', 'Task submission system', 'Quiz engine', 'Attendance tracker', 'Points & rewards'],
    featuresArKeys: ['إدارة المجموعات', 'تصنيفات الطلاب ولوحة المتصدرين', 'نظام تسليم المهام', 'محرك الاختبارات', 'متتبع الحضور', 'النقاط والمكافآت'],
    challengeKey: 'Building a real-time leaderboard that updates instantly across all clients without performance degradation as student count grows.',
    challengeArKey: 'بناء لوحة متصدرين في الوقت الفعلي تتحدث فوراً لجميع العملاء دون تدهور في الأداء مع زيادة عدد الطلاب.',
    metrics: ['+500 طالب / 500+ Students', 'مزامنة فورية / Real-time sync', 'متعدد المجموعات'],
    
    githubUrl: 'https://github.com/Mostafa7i/codax',
    demoUrl: 'https://codax-dev.web.app/'
  },
]

function ProjectModal({ project, onClose, dict, lang }) {
  const d = (k, fb) => dict[k] || fb
  const isAr = lang === 'ar'
  const title = isAr ? project.titleArKey : project.titleKey
  const category = isAr ? project.categoryArKey : project.categoryKey
  const longDesc = isAr ? project.longDescArKey : project.longDescKey
  const features = isAr ? project.featuresArKeys : project.featuresKeys
  const challenge = isAr ? project.challengeArKey : project.challengeKey

  return (
    <motion.div 
      className="fixed inset-0  z-50 flex items-center justify-center p-4" 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }} 
      onClick={onClose}
    >
      <div className="absolute inset-0  bg-slate-950/75 backdrop-blur-md" />
      <motion.div 
        className="relative z-10 w-full max-w-2xl bg-slate-900/90 border border-slate-800/80 rounded-2xl shadow-2xl" 
        initial={{ scale: 0.95, y: 20 }} 
        animate={{ scale: 1, y: 0 }} 
        exit={{ scale: 0.95, y: 20 }} 
        onClick={(e) => e.stopPropagation()}
        style={{ maxHeight: '85vh', overflowY: 'auto' }}
        dir={isAr ? 'rtl' : 'ltr'}
      >
        {/* Banner */}
        <div 
          className="relative h-44 flex items-center justify-center overflow-hidden" 
          style={{ background: project.gradient }}
        >
          <span className="text-7xl select-none">{project.emoji}</span>
          <button 
            onClick={onClose} 
            className="absolute top-4 right-4 left-auto w-9 h-9 rounded-lg bg-black/35 hover:bg-black/55 text-white flex items-center justify-center transition-colors"
            style={{ zIndex: 20 }}
          >
            <FiX size={18} />
          </button>
          <span 
            className="glass"
            style={{
              position: 'absolute',
              bottom: '1rem',
              left: isAr ? 'auto' : '1rem',
              right: isAr ? '1rem' : 'auto',
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              padding: '0.35rem 0.85rem',
              borderRadius: '9999px',
              color: '#93c5fd',
              border: '1px solid rgba(37,99,235,0.25)'
            }}
          >
            {category}
          </span>
        </div>
        
        {/* Scrollable Content Container */}
        <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Title and Description */}
          <div>
            <h3 style={{ color: '#f1f5f9', fontWeight: 800, fontSize: '1.65rem', marginBottom: '0.75rem', lineHeight: 1.3 }}>
              {title}
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '0.92rem', lineHeight: 1.7 }}>
              {longDesc}
            </p>
          </div>

          {/* Key Features */}
          <div>
            <h4 style={{ color: '#e2e8f0', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '0.85rem' }}>
              {d('projects.features', 'Key Features')}
            </h4>
            <ul style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.75rem', padding: 0, margin: 0 }} className="md:grid-cols-2">
              {features.map((f) => (
                <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.4 }}>
                  <FiCheck className="text-teal-400 mt-0.5 flex-shrink-0" size={15} /> 
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Key Challenge */}
          <div style={{ background: 'rgba(245, 158, 11, 0.04)', border: '1px solid rgba(245, 158, 11, 0.2)', borderRadius: '0.75rem', padding: '1.25rem' }}>
            <p style={{ color: '#F59E0B', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <span>⚡</span> {d('projects.challenge', 'Key Challenge')}
            </p>
            <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.65, margin: 0 }}>
              {challenge}
            </p>
          </div>

          {/* Tech Tags */}
          <div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {project.tags.map((t) => (
                <span 
                  key={t} 
                  className="glass"
                  style={{
                    fontSize: '0.75rem',
                    padding: '0.3rem 0.75rem',
                    borderRadius: '0.5rem',
                    color: '#94a3b8'
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Metrics */}
          <div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {project.metrics.map((m) => (
                <span 
                  key={m} 
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    padding: '0.4rem 0.8rem',
                    borderRadius: '0.5rem',
                    background: 'rgba(20, 184, 166, 0.08)',
                    border: '1px solid rgba(20, 184, 166, 0.2)',
                    color: '#2dd4bf'
                  }}
                >
                  {m}
                </span>
              ))}
            </div>
          </div>

          {/* Footer Link Buttons */}
          <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
            <a 
              href={project.demoUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex-1 flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-600/35 active:scale-[0.98] transition-all duration-200"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', flex: 1, padding: '0.75rem 1rem', borderRadius: '0.75rem', fontSize: '0.9rem', fontWeight: 600, background: '#2563EB', color: '#ffffff' }}
            >
              <FiExternalLink size={16} /> {d('projects.demo', 'Live Demo')}
            </a>
            <a 
              href={project.githubUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex-1 flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-blue-400 border border-blue-600/35 rounded-xl hover:bg-blue-600/10 active:scale-[0.98] transition-all duration-200"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', flex: 1, padding: '0.75rem 1rem', borderRadius: '0.75rem', fontSize: '0.9rem', fontWeight: 600, border: '1px solid rgba(37,99,235,0.3)', color: '#60a5fa', background: 'rgba(37,99,235,0.05)' }}
            >
              <FiGithub size={16} /> {d('projects.github', 'GitHub')}
            </a>
          </div>

        </div>
      </motion.div>
    </motion.div>
  )
}

const containerV = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }
const cardV = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }

export default function ProjectsSection() {
  const { dict, lang } = useDict()
  const d = (k, fb) => dict[k] || fb
  const [selected, setSelected] = useState(null)
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 })

  return (
    <section id="projects" className="section-wrapper">
      {/* Background Gradient & Grid */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/18 to-transparent pointer-events-none" aria-hidden="true" />
      
      <div className="container relative">
        <motion.div ref={ref} variants={containerV} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
          
          {/* Section Header */}
          <motion.div variants={cardV} className='text-center mb-10'>
            <span className="section-label">
              {d('projects.label', 'Projects')}
            </span>
            <h2 className="section-title">
              {d('projects.title', 'Featured')}{' '}
              <span className="bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
                {d('projects.title.accent', 'Work')}
              </span>
            </h2>
            <p className="text-slate-400 flex items-center justify-center mx-auto text-sm md:text-base leading-relaxed">
              {d('projects.subtitle', 'Production-ready applications demonstrating full-stack expertise, system design, and AI integration.')}
            </p>
            <div className="section-divider mt-4" />
          </motion.div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => {
              const isAr = lang === 'ar'
              const title = isAr ? project.titleArKey : project.titleKey
              const category = isAr ? project.categoryArKey : project.categoryKey
              const desc = isAr ? project.descArKey : project.descKey

              return (
                <motion.div 
                  key={project.id} 
                  variants={cardV} 
                  style={{ 
                    background: 'rgba(30, 41, 59, 0.55)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    border: '1px solid rgba(51, 65, 85, 0.5)',
                    borderRadius: '1rem',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    cursor: 'pointer'
                  }}
                  onClick={() => setSelected(project)}
                  whileHover={{ y: -5 }}
                >
                  {/* Project Header Banner */}
                  <div 
                    style={{ 
                      background: project.gradient, 
                      height: '160px', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      position: 'relative',
                      borderTopLeftRadius: '0.95rem',
                      borderTopRightRadius: '0.95rem',
                      overflow: 'hidden'
                    }}
                  >
                    <span className="text-7xl select-none transition-transform duration-300 hover:scale-110">{project.emoji}</span>
                    <span 
                      className="glass"
                      style={{
                        position: 'absolute',
                        top: '0.75rem',
                        left: isAr ? 'auto' : '0.75rem',
                        right: isAr ? '0.75rem' : 'auto',
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        letterSpacing: '0.05em',
                        textTransform: 'uppercase',
                        padding: '0.3rem 0.75rem',
                        borderRadius: '9999px',
                        color: '#93c5fd',
                        border: '1px solid rgba(37,99,235,0.25)'
                      }}
                    >
                      {category}
                    </span>
                  </div>
                  
                  {/* Project Content */}
                  <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1, gap: '1rem' }}>
                    
                    {/* Header: Title and Description */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
                      <h3 style={{ color: '#f1f5f9', fontWeight: 700, fontSize: '1.05rem', margin: 0 }}>{title}</h3>
                      <p style={{ color: '#64748b', fontSize: '0.85rem', lineHeight: 1.65, margin: 0 }}>
                        {isAr ? desc.slice(0, 80) + '...' : desc}
                      </p>
                    </div>
                    
                    {/* Tech Tags */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', margin: 0 }}>
                      {project.tags.slice(0, 4).map((t) => (
                        <span 
                          key={t} 
                          className="glass"
                          style={{
                            fontSize: '0.7rem',
                            padding: '0.2rem 0.6rem',
                            borderRadius: '0.4rem',
                            color: '#94a3b8'
                          }}
                        >
                          {t}
                        </span>
                      ))}
                      {project.tags.length > 4 && (
                        <span 
                          className="glass"
                          style={{
                            fontSize: '0.7rem',
                            padding: '0.2rem 0.6rem',
                            borderRadius: '0.4rem',
                            color: '#94a3b8'
                          }}
                        >
                          +{project.tags.length - 4}
                        </span>
                      )}
                    </div>
                    
                    {/* Actions Row */}
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', margin: 0 }}>
                      <button 
                        className="hover:bg-blue-600/10 active:scale-[0.98] transition-all duration-200"
                        onClick={(e) => { e.stopPropagation(); setSelected(project) }}
                        style={{
                          flex: 1,
                          padding: '0.55rem 0.9rem',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          color: '#60a5fa',
                          border: '1px solid rgba(37,99,235,0.3)',
                          borderRadius: '0.75rem',
                          background: 'rgba(37,99,235,0.04)',
                          cursor: 'pointer'
                        }}
                      >
                        {d('projects.view', 'View Details')}
                      </button>
                      <a 
                        href={project.githubUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        onClick={(e) => e.stopPropagation()} 
                        className="glass flex items-center justify-center text-slate-400 hover:text-blue-400 hover:border-blue-500/40 transition-all duration-200"
                        title="GitHub"
                        style={{ width: 36, height: 36, borderRadius: '0.6rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      >
                        <FiGithub size={15} />
                      </a>
                      <a 
                        href={project.demoUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        onClick={(e) => e.stopPropagation()} 
                        className="glass flex items-center justify-center text-slate-400 hover:text-blue-400 hover:border-blue-500/40 transition-all duration-200"
                        title="Live Demo"
                        style={{ width: 36, height: 36, borderRadius: '0.6rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      >
                        <FiExternalLink size={15} />
                      </a>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>

      {/* Modal Dialog */}
      <AnimatePresence>
        {selected && (
          <ProjectModal 
            project={selected} 
            onClose={() => setSelected(null)} 
            dict={dict} 
            lang={lang} 
          />
        )}
      </AnimatePresence>
    </section>
  )
}
