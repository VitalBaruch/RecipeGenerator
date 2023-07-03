"use client"

import { FC, useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { recipeReturn} from '@/utils/types'
import Recipe2 from './Recipe2'
import { useMutation, useQuery } from 'react-query'
import {Loading} from '@nextui-org/react'
import {getImageFromAWS, getImageFromGPT} from '@/utils/getImages'

interface RecipeProps {
  res : string
}

const Recipe: FC<RecipeProps> = ({res}) => {
    const resObj = JSON.parse(res)
    const [recipeArr, setRecipeArr] = useState<recipeReturn[]>(resObj.recipes)

    const addRecipe = async (recipe: recipeReturn) => {
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

    // useEffect(() => {
        
    //     const fetchImages = async () => {
    //         for (let i = 0; i < recipeArr.length ; i++) {
    //             const base64Image = await getImageFromAWS(recipeArr[i].name)
    //             console.log(base64Image);
    //             recipeArr[i].base64Image = base64Image;
    //         }
    //       };
    //       fetchImages();
    // },[])

    const {data : session} = useSession();
    
    return (
    <div>
        {
            fetchImages.status !== 'success' ? <Loading /> :
            recipeArr.map((recipe) => {
                return <>
                <Recipe2 recipe={recipe} key={recipe.name} />
                <button className='text-white hover:bg-slate-400 m-2 rounded-lg border-solid border-2 border-white' hidden={!(session && session.user)} onClick={async () => {
                await addRecipe(recipe)
                }}>
                    Add Recipe
                </button>        
                </>
            })
        }
    </div>)
}

export default Recipe