import { FC } from 'react'
import { recipe } from '@/utils/types' 
import LoadingImage from './LoadingImage'

interface Recipe2Props {
  recipe : recipe
}  

const Recipe2: FC<Recipe2Props> = ({recipe}) => {
  return (
  <div className='flex w-full lg:w-7/12' key={recipe.name}>       
    <div className='p-5 text-white flex flex-col border-solid border-2 border-gray-600 rounded-lg m-2 w-3/5'>
        <h1>{recipe.name}</h1>
        <h5>Ingredients: <br/>{recipe.ingredients.map(ing => `${ing.name} ${ing.quantity} \n`)}</h5>
        <h5>Instructions:</h5>
        {
            recipe.instructions.map(((step, ind) => {
                return <p key={ind}>
                    {ind + 1}. {step}
                </p>
            }))
        }
    </div>
    <LoadingImage 
    name={recipe.name} />
    </div>
)}

export default Recipe2