'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function Preloader() {
  const [show, setShow] = useState(true)
  useEffect(() => {
    const t = setTimeout(() => setShow(false), 1400)
    return () => clearTimeout(t)
  }, [])
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.65, 0, 0.35, 1] } }}
          className="fixed inset-0 z-[100] grid place-items-center brand-gradient animate-gradient"
        >
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-center"
          >
            <motion.div
              className="mx-auto h-20 w-20 rounded-2xl bg-white/95 grid place-items-center shadow-glow"
              animate={{ rotate: [0, 8, -8, 0] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <span className="font-display text-3xl brand-text font-extrabold">SF</span>
            </motion.div>
            <div className="mt-6 font-display text-white text-2xl font-bold tracking-tight">Sarojani Funland</div>
            <div className="mt-1 text-white/85 text-sm">Loading the fun…</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
