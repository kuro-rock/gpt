'use client'
import { useChat } from 'ai/react'

export default function Home() {
  const { messages, input, handleInputChange, handleSubmit } = useChat()

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        {messages.map(m => (
          <div key={m.id}>
            {m.role}: {m.content}
          </div>
        ))}

        <form onSubmit={handleSubmit}>
          <label>
            Say something...
            <input
              value={input}
              onChange={handleInputChange}
            />
          </label>
        </form>
      </div>
    </main>
  )
}
