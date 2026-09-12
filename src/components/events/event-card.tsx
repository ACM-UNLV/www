import { Button } from '@/components/ui/button'
import { Event } from '@/generated/prisma'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import EditEventCard from './edit/event-edit'

const formatDate = (date: Date) =>
  new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date)

const dayOfWeek = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    timeZone: 'UTC',
  }).format(date)
}

const formatTime = (time: Date) =>
  new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
    timeZone: 'UTC',
  }).format(time)

interface EventCardProps {
  event: Event
  onChange?: () => void
}

export const EventCard = ({ event, onChange }: EventCardProps) => {
  const formattedDate = formatDate(event.date)
  const formattedStartTime = event.startTime ? formatTime(event.startTime) : 'N/A'
  const formattedEndTime = event.endTime ? formatTime(event.endTime) : 'N/A'

  const toGoogleCalendarDate = (date: Date) =>
    date.toISOString().replaceAll('-', '').replaceAll(':', '').replaceAll('.', '')

  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${event.startTime ? `${toGoogleCalendarDate(event.startTime)}Z/${event.endTime ? toGoogleCalendarDate(event.endTime) + 'Z' : ''}` : ''}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location || '')}`

  return (
    <Card className="w-[425px] transition hover:scale-105">
      <CardHeader className="relative">
        <CardTitle>{event.title}</CardTitle>
        <CardDescription>
          {`${formattedDate} | ${dayOfWeek(event.date)} ${event.startTime ? `${formattedStartTime} - ${formattedEndTime}` : ''}`}
        </CardDescription>
        <div className="absolute right-3 top-1">
          <EditEventCard event={event} onUpdated={onChange} />
        </div>
      </CardHeader>
      <CardContent>
        <p>{event.description}</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <a href={googleCalendarUrl} target="_blank" rel="noopener noreferrer">
          <Button>Add to Google Calendar</Button>
        </a>
      </CardFooter>
    </Card>
  )
}
