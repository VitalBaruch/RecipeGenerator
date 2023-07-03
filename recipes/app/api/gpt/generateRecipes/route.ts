import {Configuration, OpenAIApi} from 'openai'
import dotenv from 'dotenv'
import {NextResponse} from 'next/server'

export async function POST(req : Request) {
  dotenv.config()
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_KEY 
  })

  const openai = new OpenAIApi(configuration)

  const askGPT = async (message : string) => {
    try {
      const ans = await openai.createChatCompletion({
        model : 'gpt-3.5-turbo-0613',
        messages : [{role : 'user', content : message}],
        temperature: 0,
      })
      return ans.data.choices[0].message!.content as string
    } catch(err) {
      console.log(err);
    }
  }
    const {message} = await req.json()
    const answer = await askGPT(message)
    return NextResponse.json(answer)
}

