'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useMemo, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import { toast } from 'sonner'
import {
  ArrowLeft, ArrowRight, Check, User, Phone, CalendarDays, Clock, Sparkles,
  Rocket, Car, Bike, Gamepad2, PartyPopper, Users, Baby, ShieldCheck, Home,
} from 'lucide-react'

const ACTIVITIES = [
  { id: 'full', title: 'Full Play Zone Package', price: 250, duration: '30 mins + 10 mins extendable', icon: PartyPopper, tint: 'from-rose-600 to-orange-500', popular: true },
  { id: 'play', title: 'Play Zone', price: 100, duration: '15 mins', icon: Sparkles, tint: 'from-pink-500 to-rose-500' },
  { id: 'tramp', title: 'Trampoline', price: 100, duration: '15 mins', icon: Rocket, tint: 'from-violet-500 to-indigo-500' },
  { id: 'scoot', title: 'Scooter Ride', price: 100, duration: '10 mins', icon: Bike, tint: 'from-emerald-500 to-teal-500' },
  { id: 'small', title: 'Small Electric Car', price: 120, duration: '2 rounds', icon: Car, tint: 'from-amber-500 to-orange-500' },
  { id: 'large', title: 'Large Electric Car', price: 150, duration: '2 rounds', icon: Car, tint: 'from-orange-500 to-red-500' },
  { id: 'vr', title: 'VR / AR Games', price: 150, duration: '15 mins', icon: Gamepad2, tint: 'from-sky-500 to-cyan-500' },
]

const SLOTS = ['11:00 AM','12:00 PM','1:00 PM','2:00 PM','3:00 PM','4:00 PM','5:00 PM','6:00 PM','7:00 PM','8:00 PM','9:00 PM']

