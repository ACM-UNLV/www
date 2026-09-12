import { NextResponse } from 'next/server'
import { db } from '@/server/db'
import { isAdminRequest, unauthorizedJson } from '@/server/auth'

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const isAdmin = await isAdminRequest(req)
  if (!isAdmin) return unauthorizedJson()
  try {
    const { id } = await params
    const body = await req.json()
    const { date, startTime, endTime, ...rest } = body
    const eventDate = date ? new Date(date) : undefined

    let startDateTime: Date | undefined
    let endDateTime: Date | undefined
    if (eventDate && typeof startTime === 'string' && startTime) {
      startDateTime = new Date(eventDate)
      const [h, m] = startTime.split(':')
      // Use UTC to avoid server timezone drift
      startDateTime.setUTCHours(Number.parseInt(h!, 10), Number.parseInt(m!, 10), 0, 0)
    }
    if (eventDate && typeof endTime === 'string' && endTime) {
      endDateTime = new Date(eventDate)
      const [h, m] = endTime.split(':')
      // Use UTC to avoid server timezone drift
      endDateTime.setUTCHours(Number.parseInt(h!, 10), Number.parseInt(m!, 10), 0, 0)
    }

    const updated = await db.event.update({
      where: { id: Number.parseInt(id, 10) },
      data: {
        ...rest,
        date: eventDate,
        startTime: startDateTime,
        endTime: endDateTime,
      },
    })
    return NextResponse.json(updated)
  } catch (e) {
    return NextResponse.json({ error: 'Failed to update event' }, { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const isAdmin = await isAdminRequest(req)
  if (!isAdmin) return unauthorizedJson()
  try {
    const { id } = await params
    await db.event.delete({ where: { id: Number.parseInt(id, 10) } })
    return NextResponse.json({ ok: true })
  } catch (e) {
    return NextResponse.json({ error: 'Failed to delete event' }, { status: 500 })
  }
}
