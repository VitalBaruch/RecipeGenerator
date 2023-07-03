import { FC, useEffect, useState } from 'react'

interface inputProps {
  number : number,
  ingridients : string[],
  removeIngridient(ind: number) : void
  setIngridients : Function
}
const ingridientInput: FC<inputProps> = ({removeIngridient ,number, ingridients, setIngridients}) => {  
const [val, setVal] = useState('')
useEffect(() => {
  setVal(ingridients[number - 1])
},[ingridients[number - 1]])

  return <div className='h-15 flex content-center'>
    <input
              value={val}
              type="text"
              name="username"
              id="username"
              autoComplete="username"
              className= "text-white bg-transparent ring-2 my-2 ring-gray-400 rounded-lg indent-2 w-full hover:ring-blue-600 focus:ring-blue-600 focus:outline-none"
              placeholder= {`Ingridient number ${number}`}
              onChange={(e) => {
                setVal(e.target.value)
                ingridients[number - 1] = e.target.value
                setIngridients([...ingridients])
              }}
        />
    <button
      className="m-2 bg-blue-500 hover:bg-blue-700 text-white text-2xl px-2 py-1 rounded focus:outline-none focus:shadow-outline"
      onClick={() => {
        if (ingridients.length == 2) {
          alert('You must have at least 2 ingridients')
        } else {
          removeIngridient(number - 1)
        }
      }}
    >
      -
    </button>
  </div>
}

export default ingridientInput