"use client"
import { FC } from 'react'
import {useForm, SubmitHandler} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import {z} from 'zod'
import {useRouter} from 'next/navigation'
import {useSession} from 'next-auth/react'
import ErrorSilde from '@/components/errorSilde'


interface pageProps {
}

const schema = z.object({
    username : z.string().regex(/^[A-Za-z][A-Za-z0-9_]{4,19}$/, {
            message: 'Username must be in uppercase and lowercase letters only and between 5-20 characters long'
        }),
    email : z.string().email(),
    password : z.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,20}$/,{
    message: 'Password must be between 8 to 20 characters, also must contains: \n' +
    '1 lowercase and 1 uppercase english letter, 1 digit and 1 special character'}),
    confirmPassword : z.string()
}).refine((data) => data.confirmPassword === data.password, {
    message: 'Password must match',
    path: ['confirmPassword']
})

interface FormInput {
    username : string
    email : string
    password : string
    confirmPassword : string
}

const page: FC<pageProps> = ({}) => {

  const {data : session} = useSession()
  const router = useRouter()

  if(session && session.user) {
    router.push('/')
  }

  const {register, handleSubmit, formState: {errors}} = useForm<FormInput>({
    resolver: zodResolver(schema)
  })  

  const onSubmit = async (data: FormInput) => {
    const {username, email, password} = data;
    const res = await fetch('/api/signUp', {
        method: 'POST',
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({
            username,
            email,
            password
        })
    })
    const response: any = await res.json()
    alert(response.msg)
    router.push('/')
  }

  interface Props {
    name : "username"|"password"|"email"|"confirmPassword"
  }

  const ErrorComponent: React.FC<Props> = ({name}) => {
    return <div className='text-red-600'>{
      name === "username" ? errors.username?.message :
      name === "password" ? errors.password?.message :
      name === "email" ? errors.email?.message :
      errors.confirmPassword?.message
   }</div> 
  }
  
  const InputComponent: React.FC<Props> = ({name}) => {
    return <input 
        {...register(name, {required: true})}
        placeholder= {`Insert ${name} here...`} 
        className='input input-bordered text-black'
        />
  }
  const inputs: ("username"|"password"|"email"|"confirmPassword")[] = ['username', 'email', 'password', 'confirmPassword']
  return( 
  <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col flex-wrap justify-center content-center bg-lime-500 m-5 p-2'>
    <h1 className='text-center my-6 text-2xl font-bold text-white'>Register</h1>
    { inputs.map((name) => {
      return <div className='w-full flex flex-col items-center'> 
      <input 
      {...register(name, {required: true})}
      placeholder= {name} 
      className='input input-bordered w-4/5 m-2 text-black'
      />
      {
        <div className='bg-error'>
          {
            name === "username" ? errors.username?.message :
            name === "password" ? errors.password?.message :
            name === "email" ? errors.email?.message :
            errors.confirmPassword?.message
          }
        </div>
      }
      </div>
    })
    }
    <div className='flex justify-center'>
        <input
        className='text-center bg-blue-500 hover:bg-blue-700 cursor-pointer rounded-lg text-white w-2/5 p-2'
        type='submit'
        value={'Register'}/>
    </div>
  </form>
)}


export default page