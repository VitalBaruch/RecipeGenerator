"use client"
import { FC, useEffect, useState } from 'react'
import {Loading} from '@nextui-org/react'
import Image from 'next/image'
import { fetchImageFromName } from '@/utils/getImages'

interface LoadingImageProps {
  name : string
}

const LoadingImage: FC<LoadingImageProps> = ({name}) => {
  const [loading, setLoading] = useState(true)
  const [base64Image, setBase64Image] = useState('')

  useEffect(() => {
    const fnc = async() => {
      const res = await fetchImageFromName(name)
      setBase64Image(res) 
    }
    fnc()
  }, [])
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