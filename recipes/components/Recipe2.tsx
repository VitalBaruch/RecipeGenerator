import { FC } from 'react'

interface Recipe2Props {
  recipesArr : recipe[]
}

interface ingredient {
      name : string,
      quantity: string
}
  
interface recipe {
      name : string,
      ingredients : ingredient[],
      instructions : string[],
      pictureUrl : string
}
  

const Recipe2: FC<Recipe2Props> = ({recipesArr}) => {
  return <>
    {
        recipesArr.map(((rec, ind) => {
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
            <img src={`data:image/png;base64,${rec.pictureUrl}`} width={400} height={400} alt='Loading...' className='w-2/5 my-2 rounded-lg' />
            </div>
        }))
    }
  </>
}

export default Recipe2