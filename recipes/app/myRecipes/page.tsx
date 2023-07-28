'use client'
import { FC, useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import Recipe2 from '@/components/Recipe2'
import {Loading} from '@nextui-org/react'
import { recipe } from '@/utils/types'
import RecipeCard from './RecipeCard'

interface pageProps {
}

const page: FC<pageProps> = ({}) => {
    const {data : session, status} = useSession();
    const [recipesArray, setRecipesArray] = useState<recipe[]>()
    const [loaded, setLoaded] = useState(false)

    const getUserRecipes = async (userEmail : string) => {
        console.log(`user email: ${userEmail}`);
        const response = await fetch('/api/getRecipes', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({userEmail})
        })
        const data = await response.json()
        return data
    }


    useEffect(() => {
        const get = async () => {
            const res = await getUserRecipes(session?.user?.email!)
            const {recipes} = res
            setRecipesArray(recipes)
            setLoaded(true)
        } 
        session?.user?.email !== undefined && get()
    },[status])

    return <div>
        <h1 className='text-center text-4xl font-bold mt-2 text-black'>{session?.user?.name} Recipe Book</h1>
        <div className='flex flex-col justify-center mt-5'>
        {
            loaded ? recipesArray!.map((recipe) => {
               return <RecipeCard recipe={recipe} key={recipe.name}/>
            })
                
            : <Loading /> 
        }
        </div>
    </div>
}

export default page