import { Navbar, Image, Card, Dropdown, Link, Collapse, Text } from '@nextui-org/react'
import { FC } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

interface NavBar2Props {
  
}

const NavBar2: FC<NavBar2Props> = ({}) => {
  const router = useRouter()
  const {data : session} = useSession()
  return <Navbar isBordered variant={'sticky'} maxWidth={'fluid'} >
    <Navbar.Brand>
      <Navbar.Toggle aria-label="toggle navigation" showIn={'xs'} />
      <div className='btn btn-ghost flex items-center normal-case'
      onClick={() => router.push('/')}>
        <Image src='/recipe-book.png' alt='fail' width={40} height={40} />
        <Text hideIn={'xs'} className='text-lg font-bold h-fit'>RecipeGenerator</Text>
      </div>
    </Navbar.Brand>
    {
      session?.user ? 
      <Navbar.Content hideIn={'xs'}>
      <Dropdown>
        <Navbar.Item>
          <Dropdown.Button light className='btn-ghost'>
            Generate with
          </Dropdown.Button>
        </Navbar.Item>
        <Dropdown.Menu aria-label='Static Actions'>
          <Dropdown.Item key={'Ingredients'}
          showFullDescription
          className='py-10'
          description='Generate recipes that uses the ingridients you enter'>
            Ingredients
          </Dropdown.Item>
          <Dropdown.Item key={'Description'}
          showFullDescription
          className='py-10 my-2'
          description='Generate recipes that matches the description you enter'>
            Description
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <Navbar.Content>
        <Navbar.Item className='btn btn-ghost'>
            Recipe Book
        </Navbar.Item>
        <Navbar.Item className='btn btn-ghost'>
            Logout
        </Navbar.Item>
      </Navbar.Content>
      </Navbar.Content> :
      <></>
    }
    { session?.user ?
    <Navbar.Collapse>
        <Navbar.CollapseItem key={'Generate'}>
          <Collapse title={'Generate with'} divider={false}>
            <div className='flex flex-col'>
              <Link color={'inherit'}>Ingredients</Link>
              <Link color={'inherit'}>Description</Link>
            </div>
          </Collapse>
        </Navbar.CollapseItem>
        <Navbar.CollapseItem key={'Recipe Book'}>
          <Link color={'inherit'}>
            Recipe Book
          </Link>
        </Navbar.CollapseItem>
        <Navbar.CollapseItem key={'Logout'}>
          <Link color={'error'}>
            Logout
          </Link>
        </Navbar.CollapseItem>
    </Navbar.Collapse>  :
    <></>
    }
  </Navbar>
}

export default NavBar2