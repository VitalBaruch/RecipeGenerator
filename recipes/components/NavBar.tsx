import { FC,  ReactNode } from 'react'
import {useSession, signIn, signOut} from 'next-auth/react'
import { useRouter } from 'next/navigation'

interface NavBarProps {
}

const NavBar: FC<NavBarProps> = () => {
    const {data : session} = useSession()
    const router = useRouter()
    return (
        <nav className='flex bg-slate-500 justify-between py-2'>
            <h1 onClick={() => {
                router.push('/')
            }} className='cursor-pointer font-bold rounded-lg text-white text-2xl px-2'>RecipeGen</h1>
                <div className='w-4/5 flex justify-end pr-5'>
                    {
                    session && session.user ?
                    <>
                    <button
                    onClick={() => {
                        router.push('/myRecipes')
                    }} 
                    className='text-blue-500 font-bold mx-2 bg-white hover:bg-slate-400 px-2 rounded-lg'>
                        {session.user.name} Recipes</button>
                    <button 
                    className='bg-blue-500 hover:bg-blue-700 px-2 mx-2 rounded-lg text-white font-bold'  
                    onClick={() => {
                        router.push('/fromIngredients')
                    }}>Tell me what you have</button>
                    <button className='bg-blue-500 hover:bg-blue-700 px-2 mx-2 rounded-lg text-white font-bold'
                    onClick={() => {
                        router.push('/fromDescription')
                    }}>
                       Tell me what you want 
                    </button>
                    <button
                     className='bg-blue-500 hover:bg-blue-700 px-2 mx-2 rounded-lg text-white font-bold'
                     onClick={() => {
                        signOut()
                        router.push('/')
                    }}>LogOut</button>
                    </>
                    :
                    <>
                    <button
                        className='mx-2 bg-blue-500 hover:bg-blue-700 font-bold text-white px-4 rounded-lg'
                        onClick={() => {
                        router.push('/register')
                    }}>Register</button>
                    <button
                        className='bg-blue-500 hover:bg-blue-700 font-bold text-white px-4 rounded-lg'
                        onClick={() => {
                        signIn()
                    }}>Login</button>
                    </>
                }
                </div>
        </nav>
    )
}

export default NavBar