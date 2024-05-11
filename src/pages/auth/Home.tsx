import { Bird } from 'lucide-react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import EmptyState from '../../components/reuseable/EmptyState'

const Home = () => {
  const navigate = useNavigate()
  
  // useEffect(()=>{
  //   setTimeout(()=>{
  //     navigate('/buyer/unlock-fund')
  //   },1000)
  // },[]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <div className='absolute top-[50%] left-[50%] -translate-y-1/2 -translate-x-1/2 z-50'>
        <EmptyState
          img={
            <Bird size={100} className="" />
          }
          title={`Reopen this modal`}
          text={`opps, something went wrong. Close this modal and open it again.`}
        />
      </div>
    </div>
  )
}

export default Home