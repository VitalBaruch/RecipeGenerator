"use client"
import { FC, useEffect, useState } from 'react'
import {useMutation} from 'react-query'
import IngridientInput from './IngridientInput'
import { sendAndCheckIngridients } from '@/utils/prompts'
import Recipe from './Recipe'
interface pageProps {
  
}

const page: FC<pageProps> = ({}) => {
    const [ingridients, setIngridients] = useState<string[]>(['', ''])
    const [res, setRes] = useState<string>('')
    const [enabled, setEnabled] = useState<boolean>(false)

    useEffect(() => {
        setEnabled(ingridients.every(ing => ing.trim() !== ""))
    }, [ingridients])

    const buttonClass = "enabled:bg-blue-500 enabled:hover:bg-blue-700 enabled:cursor-pointer" +
    "disabled:cursor-not-allowed disabled:bg-gray-500 text-white p-2 rounded-lg "

    const addIngridient = (ingridient : string) => {
        setIngridients([...ingridients, ingridient])
    }

    const removeIngridient = (ind : number) => {
        const temp = [...ingridients]
        temp.splice(ind, 1);      
        setIngridients(temp)
    }

    const {mutate: sendMessage, isLoading} = useMutation({
        mutationFn: async (message : string) => {
            const response = await fetch('/api/gpt/generateRecipes', {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({message})
            })
            const data : string = await response.json()
            setRes(data)
            return data
        },
        onSuccess : () => {
            console.log('success');
        },
        onError : () => {
            console.log('error');
        }
    })

  return <div className='p-10 flex flex-col justify-center'>
        <h1 className="text-center my-6 text-2xl font-bold text-white sm:truncate sm:text-3xl sm:tracking-tight">
                Welcome to recipe generator <br/>
                Please insert ingridients
        </h1>
        {
            ingridients.map((ingridient, ind) => {
                return <IngridientInput
                 removeIngridient={removeIngridient}
                 setIngridients={setIngridients}
                 number={ind + 1}
                 ingridients={ingridients}
                 key={ind}
                />
            })
        }
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <button
                className="text-2xl bg-blue-500 hover:bg-blue-800 w-fit py-1 px-2 rounded-lg text-white"
                type="button"
                onClick={() => {
                addIngridient('')              
                }}
            >
                +
            </button>
            <button
                className={buttonClass + "my-3 w-2/5 text-center"}
                type="button"
                disabled = {!enabled}
                onClick={() => {
                    sendMessage(sendAndCheckIngridients(ingridients))
                }}>
                    Generate
            </button>
            <div>
                {
                    isLoading ? <p className='text-white'>Loading...</p> : res !== "" ?
                    <Recipe res={res} /> : <></>
                }
            </div>
        </div>
    </div>
}

export default page