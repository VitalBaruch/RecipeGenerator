import { FC, useState } from 'react'
import {useSession, signIn, signOut} from 'next-auth/react'
import { useRouter } from 'next/navigation'
import LoginModal from './LoginModal'

interface NavBarProps {
}

const NavBar: FC<NavBarProps> = () => {
    const [modalVisible, setModalVisible] = useState<boolean>(false)
    const {data : session} = useSession()
    const router = useRouter()
    return (
    <div className="navbar bg-lime-500">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost md:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
          </label>
          <ul tabIndex={0} className="menu menu-md dropdown-content mt-3 z-[1] p-2 shadow bg-lime-500 rounded-box w-52">
          { session?.user && 
          <>
          <li>
            <a className='hover:text-white'>Generate with</a>
            <ul className="p-2">
              <li><a onClick={() => {
                router.push('/fromIngredients')
              }} className='hover:text-white'>ingredients</a></li>
              <li><a onClick={() => {
                router.push('/fromDescription')
              }} className='hover:text-white'>description</a></li>
            </ul>
          </li>
          <li><a className='hover:text-white'>Forum</a></li>
          </>
          }
          </ul>
        </div>
        <a onClick={() => {
          router.push('/')
        }} className="btn btn-ghost normal-case text-xl">RecipeGenerator</a>
      </div>
      <div className="navbar-center hidden md:flex">
        <ul className="menu menu-horizontal px-1">
        { session?.user &&
        <>
        <li tabIndex={0}>
          <details>
            <summary className='hover:text-white'>Generate with</summary>
            <ul className="p-2 bg-lime-500 rounded-none">
              <li><a onClick={() => {
                router.push('/fromIngredients')
              }} className=' hover:text-white'>ingredients</a></li>
              <li><a onClick={() => {
                router.push('/fromDescription')
              }} className='hover:text-white'>description</a></li>
            </ul>
          </details>
        </li>
        <li><a className='hover:text-white'>Forum</a></li>
        </>
        }
        </ul>
      </div>
      <div className="navbar-end">
        <ul className='p-2'>
        {
          session?.user ?
          <li>
          <a onClick={() => {
            router.push('/myRecipes')
          }} className="btn normal-case btn-ghost mx-1 text-white text-lg">My Recipes</a> 
          <a onClick={() => {
            signOut({callbackUrl: '/'})
          }} className="btn normal-case btn-ghost text-white text-lg">Logout</a> 
          </li> :
          <li>
            <a onClick={() => {
              setModalVisible(true)
              // signIn('credentials', {callbackUrl: '/', redirect: false})
            }} className="btn normal-case btn-ghost mx-1 text-white text-lg">Login</a>
            <a onClick={() => {
              router.push('/register')
            }} className="btn normal-case btn-ghost mx-1 text-white text-lg">Register</a>
          </li>
        }
        </ul>
      </div>
      <LoginModal visible={modalVisible} setVisible={setModalVisible} />
    </div>
)}

export default NavBar