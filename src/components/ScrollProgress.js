'use client'

import { useEffect, useRef } from 'react'

export default function ScrollProgress() {
  const barRef = useRef(null)

  useEffect(() => {
    const bar = barRef.current
    if (!bar) return

    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight
      const scrolled = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0
      // Directly mutate DOM — no React re-render triggered
      bar.style.width = `${scrolled}%`
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      ref={barRef}
      id="scroll-progress"
      style={{ width: '0%' }}
      aria-hidden="true"
    />
  )
}
