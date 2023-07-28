"use client"
import { useSession } from 'next-auth/react'
import { FC, useState } from 'react'
import SignedNavbar from './SignedNavbar'
import UnsignedNavbar from './UnsignedNavbar'
import LoginModal from '../LoginModal'

interface NavProps {
  
}

const Nav: FC<NavProps> = ({}) => {
  const {data : session} = useSession()  
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  return session?.user ?
  <SignedNavbar responsiveSize='xs' /> :
  <>
  <UnsignedNavbar responsiveSize='xs' setLoginModalVisible={setModalVisible} />
  <LoginModal setVisible={setModalVisible} visible={modalVisible} />
  </>
}

export default Nav