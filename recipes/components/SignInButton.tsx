"use client"
import { FC } from 'react'
import {signIn, signOut, useSession} from 'next-auth/react'

interface SignInButtonProps {
  
}

const SignInButton: FC<SignInButtonProps> = ({}) => {
    const {data : session} = useSession()
    if(session && session.user) {
        return (
            <div>
                <p>Hello {session.user.name}</p>
                <button onClick={() => {
                    signOut()
                }}>Sign Out</button>
            </div>
        )
    }
    return (
         <button
          className='bg-blue-500 hover:bg-blue-700 font-bold text-white px-4 rounded-lg'
          onClick={() => signIn()}>Sign In</button>
    )
}

export default SignInButton