import { Navbar, Image, Card, Dropdown } from '@nextui-org/react'
import { FC } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

interface NavBar2Props {
  
}

const NavBar2: FC<NavBar2Props> = ({}) => {
  const router = useRouter()
  const {data : session} = useSession()
  return <Navbar isBordered variant={'sticky'}>
    <Navbar.Brand>
      <div className='btn btn-ghost flex items-center normal-case'
      onClick={() => router.push('/')}>
        <Image src='/recipe-book.png' alt='fail' width={40} height={40} />
        <h1 className='text-lg font-bold h-fit'>RecipeGenerator</h1>
      </div>
    </Navbar.Brand>
    {
      session?.user ? 
      <Dropdown>
        <Navbar.Item>
          <Dropdown.Button>
            Generate with
          </Dropdown.Button>
        </Navbar.Item>
        <Dropdown.Menu>
          <Dropdown.Item key={'Ingredients'}></Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown> :
      <></>
    }
  </Navbar>
}

export default NavBar2