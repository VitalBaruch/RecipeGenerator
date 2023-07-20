import { Navbar } from '@nextui-org/react'
import { FC } from 'react'

interface NavBar2Props {
  
}

const NavBar2: FC<NavBar2Props> = ({}) => {
  return <Navbar isBordered variant={'sticky'}>
    <Navbar.Brand>
        <h1>RecipeGenerator</h1>
    </Navbar.Brand>
  </Navbar>
}

export default NavBar2