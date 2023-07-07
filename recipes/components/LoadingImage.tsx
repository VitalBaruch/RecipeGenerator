"use client"
import { FC, useState } from 'react'
import {Loading} from '@nextui-org/react'
import Image from 'next/image'

interface LoadingImageProps {
  base64Image : string
  name : string
}

const LoadingImage: FC<LoadingImageProps> = ({base64Image, name}) => {
  const [loading, setLoading] = useState(true)
  return <div className='grid items-center w-2/5 relative m-2'>
    {
        loading ? <Loading /> : <></>
    }
        <Image src={`data:image/png;base64,${base64Image}`}
             className='rounded-lg'
             fill={true}
             alt={name}
             placeholder='empty'
             onLoadingComplete={() => {
                setLoading(false)
             }}
             hidden={loading}
        />
  </div>
}

export default LoadingImage