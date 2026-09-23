import { NextResponse } from 'next/server'
import { MongoClient } from 'mongodb'
import { v4 as uuidv4 } from 'uuid'

const uri = process.env.MONGO_URL
const dbName = process.env.DB_NAME || 'sarojani_funland'

let cached = global._mongo
if (!cached) cached = global._mongo = { conn: null, promise: null }

async function getDb() {
  if (cached.conn) return cached.conn
  if (!cached.promise) {
    cached.promise = MongoClient.connect(uri, { maxPoolSize: 10 }).then((c) => c.db(dbName))
  }
  cached.conn = await cached.promise
  return cached.conn
}

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
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
      return NextResponse.json({ message: 'Sarojani Funland API', ok: true }, { headers: CORS })
    }

    // Create booking
    if (path === '/bookings' && method === 'POST') {
      const body = await request.json()
      const required = ['parentName', 'mobile', 'activity', 'date', 'timeSlot']
      for (const k of required) {
        if (!body[k]) return NextResponse.json({ error: `Missing ${k}` }, { status: 400, headers: CORS })
      }
      if (!/^[0-9]{10}$/.test(String(body.mobile))) {
        return NextResponse.json({ error: 'Invalid mobile' }, { status: 400, headers: CORS })
      }
      const db = await getDb()
      const doc = {
        id: uuidv4(),
        parentName: body.parentName,
        childrenCount: Number(body.childrenCount || 1),
        childrenNames: Array.isArray(body.childrenNames) ? body.childrenNames : [],
        mobile: body.mobile,
        activity: body.activity,
        unitPrice: Number(body.unitPrice || 0),
        totalAmount: Number(body.totalAmount || 0),
        date: body.date,
        timeSlot: body.timeSlot,
        notes: body.notes || '',
        status: 'confirmed',
        createdAt: new Date().toISOString(),
      }
      await db.collection('bookings').insertOne(doc)
      return NextResponse.json({ ok: true, booking: doc }, { status: 201, headers: CORS })
    }

    // Enquiry (birthday / groups)
    if (path === '/enquiries' && method === 'POST') {
      const body = await request.json()
      const db = await getDb()
      const doc = {
        id: uuidv4(),
        name: body.name || '',
        mobile: body.mobile || '',
        type: body.type || 'birthday',
        groupSize: Number(body.groupSize || 0),
        preferredDate: body.preferredDate || '',
        message: body.message || '',
        createdAt: new Date().toISOString(),
      }
      if (!doc.name || !/^[0-9]{10}$/.test(String(doc.mobile))) {
        return NextResponse.json({ error: 'Invalid input' }, { status: 400, headers: CORS })
      }
      await db.collection('enquiries').insertOne(doc)
      return NextResponse.json({ ok: true, enquiry: doc }, { status: 201, headers: CORS })
    }

    // List bookings (admin-ish, unauth for MVP)
    if (path === '/bookings' && method === 'GET') {
      const db = await getDb()
      const items = await db.collection('bookings').find({}, { projection: { _id: 0 } }).sort({ createdAt: -1 }).limit(50).toArray()
      return NextResponse.json({ items }, { headers: CORS })
    }

    return NextResponse.json({ error: 'Not found', path }, { status: 404, headers: CORS })
  } catch (e) {
    console.error('API error', e)
    return NextResponse.json({ error: 'Server error', detail: String(e?.message || e) }, { status: 500, headers: CORS })
  }
}

export { route as GET, route as POST, route as PUT, route as DELETE }
