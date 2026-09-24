'use client'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function Preloader() {
  const [show, setShow] = useState(true)
  const [pct, setPct] = useState(0)

  useEffect(() => {
    // fast simulated progress
    let raf, start
    const dur = 1200
    const step = (t) => {
      if (!start) start = t
      const p = Math.min(1, (t - start) / dur)
      // ease-out cubic
      const eased = 1 - Math.pow(1 - p, 3)
      setPct(Math.round(eased * 100))
      if (p < 1) raf = requestAnimationFrame(step)
      else setTimeout(() => setShow(false), 260)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02, transition: { duration: 0.55, ease: [0.65, 0, 0.35, 1] } }}
          className="fixed inset-0 z-[100] grid place-items-center overflow-hidden"
          style={{ background: 'radial-gradient(1000px 700px at 25% 20%, rgba(225,29,72,0.32), transparent 60%), radial-gradient(900px 700px at 80% 80%, rgba(14,165,233,0.30), transparent 60%), radial-gradient(700px 500px at 50% 50%, rgba(250,204,21,0.15), transparent 60%), #08091a' }}
        >
          {/* Ambient sparkles */}
          {Array.from({ length: 14 }).map((_, i) => {
            const seed = (i + 1) * 7.31
            const left = ((seed * 37) % 100)
            const top = ((seed * 53) % 100)
            const size = 4 + ((i * 3) % 8)
            const colors = ['#facc15', '#e11d48', '#0ea5e9', '#22c55e', '#f472b6']
            const c = colors[i % colors.length]
            return (
              <motion.span
                key={i}
                className="absolute rounded-full"
                style={{ width: size, height: size, left: `${left}%`, top: `${top}%`, backgroundColor: c, boxShadow: `0 0 ${size * 3}px ${c}` }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: [0, 1, 0.4, 1], scale: [0, 1.2, 0.9, 1.1], y: [0, -14, 0] }}
                transition={{ duration: 2.2, delay: 0.05 * i, repeat: Infinity, ease: 'easeInOut' }}
              />
            )
          })}

          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 16 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex flex-col items-center"
          >
            {/* Rotating gradient ring */}
            <div className="relative">
              <motion.div
                className="absolute inset-0 rounded-[2rem] p-[3px]"
                style={{ background: 'conic-gradient(from 0deg, #e11d48, #facc15, #22c55e, #0ea5e9, #e11d48)' }}
                animate={{ rotate: 360 }}
                transition={{ duration: 3.6, repeat: Infinity, ease: 'linear' }}
              >
                <div className="w-full h-full rounded-[calc(2rem-3px)] bg-slate-950" />
              </motion.div>
              {/* Logo card */}
              <motion.div
                className="relative m-[6px] rounded-[calc(2rem-9px)] overflow-hidden ring-1 ring-white/10"
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Image src="/images/logo-md.png" alt="Sarojani Funland" width={300} height={200} priority className="w-[220px] sm:w-[280px] h-auto block" />
                {/* Shimmer sweep */}
                <motion.div
                  initial={{ x: '-140%' }}
                  animate={{ x: '160%' }}
                  transition={{ duration: 1.4, ease: 'easeInOut', repeat: Infinity, repeatDelay: 0.4 }}
                  className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3"
                  style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.55), transparent)' }}
                />
              </motion.div>
            </div>

            {/* Progress bar */}
            <div className="mt-6 w-[220px] sm:w-[280px]">
              <div className="h-1.5 rounded-full overflow-hidden bg-white/10">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: 'linear-gradient(90deg,#e11d48,#facc15,#0ea5e9)' }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
              <div className="mt-3 flex items-center justify-between text-white/70 text-[11px] tracking-[0.3em] uppercase font-medium">
                <span>Loading the fun</span>
                <motion.span key={pct} initial={{ opacity: 0, y: 3 }} animate={{ opacity: 1, y: 0 }} className="tabular-nums">{pct}%</motion.span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
