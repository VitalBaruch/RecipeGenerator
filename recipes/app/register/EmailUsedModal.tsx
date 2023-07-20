import { FC } from 'react'
import { Modal } from '@nextui-org/react'
import { useRouter } from 'next/navigation'

interface EmailUsedModalProps {
  modalVisible : boolean
  setModalVisible : (state : boolean) => void
}

const EmailUsedModal: FC<EmailUsedModalProps> = ({modalVisible, setModalVisible}) => {
    const router = useRouter()
    return (   
    <Modal 
    open= {modalVisible}
    preventClose 
    >
    <Modal.Header className='bg-error'>
        <h1 className='font-bold text-xl text-black'>
            Email already in use!
        </h1>
    </Modal.Header>
    <Modal.Body className='bg-error grid items-center'>
        <p className='text-black text-center'>
            Please use a diffrent Email or sign in with it 
        </p>
        <button className='btn btn-outline text-black font-bold w-1/5'
        onClick={() => setModalVisible(false)}>OK</button>
    </Modal.Body>
    </Modal>
)}

export default EmailUsedModal