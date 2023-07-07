import { FC, useState } from 'react'
import {Loading} from '@nextui-org/react'

interface ButtonLoaderProps {
 buttonFunction : () =>  void
 buttonName : string
 classname : React.ComponentProps<'div'>['className']
}

const ButtonLoader: FC <ButtonLoaderProps> = ({ buttonFunction, buttonName, classname}) => {
  const [loading, setLoading] = useState<Boolean>(false)
  return <div className={`grid items-center w-1/5`}>
    {loading ? 
      <button className={'btn' + classname}>
        <span className="loading loading-spinner"></span>
        loading
      </button> :
      <button className={classname}
        onClick={async() => {
          setLoading(true)
          await buttonFunction()
          setLoading(false)
    }}>
        {buttonName}
      </button>
    }
  </div>
}
export default ButtonLoader