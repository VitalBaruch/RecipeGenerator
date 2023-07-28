import { Link, Navbar, Text } from '@nextui-org/react'
import { FC } from 'react'
import NavbarBrand from './NavbarBrand'

interface UnsignedNavbarProps {
  responsiveSize : 'xs' | 'md' | 'lg'
  setLoginModalVisible: (active : boolean) => void
}

const UnsignedNavbar: FC<UnsignedNavbarProps> = ({setLoginModalVisible, responsiveSize}) => {
  return (
  <Navbar maxWidth={'fluid'}>
    <NavbarBrand responsiveSize={responsiveSize} />
    <Navbar.Content>
      <button
       onClick={() => setLoginModalVisible(true)}
       className='btn btn-ghost normal-case text-lg'>
        Login
      </button>
      <Link
       color={'inherit'}
       href='/register'
       className='btn btn-ghost normal-case text-lg'>
        Register
      </Link>
    </Navbar.Content>  
  </Navbar>
)}

export default UnsignedNavbar