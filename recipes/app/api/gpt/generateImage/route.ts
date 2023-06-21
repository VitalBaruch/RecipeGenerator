import {Configuration, OpenAIApi} from 'openai'
import dotenv from 'dotenv'
import {NextResponse} from 'next/server'

export async function POST(req : Request) {
  dotenv.config()
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_KEY 
  })

  const openai = new OpenAIApi(configuration)

  const generatePicGPT = async (prompt : string) => {
    try {
      const ans = await openai.createImage({
        prompt: prompt,
        n: 1,
        size: "512x512",
        response_format: 'b64_json'
      })
      console.log(ans.data.data[0].b64_json);
      return ans.data.data[0].b64_json
    } catch(err) {
      console.log(err);
    }
  }
    const {prompt} = await req.json()
    const answer = await generatePicGPT(prompt)
    return NextResponse.json(answer)
}

