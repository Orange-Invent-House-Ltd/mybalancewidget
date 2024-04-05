import { ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"
import Withdraw from "./Withdraw"


function WithdrawIndex() {
  const navigate = useNavigate()

  return (
    <div className="md:w-[70%] w-full ml-auto px-[5%] pt-[30px]">
    <ArrowLeft size={40} className="border rounded-[4px] p-2 mb-4 text-[#FD7E14] bg-[#FFF2E8] cursor-pointer " onClick={() => navigate(-1)} />
     <h2 className="font-semibold text-[#303030] text-[23px] ">Withdraw Funds</h2>
     <p className="mb-6">Make your withdrawals seamlessly</p>
     
     <Withdraw/>
   
    </div>
  )
}

export default WithdrawIndex