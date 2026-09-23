'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion'
import {
  Phone, MapPin, Mail, Instagram, MessageCircle, ChevronDown, Menu, X,
  Sparkles, Rocket, Car, Bike, Gamepad2, PartyPopper, ShieldCheck,
  Clock, Star, ArrowRight, ArrowUpRight, Check, CalendarDays, Users, Heart, Baby, Zap,
} from 'lucide-react'
import { toast } from 'sonner'
import SmoothScroll from '@/components/site/SmoothScroll'
import Preloader from '@/components/site/Preloader'

/* ---------- Data ---------- */
const NAV = [
  { href: '#attractions', label: 'Attractions' },
  { href: '#how', label: 'How it works' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#parties', label: 'Parties' },
  { href: '#faq', label: 'FAQ' },
  { href: '#visit', label: 'Visit' },
]

const ATTRACTIONS = [
  { icon: Sparkles, title: 'Indoor Play Zone', desc: 'Slides, ball pool, soft play and interactive activities designed for kids of all ages.', img: '/images/new/play-zone.jpg', tint: 'from-rose-500 to-amber-400' },
  { icon: Rocket, title: 'Trampoline', desc: 'Safe, springy trampoline sessions to burn energy and make kids giggle.', img: '/images/new/trampoline.jpg', tint: 'from-amber-400 to-rose-500' },
  { icon: Car, title: 'Electric Cars', desc: 'Small and large electric car rides on a controlled indoor track.', img: '/images/new/electric-cars.jpg', tint: 'from-sky-500 to-blue-600' },
  { icon: Bike, title: 'Scooter Rides', desc: 'Kid-sized scooter rides in a fully supervised, safe environment.', img: '/images/new/scooters-play.jpg', tint: 'from-emerald-500 to-lime-500' },
  { icon: Gamepad2, title: 'VR & AR Games', desc: 'Immersive VR (Meta Quest 3S) and AR gaming that kids and parents love to try.', img: '/images/new/vr.jpg', tint: 'from-sky-500 to-violet-500' },
]

const PRICING = [
  { title: 'Full Play Zone Package', price: 250, duration: '30 mins + 10 mins extendable', popular: true, icon: PartyPopper, tint: 'from-rose-600 to-amber-400' },
  { title: 'Play Zone', price: 100, duration: '15 mins', icon: Sparkles, tint: 'from-rose-500 to-pink-500' },
  { title: 'Trampoline', price: 100, duration: '15 mins', icon: Rocket, tint: 'from-amber-400 to-orange-500' },
  { title: 'Scooter Ride', price: 100, duration: '10 mins', icon: Bike, tint: 'from-emerald-500 to-lime-500' },
  { title: 'Small Electric Car', price: 120, duration: '2 rounds', icon: Car, tint: 'from-sky-400 to-blue-600' },
  { title: 'Large Electric Car', price: 150, duration: '2 rounds', icon: Car, tint: 'from-blue-500 to-indigo-600' },
  { title: 'VR / AR Games', price: 150, duration: '15 mins', icon: Gamepad2, tint: 'from-violet-500 to-rose-500' },
]

const STEPS = [
  { icon: Sparkles, title: 'Choose', desc: 'Pick your favourite activity or the full-play package.' },
  { icon: CalendarDays, title: 'Book', desc: 'Reserve a date and time slot online in under a minute.' },
  { icon: PartyPopper, title: 'Play', desc: 'Walk in, meet our staff, and let the fun begin.' },
]

const REVIEWS = [
  { name: 'Priya S.', text: 'My kids didn’t want to leave. Super safe and the staff was very sweet with the little ones.', rating: 5 },
  { name: 'Arun K.', text: 'Loved the VR games and the electric car track. Great value for a family outing in Mysuru.', rating: 5 },
  { name: 'Deepa R.', text: 'Booked online, walked in, no wait. The trampoline was my son’s favourite.', rating: 5 },
  { name: 'Karthik N.', text: 'Clean, well-lit, well-organised. Feels premium and safe. Kids had a blast.', rating: 5 },
]

const FAQS = [
  { q: 'What are the age limits?', a: 'Our play zone welcomes kids from 2 to 12. Toddlers must be accompanied by a parent.' },
  { q: 'What are the timings?', a: 'We’re open every day 11:00 AM to 9:30 PM. Timings may vary on public holidays.' },
  { q: 'Can parents go inside?', a: 'Yes, parents can accompany their kids into the play zone. Socks are mandatory for adults and children.' },
  { q: 'Do I need to bring socks?', a: 'Yes, please. If you forget, socks are available at the counter.' },
  { q: 'Is there parking?', a: 'Yes, ample parking is available at Hotel Continental.' },
  { q: 'How does online booking work?', a: 'Choose your activity, date and slot on our booking page. You’ll get a confirmation instantly on-screen and a call back if needed.' },
  { q: 'Do you host birthday parties?', a: 'Absolutely. We offer customisable birthday and group packages. Use the enquiry form below.' },
]

/* ---------- Helpers ---------- */
const useCountUp = (to, dur = 1400, start = false) => {
  const [v, setV] = useState(0)
  useEffect(() => {
    if (!start) return
    let raf, t0
    const step = (t) => {
      if (!t0) t0 = t
      const p = Math.min((t - t0) / dur, 1)
      setV(Math.floor(p * to))
      if (p < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [to, dur, start])
  return v
}

const Reveal = ({ children, delay = 0, y = 24 }) => (
  <motion.div
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-80px' }}
    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay }}
  >{children}</motion.div>
)

/* ---------- Nav ---------- */
function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <>
      <div className="fixed top-0 inset-x-0 z-[60] brand-gradient animate-gradient text-white text-center text-xs sm:text-sm py-2 px-4">
        <span className="font-semibold">✨ Limited time —</span> Book online & skip the queue. Call <a className="underline underline-offset-2" href="tel:+916360921458">+91 63609 21458</a>
      </div>
      <motion.nav
        initial={false}
        animate={{ backgroundColor: scrolled ? 'rgba(255,255,255,0.72)' : 'rgba(255,255,255,0)' }}
        transition={{ duration: 0.3 }}
        className={`fixed top-[34px] inset-x-0 z-50 transition-all ${scrolled ? 'glass border-b border-white/40 shadow-soft' : ''}`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="h-9 w-9 rounded-xl brand-gradient grid place-items-center shadow-soft">
              <span className="font-display font-extrabold text-white">S</span>
            </div>
            <span className={`font-display font-bold text-lg tracking-tight ${scrolled ? 'text-slate-900' : 'text-white drop-shadow'}`}>Sarojani Funland</span>
          </Link>
          <div className="hidden lg:flex items-center gap-1">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} className={`relative px-3 py-2 text-sm font-medium rounded-full transition ${scrolled ? 'text-slate-700 hover:text-slate-900' : 'text-white/90 hover:text-white'}`}>
                <span>{n.label}</span>
              </a>
            ))}
          </div>
          <div className="hidden lg:flex items-center gap-2">
            <a href="tel:+916360921458" className={`inline-flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium ${scrolled ? 'text-slate-800 hover:bg-slate-100' : 'text-white hover:bg-white/10'}`}>
              <Phone className="h-4 w-4" /> Call
            </a>
            <Link href="/book" className="relative inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-white brand-gradient shadow-glow hover:brightness-110 transition">
              Book Now <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <button className={`lg:hidden p-2 rounded-lg ${scrolled ? 'text-slate-800' : 'text-white'}`} onClick={() => setOpen(true)} aria-label="Open menu"><Menu /></button>
        </div>
      </motion.nav>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[70] brand-gradient animate-gradient lg:hidden">
            <div className="flex items-center justify-between px-6 py-5 text-white">
              <div className="font-display font-bold text-lg">Sarojani Funland</div>
              <button onClick={() => setOpen(false)} aria-label="Close menu"><X /></button>
            </div>
            <div className="px-6 mt-10 flex flex-col gap-5">
              {NAV.map((n, i) => (
                <motion.a key={n.href} href={n.href} onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i }}
                  className="font-display text-3xl font-bold text-white">{n.label}</motion.a>
              ))}
              <Link href="/book" onClick={() => setOpen(false)} className="mt-4 inline-flex items-center justify-center gap-2 py-4 rounded-2xl bg-white text-slate-900 font-bold text-lg shadow-glow">
                Book Now <ArrowRight className="h-5 w-5" />
              </Link>
              <a href="tel:+916360921458" className="inline-flex items-center justify-center gap-2 py-4 rounded-2xl bg-black/25 text-white font-semibold">
                <Phone className="h-5 w-5" /> +91 63609 21458
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

