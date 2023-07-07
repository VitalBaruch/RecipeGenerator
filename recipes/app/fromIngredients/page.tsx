"use client"
import { FC, useEffect, useState } from 'react'
import {useMutation, useQuery} from 'react-query'
import IngridientInput from '@/components/IngridientInput'
import { sendAndCheckIngridients } from '@/utils/prompts'
import Recipe from '@/components/Recipe'
import {Loading} from '@nextui-org/react'
import { test } from 'node:test'
import { wait } from '@/utils/func'
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
            // const response = await fetch('/api/gpt/generateRecipes', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type' : 'application/json'
            //     },
            //     body : JSON.stringify({message})
            // })
            // const data : string = await response.json()
            // setRes(data)
            const data = `{
                "recipes": [
                  {
                    "name": "Pita with Hummus",
                    "ingredients": [
                      {
                        "name": "pita bread",
                        "quantity": "1 piece"
                      },
                      {
                        "name": "hummus",
                        "quantity": "1 cup"
                      }
                    ],
                    "instructions": [
                      "Cut the pita bread in half to form pockets.",
                      "Spread hummus evenly inside each pocket.",
                      "Serve and enjoy!"
                    ]
                  }
                ]
              }`
            setTimeout(() => {
               setRes(data) 
            }, 5000); 
            return data
        },
        onSuccess : () => {
            console.log('success');
        },
        onError : () => {
            console.log('error');
        }
    })


    const test = async () => {
        const response = await fetch ('/api/test', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify("")
        })
        return response.json()
    }

    const generateRecipes = useQuery({
        queryKey: ingridients,
        queryFn: () => test(),
        enabled: false,
        onSettled: (data) => {
            console.log(data);
            setRes(data)
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
                disabled={generateRecipes.status === 'loading'}
                onClick={() => {
                addIngridient('')              
                }}
            >
                +
            </button>
            <button
                className={buttonClass + "my-3 w-2/5 text-center"}
                type="button"
                disabled = {!enabled || generateRecipes.status === 'loading'}
                onClick={() => {
                    // sendMessage(sendAndCheckIngridients(ingridients))
                   generateRecipes.refetch()
                }}>
                    Generate
            </button>
            <>
                {
                    generateRecipes.status === 'loading' ? 
                    <Loading /> : res !== '' ? <Recipe res={res} /> :
                    <></>
                }
            </>
        </div>
    </div>
}

export default page