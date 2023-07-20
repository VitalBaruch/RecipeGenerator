"use client"
import { FC, ReactElement, useState } from 'react'
import {useForm, SubmitHandler} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import {z} from 'zod'
import {useRouter} from 'next/navigation'
import {useSession} from 'next-auth/react'
import AlertSlide from '@/components/AlertSlide'
import { Card, Modal, Input } from '@nextui-org/react'
import SuccessModal from './successModal'
import EmailUsedModal from './EmailUsedModal'


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
  const [loading, setLoading] = useState<boolean>(false)
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [emailUsed, setEmailUsed] = useState<boolean>(false)

  if(session && session.user) {
    router.push('/')
  }

  const {register, handleSubmit, formState: {errors}} = useForm<FormInput>({
    resolver: zodResolver(schema)
  })  

  const onSubmit = async (data: FormInput) => {
    setLoading(true)
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
    const {msg} = await res.json()
    setLoading(false)
    if (msg === 'Email in use!') {
      setEmailUsed(true)
    } else {
    setModalVisible(true)
    }
  }

  const inputs: ("username"|"password"|"email"|"confirmPassword")[] = ['username', 'email', 'password', 'confirmPassword']

  return( 
  <Card variant='bordered' css={{marginTop: '$5', width: '80%', backgroundColor:'Black'}}>
  <Card.Body className='bg-lime-400'>  
  <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col flex-wrap justify-center content-center'>
    <h1 className='text-center my-6 text-2xl font-bold text-black'>Register</h1>
    { inputs.map((name) => {
      return <div key={name} className='w-full flex flex-col items-center'> 
      { name !== 'password' && name !== 'confirmPassword' ?
        <Input
        size='xl'
        clearable
        underlined 
        {...register(name, {required: true})} 
        disabled={loading}
        labelLeft={name}
        css={{width: '80%', fontWeight:'$bold', mb:'$3'}}
      /> :
      <Input.Password
        size='xl'
        clearable
        underlined 
        {...register(name, {required: true})} 
        disabled={loading}
        labelLeft={name}
        css={{width: '80%', fontWeight:'$bold', mb:'$3'}}
      />
      }
        <div className='w-4/5'>
          <AlertSlide type='warning' alertMessage={name === "username" ? errors.username?.message :
                name === "password" ? errors.password?.message :
                name === "email" ? errors.email?.message :
                errors.confirmPassword?.message } />
        </div>
      </div>
    })
    }
    <div className='flex justify-center mt-2'>
      {
        loading ?
        <button className="btn btn-outline w-2/5 text-lg font-bold">
          <span className="loading loading-spinner text-white"></span>
          loading
        </button> :
        <input
        className='btn btn-outline text-lg font-bold w-2/5'
        type='submit'
        value={'Sign up ->'}/> 
      }
    </div>
    <EmailUsedModal modalVisible={emailUsed} setModalVisible={setEmailUsed} />
    <SuccessModal modalVisible={modalVisible} setModalVisible={setModalVisible} />
  </form>
  </Card.Body>
  </Card>
)}


export default page