function BookingInner() {
  const params = useSearchParams()
  const preselect = params.get('activity')
  const [step, setStep] = useState(1)
  const [activityId, setActivityId] = useState(() => {
    if (!preselect) return null
    const found = ACTIVITIES.find(a => a.title.toLowerCase() === preselect.toLowerCase())
    return found?.id || null
  })
  const [date, setDate] = useState('')
  const [slot, setSlot] = useState('')
  const [count, setCount] = useState(1)
  const [parent, setParent] = useState('')
  const [mobile, setMobile] = useState('')
  const [names, setNames] = useState([''])
  const [notes, setNotes] = useState('')
  const [agree, setAgree] = useState(false)
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(null)

  const activity = useMemo(() => ACTIVITIES.find(a => a.id === activityId) || null, [activityId])
  const total = (activity?.price || 0) * count

  useEffect(() => {
    setNames((prev) => {
      const next = [...prev]
      while (next.length < count) next.push('')
      return next.slice(0, count)
    })
  }, [count])

  const today = new Date().toISOString().slice(0, 10)

  const next = () => {
    if (step === 1 && !activityId) return toast.error('Choose an activity')
    if (step === 2 && (!date || !slot)) return toast.error('Pick date and slot')
    if (step === 3) {
      if (!parent.trim()) return toast.error('Enter parent name')
      if (!/^[0-9]{10}$/.test(mobile)) return toast.error('Enter a valid 10-digit mobile')
      if (names.some(n => !n.trim())) return toast.error('Enter each child’s name')
      if (!agree) return toast.error('Please agree to the safety rules')
    }
    setStep((s) => Math.min(4, s + 1))
    if (step === 3) submit()
  }
  const back = () => setStep((s) => Math.max(1, s - 1))

  const submit = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          parentName: parent,
          mobile,
          childrenCount: count,
          childrenNames: names,
          activity: activity.title,
          unitPrice: activity.price,
          totalAmount: total,
          date, timeSlot: slot, notes,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Booking failed')
      setDone(data.booking)
      setStep(4)
      // Confetti burst
      const end = Date.now() + 900
      const colors = ['#7c3aed', '#ec4899', '#fb923c', '#22c55e', '#38bdf8']
      ;(function frame() {
        confetti({ particleCount: 4, angle: 60, spread: 55, origin: { x: 0 }, colors })
        confetti({ particleCount: 4, angle: 120, spread: 55, origin: { x: 1 }, colors })
        if (Date.now() < end) requestAnimationFrame(frame)
      })()
    } catch (e) { toast.error(e.message) } finally { setLoading(false) }
  }

  const stepMeta = [
    { k: 1, t: 'Activity' },
    { k: 2, t: 'Date & Time' },
    { k: 3, t: 'Your details' },
    { k: 4, t: 'Confirmation' },
  ]

  return (
    <main className="min-h-screen bg-[radial-gradient(1200px_600px_at_10%_-10%,rgba(124,58,237,0.12),transparent_60%),radial-gradient(900px_500px_at_100%_0%,rgba(236,72,153,0.10),transparent_60%),#faf7ff]">
      {/* Top bar */}
      <div className="sticky top-0 z-30 glass border-b border-white/40">
        <div className="max-w-4xl mx-auto px-5 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-slate-800 hover:text-slate-900">
            <Image src="/images/logo-sm.png" alt="Sarojani Funland" width={64} height={42} className="h-8 w-auto rounded-md ring-1 ring-black/5" />
            <span className="font-display font-bold hidden sm:inline">Sarojani Funland</span>
          </Link>
          <Link href="/" className="text-sm text-slate-600 hover:text-slate-900 inline-flex items-center gap-1"><Home className="h-4 w-4" /> Home</Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-5 py-8 sm:py-12">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-semibold uppercase tracking-wider">Booking</div>
          <h1 className="mt-3 font-display text-3xl sm:text-5xl font-extrabold text-slate-900">Reserve your visit</h1>
          <p className="mt-2 text-slate-600">Simple, quick and confirmed instantly.</p>
        </div>

        {/* Progress */}
        <div className="mt-8 relative">
          <div className="grid grid-cols-4 gap-2">
            {stepMeta.map((s) => (
              <div key={s.k} className="flex flex-col items-center gap-2">
                <div className={`h-9 w-9 rounded-full grid place-items-center text-sm font-bold transition-all ${step >= s.k ? 'brand-gradient text-white shadow-glow' : 'bg-white text-slate-500 border border-slate-200'}`}>
                  {step > s.k ? <Check className="h-4 w-4" /> : s.k}
                </div>
                <div className={`text-[11px] sm:text-xs font-semibold text-center ${step >= s.k ? 'text-slate-900' : 'text-slate-500'}`}>{s.t}</div>
              </div>
            ))}
          </div>
          <div className="absolute top-4 left-0 right-0 -z-10 h-1 rounded-full bg-slate-200 overflow-hidden">
            <motion.div initial={false} animate={{ width: `${((step - 1) / 3) * 100}%` }} transition={{ duration: 0.5 }} className="h-full brand-gradient" />
          </div>
        </div>

        <div className="mt-8 grid lg:grid-cols-[1fr,340px] gap-6">
          {/* Steps */}
          <div className="rounded-3xl bg-white border border-slate-100 shadow-soft p-5 sm:p-8">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div key="s1" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}>
                  <div className="font-display text-xl font-bold text-slate-900">Choose your activity</div>
                  <div className="text-sm text-slate-500">Pick the experience that’s calling your kid’s name.</div>
                  <div className="mt-5 grid sm:grid-cols-2 gap-3">
                    {ACTIVITIES.map(a => (
                      <button key={a.id} onClick={() => setActivityId(a.id)} className={`relative text-left rounded-2xl p-4 border transition-all ${activityId === a.id ? 'border-transparent ring-2 ring-rose-500 shadow-glow' : 'border-slate-200 hover:border-slate-300'}`}>
                        {a.popular && <span className="absolute -top-2 right-3 text-[10px] font-bold brand-gradient text-white px-2 py-0.5 rounded-full">POPULAR</span>}
                        <div className={`h-10 w-10 rounded-xl grid place-items-center text-white bg-gradient-to-br ${a.tint}`}><a.icon className="h-5 w-5" /></div>
                        <div className="mt-3 font-semibold text-slate-900">{a.title}</div>
                        <div className="text-xs text-slate-500">{a.duration}</div>
                        <div className="mt-2 font-display text-xl font-extrabold text-slate-900">₹{a.price}</div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
              {step === 2 && (
                <motion.div key="s2" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}>
                  <div className="font-display text-xl font-bold text-slate-900">Pick a date & time</div>
                  <div className="text-sm text-slate-500">Slots are 1 hour long. Walk in any time within your slot.</div>
                  <div className="mt-5 grid gap-4">
                    <label className="block">
                      <span className="text-sm font-medium text-slate-700 flex items-center gap-2"><CalendarDays className="h-4 w-4" /> Date</span>
                      <input type="date" min={today} value={date} onChange={e => setDate(e.target.value)} className="mt-2 w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-rose-500 focus:ring-4 focus:ring-rose-100 outline-none" />
                    </label>
                    <div>
                      <span className="text-sm font-medium text-slate-700 flex items-center gap-2"><Clock className="h-4 w-4" /> Time slot</span>
                      <div className="mt-2 grid grid-cols-3 sm:grid-cols-4 gap-2">
                        {SLOTS.map(s => (
                          <button key={s} onClick={() => setSlot(s)} className={`px-3 py-2 rounded-xl text-sm font-medium border transition ${slot === s ? 'brand-gradient text-white border-transparent shadow-soft' : 'bg-white border-slate-200 text-slate-700 hover:border-rose-300'}`}>{s}</button>
                        ))}
                      </div>
                    </div>
                    <label className="block">
                      <span className="text-sm font-medium text-slate-700 flex items-center gap-2"><Users className="h-4 w-4" /> How many children?</span>
                      <div className="mt-2 flex items-center gap-3">
                        <button onClick={() => setCount(c => Math.max(1, c - 1))} className="h-10 w-10 rounded-full border border-slate-200 text-lg font-bold">-</button>
                        <div className="font-display text-2xl font-extrabold w-10 text-center">{count}</div>
                        <button onClick={() => setCount(c => Math.min(20, c + 1))} className="h-10 w-10 rounded-full border border-slate-200 text-lg font-bold">+</button>
                      </div>
                    </label>
                  </div>
                </motion.div>
              )}
              {step === 3 && (
                <motion.div key="s3" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}>
                  <div className="font-display text-xl font-bold text-slate-900">Your details</div>
                  <div className="text-sm text-slate-500">We’ll use these only to confirm your visit.</div>
                  <div className="mt-5 grid gap-3">
                    <label className="block">
                      <span className="text-sm font-medium text-slate-700 flex items-center gap-2"><User className="h-4 w-4" /> Parent / Guardian name</span>
                      <input value={parent} onChange={e => setParent(e.target.value)} placeholder="e.g. Priya Sharma" className="mt-2 w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-rose-500 focus:ring-4 focus:ring-rose-100 outline-none" />
                    </label>
                    <label className="block">
                      <span className="text-sm font-medium text-slate-700 flex items-center gap-2"><Phone className="h-4 w-4" /> Mobile</span>
                      <input inputMode="numeric" value={mobile} onChange={e => setMobile(e.target.value.replace(/\D/g,'').slice(0,10))} placeholder="10-digit mobile" className="mt-2 w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-rose-500 focus:ring-4 focus:ring-rose-100 outline-none" />
                    </label>
                    <div>
                      <span className="text-sm font-medium text-slate-700 flex items-center gap-2"><Baby className="h-4 w-4" /> Children names</span>
                      <div className="mt-2 grid gap-2">
                        {names.map((n, i) => (
                          <input key={i} value={n} onChange={e => setNames(prev => prev.map((x, j) => j === i ? e.target.value : x))} placeholder={`Child ${i + 1} name`} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-rose-500 focus:ring-4 focus:ring-rose-100 outline-none" />
                        ))}
                      </div>
                    </div>
                    <label className="block">
                      <span className="text-sm font-medium text-slate-700">Anything we should know? (optional)</span>
                      <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={2} placeholder="Allergies, birthday, special request…" className="mt-2 w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-rose-500 focus:ring-4 focus:ring-rose-100 outline-none" />
                    </label>
                    <label className="mt-2 flex items-start gap-2 text-sm text-slate-700">
                      <input type="checkbox" checked={agree} onChange={e => setAgree(e.target.checked)} className="mt-1 h-4 w-4 accent-rose-600" />
                      <span>I agree to the safety rules and ticket policy. Socks are mandatory inside the play zone.</span>
                    </label>
                  </div>
                </motion.div>
              )}
              {step === 4 && (
                <motion.div key="s4" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="text-center py-6">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                    className="mx-auto h-20 w-20 rounded-full brand-gradient grid place-items-center shadow-glow">
                    <Check className="h-10 w-10 text-white" />
                  </motion.div>
                  <div className="mt-6 font-display text-3xl font-extrabold text-slate-900">Booking confirmed! 🎉</div>
                  <p className="mt-2 text-slate-600">We can’t wait to see {parent}’s little ones at Sarojani Funland.</p>
                  {done && (
                    <div className="mt-6 mx-auto max-w-md text-left rounded-2xl bg-slate-50 border border-slate-200 p-5">
                      <div className="text-xs uppercase tracking-wider text-slate-500">Booking reference</div>
                      <div className="font-mono text-sm text-slate-800">{done.id.slice(0, 8).toUpperCase()}</div>
                      <div className="mt-3 grid grid-cols-2 gap-2 text-sm text-slate-700">
                        <div><div className="text-slate-500 text-xs">Activity</div>{done.activity}</div>
                        <div><div className="text-slate-500 text-xs">Total</div>₹{done.totalAmount}</div>
                        <div><div className="text-slate-500 text-xs">Date</div>{done.date}</div>
                        <div><div className="text-slate-500 text-xs">Slot</div>{done.timeSlot}</div>
                      </div>
                    </div>
                  )}
                  <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <a href="https://wa.me/916360921458" target="_blank" rel="noopener" className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-emerald-500 text-white font-semibold">Share on WhatsApp</a>
                    <Link href="/" className="inline-flex items-center gap-2 px-5 py-3 rounded-full brand-gradient text-white font-semibold">Back to home <ArrowRight className="h-4 w-4" /></Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {step < 4 && (
              <div className="mt-8 flex items-center justify-between">
                <button onClick={back} disabled={step === 1} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-slate-600 hover:bg-slate-100 disabled:opacity-40"><ArrowLeft className="h-4 w-4" /> Back</button>
                <button onClick={next} disabled={loading} className="inline-flex items-center gap-2 px-6 py-3 rounded-full brand-gradient text-white font-semibold shadow-glow hover:brightness-110 disabled:opacity-60">
                  {step === 3 ? (loading ? 'Confirming…' : 'Confirm booking') : 'Continue'} <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>

          {/* Summary */}
          <aside className="lg:sticky lg:top-20 h-max rounded-3xl bg-white border border-slate-100 shadow-soft p-6">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">Live summary</div>
            <div className="mt-3">
              {activity ? (
                <>
                  <div className={`h-10 w-10 rounded-xl grid place-items-center text-white bg-gradient-to-br ${activity.tint}`}><activity.icon className="h-5 w-5" /></div>
                  <div className="mt-2 font-display text-lg font-bold text-slate-900">{activity.title}</div>
                  <div className="text-xs text-slate-500">{activity.duration}</div>
                </>
              ) : <div className="text-slate-500 text-sm">Choose an activity to see pricing.</div>}
            </div>
            <div className="mt-5 space-y-2 text-sm">
              <div className="flex justify-between text-slate-700"><span>Date</span><span className="font-medium">{date || '—'}</span></div>
              <div className="flex justify-between text-slate-700"><span>Slot</span><span className="font-medium">{slot || '—'}</span></div>
              <div className="flex justify-between text-slate-700"><span>Children</span><span className="font-medium">{count}</span></div>
            </div>
            <div className="mt-5 h-px bg-slate-100" />
            <div className="mt-4 flex items-end justify-between">
              <span className="text-slate-600 text-sm">Total</span>
              <motion.span key={total} initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="font-display text-3xl font-extrabold text-slate-900">₹{total}</motion.span>
            </div>
            <div className="mt-4 rounded-2xl bg-rose-50 border border-rose-100 p-3 text-xs text-slate-600 flex gap-2">
              <ShieldCheck className="h-4 w-4 text-rose-600 shrink-0" />
              <span>Pay at venue. Cancellation up to 2 hours before the slot.</span>
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}

export default function BookingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen grid place-items-center text-slate-500">Loading…</div>}>
      <BookingInner />
    </Suspense>
  )
}
