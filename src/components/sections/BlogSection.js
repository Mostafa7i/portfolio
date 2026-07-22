'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FiArrowRight, FiClock, FiTag } from 'react-icons/fi'
import { useDict } from '@/context/DictionaryContext'

const containerV = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.09 } } }
const cardV      = { hidden: { opacity: 0, y: 22 }, visible: { opacity: 1, y: 0, transition: { duration: 0.45 } } }

export default function BlogSection() {
  const { dict } = useDict()
  const d = (k, fb) => dict[k] || fb
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 })

  const posts = [
    {
      id: 1,
      title: d('blog.p1.title', 'Building Scalable REST APIs with Node.js & Express'),
      excerpt: d('blog.p1.excerpt', 'A deep dive into designing production-ready APIs with proper error handling, validation, authentication, and rate limiting.'),
      category: d('blog.p1.category', 'Backend'),
      readTime: d('blog.p1.readTime', '8 min'),
      emoji: '⚙️', from: '#2563EB', to: '#4f46e5',
      date: d('blog.p1.date', 'July 2026'),
    },
    {
      id: 2,
      title: d('blog.p2.title', 'React Server Components: What Changed in 2026'),
      excerpt: d('blog.p2.excerpt', 'Understanding the new Server Components paradigm and how to architect applications that leverage both server and client rendering.'),
      category: d('blog.p2.category', 'React'),
      readTime: d('blog.p2.readTime', '12 min'),
      emoji: '⚛️', from: '#14B8A6', to: '#0891b2',
      date: d('blog.p2.date', 'June 2026'),
    },
    {
      id: 3,
      title: d('blog.p3.title', 'MERN Stack Architecture: From Monolith to Microservices'),
      excerpt: d('blog.p3.excerpt', 'How to structure your MERN application for long-term maintainability, scalability, and great developer experience.'),
      category: d('blog.p3.category', 'Architecture'),
      readTime: d('blog.p3.readTime', '15 min'),
      emoji: '🏗️', from: '#F59E0B', to: '#ea580c',
      date: d('blog.p3.date', 'May 2026'),
    },
    {
      id: 4,
      title: d('blog.p4.title', 'Teaching Programming: Lessons from 1000+ Students'),
      excerpt: d('blog.p4.excerpt', "What I've learned after training 1000+ developers — the mistakes beginners make, and how instructors can help them grow faster."),
      category: d('blog.p4.category', 'Education'),
      readTime: d('blog.p4.readTime', '10 min'),
      emoji: '🎓', from: '#8b5cf6', to: '#ec4899',
      date: d('blog.p4.date', 'April 2026'),
    },
    {
      id: 5,
      title: d('blog.p5.title', 'JWT Authentication: Patterns & Anti-patterns'),
      excerpt: d('blog.p5.excerpt', 'A comprehensive guide to implementing secure JWT auth with refresh tokens, RBAC, and proper token storage strategies.'),
      category: d('blog.p5.category', 'Security'),
      readTime: d('blog.p5.readTime', '11 min'),
      emoji: '🔒', from: '#ef4444', to: '#dc2626',
      date: d('blog.p5.date', 'March 2026'),
    },
    {
      id: 6,
      title: d('blog.p6.title', 'Next.js 16: New Features & What You Need to Know'),
      excerpt: d('blog.p6.excerpt', 'Exploring the latest features in Next.js 16 — improved performance, new APIs, and breaking changes to watch out for.'),
      category: d('blog.p6.category', 'Next.js'),
      readTime: d('blog.p6.readTime', '9 min'),
      emoji: '▲', from: '#475569', to: '#334155',
      date: d('blog.p6.date', 'Feb 2026'),
    },
  ]

  return (
    <section id="blog" className="section-wrapper" style={{ position: 'relative' }}>
      <div className="grid-pattern" style={{ position: 'absolute', inset: 0, opacity: 0.2, pointerEvents: 'none' }} aria-hidden="true" />

      <div className="container" style={{ position: 'relative' }}>
        <motion.div ref={ref} variants={containerV} initial="hidden" animate={inView ? 'visible' : 'hidden'}>

          {/* Header */}
          <motion.div variants={cardV} style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span className="section-label">{d('blog.label', 'Blog')}</span>
            <h2 className="section-title">
              {d('blog.title', 'Technical')}{' '}
              <span className="gradient-text">{d('blog.title.accent', 'Articles')}</span>
            </h2>
            <p style={{ color: '#64748b', maxWidth: 460, margin: '0 auto 1.25rem', fontSize: '0.93rem', lineHeight: 1.65 }}>
              {d('blog.subtitle', 'Insights on full-stack development, software architecture, and the art of teaching programming.')}
            </p>
            <div className="section-divider" />
          </motion.div>

          {/* Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
            {posts.map((post) => (
              <motion.article
                key={post.id}
                variants={cardV}
                className="card"
                style={{ overflow: 'hidden', cursor: 'pointer', display: 'flex', flexDirection: 'column' }}
              >
                {/* Gradient top accent */}
                <div style={{ height: 3, background: `linear-gradient(90deg, ${post.from}, ${post.to})` }} />

                <div style={{ padding: '1.4rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  {/* Meta row */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.9rem' }}>
                    <span style={{ fontSize: '1.5rem' }}>{post.emoji}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.72rem', color: '#60a5fa', fontWeight: 600 }}>
                        <FiTag size={11} /> {post.category}
                      </span>
                      <span style={{ color: '#334155' }}>·</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.72rem', color: '#475569' }}>
                        <FiClock size={11} /> {post.readTime}
                      </span>
                    </div>
                  </div>

                  <h3 style={{ color: '#e2e8f0', fontWeight: 700, fontSize: '0.95rem', lineHeight: 1.5, marginBottom: '0.65rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {post.title}
                  </h3>
                  <p style={{ color: '#64748b', fontSize: '0.82rem', lineHeight: 1.65, marginBottom: '1rem', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden', flex: 1 }}>
                    {post.excerpt}
                  </p>

                  <div style={{ display: 'flex', alignItems: 'center', justifyBetween: 'space-between', marginTop: 'auto' }}>
                    <span style={{ color: '#334155', fontSize: '0.72rem' }}>{post.date}</span>
                    <button style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#60a5fa', fontSize: '0.78rem', fontWeight: 500, background: 'none', border: 'none', cursor: 'pointer', padding: 0, transition: 'gap 0.2s' }}>
                      {d('blog.readmore', 'Read more')} <FiArrowRight size={13} />
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {/* CTA */}
          <motion.div variants={cardV} style={{ textAlign: 'center', marginTop: '3rem' }}>
            <button className="btn-outline">{d('blog.cta', 'View All Articles')}</button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
