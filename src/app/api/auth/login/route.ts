import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { SignJWT } from 'jose'

const key = new TextEncoder().encode(process.env.JWT_SECRET!)

const FAIL_COOKIE = 'acm_fail'
const MAX_FAILS = 3
const WINDOW_SEC = 15 * 60

type FailState = { c: number; t: number }

async function readFailState(): Promise<FailState> {
  const cookieStore = await cookies()
  const raw = cookieStore.get(FAIL_COOKIE)?.value
  if (!raw) return { c: 0, t: Date.now() }
  try {
    const parsed = JSON.parse(raw) as FailState
    if (Date.now() - parsed.t > WINDOW_SEC * 1000) {
      return { c: 0, t: Date.now() }
    }
    return {
      c: Number(parsed.c) || 0,
      t: Number(parsed.t) || Date.now(),
    }
  } catch {
    return { c: 0, t: Date.now() }
  }
}

async function writeFailState(state: FailState) {
  const cookieStore = await cookies()
  cookieStore.set(FAIL_COOKIE, JSON.stringify(state), {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: WINDOW_SEC,
    path: '/',
  })
}

async function clearFailState() {
  const cookieStore = await cookies()
  cookieStore.delete(FAIL_COOKIE)
}

export async function POST(req: Request) {
  const { username, password } = await req.json()

  const st = await readFailState()
  if (st.c >= MAX_FAILS) {
    const retryAfterSec = Math.max(0, WINDOW_SEC - Math.floor((Date.now() - st.t) / 1000)) || 1
    return NextResponse.json(
      {
        ok: false,
        error: 'Too many attempts. Try again later.',
        retryAfterSec,
      },
      {
        status: 429,
        headers: { 'Retry-After': String(retryAfterSec) },
      }
    )
  }

  const validUser = username && process.env.ACM_SHARED_USERNAME && username === process.env.ACM_SHARED_USERNAME
  const validPass = password && process.env.ACM_SHARED_SECRET && password === process.env.ACM_SHARED_SECRET

  if (!validUser || !validPass) {
    const nextState: FailState = st.c === 0 ? { c: 1, t: Date.now() } : { c: st.c + 1, t: st.t }
    await writeFailState(nextState)

    const triesLeft = Math.max(0, MAX_FAILS - nextState.c)
    return NextResponse.json(
      {
        ok: false,
        error: triesLeft > 0 ? 'Invalid credentials.' : 'Too many attempts. Try again later.',
        triesLeft,
      },
      { status: 401 }
    )
  }

  await clearFailState()

  const token = await new SignJWT({ role: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('2h')
    .sign(key)

  const cookieStore = await cookies()
  cookieStore.set('acm_session', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: 60 * 60 * 2,
    path: '/',
  })

  return NextResponse.json({ ok: true })
}
