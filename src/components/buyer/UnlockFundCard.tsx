import { useState } from "react"
import { Link } from "react-router-dom"
import UnlockFundModal from "./UnlockFundModal"



const UnlockFundCard = ({cartData, handleSingleCheckBoxChange}:any) => {
  const [unlockFund, setUnlockFund] = useState(false)
  return (
    <div className="">
      {unlockFund && <UnlockFundModal unlockFund = {unlockFund} setUnlockFund={setUnlockFund} cartData={cartData} /> }
      <div className='flex justify-between items-center'>
        <div className='flex items-center gap-6'>
          <input type="checkbox" name='item' value={cartData?.id} checked={cartData?.isChecked} onChange={() => handleSingleCheckBoxChange(cartData?.id)} />
          <img src={cartData?.img} alt={cartData?.name}  className="w-[50px]"/>
          <div>
            <h2 className='font-medium mb-2'>{cartData?.name}</h2>
            <p>{cartData?.description}</p>
            <p className="font-bold text-[13px]">₦{cartData?.price}</p>
          </div>
        </div>
        <div className="flex gap-6">
        <Link to='/buyer/item-details' ><p className="font-medium text-[14px] cursor-pointer hover:underline">View Info</p></Link>
          <Link to='/buyer/raise-a-dispute' state={{cartData: cartData }} ><p className="font-medium text-[14px] cursor-pointer hover:underline">Raise a Dispute</p></Link>
          <p className="font-medium text-[14px] text-[#FD7E14] cursor-pointer hover:underline"
            onClick={()=> setUnlockFund(true)}
          >Unlock Funds </p>
        </div>
      </div>
      <div className="border border-[#EDEDED] mt-2"/>
    </div>
  )
}

export default UnlockFundCard