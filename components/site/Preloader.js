'use client'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function Preloader() {
  const [show, setShow] = useState(true)
  useEffect(() => {
    const t = setTimeout(() => setShow(false), 1300)
    return () => clearTimeout(t)
  }, [])
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20, transition: { duration: 0.5, ease: [0.65, 0, 0.35, 1] } }}
          className="fixed inset-0 z-[100] grid place-items-center overflow-hidden"
          style={{ background: 'radial-gradient(1000px 600px at 30% 20%, rgba(225,29,72,0.30), transparent 60%), radial-gradient(900px 500px at 80% 80%, rgba(14,165,233,0.30), transparent 60%), #0f172a' }}
        >
          {/* floating dots */}
          {[
            { c: '#facc15', s: 10, x: '15%', y: '25%', d: 0 },
            { c: '#e11d48', s: 8, x: '85%', y: '30%', d: 0.2 },
            { c: '#0ea5e9', s: 12, x: '80%', y: '70%', d: 0.35 },
            { c: '#22c55e', s: 9, x: '18%', y: '75%', d: 0.5 },
          ].map((b, i) => (
            <motion.span key={i} className="absolute rounded-full"
              style={{ width: b.s, height: b.s, left: b.x, top: b.y, backgroundColor: b.c, boxShadow: `0 0 24px ${b.c}` }}
              animate={{ y: [0, -14, 0], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', delay: b.d }} />
          ))}
          <motion.div
            initial={{ scale: 0.85, opacity: 0, y: 12 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/15">
              <Image src="/images/logo-md.png" alt="Sarojani Funland" width={280} height={186} priority className="w-[220px] sm:w-[280px] h-auto" />
              {/* shimmer sweep */}
              <motion.div
                initial={{ x: '-120%' }}
                animate={{ x: '150%' }}
                transition={{ duration: 1.1, ease: 'easeInOut', delay: 0.25 }}
                className="absolute inset-y-0 -left-1/3 w-1/3"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.55), transparent)' }}
              />
            </div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mt-5 text-center text-white/70 text-xs tracking-[0.35em] uppercase">Loading the fun</motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
