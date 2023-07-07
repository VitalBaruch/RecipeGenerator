"use client"

import { FC, useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { recipe} from '@/utils/types'
import Recipe2 from './Recipe2'
import { useQuery } from 'react-query'
import {Loading} from '@nextui-org/react'
import {getImageFromAWS, getImageFromGPT} from '@/utils/getImages'
import ButtonLoader from './ButtonLoader'

interface RecipeProps {
  res : string
}

const Recipe: FC<RecipeProps> = ({res}) => {
    const resObj = JSON.parse(res)
    const [recipeArr, setRecipeArr] = useState<recipe[]>(resObj.recipes)

    const addRecipe = async (recipe: recipe) => {
        const recipeBody = {
            name: recipe.name,
            ingredients: recipe.ingredients,
            instructions: recipe.instructions,
            userEmail: session?.user?.email,
            base64Image : recipe.base64Image
        }
        const res = await fetch('/api/addRecipe', {
            method: 'POST',
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(recipeBody)
        })
        const response: any = await res.json()
        alert(response.msg)
    }

    const fetchImages = useQuery({
        queryFn: async () => {
            for (let i = 0; i < recipeArr.length ; i++) {
                try {
                    const base64Image = await getImageFromAWS(recipeArr[i].name)
                    recipeArr[i].base64Image = base64Image;
                } catch (e) {
                    console.log(e);
                    console.log(recipeArr[i].name);
                    const base64Image = await getImageFromGPT(recipeArr[i].name)
                    recipeArr[i].base64Image = base64Image
                }
            }
        },
        queryKey: [res],
        onSuccess: () => {
            console.log('success');
        }
    })

    const {data : session} = useSession();
    
    return (
    <>
        {
            fetchImages.status !== 'success' ? <Loading /> :
            recipeArr.map((recipe) => {
                return <div key={recipe.name} className='flex w-full justify-center content-center'>
                    <Recipe2 recipe={recipe} />
                    <ButtonLoader classname='text-white hover:bg-slate-400 m-2 rounded-lg border-solid border-2 border-white'
                        buttonName='Add Recipe' buttonFunction={() => addRecipe(recipe)} />
                </div>
            })
        }
    </>)
}

export default Recipe