import { useState } from "react"
import { Link } from "react-router-dom"
import UnlockFundModal from "./UnlockFundModal"
import moment from "moment"
import FormatNumberWithCommas from "../reuseable/FormatNumberWithCommas"
import { Copy } from "lucide-react"
import { toast } from "react-toastify"

const UnlockFundCard = ({cartData, handleSingleCheckBoxChange}:any) => {
  const [unlockFund, setUnlockFund] = useState(false)
  const today  = moment().format("YYYY-MM-DD");
  // const [disable, setDisable] = useState(false)
  // today <= cartData?.escrow?.deliveryDate ? setDisable(true) : setDisable(false) 
  let disable;
  today <= cartData?.escrow?.deliveryDate ? disable = true : disable = false 

  
  return (
    <div className="">
      {unlockFund && (
        <UnlockFundModal unlockFund = {unlockFund} setUnlockFund={setUnlockFund} cartData={cartData} />
      )}
      <div className='flex justify-between items-center'>
        <div className='flex items-center gap-6'>
          <input type="checkbox" name='item' value={cartData?.id} checked={cartData?.isChecked} onChange={() => handleSingleCheckBoxChange(cartData?.id)} />
          <img src={cartData?.img} alt={cartData?.name}  className="w-[50px]"/>
          <div>
            <div className="text-[#999999] text-[14px] flex items-center gap-x-2">
              <p>{cartData?.meta?.sourcePaymentTransaction.slice(0, 8)}</p>
              <Copy className="" onClick={()=>{
                navigator.clipboard.writeText(cartData?.meta?.sourcePaymentTransaction)
                toast.success('Transaction id copied successfully!')
              }} />
            </div>
            <h2 className='font-medium'>{cartData?.meta?.title}</h2>
            <p className="text-[#999999]">{cartData?.meta?.description}</p>
            <p className="text-[13px]">
              <span>Delivery date: <span className="font-semiold">{cartData?.escrow?.deliveryDate}</span></span> 
              <span className="ml-4 font-bold">₦ <FormatNumberWithCommas number={cartData?.amount}/></span>
            </p>
          </div>
        </div>
        <div className="flex gap-6">
        <Link to='/buyer/item-details' state={{cartData: cartData }}><p className="font-medium text-[14px] cursor-pointer hover:underline">View Info</p></Link>
          
          {cartData?.escrow?.disputeRaised ? (
            <p className="font-medium text-[14px] opacity-50 hover:cursor-not-allowed">
             Dispute Raised</p>
          ):(
            <Link to='/buyer/raise-a-dispute' state={{cartData: cartData }}><p className="font-medium text-[14px] cursor-pointer hover:underline">
              Raise a Dispute</p>
            </Link>
          )}
          {/* <button disabled = { today <= cartData?.escrow?.deliveryDate ? true : false } className="disabled:opacity-50 disabled:cursor-not-allowed">
            <Link to='/buyer/raise-a-dispute' state={{cartData: cartData }}><p className="font-medium text-[14px] cursor-pointer hover:underline">
              Raise a Dispute</p>
            </Link>
          </button> */}
          <button className="font-medium text-[14px] text-[#FD7E14] cursor-pointer hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={()=> setUnlockFund(true)}
          >Unlock Funds </button>
        </div>
      </div>
      <div className="border border-[#EDEDED] mt-2"/>
    </div>
  )
}

export default UnlockFundCard