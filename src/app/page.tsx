'use client'
import ListenEvents from './listen_events';

interface LogPayload {
  value: string;
}

interface LogPayloadProps{
  payload: LogPayload
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ListenEvents />
    </main>
  )
}