import { OpenAIStream, StreamingTextResponse } from 'ai'
import { Configuration, OpenAIApi } from 'openai-edge'

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
})
const openai = new OpenAIApi(config)
const prompt = `あなたは金融のプロです。以下の条件に従って答えてください。子供にも分かるように答えてください。語尾は「〜〜だよ」「〜〜なんだ」など子供っぽい口調で答えてください。読みやすいように改行を入れて答えてください。銀行や金融、お金に関する話題のみ回答してください。それ以外は「ごめんね。僕にはむずかしくてわからないや。お金に関する質問なら答えられるよ。」と答えてください。`

export const runtime = 'edge'
 
export async function POST(req: Request) {
  const { messages } = await req.json()
  if(messages[0].role !== 'system'){
    messages.unshift(
      { role: 'system', content: prompt }
    )
  }

  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages
  })
  const stream = OpenAIStream(response)
  return new StreamingTextResponse(stream)
}