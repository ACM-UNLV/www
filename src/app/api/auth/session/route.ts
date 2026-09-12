import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { jwtVerify } from 'jose'

const key = new TextEncoder().encode(process.env.JWT_SECRET!)

export async function GET() {
  const cookieStore = await cookies()
  const token = cookieStore.get('acm_session')?.value ?? null

  if (!token) {
    return NextResponse.json({ ok: false }, { status: 200 })
  }

  try {
    const { payload } = await jwtVerify(token, key, {
      algorithms: ['HS256'],
    })
    // payload.role should be "admin"
    return NextResponse.json({
      ok: true,
      user: { role: payload.role ?? 'admin' },
    })
  } catch {
    // expired/invalid -> treat as logged out
    cookieStore.delete('acm_session')
    return NextResponse.json({ ok: false }, { status: 200 })
  }
}