/* ---------- Hero ---------- */
function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const scale = useTransform(scrollYProgress, [0, 1], [1.05, 1.2])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    setMouse({ x: (e.clientX - r.left) / r.width - 0.5, y: (e.clientY - r.top) / r.height - 0.5 })
  }

  const heading = 'Where Fun & Wonder Come Alive'
  const words = heading.split(' ')

  return (
    <section ref={ref} onMouseMove={onMove} className="relative h-[100svh] min-h-[640px] w-full overflow-hidden">
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <Image src="/images/new/hero-wide.jpg" alt="Sarojani Funland kids play area in Mysuru" fill priority sizes="100vw" className="object-cover" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/55 via-slate-900/50 to-slate-950/90" />
      <div className="absolute inset-0 brand-gradient opacity-20 mix-blend-overlay animate-gradient" />

      {/* Floating shapes */}
      {[
        { c: 'from-rose-400 to-red-500', s: 90, x: '8%', y: '18%', d: 0 },
        { c: 'from-amber-300 to-yellow-500', s: 60, x: '85%', y: '22%', d: 0.4 },
        { c: 'from-sky-400 to-blue-500', s: 110, x: '82%', y: '68%', d: 0.8 },
        { c: 'from-emerald-300 to-green-500', s: 70, x: '12%', y: '72%', d: 1.2 },
      ].map((b, i) => (
        <motion.div
          key={i}
          className={`hidden md:block absolute rounded-full bg-gradient-to-br ${b.c} blur-[2px] shadow-glow`}
          style={{ width: b.s, height: b.s, left: b.x, top: b.y, x: mouse.x * (20 + i * 8), y: mouse.y * (20 + i * 8) }}
          animate={{ y: ['0%', '-8%', '0%'] }}
          transition={{ duration: 6 + i, repeat: Infinity, ease: 'easeInOut', delay: b.d }}
        />
      ))}

      <motion.div style={{ opacity }} className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center text-white">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 1.4 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-dark text-white/90 text-xs sm:text-sm font-medium border border-white/15">
          <Star className="h-3.5 w-3.5 fill-amber-300 text-amber-300" /> Mysuru’s premium indoor play destination
        </motion.div>
        <h1 className="mt-6 font-display text-[2.75rem] leading-[1] sm:text-7xl md:text-8xl font-extrabold max-w-5xl px-2">
          {words.map((w, i) => (
            <motion.span key={i} initial={{ y: '110%', opacity: 0 }} animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 1.5 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="inline-block mr-2 sm:mr-3">
              <span className={i === 2 || i === 3 ? 'brand-text drop-shadow-[0_2px_10px_rgba(225,29,72,0.35)]' : ''}>{w}</span>
            </motion.span>
          ))}
        </h1>
        <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.2, duration: 0.6 }}
          className="mt-6 max-w-2xl text-white/85 text-base sm:text-lg">
          Trampolines, electric car rides, VR games and more — curated indoor adventures for the family at Hotel Continental, Nazarbad.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.35, duration: 0.6 }}
          className="mt-8 flex flex-col sm:flex-row items-center gap-3">
          <Link href="/book" className="relative group inline-flex items-center gap-2 px-7 py-4 rounded-full text-base font-bold text-slate-900 bg-white shadow-glow hover:shadow-[0_25px_60px_-20px_rgba(255,255,255,0.5)] transition">
            <span className="absolute inset-0 rounded-full brand-gradient opacity-0 group-hover:opacity-100 transition" />
            <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition">Book your visit <ArrowRight className="h-5 w-5" /></span>
          </Link>
          <a href="#attractions" className="inline-flex items-center gap-2 px-6 py-4 rounded-full text-base font-semibold text-white border border-white/30 hover:bg-white/10 transition">
            Explore attractions
          </a>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3, duration: 0.8 }} className="absolute bottom-8 flex flex-col items-center gap-2 text-white/70">
          <div className="text-xs tracking-widest uppercase">Scroll</div>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.8, repeat: Infinity }}><ChevronDown className="h-5 w-5" /></motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}

