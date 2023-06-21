"use client"

import { FC, useEffect, useState } from 'react'
import { useMutation } from 'react-query'
import { useSession } from 'next-auth/react'

interface RecipeProps {
  res : string
}

interface ingredient {
    name : string,
    quantity: string
}

interface recipe {
    name : string,
    ingredients : ingredient[],
    instructions : string[]
}

const Recipe: FC<RecipeProps> = ({res}) => {
    const resObj = JSON.parse(res)
    const [recipeArr, setRecipeArr] = useState<recipe[]>(resObj.recipes)
    const [imagesURLs, setImagesURLs] = useState<string[]>([])

    const addRecipe = async (recipe: recipe, url:string) => {
        const recipeBody = {
            name: recipe.name,
            ingredients: recipe.ingredients,
            instructions: recipe.instructions,
            pictureUrl: url,
            userEmail: session?.user?.email
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


    const getImageURL = async (prompt : string) => {
        const response = await fetch('/api/gpt/generateImage', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({prompt})
        })
        const data = await response.json()
        return data as string
    }   

    useEffect(() => {
        const fetchImages = async () => {
            const PromiseAllArr = recipeArr.map((rec, index) =>
              getImageURL(rec.name).then((result) => ({ index, url: result }))
            );
            const results = await Promise.all(PromiseAllArr);
            const imagesUrlsArr = Array(recipeArr.length).fill(null);
        
            results.forEach(({ index, url }) => {
              imagesUrlsArr[index] = url;
            });
        
            setImagesURLs(imagesUrlsArr);
            console.log(imagesUrlsArr);
          };
          fetchImages();
    },[])

    const {data : session} = useSession();
    
    return <div>
        {
            recipeArr.map(((rec, ind) => {
                return <div className='flex' key={ind}>       
                <div className='p-5 text-white flex flex-col border-solid border-2 border-gray-600 rounded-lg m-2 w-3/5'>
                    <h1>{ind + 1}. {rec.name}</h1>
                    <h5>Ingridients: <br/>{rec.ingredients.map(ing => `${ing.name} ${ing.quantity} \n`)}</h5>
                    <h5>Instructions:</h5>
                    {
                        rec.instructions.map(((step, ind) => {
                            return <p key={ind}>
                                {ind + 1}. {step}
                            </p>
                        }))
                    }
                </div>
                <img src={`data:image/png;base64,${imagesURLs[ind]}`} width={400} height={400} alt='Loading...' className='w-2/5 my-2 rounded-lg' />
                <button className='text-white hover:bg-slate-400 m-2 rounded-lg border-solid border-2 border-white' hidden={!(session && session.user)} onClick={async () => {
                    await addRecipe(rec, imagesURLs[ind])
                }}>
                    Add Recipe
                </button>
            </div>    
            }))
        }
    </div>
}

export default Recipe