'use client'
import { useChat } from 'ai/react'

export default function Home() {
  const { messages, input, handleInputChange, handleSubmit } = useChat()
  const roleNames = {
    user: 'あなた',
    system:'システム',
    assistant: 'アシスタント',
    function: 'ファンクション'
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className='w-full h-[40vw] mb-4 whitespace-pre-wrap overflow-y-scroll'>
        {messages.map(m => (
          <div className='mb-2 p-2 border rounded-lg bg-white' key={m.id}>
            {roleNames[m.role]}: {m.content}
          </div>
        ))}
      </div>
      <form 
        className='w-full'
        onSubmit={handleSubmit}>
        <label>
          お金や銀行に関することなら、なんでも聞いてね！
          <input
            className='block w-full mt-2 p-2 border rounded-lg'
            value={input}
            onChange={handleInputChange}
          />
        </label>
      </form>
    </main>
  )
}
