'use client'

import { motion } from 'framer-motion'
import { FiArrowLeft, FiHome } from 'react-icons/fi'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0F172A] relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-20" aria-hidden="true" />
      <div className="absolute inset-0 radial-glow" aria-hidden="true" />

      <motion.div
        className="relative text-center px-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-[10rem] font-bold leading-none gradient-text mb-4 select-none">
          404
        </div>
        <h1 className="text-3xl font-bold text-white mb-4">Page Not Found</h1>
        <p className="text-slate-400 mb-10 max-w-sm mx-auto">
          Looks like this page got lost in the cloud. Let&apos;s get you back on track.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/"
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-teal-500 text-white font-semibold rounded-xl flex items-center gap-2 hover:opacity-90 transition-opacity"
          >
            <FiHome size={18} /> Go Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="px-6 py-3 glass border border-slate-700/50 text-slate-300 font-semibold rounded-xl flex items-center gap-2 hover:text-white transition-colors"
          >
            <FiArrowLeft size={18} /> Go Back
          </button>
        </div>
      </motion.div>
    </div>
  )
}
