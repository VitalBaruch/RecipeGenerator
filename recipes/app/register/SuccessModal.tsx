import { FC } from 'react'
import { Modal } from '@nextui-org/react'
import { useRouter } from 'next/navigation'

interface SuccessModalProps {
  modalVisible : boolean
  setModalVisible : (state : boolean) => void
}

const SuccessModal: FC<SuccessModalProps> = ({modalVisible, setModalVisible}) => {
  const router = useRouter()  
  return <Modal 
  open= {modalVisible}
  onClose={() => router.push('/')} 
 >
   <Modal.Header className='bg-lime-500'>
     <h1 className='font-bold text-xl text-white'>Signed up succefully!</h1>
   </Modal.Header>
   <Modal.Body className='bg-lime-500 grid items-center'>
     <p className='text-white text-center'>
       Thank you for signing up for RecipeGenerator! press OK to go back to the home page
     </p>
     <button className='btn btn-ghost text-white font-bold w-1/5 '
      onClick={() => setModalVisible(false)}>OK</button>
   </Modal.Body>
 </Modal>
}

export default SuccessModal