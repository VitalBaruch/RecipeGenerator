import { FC } from 'react'
import { Navbar, Image, Text, Link } from '@nextui-org/react' 

interface NavbarBrandProps {
   responsiveSize : 'xs' | 'md' | 'lg'
}

const NavbarBrand: FC<NavbarBrandProps> = ({responsiveSize}) => {
  return (
    <Navbar.Brand>
      <Navbar.Toggle aria-label="toggle navigation" showIn={responsiveSize} />
      <Link href='/' className='btn btn-ghost flex items-center normal-case'>
        <Image src='/recipe-book.png' alt='fail' width={40} height={40} />
        <Text hideIn={'xs'} className='text-lg font-bold h-fit'>RecipeGenerator</Text>
      </Link>
    </Navbar.Brand>
)}

export default NavbarBrand