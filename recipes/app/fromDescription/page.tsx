"use client"
import ButtonLoader from '@/components/ButtonLoader'
import Recipe from '@/components/Recipe'
import ErrorSilde from '@/components/errorSilde'
import { sendPromptToGPT, wait } from '@/utils/func'
import { sendAndCheckDescription } from '@/utils/prompts'
import { FC, useState } from 'react'

interface pageProps {
  
}

const page: FC<pageProps> = ({}) => {
  const [description , setDescription] = useState<string>('')
  const [showError, setShowError] = useState<boolean>(false)
  const [res, setRes] = useState('')
  return (
    <div className="hero content-start">
    <div className="hero-content flex-col">
      <div className="text-center">
        <h1 className="m-10 text-5xl font-bold text-white">Tell me what youre craving!</h1>
      </div>
      <div className="card flex-shrink-0 w-full max-w-xl shadow-2xl bg-slate-900">
        <div className="card-body items-center">
        <p className="card-title text-white text-center">Give me a decription for the recipe you want me to generate for you</p>
        <input type="text"
         placeholder="Exmaple: green curry with chicken and rice"
         className="input input-ghost input-info w-full my-4 input-lg text-white"
         onChange={(e) => setDescription(e.target.value)} />
         {
          showError && <ErrorSilde errorMassage='Please insert at least 3 words description'/>
         }
         <ButtonLoader buttonName='Generate' classname={`btn btn-outline btn-info`}
          buttonFunction={async() => {
            if(description.trim().split(' ').length < 3) {
              setShowError(true)
              return
            } else {
              setShowError(false)
              const res = await(sendPromptToGPT(sendAndCheckDescription(description)))
              setRes(res)
            }
          }}/>
        </div>    
      </div>
      { res !== '' &&
      <div className="card flex-shrink-0 w-full max-w-xl shadow-2xl bg-slate-900">
        <div className="card-body items-center">
          <Recipe res={res} />
        </div>
      </div>
      }
    </div>
  </div>
  )
}

export default page