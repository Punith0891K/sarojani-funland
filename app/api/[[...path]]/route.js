import { NextResponse } from 'next/server'
import { timingSafeEqual } from 'crypto'
import { MongoClient } from 'mongodb'
import { getSupabaseAdmin } from '@/lib/supabase/server'

/* ------------------------------------------------------------------ *
 * Primary database: Supabase (tables defined in supabase/schema.sql)
 * Optional mirror : MongoDB — only used when MONGO_URL is set
 * ------------------------------------------------------------------ */

const mongoUri = process.env.MONGO_URL
const mongoDbName = process.env.DB_NAME || 'sarojani_funland'

let cached = global._mongo
if (!cached) cached = global._mongo = { conn: null, promise: null }

async function getMongoDb() {
  if (cached.conn) return cached.conn
  if (!cached.promise) {
    cached.promise = MongoClient.connect(mongoUri, { maxPoolSize: 10 }).then((c) => c.db(mongoDbName))
  }
  cached.conn = await cached.promise
  return cached.conn
}

// Best-effort copy into MongoDB. Never fails the request.
async function mirrorToMongo(collection, doc) {
  if (!mongoUri) return
  try {
    const db = await getMongoDb()
    await db.collection(collection).insertOne({ ...doc })
  } catch (e) {
    console.error(`Mongo mirror (${collection}) failed:`, e?.message || e)
  }
}

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

const json = (body, status = 200) => NextResponse.json(body, { status, headers: CORS })

// Guards the customer list. Set ADMIN_API_TOKEN and send `Authorization: Bearer <token>`.
function isAdmin(request) {
  const token = process.env.ADMIN_API_TOKEN
  if (!token) return false
  const given = (request.headers.get('authorization') || '').replace(/^Bearer\s+/i, '')
  const a = Buffer.from(given)
  const b = Buffer.from(token)
  return a.length === b.length && timingSafeEqual(a, b)
}

// Booking reference is derived from the row id (unique, no extra column needed)
const refFromId = (id) => `SFL-${String(id).padStart(4, '0')}`

// The existing table stores activity as "Title - ₹Price"; split it back apart
function splitActivity(value = '') {
  const m = String(value).match(/^(.*) - ₹\s*([\d.]+)$/)
  return m ? { activity: m[1], unitPrice: Number(m[2]) } : { activity: String(value), unitPrice: 0 }
}

// DB row (snake_case) -> API shape (camelCase) the frontend already expects
function toBooking(row, overrides = {}) {
  const { activity, unitPrice } = splitActivity(row.activity)
  return {
    id: row.id,
    bookingRef: refFromId(row.id),
    parentName: row.parent_name,
    childrenCount: row.children_count,
    childrenNames: row.child_name ? row.child_name.split(', ') : [],
    mobile: row.mobile,
    activity,
    unitPrice,
    totalAmount: Number(row.total_amount),
    date: row.booking_date,
    timeSlot: row.time_slot,
    notes: row.notes || '',
    status: 'confirmed',
    createdAt: row.created_at,
    ...overrides,
  }
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS })
}