/* ---------- Stats ---------- */
function Stat({ to, suffix, label, icon: Icon, start }) {
  const v = useCountUp(to, 1400, start)
  return (
    <div className="flex flex-col items-center text-center">
      <div className="h-12 w-12 rounded-2xl brand-gradient grid place-items-center shadow-soft mb-3">
        <Icon className="h-6 w-6 text-white" />
      </div>
      <div className="font-display text-4xl sm:text-5xl font-extrabold text-slate-900">{v.toLocaleString()}{suffix}</div>
      <div className="mt-1 text-sm text-slate-600">{label}</div>
    </div>
  )
}
function Stats() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <section ref={ref} className="py-10 sm:py-14 bg-white">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
        <Stat to={12000} suffix="+" label="Happy kids" icon={Heart} start={inView} />
        <Stat to={7} suffix="" label="Fun activities" icon={Sparkles} start={inView} />
        <Stat to={100} suffix="%" label="Safe & supervised" icon={ShieldCheck} start={inView} />
        <Stat to={5} suffix="★" label="Loved by parents" icon={Star} start={inView} />
      </div>
    </section>
  )
}

/* ---------- Attractions ---------- */
function TiltCard({ children }) {
  const ref = useRef(null)
  const [t, setT] = useState({ rx: 0, ry: 0 })
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    setT({ rx: -y * 8, ry: x * 10 })
  }
  const onLeave = () => setT({ rx: 0, ry: 0 })
  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ transform: `perspective(1000px) rotateX(${t.rx}deg) rotateY(${t.ry}deg)` }}
      className="transition-transform will-change-transform"
    >{children}</motion.div>
  )
}

