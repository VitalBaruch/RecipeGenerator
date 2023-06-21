'use client'
import { FC, useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import Recipe2 from '@/components/Recipe2'

interface pageProps {
  
}

const page: FC<pageProps> = ({}) => {
    const {data : session} = useSession();

    const getUserRecipes = async (userEmail : string) => {
        console.log(session?.user?.email);
        const response = await fetch('/api/getRecipes', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({userEmail})
        })
        const data = await response.json()
        console.log(data);
        return data
    }

    const [recipesArray, setRecipesArray] = useState(null)

    useEffect(() => {
        const get = async () => {
            const res = await getUserRecipes(session?.user?.email!)
            const {recipes} = res
            setRecipesArray(recipes)
        }
        get()
    },[])

    return <div>
        <h1>My Recipes</h1>
        {
            recipesArray ?
            <Recipe2 recipesArr={recipesArray} />
            : <p>Loading...</p> 
        }
    </div>
}

export default page