import { Input, Modal, Text } from '@nextui-org/react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { FC, useRef, useState } from 'react'
import {useForm, SubmitHandler} from 'react-hook-form'
import AlertSlide from './AlertSlide'

interface LoginModalProps {
  visible : boolean
  setVisible: any
}

interface FormInput {
    email : string
    password : string
}

const LoginModal: FC<LoginModalProps> = ({visible, setVisible}) => {  
  const {register, handleSubmit, formState: {errors}} = useForm<FormInput>()  
  const [err, setErr] = useState<boolean>(false)  
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()
  const onSubmit = async (data : FormInput) => {
        setLoading(true)
        const res = await signIn('credentials', {redirect: false,
        email: data.email,
        password: data.password})
        console.log(res);
        setLoading(false)
        if (res?.error) {
            setErr(true)
        } else {
            setErr(false)
            setVisible(false)
            router.push('/')
        }
    }
  return <Modal
  preventClose={loading}
  open={visible}
  onClose={() => {
    setErr(false)
    setVisible(false)
  }}>
  <Modal.Body className='bg-lime-400' >
    <h1 className='text-2xl font-bold text-black'>Sign in</h1>
    <form onSubmit={handleSubmit(onSubmit)}>
        <Input
        disabled={loading}
        clearable
        underlined
        fullWidth
        color= 'default'        size="lg"
        status={`${errors.email ? 'error' : 'default'}`}
        labelLeft='Email'
        {...register('email', {required: true})}
        />
        <Input.Password
        disabled={loading}
        clearable
        underlined
        fullWidth
        color= 'default'
        status= {`${errors.password ? 'error' : 'default'}`}
        size="lg"
        labelLeft='Password'
        {...register('password', {required: true})}
        />
        <div className='mt-2'>
            <AlertSlide type='error' alertMessage={err ? `User doesn't exist!` : ''} />
        </div>
        {   loading ?
            <button disabled className='btn btn-outline font-bold text-black mt-2'>
                <span className='loading loading-spinner'></span>
                Loading
            </button>
             :
            <input type='submit' className='btn btn-outline font-bold text-black mt-2' value={'Continue ->'}/>
        }
    </form>
  </Modal.Body>
</Modal>
}

export default LoginModal