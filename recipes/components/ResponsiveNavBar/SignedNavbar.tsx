import { FC } from 'react'
import { Dropdown, Link, Navbar, Text, Collapse } from '@nextui-org/react'
import NavbarBrand from './NavbarBrand'
import { signOut } from 'next-auth/react'

interface SignedNavbarProps {
    responsiveSize : 'xs' | 'md' | 'lg'  
}

const SignedNavbar: FC<SignedNavbarProps> = ({responsiveSize}) => {
    return (
    <Navbar maxWidth={'fluid'}>
      <NavbarBrand responsiveSize={responsiveSize} />
      <Navbar.Content hideIn={responsiveSize}>
      <Dropdown>
        <Navbar.Item>
          <Dropdown.Button light css={{px: '$0'}}>
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
        <Navbar.Link
         href='/myRecipes'>
          Recipe Book
        </Navbar.Link>
        <Navbar.Item>
          <Text
          className='cursor-pointer'
          weight={'bold'}
          color='error' 
          onClick={() => signOut()} >
            Logout
          </Text>
        </Navbar.Item>
      </Navbar.Content>
      {/* collapse menu */}
      <Navbar.Collapse>
        <Navbar.CollapseItem key={'Generate'}>
          <Collapse title={'Generate with'} divider={false}>
            <div className='flex flex-col'>
              <Link href='/fromIngredients' color={'inherit'}>Ingredients</Link>
              <Link href='/fromDescription' color={'inherit'}>Description</Link>
            </div>
          </Collapse>
        </Navbar.CollapseItem>
        <Navbar.CollapseItem key={'Recipe Book'}>
          <Link color={'inherit'} href='/myRecipes'>
            Recipe Book
          </Link>
        </Navbar.CollapseItem>
        <Navbar.CollapseItem key={'Logout'}>
          <Link color={'error'} onClick={() => signOut()}>
            Logout
          </Link>
        </Navbar.CollapseItem>
    </Navbar.Collapse>    
    </Navbar>
)}

export default SignedNavbar