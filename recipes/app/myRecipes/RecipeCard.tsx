import LoadingImage from '@/components/LoadingImage'
import { recipe } from '@/utils/types'
import { Card, Text } from '@nextui-org/react'
import { FC, useEffect, useState } from 'react'
import { fetchImageFromName } from '@/utils/getImages'


interface RecipeCardProps {
  recipe: recipe
}

const RecipeCard: FC<RecipeCardProps> = ({recipe}) => {
  const [loading, setLoading] = useState(true)
  const [base64Image, setBase64Image] = useState('')

  useEffect(() => {
    const fnc = async() => {
      const res = await fetchImageFromName(recipe.name)
      setBase64Image(res) 
    }
    fnc()
  }, [])

  return <Card
   isPressable
   isHoverable
   variant='shadow'
   >
    <Card.Header>
        <Text>{recipe.name}</Text>
    </Card.Header>
    <Card.Divider/>
    <Card.Image src={`data:image/png;base64,${base64Image}`}
    showSkeleton
    width={'100%'}
    height={'100%'}
    objectFit='cover'
    alt='...'
    />
    <Card.Footer>
        <button>Remove</button>
    </Card.Footer>
  </Card>
}

export default RecipeCard