async function route(request, { params }) {
  const method = request.method
  const segments = (await params)?.path || []
  const path = '/' + segments.join('/')

  try {
    // Root ping
    if (path === '/' && method === 'GET') {
      return json({ message: 'Sarojani Funland API', ok: true })
    }

    // Connectivity check: open http://localhost:3000/api/health
    if (path === '/health' && method === 'GET') {
      const details = process.env.NODE_ENV !== 'production' || isAdmin(request)
      const out = {
        ok: true,
        env: {
          SUPABASE_URL: Boolean(process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL),
          SUPABASE_SECRET_KEY: Boolean(process.env.SUPABASE_SECRET_KEY),
        },
        tables: {},
      }
      let supabase
      try {
        supabase = getSupabaseAdmin()
      } catch (e) {
        return json({ ...out, ok: false, error: e.message }, 503)
      }
      for (const table of ['bookings', 'enquiries']) {
        const { error } = await supabase.from(table).select('id').limit(1)
        if (error) {
          out.ok = false
          console.error(`Health check: ${table} failed:`, error)
          out.tables[table] = { ok: false, ...(details && { code: error.code, error: error.message }) }
        } else {
          out.tables[table] = { ok: true }
        }
      }
      return json(out, out.ok ? 200 : 503)
    }

    // Create booking
    if (path === '/bookings' && method === 'POST') {
      const body = await request.json()
      const required = ['parentName', 'mobile', 'activity', 'date', 'timeSlot']
      for (const k of required) {
        if (!body[k]) return json({ error: `Missing ${k}` }, 400)
      }
      if (!/^[0-9]{10}$/.test(String(body.mobile))) return json({ error: 'Invalid mobile' }, 400)
      if (!/^\d{4}-\d{2}-\d{2}$/.test(String(body.date))) return json({ error: 'Invalid date' }, 400)

      const childrenNames = Array.isArray(body.childrenNames) ? body.childrenNames : []
      const unitPrice = Number(body.unitPrice || 0)

      const { data: row, error } = await getSupabaseAdmin()
        .from('bookings')
        .insert({
          parent_name: body.parentName,
          child_name: childrenNames.join(', '),
          children_count: Number(body.childrenCount || 1),
          mobile: String(body.mobile),
          activity: `${body.activity} - ₹${unitPrice}`,
          booking_date: body.date,
          time_slot: body.timeSlot,
          notes: body.notes || null,
          total_amount: Math.round(Number(body.totalAmount || 0)),
          created_at: new Date().toISOString(),
        })
        .select()
        .single()
      if (error) {
        console.error('Supabase booking insert failed:', error)
        return json({ error: 'Could not save your booking. Please try again.' }, 500)
      }

      const booking = toBooking(row, { childrenNames, activity: body.activity, unitPrice })
      await mirrorToMongo('bookings', booking)
      return json({ ok: true, booking }, 201)
    }

    // Enquiry (birthday / groups)
    if (path === '/enquiries' && method === 'POST') {
      const body = await request.json()
      const name = String(body.name || '').trim()
      const mobile = String(body.mobile || '')
      if (!name || !/^[0-9]{10}$/.test(mobile)) return json({ error: 'Invalid input' }, 400)

      const { data, error } = await getSupabaseAdmin()
        .from('enquiries')
        .insert({
          name,
          mobile,
          type: body.type || 'birthday',
          group_size: Number(body.groupSize) || 0,
          preferred_date: body.preferredDate || null,
          message: body.message || '',
        })
        .select()
        .single()
      if (error) {
        console.error('Supabase enquiry insert failed:', error)
        return json({ error: 'Could not send your enquiry. Please try again.' }, 500)
      }

      const enquiry = {
        id: data.id,
        name: data.name,
        mobile: data.mobile,
        type: data.type,
        groupSize: data.group_size,
        preferredDate: data.preferred_date || '',
        message: data.message || '',
        createdAt: data.created_at,
      }
      await mirrorToMongo('enquiries', enquiry)
      return json({ ok: true, enquiry }, 201)
    }

    // List bookings — contains customer names and phone numbers, so admin-only
    if (path === '/bookings' && method === 'GET') {
      if (!isAdmin(request)) return json({ error: 'Unauthorized' }, 401)
      const { data, error } = await getSupabaseAdmin()
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50)
      if (error) {
        console.error('Supabase bookings list failed:', error)
        return json({ error: 'Server error' }, 500)
      }
      return json({ items: data.map((r) => toBooking(r)) })
    }

    return json({ error: 'Not found', path }, 404)
  } catch (e) {
    console.error('API error', e)
    return json({ error: 'Server error' }, 500)
  }
}

export { route as GET, route as POST, route as PUT, route as DELETE }