function Attractions() {
  return (
    <section id="attractions" className="relative py-16 sm:py-24 bg-gradient-to-b from-white to-rose-50/40">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-semibold uppercase tracking-wider">Attractions</div>
            <h2 className="mt-4 font-display text-4xl sm:text-6xl font-extrabold text-slate-900 leading-[1.02]">Adventures for every little explorer</h2>
            <p className="mt-4 text-slate-600 text-lg">Handpicked activities, thoughtfully designed spaces and staff who genuinely love kids.</p>
          </div>
        </Reveal>
        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ATTRACTIONS.map((a, i) => (
            <Reveal key={a.title} delay={i * 0.06}>
              <TiltCard>
                <div className="group relative overflow-hidden rounded-3xl bg-white border border-slate-100 shadow-soft hover:shadow-glow transition-shadow">
                  <div className="relative h-56 overflow-hidden">
                    <Image src={a.img} alt={a.title} fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover transition-transform duration-[1200ms] group-hover:scale-110" />
                    <div className={`absolute inset-0 bg-gradient-to-t ${a.tint} opacity-20 mix-blend-multiply`} />
                    <div className="absolute top-4 left-4 h-11 w-11 rounded-2xl glass grid place-items-center border border-white/40">
                      <a.icon className="h-5 w-5 text-slate-900" />
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-2xl font-bold text-slate-900">{a.title}</h3>
                    <p className="mt-2 text-slate-600">{a.desc}</p>
                    <Link href="/book" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-rose-700 group-hover:gap-2 transition-all">Book this <ArrowUpRight className="h-4 w-4" /></Link>
                  </div>
                  <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition [background:conic-gradient(from_180deg_at_50%_50%,rgba(236,72,153,.35),rgba(124,58,237,.35),rgba(251,146,60,.35),rgba(236,72,153,.35))] [mask:linear-gradient(#000,#000)_content-box,linear-gradient(#000,#000)] [mask-composite:exclude] p-[1.5px]" />
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------- How ---------- */
function How() {
  return (
    <section id="how" className="py-16 sm:py-24 bg-slate-950 text-white relative overflow-hidden">
      <div className="absolute inset-0 mesh-bg opacity-70" />
      <div className="relative max-w-6xl mx-auto px-6">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white/80 text-xs font-semibold uppercase tracking-wider">Plan your visit</div>
            <h2 className="mt-4 font-display text-4xl sm:text-6xl font-extrabold">Three steps to a smile</h2>
            <p className="mt-4 text-white/70 text-lg">From choosing an activity to that first happy scream — it takes less than a minute.</p>
          </div>
        </Reveal>
        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {STEPS.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08}>
              <div className="relative rounded-3xl p-8 bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition">
                <div className="absolute -top-4 left-6 h-8 w-8 rounded-full brand-gradient grid place-items-center font-bold text-white shadow-glow">{i + 1}</div>
                <s.icon className="h-8 w-8 text-rose-300" />
                <h3 className="mt-4 font-display text-2xl font-bold">{s.title}</h3>
                <p className="mt-2 text-white/70">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------- Gallery ---------- */
const GALLERY = [
  { src: '/images/new/hero-wide.jpg', title: 'Overview', span: 'md:col-span-2 md:row-span-2' },
  { src: '/images/new/play-zone.jpg', title: 'Play Zone' },
  { src: '/images/new/trampoline.jpg', title: 'Trampoline' },
  { src: '/images/new/electric-cars.jpg', title: 'Electric Cars' },
  { src: '/images/new/scooters-play.jpg', title: 'Scooter Rides', span: 'md:col-span-2' },
  { src: '/images/new/ball-pit.jpg', title: 'Ball Pit' },
  { src: '/images/new/bounce-house.jpg', title: 'Bounce House' },
  { src: '/images/new/vr.jpg', title: 'Meta Quest 3S VR' },
  { src: '/images/new/ride-ons.jpg', title: 'Ride-ons' },
  { src: '/images/new/interior-wide.jpg', title: 'Funland Interior' },
]
function Gallery() {
  const [active, setActive] = useState(null)
  useEffect(() => {
    if (active === null) return
    const onKey = (e) => {
      if (e.key === 'Escape') setActive(null)
      if (e.key === 'ArrowRight') setActive((a) => (a + 1) % GALLERY.length)
      if (e.key === 'ArrowLeft') setActive((a) => (a - 1 + GALLERY.length) % GALLERY.length)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [active])
  return (
    <section id="gallery" className="py-16 sm:py-24 bg-gradient-to-b from-rose-50/40 to-white">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-semibold uppercase tracking-wider">Gallery</div>
              <h2 className="mt-4 font-display text-4xl sm:text-6xl font-extrabold text-slate-900">Fun moments, frozen in time</h2>
            </div>
            <p className="text-slate-600 max-w-md">A peek into the giggles, races and mid-air jumps that happen here every day.</p>
          </div>
        </Reveal>
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 auto-rows-[130px] sm:auto-rows-[170px] md:auto-rows-[220px] gap-3 sm:gap-4">
          {GALLERY.map((g, i) => (
            <motion.button
              key={i}
              onClick={() => setActive(i)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: (i % 6) * 0.05 }}
              className={`group relative overflow-hidden rounded-3xl shadow-soft ${g.span || ''}`}
              aria-label={`View ${g.title}`}
            >
              <Image src={g.src} alt={g.title} fill sizes="(max-width:768px) 50vw, 25vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-90" />
              <div className="absolute left-4 bottom-3 text-white font-semibold drop-shadow">{g.title}</div>
            </motion.button>
          ))}
        </div>
      </div>
      <AnimatePresence>
        {active !== null && (
          <motion.div className="fixed inset-0 z-[80] bg-black/85 grid place-items-center p-4" onClick={() => setActive(null)}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <button className="absolute top-4 right-4 text-white p-2" onClick={() => setActive(null)}><X /></button>
            <motion.div key={active} initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-5xl aspect-[16/10]" onClick={(e) => e.stopPropagation()}>
              <Image src={GALLERY[active].src} alt={GALLERY[active].title} fill sizes="100vw" className="object-contain" />
              <div className="absolute -bottom-10 left-0 right-0 text-center text-white/80">{GALLERY[active].title} • {active + 1}/{GALLERY.length}</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

/* ---------- Pricing ---------- */
function PriceCard({ p, i }) {
  const price = useCountUp(p.price, 900, true)
  return (
    <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
      className={`relative rounded-3xl p-6 border ${p.popular ? 'border-transparent' : 'border-slate-200'} bg-white hover:-translate-y-1 transition-transform`}>
      {p.popular && (
        <>
          <div className="absolute inset-0 rounded-3xl brand-gradient animate-gradient opacity-90" />
          <div className="absolute inset-[2px] rounded-[calc(1.5rem-2px)] bg-white" />
          <div className="absolute -top-3 left-6 px-3 py-1 rounded-full text-xs font-bold brand-gradient text-white shadow-glow">MOST POPULAR</div>
        </>
      )}
      <div className="relative">
        <div className={`h-12 w-12 rounded-2xl grid place-items-center text-white shadow-soft bg-gradient-to-br ${p.tint}`}>
          <p.icon className="h-5 w-5" />
        </div>
        <div className="mt-4 text-xs font-semibold uppercase tracking-wider text-slate-500">{p.duration}</div>
        <h3 className="mt-1 font-display text-xl font-bold text-slate-900">{p.title}</h3>
        <div className="mt-4 flex items-end gap-1">
          <span className="font-display text-4xl font-extrabold text-slate-900">₹{price}</span>
          <span className="mb-1 text-slate-500 text-sm">/ per person</span>
        </div>
        {p.popular && <div className="mt-4 h-1 rounded-full animate-shimmer bg-white/60" />}
        <Link href={`/book?activity=${encodeURIComponent(p.title)}`} className={`mt-5 inline-flex items-center gap-2 text-sm font-semibold ${p.popular ? 'brand-text' : 'text-rose-700'} hover:gap-3 transition-all`}>
          Book now <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </motion.div>
  )
}
function Pricing() {
  return (
    <section id="pricing" className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 text-sky-700 text-xs font-semibold uppercase tracking-wider">Pricing</div>
            <h2 className="mt-4 font-display text-4xl sm:text-6xl font-extrabold text-slate-900">Simple, honest, worth-every-rupee</h2>
            <p className="mt-4 text-slate-600 text-lg">Save with the Full Play Zone Package — our most popular pick for families.</p>
          </div>
        </Reveal>
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRICING.map((p, i) => <PriceCard key={p.title} p={p} i={i} />)}
        </div>
      </div>
    </section>
  )
}

/* ---------- Safety ---------- */
function Safety() {
  const items = [
    { icon: ShieldCheck, title: 'Supervised play', desc: 'Trained staff on the floor at all times.' },
    { icon: Baby, title: 'Kid-safe zones', desc: 'Soft edges, padded flooring and secure equipment.' },
    { icon: Zap, title: 'Sanitised daily', desc: 'Frequent cleaning of high-touch surfaces.' },
    { icon: Users, title: 'Parent-friendly', desc: 'Parents can accompany their kids inside.' },
  ]
  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-white to-sky-50/60">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-14 items-center">
        <Reveal>
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold uppercase tracking-wider">Safety Promise</div>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl font-extrabold text-slate-900">Parents relax. Kids play.</h2>
            <p className="mt-4 text-slate-600 text-lg">Every corner of Sarojani Funland is designed with safety in mind so families can focus on fun.</p>
            <div className="mt-8 grid sm:grid-cols-2 gap-4">
              {items.map((it) => (
                <div key={it.title} className="rounded-2xl bg-white p-5 shadow-soft flex gap-4">
                  <div className="h-10 w-10 rounded-xl brand-gradient grid place-items-center shrink-0">
                    <it.icon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">{it.title}</div>
                    <div className="text-slate-600 text-sm">{it.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="relative rounded-3xl overflow-hidden shadow-glow aspect-[4/5]">
            <Image src="/images/new/bounce-house.jpg" alt="Safe indoor play area for kids" fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex items-center gap-3 glass rounded-2xl p-4 border border-white/50">
              <ShieldCheck className="h-6 w-6 text-emerald-600" />
              <div>
                <div className="font-semibold text-slate-900">Trusted by Mysuru families</div>
                <div className="text-sm text-slate-600">Rated 5★ by parents on Google.</div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ---------- Reviews ---------- */
function Reviews() {
  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-semibold uppercase tracking-wider">Parents love us</div>
            <h2 className="mt-4 font-display text-4xl sm:text-6xl font-extrabold text-slate-900">Stories from happy families</h2>
          </div>
        </Reveal>
        <div className="mt-12 overflow-x-auto no-scrollbar -mx-6 px-6">
          <div className="flex gap-5 snap-x snap-mandatory">
            {REVIEWS.map((r, i) => (
              <motion.figure key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.05 }}
                className="snap-start shrink-0 w-[85%] sm:w-[420px] rounded-3xl bg-gradient-to-br from-rose-50 to-amber-50 border border-rose-100 p-7 shadow-soft">
                <div className="flex gap-0.5 text-amber-500">{Array.from({ length: r.rating }).map((_, k) => <Star key={k} className="h-4 w-4 fill-amber-500" />)}</div>
                <blockquote className="mt-4 text-slate-800 text-lg leading-relaxed">“{r.text}”</blockquote>
                <figcaption className="mt-5 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full brand-gradient grid place-items-center text-white font-bold">{r.name[0]}</div>
                  <div>
                    <div className="font-semibold text-slate-900">{r.name}</div>
                    <div className="text-xs text-slate-500">Verified visitor</div>
                  </div>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------- Parties ---------- */
function Parties() {
  const [form, setForm] = useState({ name: '', mobile: '', groupSize: '', preferredDate: '', message: '' })
  const [loading, setLoading] = useState(false)
  const submit = async (e) => {
    e.preventDefault()
    if (!/^[0-9]{10}$/.test(form.mobile)) return toast.error('Enter a valid 10-digit mobile number')
    if (!form.name) return toast.error('Please add your name')
    setLoading(true)
    try {
      const res = await fetch('/api/enquiries', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...form, type: 'birthday' }) })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed')
      toast.success('Enquiry sent! We’ll call you shortly.')
      setForm({ name: '', mobile: '', groupSize: '', preferredDate: '', message: '' })
    } catch (err) { toast.error(err.message) } finally { setLoading(false) }
  }
  return (
    <section id="parties" className="py-16 sm:py-24 relative overflow-hidden">
      <div className="absolute inset-0 brand-gradient animate-gradient" />
      <div className="absolute inset-0 bg-black/30" />
      <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center text-white">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-semibold uppercase tracking-wider">Birthday & Groups</div>
          <h2 className="mt-4 font-display text-4xl sm:text-6xl font-extrabold leading-[1.02]">Make their birthday <span className="italic">unforgettable</span></h2>
          <p className="mt-4 text-white/85 text-lg max-w-xl">Book the entire Funland for your kid’s big day. Decorations, cake table, dedicated staff and unlimited fun — we’ll handle the rest.</p>
          <ul className="mt-6 space-y-2 text-white/90">
            {['Customised themes','Party host','Priority attractions access','Photography-friendly zones'].map(x => (
              <li key={x} className="flex items-center gap-2"><Check className="h-4 w-4" /> {x}</li>
            ))}
          </ul>
        </div>
        <form onSubmit={submit} className="rounded-3xl bg-white text-slate-900 p-6 sm:p-8 shadow-glow">
          <div className="font-display text-2xl font-bold">Send an enquiry</div>
          <div className="text-slate-500 text-sm">We’ll get back to you within a few hours.</div>
          <div className="mt-5 grid gap-3">
            <input required placeholder="Your name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} className="px-4 py-3 rounded-xl border border-slate-200 focus:border-rose-500 focus:ring-4 focus:ring-rose-100 outline-none" />
            <input required placeholder="10-digit mobile" value={form.mobile} onChange={e=>setForm({...form,mobile:e.target.value.replace(/\D/g,'').slice(0,10)})} className="px-4 py-3 rounded-xl border border-slate-200 focus:border-rose-500 focus:ring-4 focus:ring-rose-100 outline-none" />
            <div className="grid grid-cols-2 gap-3">
              <input placeholder="Kids (approx)" value={form.groupSize} onChange={e=>setForm({...form,groupSize:e.target.value})} className="px-4 py-3 rounded-xl border border-slate-200 focus:border-rose-500 focus:ring-4 focus:ring-rose-100 outline-none" />
              <input type="date" value={form.preferredDate} onChange={e=>setForm({...form,preferredDate:e.target.value})} className="px-4 py-3 rounded-xl border border-slate-200 focus:border-rose-500 focus:ring-4 focus:ring-rose-100 outline-none" />
            </div>
            <textarea placeholder="Tell us about your plan (theme, cake, guests…)" rows={3} value={form.message} onChange={e=>setForm({...form,message:e.target.value})} className="px-4 py-3 rounded-xl border border-slate-200 focus:border-rose-500 focus:ring-4 focus:ring-rose-100 outline-none" />
            <button disabled={loading} className="mt-2 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl brand-gradient text-white font-semibold shadow-glow hover:brightness-110 disabled:opacity-60">
              {loading ? 'Sending…' : (<>Send enquiry <ArrowRight className="h-4 w-4" /></>)}
            </button>
            <div className="text-xs text-slate-500 text-center">Or WhatsApp us at <a href="https://wa.me/916360921458" className="underline" target="_blank" rel="noopener">+91 63609 21458</a></div>
          </div>
        </form>
      </div>
    </section>
  )
}

/* ---------- FAQ ---------- */
function Faq() {
  const [open, setOpen] = useState(0)
  return (
    <section id="faq" className="py-16 sm:py-24 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <Reveal>
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold uppercase tracking-wider">FAQ</div>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl font-extrabold text-slate-900">Questions parents ask</h2>
          </div>
        </Reveal>
        <div className="mt-10 divide-y divide-slate-200 rounded-3xl border border-slate-200 bg-white/60 backdrop-blur-sm">
          {FAQS.map((f, i) => {
            const isOpen = open === i
            return (
              <div key={f.q} className="p-5 sm:p-6">
                <button onClick={() => setOpen(isOpen ? -1 : i)} className="w-full flex items-center justify-between gap-4 text-left">
                  <span className="font-display text-lg sm:text-xl font-semibold text-slate-900">{f.q}</span>
                  <motion.span animate={{ rotate: isOpen ? 45 : 0 }} className="h-8 w-8 rounded-full brand-gradient grid place-items-center text-white shrink-0">
                    <span className="text-xl leading-none">+</span>
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }} className="overflow-hidden">
                      <p className="pt-3 text-slate-600 leading-relaxed">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ---------- Visit ---------- */
function Visit() {
  return (
    <section id="visit" className="py-16 sm:py-24 bg-slate-950 text-white relative overflow-hidden">
      <div className="absolute inset-0 mesh-bg opacity-60" />
      <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white/80 text-xs font-semibold uppercase tracking-wider">Visit us</div>
          <h2 className="mt-4 font-display text-4xl sm:text-6xl font-extrabold leading-[1.02]">Come play, we’re easy to find</h2>
          <div className="mt-8 grid sm:grid-cols-2 gap-4">
            <div className="rounded-2xl bg-white/5 border border-white/10 p-5">
              <div className="flex items-center gap-2 text-white/70 text-xs uppercase tracking-wider"><MapPin className="h-4 w-4" /> Address</div>
              <p className="mt-2 text-white/90 leading-relaxed">Inside Hotel Continental, Ground Floor, Residency Road, Opposite Taluk Office, Near Sub-Urban Bus Stand, Nazarbad, Mysuru – 570010</p>
              <a href="https://maps.app.goo.gl/D7EoLf8fCPaSfjGMA" target="_blank" rel="noopener" className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full brand-gradient text-white text-sm font-semibold">Get directions <ArrowUpRight className="h-4 w-4" /></a>
            </div>
            <div className="rounded-2xl bg-white/5 border border-white/10 p-5">
              <div className="flex items-center gap-2 text-white/70 text-xs uppercase tracking-wider"><Clock className="h-4 w-4" /> Hours</div>
              <ul className="mt-2 text-white/90 space-y-1">
                <li className="flex justify-between"><span>Mon – Fri</span><span>11:00 AM – 9:30 PM</span></li>
                <li className="flex justify-between"><span>Sat – Sun</span><span>10:30 AM – 10:00 PM</span></li>
              </ul>
              <div className="mt-4 text-xs text-white/60">Timings may vary on public holidays.</div>
            </div>
            <div className="rounded-2xl bg-white/5 border border-white/10 p-5">
              <div className="flex items-center gap-2 text-white/70 text-xs uppercase tracking-wider"><Phone className="h-4 w-4" /> Call</div>
              <a href="tel:+916360921458" className="mt-2 block text-white/95 text-lg font-semibold">+91 63609 21458</a>
            </div>
            <div className="rounded-2xl bg-white/5 border border-white/10 p-5">
              <div className="flex items-center gap-2 text-white/70 text-xs uppercase tracking-wider"><Mail className="h-4 w-4" /> Email</div>
              <a href="mailto:sarojanifunland@gmail.com" className="mt-2 block text-white/95 font-semibold break-all">sarojanifunland@gmail.com</a>
            </div>
          </div>
          <div className="mt-6 flex items-center gap-3">
            <a href="https://instagram.com/sarojani_funland" target="_blank" rel="noopener" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-sm"><Instagram className="h-4 w-4" /> @sarojani_funland</a>
            <a href="https://wa.me/916360921458" target="_blank" rel="noopener" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold"><MessageCircle className="h-4 w-4" /> WhatsApp</a>
          </div>
        </div>
        <div className="rounded-3xl overflow-hidden border border-white/10 shadow-glow min-h-[420px]">
          <iframe
            title="Sarojani Funland location"
            src="https://www.google.com/maps?q=Hotel+Continental,+Nazarbad,+Mysuru&output=embed"
            className="w-full h-full min-h-[420px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  )
}

/* ---------- Footer + Floating ---------- */
function Footer() {
  return (
    <footer className="bg-slate-950 text-white/70 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl brand-gradient grid place-items-center"><span className="font-display font-extrabold text-white">S</span></div>
          <div>
            <div className="font-display font-bold text-white">Sarojani Funland</div>
            <div className="text-xs">© {new Date().getFullYear()} All rights reserved.</div>
          </div>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <a href="#pricing" className="hover:text-white">Pricing</a>
          <a href="#faq" className="hover:text-white">FAQ</a>
          <a href="#visit" className="hover:text-white">Visit</a>
          <Link href="/book" className="text-white font-semibold">Book</Link>
        </div>
      </div>
    </footer>
  )
}

function Floating() {
  return (
    <>
      <div className="hidden md:flex fixed right-5 bottom-5 z-40 flex-col gap-3">
        <a href="https://wa.me/916360921458" target="_blank" rel="noopener" className="relative h-14 w-14 rounded-full bg-emerald-500 text-white grid place-items-center shadow-glow hover:scale-105 transition" aria-label="WhatsApp">
          <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-30" />
          <MessageCircle className="h-6 w-6" />
        </a>
        <a href="tel:+916360921458" className="h-14 w-14 rounded-full brand-gradient text-white grid place-items-center shadow-glow hover:scale-105 transition" aria-label="Call">
          <Phone className="h-6 w-6" />
        </a>
      </div>
      <div className="md:hidden fixed bottom-0 inset-x-0 z-40 glass border-t border-white/40 pb-[env(safe-area-inset-bottom)] shadow-[0_-8px_24px_-12px_rgba(15,23,42,0.15)]">
        <div className="grid grid-cols-3">
          <Link href="/book" className="py-3 text-center brand-gradient text-white font-bold text-sm sm:text-base">Book Now</Link>
          <a href="https://wa.me/916360921458" target="_blank" rel="noopener" className="py-3 text-center bg-emerald-500 text-white font-semibold text-sm sm:text-base flex items-center justify-center gap-1.5"><MessageCircle className="h-4 w-4" /> WhatsApp</a>
          <a href="tel:+916360921458" className="py-3 text-center bg-slate-900 text-white font-semibold text-sm sm:text-base flex items-center justify-center gap-1.5"><Phone className="h-4 w-4" /> Call</a>
        </div>
      </div>
    </>
  )
}

/* ---------- Page ---------- */
function App() {
  return (
    <main className="bg-white">
      <Preloader />
      <SmoothScroll />
      <Nav />
      <Hero />
      <Stats />
      <Attractions />
      <How />
      <Gallery />
      <Pricing />
      <Safety />
      <Reviews />
      <Parties />
      <Faq />
      <Visit />
      <Footer />
      <Floating />
      <div className="md:hidden h-14" />
    </main>
  )
}

export default App
